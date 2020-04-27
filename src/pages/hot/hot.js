import React,{Component} from 'react';

import {Route,Switch} from 'react-router-dom'
import HotOne from "./hotOne"
import HotTwo from "./hotTwo"
import HotThree from "./hotThree"
import HotFour from "./hotFour"
import HotFive from "./hotFive"

class Question extends Component{
    render() {
        return(
                <Switch>
                    <Route path={'/hot/hotOne'} component={HotOne}/>
                    <Route path={'/hot/hotTwo'} component={HotTwo}/>
                    <Route path={'/hot/hotThree'} component={HotThree}/>
                    <Route path={'/hot/hotFour'} component={HotFour}/>
                    <Route path={'/hot/hotFive'} component={HotFive}/>
                    <Route path={'/hot'} component={HotOne}/>
                </Switch>
        )
    }
}

export default Question;