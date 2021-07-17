import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import ProductCard from "../common/product_card";

import { getCart } from "../../js/actions/getCart";
import { 
    performCheckout,
    disablePerformCheckoutNotification,
    disablePerformCheckoutNotificationError 
} from "../../js/actions/performCheckout";
import {
    disableRemoveProdFromCartNotification,
    disableRemoveProdFromCartNotificationError
} from "../../js/actions/removeProductFromCart";


function mapDispatchToProps(dispatch) {
    return {
        getCart: (token) => dispatch(getCart(token)),
        performCheckout: (token) => dispatch(performCheckout(token)),
        disablePerformCheckoutNotification: () => dispatch(disablePerformCheckoutNotification()),
        disablePerformCheckoutNotificationError: () => dispatch(disablePerformCheckoutNotificationError()),
        disableRemoveProdFromCartNotification: () => dispatch(disableRemoveProdFromCartNotification()),
        disableRemoveProdFromCartNotificationError: () => dispatch(disableRemoveProdFromCartNotificationError())
    };
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.getters.customer.shoppingCart,
        checkoutNotification: state.notifications.cart.checkoutNotification,
        checkoutNotificationError: state.notifications.cart.checkoutNotificationError,
        removeProductFromCartNotification: state.notifications.cart.removeProductFromCartNotification,
        removeProductFromCartNotificationError: state.notifications.cart.removeProductFromCartNotificationError,
        token: state.auth.token        
    };
};

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            showError: false,
            errorLabel: ""
        }

        this.handleCheckout = this.handleCheckout.bind(this);
        this.disableShowConfirm = this.disableShowConfirm.bind(this);
        this.disableShowError = this.disableShowError.bind(this);
    }

    componentDidMount() {
        this.props.getCart(this.props.token);
    }

    componentDidUpdate(previousProps) {
        if (this.props.checkoutNotification !== previousProps.checkoutNotification &&
                this.props.checkoutNotification) {       
            this.props.getCart(this.props.token);
            this.props.disablePerformCheckoutNotification();
            this.setState({
                showConfirm: true
            });
            setTimeout(this.disableShowConfirm, 2000);
        }

        if (this.props.checkoutNotificationError !== previousProps.checkoutNotificationError &&
                this.props.checkoutNotificationError) {       
            this.props.disablePerformCheckoutNotificationError();
            this.setState({
                showError: true,
                errorLabel: "unable to perform checkout"
            });
            setTimeout(this.disableShowError, 2000);
        }

        if (this.props.removeProductFromCartNotification !== previousProps.removeProductFromCartNotification &&
                this.props.removeProductFromCartNotification) {       
            this.props.getCart(this.props.token);
            this.props.disableRemoveProdFromCartNotification(false);
        }

        if (this.props.removeProductFromCartNotificationError !== previousProps.removeProductFromCartNotificationError &&
                this.props.removeProductFromCartNotificationError) {       
            this.props.disableRemoveProdFromCartNotificationError();
            this.setState({
                showError: true,
                errorLabel: "unable to remove product"
            });
            setTimeout(this.disableShowError, 2000);
        }
    }

    disableShowConfirm() {
        this.setState({
            showConfirm: false
        });
    }

    disableShowError() {
        this.setState({
            showError: false,
            errorLabel: ""
        });
    }
    
    handleCheckout() {
        this.props.performCheckout(this.props.token);
    }

    render() {
        let isCartEmpty = true;
        if (Object.keys(this.props.shoppingCart).length != 0 &&
                this.props.shoppingCart.products.length != 0) {
            isCartEmpty = false;
        }

        return (
            <div className="shopping-cart-container">
                <div className="shopping-cart__title">
                    <Translation>
                        { t => <>{t('shopping_cart_header')}</> }
                    </Translation>
                </div>
                <div className="shopping-cart-checkout-wrapper">
                    <div className="shopping-cart-checkout-price">
                        <Translation>
                            { t => <>{t('shopping_cart_cost')}</> }
                        </Translation>
                        : {this.props.shoppingCart.totalCost}
                    </div>
                    <div className="shopping-cart-checkout-spacer"></div>
                    <div 
                        className={"shopping-cart-checkout-button" + (isCartEmpty ? "_disabled" : "")}
                        onClick={() => {!isCartEmpty && this.handleCheckout()}}>
                        <Translation>
                            { t => <>{t('shopping_cart_checkout')}</> }
                        </Translation>
                    </div>
                </div>
                {isCartEmpty &&
                    <div>
                        <Translation>
                            { t => <>{t('shopping_cart_empty')}</> }
                        </Translation>
                    </div>
                }
                {!isCartEmpty && this.props.shoppingCart.products.map((p, i) =>(
                    <ProductCard 
                        key={i}
                        owner="customer"
                        prodId={p.id}
                        name={p.name}
                        manufacturer={p.manufacturer}
                        price={p.price}
                        showRemove="true"
                    />
                ))}
                {this.state.showConfirm &&
                    <div className="shopping-cart_alertbox">
                        <Translation>
                            { t => <>{t('shopping_cart_checkout_alert')}</> }
                        </Translation>
                    </div>
                }
                {this.state.showError &&
                    <div className="shopping-cart_alertbox-error">
                        <Translation>
                            { t => <>{t('error_alertbox')}</> }
                        </Translation>: {this.state.errorLabel}
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)