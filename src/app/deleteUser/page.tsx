'use client';
import styles from "@/components/CreateUserPage/createuser.module.css";
import {useEffect, useRef, useState} from "react";


const Page = ()=>{
    const [userId, setUserId] = useState()
    const [userDeleted, setUserDeleted] = useState(false);
    const [error, setError] = useState(false)
    const input_id  = useRef(null);

    const handleChange = (e: any) => {
        setUserId(e.target.value)
    }

    function handleDeleteUser() {
        const path="/user/";
        // @ts-ignore
        fetch(process.env.NEXT_PUBLIC_API_URL+path+localStorage.getItem("userId"), {
            method: "DELETE",
            headers:{
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            }
        }).then(res => res.json()).then((res)=>{
            document.querySelectorAll(`input`).forEach(e=>{
                e.value="";
            })
            if(res.statusCode===400 || res.statusCode===401){
                setError(true);
            }
            else{
                setUserDeleted(true);
            }
        })
    }

    useEffect(()=>{
        setTimeout(()=>{
            setUserDeleted(false);
        },3000)
    },[userDeleted])

    useEffect(()=>{
        setTimeout(()=>{
            setError(false);
        },3000)
    },[error])

    useEffect(() => {//@ts-ignore
        input_id.current.value = localStorage.getItem("userId");
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.login__text}>Delete User</h1>
            <div className={styles.underline}></div>
            <div className={styles.container__buttons}>
                <div className={styles.container__inputs}>
                    <input id={"id_input"} className={styles.input} type="text" name="id" onChange={handleChange}
                           placeholder="user id" ref={input_id} disabled={true}></input>
                </div>
            </div>
            <div className={styles.container__buttons}>
                <button className={styles.button__login} onClick={handleDeleteUser}>Delete</button>
            </div>
            {userDeleted &&
                <p className={styles.user_created__message}>User deleted successfully</p>
            }
            {error &&
                <p className={styles.user_created__message}>User couldn't deleted</p>
            }
        </div>
    );
}

export default Page;

