'use client';
import UserList from "@/components/UserList/users-list";
import styles from "./page.module.css";
import {useState} from "react";
import CreateUserPage from "@/components/CreateUserPage/createuser";
import DeleteUserPage from "@/components/DeleteUserPage/delete-user-page";
import UpdateUserPage from "@/components/UpdateUserPage/update-user-page";

const UserPage = ()=>{
    const [showOptions, setShowOptions] = useState("flex");
    const [showUsers, setShowUsers] = useState(false);
    const [createUser, setCreateUser] = useState(false);
    const [deleteUser, setDeleteUser] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);

    function handleShowUsers() {
        setShowOptions("none")
        setShowUsers(true);
    }

    function handleCreateUser(){
        setShowOptions("none");
        setCreateUser(true);
    }

    function handleDeleteUser(){
        setShowOptions("none")
        setDeleteUser(true);
    }

    function handleUpdateUser(){
        setShowOptions("none");
        setUpdateUser(true);
    }

    function handleBack(page: string){
        setShowOptions("flex")
        if(page === "users")
            setShowUsers(false);
        else if(page === "create")
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
            <main className={styles.page__container} style={{display:showOptions}}>
                    <div className={styles.options__container}>
                        <div className={styles.options__text}>
                            <h1> Options </h1>
                        </div>
                        <div className={styles.buttons__container}>
                            <button className={styles.userAction__button} onClick={handleCreateUser}>Create User
                            </button>
                            <button className={styles.userAction__button} onClick={handleDeleteUser}>Delete User
                            </button>
                            <button className={styles.userAction__button} onClick={handleUpdateUser}>Update User
                            </button>
                            <button className={styles.userAction__button} onClick={handleShowUsers}>Show All Users
                            </button>
                            <div/>
                        </div>
                    </div>
            </main>
            {showUsers ? (
                <>
                    <button className={styles.back__arrow} onClick={()=>{
                        handleBack("users")
                    }}>&larr;</button>
                    <UserList/>
                </>): null
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
            {deleteUser ? (
                <>
                    <button className={styles.back__arrow} onClick={() => {
                        handleBack("delete")
                    }}>&larr;</button>
                    <DeleteUserPage></DeleteUserPage>
                </>
            ) : null
            }
            {updateUser ? (
                <>
                    <button className={styles.back__arrow} onClick={() => {
                        handleBack("update")
                    }}>&larr;</button>
                    <UpdateUserPage></UpdateUserPage>
                </>
            ) : null
            }
        </>
    )
}

export default UserPage;