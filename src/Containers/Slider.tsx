import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, SafeAreaView} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/AntDesign';
/*
 ** Custom Imports
 */
import Strings from '../Constants/Strings';
import Images from '../Constants/Images';
import Colors from '../Constants/Colors';
import {vw, vh} from '../Constants/Dimensions';

interface Props {}
interface State {
  App: boolean;
}

const Slides = [
  {
    title: Strings.welcome_to_senioroty,
    text: Strings.welseniority,
    image: Images.welcomeseniority,
  },
  {
    title: Strings.live_evergreen,
    text: Strings.liveevergreentext,
    image: Images.evergreenimage,
  },
  {
    title: Strings.blog,
    text: Strings.blogtext,
    image: Images.blogimage,
  },
];
export default class Slider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      App: false,
    };
  }
  renderSlides = ({item}: any) => {
    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.imgStyle}
          resizeMode="contain"
          source={item.image}
        />
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.textStyle}>{item.text}</Text>
      </SafeAreaView>
    );
  };

  SkipButton = () => {
    return (
      <View style={styles.buttonStyle}>
        <Text style={styles.skipText}>SKIP</Text>
      </View>
    );
  };

  NextButton = () => {
    return (
      <View style={styles.nextButtonStyle}>
        <Icon
          name="arrowright"
          color={Colors.green}
          size={vw(20)}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };

  Done = () => {
    this.setState({App: true});
  };
  render() {
    if (this.state.App) {
      return <Slider />;
    } else {
      return (
        <AppIntroSlider
          renderItem={(item: any) => this.renderSlides(item)}
          slides={Slides}
          onDone={this.Done}
          activeDotStyle={styles.activeDot}
          renderSkipButton={this.SkipButton}
          // showNextButton={false}
          showDoneButton={false}
          // showSkipButton={true}
          renderNextButton={this.NextButton}
          // showPrevButton={true}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  titleText: {
    fontSize: vw(25),
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    marginTop: vw(50),
  },
  imgStyle: {
    width: vw(248),
    height: vw(263),
  },
  textStyle: {
    fontSize: vw(17),
    fontWeight: '500',
    color: Colors.grey,
    textAlign: 'center',
    marginVertical: vw(6),
    width: vw(241),
  },
  activeDot: {
    width: vw(17),
    height: vw(8),
    borderRadius: vw(4),
    backgroundColor: Colors.green,
  },
  buttonStyle: {
    width: vw(33),
    height: vw(20),
  },
  skipText: {
    fontSize: vw(15),
    fontWeight: '600',
    color: Colors.grey,
    textAlign: 'right',
  },
  nextButtonStyle: {
    width: vw(18),
    height: vw(15),
    justifyContent: 'center',
    alignItems: 'center',
    // marginRight:vw(26)
  },
});
