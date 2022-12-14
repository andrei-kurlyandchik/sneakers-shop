import React from "react";
import {Route, Routes} from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

import AppContext from "./context";


function App() {
    const [items, setItems] = React.useState([]);
    const [cartItems, setCartItems] = React.useState([]);
    const [favorites, setFavorites] = React.useState([]);
    const [searchValue, setSearchValues] = React.useState('');
    const [cartOpened, setCartOpened] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);

                const cartResponse = await axios.get('https://633a9a89471b8c39557079fc.mockapi.io/cart');
                const favoritesResponse = await axios.get('https://633a9a89471b8c39557079fc.mockapi.io/favorites');
                const itemsResponse = await axios.get('https://633a9a89471b8c39557079fc.mockapi.io/sneakers');
                setIsLoading(false);


                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных');
            }
        }
        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id));
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://633a9a89471b8c39557079fc.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems(prev =>[...prev, obj]);
                const {data} = await axios.post('https://633a9a89471b8c39557079fc.mockapi.io/cart', obj);
                setCartItems(prev => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item;
                }));
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину');
        }

    }

    const onRemoveItem = async (id) => {
        try {
            await axios.delete(`https://633a9a89471b8c39557079fc.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
        } catch (error) {
            alert('Ошибка при удалении из корзины');
        }
    }

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)){
                axios.delete(`https://633a9a89471b8c39557079fc.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
            } else {
                const {data} = await axios.post('https://633a9a89471b8c39557079fc.mockapi.io/favorites', obj);
                setFavorites(prev =>[...prev, data]);
            }
        } catch (error) {
            alert("Не удалось добавить в избранное")
        }

    }
    
    const onChangeSearchInput = (event) => {
        setSearchValues(event.target.value);
    }

    const isItemAdded = (id) => {
      return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }

    return (
        <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems}}>
            <div className="wrapper clear">
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                    opened={cartOpened}/>
                {/*{cartOpened ? <Index items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} /> : null}*/}
                <Header onClickCart={() => setCartOpened(true)}/>
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
                                searchValue={searchValue}
                                setSearchValues={setSearchValues}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route
                        exact
                        path='/favorites'
                        element={
                            <Favorites/>
                        }
                    />
                    <Route
                        exact
                        path='/orders'
                        element={
                            <Orders/>
                        }
                    />
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
