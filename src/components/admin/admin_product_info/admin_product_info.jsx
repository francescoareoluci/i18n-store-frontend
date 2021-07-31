import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import { Translation } from 'react-i18next';

import ProductInfoCard from "../product_info_card/product_info_card"

import { 
    removeProduct,
    disableRemoveProductNotification,
    disableRemoveProductNotificationError 
} from "../../../js/actions/removeProduct";


function mapDispatchToProps(dispatch) {
    return {
        removeProduct: (prodId, token) => dispatch(removeProduct(prodId, token)),
        disableRemoveProductNotification: () => dispatch(disableRemoveProductNotification()),
        disableRemoveProductNotificationError: () => dispatch(disableRemoveProductNotificationError())
    };
}

const mapStateToProps = (state) => {
    return {
        adminSelectedProduct: state.getters.admin.adminSelectedProduct,
        removeProductNotification: state.notifications.products.removeProductNotification,
        removeProductNotificationError: state.notifications.products.removeProductNotificationError,
        token: state.auth.token
    };
};

class AdminProductInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showError: false,
            errorLabel: ""
        }

        this.disableShowError = this.disableShowError.bind(this);
        this.handleProductRemove = this.handleProductRemove.bind(this);
    }

    componentDidUpdate(previousProps) {
        if (this.props.removeProductNotification !== previousProps.removeProductNotification &&
                this.props.removeProductNotification) {       
            this.props.disableRemoveProductNotification(false);
            this.props.history.push("/admin/products");
        }

        if (this.props.removeProductNotificationError !== previousProps.removeProductNotificationError &&
                this.props.removeProductNotificationError) {       
            this.props.disableRemoveProductNotificationError();
            this.setState({
                showError: true,
                errorLabel: "unable to remove product"
            });
            setTimeout(this.disableShowError, 2000);
        }
    }

    disableShowError() {
        this.setState({
            showError: false,
            errorLabel: ""
        });
    }

    handleProductRemove(e) {
        e.preventDefault();
        this.props.removeProduct(this.props.adminSelectedProduct.id, this.props.token);
    }

    render() {
        let isProductEmtpy = true;
        if (Object.keys(this.props.adminSelectedProduct).length != 0) {
                    isProductEmtpy = false;
        }

        return (
            <div className="product-info-container">
                <div className="product-info-container__text">
                    <Translation>
                        { t => <>{t('admin_prod_info_header')}</> }
                    </Translation>
                </div>
                {isProductEmtpy &&
                    <div className="products-not-available">
                        <Translation>
                            { t => <>{t('admin_prod_info_unavailable')}</> }
                        </Translation>
                    </div>
                }
                {!isProductEmtpy &&
                <div className="product-wrapper">
                    <div className="product-wrapper__name">
                        <div className="product-wrapper__name__text">
                            <Translation>
                                { t => <>{t('admin_prod_info_prod_id')}</> }
                            </Translation> 
                            : {this.props.adminSelectedProduct.id}
                        </div>
                        <div className="product-wrapper__name__removespacer">
                        </div>
                        <Link to="/admin/products/edit">
                            <div className="product-wrapper__name__removeproduct">
                                <Translation>
                                    { t => <>{t('admin_prod_info_edit_prod')}</> }
                                </Translation> 
                            </div>
                        </Link>
                        <div className="product-wrapper__name__removeproduct"
                             onClick={(e) => {this.handleProductRemove(e)}}>
                            <Translation>
                                { t => <>{t('admin_prod_info_remove_prod')}</> }
                            </Translation> 
                        </div>
                    </div>
                    <div className="product-wrapper__manufacturer">
                        <Translation>
                            { t => <>{t('admin_prod_info_manufacturer')}</> }
                        </Translation> 
                        : {this.props.adminSelectedProduct.manufacturer}
                    </div>
                    {this.props.adminSelectedProduct.translations.map((tr, i) => (
                       <ProductInfoCard 
                            key={i}
                            locale={tr.locale}
                            name={tr.name}
                            description={tr.description}
                            price={tr.price}
                       /> 
                    ))}
                </div>
                }
                {this.state.showError &&
                    <div className="remove-product-confirm_alertbox-error">
                        <Translation>
                            { t => <>{t('error_alertbox')}</> }
                        </Translation>: {this.state.errorLabel}
                    </div>
                }
            </div>
        );
    }
}

AdminProductInfo.propTypes = {
    removeProduct: PropTypes.func,
    disableRemoveProductNotification: PropTypes.func,
    disableRemoveProductNotificationError: PropTypes.func,
    adminSelectedProduct: PropTypes.object,
    removeProductNotification: PropTypes.bool,
    removeProductNotificationError: PropTypes.bool,
    token: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductInfo)