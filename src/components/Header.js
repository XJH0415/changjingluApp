import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Image,
  Alert,
  TouchableOpacity,
  TextInput,
  Platform
} from 'react-native';

export default class Header extends Component {
  static defaultProps = {
    onSelect: (index) => {
    },
    titles: ['COIN', '排行榜'],
    onBtn: (index) => {},
    onSearch:(text)=>{}
  }
  state = {
    headerSelect: 0,
    searchIng: false,
    showValue:''
  }
  _onChangeText(inputData){

  }
  render() {
    var {titles, onBtn,onSearch} = this.props;
    var {searchIng, inputValue} = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftView} onPress={() => onBtn(0)}>
            <Image style={styles.leftImage} source={require('../resource/logo.png')}/>
          </TouchableOpacity>
          {
            titles.length > 1 ?
              <View style={styles.titlesView}>
                {
                  titles.map((item, index) => {
                    return this._titleItem(item, index);
                  })
                }
              </View>
              :
              <View style={styles.titleView}>
                <Text style={[styles.titleText]}>{titles[0]}</Text>
              </View>

          }
          <TouchableOpacity style={styles.rightView} onPress={() => {
            this.setState({
              searchIng: !searchIng
            });
            onBtn(1)
          }}>
            <Image style={styles.rightImage} source={require('../resource/search.png')}/>
          </TouchableOpacity>
        </View>
        {
          searchIng ?
            <View style={styles.search}>
              <TextInput
                ref='input'
                autoCapitalize='none'
                numberOfLines={1}
                clearButtonMode='while-editing'
                multiline={false}
                placeholder={'请输入币名称'}
                selectionColor={'#75C1AF'}
                onChangeText={(inputData)=>this.inputValue=inputData}
                onSubmitEditing={(event) => onSearch(event.nativeEvent.text)}
                underlineColorAndroid='transparent'
                style={styles.searchInput}/>
              {
                Platform.OS==='android'?
                  <TouchableOpacity onPress={()=>{
                    this.refs.input.clear();
                  }}>
                    <Image style={styles.searchClear} source={require('../resource/clear.png')}/>
                  </TouchableOpacity>
                  :
                  null
              }
              <TouchableOpacity onPress={()=>{
                onSearch(this.inputValue);
              }}>
                <Text style={styles.searchBtn}>搜索</Text>
              </TouchableOpacity>
            </View>
            :
            null

        }
      </View>
    )
  }

  _titleItem(item, index) {
    var {onSelect} = this.props;
    var {headerSelect} = this.state;
    return (
      <View style={[styles.titleBtn, headerSelect === index ? {backgroundColor: '#75C1AF'} : {}]}>
        <TouchableWithoutFeedback onPress={() => {
          this.setState({headerSelect: index});
          onSelect(index)
        }}>
          <Text style={styles.titleText}>{item}</Text>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  root: {
    flexDirection: 'column'
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#171B35'
  },
  leftView: {
    height: 50,
    width: 50,
    padding: 10
  },
  leftImage: {
    height: 30,
    width: 30,
  },
  titleView: {
    flex: 1,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  titlesView: {
    width: 160,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    borderColor: '#75C1AF',
    borderRadius: 15,
    borderWidth: 2,
  },
  rightView: {
    height: 50,
    width: 50,
    padding: 12
  },
  rightImage: {
    height: 26,
    width: 26,
  },
  titleBtn: {
    flex: 1,
    alignItems: 'center'
  },
  titleText: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 26,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  search: {
    height: 30,
    margin: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden'
  },
  searchInput: {
    flex: 1,
    height: 30,
    padding: 0,
    paddingLeft: 10,
  },
  searchClear:{
    height:16,
    width:16,
    margin:9
  },
  searchBtn: {
    height: 30,
    lineHeight: 26,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#75C1AF'
  }
})