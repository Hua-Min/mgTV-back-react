import React, {Component} from 'react'
import Login from "./pages/login/login";
import Admin from "./pages/admin/admin";
import {BrowserRouter, Switch, Route} from "react-router-dom";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path={'/login'} component={Login}/>
                    <Route path={'/'} component={Admin} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
