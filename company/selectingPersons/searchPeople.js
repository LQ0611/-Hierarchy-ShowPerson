/**
 *
 *   通过人名,搜索该人
 *
 *   add by liqiang 18-9-11
 */
import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SectionList,
    Platform,
    NativeEventEmitter,
    NativeModules,
    FlatList,StatusBar
} from 'react-native';
import PropTypes from 'prop-types';

import {SearchBar} from 'antd-mobile-rn';
import {Toast} from 'antd-mobile-rn';

import Cstyles from '../style/styles';

import  Server from '../../../../utils/NetWork/Server';
import { storage, checkStatus, checkCdpStatus, parseJSON, getCommonHeaders,getCommonHead, showError, handleLoginFirst,handleProjectOABtn,handleProjectOABtnNeedContent } from '../../../../utils/fetchUtil';

class SearchPeople extends React.Component {
    static navigationOptions = ({navigation}) => ({
        header : null
    });

    static propTypes = {
        cellClicked:  PropTypes.func
    }

    static defaultProps = {
        cellClicked: function () { }
    }

    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            value : '',

        };
        debugger;
    }

    componentDidMount() {
        StatusBar.setBarStyle('dark-content',true);

    }

    componentWillUnmount() {
        //记得移除定时器
        StatusBar.setBarStyle('light-content',true);
    }


    // 搜索数据
    loadData = async (text)=>{
        try
        {
            let keyword = text;
            Toast.loading('Loading...', 0, () => {});
            let result = await Server.searchCompanyEmployee({keyword})
            debugger;
            if (result.ok === "0") {
                this.setState({
                    dataList : result._DATA_
                });
                if(result._DATA_.length === 0){

                    Toast.info('暂无数据...',3);
                }

                Toast.hide();
            }else{
                Toast.info(result._MSG_,3);
                Toast.hide();
            }


        }catch (e){
            Toast.hide();
            showError('请求失败',e.message)
        }

    }

    ItemClicked = (itemData)=>{

    }


    showPeopleInfo(item){
        this.props.navigation.navigate('PersonalInfoScreen',{item:item})
    }

    // 与列表有关的函数
    _keyExtractor = (item, index) => "index"+index;
    renderListItem = ({item, index}) => {

        return (
            <TouchableOpacity
                key={index}
                onPress = {()=>{this.showPeopleInfo(item)}}
            >
                <View style = {{ flex : 2,backgroundColor : '#ffffff',flexDirection : 'row',
                    paddingLeft:10,paddingRight:5,paddingTop:15,paddingBottom:15,borderBottomColor:"#e8e8e8",borderBottomWidth:1}}>
                    <View style = {{justifyContent:'center',alignItems:'center',
                        width : 35,height:35,borderRadius: 17,backgroundColor :'#208ff7',
                        marginRight:7
                    }}>
                        <Text style ={{fontSize: 12, color: "#ffffff"}}>{item.name&&item.name.slice(item.name.length-2)}</Text>
                    </View>
                    <View style = {{flex : 5,backgroundColor : '#ffffff',justifyContent : 'center'}}>
                        <Text numberOfLines ={1} style = {{
                            fontSize: 15,
                            color: "#333333" }}>{item.name}</Text>
                        <Text style = {{ marginTop : 5, overflow : 'hidden',height: 19,
                            fontSize: 13,
                            color: "#999999"}}>{item.company+ '    ' + item.department}</Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    }
    onSubmit = (value) =>{
        if (value === ''){
            Toast.info('请输入搜索内容', 1, null, false);
        }else {
            this.loadData((value))
        }
    }

    onChange = (value) => {
        debugger
        this.setState({ value });

    }

    clear = () => {
        debugger
        this.setState({ value: '' });
        this.props.navigation.goBack()
    }

    render() {
        return (
            <View style={{backgroundColor: '#ffffff',flex : 1}}>

                <View style={Cstyles.search_navi}>

                    <SearchBar
                        value={this.state.value}
                        placeholder="姓名"
                        onSubmit={(value) => this.onSubmit(value)}
                        onCancel={this.clear}
                        onChange={this.onChange}
                        showCancelButton
                        returnKeyType = {'search'}
                        autoFocus = {true}
                    />

                </View>

                <FlatList
                    data={this.state.dataList}
                    renderItem={this.renderListItem}
                    refreshing={this.state.loading}
                    style={{marginBottom:40}}
                />

            </View>
        );
    }
}


export default SearchPeople;
