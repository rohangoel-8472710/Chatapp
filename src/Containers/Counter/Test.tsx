import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

/*
 ** Custom Imports
 */
import {vw, vh} from '../../Constants/Dimensions';

interface Props {}
interface State {
  collapsed: boolean;
  activeSections: Array<any>;
  multipleSelect: boolean;
}

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket.';

const data = [
  {
    title: 'First',
    content: BACON_IPSUM,
  },
  {
    title: 'Second',
    content: BACON_IPSUM,
  },
  {
    title: 'Third',
    content: BACON_IPSUM,
  },
  {
    title: 'Fourth',
    content: BACON_IPSUM,
  },
  {
    title: 'Fifth',
    content: BACON_IPSUM,
  },
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];
export default class Test extends Component<Props, State> {
  state = {
    collapsed: true,
    activeSections: [],
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({collapsed: !this.state.collapsed});
  };

  setSections = (sections: any) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    });
  };

  renderHeader = (section: any, isActive: any) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Text style={styles.headerText}>{section.title}</Text>
      </Animatable.View>
    );
  };

  renderContent = (section: any, isActive: any) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor">
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {section.content}
        </Animatable.Text>
      </Animatable.View>
    );
  };

  render() {
    const {activeSections, multipleSelect} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{paddingTop: vh(40)}}>
          <Text style={styles.title}>Collapsible Example</Text>
          {/* <View style={styles.multipleToggle}>
            <Text style={styles.multipleToggleTitle}>Multiple Select</Text>
            <Switch
              value={multipleSelect}
              onValueChange={val => this.setState({multipleSelect: val})}
            />
          </View> */}
          {/* <View style={styles.selectors}>
            <Text style={styles.selectTitle}>Select:</Text>
            {SELECTORS.map(selector => (
              <TouchableOpacity
                key={selector.title}
                onPress={() => this.setSections([selector.value])}>
                <View style={styles.selector}>
                  <Text
                    style={
                      activeSections.includes(selector.value) &&
                      styles.activeSelector
                    }>
                    {selector.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View> */}
          <TouchableOpacity onPress={this.toggleExpanded}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Single Collapsible</Text>
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={this.state.collapsed} align="center">
            <View style={styles.content}>
              <Text>
                Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
                ribs
              </Text>
            </View>
          </Collapsible>
          <Accordion
            activeSections={activeSections}
            sections={data}
            touchableComponent={TouchableOpacity}
            renderHeader={this.renderHeader}
            expandMultiple={false}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5FCFF',
  },
  header: {
    // backgroundColor: '#F5FCFF',
    padding: vw(20),
  },
  active: {
    backgroundColor: 'pink',
  },
  inactive: {
    backgroundColor: 'red',
  },
  headerText: {
    fontSize: vw(16),
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    padding: vw(20),
    backgroundColor: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: vw(20),
    marginBottom: vh(20),
    fontWeight: '300',
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: vh(30),
  },
  multipleToggleTitle: {
    fontSize: vw(16),
    marginRight: vw(8),
  },
  selectors: {
    marginBottom: vh(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selectTitle: {
    fontSize: vw(15),
    padding: vw(10),
    fontWeight: '500',
  },
  selector: {
    // backgroundColor: '#F5FCFF',
    padding: vw(10),
  },
  activeSelector: {
    fontWeight: 'bold',
  },
});
