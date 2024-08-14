import styles from "./createuser.module.css"
import {useEffect, useRef, useState} from "react";
import validateEmail from "@/validation/validation";

const CreateUserPage = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [userCreated, setUserCreated] = useState(false);
    const [error, setError] = useState(false)
    const inputEmail = useRef(null);
    const inputPassword = useRef(null);
    const [errors, setErrors] = useState()

    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleCreate = ()=>{
        const path = "/user"
        let errorsVar=validateEmail(credentials.email);
        if(inputEmail!=null)
        { // @ts-ignore
            inputEmail.current.value = null;
        }
        if(inputPassword!=null)
        { // @ts-ignore
            inputPassword.current.value = null;
        }
        if(errorsVar){
            // @ts-ignore
            setErrors(errorsVar);
            return;
        }
        fetch(process.env.NEXT_PUBLIC_API_URL + path, {
            method: "POST",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then(res=>{
            if(res.statusCode==400 || res.statusCode==401){
                setError(true);
            }
            else{
                setUserCreated(true);
            }
        });
    }

    useEffect(()=>{
        setTimeout(()=>{
            setUserCreated(false);
        },3000)
    },[userCreated])

    useEffect(()=>{
        setTimeout(()=>{
            setError(false);
        },3000)
    },[error])

    useEffect(()=>{
        setTimeout(()=>{
            setErrors( undefined);
        },3000)
    },[errors])

    return (
        <div className={styles.container}>
            <h1 className={styles.login__text}>Create User</h1>
            <div className={styles.underline}></div>
            <div className={styles.container__buttons}>
                <div className={styles.container__inputs}>
                    <input className={styles.input} type="email" name="email" onChange={handleChange}
                           placeholder={"Email"} ref={inputEmail}/>
                    {errors &&
                        <span>Invalid Email</span>
                    }
                    <input className={styles.input} type="password" name="password" onChange={handleChange}
                           placeholder="password" ref={inputPassword}/>
                </div>
            </div>
            <div className={styles.container__buttons}>
                <button className={styles.button__login} onClick={handleCreate}>Create</button>
            </div>
            {userCreated &&
                <p className={styles.user_created__message}>User created successfully</p>
            }
            {error &&
                <p className={styles.user_created__message}>User couldn't be created</p>
            }
        </div>
    );
}

export default CreateUserPage;