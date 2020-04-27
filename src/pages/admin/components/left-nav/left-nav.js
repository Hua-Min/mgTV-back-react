import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import './left-nav.less'
import {Icon, Layout, Menu} from "antd";
import PubSub from 'pubsub-js'


const {Sider} = Layout;
const {SubMenu} = Menu;

class LeftNav extends Component {
    renderMenu = (menuList) => {
        return (menuList.map(item => {
                if (!item.children) {
                    return (
                        <Menu.Item key={item._key}>
                            <Link to={item._key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                } else {
                    return (
                        <SubMenu
                            key={item._key}
                            title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                            {this.renderMenu(item.children)}
                        </SubMenu>
                    )
                }
            })
        )
    };

    getOpenKey = (menuLists, path) => {
        for (let i = 0; i < menuLists.length; i++) {
            let item = menuLists[i];
            if (item.children && item.children.find(citem => {
                    return citem._key === path;
                }
            )) {
                return item._key;
            }
        }
        return "";
    };

    //获取面包屑所需的icon和title
    //根据key获取icon和title
    getItem = (key, menuList=this.props.menuList) => {
        for (let i = 0, len = menuList.length; i < len; i++) {
            let item = menuList[i];
            if ( item._key === key) {
               return {
                   icon: item.icon,
                   title: item.title
               }
            }else if (item.children) {
                let result = this.getItem(key, item.children);
                if (result){
                    return result;
                }
            }
        }
    };

    render() {
        let path = this.props.location.pathname;
        let openKey = this.getOpenKey(this.props.menuList, path);

        let openItem = this.getItem(openKey);
        let pathItem = this.getItem(path);
        let itemArr = [openItem,pathItem];
        PubSub.publish('getItem', itemArr);

        return (
            <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
                <div className="logo">
                    <img src={require('./../../../../asset/images/background.jpg')} alt=""/>
                    <span>后台管理</span>
                </div>
                {this.props.menuList.length > 0 ? (
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]} defaultOpenKeys={[openKey]}>
                        {this.renderMenu(this.props.menuList)}
                    </Menu>
                ) : ""}
            </Sider>
        )
    }
}

export default withRouter(LeftNav);