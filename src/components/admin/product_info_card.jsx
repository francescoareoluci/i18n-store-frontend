import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import product_card from "../common/product_card";


function mapDispatchToProps(dispatch) {
    return {};
}

const mapStateToProps = (state) => {
    return {};
};

class ProductInfoCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product-info-card-wrapper">
                <div className="product-info-card-wrapper__locale">
                    Locale: {this.props.locale}
                </div>

                <div className="product-info-card">
                    <div className="product-info-card__titlename">
                        Product Name
                    </div>
                    <div className="product-info-card__name">
                        {this.props.name}
                    </div>
                    <div className="product-info-card__titledescription">
                        Description
                    </div>
                    <div className="product-info-card__description">
                        {this.props.description}
                    </div>
                    <div className="product-info-card__pricewrapper">
                        <div className="product-info-card__titleprice">
                            Price
                        </div>
                        <div className="product-info-card__pricespacer"></div>
                        <div className="product-info-card__price">
                            {this.props.price}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfoCard)