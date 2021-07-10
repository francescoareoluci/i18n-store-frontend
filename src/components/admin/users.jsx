import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { getUsers } from "../../js/actions/getUsers"


function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers())
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
                    Users
                </div>
                <div className="users-wrapper">
                    {isListEmpty &&
                        <div>
                            No users found
                        </div>
                    }
                    {!isListEmpty && this.props.userList.users.map((user) => (
                        <div className="users-card">
                            <div className="users-card__id">
                                User ID: {user.id}
                            </div>
                            <div className="users-card__firstName">
                                First Name: {user.firstName}
                            </div>
                            <div className="users-card__lastName">
                                Last Name: {user.lastName}
                            </div>
                            <div className="users-card__mail">
                                User mail: {user.mail}
                            </div>
                            <div className="users-card__role">
                                User role: {user.role}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)