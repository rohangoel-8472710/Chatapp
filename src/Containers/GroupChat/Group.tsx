import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import Firebaseservices from '../../utils/FirebaseServices';

export interface Props {
  navigation?: any;
  user: any;
}

interface State {
  messages: any;
  //   lastMsg: string;
}

export default class Group extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
    };
  }
  componentDidMount() {}
}