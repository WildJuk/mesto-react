export default function PopupWithForm({
    name,
    title,
    isOpen,
    onClose,
    submitButtonText,
    onSubmit,
    children
}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть попап" className="popup__close" onClick={onClose} />
                <h2 className="popup__title">{title}</h2>
                <form
                    name={name}
                    className={`popup__form popup__form_${name}`}
                    noValidate
                    onSubmit={onSubmit}
                >
                    {children}
                    <button type="submit" className="popup__submit-button">{submitButtonText}</button>
                </form>
            </div>
        </div>
    );
}