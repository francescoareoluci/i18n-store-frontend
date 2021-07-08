import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";

import { changeCustomerSelectedProduct } from "../../js/actions/changeCustomerSelectedProduct";
import { changeAdminSelectedProduct } from "../../js/actions/changeAdminSelectedProduct";
import { removeProductFromCart } from "../../js/actions/removeProductFromCart";


function mapDispatchToProps(dispatch) {
    return {
        changeCustomerSelectedProduct: (prodId) => dispatch(changeCustomerSelectedProduct(prodId)),
        changeAdminSelectedProduct: (prodId) => dispatch(changeAdminSelectedProduct(prodId)),
        removeProductFromCart: (prodId) => dispatch(removeProductFromCart(prodId))
    };
}

const mapStateToProps = (state) => {
    return {};
};

class ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.selectProduct = this.selectProduct.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    selectProduct(e, id) {
        e.preventDefault();
        if (this.props.linkTo == "customer") {
            this.props.changeCustomerSelectedProduct(id);
        }
        else if (this.props.linkTo == "admin") {
            this.props.changeAdminSelectedProduct(id);
        }
    }

    handleRemove(e, id) {
        e.preventDefault();
        if (this.props.linkTo == "customer") {
            this.props.removeProductFromCart(id);
        }
    }

    render() {
        let showRemoveBtn = false;
        if (this.props.showRemove == "true") {
            showRemoveBtn = true;
        }

        return (
            <div className="product-card"
                 onClick={(e) => {this.selectProduct(e, this.props.prodId)}}>
                <Link to={"/" + this.props.linkTo + "/products/info"}>
                    <div className="product-card__name">
                        Product: {this.props.name}
                    </div>
                    <div className="product-card__manufacturer">
                        Manufacturer: {this.props.manufacturer}
                    </div>
                    <div className="product-card__price">
                        Price: {this.props.price}
                    </div>
                </Link>
                {showRemoveBtn &&
                    <div className="product-card-remove-button"
                         onClick={(e) => {this.handleRemove(e, this.props.prodId)}} >
                        X
                    </div>
                }
            </div>
        );
    }
}

ProductCard.propTypes = {
    changeCustomerSelectedProduct: PropTypes.func,
    changeAdminSelectedProduct: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)