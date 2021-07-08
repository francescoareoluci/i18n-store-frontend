import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { addProductToCart } from "../../js/actions/addProductToCart";


function mapDispatchToProps(dispatch) {
    return {
        addProductToCart: (prodId) => dispatch(addProductToCart(prodId))
    };
}

const mapStateToProps = (state) => {
    return {
        customerSelectedProduct: state.customerSelectedProduct
    };
};

class CustomerProductInfo extends React.Component {
    constructor(props) {
        super(props);

        this.handleAddProduct = this.handleAddProduct.bind(this);
    }

    handleAddProduct() {
        this.props.addProductToCart(this.props.customerSelectedProduct.id);    
    }

    render() {
        return (
            <div className="product-info-container">
                <div className="product-info-container__text">
                    Product Informations
                </div>
                <div className="product-wrapper">
                    <div className="product-wrapper__name">
                        <div className="product-wrapper__name__text">
                            {this.props.customerSelectedProduct.name}
                        </div>
                        <div className="product-wrapper__name__spacer">
                        </div>
                        <div className="product-wrapper__name__addproduct"
                             onClick={() => {this.handleAddProduct()}}>
                            Add product to cart
                        </div>
                    </div>
                    <div className="product-wrapper__manufacturer">
                        {this.props.customerSelectedProduct.manufacturer}
                    </div>
                    <div className="product-wrapper__price">
                        <div className="product-wrapper__price__title">
                            Price
                        </div>
                        <div className="product-wrapper__price__spacer"></div>
                        <div className="product-wrapper__price__value">
                            {this.props.customerSelectedProduct.price}
                        </div>
                    </div>
                    <div className="product-wrapper__description">
                        <div className="product-wrapper__description__title">
                            Description
                        </div>
                        <div className="product-wrapper__description__text">
                            {this.props.customerSelectedProduct.description}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CustomerProductInfo.propTypes = {
    customerSelectedProduct: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProductInfo)