import React, { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getInitialCards()
            .then(cardData => {
                setCards(cardData);
            })
            .catch(error => {
                console.log(`Ошибка загрузки данных: ${error}`)
            })
    }, []);

    function handleCardLike(card) {
        const isLiked = card.likes.some(item => item._id === currentUser._id);

        api.changeLikeState(card._id, isLiked)
            .then(newCard => {
                setCards(prevState =>
                    prevState.map(prevCard =>
                        prevCard._id === card._id ? newCard : prevCard
                    )
                );
            })
            .catch(error => {
                console.log(`Ошибка клика по лайку: ${error}`)
            });
    };

    function handleCardDelete(deletedCardId) {
        api.deleteCard(deletedCardId)
            .then(() => {
                setCards(prevState =>
                    prevState.filter(card => card._id !== deletedCardId)
                )
            })
            .catch(err =>
                console.log(`Ошибка удаления карточки: ${err}`)
            )
    };

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img
                        src={currentUser.avatar}
                        alt="Фотография профиля"
                        className="profile__avatar"
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        aria-label="Редактировать профиль"
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    />
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    aria-label="Добавить"
                    className="profile__add-button"
                    onClick={onAddPlace}
                />
            </section>

            <section className="elements">
                <ul className="elements__container">
                    {cards.map(card => (
                        <Card
                            onCardClick={onCardClick}
                            key={card._id}
                            card={card}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}