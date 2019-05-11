/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import DOMParser from 'react-native-dom-parser';
import {Text, View, ScrollView, Button} from 'react-native';

export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.input = '';
    this.state = {
      text: '',
    };
  }

  httpurl(url) {
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'text/html',
        'Content-Type': 'text/html',
      }
    }).then((response)=>{
      response.text().then((txt)=>{
        let parser = DOMParser(txt);
        let hidden = parser.getElementById('hidden');
        let value = hidden.attributes.value;
        console.log(hidden);
        console.log(value);
        this.setState({text:value});
      });
    });
  }
  
  componentDidMount(){
    this.httpurl('http://localhost:9000/');
  }

  dotype = (text) => this.input = text;

  doAction = () => {
    this.httpurl('http://localhost:9000/users');
  }

  render() {
    let text = this.state.text
    return (
      <View style={{ marginTop: 100 }}>
        <ScrollView>
          <Text>
            {text}
          </Text>
        </ScrollView>
        <View>
          <Button title='users' onPress={this.doAction} />
        </View>
      </View>
    );
  }
}