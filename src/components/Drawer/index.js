import React from "react";
import axios from "axios";
import Info from "../info";
import {useCart} from "../../hooks/useCart";

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, onRemove, items = [], opened}) {
    const {cartItems, setCartItems, totalPrice} = useCart();
    const [orderId, setOrderId] =React.useState(null);
    const [isOrderComplete, setIsOrderComplete] =React.useState(false);
    const [isLoading, setIsLoading] =React.useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://633a9a89471b8c39557079fc.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i=0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://633a9a89471b8c39557079fc.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {

        }
        setIsLoading(false);
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={styles.drawer}>
                <h2 className="d-flex justify-between mb-20">Корзина
                    <img onClick={onClose} className="remove-btn cu-p" src="img/btn-close.svg" alt="remove"/>
                </h2>

                {
                    items.length > 0 ?
                        (
                            <div className="items-wrapper">
                                <div className="items">
                                    {items.map((obj) => (
                                        <div key={obj.id} className="cart-item d-flex align-center mb-20">
                                            <div className="cart-item-img" style={{backgroundImage: `url(${obj.imgUrl})`}}>
                                            </div>
                                            <div className="mr-20">
                                                <p className="mb-5">{obj.title}</p>
                                                <b>{obj.price} руб.</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)} className="remove-btn"
                                                 src="img/btn-close.svg" alt="remove"/>
                                        </div>
                                    ))
                                    }
                                </div>
                                <div className="cart-total-block">
                                    <ul>
                                        <li>
                                            <span>Итого:</span>
                                            <div></div>
                                            <b>{totalPrice} руб.</b>
                                        </li>
                                        <li>
                                            <span>Налог 5%:</span>
                                            <div></div>
                                            <b>{totalPrice / 100 * 5} руб.</b>
                                        </li>
                                    </ul>
                                    <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ<img src="img/arrow.svg" alt="arrow"/></button>
                                </div>
                            </div>
                        ) : (
                            <Info
                                title={isOrderComplete ? "Заказ оформлен!" : "Корзина пуста"}
                                description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавь хотя бы одну пару кроссовок, чтобы сделать закза"}
                                img={isOrderComplete ? "img/order-processed.jpg" : "img/cart-empty.png"}
                            />
                        )
                }
            </div>
        </div>
    )
}

export default Drawer;