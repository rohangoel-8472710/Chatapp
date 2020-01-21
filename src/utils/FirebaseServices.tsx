import firebase, {Firebase, auth} from 'react-native-firebase';
import {Database, DatabaseStatics} from 'react-native-firebase/database';
import {Platform} from 'react-native';
//import Store from '../Store/Store';
class Firebaseservices {
  state = {
    name: '',
    email: '',
    password: '',
    messages: [],
  };
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

  createAccount = (
    email: string,
    password: string,
    loginsuccess: any,
    loginfailed: any,
  ) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(loginsuccess, loginfailed);
  };
  onPressLogin = (
    email: string,
    password: string,
    loginsuccess: any,
    loginfailed: any,
  ) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loginsuccess, loginfailed);
  };

  send = (messages: any) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      console.warn('user => ', user);
      const message = {text, user, createdAt: new Date().getTime()};
      console.log('msg sended ', message);

      // const userDetails = {id: id, email: email, message: message};
      // console.warn(userDetails);
      // firebase
      //   .database()
      //   .ref('Inbox/')
      //   .push(userDetails);

      firebase
        .database()
        .ref('Users/')
        .push(message);
    }
  };
  parse = (snapshot: any) => {
    const {timestamp: numberStamp, text, user} = snapshot.val();
    const {key: _id} = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {_id, timestamp, text, user};
    return message;
  };
  refOn = (callback: any) => {
    firebase
      .database()
      .ref('Users/')
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  };
  // getList = (callback: any) => {
  //   firebase
  //     .database()
  //     .ref('allusers/')
  //     .on('child_added', (snapshot: any) => callback(snapshot.val()));
  // };
  readUserData(callback: Function) {
    firebase
      .database()
      .ref('allusers/')
      .on('child_added', snapshot => callback(snapshot.val()));
  }
  writedata(id: string, email: string, image: string) {
    const userDetails = {id: id, email: email, image: image};
    firebase
      .database()
      .ref('allusers/')
      .push(userDetails);
  }
  writeinboxdata(id: string, email: string, message: string) {
    const userDetails = {id: id, email: email, message: message};
    console.warn(userDetails);
    firebase
      .database()
      .ref('Inbox/')
      .push(userDetails);
  }
  readInboxData(callback: Function) {
    firebase
      .database()
      .ref('Inbox/')
      .once('value', function(snapshot: any) {
        callback(snapshot.val());
      });
  }

  // getdata = (email: string) => {
  //   firebase
  //     .database()
  //     .ref('allusers/')
  //     .push(email);
  // };

  uploadImage = (uri: string, email: string) => {
    try {
      const imagedata = {uri:uri,email:email}
      firebase
        .storage()
        .ref('Images/')
        .push(imagedata);
    } catch (err) {}
  };

  //       const task = ref.putFile(uri);
  //       console.log('Here Task=>', task);
  //       //@ts-ignore
  //       let imageURL = await new Promise((resolve, reject) => {
  //         task.then(snap => {
  //           ref.getDownloadURL().then(data => {
  //             resolve(data);
  //           });
  //         });
  //       });
  //       return imageURL;
  //     } catch (err) {
  //       console.log('uploadImage try/catch error: ' + err.message);
  //     }
  //   };
}
export default new Firebaseservices();
