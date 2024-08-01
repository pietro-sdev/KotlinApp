export default function initMemed(patient, setPatient, memedToken) {
  const [year, month, day] = patient.patientBirthday.split('T')[0].split('-');
  patient = { ...patient, patientBirthday: `${day}/${month}/${year}` }
  if (!isScriptLoaded('memedScript')) {
    var script = document.createElement('script');
    // script.src = 'https://integrations.memed.com.br/modulos/plataforma.sinapse-prescricao/build/sinapse-prescricao.min.js';
    script.src = 'https://partners.memed.com.br/integration.js';
    script.dataset.token = memedToken;
    script.id = 'memedScript'
    script.addEventListener("load", initEventsMemed);
    document.body.appendChild(script);
  } else {
    MdHub.module.show('plataforma.prescricao');
  }

  /**
   * Inicia os eventos de escuta e mostra o front da prescrição
  */
  function initEventsMemed() {
    // Define o paciente
    MdSinapsePrescricao.event.add('core:moduleInit', async function (module) {
      if (module.name === 'plataforma.prescricao') {
        // Definindo features que estarão inativas
        await MdHub.command.send('plataforma.prescricao', 'setFeatureToggle', {
          // Desativa a opção de excluir um paciente (obrigatório)
          deletePatient: false,
          // Desabilita a opção de remover/trocar o paciente (obrigatório)
          removePatient: true,
          // Desabilita a opção de remover receita (opcional)
          removePrescription: false,
          // Desabilita a opção de editar receita após emissão (opcional)
          conclusionModalEdit: false,
          // Desabilita a opção de editar o layout da prescrição (opcional)
          optionsPrescription: false,
          // Esconde o formulário de edição do paciente (obrigatório)
          editPatient: false
        });
        await MdHub.command.send('plataforma.prescricao', 'setPaciente', {
          idExterno: patient.patient_id,
          nome: patient.patientName,
          cpf: patient.patientCPF,
          data_nascimento: patient.patientBirthday,
          nome_social: patient.patientNick,
          endereco: patient.patientAddress,
          cidade: `${patient.patientCity}-${patient.patientUF}`,
          telefone: patient.patientNumber.replace('(', '').replace(')', '').replace('-', ''),
        })
          .then(function success() {
            MdHub.command.send('plataforma.prescricao', 'setWorkplace', {
              city: patient.doctorCity,
              state: patient.doctorState,
              address: patient.doctorWorkplace,
              phone: patient.doctorWorknumber
            });

            // Exibe a UI da Memed
          });

        // Evento é chamado quando o usuário clica em "Emitir e enviar"
        await MdHub.event.add('prescricaoImpressa', function (prescriptionData) {
          const newPatient = patient;
          newPatient.prescription.unshift(prescriptionData);
          setPatient(newPatient);
        });

        MdHub.module.show('plataforma.prescricao');
      }
    });
  }

  function isScriptLoaded(scriptId) {
    var script = document.getElementById(scriptId);
    return !!script;
  }
}