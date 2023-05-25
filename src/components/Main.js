import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({
    cards,
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick,
    onCardLike,
    onCardDelete
}) {
    const currentUser = React.useContext(CurrentUserContext);
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
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    )
}