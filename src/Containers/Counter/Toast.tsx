import * as React from 'react';
import {Text, StyleSheet, View, NativeModules, Button} from 'react-native';
const {ToastModule} = NativeModules;
export interface AppProps {}
export interface AppState {}
export default class Toast extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }
  onPressButton = () => {
    ToastModule.showText(
      'This is Android Toast Message',
      ToastModule.LENGTH_SHORT,
    );
  };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Button
          style={{flex: 1, justifyContent: 'center'}}
          onPress={this.onPressButton}
          title="Call Toast"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
