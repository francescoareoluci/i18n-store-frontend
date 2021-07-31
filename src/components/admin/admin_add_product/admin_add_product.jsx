import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import ProductMgmtCard from "../product_mgmt_card/product_mgmt_card";

import { getCurrencies } from "../../../js/actions/getCurrencies"
import { getLocales } from "../../../js/actions/getLocales";
import { 
    addProduct, 
    disableAddProductNotification,
    disableAddProductNotificationError 
} from "../../../js/actions/addProduct";


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
        localeList: state.getters.admin.localeList,
        currencyList: state.getters.admin.currencyList,
        addProductNotification: state.notifications.products.addProductNotification,
        addProductNotificationError: state.notifications.products.addProductNotificationError,
        token: state.auth.token
    };
};

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

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
        this.validateInput = this.validateInput.bind(this);
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

        if (value == "0") {
            return;
        }

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

    validateInput() {
        if (this.state.manufacturer === "") {
            return "Empty manufacturer";
        } 

        if (this.state.locs.length !== this.state.selectedLocales.length) {
            return "Not all locales have been selected";
        }

        if (this.state.locs.length !== this.state.selectedNames.length) {
            return "Not all names have been set";
        }

        if (this.state.locs.length !== this.state.selectedCategories.length) {
            return "Not all categories have been set";
        }

        if (this.state.locs.length !== this.state.selectedDescriptions.length) {
            return "Not all descriptions have been set";
        }

        if (this.state.locs.length !== this.state.selectedPrices.length) {
            return "Not all prices have been set";
        }

        if (this.state.locs.length !== this.state.selectedCurrencies.length) {
            return "Not all currencies have been set";
        }

        this.state.selectedLocales.forEach(element => {
            if (element == "" || element == "0")
                return "Invalid locale selected";
        });

        if (hasDuplicates(this.state.selectedLocales))
            return "invalid locale selected";
        
        this.state.selectedNames.forEach(element => {
            if (element == "")
                return "Invalid input name";
        });

        this.state.selectedCategories.forEach(element => {
            if (element == "")
                return "Invalid input category";
        });

        this.state.selectedPrices.forEach(element => {
            if (element == "" || element <= 0)
                return "Invalid input price";
        });

        this.state.selectedCurrencies.forEach(element => {
            if (element == "" || element == "0")
                return "Invalid currency selected";
        });

        return "";
    }


    handleSubmit(e) {
        e.preventDefault();

        // Validation
        let errorLabel = this.validateInput();

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
            textualLocs.push(locCategory);

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

        let areLocalesEmtpy = true;
        if (Object.keys(this.props.localeList).length != 0) {
            areLocalesEmtpy = false;
        }

        let areCurrenciesEmpty = true;
        if (Object.keys(this.props.currencyList).length != 0) {
            areCurrenciesEmpty = false;
        }

        return (
            <div className="add-product-container">
                <div className="add-product-container__text">
                    <Translation>
                        { t => <>{t('admin_add_product_header')}</> }
                    </Translation>
                </div>
                {areLocalesEmtpy || areCurrenciesEmpty &&
                    <div>
                        Product informations not loaded
                    </div>
                }
                {!areLocalesEmtpy && !areCurrenciesEmpty &&
                    <ProductMgmtCard
                        showSelectLabel={true}
                        showAddLocalization={showAddLocalization}
                        handleManufacturerChoice={this.handleManufacturerChoice}
                        manufacturer={this.state.manufacturer}
                        locs={this.state.locs}
                        handleLocalizationChoice={this.handleLocalizationChoice}
                        selectedLocales={this.state.selectedLocales}
                        localeList={this.props.localeList}
                        handleNameChoice={this.handleNameChoice}
                        selectedNames={this.state.selectedNames}
                        handleCategoryChoice={this.handleCategoryChoice}
                        selectedCategories={this.state.selectedCategories}
                        handleDescriptionChoice={this.handleDescriptionChoice}
                        selectedDescriptions={this.state.selectedDescriptions}
                        handlePriceChoice={this.handlePriceChoice}
                        selectedPrices={this.state.selectedPrices}
                        handleCurrencyChoice={this.handleCurrencyChoice}
                        selectedCurrencies={this.state.selectedCurrencies}
                        currencyList={this.props.currencyList}
                        handleAddProdLocalization={this.handleAddProdLocalization}
                    />
                }
                <div className="add-product-confirm-button"
                     onClick={(e) => {this.handleSubmit(e)}}>
                    <Translation>
                        { t => <>{t('admin_add_product_button')}</> }
                    </Translation>
                </div>
                {this.state.showConfirm &&
                    <div className="add-product-confirm_alertbox">
                        <Translation>
                            { t => <>{t('admin_add_product_confirm')}</> }
                        </Translation>
                    </div>
                }
                {this.state.showError &&
                    <div className="add-product-confirm_alertbox-error">
                        <Translation>
                            { t => <>{t('error_alertbox')}</> }
                        </Translation>: {this.state.errorLabel}
                    </div>
                }
            </div>
        );
    }
}

AdminAddProduct.propTypes = {
    getLocales: PropTypes.func,
    getCurrencies: PropTypes.func,
    addProduct: PropTypes.func,
    disableAddProductNotification: PropTypes.func,
    disableAddProductNotificationError: PropTypes.func,
    localeList: PropTypes.object,
    currencyList: PropTypes.object,
    addProductNotification: PropTypes.bool,
    addProductNotificationError: PropTypes.bool,
    token: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct)