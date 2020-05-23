import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { loginUser } from '../../actions/user-actions';
import Button from '../../components/button';
import { TextField, withStyles } from '@material-ui/core';
import {
  validate,
  validateForm,
  getUpdatedForm,
  generateFormData,
} from '../../utils/form-actions';
import { formStyles } from '../../utils/misc';
import './style.sass';

class Login extends Component {
  state = {
    fields: {
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
      this.props.loginUser(dataToSubmit);
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

    const [, validationMsg] = validate(fields[fieldName]);

    const newForm = getUpdatedForm(fields, fieldName, 'error', validationMsg);
    this.setState({
      fields: newForm,
    });
  };

  render() {
    const { handleChange, handleBlur, handleSubmit } = this;
    const { email, password } = this.state.fields;
    const { classes } = this.props;
    const { loginSuccess, message: backendError } = this.props.currentUser;

    if (loginSuccess) {
      return <Redirect to='/' />;
    }

    return (
      <main className='login'>
        <div className='login__container'>
          <div className='login__left'>
            <h2 className='login__title'>Войти в систему</h2>
            {backendError && <p className='login__error'>{backendError}</p>}
            <form onSubmit={handleSubmit} noValidate className={classes.root}>
              <TextField
                type='email'
                label='Email'
                variant='outlined'
                size='small'
                error={Boolean(email.error)}
                helperText={email.error}
                onChange={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <TextField
                type='password'
                label='Password'
                variant='outlined'
                size='small'
                error={Boolean(password.error)}
                helperText={password.error}
                onChange={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <Button
                className='login__button'
                style={{ marginBottom: 'auto' }}>
                Войти
              </Button>
            </form>
          </div>
          <div className='login__right'>
            <h2 className='login__title'>Создайте аккаунт</h2>
            <div className='login__descr'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi
              explicabo minima ut odio, ipsa corporis. Minus corrupti quaerat
            </div>
            <Button className='login__button' linkTo='/register'>
              Зарегестрироваться
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

const mapDispatchToProps = { loginUser };

export default compose(
  withStyles(formStyles),
  connect(mapStateToProps, mapDispatchToProps)
)(Login);
