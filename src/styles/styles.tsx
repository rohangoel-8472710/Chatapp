import {StyleSheet} from 'react-native';
import {vh, vw} from '../Constants/Dimensions';
export const styles = StyleSheet.create({
  container: {
    paddingTop: vh(30),
  },
  input: {
    margin: vw(15),
    height: vh(40),
    borderColor: '#7a42f4',
    borderWidth: vw(1),
    textAlign: 'left',
    paddingLeft: vw(10),
  },
  Button: {
    backgroundColor: '#7a42f4',
    padding: vw(10),
    margin: vw(15),
    height: vh(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  List: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: vh(1),
    flexDirection: 'row',
    width: vw(330),
    height: vh(30),
    marginTop: vh(20),
    alignSelf: 'center',
  },
  parent: {
    flex: 1,
  },
  addicon: {
    position: 'absolute',
    bottom: vh(30),
    right: vw(30),
    borderWidth: vh(1),
    height: vh(40),
    width: vw(40),
    borderRadius: vw(62.5),
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor:'red'
  },
  plustyle:{
    fontSize: 30,
    fontWeight:'bold',
    color:'white'
  },
  lastMessage: {
    flexDirection: 'column',
    flex: 1,
    //margin: vh(15)
},
name:{
  fontSize:vw(20)
},
message:{
  fontSize:vw(10)
}
});
