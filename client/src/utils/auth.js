import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../actions/user-actions';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const ColorLinearProgress = withStyles({
  root: {
    height: 5,
    marginTop: '-5px',
  },
  colorPrimary: {
    backgroundColor: 'red',
  },
  barColorPrimary: {
    backgroundColor: '#ff8f8f',
  },
})(LinearProgress);

/**
 * @param {Node} Component
 * @param {Boolean} reload  true=authed_only, false=not_authed_only, null=for_all
 * @param {Boolean} adminRoute
 * @return {hoc} High order component
 */

export default (Component, reload, adminRoute = null) => {
  class AuthenticationCheck extends React.Component {
    state = {
      loading: true,
    };

    componentDidMount() {
      this.props.auth().then(() => {
        this.setState({ loading: false });
        const user = this.props.currentUser;

        if (!user.isAuth) {
          if (reload) {
            this.props.history.push('/login');
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push('/user/dashboard');
          } else if (reload === false) {
            this.props.history.push('/user/dashboard');
          }
        }
      });
    }

    render() {
      if (this.state.loading) {
        return <ColorLinearProgress />;
      }

      return <Component {...this.props} user={this.props.user} />;
    }
  }

  const mapStateToProps = (state) => ({
    currentUser: state.userReducer.currentUser,
  });

  const mapDispatchToProps = {
    auth,
  };

  return connect(mapStateToProps, mapDispatchToProps)(AuthenticationCheck);
};
