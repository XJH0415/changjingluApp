/**
 * 猜涨跌规则
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import Rules from "../utils/Rules";

export  default class BetRulesItem extends Component {

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.rules}>
          <Text style={styles.rulesTitle}>{Rules.title1}</Text>
          <Text style={styles.rulesText}>{Rules.text1}</Text>
          <Text style={styles.rulesTitle}>{Rules.title2}</Text>
          <Text style={styles.rulesText}>{Rules.text2}</Text>
          <Text style={styles.rulesTitle}>{Rules.title3}</Text>
          <Text style={[styles.rulesText,{marginBottom: 10,}]}>{Rules.text3}</Text>
        </View>
      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    flex: 1,
  },
  rules:{
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff',
  },
  rulesTitle:{
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  rulesText:{
    marginLeft: 5,
    marginRight: 5,
  },
});