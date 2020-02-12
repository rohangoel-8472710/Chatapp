import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  NativeModules,
  NativeEventEmitter,
  TouchableOpacity,
} from 'react-native';

// instantiate the event emitter
const CounterEvents = new NativeEventEmitter(NativeModules.Counter);

export interface AppProps {}

export interface AppState {
  counter: string;
}

export default class Counter extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      counter: '0',
    };
  }

  componentDidMount() {
    // subscribe to event
    CounterEvents.addListener('onIncrement', res =>
      console.log('onIncrement event', res),
    );
  }
  async increment() {
    try {
      const res = await NativeModules.Counter.incr();
      console.warn(res);
    } catch (e) {
      console.warn(e.message, e.code);
    }
    this.counterValue();
  }

  async decrement() {
    try {
      const res = await NativeModules.Counter.decrement();
      console.warn(res);
    } catch (e) {
      console.warn(e.message, e.code);
    }
    this.counterValue();
  }

  counterValue = () => {
    NativeModules.Counter.getCount(
      (value: string, number: string, name: string) => {
        this.setState({counter: value});
      },
    );
  };
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text>textInComponent {this.state.counter}</Text>
        <TouchableOpacity onPress={() => this.increment()}>
          <Text>Increase</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.decrement()}>
          <Text>Decrease</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
