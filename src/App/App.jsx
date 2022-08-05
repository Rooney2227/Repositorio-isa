import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';

import { PrivateRoute } from '../_components';
import { HomePage } from '../components/HomePage';
import { LoginPage } from '../components/LoginPage';
import {Parents} from '../components/Parents';
import {Childs} from  '../components/Childs';
import {Detalle} from '../components/Detalle';

class App extends React.Component {
    constructor(props) {
        super(props);

      
    }

    render() {
      
        return (
            <div>
              
                      
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/Parent" component={Parents} />
                                <PrivateRoute exact path="/Child" component={Childs} />
                                <PrivateRoute exact path="/Detalle" component={Detalle} />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </Router>
                  
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 