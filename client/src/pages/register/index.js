import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { registerUser } from '../../actions/user-actions';
import Button from '../../components/button';
import { TextField, withStyles } from '@material-ui/core';
import {
  validate,
  validateForm,
  generateFormData,
  getUpdatedForm,
} from '../../utils/form-actions';
import { Redirect } from 'react-router-dom';
import { formStyles } from '../../utils/misc';
import './style.sass';

class Register extends Component {
  state = {
    fields: {
      name: {
        value: '',
        validation: {
          required: true,
        },
        error: '',
      },
      lastname: {
        value: '',
        validation: {
          required: true,
        },
        error: '',
      },
      email: {
        value: '',
        validation: {
          required: true,
          email: true,
        },
        error: '',
      },
      password: {
        value: '',
        validation: {
          required: true,
        },
        error: '',
      },
      confirmPassword: {
        value: '',
        validation: {
          required: true,
          confirm: 'password',
        },
        error: '',
      },
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let { fields } = this.state;
    const newForm = validateForm(fields);

    if (newForm) {
      this.setState({
        fields: newForm,
      });
    } else {
      const dataToSubmit = generateFormData(fields);
      this.props.registerUser(dataToSubmit);
    }
  };

  handleChange = (fieldName) => (event) => {
    const { fields } = this.state;
    const value = event.target.value;

    const newForm = getUpdatedForm(fields, fieldName, 'value', value);

    this.setState({
      fields: newForm,
    });
  };

  handleBlur = (fieldName) => () => {
    const { fields } = this.state;

    const [, validationMsg] = validate(fields[fieldName], fields);

    const newForm = getUpdatedForm(fields, fieldName, 'error', validationMsg);
    this.setState({
      fields: newForm,
    });
  };

  render() {
    const { handleChange, handleBlur, handleSubmit } = this;
    const { success, err: backendError } = this.props.currentUser;
    const { classes } = this.props;
    const {
      name,
      lastname,
      email,
      password,
      confirmPassword,
    } = this.state.fields;

    if (success) {
      return <Redirect to='/' />;
    }

    return (
      <main className='register'>
        <div className='register__container'>
          <div className='register__left'>
            <h2 className='register__title'>Зарегестрироваться</h2>
            {backendError && backendError.code === 11000 && (
              <p className='register__error'>
                Пользователь с таким адресом электронной почты уже
                зарегистрирован
              </p>
            )}
            <form onSubmit={handleSubmit} className={classes.root}>
              <TextField
                type='text'
                label='Имя'
                variant='outlined'
                size='small'
                fullWidth={true}
                style={{ marginBottom: '10px' }}
                error={Boolean(name.error)}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                helperText={name.error}
              />
              <TextField
                type='text'
                label='Фамилия'
                variant='outlined'
                size='small'
                fullWidth={true}
                style={{ marginBottom: '10px' }}
                error={Boolean(lastname.error)}
                onChange={handleChange('lastname')}
                onBlur={handleBlur('lastname')}
                helperText={lastname.error}
              />
              <TextField
                type='email'
                label='Электронная почта'
                variant='outlined'
                size='small'
                fullWidth={true}
                style={{ marginBottom: '10px' }}
                error={Boolean(email.error)}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
                helperText={email.error}
              />
              <TextField
                type='password'
                label='Password'
                variant='outlined'
                size='small'
                fullWidth={true}
                error={Boolean(password.error)}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
                helperText={password.error}
              />
              <TextField
                type='password'
                label='Confirm password'
                variant='outlined'
                size='small'
                fullWidth={true}
                style={{ marginBottom: '20px' }}
                error={Boolean(confirmPassword.error)}
                onBlur={handleBlur('confirmPassword')}
                onChange={handleChange('confirmPassword')}
                helperText={confirmPassword.error}
              />
              <Button
                className='register__button'
                style={{ marginBottom: 'auto' }}>
                Зарегестрироваться
              </Button>
            </form>
          </div>
          <div className='register__right'>
            <h2 className='register__title'>Уже есть аккаунт?</h2>
            <div className='register__descr'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
              explicabo minima ut odio, ipsa corporis. Minus corrupti quaerat
            </div>
            <Button className='register__button' linkTo='/login'>
              Войти
            </Button>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userReducer.currentUser,
  };
};

const mapDispatchToProps = { registerUser };

export default compose(
  withStyles(formStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(Register);
