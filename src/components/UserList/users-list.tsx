'use client';
import {useState} from "react";
import User from "@/components/User/user" ;
import styles from "./users-list.module.css"


export default function UserList(){
    const [users, setUsers] = useState([]);

    async function fetchUsers(){
        const path="/user/find-all"
        await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
            method: "GET",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(res => res.json()).then(res=>setUsers(res))
    }

    fetchUsers();

    return (
        <div className={styles.users__list__container}>
            {
                users.map((user, index) => (
                    <User key={index} user={user}></User>
                ))
            }
        </div>
    )
}
