import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';
import { withTranslation } from 'react-i18next';

import RingLoader from "../../common/ring_loader/ring_loader"
import ProductCard from "../../common/product_card/product_card"

import { getProductList } from "../../../js/actions/getProductList"
import { performSearch } from "../../../js/actions/performSearch"


function mapDispatchToProps(dispatch) {
    return {
        getProductList: (isAdmin, token) => dispatch(getProductList(isAdmin, token)),
        performSearch: (keywords, token) => dispatch(performSearch(keywords, token))
    };
}

const mapStateToProps = (state) => {
    return {
        productList: state.getters.common.productList,
        token: state.auth.token
    };
};

class CustomerProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: "",
            showAllProducts: true,
            searchResultLabel: "",
            isListLoading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleShowAll = this.handleShowAll.bind(this);
    }
    
    componentDidMount() {
        this.props.getProductList(false, this.props.token);
        this.setState({
            isListLoading: true
        });
    }

    componentDidUpdate(previousProps) {
        if (this.props.productList !== previousProps.productList) {
            this.setState({
                isListLoading: false
            })
        }
    }

    handleShowAll(e) {
        e.preventDefault();
        this.props.getProductList(false, this.props.token);
        this.setState({
            showAllProducts: true
        })
    }

    handleInputChange(e) {
        e.preventDefault();
        this.setState({
            inputText: e.target.value
        });
    }

    handleSearch(e) {
        this.props.performSearch(this.state.inputText, this.props.token);
        this.setState({
            showAllProducts: false,
            searchResultLabel: this.state.inputText
        })
    }

    render() {
        let isListEmpty = true;
        if (Object.keys(this.props.productList).length != 0 &&
                this.props.productList.length != 0) {
                    isListEmpty = false;
        }

        return (
            <div className="products-container">
                <div className="products-header">
                    <div className="products-header__title">
                        <Translation>
                            { t => <>{t('product_page_header')}</> }
                        </Translation>
                    </div>
                    <div className="product-header__spacer"></div>
                    <div className="products-header__button"
                         onClick={(e) => {this.handleShowAll(e)}}>
                        <div className="products-header__button__text">
                            <Translation>
                                { t => <>{t('product_page_show_all')}</> }
                            </Translation>
                        </div>
                    </div>
                    <div className="products-header__searchbar">
                        <div className="products-header__searchbar__text">
                            <input className="products-header__searchbar__input" 
                                   type="text" 
                                   value={this.state.inputText}
                                   placeholder={this.props.t('product_page_search')}
                                   onChange={(e) => {this.handleInputChange(e)}}
                                   onKeyPress={(e) => {if (e.key == "Enter") this.handleSearch();}}
                            />
                        </div>
                    </div>
                </div>
                <div className="display-type">
                    {this.state.showAllProducts &&
                        <label>
                            <Translation>
                                { t => <>{t('product_page_display_all')}</> }
                            </Translation>
                        </label>
                    }
                    {!this.state.showAllProducts &&
                        <label>
                            <Translation>
                                { t => <>{t('product_page_display_search')}</> }
                            </Translation>
                            : {this.state.searchResultLabel}
                        </label>
                    }
                </div>
                {this.state.isListLoading &&
                    <RingLoader />
                }
                {!this.state.isListLoading && 
                 isListEmpty &&
                    <div className="products-not-available">
                        <Translation>
                            { t => <>{t('product_page_unavailable')}</> }
                        </Translation>
                    </div>
                }
                {!this.state.isListLoading &&
                 !isListEmpty && this.props.productList.map((prod, i) => (
                    <ProductCard 
                        key={i}
                        owner="customer"
                        prodId={prod.id}
                        name={prod.name}
                        manufacturer={prod.manufacturer}
                        price={prod.price}
                        showRemove="false"
                    />
                ))}
            </div>
        );
    }
}

CustomerProducts.propTypes = {
    getProductList: PropTypes.func,
    performSearch: PropTypes.func,
    productList: PropTypes.array,
    token: PropTypes.string
}

/* withTranslation HOC is needed to set the input placeholder text */
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(CustomerProducts))