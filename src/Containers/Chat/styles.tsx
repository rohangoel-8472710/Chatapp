import {StyleSheet} from 'react-native';
import {vh, vw} from '../../Constants/Dimensions';
import Colors from '../../Constants/Colors';
const Styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  addicon: {
    zIndex: 1,
    marginRight: vw(15),
  },
  plustyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  List: {
    flexDirection: 'row',
    padding: vh(10),
    alignItems: 'center',
    zIndex: 1,
  },
  textEmail: {
    fontSize: vw(15),
    fontWeight: 'bold',
  },
  message: {
    fontSize: vw(20),
  },
  centerNoChats: {
    marginLeft: vw(-40),
  },
  noChatImage: {
    height: vh(148),
    width: vh(182),
    alignSelf: 'center',
    marginTop: vh(120),
  },
  noChat: {
    alignSelf: 'center',
    marginTop: vh(30),
    fontWeight: '700',
    fontSize: vh(25),
    color: Colors.pinkishGrey,
    marginLeft: vw(25),
  },
  chats: {
    // paddingLeft: vw(15),
    fontSize: vw(25),
    marginLeft: vw(15),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: vh(20),
    // paddingBottom: vh(20)
  },
  messageview: {
    height: '100%',
    width: '75%',
    justifyContent: 'space-between',
    borderRadius: vw(5),

    // backgroundColor:'red'
  },
  textname: {
    fontSize: vw(20),
    fontWeight: 'bold',
  },
  addimg: {
    height: vh(25),
    width: vh(25),
  },
  profile: {
    height: vw(50),
    width: vw(50),
    borderRadius: vw(25),
  },
  parentview: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: vh(2),
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: Colors.fadedGray,
    padding: vh(10),
  },
  inboxview: {
    flex: 1,
    borderColor: Colors.fadedGray,
    borderWidth: vh(2),
    width: '100%',
    padding: vw(15),
    marginTop: vh(10),
    flexDirection: 'row',
  },
  text: {
    flexDirection: 'row',
    padding: vh(10),
    alignItems: 'center',
  },
  lastmessage: {
    fontSize: vw(12),
    color: Colors.fadedGray,
    marginTop: vh(10),
  },
  header: {
    marginTop: vh(30),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  userlist: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: vh(90),
    right: 0,
    left: 0,
    bottom: 0,
    //borderRadius: vw(10),
  },
  backButtonImage: {
    height: vw(20),
    width: vw(20),
    marginLeft: vw(15),
  },
  sendbutton: {
    backgroundColor: Colors.tealBlue,
    height: vw(45),
    width: vw(45),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: vw(5),
  },
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: vh(70),
  },
  Primary: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputText: {
    borderRadius: vw(5),
    height: vw(45),
    alignItems: 'center',
    fontSize: vw(15),
    paddingLeft: vw(10),
    paddingRight: vw(10),
    paddingBottom: vw(10),
  },
  Left: {
    backgroundColor: 'white',
    marginBottom: vh(5),
  },
  Right: {
    backgroundColor: Colors.Green,
    marginBottom: vh(5),
  },
  chatHeader: {
    flexDirection: 'row',
    paddingTop: vh(30),
    alignItems: 'center',
  },
  headerChat: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: vw(20),
    justifyContent: 'center',
  },
  headerName: {
    fontSize: vh(15),
  },
});
export default Styles;
