import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
    isOpen, 
    onClose, 
    onAddPlace
}) {

    const [newPalceName, setNewPalceName] = useState('');
    const [newPlaceImageLink, setNewPlaceImageLink] = useState('');

    function handleNewPalceNameChange(event) {
        setNewPalceName(event.target.value);
    };

    function handleNewPlaceImageLinkChange(event) {
        setNewPlaceImageLink(event.target.value);
    };

    function handleSubmit(event) {
        event.preventDefault();

        onAddPlace({
            name: newPalceName,
            link: newPlaceImageLink
        });
    };

    return (
        <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpen={isOpen}
          onClose={onClose}
          submitButtonText={'Сохранить'}
          onSubmit={handleSubmit}
        >
          <input
            required
            id="card-name"
            type="text"
            name="card-name"
            className="popup__input popup__input_name_card-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            value={newPalceName}
            onChange={handleNewPalceNameChange}
          />
          <p className="popup__input-error card-name-error"></p>
          <input
            required
            id="card-link"
            type="url"
            name="card-link"
            className="popup__input popup__input_name_card-link"
            placeholder="Ссылка на картинку"
            value={newPlaceImageLink}
            onChange={handleNewPlaceImageLinkChange}
          />
          <p className="popup__input-error card-link-error" />
        </PopupWithForm>
    );
}