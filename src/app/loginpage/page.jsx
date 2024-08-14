'use client';
import {useEffect, useRef, useState} from "react";
import {setAuthenticationHeader} from "../utils/authenticate";
import styles from "./page.module.css";
import {useRouter} from "next/navigation";
import validateEmail from "../../validation/validation";

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({})
    const [loggedIn, setLoggedIn] = useState(false);
    const [invalid, setInvalid] = useState(false);
    const [error,setError] = useState();
    const input_email = useRef(null);
    const input_password = useRef(null);
    const router = useRouter();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    async function handleLogin() {
        let token;
        let errors=validateEmail(credentials.email);
        if (input_email != null) { // @ts-ignore
            input_email.current.value = null;
        }
        if (input_password != null) { // @ts-ignore
            input_password.current.value = null;
        }
        if(errors){
            setError(errors);
            return;
        }
        await fetch("http://localhost:3001/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json()).then((res) => {
            if (res.success === true) {
                token = res.access_token;
                localStorage.setItem("token", token);
                setAuthenticationHeader(token);
                localStorage.setItem("email", credentials.email);
                setTimeout(() => {
                    setLoggedIn(true);
                }, 0);
            }
            else{
                setInvalid(true);
            }
        })
    }

    useEffect(() => {
        setTimeout(() => {
            setInvalid(false);
        }, 3000)
    }, [invalid])

    function handleRole() {
        fetch("http://localhost:3001/user/by-email/" + credentials.email, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,
            }
        }).then(res => res.json()).then((res) => {
            localStorage.setItem("role", res.role);
        })
    }


    useEffect(() => {
        if (loggedIn) {
            router.push("/mainpage");
        }
    })

    useEffect(()=>{
        setTimeout(()=>{
            setError( undefined);
        },3000)
    },[error])

    return (
        <div className={styles.container}>
            <h1 className={styles.login__text}>Login</h1>
            <div className={styles.underline}></div>
            <div className={styles.container__buttons}>
                <div className={styles.container__inputs}>
                    <input className={styles.input} type="email" name="email" onChange={handleChange}
                           placeholder="email" ref={input_email}></input>
                    { error &&
                        <span>Invalid email</span>
                    }
                    <input className={styles.input} type="password" name="password" onChange={handleChange}
                           placeholder="password" ref={input_password}></input>
                </div>
            </div>
            <div className={styles.container__buttons}>
                <button className={styles.button__login} onClick={() => {
                    handleLogin().then(() => {
                        handleRole()
                    });
                }}>Login
                </button>
            </div>
            {invalid &&
                <p className={styles.unauthorized__text}>Unauthorized</p>
            }
        </div>
    );
}


export default LoginPage;