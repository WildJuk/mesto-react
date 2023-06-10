import { useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { FormValidator } from './FormValidator';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    about: '',
    avatar: ''
  });
  const [cards, setCards] = useState([]);
  const [formValidators, setFormValidators] = useState({});

  useEffect(() => {
    api.getStartAppData()
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch(err =>
        console.log(`Ошибка загрузки данных о пользоателе: ${err}`)
      )

      const formList = Array.from(document.querySelectorAll(config.formSelector));
      formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');
        setFormValidators((prevState) => {
          return {
            ...prevState,
            [formName]: validator
          }
        })
        validator.enableValidation();
      });
      console.log(formValidators)
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  function handleEditAvatarClick() {
    formValidators['avatar-edit'].disableSubmitButton();
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    formValidators['profile-edit'].disableSubmitButton();
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    formValidators['add-card'].disableSubmitButton();
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

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
          prevState.filter(prevCard => prevCard._id !== deletedCardId)
        )
      })
      .catch(err =>
        console.log(`Ошибка удаления карточки: ${err}`)
      )
  };

  function handleUpdateUser(newUserData) {
    api.setUserInfo(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err =>
        console.log(`Ошибка загрузки обновления информации о пользователе: ${err}`)
      )
  };

  function handleUpdateAvatar(newUserAvatar) {
    api.setUserAvatar(newUserAvatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err =>
        console.log(`Ошибка загрузки обновления аватара пользователя: ${err}`)
      )
  };

  function handleAddPlaceSubmit(newPlace) {
    api.addNewCard(newPlace)
      .then((newCard) => {
        setCards(prevState => [newCard, ...prevState]);
        closeAllPopups();
      })
      .catch(err =>
        console.log(`Ошибка загрузки новой карточки: ${err}`)
      )
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Header />

        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
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

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

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
