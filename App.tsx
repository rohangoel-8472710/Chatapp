import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/route';

export default class App extends Component {
  render() {
    return <AppNavigator />;
  }
}
