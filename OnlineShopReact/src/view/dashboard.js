import React from "react";
import Dashboard from "../page/dashboard/dashboard";
import Login from "../page/login/Login";
export default function DashboardView(){
    if(localStorage.getItem('username')!=null)
        return <Dashboard/>
    else
        return <Login/>

}