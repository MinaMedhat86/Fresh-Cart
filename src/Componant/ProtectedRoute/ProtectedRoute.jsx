import React from 'react'
import { Navigate } from 'react-router-dom';

export function ProtectedRoute(props) {

    if(localStorage.getItem("userTaken") !== null){
        console.log("okay");   
        return props.children;
            
    }else{
        console.log("NOT okay");  
        return <Navigate to="/login"/>
    }


}
