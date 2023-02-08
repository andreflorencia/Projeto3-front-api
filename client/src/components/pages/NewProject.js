import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";

function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    const token = localStorage.getItem("token1");

    const data = {
      method: "ProjetoContract:CreateProjeto",
      args: [
        project.name,
        project.name,
        project.description,
        project.owner,
        JSON.stringify(project.members),
        JSON.stringify([]),
      ],
    };

    axios
      .post("http://localhost:8801/invoke/my-channel1/workshop", data, {
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        navigate("/projects", {
          state: { message: "Projeto criado com sucesso!" },
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie o projeto para depois adcionar tarefas</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
    </div>
  );
}

export default NewProject;
