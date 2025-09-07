import ButtonDefault from "../components/ButtonDefault"
import "./style.scss"
import logo from "../../assets/favIcon/icon.png"

function Home() {
    return (
        <section id="home">
            <div className="section">
                <img className="logo" src={logo} alt="Logo do PasseiPor" />
                <h1 className="title">Bem vindo ao <span>PasseiPor</span>!</h1>
                <p className="subtitle">
                    Aqui você pode compartilhar e descobrir lugares incríveis que já visitou ou que planeja visitar.
                </p>
                <div className="buttons-space">
                    <ButtonDefault link="search-countries" text="Procurar países" />
                    <ButtonDefault link="visited-coutries" text="Ver países que já visitei" />
                </div>
            </div>
        </section>
    )
}

export default Home