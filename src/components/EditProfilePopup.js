import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({
    isOpen, 
    onClose, 
    onUpdateUser
}) {

    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(event) {
        event.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            submitButtonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input
                required
                id="profile-name"
                type="text"
                name="userName"
                className="popup__input popup__input_name_profile-name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={name}
                onChange={handleNameChange}
            />
            <p className="popup__input-error profile-name-error"></p>
            <input
                required
                id="profile-about"
                type="text"
                name="userAbout"
                className="popup__input popup__input_name_profile-about"
                placeholder="Профессия"
                minLength="2"
                maxLength="200"
                value={description}
                onChange={handleDescriptionChange}
            />
            <p className="popup__input-error profile-about-error" />
        </PopupWithForm>
    )
}