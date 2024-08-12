'use client';
import SideBar from "../../components/SideBar/sidebar"
import {useEffect} from "react";

const MainPage= () =>{
    return(
            // @ts-ignore
            <SideBar email={localStorage.getItem("email")} />
    );
}

export default MainPage;