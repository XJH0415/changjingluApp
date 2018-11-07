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
import API from '../lib/dataApi';

export default class Header extends Component {
  static defaultProps = {
    headerSelect: 0,
    onSelect: (index) => {
    },
    titles: [],
    onBtn: (index) => {
    },
    onSearch: (text) => {
    },
    searchType: 'coins',
    showSearch: true,
  }
  state = {
    headerSelect: this.props.headerSelect,
    searchIng: false,
    titles: this.props.titles,
    coins:[],
    sites:[]
  }

  componentWillReceiveProps(props) {
    this.setState({
      headerSelect: props.headerSelect,
      titles: props.titles,
    })
  }
  _search(q){
    var that=this;
    var {searchType}=this.props;
    if(!q){
      that.setState({
        sites:[],
        coins:[]
      })
    }else {
      API.search(q,(data)=>{
        if(searchType==='coins'){
          that.setState({
            coins:data.coins
          })
        }else if(searchType==='sites'){
          that.setState({
            sites:data.sites
          })
        }
      })
    }
  }
  
  render() {
    var {titles, searchType, onBtn, onSearch, showSearch} = this.props;
    var {searchIng,coins,sites} = this.state;
    return (
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.leftView} onPress={() => onBtn(-1)}>
            <Image style={styles.leftImage} source={require('../resource/logo.png')}/>
          </TouchableOpacity>
          {
            titles && titles.length > 1 ?
              <View style={styles.titlesView}>
                {
                  titles.map((item, index) => {
                    return this._titleItem(item, index);
                  })
                }
              </View>
              :
              <View style={styles.titleView}>
                <Text style={[styles.titleText]}>{titles[0] ? titles[0] : '标题'}</Text>
              </View>

          }
          <View style={styles.rightView}>
            {
              showSearch ?
                <TouchableOpacity onPress={() => {
                  this.setState({
                    searchIng: !searchIng,
                    coins:[],
                    sites:[]
                  });
                  onBtn(1)
                }}>
                  <Image style={styles.rightImage} source={require('../resource/search.png')}/>
                </TouchableOpacity>
                :
                null
            }
          </View>

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
                placeholder={searchType === 'coin' ? '请输入币名称' : searchType === 'new' ? '请输入资讯名称' : searchType === 'exchange' ? '请输入交易所名称' : ''}
                selectionColor={'#75C1AF'}
                onChangeText={(inputData) => {this.inputValue = inputData;this._search(inputData)}}
                onSubmitEditing={(event) => this._search(event.nativeEvent.text)}
                underlineColorAndroid='transparent'
                style={styles.searchInput}/>
              {
                Platform.OS === 'android' ?
                  <TouchableOpacity onPress={() => {
                    this.refs.input.clear();
                    this._search('');
                  }}>
                    <Image style={styles.searchClear} source={require('../resource/clear.png')}/>
                  </TouchableOpacity>
                  :
                  null
              }
              <TouchableOpacity onPress={() => {
                this._search(this.inputValue);
              }}>
                <Text style={styles.searchBtn}>搜索</Text>
              </TouchableOpacity>
            </View>
            :
            null
        }
        <View style={styles.searchView}>
          {
            coins.length>0&searchIng?
              coins.map((item,index)=>(
                <TouchableOpacity onPress={()=>{onSearch(searchType,item)}} style={styles.searchItem}>
                  <Image style={styles.searchImage} source={{uri: item.icon_small}}/>
                  <Text style={styles.searchText}>{item.name}</Text>
                </TouchableOpacity>
              ))
              :
              sites.length>0?
                sites.map((item,index)=>(
                  <TouchableOpacity onPress={()=>{onSearch(searchType,item)}} style={styles.searchItem}>
                    <Image style={styles.searchImage} source={{uri: item.icon_small}}/>
                    <Text style={styles.searchText}>{item.name}</Text>
                  </TouchableOpacity>
                ))
                :null
            
          }
        </View>
      </View>
    )
  }

  _titleItem(item, index) {
    var {onSelect} = this.props;
    var {headerSelect} = this.state;
    return (
      <View key={index} style={[styles.titleBtn, headerSelect === index ? {backgroundColor: '#75C1AF'} : {}]}>
        <TouchableOpacity onPress={() => {
          this.setState({headerSelect: index});
          onSelect(index)
        }}>
          <Text style={styles.titleText}>{item}</Text>
        </TouchableOpacity>
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
  searchClear: {
    height: 16,
    width: 16,
    margin: 9
  },
  searchBtn: {
    height: 30,
    lineHeight: 28,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    color: '#75C1AF'
  },
  searchView:{
  
  },
  searchItem:{
    height:40,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems: 'center',
    backgroundColor:'white'
  },
  searchImage:{
    height:20,
    width:20,
    margin:10
  },
  searchText:{
    flex:1
  }
  
})