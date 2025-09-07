import "./style.scss";

function ButtonDefault({link, text}) {
    return (
        <a href={link} className="button-default">
            {text}
        </a>
    );
}

export default ButtonDefault;