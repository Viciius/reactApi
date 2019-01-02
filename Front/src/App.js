import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Container, Navbar, NavbarBrand, NavItem, Nav, Collapse, NavbarToggler } from "reactstrap";
import { Routes } from './routes/Routes';
import store from './redux/store';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Router>
        <Fragment>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Learning ReactJS</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Link to="/" className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                  <Link to="/Products" className="nav-link">Products</Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Container fluid className="mt-3">
            <Routes></Routes>
          </Container>
        </Fragment>
      </Router>
    );
  }
  getState() {
    console.log(store.getState());
  }
}

export default App;
