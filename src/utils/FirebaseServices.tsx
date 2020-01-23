import firebase, {Firebase, auth} from 'react-native-firebase';
import {Database, DatabaseStatics} from 'react-native-firebase/database';
import {Platform} from 'react-native';

let userRef = firebase.database().ref('AllUsers/');
let chatRef = firebase.database().ref('Msgs/');
let roomchat = firebase.database();
let inbox = firebase.database();
//import Store from '../Store/Store';
class Firebaseservices {
  // state = {
  //   name: '',
  //   email: '',
  //   password: '',
  //   messages: [],
  // };
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

  //creating user
  // createAccount = (
  //   email: string,
  //   password: string,
  //   loginsuccess: any,
  //   loginfailed: any,
  // ) => {
  //   firebase
  //     .auth()
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(loginsuccess, loginfailed);
  // };

  // //Sign In
  // onPressLogin = (user: any, loginsuccess: any, loginfailed: any) => {
  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(user.email, user.password)
  //     .then(loginsuccess, loginfailed);
  // };

  // //storing msgs
  // send = (messages: any) => {
  //   for (let i = 0; i < messages.length; i++) {
  //     const {text, user} = messages[i];
  //     console.warn('user => ', user);
  //     const message = {text, user, createdAt: new Date().getTime()};
  //     console.log('msg sended ', message);

  //     //adding msg on send to sender inbox
  //     firebase
  //       .database()
  //       .ref('Inbox/' + user._id)
  //       .child(user.roomID)
  //       .set({
  //         lastMsg: message.text,
  //         createdAt: message.createdAt,
  //         user: message.user,
  //       });

  //     //adding msg on send to reciever inbox
  //     firebase
  //       .database()
  //       .ref('Inbox/' + user._id)
  //       .child(user.roomID)
  //       .set({
  //         lastMsg: message.text,
  //         createdAt: message.createdAt,
  //         user: message.user,
  //       });
  //     firebase
  //       .database()
  //       .ref('Chatroom/' + user.roomID)
  //       .push(message);
  //   }
  // };

  // parse = (snapshot: any) => {
  //   const {createdAt: numberStamp, text, user} = snapshot.val();
  //   const {key: id} = snapshot;
  //   const {key: _id} = snapshot;
  //   const createdAt = new Date(numberStamp);
  //   const message = {id, _id, createdAt, text, user};
  //   console.log(message);
  //   return message;
  // };

  // refOn = (id: string, callback: Function) => {
  //   firebase
  //     .database()
  //     .ref('Chatroom/' + id)
  //     .on('child_added', (snapshot: any) => callback(this.parse(snapshot)));
  // };

  // //
  // getList = (callback: any) => {
  //   firebase
  //     .database()
  //     .ref('allusers/')
  //     .on('child_added', (snapshot: any) => callback(snapshot.val()));
  // };

  // //
  // loadMsgs = (callback: Function) => {
  //   firebase
  //     .database()
  //     .ref('messages/')
  //     .once('value', function(snapshot: any) {
  //       console.log(snapshot.val());
  //       callback(snapshot.val());
  //     });
  // };

  // //getting data from database
  // readUserData(callback: Function) {
  //   firebase
  //     .database()
  //     .ref('allusers/')
  //     .once('value', function(snapshot: any) {
  //       callback(snapshot.val());
  //     });
  // }

  // writedata(user: any) {
  //   const userDetails = {
  //     id: user.id,
  //     email: user.email,
  //     imageURL: user.image,
  //     displayname: user.name,
  //   };
  //   firebase
  //     .database()
  //     .ref('allusers/')
  //     .push(userDetails);
  // }

  // writeinboxdata(id: string, email: string, message: string) {
  //   const userDetails = {id: id, email: email, message: message};
  //   console.warn(userDetails);
  //   firebase
  //     .database()
  //     .ref('Inbox/')
  //     .push(userDetails);
  // }

  // // readInboxData(callback: Function) {
  // //   firebase
  // //     .database()
  // //     .ref('Inbox/')
  // //     .once('value', function(snapshot: any) {
  // //       callback(snapshot.val());
  // //     });
  // // }

  // //getting last msg
  // Inboxlist = (uid: string, callback: Function) => {
  //   firebase
  //     .database()
  //     .ref('Inbox/' + uid)
  //     .on('value', function(snapshot: any) {
  //       console.log(snapshot.val());
  //       callback(snapshot.val());
  //     });
  // };

  // // getdata = (email: string) => {
  // //   firebase
  // //     .database()
  // //     .ref('allusers/')
  // //     .push(email);
  // // };

  // uploadImage = (uid: string, path: any, callback: Function) => {
  //   const image = firebase
  //     .storage()
  //     .ref('Pic')
  //     .child(uid);
  //   return image
  //     .putFile(path, {contentType: 'jpg'})
  //     .then(() => {
  //       return image.getDownloadURL();
  //     })
  //     .then(url => {
  //       console.log(url);
  //       callback(url);
  //     })
  //     .catch(error => {
  //       console.warn('Error uploading image: ', error);
  //     });
  // };

  writeUserData(email: string, fname: string, lname: string) {
    chatRef
      .set({
        email,
        fname,
        lname,
      })
      .then(data => {
        console.log('data ', data);
      })
      .catch(error => {
        console.warn('error ', error);
      });
  }

  readUserData(callback: Function) {
    chatRef.once('value', function(snapshot: any) {
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
    const users = {
      key: user.uid,
      displayName: user.name,
      email: user.email,
      photoURL: user.avatar,
    };
    userRef.push(users);
  };

  fetchList = (callback: Function) => {
    userRef.on('child_added', (snapshot: any) => {
      callback(snapshot.val());
    });
  };

  loadMsgs = (callback: Function) => {
    chatRef.once('value', function(snapshot: any) {
      console.log(snapshot.val());
      callback(snapshot.val());
    });
  };

  send = (messages: Array<any>) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {text, user, createdAt: new Date().getTime()};
      console.log('msg sended ', message);

      // adding last msg on send msg to sender inbox------
      inbox
        .ref('Inbox/' + user._id)
        .child(user.roomID)
        .set({
          lastMsg: message.text,
          createdAt: message.createdAt,
          user: message.user,
        });

      // adding last msg on send msg to receiver inbox-----
      inbox
        .ref('Inbox/' + user.id)
        .child(user.roomID)
        .set({
          lastMsg: message.text,
          createdAt: message.createdAt,
          user: message.user,
        });

      // sending actual msg -------------------------
      roomchat.ref('chatRoom/' + user.roomID).push(message);
    }
  };

  // Load msgs from Database to Chat-------------------
  refOn = (id: string, callback: Function) => {
    roomchat
      .ref('chatRoom/' + id)
      // .limitToLast(20)
      .on('child_added', (snapshot: any) => {
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
      console.log(snapshot.val());
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
      .catch(error => {
        console.warn('Error uploading image: ', error);
      });
  };
}

export default new Firebaseservices();
