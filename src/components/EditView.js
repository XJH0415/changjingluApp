import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View ,
  StyleSheet,
  Image,
  TextInput} from 'react-native';
let Dimensions = require('Dimensions');
let screenWidth = Dimensions.get('window').width;
let dialogWidth = screenWidth-80;
export default class EditView extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  onClose() {
    this.setState({modalVisible: false});
  }
  render() {
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
        >
          <TouchableOpacity style={{flex:1}} onPress={this.onClose.bind(this)}>
            <View style={styles.container}>
              <View style={styles.innerContainer}>
                <Text>回复</Text>
                <TextInput
                  style={styles.inputtext}
                  placeholder="回复内容"
                />
                <View style={styles.btnContainer}>
                  <TouchableOpacity onPress={() => {
                    this.setModalVisible(!this.state.modalVisible)
                  }}>
                    <Text  style={styles.hidemodalTxt}>关闭</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        <TouchableOpacity onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>弹出对话框</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20

  },
  btnContainer:{
    width:dialogWidth,
    borderTopWidth:1,
    borderTopColor:'#777',
    alignItems:'center'
  },
  inputtext:{
    width:dialogWidth-20,
    margin:10,
  },
  hidemodalTxt: {
    marginTop:10,
  },
});