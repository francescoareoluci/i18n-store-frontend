import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { getCurrencies } from "../../js/actions/getCurrencies"


function mapDispatchToProps(dispatch) {
    return {
        getCurrencies: (token) => dispatch(getCurrencies(token))
    };
}

const mapStateToProps = (state) => {
    return {
        currencyList: state.currencyList,
        token: state.token
    };
};

class Currencies extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getCurrencies(this.props.token);
    }

    render() {
        let isListEmpty = true;
        if (Object.keys(this.props.currencyList).length != 0 &&
                this.props.currencyList.length != 0) {
                    isListEmpty = false;
        }

        return (
            <div className="currencies-container">
                <div className="currencies__title">
                    Currencies
                </div>

                <div className="currencies-wrapper">
                    {isListEmpty &&
                        <div>
                            No currency found
                        </div>
                    }
                    {!isListEmpty && this.props.currencyList.currencies.map((currency) => (
                        <div className="currencies-card">
                            <div className="currencies-card__id">
                                Currency ID: {currency.id}
                            </div>
                            <div className="currencies-card__name">
                                Currency: {currency.currency}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies)