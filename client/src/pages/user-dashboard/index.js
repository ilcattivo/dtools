import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from '../../components/link';
import { logoutUser } from '../../actions/user-actions';
import DashboardLayout from '../../hoc/dashboard-layout';
import './style.sass';

class UserDashboard extends Component {
  handleLogout = () => {
    this.props.logoutUser().then(() => this.props.history.push('/login'));
  };

  render() {
    return (
      <DashboardLayout>
        <main className='user-dashboard'>
          <h1 className='user-dashboard__title'>Мой аккаунт</h1>
          <ul className='user-dashboard__links'>
            <li className='user-dashboard__item'>
              <Link className='user-dashboard__link' to='/'>
                Личные данные
              </Link>
              <p className='user-dashboard__descr'>
                Вы сможете получить доступ к Вашим личным данным (имени, адресу
                счета-фактуры, телефону...) и изменять их для осуществления
                покупок в будущем, а также сообщать нам об изменении Ваших
                контактных данных.
              </p>
            </li>
            <li className='user-dashboard__item'>
              <Link className='user-dashboard__link' to='/'>
                Корзина
              </Link>
              <p className='user-dashboard__descr'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
                quibusdam aspernatur cumque non dolores praesentium aut at
                doloribus minima voluptatem?
              </p>
            </li>
            <li className='user-dashboard__item'>
              <Link className='user-dashboard__link' to='/'>
                История заказов
              </Link>
              <p className='user-dashboard__descr'>
                Ознакомьтесь с информацией о ваших заказах и их состоянии. Вы
                также можете отменить заказ или запросить о возврате товаров.
              </p>
            </li>
          </ul>
          <Link
            className='user-dashboard__link link--small link--underline'
            onClick={this.handleLogout}>
            Выйти из аккаунта
          </Link>
        </main>
      </DashboardLayout>
    );
  }
}

const mapDispatchToProps = { logoutUser };

export default connect(null, mapDispatchToProps)(UserDashboard);
