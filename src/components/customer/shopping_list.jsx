import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";

import ProductCard from "../common/product_card";

import { getShoppingList } from "../../js/actions/getShoppingList";


function mapDispatchToProps(dispatch) {
    return {
        getShoppingList: () => dispatch(getShoppingList())
    };
}

const mapStateToProps = (state) => {
    return {
        shoppingList: state.shoppingList
    };
};

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getShoppingList();
    }

    render() {
        let isListEmpty = true;
        if (Object.keys(this.props.shoppingList).length != 0 &&
                this.props.shoppingList.products.length != 0) {
                    isListEmpty = false;
        }

        return (
            <div className="shopping-list-container">
                <div className="shopping-list__title">
                    Shopping List
                </div>
                {isListEmpty &&
                    <div>
                        Empty Cart
                    </div>
                }
                {!isListEmpty && this.props.shoppingList.products.map((p, i) =>(
                    <ProductCard 
                        key={i}
                        linkTo="customer"
                        name={p.name}
                        manufacturer={p.manufacturer}
                        price={p.price}
                        showRemove="false"
                    />
                ))}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)