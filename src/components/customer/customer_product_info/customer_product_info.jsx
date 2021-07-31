import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import ProductCard from "../../common/product_card/product_card";

import { getSimilarProducts } from "../../../js/actions/getSimilarProducts";
import { 
    addProductToCart,
    disableAddProductToCartNotification,
    disableAddProductToCartNotificationError 
} from "../../../js/actions/addProductToCart";


function mapDispatchToProps(dispatch) {
    return {
        addProductToCart: (prodId, userId, token) => dispatch(addProductToCart(prodId, userId, token)),
        disableAddProductToCartNotification: () => dispatch(disableAddProductToCartNotification()),
        disableAddProductToCartNotificationError: () => dispatch(disableAddProductToCartNotificationError()),
        getSimilarProducts: (prodId, token) => dispatch(getSimilarProducts(prodId, token))
    };
}

const mapStateToProps = (state) => {
    return {
        customerSelectedProduct: state.getters.customer.customerSelectedProduct,
        addCartProductNotification: state.notifications.cart.addCartProductNotification,
        addCartProductNotificationError: state.notifications.cart.addCartProductNotificationError,
        similarProductList: state.getters.common.similarProductList,
        userId: state.auth.userId,
        token: state.auth.token
    };
};

class CustomerProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: true,
            showConfirm: false,
            showError: false,
            errorLabel: ""
        }

        this.handleAddProduct = this.handleAddProduct.bind(this);
        this.disableShowConfirm = this.disableShowConfirm.bind(this);
        this.disableShowError = this.disableShowError.bind(this);
    }

    componentDidUpdate(previousProps) {
        if (this.props.customerSelectedProduct !== previousProps.customerSelectedProduct) {     
            this.props.getSimilarProducts(this.props.customerSelectedProduct.id, this.props.token);
        }

        if (this.props.addCartProductNotification !== previousProps.addCartProductNotification &&
                this.props.addCartProductNotification) {     
            this.props.disableAddProductToCartNotification();
            if (this.state.isMounted) {
                this.setState({
                    showConfirm: true
                });
                setTimeout(this.disableShowConfirm, 2000);
            }
        }

        if (this.props.addCartProductNotificationError !== previousProps.addCartProductNotificationError &&
                this.props.addCartProductNotificationError) {      
            this.props.disableAddProductToCartNotificationError();
            if (this.state.isMounted) {
                this.setState({
                    showError: true,
                    errorLabel: "unable to add product"
                });
                setTimeout(this.disableShowError, 2000);
            }
        }
    }

    componentWillUnmount() {
        this.setState({
            isMounted: false
        });
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
        this.props.addProductToCart(this.props.customerSelectedProduct.id, 
                                    this.props.userId, this.props.token);    
    }

    render() {
        let isProductEmtpy = true;
        if (Object.keys(this.props.customerSelectedProduct).length != 0) {
                    isProductEmtpy = false;
        }
        
        let isSimilarProductListEmpty = true;
        if (Object.keys(this.props.similarProductList).length != 0 &&
                this.props.similarProductList.length != 0) {
                    isSimilarProductListEmpty = false;
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
                {!isProductEmtpy &&
                    <div className="product-info_similar-prods-container">
                        <div className="product-info_similar-prods-container__text">
                            <Translation>
                                { t => <>{t('customer_prod_info_similar')}</> }
                            </Translation>
                        </div>
                        {!isSimilarProductListEmpty && this.props.similarProductList.map((prod, i) => (
                            <ProductCard 
                                key={i}
                                owner="customer"
                                prodId={prod.id}
                                name={prod.name}
                                manufacturer={prod.manufacturer}
                                price={prod.price}
                                showRemove="false"
                            />
                        ))}
                        {isSimilarProductListEmpty &&
                            <div className="product-info_similar-prods-container-not-found">
                                <Translation>
                                    { t => <>{t('customer_prod_info_similar_not_found')}</> }
                                </Translation>
                            </div>
                        }
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
    addProductToCart: PropTypes.func,
    disableAddProductToCartNotification: PropTypes.func,
    disableAddProductToCartNotificationError: PropTypes.func,
    customerSelectedProduct: PropTypes.object,
    addCartProductNotification: PropTypes.bool,
    addCartProductNotificationError: PropTypes.bool,
    token: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProductInfo)