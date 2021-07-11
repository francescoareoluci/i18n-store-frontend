import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

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
                    Locales
                </div>
                <div className="locales-wrapper">
                    {isListEmpty &&
                        <div>
                            No locales found
                        </div>
                    }
                    {!isListEmpty && this.props.localeList.locales.map((locale) => (
                        <div className="locales-card">
                            <div className="locales-card__id">
                                Locale ID: {locale.id}
                            </div>
                            <div className="locales-card__languageCode">
                                Language code: {locale.languageCode}
                            </div>
                            <div className="locales-card__countryCode">
                                Country code: {locale.countryCode}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Locales)