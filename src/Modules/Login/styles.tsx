import {StyleSheet} from 'react-native';
import {vh, vw} from '../../Constants/Dimensions';
import Colors from '../../Constants/Colors';
const Styles = StyleSheet.create({
  main: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  signUP: {
    marginTop: vh(10),
    left: vw(30),
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: vh(28),
  },
  icSlection: {
    width: vw(30),
  },
  detailsText: {
    marginTop: vh(15),
    fontSize: vh(15),
  },
  input: {
    width: vw(320),
    height: vh(40),
    backgroundColor: Colors.textInput,
    marginTop: vh(25),
    padding: vw(10),
    borderRadius: vh(10),
    fontSize: vh(12),
    borderWidth: vw(1),
    marginLeft: vw(25),
  },
  eye: {
    position: 'absolute',
    top: vh(40),
    right: vw(35),
  },
  eyeOpen: {
    height: vw(15),
    width: vw(25),
  },
  conditions: {
    flexDirection: 'row',
    marginTop: vh(25),
    alignItems: 'center',
  },
  checkbox: {
    marginLeft: vw(8),
    borderRadius: vh(20),
    marginRight: vw(10),
    backgroundColor: 'red',
  },
  conditionText: {
    fontSize: vh(13),
    color: Colors.fadedGray,
  },
  conditionText2: {
    fontSize: vh(13),
    color: Colors.shembe,
    marginLeft: vw(-7),
  },
  Button: {
    padding: vw(10),
    margin: vw(15),
    // marginTop:vh(10),
    height: vh(40),
    width:vw(320),
    left:vw(10),
    borderRadius: vh(10),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.shembe,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  uploadimage: {
    height: vw(90),
    width: vw(90),
    borderRadius: vw(45),
    //backgroundColor: 'red',
    marginTop: vh(20),
    left: vw(125),
  },
  signIN:{
    marginTop: vh(10),
    left: vw(30),
  },
});
export default Styles;
