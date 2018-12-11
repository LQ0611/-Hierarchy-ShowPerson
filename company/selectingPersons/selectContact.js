/*
*   开始选择员工页面---公司-部门-员工
* */

import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    Text,
    StyleSheet,
    View,TouchableOpacity,Image,ScrollView,
    Alert,
    FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

import Cstyles from '../style/styles';

import SelectedPeopleItem from './selectedPeopleItem'
import  SelectedCD from './selectedCD';

const { width, height } = Dimensions.get('window');
const now = new Date();

class SelectContactSrc extends Component {

    static navigationOptions = {
        header: null
    };
    static propTypes = {

        sureClicked:  PropTypes.func
    }

    static defaultProps = {
        sureClicked: function () { }
    }
    constructor(props) {
        super(props);
        this.state = {
            type : true,//true : 公司或部门,false:员工
            selectedData : [],//选中的公司或部门
            selectingData : [],//列表当前展示的数据
            selectedPeople : [],//已经选中的员工
            data: this.props.data.departments,//所有的数据
        };
       this.state.selectingData = this.state.data;
        debugger;
       console.log("props",props);

    }
    componentWillMount() {
    }

    //点击了公司和部门的列表
    clickCompany1 = (data)=>{
        debugger
        let selectedArr = this.state.selectedData.concat([data])
         if (data.departments && data.departments !== undefined && data.departments.length >0){
             //部门

             this.setState({
                 type: true,
                 selectingData : data.departments,
                 selectedData : selectedArr
             })
         }else if (data.employees && data.employees !== undefined && data.employees.length >0){
             //人员
             this.setState({
                 type: false,
                 selectingData : data.employees,
                 selectedData : selectedArr
             })
         }else if(data.departments && data.departments !== undefined && data.departments.length ===0
                &&data.employees && data.employees !== undefined && data.employees.length ===0){
            //当目录下 没有人员时，进入人员列表
             this.setState({
                 type: false,
                 selectingData : data.employees,
                 selectedData : selectedArr
             })
         }
    }

    //点击了公司部门标签
    clickCD = (data,index)=>{
        debugger;
        if (index == -1){
            //点击了请选择

        }else if (index == 0){
            this.setState({
                type: true,
                selectingData : this.state.data,
                selectedData : [],
            })
        }else {
            this.setState({
                type: true,
                selectingData : this.state.selectedData[index-1].departments,
                selectedData : this.state.selectedData.slice(0,index),
            })
        }

    }
    //搜索员工
    searchPeople = (item)=>{


    }

    renderListItem = ({item, index}) => {
        if (this.state.type) {
            debugger;
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => {this.clickCompany1(item)}}>
                    <View  style={{height: 55,backgroundColor:'#ffffff',paddingLeft:10,}} key ={index}>
                        <View style = {{flex:1 ,justifyContent:'center'}}>
                            <Text style={{fontSize: 15, color: "#333333"}}>{item.name}</Text>
                        </View>
                        <View style={{height:1,backgroundColor:'#f5f5f5'}}/>
                    </View>
                </TouchableOpacity>
            )
        }else {
            return (
                <SelectedPeopleItem
                    param={this.props.param}
                    data={item} key ={index}
                />
            )
        }
    }

    ListEmptyComponent(){
        return(
            <View style={{height:200,justifyContent:'center',alignItems:'center'}}>
                <Text>当前目录下，暂无数据</Text>
            </View>
        )
    }

    render() {

        return (
            <View style = {{height:height,backgroundColor:'#f5f5f5'}}>

                <View style={{ padding:9,backgroundColor:'#f5f5f5'}}>

                     {/*展示 公司 部门*/}

                    <View style={{ padding:9,backgroundColor:'#f5f5f5',flexDirection:'row',flexWrap:'wrap'}}>
                        <TouchableOpacity
                            onPress={()=>{this.props.closeShowDept()}}
                        >
                            <Text style={{fontSize: 13, color: "#0083f1"}}>通讯录 </Text>
                        </TouchableOpacity>
                        <Image
                            style={{marginLeft:5,marginRight:5}}
                            source = {require('../image/rightR.png')}
                        />

                        {
                             this.state.selectedData.map((item,index)=>{

                              return  <SelectedCD data={item} index={index} cellClicked={this.clickCD} key={index}/>
                           })
                           }

                    </View>
                </View>

                <FlatList
                    data={this.state.selectingData}
                    renderItem={(item)=>this.renderListItem(item)}
                    style={{height:height,marginBottom:40}}
                    ListEmptyComponent={()=>this.ListEmptyComponent()}
                />


            </View>
        );
    }
}

export default SelectContactSrc;
