import React, { Component } from 'react';
import logo from './logo.svg';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import Auth from './Auth.js';
import User from './User.js';
import './App.css';

const history = createHistory({ forceRefresh: true });

class App extends Component {
  render() {
    function login(callback) {
      var CLIENT_ID = '8c39bf40e3ec46ca82672b3b63146dc4';
      var REDIRECT_URI = 'http://localhost:3000/callback';
      function getLoginURL(scopes) {
          return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
            '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
            '&scope=' + encodeURIComponent(scopes.join(' ')) +
            '&response_type=token';
      }
      
      var url = getLoginURL([
          'user-read-email'
      ]);
      
      var width = 450,
          height = 730,
          left = (window.innerWidth / 2) - (width / 2),
          top = (window.innerHeight / 2) - (height / 2);
  
      window.addEventListener("message", function(event) {
        var hash = JSON.parse(event.data);

        if (hash.type == 'access_token') {
          callback(hash.access_token);
        }
      }, false);
      
      var w = window.open(url,
                          'Spotify',
                          'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                         );
        
    }

    function getUserData(accessToken) {
      return fetch('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      }).then( data => data.json());
    }
    
    function UserLogin() {
      login(function(accessToken) {
        getUserData(accessToken)
        .then(function(response) {
          history.push({
            pathname: '/user',
            state: { user: response }
          });
        });
      });
    }
    


    return (
      <div className="App">
        <h1>Displaying User Data</h1>
        <p>Log in with your Spotify account and this demo will display information about you fetched using the Spotify Web API</p>
        <button className="btn btn-primary" id="btn-login" onClick={UserLogin}>Login</button>

        <Route path="/callback" component={Auth}/>
        <Route path="/user" component={User}/>
      </div>
    );
  }
}

export default App;
