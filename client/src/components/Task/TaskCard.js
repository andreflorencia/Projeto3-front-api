import styles from "../project/ProjectCard.module.css";

import { BsFillTrashFill } from "react-icons/bs";

function TaskCard({ id, description, status, membros, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();

    handleRemove(id);
  };

  return (
    <div className={styles.project_card}>
      <h4>{description}</h4>
      <p>
        <span>{status}</span>
      </p>
      <p>{membros}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
