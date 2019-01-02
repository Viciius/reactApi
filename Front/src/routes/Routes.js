import React, { Component } from 'react'
import { Route, Switch } from "react-router";
import Products from './../pages/Products';

export class Routes extends Component{

    render() {
      return (
        <Switch>
            <Route exact path="/" render={() => <h1>Welcome to ReactApi</h1>}></Route>
            <Route path="/Products" component={Products}></Route>
        </Switch>
      )
    }

}
