import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';
import {vw, vh} from '../Constants/Dimensions';

const CommonContinueButton = (Props:props) => {
  return (
    <View>
      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  continueButton: {
    width: vw(275),
    height: vw(50),
    borderRadius: vw(5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.green,
  },
  continueButtonText: {
    fontSize: vw(15),
    fontWeight: '600',
    color: Colors.white,
  },
});
export default CommonContinueButton;
