import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import SignUp from "../components/signUp/signUp.js";
import HomePage from '../components/Homepage/homePage.js';
import createHistory from "history/createBrowserHistory"



export const history = createHistory();

const App = () => {
    return(
        <Router history={history} >
            <Switch>
                <Route path="/" exact={true} component={SignUp} />
                <Route key={1} path="/home" component={HomePage}/>
            </Switch>
            
        </Router>
    )
    
}

export default App;