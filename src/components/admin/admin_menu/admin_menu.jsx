import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Translation } from 'react-i18next';

import { logout } from "../../../js/actions/logout"


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
                        <Translation>
                            { t => <>{t('admin_label')}</> }
                        </Translation>
                    </div>
                </div>
                <nav>
                <ul>
                <Link to="/admin/products">
                    <div className="left-menu__button">
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_product_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <Link to="/admin/users">
                    <div className="left-menu__button">
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_users_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <Link to="/admin/manufacturers">
                    <div className="left-menu__button">
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_manufacturers_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <Link to="/admin/locales">
                    <div className="left-menu__button">
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_locales_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <Link to="/admin/currencies">
                    <div className="left-menu__button">
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_currencies_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
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