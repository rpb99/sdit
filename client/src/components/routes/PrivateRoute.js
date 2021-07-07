import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Layout from "../global/Layout";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
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