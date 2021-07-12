import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

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
                    <Translation>
                        { t => <>{t('currencies_header')}</> }
                    </Translation>
                </div>

                <div className="currencies-wrapper">
                    {isListEmpty &&
                        <div>
                            <Translation>
                                { t => <>{t('currencies_unavailable')}</> }
                            </Translation>
                        </div>
                    }
                    {!isListEmpty && this.props.currencyList.currencies.map((currency, i) => (
                        <div className="currencies-card"
                             key={i}>
                            <div className="currencies-card__id">
                                <Translation>
                                    { t => <>{t('currencies_id')}</> }
                                </Translation>
                                : {currency.id}
                            </div>
                            <div className="currencies-card__name">
                                <Translation>
                                    { t => <>{t('currencies_name')}</> }
                                </Translation>
                                : {currency.currency}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies)