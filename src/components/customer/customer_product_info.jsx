import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import { 
    addProductToCart,
    disableAddProductToCartNotification,
    disableAddProductToCartNotificationError 
} from "../../js/actions/addProductToCart";


function mapDispatchToProps(dispatch) {
    return {
        addProductToCart: (prodId, token) => dispatch(addProductToCart(prodId, token)),
        disableAddProductToCartNotification: () => dispatch(disableAddProductToCartNotification()),
        disableAddProductToCartNotificationError: () => dispatch(disableAddProductToCartNotificationError()),
    };
}

const mapStateToProps = (state) => {
    return {
        customerSelectedProduct: state.customerSelectedProduct,
        addCartProductNotification: state.addCartProductNotification,
        addCartProductNotificationError: state.addCartProductNotificationError,
        token: state.token
    };
};

class CustomerProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showConfirm: false,
            showError: false,
            errorLabel: ""
        }

        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.disableShowConfirm = this.disableShowConfirm.bind(this);
        this.disableShowError = this.disableShowError.bind(this);
    }

    componentDidUpdate(previousProps) {
        if (this.props.addCartProductNotification !== previousProps.addCartProductNotification &&
                this.props.addCartProductNotification) {     
            this.props.disableAddProductToCartNotification();
            this.setState({
                showConfirm: true
            });
            setTimeout(this.disableShowConfirm, 2000);
        }

        if (this.props.addCartProductNotificationError !== previousProps.addCartProductNotificationError &&
                this.props.addCartProductNotificationError) {      
            this.props.disableAddProductToCartNotificationError();
            this.setState({
                showError: true,
                errorLabel: "unable to add product"
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

    handleAddProduct() {
        this.props.addProductToCart(this.props.customerSelectedProduct.id, this.props.token);    
    }

    render() {
        let isProductEmtpy = true;
        if (Object.keys(this.props.customerSelectedProduct).length != 0) {
                    isProductEmtpy = false;
        }

        return (
            <div className="product-info-container">
                <div className="product-info-container__text">
                    <Translation>
                        { t => <>{t('customer_prod_info_header')}</> }
                    </Translation>
                </div>
                {isProductEmtpy &&
                    <div className="products-not-available">
                        <Translation>
                            { t => <>{t('customer_prod_info_unavailable')}</> }
                        </Translation>
                    </div>
                }
                {!isProductEmtpy &&
                <div className="product-wrapper">
                    <div className="product-wrapper__name">
                        <div className="product-wrapper__name__text">
                            {this.props.customerSelectedProduct.name}
                        </div>
                        <div className="product-wrapper__name__spacer">
                        </div>
                        <div className="product-wrapper__name__addproduct"
                             onClick={() => {this.handleAddProduct()}}>
                            <Translation>
                                { t => <>{t('customer_prod_info_add_cart')}</> }
                            </Translation>
                        </div>
                    </div>
                    <div className="product-wrapper__manufacturer">
                        <Translation>
                            { t => <>{t('customer_prod_info_manufacturer')}</> }
                        </Translation>
                        : {this.props.customerSelectedProduct.manufacturer}
                    </div>
                    <div className="product-wrapper__price">
                        <div className="product-wrapper__price__title">
                            <Translation>
                                { t => <>{t('customer_prod_info_price')}</> }
                            </Translation>
                        </div>
                        <div className="product-wrapper__price__spacer"></div>
                        <div className="product-wrapper__price__value">
                            {this.props.customerSelectedProduct.price}
                        </div>
                    </div>
                    <div className="product-wrapper__description">
                        <div className="product-wrapper__description__title">
                            <Translation>
                                { t => <>{t('customer_prod_info_descriprion')}</> }
                            </Translation>
                        </div>
                        <div className="product-wrapper__description__text">
                            {this.props.customerSelectedProduct.description}
                        </div>
                    </div>
                </div>
                }
                {this.state.showConfirm &&
                    <div className="product-wrapper_alertbox">
                        <Translation>
                            { t => <>{t('customer_prod_info_added_cart')}</> }
                        </Translation>
                    </div>
                }
                {this.state.showError &&
                    <div className="product-wrapper_alertbox-error">
                        <Translation>
                            { t => <>{t('error_alertbox')}</> }
                        </Translation>: {this.state.errorLabel}
                    </div>
                }
            </div>
        );
    }
}

CustomerProductInfo.propTypes = {
    customerSelectedProduct: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProductInfo)