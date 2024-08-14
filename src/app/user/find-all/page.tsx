'use client';
import UserList from "@/components/UserList/users-list";
import styles from "./page.module.css";
import {useState} from "react";
import CreateUserPage from "@/components/CreateUserPage/createuser";


const UserPage = ()=>{
    const [showUsers, setShowUsers] = useState(true);
    const [createUser, setCreateUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);

    function handleCreateUser(){
        setShowUsers(false);
        setCreateUser(true);
    }

    function handleUpdateUser(){
        setShowUsers(false);
        setUpdateUser(true);
    }

    function handleBack(page: string){
        setShowUsers(true);
        if(page === "create")
            setCreateUser(false);
        else if(page === "delete"){
            setDeleteUser(false)
        }
        else if(page === "update"){
            setUpdateUser(false)
        }
    }

    return(
        <>
            {showUsers ? (
                <>
                    <button className={styles.create__btn} onClick={handleCreateUser}>Create user</button>
                    <UserList/>
                </>) : null
            }
            {createUser ? (
                <>
                    <button className={styles.back__arrow} onClick={() => {
                        handleBack("create")
                    }}>&larr;</button>
                    <CreateUserPage></CreateUserPage>
                </>
            ) : null
            }
        </>
    )
}

export default UserPage;