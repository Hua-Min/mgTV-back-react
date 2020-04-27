import React, {Component} from 'react';
import {Button} from "antd";

import './notFound.less'

class NotFound extends Component {

    render() {
        return (
            <div className={'notFound'}>
                NotFound
                <p></p>
                <Button type={'primary'} onClick={() => this.props.history.replace('/')}>回到首页</Button>
            </div>
        )
    }
}

export default NotFound;