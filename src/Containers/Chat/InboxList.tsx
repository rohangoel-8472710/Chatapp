import * as React from 'react';
import { View, Text } from 'react-native';
import styles from '../Chat/styles';
export interface AppProps {
  navigation?: any;
  chat: Function;
  item: any;
}

export default class AppComponent extends React.Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);
  }

  public render() {
    return (
      <View>
         <Text>App Component</Text>
      </View>
    );
  }
}
