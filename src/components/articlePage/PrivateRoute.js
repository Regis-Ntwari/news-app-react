import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export const PrivateRoute = ({
    component : Component,
    isAuthenticated : isAuthenticated,
    ...rest

}) => {
    return (
        <Route 
            {...rest}
            render={(props) => {
                if(isAuthenticated){
                    return <Component/>

                } else {
                    return (
                        <Redirect to={{pathname : "/", state : {from: props.location}}} />
                    )
                }
            }}
        />
    )
}
