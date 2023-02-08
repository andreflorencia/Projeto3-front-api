import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../layout/Loading";
import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButton from "../layout/LinkButton";

import styles from "./Projects.module.css";
import ProjectCard from "../project/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState("");

  const location = useLocation();
  let message = "";

  if (location.state) {
    message = location.state.message;
  }
  const token = localStorage.getItem("token1");
  useEffect(() => {
    setTimeout(
      () =>
        fetch("http://localhost:8801/invoke/my-channel1/workshop", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            method: "ProjetoContract:ReadAllProjetos",
            args: [],
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setProjects(data.response);
            setRemoveLoading(true);
          }),
      100
    );
  }, []);

  function removeProject(id) {
    setProjects(projects.filter((project) => project.Id !== id));
    fetch("http://localhost:8801/invoke/my-channel1/workshop", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        method: "ProjetoContract:DeleteProjeto",
        args: [id],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setProjectMessage("Projeto removido com sucesso");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>

      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.Id}
              name={project.Name}
              descricao={project.Description}
              owner={project.Owner}
              key={project.Id}
              handleRemove={removeProject}
            />
          ))}

        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && <p> Não há projetos</p>}
      </Container>
    </div>
  );
}

export default Projects;
