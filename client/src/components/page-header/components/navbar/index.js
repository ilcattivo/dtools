import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './style.sass';

export class Navbar extends Component {
  state = {
    links: [
      { label: 'Главная', to: '/' },
      { label: 'Продукция', to: '/products' },
      {
        label: 'Про нас',
        to: '/about-us',
      },
      {
        label: 'Войти',
        to: '/login',
        notAuth: true,
      },
      {
        label: 'Мой аккаунт',
        to: '/user/dashboard',
        auth: true,
      },
    ],
  };

  renderLinks = () => {
    return this.state.links
      .filter((el) => {
        return this.props.currentUser.isAuth ? !el.notAuth : !el.auth;
      })
      .map(({ label, to }) => (
        <li className='navbar__item' key={label}>
          <NavLink to={to} className='navbar__link'>
            {label}
          </NavLink>
        </li>
      ));
  };

  render() {
    return <ul className='navbar'>{this.renderLinks()}</ul>;
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
