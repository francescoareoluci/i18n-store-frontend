import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import ProductCard from "../../common/product_card/product_card";

import { getShoppingList } from "../../../js/actions/getShoppingList";


function mapDispatchToProps(dispatch) {
    return {
        getShoppingList: (userId, token) => dispatch(getShoppingList(userId, token))
    };
}

const mapStateToProps = (state) => {
    return {
        shoppingList: state.getters.customer.shoppingList,
        userId: state.auth.userId,
        token: state.auth.token
    };
};

class ShoppingList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getShoppingList(this.props.userId, this.props.token);
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
                    <Translation>
                        { t => <>{t('shopping_list_header')}</> }
                    </Translation>
                </div>
                {isListEmpty &&
                    <div>
                        <Translation>
                            { t => <>{t('shopping_list_empty')}</> }
                        </Translation>
                    </div>
                }
                {!isListEmpty && this.props.shoppingList.products.map((p, i) =>(
                    <ProductCard 
                        key={i}
                        owner="customer"
                        prodId={p.id}
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

ShoppingList.propTypes = {
    getShoppingList: PropTypes.func,
    shoppingList: PropTypes.object,
    token: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList)