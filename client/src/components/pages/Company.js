import styles from "./Company.module.css";
import { FiMapPin } from "react-icons/fi";
import estg from "../../img/estg.png";

function Company() {
  return (
    <div className={styles.company_container}>
      <h1>Sobre nós</h1>
      <p>
        Somos estudantes do 3º ano da Licenciatura de Engenharia Informática da
        Escola Superior de Tecnologia e Gestão do Instituto Politécnico de Viana
        do Castelo e estamos a desenvolver uma plataforma web para Registo e
        Gestão de Requisitos, baseada em Blockchain, no âmbito da Unidade
        Curricular de Projeto III.
      </p>
      <img src={estg} alt="estg"></img>
      <h1>Onde nos encontrar</h1>
      <p>
        <FiMapPin></FiMapPin> Avenida do Atlântico, n.º 644 | 4900-348 Viana do
        Castelo
      </p>
    </div>
  );
}

export default Company;
