import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';


class ProductMgmtCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product-mgmt-wrapper">
                <div className="product-mgmt-manufacturer">
                    <Translation>
                        { t => <>{t('admin_product_mgmt_manufacturer')}</> }
                    </Translation> :
                    <input className="product-mgmt-manufacturer-input"
                           onChange={e => this.props.handleManufacturerChoice(e, e.target.value)}
                           value={this.props.manufacturer || ''}>
                    </input>
                </div>
                {this.props.locs.map((n, i) => (
                <div className="product-mgmt-loc-wrapper"
                     key={i}>
                    <div className="product-mgmt-loc-locale">
                        <select className="product-mgmt-loc-locale-select"
                                onChange={e => this.props.handleLocalizationChoice(e, i, e.target.value)}
                                value={this.props.selectedLocales[i] || ''}>
                            {this.props.showSelectLabel &&
                                <option value="0">Select locale:</option>
                            }
                            {this.props.localeList.locales.map((l, id) => (
                                <option key={id} value={l.languageCode + "-" + l.countryCode}>
                                    {l.languageCode + "-" + l.countryCode}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="product-mgmt-loc-name">
                        <Translation>
                            { t => <>{t('admin_product_mgmt_name')}</> }
                        </Translation>
                        <input className="product-mgmt-loc-name-input"
                               onChange={e => this.props.handleNameChoice(e, i, e.target.value)}
                               value={this.props.selectedNames[i] || ''}>
                        </input>
                    </div>
                    <div className="product-mgmt-loc-name">
                        <Translation>
                            { t => <>{t('admin_product_mgmt_category')}</> }
                        </Translation>
                        <input className="product-mgmt-loc-name-input"
                               onChange={e => this.props.handleCategoryChoice(e, i, e.target.value)}
                               value={this.props.selectedCategories[i] || ''}>
                        </input>
                    </div>
                    <div className="product-mgmt-loc-description">
                        <Translation>
                            { t => <>{t('admin_product_mgmt_description')}</> }
                        </Translation>
                        <div>
                            <textarea className="product-mgmt-loc-description-input"
                                      onChange={e => this.props.handleDescriptionChoice(e, i, e.target.value)}
                                      value={this.props.selectedDescriptions[i] || ''}>
                            </textarea>
                        </div>
                    </div>
                    <div className="product-mgmt-loc-price">
                        <Translation>
                            { t => <>{t('admin_product_mgmt_price')}</> }
                        </Translation>
                        <input className="product-mgmt-loc-price-input"
                               type="number"
                               onChange={e => this.props.handlePriceChoice(e, i, e.target.value)}
                               value={this.props.selectedPrices[i] || ''}>
                        </input>
                        <Translation>
                            { t => <>{t('admin_product_mgmt_currency')}</> }
                        </Translation>
                        <select className="product-mgmt-loc-currency-select"
                                onChange={e => this.props.handleCurrencyChoice(e, i, e.target.value)}
                                value={this.props.selectedCurrencies[i] || ''}>
                            {this.props.showSelectLabel &&
                                <option value="0">Select currency:</option>
                            }
                            {this.props.currencyList.currencies.map((c, id) => (
                                <option key={id} value={c.currency}>{c.currency}</option>
                            ))}
                        </select>
                    </div>
                </div>
                ))}
                {this.props.showAddLocalization &&
                    <div className="product-mgmt-loc-button"
                         onClick={(e) => {this.props.handleAddProdLocalization(e)}}>
                        <Translation>
                            { t => <>{t('admin_product_mgmt_add_locale')}</> }
                        </Translation>
                    </div>
                }
            </div>
        );
    }
}

ProductMgmtCard.propTypes = {
    handleManufacturerChoice: PropTypes.func,
    handleLocalizationChoice: PropTypes.func,
    handleNameChoice: PropTypes.func,
    handleCategoryChoice: PropTypes.func,
    handleDescriptionChoice: PropTypes.func,
    handlePriceChoice: PropTypes.func,
    handleCurrencyChoice: PropTypes.func,
    handleAddProdLocalization: PropTypes.func,
    showSelectLabel: PropTypes.bool,
    showAddLocalization: PropTypes.bool,
    localeList: PropTypes.object,
    currencyList: PropTypes.object,
    manufacturer: PropTypes.object,
    selectedLocales: PropTypes.array,
    selectedNames: PropTypes.array,
    selectedCategories: PropTypes.array,
    selectedDescriptions: PropTypes.array,
    selectedPrices: PropTypes.array,
    selectedCurrencies: PropTypes.array
}

export default ProductMgmtCard;