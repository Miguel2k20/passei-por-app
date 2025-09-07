import "./style.scss";
import logo from "../../../assets/favIcon/icon.png"

function Loading() {
    return (
        <div id="loading">
            <div className="item">
                <img className="logo" src={logo} alt="Logo do PasseiPor" />
                <span>Carregando</span>
            </div>
        </div>
    );
}

export default Loading;