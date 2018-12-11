/*
*
*  多选员工的 多选列表组件
* */

import React, {Component} from 'react';
import {
    Dimensions,
    Platform,
    Text,
    StyleSheet,
    View,TouchableOpacity,Image,ScrollView,
    Alert
} from 'react-native';
import PropTypes from 'prop-types';

class SelectedPeopleItem extends Component {

    static propTypes = {


        data: PropTypes.object,
        cellClicked:  PropTypes.func

    }

    static defaultProps = {

        data: {},
        cellClicked: function () { },

    }
    constructor(props) {
        super(props);

        debugger
        this.state = {
        };
    };

    showPersonDetail(data){
        console.log(data);
        this.props.param.navigation.navigate('PersonalInfoScreen',{item:data})
    }

    render() {

        return (
            <View>
                <TouchableOpacity
                    onPress={()=>{this.showPersonDetail(this.props.data)}}
                >
                    <View style={{ height:55,backgroundColor:'#ffffff',flexDirection:'row',alignItems:'center',flex:1,paddingLeft:10,}}>
                        <View style = {{justifyContent:'center',alignItems:'center',
                            width : 35,height:35,borderRadius: 17,backgroundColor :'#208ff7',
                            marginRight:7
                        }}>
                            <Text style ={{fontSize: 12, color: "#ffffff"}}>{this.props.data.name&&this.props.data.name.slice(this.props.data.name.length-2)}</Text>
                        </View>
                        <Text style ={{fontSize: 15, color: "#333333",marginLeft:10}}>{this.props.data.name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{height:1,backgroundColor:'#f5f5f9'}}/>
            </View>
        );
    }
}


const styles = StyleSheet.create({

});
export default SelectedPeopleItem;
