import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {vh, vw} from '../../../Constants/Dimensions';
const Styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: vw(30),
  },
  Text: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: vw(17),
  },
  resultText: {
    alignSelf: 'center',
    color: Colors.Green,
  },
  upperView: {
    flex: 0.45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTextView: {
    borderWidth: vw(2),
    borderColor: Colors.tealBlue,
    padding: vw(20),
    width: vw(350),
    borderRadius: vw(10),
  },
  lowerView: {
    flex: 0.55,
  },
  ButtonView: {
    padding: vw(10),
    margin: vw(20),
    width: vw(150),
    height: vw(80),
    borderRadius: vw(15),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
export default Styles;
