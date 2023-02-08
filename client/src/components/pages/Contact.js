import { FiPhone } from "react-icons/fi";
import styles from './Contact.module.css'

function Contact() {
    return(
        <div className={styles.form_container}>
            <h1>Contacta-nos</h1>
            <form>
            <label for="fname">Nome:</label>
            <input placeholder="Nome" />
            <label for="lname">Sobrenome:</label>
            <input placeholder="Sobrenome" />
            <label for="lname">Email:</label>
            <input placeholder="Email" />
            <label for="lname">Comunicar Problema:</label>
            <div>
            <textarea placeholder="Comunicar problema" rows="5" />
            </div>
            <button>Enviar</button>
            <div><FiPhone></FiPhone>+351961361124</div>
            <div><FiPhone></FiPhone>+351914644106</div>
            </form>
        </div>
    )
}

export default Contact