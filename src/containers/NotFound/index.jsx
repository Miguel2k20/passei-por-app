import ButtonDefault from "../components/ButtonDefault"
import "./style.scss"

function NotFound() {
    return (
        <section id="notFound">
            <div className="section">
                <h1 className="title">Ops!</h1>
                <p className="subtitle">
                    Página não encontrada. Parece que você se perdeu no caminho.
                </p>
                <div className="buttons-space">
                    <ButtonDefault link="home" text="Voltar pro início" />
                </div>
            </div>
        </section>
    )
}

export default NotFound