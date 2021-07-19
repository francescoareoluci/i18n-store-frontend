import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import ProductMgmtCard from "./product_mgmt_card";

import { getCurrencies } from "../../js/actions/getCurrencies"
import { getLocales } from "../../js/actions/getLocales";
import { 
    editProduct, 
    disableEditProductNotification,
    disableEditProductNotificationError 
} from "../../js/actions/editProduct";


function mapDispatchToProps(dispatch) {
    return {
        getLocales: (token) => dispatch(getLocales(token)),
        getCurrencies: (token) => dispatch(getCurrencies(token)),
        editProduct: (token, product) => dispatch(editProduct(token, product)),
        disableEditProductNotification: () => dispatch(disableEditProductNotification()),
        disableEditProductNotificationError: () => dispatch(disableEditProductNotificationError())
    };
}

const mapStateToProps = (state) => {
    return {
        adminSelectedProduct: state.getters.admin.adminSelectedProduct,
        localeList: state.getters.admin.localeList,
        currencyList: state.getters.admin.currencyList,
        editProductNotification: state.notifications.products.editProductNotification,
        editroductNotificationError: state.notifications.products.editroductNotificationError,
        token: state.auth.token
    };
};

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}

class AdminEditProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            locs: [],
            productId: 0,
            manufacturer: "",
            selectedLocales: [],
            selectedNames: [],
            selectedNameIds: [],
            selectedCategories: [],
            selectedCategoryIds: [],
            selectedDescriptions: [],
            selectedDescriptionIds: [],
            selectedPrices: [],
            selectedCurrencies: [],
            selectedPriceIds: [],
            localizations: [],
            showConfirm: false,
            showError: false,
            errorLabel: ""
        }

        this.disableShowConfirm = this.disableShowConfirm.bind(this);
        this.disableShowError = this.disableShowError.bind(this);
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

        let locales = [];
            let names = [];
            let nameIds = [];
            let categories = [];
            let categoryIds = [];
            let descriptions = [];
            let descriptionIds = [];
            let prices = [];
            let currencies = [];
            let priceIds = [];
            let locs = [];
            this.props.adminSelectedProduct.translations.forEach(element => {
                locales.push(element.locale);
                names.push(element.name);
                nameIds.push(element.nameId);
                categories.push(element.category);
                categoryIds.push(element.categoryId);
                descriptions.push(element.description);
                descriptionIds.push(element.descriptionId);
                prices.push(element.price.split(" ")[0]);
                currencies.push(element.price.split(" ")[1]);
                priceIds.push(element.priceId);
                locs.push(1);
            });

            this.setState({
                productId: this.props.adminSelectedProduct.id,
                manufacturer: this.props.adminSelectedProduct.manufacturer,
                selectedLocales: locales,
                selectedNames: names,
                selectedNameIds: nameIds,
                selectedCategories: categories,
                selectedCategoryIds: categoryIds,
                selectedDescriptions: descriptions,
                selectedDescriptionIds: descriptionIds,
                selectedPrices: prices,
                selectedCurrencies: currencies,
                selectedPriceIds: priceIds,
                locs: locs
            });
    }

    componentDidUpdate(previousProps) {
        if (this.props.editProductNotification !== previousProps.editProductNotification &&
                this.props.editProductNotification) {       
            this.props.disableEditProductNotification();
            this.setState({
                showConfirm: true
            });
            setTimeout(this.disableShowConfirm, 2000);
        }

        if (this.props.editroductNotificationError !== previousProps.editroductNotificationError &&
                this.props.editroductNotificationError) {       
            this.props.disableEditProductNotificationError();
            this.setState({
                showError: true,
                errorLabel: "unable to edit product"
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
                id: this.state.selectedNameIds[i],
                fieldType: "product_name",
                text: this.state.selectedNames[i],
                languageCode: this.state.selectedLocales[i].split("-")[0],
                countryCode: this.state.selectedLocales[i].split("-")[1]
            }
            textualLocs.push(locName);

            const locDescription = {
                id: this.state.selectedDescriptionIds[i],
                fieldType: "product_description",
                text: this.state.selectedDescriptions[i],
                languageCode: this.state.selectedLocales[i].split("-")[0],
                countryCode: this.state.selectedLocales[i].split("-")[1]
            }
            textualLocs.push(locDescription);

            const locCategory = {
                id: this.state.selectedCategoryIds[i],
                fieldType: "product_category",
                text: this.state.selectedCategories[i],
                languageCode: this.state.selectedLocales[i].split("-")[0],
                countryCode: this.state.selectedLocales[i].split("-")[1]
            }
            textualLocs.push(locCategory);

            const locPrice = {
                id: this.state.selectedPriceIds[i],
                fieldType: "product_price",
                price: this.state.selectedPrices[i],
                currency: this.state.selectedCurrencies[i],
                languageCode: this.state.selectedLocales[i].split("-")[0],
                countryCode: this.state.selectedLocales[i].split("-")[1]
            }
            currencyLocs.push(locPrice);
        }

        prodLocalization = {
            id: this.state.productId,
            manufacturer: this.state.manufacturer,
            localizedTextualItemList: textualLocs,
            localizedCurrencyItemList: currencyLocs
        };

        this.props.editProduct(this.props.token, prodLocalization);
    }

    render() {
        let areLocalesEmtpy = true;
        if (Object.keys(this.props.localeList).length != 0) {
            areLocalesEmtpy = false;
        }

        let areCurrenciesEmpty = true;
        if (Object.keys(this.props.currencyList).length != 0) {
            areCurrenciesEmpty = false;
        }

        let areLocsEmpty = true;
        if (Object.keys(this.state.locs).length != 0) {
            areLocsEmpty = false;
        }

        return (
            <div className="edit-product-container">
                <div className="edit-product-container__text">
                    <Translation>
                        { t => <>{t('admin_edit_product_header')}</> }
                    </Translation>: {this.state.errorLabel}
                </div>
                {areLocalesEmtpy || areCurrenciesEmpty || areLocsEmpty &&
                    <div>
                        Product informations not loaded
                    </div>
                }
                {!areLocalesEmtpy && !areCurrenciesEmpty && !areLocsEmpty &&
                    <ProductMgmtCard
                        showSelectLabel={false}
                        showAddLocalization={false}
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
                <div className="edit-product-confirm-button"
                     onClick={(e) => {this.handleSubmit(e)}}>
                    <Translation>
                        { t => <>{t('admin_edit_product_button')}</> }
                    </Translation>
                </div>
                {this.state.showConfirm &&
                    <div className="edit-product-confirm_alertbox">
                        <Translation>
                            { t => <>{t('admin_edit_product_confirm')}</> }
                        </Translation>
                    </div>
                }
                {this.state.showError &&
                    <div className="edit-product-confirm_alertbox-error">
                        <Translation>
                            { t => <>{t('error_alertbox')}</> }
                        </Translation>: {this.state.errorLabel}
                    </div>
                }
            </div>
        );
    }
}

AdminEditProduct.propTypes = {
    getLocales: PropTypes.func,
    getCurrencies: PropTypes.func,
    editProduct: PropTypes.func,
    disableEditProductNotification: PropTypes.func,
    disableEditProductNotificationError: PropTypes.func,
    adminSelectedProduct: PropTypes.object,
    localeList: PropTypes.object,
    currencyList: PropTypes.object,
    editProductNotification: PropTypes.bool,
    editroductNotificationError: PropTypes.bool,
    token: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditProduct)