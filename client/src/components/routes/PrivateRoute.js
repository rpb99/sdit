import { useEffect } from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom';
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../global/Layout";
import { logoutUser } from "../../api/authApi";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

    return (
        <Route {...rest} render={props => {
            if (!user) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            // check if route is restricted by role
            if (!roles.includes(user.role)) {
                // role not authorised so redirect to 404 page
                return <Redirect to={{ pathname: '/not-found' }} />
            }

            // authorised so return component
            return <Layout>
                <Component {...props} />
            </Layout>
        }} />
    )
}

export default PrivateRoute