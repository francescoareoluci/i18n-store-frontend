import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import { getManufacturers } from "../../js/actions/getManufacturers"; 


function mapDispatchToProps(dispatch) {
    return {
        getManufacturers: (token) => dispatch(getManufacturers(token))
    };
}

const mapStateToProps = (state) => {
    return {
        manufacturerList: state.getters.admin.manufacturerList,
        token: state.auth.token
    };
};

class Manufacturers extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getManufacturers(this.props.token);
    }

    render() {
        let isListEmpty = true;
        if (Object.keys(this.props.manufacturerList).length != 0 &&
                this.props.manufacturerList.length != 0) {
                    isListEmpty = false;
        }

        return (
            <div className="manufacturers-container">
                <div className="manufacturers__title">
                    <Translation>
                        { t => <>{t('manufacturers_header')}</> }
                    </Translation>
                </div>
                <div className="manufacturers-wrapper">
                    {isListEmpty &&
                        <div>
                            <Translation>
                                { t => <>{t('manufacturers_unavailable')}</> }
                            </Translation>
                        </div>
                    }
                    {!isListEmpty && this.props.manufacturerList.manufacturers.map((manufacturer, i) => (
                        <div className="manufacturers-card"
                             key={i}>
                            <div className="manufacturers-card__id">
                                <Translation>
                                    { t => <>{t('manufacturers_id')}</> }
                                </Translation>
                                : {manufacturer.id}
                            </div>
                            <div className="manufacturers-card__name">
                                <Translation>
                                    { t => <>{t('manufacturers_name')}</> }
                                </Translation>
                                : {manufacturer.manufacturer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

Manufacturers.propTypes = {
    getManufacturers: PropTypes.func,
    manufacturerList: PropTypes.object,
    token: PropTypes.string
}

export default connect(mapStateToProps, mapDispatchToProps)(Manufacturers)