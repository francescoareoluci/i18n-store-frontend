import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import ProductCard from "../common/product_card"

import { getProductList } from "../../js/actions/getProductList"


function mapDispatchToProps(dispatch) {
    return {
        getProductList: () => dispatch(getProductList()),
    };
}

const mapStateToProps = (state) => {
    return {
        productList: state.productList
    };
};

class CustomerProducts extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.props.getProductList();
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
                        Products
                    </div>
                    <div className="product-header__spacer"></div>
                    <div className="products-header__searchbar">
                        <div className="products-header__searchbar__text">
                            Search products by keywords
                        </div>
                    </div>
                </div>
                <div className="display-type">
                    All products
                </div>
                {isListEmpty &&
                    <div>
                        No products available
                    </div>
                }
                {!isListEmpty && this.props.productList.map((prod, i) => (
                    <ProductCard 
                        key={i}
                        linkTo="customer"
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
    productList: PropTypes.array
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProducts)