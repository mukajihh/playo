import React, { Component } from 'react';

class User extends Component {
  render() {
    var user = this.props.location.state.user;
    console.log(user);
    return(
      <ul>
        <li>Nome: {user.display_name}</li>
        <li><img src={user.images[0].url}></img></li>
      </ul>
    )
  }
}

export default User;