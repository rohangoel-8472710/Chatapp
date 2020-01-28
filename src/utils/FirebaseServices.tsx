import firebase, {Firebase, auth} from 'react-native-firebase';
import {Database, DatabaseStatics} from 'react-native-firebase/database';
import {Platform} from 'react-native';
import {string} from 'prop-types';

let Ref = firebase.database().ref('AllUsers/');
let chatref = firebase.database().ref('Msgs/');
let roomchat = firebase.database();
let inbox = firebase.database();
class Firebaseservices {
  constructor() {
    this.initializeFireBase();
  }

  initializeFireBase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(
        {
          apiKey: 'AIzaSyDcaIGCnagjv9qNWHnAu-BzFShjZK9S7Iw',
          appId:
            Platform.OS === 'ios'
              ? '1:120970505723:ios:66b87f751411ce9d7eaf5e'
              : '1:120970505723:android:9ea038a72e182e167eaf5e',
          databaseURL: 'https://chatapplication-56657.firebaseio.com',
          messagingSenderId: '120970505723',
          projectId: 'chatapplication-56657',
          storageBucket: 'chatapplication-56657.appspot.com',
        },
        'chatapplication',
      );
    }
  };

  writeUserData(email: string, fname: string, lname: string) {
    chatref
      .set({
        email,
        fname,
        lname,
      })
      .then(data => {
        console.log('data ', data);
      })
      .catch(error => {});
  }

  readUserData(callback: Function) {
    chatref.once('value', function(snapshot: any) {
      callback(snapshot.val());
    });
  }

  login = (user: any, success_callback: any, failure_callback: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback)
      .catch(failure_callback);
  };

  signUp = (user: any, success_callback: any, failure_callback: any) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(success_callback, failure_callback);
  };

  addingUser = (user: any) => {
    // console.warn('user==> ', user);
    const users = {
      key: user.uid,
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar,
    };
    Ref.push(users);
  };

  fetchList = (callback: Function) => {
    Ref.on('child_added', (snapshot: any) => {
      callback(snapshot.val());
    });
  };

  loadMsgs = (callback: Function) => {
    chatref.once('value', function(snapshot: any) {
      console.log(snapshot.val());
      callback(snapshot.val());
    });
  };

  send = (messages: Array<any>) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {text, user, createdAt: new Date().getTime()};
      // console.warn('user data', user);
      console.log('msg sended ', message);

      const datasender = {
        id: message.user.id,
        name: message.user.name,
        avatar: message.user.newavatar,
      };
      inbox
        .ref('Inbox/' + user._id)
        .child(user.roomID)
        .set({
          lastMsg: message.text,
          createdAt: message.createdAt,
          user: datasender,
          roomID: user.roomID,
        });
      const datareciver = {
        id: message.user._id,
        name: message.user._name,
        avatar: message.user.avatar,
      };
      inbox
        .ref('Inbox/' + user.id)
        .child(user.roomID)
        .set({
          lastMsg: message.text,
          createdAt: message.createdAt,
          user: datareciver,
          roomID: user.roomID,
        });

      roomchat.ref('chatRoom/' + user.roomID).push(message);
    }
  };

  refOn = (id: string, callback: Function) => {
    roomchat.ref('chatRoom/' + id).on('child_added', (snapshot: any) => {
      callback(this.parse(snapshot));
    });
  };

  parse = (snapshot: any) => {
    const {createdAt: numberStamp, text, user} = snapshot.val();
    const {key: id} = snapshot;
    const {key: _id} = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {id, _id, createdAt, text, user};
    return message;
  };

  inboxList = (uid: string, callback: Function) => {
    inbox.ref('Inbox/' + uid).on('value', function(snapshot: any) {
      callback(snapshot.val());
    });
  };

  uploadImage = (uid: string, path: any, callback: Function) => {
    const imageRef = firebase
      .storage()
      .ref('profilePic')
      .child(uid);

    return imageRef
      .putFile(path, {contentType: 'jpg'})
      .then(() => {
        return imageRef.getDownloadURL();
      })
      .then(url => {
        console.log(url);
        callback(url);
      })
      .catch(error => {});
  };

  getTypingValue = (chatRoomID: string,userID: string, callback: Function) => {
    firebase
      .database()
      .ref('Typing/' + chatRoomID)
      .child(userID)
      .on('value', (snapshot: any) => {
        callback(snapshot.val());
      });
  };

  ChangeTypingText = (chatRoomId: string, receiverID: string, value: any) => {
    firebase
      .database()
      .ref('Typing/' + chatRoomId)
      .child(receiverID)
      .set({typing: value});
  };
}

export default new Firebaseservices();
