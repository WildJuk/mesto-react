export default function Card({card, onCardClick}) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="element">
          <img src={card.link} alt={card.name} className="element__mask-group" onClick={handleClick} />
          <div className="element__info">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__button-like-container">
              <button type="button" aria-label="Иконка лайка на карточке" className="element__like" />
              <p className="element__like-counter">{card.likes.length}</p>
            </div>
          </div>
          <button type="button" aria-label="Иконка удаления на карточке" className="element__trash" />
        </li>
    )
}