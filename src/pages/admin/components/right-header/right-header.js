import React,{Component} from 'react';
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import PubSub from 'pubsub-js'
import './right-header.less'

import{getUser} from "../../../../api/menu-api";
import {logOut} from "../../../../api/user-api";
import {timeFormat} from "../../../../tools/date";
import {getWeather} from "../../../../api/weather";
import {Icon,Layout,Button,Modal,Breadcrumb} from "antd";
const { Header } = Layout;


class RightHeader extends Component{

    static propTypes = {
        collapsed: PropTypes.bool,
        toggle: PropTypes.func
    };
    state={
        time:'',
        picURL: '',
        notice: '',
        itemArr:[],
    };
    clickLogout = ()=>{
        Modal.confirm({
            title: '确认退出',
            okText: '确认',
            cancelText: '取消',
            onOk:()=>{
                logOut();
                this.props.history.replace('/login') },
            onCancel() {},
        });

    };

    componentDidMount() {
        PubSub.subscribe('getItem', (msg,data)=>{
            if (msg === 'getItem'){
                this.setState({
                    itemArr:data,
                })
            }
        });

        getWeather().then(result => {
            this.setState({
                picURL: result.picURL,
                notice: result.notice,
            })
        });

        this.timer = setInterval(()=>{
                this.setState({
                    time:timeFormat(Date.now())
                })
            }
        ,1000)
    };

    componentWillUnmount() {
        clearInterval(this.timer)
    }
    render() {
        let user = getUser().userName;

        return(
            <Header className={"header"} >
                <Icon
                    className="trigger"
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.props.toggle}
                />
                <div className="top">
                    <span className={"user"}>欢迎: {user}!</span>
                    <Button type="primary" size="small" onClick={this.clickLogout}>退出</Button>
                </div>
                <div className="bottom">
                    <div className="left">
                        <Breadcrumb separator=">">
                            {
                                // eslint-disable-next-line array-callback-return
                                this.state.itemArr.map((item,index) =>{
                                   if (item){
                                       return (
                                           <Breadcrumb.Item href="#" key={index.toString()}>
                                               <Icon type={item.icon} />
                                               <span>{item.title}</span>
                                           </Breadcrumb.Item>
                                       )
                                   }
                                })
                            }
                        </Breadcrumb>
                    </div>
                    <div className="right">
                        <span className="date">{this.state.time}</span>
                        <img src={this.state.picURL} alt=""/>
                        <span>{this.state.notice}</span>
                    </div>
                </div>
            </Header>
        )
    }
}

export default withRouter(RightHeader);