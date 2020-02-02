import firebase, {Firebase, auth} from 'react-native-firebase';
import {Database, DatabaseStatics} from 'react-native-firebase/database';
import {Platform} from 'react-native';

let Ref = firebase.database().ref('AllUsers/');
let chatref = firebase.database().ref('Msgs/');
let roomchat = firebase.database();
let inbox = firebase.database();
let Gpref = firebase.database().ref('GroupUsers/');
var AllGroupUsers: Array<any>;

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

  //adding data in database
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

  //get data from database
  readUserData(callback: Function) {
    chatref.once('value', function(snapshot: any) {
      callback(snapshot.val());
    });
  }

  //Delete data from DB
  deleteUserData() {
    chatref.remove();
  }

  //Sign In for Firebase Auth
  login = (user: any, success_callback: any, failure_callback: any) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success_callback)
      .catch(failure_callback);
  };

  //creating new user
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
      photoURL: user.avatar === null ? '' : user.avatar,
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

  //Storing msgs on Firebase Db
  send = (messages: Array<any>, image?: string) => {
    for (let i = 0; i < messages.length; i++) {
      const {text, user} = messages[i];
      const message = {
        text,
        user,
        createdAt: new Date().getTime(),
        image: image,
      };
      console.log('msg sended ', message);

      if (message.user.type === 'normal') {
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
            roomID: user.roomID,
            type: user.type,
            user: datasender,
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
            roomID: user.roomID,
            type: user.type,
            user: datareciver,
          });
      } else if (message.user.type === 'group') {
        const groupDetails = {
          id: message.user.id,
          name: message.user.name,
          avatar: message.user.newavatar,
        };
        AllGroupUsers.map(function(id) {
          inbox
            .ref('Inbox/' + id)
            .child(user.roomID)
            .set({
              lastMsg: message.text,
              createdAt: message.createdAt,
              roomID: user.roomID,
              type: user.type,
              user: groupDetails,
            });
        });
      }

      //sending actual msg
      roomchat.ref('chatRoom/' + user.roomID).push(message);

      this.falseTypingIndicator(user.roomID, user._id);
    }
  };

  refOn = (
    counter: number,
    id: string,
    type: string,
    allUsers: Array<any>,
    callback: Function,
  ) => {
    if (type === 'group') {
      AllGroupUsers = allUsers;
    }
    roomchat
      .ref('chatRoom/' + id)
      .limitToLast(counter === 1 ? 20 : 20 * counter)
      // .on('child_added', (snapshot: any) => {
      //   // alert('sdaf')
      //   callback(this.parse(snapshot));
      // });
      .on('value', (snapshot: any) => {
        snapshot.val() === null ? callback([]) : callback(this.parse(snapshot));
      });
  };

  // parse = (snapshot: any) => {
  //   const {createdAt: numberStamp, text, user, image} = snapshot.val();
  //   const {key: id} = snapshot;
  //   const {key: _id} = snapshot;
  //   const createdAt = new Date(numberStamp);
  //   const message = {id, _id, createdAt, text, user, image};
  //   return message;
  // };

  parse = (snapshot: any) => {
    var result = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
    result.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
    return result;
  };

  inboxList = (uid: string, callback: Function) => {
    inbox.ref('Inbox/' + uid).on('value', function(snapshot: any) {
      callback(snapshot.val());
    });
  };

  uploadImage = (uid: string, paths: any, callback: Function) => {
    if (!!paths) {
      const imageRef = firebase
        .storage()
        .ref('profilePic')
        .child(uid);

      return imageRef
        .putFile(paths, {contentType: 'jpg'})
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
    } else {
      callback(null);
    }
  };

  uploadMsgPic = (paths: any, callback: Function) => {
    if (!!paths) {
      const imageRef = firebase
        .storage()
        .ref('msgPics')
        .child(Math.random().toString());
      return imageRef
        .putFile(paths, {contentType: 'jpg'})
        .then(() => {
          return imageRef.getDownloadURL();
        })
        .then(url => {
          console.log(url);
          callback(url);
        })
        .catch(error => {
          console.warn('Error uploading image:', error);
        });
    } else {
      callback(null);
    }
  };

  CreatingGroup = (
    gpId: string,
    allUsers: any,
    gpPic: string,
    creator: Object,
    callback: Function,
  ) => {
    const data = {
      avatar: gpPic === null ? '' : gpPic,
      creator: creator,
      AllUsers: allUsers,
    };
    Gpref.child(`/${gpId}`).push(data);
    callback(data);
  };

  fetchingGroupUsers = (roomID: string, callback: Function) => {
    firebase
      .database()
      .ref('GroupUsers/' + roomID)
      .on('child_added', (snapshot: any) => {
        callback(snapshot.val());
      });
  };

  fetchTyping = (roomID: string, uid: string, callback: Function) => {
    roomchat
      .ref('Typing/' + roomID)
      .child(uid)
      .on('value', function(snapshot: any) {
        callback(snapshot.val());
      });
  };

  Typingdisplay = (roomID: string, myUID: string) => {
    roomchat
      .ref('Typing/' + roomID)
      .child(myUID)
      .set({
        isTyping: true,
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.warn('error', error);
      });
  };

  // typing indicator false
  falseTypingIndicator = (roomID: string, _id: string) => {
    roomchat
      .ref('Typing/' + roomID)
      .child(_id)
      .set({
        isTyping: false,
      })
      .then(data => {
        console.log('false isTyping ', data);
      })
      .catch(error => {
        console.warn('error ', error);
      });
  };
}

export default new Firebaseservices();
