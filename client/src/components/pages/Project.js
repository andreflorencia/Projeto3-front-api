import { parse, v4 as uuidv4 } from "uuid";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Project.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import ProjectForm from "../project/ProjectForm";
import Message from "../layout/Message";
import TaskForm from "../Task/TaskForm";
import TaskCard from "../Task/TaskCard";
function Project() {
  let { id } = useParams();
  const [Tarefas, setTarefas] = useState([]);
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [Tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");
  const token = localStorage.getItem("token1");

  useEffect(() => {
    axios
      .post(
        `http://localhost:8801/invoke/my-channel1/workshop`,
        {
          method: "ProjetoContract:ReadProjeto",
          args: [id],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setProject(response.data.response);
        setTasks(response.data.response.Tasks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  function editPost() {
    return;
  }

  function createTask(task) {
    setTarefas([...Tasks, task]);
    const token = localStorage.getItem("token1");
    console.log(task);

    const data = {
      method: "ProjetoContract:UpdateProjeto",
      args: [
        task.Name,
        task.Name,
        task.Description,
        task.Owner,
        JSON.stringify(task.Members),
        JSON.stringify(task.Tasks),
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
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleTaskForm() {
    setShowTaskForm(!showTaskForm);
  }

  function removetask(id) {
    console.log(Tasks);
    setTasks(Tasks.filter((task) => task.Id !== id));
  }

  return (
    <>
      {project.Name ? (
        <div className={styles.project_details}>
          <Container customClass="column">
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Projeto: {project.Name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Editar projeto" : "Fechar"}
              </button>
              {!showProjectForm ? (
                <div className={styles.form}>
                  <p>
                    <span>Nome:</span> {project.Name}
                  </p>
                  <p>
                    <span>Descrição:</span> {project.Description}
                  </p>
                  <p>
                    <span>Proprietário:</span> {project.Owner}
                  </p>
                </div>
              ) : (
                <div className={styles.form}>
                  <ProjectForm
                    handleSubmit={editPost}
                    btnText="Concluir Edição"
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.Task_form_container}>
              <h2>Adicione uma tarefa:</h2>
              <button className={styles.btn} onClick={toggleTaskForm}>
                {!showTaskForm ? "Adicionar tarefa" : "Fechar"}
              </button>
              <div className={styles.form}>
                {showTaskForm && (
                  <TaskForm
                    handleSubmit={createTask}
                    btnText="Adicionar Tarefa"
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Tarefas:</h2>
            <Container customClass="start">
              {Tasks.length > 0 &&
                Tasks.map(
                  (task) => (
                    console.log(task),
                    (
                      <TaskCard
                        id={task.Id}
                        description={task.Description}
                        status={task.Status}
                        membros={task.Assignee}
                        key={task.Id}
                        handleRemove={removetask}
                      />
                    )
                  )
                )}
              {Tasks.length === 0 && <p>Não há Tarefas registadas.</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Project;
