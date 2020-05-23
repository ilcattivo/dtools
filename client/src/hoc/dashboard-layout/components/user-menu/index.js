import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import InfoIcon from '@material-ui/icons/Info';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HistoryIcon from '@material-ui/icons/History';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import './style.sass';

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

class UserMenu extends Component {
  render() {
    const { name, isAdmin } = this.props.currentUser;

    return (
      <div className='user-menu'>
        <List
          component='nav'
          aria-label='main mailbox folders'
          subheader={
            <ListSubheader component='h3' style={{ fontSize: '1.2rem' }}>
              Здравствуйте, {name}
            </ListSubheader>
          }>
          <ListItemLink
            to='/user/dashboard'
            primary='Мой профиль'
            icon={<PermIdentityIcon />}
          />
          <ListItemLink to='#' primary='Личные данные' icon={<InfoIcon />} />
          <ListItemLink to='#' primary='Корзина' icon={<ShoppingCartIcon />} />
          <ListItemLink
            to='#'
            primary='История заказов'
            icon={<HistoryIcon />}
          />
          {isAdmin && (
            <>
              <ListItemLink
                to='#'
                primary='Информация о сайте'
                icon={<SupervisorAccountIcon />}
              />
              <ListItemLink
                to='/admin/add_product'
                primary='Добавить товар'
                icon={<SupervisorAccountIcon />}
              />
              <ListItemLink
                to='#'
                primary='Редактировать категории'
                icon={<SupervisorAccountIcon />}
              />
            </>
          )}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.userReducer.currentUser,
});

export default connect(mapStateToProps)(UserMenu);
