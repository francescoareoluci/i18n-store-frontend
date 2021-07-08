import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import { login } from "../../js/actions/login"


function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
}

const mapStateToProps = (state) => {
    return {};
};

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    setUsername(username) {
        this.setState({
            username: username
        });
    }

    setPassword(password) {
        this.setState({
            password: password
        });
    }

    handleLogin() {
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <div className="login-page">
                <div className="login-card">
                    <div className="login-title">
                        I18N Store
                    </div>
                    <form className="login-form" onSubmit={this.handleLogin}>
                        <div className="login-param">
                            <p>Username</p>
                            <input className="login-param-input" type="text" onChange={e => this.setUsername(e.target.value)}/>
                         </div>
                        <div className="login-param">
                            <p>Password</p>
                            <input className="login-param-input" type="password" onChange={e => this.setPassword(e.target.value)}/>
                        </div>
                        <div className="login-button-wrapper">
                            <button className="login-button" type="submit">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: PropTypes.func
}
    
export default connect(mapStateToProps, mapDispatchToProps)(Login)