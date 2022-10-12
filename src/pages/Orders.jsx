import React from "react";
import Card from "../components/Card";
import axios from "axios";
import AppContext from "../context";

function Orders() {
    const {onAddToCart, onAddToFavorite} = React.useContext(AppContext);
    const [orders, setOrders] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect( () => {
        (async ()=> {
            try {
                const {data} = await axios.get('https://633a9a89471b8c39557079fc.mockapi.io/orders');
                setOrders(data.map((obj) =>obj.items).flat());
                setIsLoading(false);
            } catch (error) {
                alert('Ошибка при запросе заказа');
            }

        })();
    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои покупки</h1>

            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Orders;