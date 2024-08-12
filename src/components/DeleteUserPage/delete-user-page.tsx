import styles from "@/components/CreateUserPage/createuser.module.css";
import {useEffect, useState} from "react";


const DeleteUserPage = ()=>{
    const [userId, setUserId] = useState()
    const [userDeleted, setUserDeleted] = useState(false);

    const handleChange = (e: any) => {
        setUserId(e.target.value)
    }

    function handleDeleteUser() {
        const path="/user/";
        // @ts-ignore
        fetch(process.env.NEXT_PUBLIC_API_URL+path+userId, {
            method: "DELETE",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(res => res.json()).then(res=> console.log(res))
        setUserDeleted(true);
    }

    useEffect(()=>{
        setTimeout(()=>{
            setUserDeleted(false);
        },3000)
    },[userDeleted])

    return (
        <div className={styles.container}>
            <h1 className={styles.login__text}>Delete User</h1>
            <div className={styles.underline}></div>
            <div className={styles.container__buttons}>
                <div className={styles.container__inputs}>
                    <input id={"id_input"} className={styles.input} type="text" name="id" onChange={handleChange}
                           placeholder="user id"></input>
                </div>
            </div>
            <div className={styles.container__buttons}>
                <button className={styles.button__login} onClick={handleDeleteUser}>Delete</button>
            </div>
            {userDeleted &&
                <p className={styles.user_created__message}>User deleted successfully</p>
            }
        </div>
    );
}

export default DeleteUserPage;

