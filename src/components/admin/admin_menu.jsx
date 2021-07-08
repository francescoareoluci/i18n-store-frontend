import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import { withRouter } from "react-router-dom";

import { logout } from "../../js/actions/logout"


function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    };
}

const mapStateToProps = (state) => {
    return {};
};

class AdminMenu extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="left-menu">
                <div className="left-menu__title">
                    <div className="left-menu__title__text">
                        Administration
                    </div>
                </div>
                <nav>
                <ul>
                <div className="left-menu__button">
                    <Link to="/admin/products">
                    <div className="left-menu__button__text">
                        Products
                    </div>
                    </Link>
                </div>
                <div className="left-menu__button">
                    <div className="left-menu__button__text">
                        Users
                    </div>
                </div>
                <div className="left-menu__button">
                    <div className="left-menu__button__text">
                        Manufacturers
                    </div>
                </div>
                <div className="left-menu__button">
                    <div className="left-menu__button__text">
                        Locales
                    </div>
                </div>
                <div className="left-menu__button">
                    <div className="left-menu__button__text">
                        Currencies
                    </div>
                </div>
                <div className="left-menu__spacer"></div>
                <div className="left-menu__button"
                     onClick={() => {this.handleLogout()}}>
                    <div className="left-menu__button__text">
                        Log out
                    </div>
                </div>
                </ul>
                </nav>
            </div>
        );
    }
}

AdminMenu.propTypes = {
    logout: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminMenu));