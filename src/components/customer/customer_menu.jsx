import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Translation } from 'react-i18next';

import { logout } from "../../js/actions/logout"


function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    };
}

const mapStateToProps = (state) => {
    return {};
};

class CustomerMenu extends React.Component {
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
                            { t => <>{t('customer_label')}</> }
                        </Translation>
                    </div>
                </div>
                <Link to="/customer/products">
                    <div className="left-menu__button">
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_product_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <Link to="/customer/shopping-cart">
                    <div className="left-menu__button">
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_sh_cart_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <Link to="/customer/shopping-list">
                    <div className="left-menu__button">
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_sh_list_label')}</> }
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
            </div>
        );
    }
}

CustomerMenu.propTypes = {
    logout: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CustomerMenu));