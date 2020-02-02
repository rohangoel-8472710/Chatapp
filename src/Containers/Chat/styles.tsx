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
    fontSize: vw(25),
    marginLeft: vw(15),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: vh(20),
  },
  messageview: {
    flexDirection: 'row',
    // backgroundColor: 'red',
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
    marginLeft: vw(15),
  },
  parentview: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: vh(1),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: Colors.textInput,
    padding: vh(15),
  },
  inboxview: {
    flex: 1,
    borderColor: Colors.textInput,
    borderBottomWidth: vh(1),
    marginTop: vh(20),
    flexDirection: 'row',
    // backgroundColor: 'pink',
    justifyContent: 'space-between',
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
    justifyContent: 'flex-end',
    width: '100%',
  },
  userlist: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: vh(80),
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
    marginHorizontal: vh(7.5),
  },
  Container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: vh(25),
    maxHeight: vh(80),
    paddingVertical: vh(1),
    borderTopWidth: 0,
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
    paddingLeft: vh(10),
    paddingRight: vh(10),
    paddingBottom: vh(10),
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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerChat: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: vw(20),
    justifyContent: 'center',
  },
  headerName: {
    fontSize: vh(15),
    marginLeft: vw(10),
    marginTop: vh(5),
  },
  Timeview: {
    // justifyContent: 'space-between',
  },
  Timetextinbox: {
    fontSize: vw(14),
    color: Colors.tealBlue,
    marginRight: vw(14),
  },
  textTime: {
    fontSize: vw(12),
  },
  DAY: {
    backgroundColor: Colors.day,
    paddingHorizontal: vw(13),
    paddingVertical: vh(8),
    borderRadius: vh(5),
  },
  daytext: {
    fontSize: vw(13),
    color: Colors.greyishBrown,
  },
  footer: {
    height: vh(20),
    width: '100%',
  },
  imgheader: {
    height: vw(40),
    width: vw(40),
    borderRadius: vw(20),
  },
  imgheaderView: {
    padding: vw(10),
    paddingLeft: 0,
    flexDirection: 'row',
  },
  msgandname: {
    flexDirection: 'column',
    marginLeft: vw(10),
    marginBottom: vh(10),
  },
  Typingtext: {
    fontSize: vh(13),
    marginLeft: vw(10),
    fontWeight: 'bold',
    color: Colors.greyishBrown,
  },
  textusername: {
    fontSize: vw(20),
    fontWeight: 'bold',
    marginLeft: vw(10),
    marginTop: vh(10),
  },
  profileuser: {
    height: vw(50),
    width: vw(50),
    borderRadius: vw(25),
  },
  separator: {
    height: vh(1),
    width: '100%',
    backgroundColor: Colors.textInput,
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: vh(15),
  },
  txt: {
    flexDirection: 'row',
    padding: vh(10),
    alignItems: 'center',
  },
  msgView: {
    height: '100%',
    width: '75%',
    justifyContent: 'space-between',
  },
  nameStyle: {
    fontSize: vw(18),
  },
  leftheader: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  cameraIcon: {
    paddingHorizontal:vw(7.5)
  },
});
export default Styles;
