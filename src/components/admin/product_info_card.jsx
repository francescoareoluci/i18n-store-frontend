import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import { Translation } from 'react-i18next';

import product_card from "../common/product_card";


class ProductInfoCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product-info-card-wrapper">
                <div className="product-info-card-wrapper__locale">
                    <Translation>
                        { t => <>{t('product_info_card_locale')}</> }
                    </Translation>
                    : {this.props.locale}
                </div>

                <div className="product-info-card">
                    <div className="product-info-card__titlename">
                        <Translation>
                            { t => <>{t('product_info_card_name')}</> }
                        </Translation>
                    </div>
                    <div className="product-info-card__name">
                        {this.props.name}
                    </div>
                    <div className="product-info-card__titledescription">
                        <Translation>
                            { t => <>{t('product_info_card_description')}</> }
                        </Translation>
                    </div>
                    <div className="product-info-card__description">
                        {this.props.description}
                    </div>
                    <div className="product-info-card__pricewrapper">
                        <div className="product-info-card__titleprice">
                            <Translation>
                                { t => <>{t('product_info_card_price')}</> }
                            </Translation>
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

export default ProductInfoCard;