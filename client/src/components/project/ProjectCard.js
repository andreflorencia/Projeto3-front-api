import styles from './ProjectCard.module.css'
import { Link } from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard({ id, name, descricao, owner, handleRemove }) {

    const remove = (e) => {
        e.preventDefault()
        handleRemove(id)
    }



    return (
        <div className={styles.project_card}>
            <h4>
                {name}
            </h4>
            <p>
                <span>Descricao: </span>{descricao}
            </p>
            <p className={styles.owner_text}>
                <span></span> {owner}
            </p>
            <div className={styles.project_card_actions}>
                <Link to={`/project/${id}`}>
                    <BsPencil /> Editar
                </Link>

                <button onClick={remove}>
                    <BsFillTrashFill /> Excluir
                </button>
            </div>
        </div >

    )
}

export default ProjectCard