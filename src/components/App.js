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
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getStartAppData()
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch(err =>
        console.log(`Ошибка загрузки данных о пользоателе: ${err}`)
      )
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
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
      })
      .catch(err =>
        console.log(`Ошибка загрузки обновления информации о пользователе: ${err}`)
      )
      .finally(() => {
        closeAllPopups();
      })
  };

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
  };

  function handleAddPlaceSubmit(newPlace) {
    api.addNewCard(newPlace)
      .then((newCard) => {
        setCards(prevState => [newCard, ...prevState])
      })
      .catch(err =>
        console.log(`Ошибка загрузки новой карточки: ${err}`)
      )
      .finally(() => {
        closeAllPopups();
      })
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
