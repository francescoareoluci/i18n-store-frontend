import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Translation } from 'react-i18next';

import { getUsers } from "../../js/actions/getUsers"


function mapDispatchToProps(dispatch) {
    return {
        getUsers: (token) => dispatch(getUsers(token))
    };
}

const mapStateToProps = (state) => {
    return {
        userList: state.userList,
        token: state.token
    };
};

class Users extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsers(this.props.token);
    }

    render() {
        let isListEmpty = true;
        if (Object.keys(this.props.userList).length != 0 &&
                this.props.userList.length != 0) {
                    isListEmpty = false;
        }

        return (
            <div className="users-container">
                <div className="users__title">
                    <Translation>
                        { t => <>{t('users_header')}</> }
                    </Translation>
                </div>
                <div className="users-wrapper">
                    {isListEmpty &&
                        <div>
                            <Translation>
                                { t => <>{t('users_unavailable')}</> }
                            </Translation>
                        </div>
                    }
                    {!isListEmpty && this.props.userList.users.map((user) => (
                        <div className="users-card">
                            <div className="users-card__id">
                                <Translation>
                                    { t => <>{t('users_id')}</> }
                                </Translation>
                                : {user.id}
                            </div>
                            <div className="users-card__firstName">
                                <Translation>
                                    { t => <>{t('users_first_name')}</> }
                                </Translation>
                                : {user.firstName}
                            </div>
                            <div className="users-card__lastName">
                                <Translation>
                                    { t => <>{t('users_last_name')}</> }
                                </Translation>
                                : {user.lastName}
                            </div>
                            <div className="users-card__mail">
                                <Translation>
                                    { t => <>{t('users_mail')}</> }
                                </Translation>
                                : {user.mail}
                            </div>
                            <div className="users-card__role">
                                <Translation>
                                    { t => <>{t('users_role')}</> }
                                </Translation>
                                : {user.role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)