import React from "react";
import AppContext from "../context";

const Info = ({img, title, description}) => {
    const {setCartOpened} = React.useContext(AppContext);

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width={120} height={120} src={img} alt="Empty"/>
            <h2>{title}</h2>
            <p className="opacity-6 mb-40">{description}</p>
            <button onClick={() => setCartOpened(false)} className="greenButton">
                Вернуться назад <img src="img/arrow.svg" alt="arrow"/>
            </button>
        </div>
    )
}

export default Info;