import React, {Component} from 'react';
import './login.less'
import {Redirect} from "react-router-dom";
import {checkLogin,saveUser,isLogin} from "../../api/user-api";
import {message} from "antd";

import { Form, Icon, Input, Button } from 'antd';

const {Item} = Form;
class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('数据: ', values);
            }
            const {account,password} = values;
            //登陆
            checkLogin(account,password).then(result=>{
                console.log(result,'成功');
                if (result.status === 200){
                    message.success('登陆成功',1);
                    // console.log(this.props);
                    //登陆信息本地化
                    saveUser(result.result);
                    console.log(result);
                    //跳转到后台首页
                    this.props.history.replace('/');
                } else {
                                 ////跳过验证
                        this.props.history.replace("/")
                    message.error(result.msg,1)
                }
            });
        });
    };

    render() {
        //判断是否登陆
        if (isLogin()){
            return <Redirect to={'/'} />
        }
        const {getFieldDecorator} = this.props.form;
        return (
            <div className={'loginBack'}>
                <div className={'loginPan'}>
                    <div className={'loginTitle'}>后台管理系统</div>
                    <div className={'loginForm'}>
                        <Form onSubmit={this.handleSubmit}>
                            <Item>
                                {getFieldDecorator('account', {
                                    rules: [
                                        {required: true, message: '输入内容不能为空'},
                                        {min: 3, message: '最小长度为3个字符'},
                                        {max: 10, message: '最大长度为10个字符'}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        className={'loginUser'}
                                        placeholder="请输入用户名"/>
                                )}
                            </Item>
                            <Item>
                                {getFieldDecorator('password', {
                                    rules: [
                                        {required: true, message: '输入内容不能为空'},
                                        {min: 3, message: '最小长度为3个字符'},
                                        {max: 10, message: '最大长度为10个字符'}
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        className={'loginPwd'} type={'password'} placeholder="请输入密码"/>
                                )}
                            </Item>
                            <Button htmlType={'submit'} className="loginBtn">
                                登 录
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}


export default Form.create()(Login);
