import React from 'react';
import './login.scss';
import axios from 'axios';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: '',
    },
  };

  login = e => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/auth/login', {
        ...this.state.credentials,
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => console.log(error));
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <div className="auth">
        <h1 className="auth__title">Login</h1>
        <form className="auth__form" onSubmit={this.login}>
          <input
            type="text"
            name="username"
            value={this.state.credentials.name}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
