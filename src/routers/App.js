import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import SignUp from "../components/signUp";
import {createBrowserHistory} from "history";

export const history = createBrowserHistory()

const App = () => {
    return(
    <Router history={history}>
        <Switch>
            <Route path='' exact={true} component={SignUp} />
        </Switch>
    </Router>)
    
}

export default App;