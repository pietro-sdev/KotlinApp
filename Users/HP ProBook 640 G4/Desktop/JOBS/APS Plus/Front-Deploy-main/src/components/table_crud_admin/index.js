import React from "react";
import styles from "./table.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";

export default function TableCRUDAdmin({ quantity = 8, funcArr = [] }) {
  let num_impressos = 0;

  return (
    <div className={styles.tabela}>
      <table>
        <thead>
          <tr className={styles.headerTab}>
            <th>
              <AccountCircleOutlinedIcon />
            </th>
            <th>Funcionário</th>
            <th>Especialidade</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {funcArr.map((func) => {
            num_impressos++;
            if (num_impressos <= quantity)
              return (
                <tr key={func._id}>
                  <td>
                    <AccountCircleOutlinedIcon />
                  </td>
                  <td>{func.nome}</td>
                  <td>{func.especialidade == "" ? "-" : func.especialidade}</td>
                  <td>
                    <Link href={`/admin/editfunc/${func._id}`}>
                      <EditOutlinedIcon />
                    </Link>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>
    </div>
  );
}
