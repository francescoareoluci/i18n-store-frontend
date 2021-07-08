import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import ProductCard from "../common/product_card";

import { getCart } from "../../js/actions/getCart";
import { performCheckout } from "../../js/actions/performCheckout";


function mapDispatchToProps(dispatch) {
    return {
        getCart: () => dispatch(getCart()),
        performChekout: () => dispatch(performCheckout())
    };
}

const mapStateToProps = (state) => {
    return {
        shoppingCart: state.shoppingCart
    };
};

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckout = this.handleCheckout.bind(this);
    }

    componentWillMount() {
        this.props.getCart();
    }

    handleCheckout() {
        this.props.performCheckout();
    }

    render() {
        let isCartEmpty = true;
        console.log(this.props.shoppingCart);
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
                        Empty Cart
                    </div>
                }
                {!isCartEmpty && this.props.shoppingCart.products.map((p, i) =>(
                    <ProductCard 
                        key={i}
                        linkTo="customer"
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