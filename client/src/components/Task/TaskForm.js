import styles from "../project/ProjectForm.module.css";

import { useState } from "react";

import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";

function TaskForm({ handleSubmit, btnText, projectData }) {
  const [task, setTask] = useState({});

  function handleChange(e) {
    setTask({ ...task, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();
    projectData.Tasks.push(task);
    handleSubmit(projectData);
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Id da tarefa"
        name="id"
        placeholder="Insira o Id da tarefa"
        handleOnChange={handleChange}
      />
      <Input
        type="text"
        text="Descrição"
        name="Description"
        placeholder="Insira a descriçao da tarefa"
        handleOnChange={handleChange}
      />

      <Input
        type="text"
        text="Assignee"
        name="Assignee"
        placeholder="Insira os membros designados para esta tarefa"
        handleOnChange={handleChange}
      />

      <Input
        type="text"
        text="Status da Tarefa"
        name="status"
        placeholder="Insira o status da tarefa"
        handleOnChange={handleChange}
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default TaskForm;
