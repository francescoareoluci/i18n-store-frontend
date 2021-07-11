import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { getManufacturers } from "../../js/actions/getManufacturers"; 


function mapDispatchToProps(dispatch) {
    return {
        getManufacturers: (token) => dispatch(getManufacturers(token))
    };
}

const mapStateToProps = (state) => {
    return {
        manufacturerList: state.manufacturerList,
        token: state.token
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
                    Manufacturers
                </div>
                <div className="manufacturers-wrapper">
                    {isListEmpty &&
                        <div>
                            No manufacturer found
                        </div>
                    }
                    {!isListEmpty && this.props.manufacturerList.manufacturers.map((manufacturer) => (
                        <div className="manufacturers-card">
                            <div className="manufacturers-card__id">
                                Manufacturer ID: {manufacturer.id}
                            </div>
                            <div className="manufacturers-card__name">
                                Manufacturer: {manufacturer.manufacturer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manufacturers)