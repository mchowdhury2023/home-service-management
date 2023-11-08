import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    console.log(location)

    if(loading) {
        return <progress className="progress w-56"></progress>
    }

    if(user){
        return children;
    }

    return (
        <Navigate state={location.pathname} to="/login"></Navigate>

    )
};
    

export default PrivateRoute;