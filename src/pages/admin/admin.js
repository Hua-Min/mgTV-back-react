import React,{Component} from 'react';
import './admin.less'
import {isLogin} from "../../api/user-api";
import {Redirect,Switch,Route} from "react-router-dom";
//ui
import LeftNav from './components/left-nav/left-nav'
import RightHeader from './components/right-header/right-header'
import { Layout } from 'antd';
import {getMenuList} from "../../api/menu-api";
//component
import Sowing from "../sowing/sowing";
import NotFound from "../notfound/notfound";
import Edit from "../edit/edit";
import EditHot from "../edit/editHot";
import Hot from "./../hot/hot";

const { Content,Footer } = Layout;


class Admin extends Component{

    state = {
        menuList:[],
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        getMenuList().then(result=>{            
            if (result.status === 200) {
                this.setState({
                    menuList: result.data
                })
            }
        })
    }
    render() {
        //判断是否登陆
        if (!isLogin()){
            return <Redirect to={'/login'}/>;
        }
        return(
            <Layout className={"adminPane"} trigger={null} collapsible={'true'} collapsed={this.state.collapsed.toString()}>
                <LeftNav  menuList={this.state.menuList} collapsed={this.state.collapsed} />
                <Layout>
                    <RightHeader menuList={this.state.menuList} collapsed={this.state.collapsed}  toggle={this.toggle} />
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 500,
                        }}
                    >
                        <Switch>
                            <Redirect from={'/'} exact to={'/sowing'}/>
                            <Route path={'/sowing'}  component={Sowing}/>
                            <Route path={'/edit'}  component={Edit}/>
                            <Route path={'/editHot'}  component={EditHot}/>
                            <Route path={'/hot'}  component={Hot}/>
                            <Route  component={NotFound}/>
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
                </Layout>

            </Layout>
        )
    }
}

export default Admin;