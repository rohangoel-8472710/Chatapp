import {StyleSheet} from 'react-native';
import Colors from '../../../Constants/Colors';
import {vh, vw} from '../../../Constants/Dimensions';
const Styles = StyleSheet.create({
  parent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: vw(17),
  },
  newView: {
    padding: vw(10),
    margin: vw(20),
    width: vw(150),
    height: vw(100),
    borderRadius: vw(15),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  resultText: {
    borderWidth: vw(2),
    padding: vw(20),
    borderRadius: vw(10),
    width: vw(350),
    alignSelf: 'center',
    color: Colors.Green,
  },
});
export default Styles;
