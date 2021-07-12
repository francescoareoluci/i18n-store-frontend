import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import { getLocales } from "../../js/actions/getLocales";


function mapDispatchToProps(dispatch) {
    return {
        getLocales: (token) => dispatch(getLocales(token))
    };
}

const mapStateToProps = (state) => {
    return {
        localeList: state.localeList,
        token: state.token
    };
};

class Locales extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getLocales(this.props.token);
    }

    render() {
        let isListEmpty = true;
        if (Object.keys(this.props.localeList).length != 0 &&
                this.props.localeList.length != 0) {
                    isListEmpty = false;
        }

        return (
            <div className="locales-container">
                <div className="locales__title">
                    <Translation>
                        { t => <>{t('locales_header')}</> }
                    </Translation>
                </div>
                <div className="locales-wrapper">
                    {isListEmpty &&
                        <div>
                            <Translation>
                                { t => <>{t('locales_unavailable')}</> }
                            </Translation>
                        </div>
                    }
                    {!isListEmpty && this.props.localeList.locales.map((locale, i) => (
                        <div className="locales-card"
                             key={i}>
                            <div className="locales-card__id">
                                <Translation>
                                    { t => <>{t('locales_id')}</> }
                                </Translation>
                                : {locale.id}
                            </div>
                            <div className="locales-card__languageCode">
                                <Translation>
                                    { t => <>{t('locales_language_code')}</> }
                                </Translation>
                                : {locale.languageCode}
                            </div>
                            <div className="locales-card__countryCode">
                                <Translation>
                                    { t => <>{t('locales_country_code')}</> }
                                </Translation>
                                : {locale.countryCode}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locales)