import { useState } from 'react';
import './../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">

      <Header />

      <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />

      <Footer />

      <PopupWithForm
        name="profile-edit"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            required
            id="profile-name"
            type="text"
            name="userName"
            className="popup__input popup__input_name_profile-name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
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
          />
          <p className="popup__input-error profile-about-error" />
          <button type="submit" className="popup__submit-button">Сохранить</button>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="avatar-edit"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            required
            id="avatar"
            type="url"
            name="userAvatar"
            className="popup__input popup__input_name_profile-avatar"
            placeholder="Ссылка на изображение"
          />
          <p className="popup__input-error avatar-error" />
          <button type="submit" className="popup__submit-button">Сохранить</button>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <>
          <input
            required
            id="card-name"
            type="text"
            name="card-name"
            className="popup__input popup__input_name_card-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
          />
          <p className="popup__input-error card-name-error"></p>
          <input
            required
            id="card-link"
            type="url"
            name="card-link"
            className="popup__input popup__input_name_card-link"
            placeholder="Ссылка на картинку"
          />
          <p className="popup__input-error card-link-error" />
          <button type="submit" className="popup__submit-button">Сохранить</button>
        </>
      </PopupWithForm>

      <PopupWithForm
        name="delete-card"
        title="Вы уверены?"
        isOpen={false}
        onClose={closeAllPopups}
      >
        <>
          <button type="submit" className="popup__submit-button">Да</button>
        </>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
