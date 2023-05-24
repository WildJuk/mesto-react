import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    avatar: '',
    name: '',
    about: '',
    cohort: ''
  });

  useEffect(() => {
    api.getUresInfo()
      .then(userInfo => {
        setCurrentUser(userInfo);
      })
      .catch(err =>
        console.log(`Ошибка загрузки данных о пользоателе: ${err}`)
      )
  }, [])

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

  function handleUpdateUser(newUserData) {
    api.setUserInfo(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err =>
        console.log(`Ошибка загрузки обновления информации о пользователе: ${err}`)
      )
      .finally(() => {
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(newUserAvatar) {
    api.setUserAvatar(newUserAvatar)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch(err =>
        console.log(`Ошибка загрузки обновления аватара пользователя: ${err}`)
      )
      .finally(() => {
        closeAllPopups();
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          submitButtonText={'Сохранить'}
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
        </PopupWithForm>

        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          isOpen={false}
          onClose={closeAllPopups}
          submitButtonText={'Да'}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
