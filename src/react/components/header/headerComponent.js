import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import global from "../../common/global";
import routes from "../../routes";

class HeaderComponent extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const showHeader = global.withoutHeaderComponent.indexOf(this.props.location.pathname) !== -1 ? false : true;
        const isRouteDefine = routes.some(data => {
            return data.path === this.props.location.pathname;
        });
        if (showHeader && isRouteDefine) {
            return (
                <div className="home">
                    <h1> Header</h1>
                </div >
            )
        } else {
            return null;
        }
    }
}

export default withRouter(HeaderComponent);
