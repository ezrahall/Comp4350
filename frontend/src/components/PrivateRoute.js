import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../context/user'

const PrivateRoute = ({ children, ...rest }) => {
    const { isAuth } = useContext(UserContext)
    return (
      <Route
        {...rest}
        render={({ location }) =>
          !isAuth ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  export default PrivateRoute