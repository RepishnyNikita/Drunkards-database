import { Link } from 'react-router-dom';
import { NavIcon } from './NavIcon/NavIcon';

import logo from './../image/logo.png'
import user from './../image/user.png'

export const Navigation = ({navIsOpen, setNavIsOpen}) => {

  const closeNav = () =>{
    setNavIsOpen(false)
  }

  return (
    <nav className="nav">
      <div className="container nav__container">
        
        <Link to="/" className="nav__logo">
          <img src={logo} alt="logo"/>
        </Link>

        <div className={navIsOpen ? "nav__list nav__list--active" : "nav__list"}>

          <Link to="/" className="nav__list-link" onClick={closeNav}>
            Главная
          </Link>

          <Link to="/my-review" className="nav__list-link" onClick={closeNav}>
            Отзывы
          </Link>
          
          <Link to="/add-review" className="nav__list-link" onClick={closeNav}>
            Добавить отзыв
          </Link>
        </div>

        <NavIcon navIsOpen={navIsOpen} setNavIsOpen={setNavIsOpen}/>

        <button className="nav__user">
          <img src={user} alt="user" />
        </button>
      </div>
    </nav>
  );
};
