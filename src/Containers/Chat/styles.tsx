import {StyleSheet} from 'react-native';
import {vh, vw} from '../../Constants/Dimensions';
import Colors from '../../Constants/Colors';
const Styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  addicon: {
    // position: 'absolute',
    // bottom: vh(60),
    // right: vw(30),
    // borderWidth: vh(1),
    // height: vw(40),
    // width: vw(40),
    // borderRadius: vw(62.5),
    // // borderColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center',
    zIndex: 1,
    marginRight:vw(15)
    //backgroundColor: Colors.shembe,
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
    marginLeft:vw(15),
    fontWeight:'bold'
    // paddingBottom: vh(20)
  },
  messageview: {
    height: '100%',
    width: '75%',
    justifyContent: 'space-between',
  },
  textname: {
    fontSize: vw(20),
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
    flexDirection:'row',
    borderWidth: vh(2),
    alignItems: 'center',
    justifyContent:'flex-start',
    borderColor:Colors.fadedGray,
    padding: vh(10),
  },
  inboxview: {
    flex: 1,
    borderColor: Colors.fadedGray,
    padding: vw(15),
    flexDirection: 'row',
  },
  text: {
    flexDirection: 'row',
    padding: vh(10),
  },
  lastmessage: {
    fontSize: vw(12),
  },
  header:{
   justifyContent:'space-between',
   marginTop:vh(20),
   flexDirection:'row',
   alignItems:'center'
  }
});
export default Styles;
