import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import { getCurrencies } from "../../js/actions/getCurrencies"
import { getLocales } from "../../js/actions/getLocales";
import { 
    addProduct, 
    disableAddProductNotification,
    disableAddProductNotificationError 
} from "../../js/actions/addProduct";


function mapDispatchToProps(dispatch) {
    return {
        getLocales: (token) => dispatch(getLocales(token)),
        getCurrencies: (token) => dispatch(getCurrencies(token)),
        addProduct: (token, product) => dispatch(addProduct(token, product)),
        disableAddProductNotification: () => dispatch(disableAddProductNotification()),
        disableAddProductNotificationError: () => dispatch(disableAddProductNotificationError())
    };
}

const mapStateToProps = (state) => {
    return {
        localeList: state.localeList,
        currencyList: state.currencyList,
        addProductNotification: state.addProductNotification,
        addProductNotificationError: state.addProductNotificationError,
        token: state.token
    };
};

class AdminAddProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            availableLoc: 2,
            locs: [],
            manufacturer: "",
            selectedLocales: [],
            selectedNames: [],
            selectedCategories: [],
            selectedDescriptions: [],
            selectedPrices: [],
            selectedCurrencies: [],
            localizations: [],
            showConfirm: false,
            showError: false,
            errorLabel: ""
        }

        this.disableShowConfirm = this.disableShowConfirm.bind(this);
        this.disableShowError = this.disableShowError.bind(this);
        this.handleAddProdLocalization = this.handleAddProdLocalization.bind(this);
        this.handleManufacturerChoice = this.handleManufacturerChoice.bind(this);
        this.handleLocalizationChoice = this.handleLocalizationChoice.bind(this);
        this.handleNameChoice = this.handleNameChoice.bind(this);
        this.handleCategoryChoice = this.handleCategoryChoice.bind(this);
        this.handleDescriptionChoice = this.handleDescriptionChoice.bind(this);
        this.handlePriceChoice = this.handlePriceChoice.bind(this);
        this.handleCurrencyChoice = this.handleCurrencyChoice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getLocales(this.props.token);
        this.props.getCurrencies(this.props.token);
    }

    componentDidUpdate(previousProps) {
        if (this.props.addProductNotification !== previousProps.addProductNotification &&
                this.props.addProductNotification) {       
            this.props.disableAddProductNotification();
            this.setState({
                showConfirm: true
            });
            setTimeout(this.disableShowConfirm, 2000);
        }

        if (this.props.addProductNotificationError !== previousProps.addProductNotificationError &&
                this.props.addProductNotificationError) {       
            this.props.disableAddProductNotificationError();
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

    handleAddProdLocalization(e) {
        e.preventDefault();

        let availables = this.state.availableLoc;
        if (availables <= 0) {
            return;
        } 
        let locs = this.state.locs;
        locs.push(1);

        this.setState({
            availableLoc: availables - 1,
            locs: locs
        })
    }

    handleManufacturerChoice(e, value) {
        e.preventDefault();

        this.setState({
            manufacturer: value
        });
    }

    handleLocalizationChoice(e, idx, value) {
        e.preventDefault();

        if (value == "0") {
            return;
        }
        
        let resArray = this.state.selectedLocales;
        if (idx > this.state.selectedLocales.length) {
            resArray.push(value);
        }
        else {
            resArray[idx] = value;
        }

        this.setState({
            selectedLocales: resArray
        });
    }

    handleNameChoice(e, idx, value) {
        e.preventDefault();

        let resArray = this.state.selectedNames;
        if (idx > this.state.selectedNames.length) {
            resArray.push(value);
        }
        else {
            resArray[idx] = value;
        }

        this.setState({
            selectedNames: resArray
        });
    }

    handleCategoryChoice(e, idx, value) {
        e.preventDefault();

        let resArray = this.state.selectedCategories;
        if (idx > this.state.selectedCategories.length) {
            resArray.push(value);
        }
        else {
            resArray[idx] = value;
        }

        this.setState({
            selectedCategories: resArray
        }); 
    }

    handleDescriptionChoice(e, idx, value) {
        e.preventDefault();

        let resArray = this.state.selectedDescriptions;
        if (idx > this.state.selectedDescriptions.length) {
            resArray.push(value);
        }
        else {
            resArray[idx] = value;
        }

        this.setState({
            selectedDescriptions: resArray
        });
    }

    handlePriceChoice(e, idx, value) {
        e.preventDefault();

        let resArray = this.state.selectedPrices;
        if (idx > this.state.selectedPrices.length) {
            resArray.push(value);
        }
        else {
            resArray[idx] = value;
        }

        this.setState({
            selectedPrices: resArray
        });
    }

    handleCurrencyChoice(e, idx, value) {
        e.preventDefault();

        let resArray = this.state.selectedCurrencies;
        if (idx > this.state.selectedCurrencies.length) {
            resArray.push(value);
        }
        else {
            resArray[idx] = value;
        }

        this.setState({
            selectedCurrencies: resArray
        });
    }


    handleSubmit(e) {
        e.preventDefault();

        // Validation
        let errorLabel = "";
        if (this.state.manufacturer === "") {
            errorLabel = "Empty manufacturer";
        } 

        if (this.state.locs.length !== this.state.selectedLocales.length) {
            errorLabel = "Not all locales have been selected";
        }

        if (this.state.locs.length !== this.state.selectedNames.length) {
            errorLabel = "Not all names have been set";
        }

        if (this.state.locs.length !== this.state.selectedCategories.length) {
            errorLabel = "Not all categories have been set";
        }

        if (this.state.locs.length !== this.state.selectedDescriptions.length) {
            errorLabel = "Not all descriptions have been set";
        }

        if (this.state.locs.length !== this.state.selectedPrices.length) {
            errorLabel = "Not all prices have been set";
        }

        if (this.state.locs.length !== this.state.selectedCurrencies.length) {
            errorLabel = "Not all currencies have been set";
        }

        if (errorLabel !== "") {
            this.setState({
                errorLabel: errorLabel,
                showError: true    
            })
            setTimeout(this.disableShowError, 2000);
            return;
        }

        let prodLocalization = {};
        let textualLocs = [];
        let currencyLocs = [];
        for (let i = 0; i < this.state.selectedLocales.length; i++) {
            const locName = {
                id: 1,
                fieldType: "product_name",
                text: this.state.selectedNames[i],
                languageCode: this.state.selectedLocales[i].split("-")[0],
                countryCode: this.state.selectedLocales[i].split("-")[1]
            }
            textualLocs.push(locName);

            const locDescription = {
                id: 1,
                fieldType: "product_description",
                text: this.state.selectedDescriptions[i],
                languageCode: this.state.selectedLocales[i].split("-")[0],
                countryCode: this.state.selectedLocales[i].split("-")[1]
            }
            textualLocs.push(locDescription);

            const locCategory = {
                id: 1,
                fieldType: "product_category",
                text: this.state.selectedCategories[i],
                languageCode: this.state.selectedLocales[i].split("-")[0],
                countryCode: this.state.selectedLocales[i].split("-")[1]
            }
            textualLocs.push(locDescription);

            const locPrice = {
                id: 1,
                fieldType: "product_price",
                price: this.state.selectedPrices[i],
                currency: this.state.selectedCurrencies[i],
                languageCode: this.state.selectedLocales[i].split("-")[0],
                countryCode: this.state.selectedLocales[i].split("-")[1]
            }
            currencyLocs.push(locPrice);
        }

        prodLocalization = {
            id: 1,
            manufacturer: this.state.manufacturer,
            localizedTextualItemList: textualLocs,
            localizedCurrencyItemList: currencyLocs
        };

        this.props.addProduct(this.props.token, prodLocalization);
    }

    render() {
        let showAddLocalization = false;
        if (this.state.availableLoc > 0) {
            showAddLocalization = true;
        }

        return (
            <div className="add-product-container">
                <div className="add-product-container__text">
                    Add a product
                </div>
                <div className="add-product-wrapper">
                    <div className="add-product-manufacturer">
                        Manufacturer:
                        <input className="add-product-manufacturer-input"
                               onChange={e => this.handleManufacturerChoice(e, e.target.value)}>
                        </input>
                    </div>
                    {this.state.locs.map((n, i) => (
                    <div className="add-product-loc-wrapper"
                         key={i}>
                        <div className="add-product-loc-locale">
                            <select className="add-product-loc-locale-select"
                                    onChange={e => this.handleLocalizationChoice(e, i, e.target.value)}>
                                <option value="0">Select locale:</option>
                                {this.props.localeList.locales.map((l, id) => (
                                    <option key={id} value={l.languageCode + "-" + l.countryCode}>
                                        {l.languageCode + "-" + l.countryCode}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="add-product-loc-name">
                            Product name:
                            <input className="add-product-loc-name-input"
                                   onChange={e => this.handleNameChoice(e, i, e.target.value)}>
                            </input>
                        </div>
                        <div className="add-product-loc-name">
                            Product category:
                            <input className="add-product-loc-name-input"
                                   onChange={e => this.handleCategoryChoice(e, i, e.target.value)}>
                            </input>
                        </div>
                        <div className="add-product-loc-description">
                            Product description:
                            <div>
                                <textarea className="add-product-loc-description-input"
                                          onChange={e => this.handleDescriptionChoice(e, i, e.target.value)}>
                                </textarea>
                            </div>
                        </div>
                        <div className="add-product-loc-price">
                            Product price:
                            <input className="add-product-loc-price-input"
                                   onChange={e => this.handlePriceChoice(e, i, e.target.value)}>
                            </input>
                            Currency:
                            <select className="add-product-loc-currency-select"
                                    onChange={e => this.handleCurrencyChoice(e, i, e.target.value)}>
                                <option value="0">Select currency:</option>
                                {this.props.currencyList.currencies.map((c, id) => (
                                    <option key={id} value={c.currency}>{c.currency}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    ))}
                    {showAddLocalization &&
                        <div className="add-product-loc-button"
                             onClick={(e) => {this.handleAddProdLocalization(e)}}>
                            Add product localization
                        </div>
                    }
                </div>
                <div className="add-product-confirm-button"
                     onClick={(e) => {this.handleSubmit(e)}}>
                    Add product
                </div>
                {this.state.showConfirm &&
                    <div className="add-product-confirm_alertbox">
                        Product Added
                    </div>
                }
                {this.state.showError &&
                    <div className="add-product-confirm_alertbox">
                        Error: {this.state.errorLabel}
                    </div>
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct)