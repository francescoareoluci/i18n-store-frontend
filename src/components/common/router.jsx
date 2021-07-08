import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./login"
import AdminMenu from "../admin/admin_menu"
import AdminProducts from "../admin/admin_products"
import AdminProductInfo from "../admin/admin_product_info"
import CustomerMenu from "../customer/customer_menu"
import CustomerProducts from "../customer/customer_products"
import CustomerProductInfo from "../customer/customer_product_info"
import ShoppingCart from "../customer/shopping_cart"
import ShoppingList from "../customer/shopping_list"

import { setToken } from "../../js/actions/setToken";


function mapDispatchToProps(dispatch) {
  return {
      setToken: (token, role) => dispatch(setToken(token, role))
  };
}

const mapStateToProps = (state) => {
  return { 
      token: state.token,
      role: state.role
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  isObjectEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }

  componentDidMount() {
    if (this.props.token == "" || this.props.role == "") {
      // Trying to get token from a previos save
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('role');

      // Check if they are valid
      if (this.isObjectEmpty(token) || this.isObjectEmpty(role)) {
        return;
      }

      // Set token and role in store
      this.props.setToken(token, role);
    }
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps);
  }

  render() {
    if (this.props.token == "") {
        return (
          <Login />
        );
    }

    let userMenu;
    let defaultPath;
    if (this.props.role == "CUSTOMER") { 
      userMenu = ( <CustomerMenu /> )
      defaultPath = "/customer/products"; 
    }
    else if (this.props.role == "ADMIN"){
      userMenu = ( <AdminMenu /> )
      defaultPath = "/admin/products";
    }
    else {
      return (
        <Login />
      );
    }

    return (
      <div className="page-root">
      <div>
        <div className="header">
          <div className="header__text">
            <h2>
              I18N Store
            </h2>
          </div>
        </div>
      </div>
      <Router>
        {userMenu}
        <Switch>
          <Route exact path="/">
            <Redirect to={defaultPath} />
          </Route>
          <Route exact path="/admin/products" component={AdminProducts} />
          <Route exact path="/admin/products/info" component={AdminProductInfo} />
          <Route exact path="/customer/products" component={CustomerProducts} />
          <Route exact path="/customer/products/info" component={CustomerProductInfo} />
          <Route exact path="/customer/shopping-cart" component={ShoppingCart} />
          <Route exact path="/customer/shopping-list" component={ShoppingList} />
          <Redirect to={defaultPath} />
        </Switch>
      </Router>
      </div>
    );
  }
}

Router.propTypes = {
  token: PropTypes.string,
  role: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(App);