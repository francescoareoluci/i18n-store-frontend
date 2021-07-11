import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import ProductCard from "../common/product_card";

import { getCart } from "../../js/actions/getCart";
import { performCheckout } from "../../js/actions/performCheckout";
import { setCheckoutLoading } from "../../js/actions/setCheckoutLoading";
import { setRemoveCartProdLoading } from "../../js/actions/setRemoveCartProdLoading";


function mapDispatchToProps(dispatch) {
    return {
        getCart: (token) => dispatch(getCart(token)),
        performCheckout: (token) => dispatch(performCheckout(token)),
        setCheckoutLoading: (isDone) => dispatch(setCheckoutLoading(isDone)),
        setRemoveCartProdLoading: (isDone) => dispatch(setRemoveCartProdLoading(isDone))
    };
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart,
        checkoutLoadingDone: state.checkoutLoadingDone,
        removeCartProductLoading: state.removeCartProductLoading,
        token: state.token        
    };
};

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckout = this.handleCheckout.bind(this);
    }

    componentDidMount() {
        this.props.getCart(this.props.token);
    }

    componentDidUpdate(previousProps) {
        if (this.props.checkoutLoadingDone !== previousProps.checkoutLoadingDone &&
                this.props.checkoutLoadingDone) {       
            this.props.getCart(this.props.token);
            this.props.setCheckoutLoading(false);
        }

        if (this.props.removeCartProductLoading !== previousProps.removeCartProductLoading &&
                this.props.removeCartProductLoading) {       
            this.props.getCart(this.props.token);
            this.props.setRemoveCartProdLoading(false);
        }
      }

    handleCheckout() {
        this.props.setCheckoutLoading(false);
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
                    Shopping Cart
                </div>
                <div className="shopping-cart-checkout-wrapper">
                    <div className="shopping-cart-checkout-price">
                        Total cost: {this.props.shoppingCart.totalCost}
                    </div>
                    <div className="shopping-cart-checkout-spacer"></div>
                    <div 
                        className="shopping-cart-checkout-button"
                        onClick={() => {this.handleCheckout()}}>
                            Proceed to checkout
                    </div>
                </div>
                {isCartEmpty &&
                    <div>
                        Empty shopping cart
                    </div>
                }
                {!isCartEmpty && this.props.shoppingCart.products.map((p, i) =>(
                    <ProductCard 
                        key={i}
                        linkTo="customer"
                        prodId={p.id}
                        name={p.name}
                        manufacturer={p.manufacturer}
                        price={p.price}
                        showRemove="true"
                    />
                ))}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)