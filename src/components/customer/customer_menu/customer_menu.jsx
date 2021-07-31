import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Translation } from 'react-i18next';

import { changeSelectedMenuBtn } from "../../../js/actions/changeSelectedMenuBtn";
import { logout } from "../../../js/actions/logout"


function mapDispatchToProps(dispatch) {
    return {
        changeSelectedMenuBtn: (idx) => dispatch(changeSelectedMenuBtn(idx)),
        logout: () => dispatch(logout())
    };
}

const mapStateToProps = (state) => {
    return {
        selectedMenuBtn: state.ui.selectedMenuBtn
    };
};

class CustomerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clickedBtn: 1
        }

        this.handleLogout = this.handleLogout.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Allow to change menu selected button on router redirect
        const locationChanged = this.props.location !== prevProps.location;
        if (locationChanged && this.props.location.pathname == "/customer/products") {
            this.props.changeSelectedMenuBtn(1);
        }
    }

    handleLogout() {
        this.props.logout();
        this.props.history.push("/");
    }

    handleButtonClick(e, idx) {
        this.props.changeSelectedMenuBtn(idx);
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
                <Link to="/customer/products"
                      onClick={(e) => {this.handleButtonClick(e, 1)}}>
                    <div className={"left-menu__button" + (this.props.selectedMenuBtn == 1 ? "-focused" : "")}>
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_product_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <Link to="/customer/shopping-cart"
                      onClick={(e) => {this.handleButtonClick(e, 2)}}>
                    <div className={"left-menu__button" + (this.props.selectedMenuBtn == 2 ? "-focused" : "")}>
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_sh_cart_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <Link to="/customer/shopping-list"
                      onClick={(e) => {this.handleButtonClick(e, 3)}}>
                    <div className={"left-menu__button" + (this.props.selectedMenuBtn == 3 ? "-focused" : "")}>
                        <div className="left-menu__button__text">
                            <Translation>
                                { t => <>{t('menu_sh_list_label')}</> }
                            </Translation>
                        </div>
                    </div>
                </Link>
                <div className="left-menu__spacer"></div>
                <div className="left-menu__button-logout"
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