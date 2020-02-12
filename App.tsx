import React, {Component} from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './src/route';
import store from './src/Reducer/index';
import {NativeModules} from 'react-native';
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
