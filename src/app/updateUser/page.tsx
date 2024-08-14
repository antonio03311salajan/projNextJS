'use client';
import {useEffect, useRef, useState} from "react";
import styles from "../../components/CreateUserPage/createuser.module.css";
import validateEmail from "@/validation/validation";


const Page = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        id:"",
    })

    const input_email = useRef(null);
    const input_password = useRef(null);
    const input_id = useRef(null);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        //@ts-ignore
        input_id.current.value = localStorage.getItem("userId");
    }, []);

    const [userUpdated, setUserUpdated] = useState(false);
    const [error, setError] = useState(false)

    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    function handleUpdate() {
        const path = "/user/"
        let errorsVar=validateEmail(credentials.email);
        if(input_email!=null)
        { // @ts-ignore
            input_email.current.value = null;
        }
        if(input_password!=null)
        { // @ts-ignore
            input_password.current.value = null;
        }
        if(input_password!=null)
        { // @ts-ignore
            input_id.current.value = localStorage.getItem('userId');
        }
        if(errorsVar){
            // @ts-ignore
            setErrors(errorsVar);
            return;
        }
        fetch(process.env.NEXT_PUBLIC_API_URL + path + credentials.id, {
            method: "PUT",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(
            res =>{
                //@ts-ignore
                if(res.statusCode===400 || res.statusCode===401){
                    setError(true);
                }
                else{
                    setUserUpdated(true);
                }
            }
        );
    }

    useEffect(()=>{
        setTimeout(()=>{
            setUserUpdated(false);
        },3000)
    },[userUpdated])

    useEffect(()=>{
        setTimeout(()=>{
            setError(false);
        },3000)
    },[error])

    useEffect(()=>{
        setTimeout(()=>{
            setErrors( null);
        },3000)
    },[errors])

    return (
        <div className={styles.container}>
            <h1 className={styles.login__text}>Update User</h1>
            <div className={styles.underline}></div>
            <div className={styles.container__buttons}>
                <div className={styles.container__inputs}>
                    <input id={"id_input"} className={styles.input} type="text" name="id" onChange={handleChange}
                           placeholder="User Id" ref={input_id} disabled={true}></input>
                    <input id={"email_input"} className={styles.input} type="email" name="email" onChange={handleChange}
                           placeholder="email" ref={input_email}></input>
                    {errors &&
                        <span>Invalid Email</span>
                    }
                    <input id={"password_input"} className={styles.input} type="password" name="password" onChange={handleChange}
                           placeholder="password" ref={input_password}></input>
                </div>
            </div>
            <div className={styles.container__buttons}>
                <button className={styles.button__login} onClick={handleUpdate}>Update</button>
            </div>
            {userUpdated &&
                <p className={styles.user_created__message}>User updated successfully</p>
            }
            {error &&
                <p className={styles.user_created__message}>User couldn't be updated</p>
            }
        </div>
    );
}

export default Page