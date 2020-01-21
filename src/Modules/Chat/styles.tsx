import {StyleSheet} from 'react-native';
import {vh, vw} from '../../Constants/Dimensions';
import Colors from '../../Constants/Colors';
const Styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  addicon: {
    position: 'absolute',
    bottom: vh(60),
    right: vw(30),
    borderWidth: vh(1),
    height: vw(40),
    width: vw(40),
    borderRadius: vw(62.5),
    // borderColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    backgroundColor: Colors.shembe,
  },
  plustyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  List: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: vh(1),
    flexDirection: 'row',
    width: vw(330),
    height: vh(30),
    marginTop: vh(20),
    backgroundColor: Colors.fadedGray,
    alignSelf: 'center',
  },
  textEmail: {
    fontSize: vw(15),
    fontWeight: 'bold',
  },
  message: {
    fontSize: vw(20),
  },
});
export default Styles;
