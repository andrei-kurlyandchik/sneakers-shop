import React from "react";
import ContentLoader from "react-content-loader"
import AppContext from "../../context";

import styles from './Card.module.scss'


function Card({
                  id,
                  onFavorite,
                  imgUrl,
                  title,
                  price,
                  onPlus,
                  favorited = false,
                  loading = false,
              }) {

    const {isItemAdded} = React.useContext(AppContext);
    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const obj = {id, parentId: id, imgUrl, title, price};

    const onClickPlus = () => {
        onPlus(obj);
    }

    const onClickFavorite = () => {
        onFavorite(obj);
        setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
            {
                loading ? <ContentLoader
                    speed={2}
                    width={160}
                    height={200}
                    viewBox="0 0 150 200"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="90"/>
                    <rect x="-1" y="103" rx="5" ry="5" width="150" height="15"/>
                    <rect x="1" y="127" rx="5" ry="5" width="100" height="15"/>
                    <rect x="2" y="163" rx="5" ry="5" width="80" height="25"/>
                    <rect x="113" y="160" rx="10" ry="10" width="32" height="32"/>
                </ContentLoader> : <>
                    {onFavorite && <div className={styles.favorite} onClick={onClickFavorite}>
                        <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"} alt="Unliked"/>
                    </div>}
                    <img width={133} height={112} src={imgUrl} alt="Sneakers"/>
                    <h5>{title}</h5>
                    <div className="d-flex justify-between align-center">
                        <div className="d-flex flex-column">
                            <span>????????:</span>
                            <b>{price} ??????.</b>
                        </div>
                        {onPlus && <button className={styles.button} onClick={onClickPlus}>
                            <img src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus"/>
                        </button>}
                    </div>
                </>
            }
        </div>
    )
}

export default Card;
