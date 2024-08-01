
export function prontuarioExceptionParser(data){
    if(data.doctor_speciality){
        return "CRM"
    }
    else if( data.documentNumber == '17549' || data.documentNumber == '94677'){
        return "CRN"
    }else{
        return "COREN"
    }
}