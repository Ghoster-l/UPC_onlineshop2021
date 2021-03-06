import React from "react";
import IndexView from '../view/index';
import LoginView from "../view/login";
import ListView from "../view/list";
import UndefinedView from '../view/404';
import RegisterView from "../view/register";
import DashboardView from "../view/dashboard";
import GoodspageView from "../view/goodspage";
let routes=[{
    path:"/",
    exact: true,
    render(props){
        return <IndexView {...props}/>
    }   
},{
    path:"/login",
    exact: true,
    render(props){
        return <LoginView {...props}/>
    }   
},
    {
        path:"/register",
        exact: true,
        render(props){
            return <RegisterView {...props}/>
        }
    },
    {
        path:"/dashboard",
        exact: true,
        render(props){
            return <DashboardView {...props}/>
        }
    },
    {
        path:"/goodspage",
        exact: true,
        render(props){
            return <GoodspageView {...props}/>
        }
    },
    {
    path:["/list","/list/:page"],
    exact: true,
    render(props){
        let {page=1} = props.match.params;
        // 解构页码，如果没有传递页面设置默认值为 1。
        if(page >= 1){
            // 判断页面是否为 > 1 的数字，如 /list/a 等不是数字的情况下，则显示 404 视图
            return <ListView {...props}/>;
        }
        return <UndefinedView {...props}/>
    }   
},{
    path:"",
    exact: false,
    render(props){
        return <UndefinedView {...props}/>
    }   
}];
let navs = [
    {
        to:"/",
        exact: true,
        title:"首页"  
    },{
        to:"/login",
        exact: true,
        title: "登陆"
    },{
        to:"/list",
        title: "课程列表",
        isActive(url){
            let urlData = url.split("/"); 
            if(url === "/list"
            ||(urlData.length===3&&urlData[1] === "list"&&urlData[2]>0) ){
                // 判断 URL 为 "/list" 或 "/list/大于1的数字" 时，选中当前项，否则不选中 
                return true;
            }   
            return false;
        }   
    }
];
export {routes,navs};