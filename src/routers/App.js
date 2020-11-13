import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import SignUp from "../components/signUp/signUp.js";
import HomePage from '../components/Homepage/homePage';
import {createBrowserHistory} from "history";

export const history = createBrowserHistory()

const App = () => {
    return(
    <Router history={history}>
        <Switch>
            <Route path='/' exact={true} component={SignUp} />
            <Route path='/home' component={HomePage}/>
        </Switch>
    </Router>)
    
}

export default App;