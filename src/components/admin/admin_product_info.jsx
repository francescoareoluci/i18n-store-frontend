import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import ProductInfoCard from "./product_info_card"

import { removeProduct } from "../../js/actions/removeProduct";
import { setRemoveProdLoading } from "../../js/actions/setRemoveProductLoading";


function mapDispatchToProps(dispatch) {
    return {
        removeProduct: (prodId, token) => dispatch(removeProduct(prodId, token)),
        setRemoveProdLoading: (isDone) => dispatch(setRemoveProdLoading(isDone))
    };
}

const mapStateToProps = (state) => {
    return {
        adminSelectedProduct: state.adminSelectedProduct,
        removeProductLoading: state.removeProductLoading,
        token: state.token
    };
};

class AdminProductInfo extends React.Component {
    constructor(props) {
        super(props);

        this.handleProductRemove = this.handleProductRemove.bind(this);
    }

    componentDidUpdate(previousProps) {
        if (this.props.removeProductLoading !== previousProps.removeProductLoading &&
                this.props.removeProductLoading) {       
            this.props.setRemoveProdLoading(false);
            this.props.history.push("/admin/products");
        }
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
                    <div>
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
            </div>
        );
    }
}

AdminProductInfo.propTypes = {
    adminSelectedProduct: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductInfo)