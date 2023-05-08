import logo from './../images/header/logo.svg';

export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Логотип страницы Mesto" className="header__logo" />
        </header>
    )
}