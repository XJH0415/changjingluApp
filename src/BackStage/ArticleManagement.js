/**
 * 文章管理
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Separator from "../components/Separator";
import BackStageArticleList from "./BackStageArticleList";

const deviceWidth = Dimensions.get('window').width;      //设备的宽度
const deviceHeight = Dimensions.get('window').height;    //设备的高度

export  default class ArticleManagement extends Component {
  static navigationOptions = (options) => {
    var {navigation} = options;
    var data = null;
    var headerTitle = '文章管理';
    return {
      headerTitle: headerTitle
    };
  };

  state = {
    title: null,
    AuditStatusText: '- - - 不限 - - -',
    StatusText: '- - - 不限 - - -',
    AuditStatus:[
      '- - - 不限 - - -',
      '待审核',
      '审核通过',
      '审核不通过',
    ],
    Status:[
      '- - - 不限 - - -',
      '正常',
      '已删除',
    ],
  }

  _titleText(title){
    if (title){
      this.setState({
        title: title
      })
    }
  }

  _onSearchBtn(){
    var {title, AuditStatusText, StatusText} = this.state;
    alert(title + AuditStatusText + StatusText)
  }

  _onDeleteBtn(){
    this.refs.input.clear();
    // console.log(this.refs.modal)
    // this.refs.modal.props.defaultValue = '- - - 不限 - - -';
  }

  render() {
    var {title, AuditStatus, Status, AuditStatusText, StatusText} = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.searchView}>
          <View style={styles.titleView}>
            <Text >标题</Text>
            <TextInput
              ref = 'input'
              style={styles.input}
              autoCapitalize='none'
              underlineColorAndroid={'transparent'}
              placeholderTextColor={'#b1b1b1'}
              placeholder={'标题关键字'}
              selectionColor={'#75C1AF'}
              blurOnSubmit={true}
              onChangeText={(title)=>{this._titleText(title)}}
            />
          </View>
          <View>
            <Text >审核状态</Text>
            <ModalDropdown
              ref = 'modal'
              options={AuditStatus}
              defaultValue={AuditStatusText}
              style={[styles.input, styles.modalBtn]}
              dropdownStyle={[styles.dropDown,{height: 145,}]}
              onSelect={(index, value)=>{
                // alert(index+value)
                this.setState({
                  AuditStatusText: value
                })
              }}
            />
          </View>
          <View>
            <Text >状态</Text>
            <ModalDropdown
              options={Status}
              defaultValue={StatusText}
              style={[styles.input, styles.modalBtn]}
              dropdownStyle={[styles.dropDown,{height: 110}]}
              onSelect={(index, value)=>{
                // alert(index+value)
                this.setState({
                  StatusText: value
                })
              }}
            />
          </View>
          <View style={styles.btnView}>
            <View style={[styles.seaDelBtn, {backgroundColor: '#428bca',}]}>
              <TouchableOpacity onPress={()=>{this._onSearchBtn()}}>
                <Text style={styles.seaDelTxt}>搜索</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.seaDelBtn, {backgroundColor: '#ff4f48',}]}>
              <TouchableOpacity onPress={()=>{this._onDeleteBtn()}}>
                <Text style={styles.seaDelTxt}>清除</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Separator />

        <BackStageArticleList />
      </View>
    );
  }

}

const styles=StyleSheet.create({
  root:{
    flex: 1,
    backgroundColor: '#fff',
  },
  searchView:{
    marginLeft: 5,
    marginTop: 5,
  },
  titleView:{

  },
  input:{
    margin: 0,
    padding: 0,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 2,
    paddingLeft: 5,
    marginRight: 5,
  },
  modalBtn:{
    height: 30,
    justifyContent: 'center'
  },
  dropDown:{
    width: deviceWidth - 20,
    margin: 0,
    padding: 0,
  },
  btnView:{
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  seaDelBtn:{
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  seaDelTxt:{
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    color: '#fff',
  },
});