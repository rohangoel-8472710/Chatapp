// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   SafeAreaView,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';

// /*
//  ** Custom Imports
//  */
// import Strings from '../Constants/Strings';
// import Images from '../Constants/Images';
// import Colors from '../Constants/Colors';
// import {vw, vh} from '../Constants/Dimensions';
// import {ImagePicker} from '../Components';
// interface Props {}
// interface State {
//   source: string;
//   Bordername: number;
// }

// export default class Profile extends Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {
//       source: '',
//       Bordername: 0,
//     };
//   }

//   imagePicker = () => {
//     ImagePicker.GetPic((response: string) => {
//       this.setState({
//         source: response,
//       });
//     });
//   };
//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Image
//           style={styles.backImage}
//           resizeMode="contain"
//           source={Images.backarrow}
//         />
//         <Text style={styles.myProfileText}>{Strings.myprofile}</Text>
//         <Image
//           style={styles.profileImage}
//           resizeMode="contain"
//           source={
//             this.state.source === '' ? Images.PROFILE : {uri: this.state.source}
//           }
//         />
//         <TouchableOpacity onPress={() => this.imagePicker()}>
//           <Text style={styles.selectImageText}>{Strings.select_image}</Text>
//         </TouchableOpacity>
//         <View style={styles.linkView}>
//           <Text style={styles.linkText}>{Strings.link}</Text>
//           <View style={styles.buttonView}>
//             <Image style={styles.imgStyle} source={Images.facebook} />
//             <Image style={styles.imgStyle} source={Images.google} />
//           </View>
//         </View>
//         <View
//           style={[
//             styles.textInputView,
//             {
//               borderColor:
//                 this.state.Bordername === 1 ? Colors.green : Colors.inputgrey,
//             },
//           ]}>
//           <Text
//             style={{
//               fontSize: vw(15),
//               fontWeight: '500',
//               color: Colors.linkcolor,
//             }}>
//             NAME
//           </Text>
//           <TextInput
//             style={styles.input}
//             onFocus={() => {
//               this.setState({Bordername: 1});
//             }}
//             onBlur={() => {
//               this.setState({Bordername: 0});
//             }}
//             returnKeyType="next"
//           />
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   backImage: {
//     width: vw(20),
//     height: vw(17),
//     marginTop: vw(37),
//     marginLeft: vw(20),
//   },
//   myProfileText: {
//     fontSize: vw(25),
//     fontWeight: '600',
//     color: Colors.black,
//     marginLeft: vw(20),
//     marginTop: vw(16),
//   },
//   profileImage: {
//     height: vw(90),
//     width: vw(90),
//     borderRadius: vw(45),
//     alignSelf: 'center',
//     marginTop: vw(30),
//   },
//   selectImageText: {
//     fontSize: vw(15),
//     fontWeight: '600',
//     color: Colors.green,
//     textAlign: 'center',
//     marginTop: vw(20),
//   },
//   linkView: {
//     width: vw(336),
//     height: vw(125),
//     borderRadius: vw(5),
//     backgroundColor: Colors.lightestgrey,
//     marginTop: vw(27),
//     alignSelf: 'center',
//   },
//   linkText: {
//     fontSize: vw(18),
//     textAlign: 'center',
//     color: Colors.linkcolor,
//     marginVertical: vw(17),
//     fontWeight: 'normal',
//   },
//   buttonView: {
//     flexDirection: 'row',
//     alignSelf: 'center',
//     justifyContent: 'space-between',
//     width: vw(180),
//   },
//   imgStyle: {
//     width: vw(80),
//     height: vw(40),
//     borderRadius: vw(20),
//   },
//   textInputView: {
//     width: vw(336),
//     borderBottomWidth: vw(1),
//     alignSelf: 'center',
//     marginTop: vw(25),
//   },
//   input: {
//     backgroundColor: 'transparent',
//     // padding: vw(5),
//   },
// });
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function Example() {
  const [count, setCount] = useState(0);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>you clicked {count} times</Text>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text>Click Me</Text>
      </TouchableOpacity>
    </View>
  );
}
