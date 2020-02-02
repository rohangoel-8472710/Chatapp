import {StyleSheet} from 'react-native';
import {vh, vw} from '../../Constants/Dimensions';
import Colors from '../../Constants/Colors';
const Styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: vh(30),
    alignItems: 'center',
  },
  indicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    padding: vw(10),
  },
  backbtn: {
    paddingHorizontal: vw(10),
    marginRight: vw(20),
  },
  flatstyle: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: vh(80),
    right: 0,
    left: 0,
    bottom: 0,
    borderRadius: vw(10),
    borderBottomWidth: vh(1),
    borderColor: Colors.textInput,
  },
  txt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  separator: {
    height: vh(1),
    width: '100%',
    backgroundColor: Colors.textInput,
  },
  button: {
    position: 'absolute',
    bottom: vw(50),
    right: vw(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: vw(10),
  },
  plusbutton: {
    color: 'white',
    fontSize: vw(30),
  },
  selected: {
    backgroundColor: Colors.fadedTealBlue,
  },
  imgprofile: {
    height: vw(60),
    width: vw(60),
    borderRadius: vw(30),
    marginLeft: vw(15),
    marginBottom: vh(10),
  },
  Check: {
    position: 'absolute',
    top: vw(22),
    left: vw(30),
  },
  nametext: {
    fontSize: vw(18),
    marginLeft: vw(10),
    marginTop: vh(10),
  },
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.modal,
  },
  modalview: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: vw(10),
    paddingTop: vh(20),
  },
  imgstyle: {
    height: vh(140),
    width: vh(140),
    alignItems: 'center',
    marginBottom: vh(20),
  },
  IMGstyle: {
    height: vh(140),
    width: vh(140),
    borderRadius: vh(70),
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: vh(40),
    width: vh(40),
  },
  input: {
    padding: vw(15),
    marginBottom: vh(20),
    fontSize: vw(17),
    backgroundColor: Colors.textInput,
    borderRadius: vh(5),
    width: '80%',
    borderWidth: vh(1),
  },
  ModalButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalBtn: {
    paddingVertical: vw(20),
  },
  btnText: {
    fontSize: vw(16),
    color: Colors.fadedGray,
  },
  btnText2: {
    fontSize: vw(16),
  },
  Gradient: {
    height: vw(50),
    width: vw(50),
    borderRadius: vw(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Disable: {
    opacity: 0.2,
  },
  flatview: {
    flexDirection: 'row',
    width: vw(375),
  },
});

export default Styles;
