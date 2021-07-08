import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import ProductInfoCard from "./product_info_card"


function mapDispatchToProps(dispatch) {
    return {};
}

const mapStateToProps = (state) => {
    return {
        adminSelectedProduct: state.adminSelectedProduct
    };
};

class AdminProductInfo extends React.Component {
    constructor(props) {
        super(props);
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
                            Product ID {this.props.adminSelectedProduct.id}
                        </div>
                        <div className="product-wrapper__name__removespacer">
                        </div>
                        <div className="product-wrapper__name__removeproduct">
                            Remove product
                        </div>
                    </div>
                    <div className="product-wrapper__manufacturer">
                        {this.props.adminSelectedProduct.manufacturer}
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
            </div>
        );
    }
}

AdminProductInfo.propTypes = {
    adminSelectedProduct: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProductInfo)