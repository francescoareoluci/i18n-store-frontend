import React from "react";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';


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

ProductInfoCard.propTypes = {
    locale: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
}

export default ProductInfoCard;