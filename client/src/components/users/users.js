import React from 'react';
import axios from 'axios';
import './users.scss';

class Users extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/users')
      .then(users => {
        console.log(users.data);
        users = users.data;
        this.setState({ users });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.users.map(user => {
            return <li>{user.username}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Users;
