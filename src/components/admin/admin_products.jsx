import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import ProductCard from "../common/product_card"

import { getProductList } from "../../js/actions/getProductList"
import { performSearch } from "../../js/actions/performSearch"


function mapDispatchToProps(dispatch) {
    return {
        getProductList: (isAdmin, token) => dispatch(getProductList(isAdmin, token)),
        performSearch: (keywords, token) => dispatch(performSearch(keywords, token))
    };
}

const mapStateToProps = (state) => {
    return {
        productList: state.productList,
        token: state.token
    };
};

class AdminProducts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputText: "",
            showAllProducts: true
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleShowAll = this.handleShowAll.bind(this);
    }

    componentDidMount() {
        this.props.getProductList(true, this.props.token);
    }

    handleShowAll(e) {
        e.preventDefault();
        this.props.getProductList(true, this.props.token);
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
            showAllProducts: false
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
                    <div className="products-header__button">
                        <div className="products-header__button__text">
                            <Translation>
                                { t => <>{t('product_page_add')}</> }
                            </Translation>
                        </div>
                    </div>
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
                                   placeholder="Search products"
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
                            : {this.state.inputText}
                        </label>
                    }
                </div>
                {isListEmpty &&
                    <div className="products-not-available">
                        <Translation>
                            { t => <>{t('product_page_unavailable')}</> }
                        </Translation>
                    </div>
                }
                {!isListEmpty && this.props.productList.map((prod, i) =>(
                    <ProductCard 
                        key={i}
                        linkTo="admin"
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

AdminProducts.propTypes = {
    getProductList: PropTypes.func,
    productList: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts)