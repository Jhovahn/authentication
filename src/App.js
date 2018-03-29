import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner, CardSection } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';

class App extends Component {
  state = {
    loggedIn: null
  };
  componentDidMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCdmpsRldJkvh9YpYlDbCnWllvFARmlpPU',
      authDomain: 'auth-bccfc.firebaseapp.com',
      databaseURL: 'https://auth-bccfc.firebaseio.com',
      projectId: 'auth-bccfc',
      storageBucket: 'auth-bccfc.appspot.com',
      messagingSenderId: '55777728478'
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
          </CardSection>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
