import { useState, useEffect } from "react";
import { api } from "../utils/Api";
import Card from "./Card";

export default function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick
}) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);
    
    useEffect(() => {
        api.getStartAppData()
            .then(([userData, cardData]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(cardData);
              })
            .catch(error => {
                console.log(`Ошибка загрузки данных: ${error}`)
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container" onClick={onEditAvatar}>
                    <img src={userAvatar} alt="Фотография профиля" className="profile__avatar" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button 
                        type="button" 
                        aria-label="Редактировать профиль" 
                        className="profile__edit-button" 
                        onClick={onEditProfile}
                    />
                    <p className="profile__about">{userDescription}</p>
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
                    {cards.map((card, id) => (
                        <Card onCardClick={onCardClick} key={card._id} card={card} />
                    ))}
                </ul>
            </section>
        </main>
    )
}