import { useState, useEffect } from "react";
import axios from "axios";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import styles from "./ProjectForm.module.css";
import ReactSelect from "react-select";

function ProjectForm({ handleSubmit, btnText, projectData }) {
  const [project, setProject] = useState(projectData || {});
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axios.get("http://localhost:8800/api/users/", {
        headers,
      });
      console.log(result);
      setOptions(
        result.data.map((item) => ({
          value: item.username,
          label: item.username,
        }))
      );
    };

    fetchData();
  }, []);

  const handleSelectChange = (selectedOption) => {
    setProject({ ...project, members: selectedOption });
  };

  const submit = (e) => {
    e.preventDefault();
    handleSubmit({
      ...project,
      members: project.members.map((item) => item.value),
    });
  };

  function handleInputChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        name="name"
        placeholder="Insira o nome do projeto"
        handleOnChange={handleInputChange}
        value={project.name ? project.name : ""}
      />
      <Input
        type="text"
        text="Descrição do Projeto"
        name="description"
        placeholder="Insira a descrição do projeto"
        handleOnChange={handleInputChange}
        value={project.description ? project.description : ""}
      />
      <Input
        type="text"
        text="Dono do Projeto"
        name="owner"
        placeholder="Insira o dono do projeto"
        handleOnChange={handleInputChange}
        value={project.owner ? project.owner : ""}
      />
      <div className={styles.form_control}>
        <label htmlFor="select">Membros</label>

        <ReactSelect
          isMulti
          options={options}
          value={project.members}
          onChange={handleSelectChange}
        />
      </div>
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;
