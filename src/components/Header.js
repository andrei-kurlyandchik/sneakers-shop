import React from "react";
import { Link } from "react-router-dom";
import {useCart} from "../hooks/useCart";

function Header(props) {
    const {totalPrice} = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img width={40} height={40} src="img/logo.svg" alt="Logo"/>
                    <div className="header-info">
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="header-right d-flex">
                <li onClick={props.onClickCart} className="mr-30 d-flex align-center cu-p">
                    <img width={18} height={18} src="img/cart.svg" alt="Cart"/>
                    <span>{totalPrice} руб.</span>
                </li>
                <li>
                    <Link to="/favorites"><img src="img/heart-unliked.svg" alt="Unliked"/></Link>
                </li>
                <li>
                    <Link to="/orders"><img width={18} height={18} src="img/logo-user.svg" alt="User"/></Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;