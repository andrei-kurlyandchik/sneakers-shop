import React from "react";
import Card from "../components/Card";
import AppContext from "../context";

function Home({
                  items,
                  searchValue,
                  setSearchValues,
                  onChangeSearchInput,
                  onAddToFavorite,
                  onAddToCart,
                  isLoading,
              }) {
    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? [...Array(8)] : filteredItems)
            .map((item, index) => (
                <Card
                    key={index}
                    onPlus={(obj) => onAddToCart(obj)}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    loading={isLoading}
                    {...item}
                />
            ))
    }

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кросовки'}</h1>
                <div className="search-block d-flex">
                    <img src="img/search.svg" alt="search"/>
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."/>
                    {searchValue && <img
                        onClick={() => setSearchValues('')}
                        className="remove-btn" src="img/btn-close.svg"
                        alt="Clear"/>}
                </div>

            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
}

export default Home;