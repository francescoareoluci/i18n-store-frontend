import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

/* Common imports */
import i18n from "../i18n/i18n"
import Login from "../login/login"
import ScrollToTop from "../scroll_to_top/scroll_to_top"
/* Administration imports */
import AdminMenu from "../../admin/admin_menu/admin_menu"
import AdminProducts from "../../admin/admin_products/admin_products"
import AdminProductInfo from "../../admin/admin_product_info/admin_product_info"
import Locales from "../../admin/locales/locales"
import Users from "../../admin/users/users"
import Manufacturers from "../../admin/manufacturers/manufacturers"
import Currencies from "../../admin/currencies/currencies"
import AdminAddProduct from "../../admin/admin_add_product/admin_add_product"
import AdminEditProduct from "../../admin/admin_edit_product/admin_edit_product"
/* Customer imports */
import CustomerMenu from "../../customer/customer_menu/customer_menu"
import CustomerProducts from "../../customer/customer_products/customer_products"
import CustomerProductInfo from "../../customer/customer_product_info/customer_product_info"
import ShoppingCart from "../../customer/shopping_cart/shopping_cart"
import ShoppingList from "../../customer/shopping_list/shopping_list"

import { logout } from "../../../js/actions/logout";


function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  };
}

const mapStateToProps = (state) => {
  return { 
      token: state.auth.token,
      role: state.auth.role,
      language: state.auth.language,
      unauth: state.auth.unauth
  };
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.unauth !== this.props.unauth &&
          this.props.unauth) {
            this.props.logout();
    }
  }

  render() {
    if (this.props.token == "") {
        return (
          <Login 
            role={this.props.role}
          />
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
        <Login 
          role={this.props.role}
        />
      );
    }

    // Manage language
    if (i18n.language !== this.props.language) {
      if (i18n.languages.includes(this.props.language)) {
        i18n.changeLanguage(this.props.language);
      }
      else {
        console.log("Unsupport language requested");
      }
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
        <ScrollToTop>
          <Switch>
            <Route exact path="/">
              <Redirect to={defaultPath} />
            </Route>
            {this.props.role == 'ADMIN' &&
              <Switch>
                <Route exact path="/admin/products" component={AdminProducts} />
                <Route exact path="/admin/products/info" component={AdminProductInfo} />
                <Route exact path="/admin/products/add" component={AdminAddProduct} />
                <Route exact path="/admin/products/edit" component={AdminEditProduct} />
                <Route exact path="/admin/users" component={Users} />
                <Route exact path="/admin/locales" component={Locales} />
                <Route exact path="/admin/manufacturers" component={Manufacturers} />
                <Route exact path="/admin/currencies" component={Currencies} />
                <Redirect to={defaultPath} />
              </Switch>
            }
            {this.props.role == 'CUSTOMER' &&
              <Switch>
                <Route exact path="/customer/products" component={CustomerProducts} />
                <Route exact path="/customer/products/info" component={CustomerProductInfo} />
                <Route exact path="/customer/shopping-cart" component={ShoppingCart} />
                <Route exact path="/customer/shopping-list" component={ShoppingList} />
                <Redirect to={defaultPath} />
              </Switch>
            }
          </Switch>
        </ScrollToTop>
      </Router>
      </div>
    );
  }
}

Router.propTypes = {
  logout: PropTypes.func,
  token: PropTypes.string,
  role: PropTypes.string,
  language: PropTypes.string,
  unauth: PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(App);