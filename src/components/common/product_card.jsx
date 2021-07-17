import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import { Translation } from 'react-i18next';

import { changeCustomerSelectedProduct } from "../../js/actions/changeCustomerSelectedProduct";
import { changeAdminSelectedProduct } from "../../js/actions/changeAdminSelectedProduct";
import { removeProductFromCart } from "../../js/actions/removeProductFromCart";


function mapDispatchToProps(dispatch) {
    return {
        changeCustomerSelectedProduct: (prodId, token) => dispatch(changeCustomerSelectedProduct(prodId, token)),
        changeAdminSelectedProduct: (prodId, token) => dispatch(changeAdminSelectedProduct(prodId, token)),
        removeProductFromCart: (prodId, token) => dispatch(removeProductFromCart(prodId, token))
    };
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};

class ProductCard extends React.Component {
    constructor(props) {
        super(props);

        this.selectProduct = this.selectProduct.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    selectProduct(e, id) {
        e.preventDefault();
        if (this.props.owner == "customer") {
            this.props.changeCustomerSelectedProduct(id, this.props.token);
        }
        else if (this.props.owner == "admin") {
            this.props.changeAdminSelectedProduct(id, this.props.token);
        }
    }

    handleRemove(e, id) {
        e.preventDefault();
        console.log("prova");
        console.log(this.props.owner);
        if (this.props.owner == "customer") {
            this.props.removeProductFromCart(id, this.props.token);
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
                <Link to={"/" + this.props.owner + "/products/info"}>
                    <div className="product-card__name">
                        <Translation>
                            { t => <>{t('product_card_name')}</> }
                        </Translation>
                        : {this.props.name}
                    </div>
                    <div className="product-card__manufacturer">
                        <Translation>
                            { t => <>{t('product_card_manufacturer')}</> }
                        </Translation>
                        : {this.props.manufacturer}
                    </div>
                    <div className="product-card__price">
                        <Translation>
                            { t => <>{t('product_card_price')}</> }
                        </Translation>
                        : {this.props.price}
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