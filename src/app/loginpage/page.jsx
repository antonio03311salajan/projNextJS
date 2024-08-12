'use client';
import {useEffect, useState} from "react";
import {setAuthenticationHeader} from "../utils/authenticate";
import styles from "./page.module.css";
import {useRouter} from "next/navigation";

const LoginPage = (props) => {
    const [credentials, setCredentials] = useState({})
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();
    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    async function handleLogin() {
        let token;
        let success;
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
            } else {
                res.status(401).json({})
                success = false;
            }
        });
    }

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
        return (
            <div className={styles.container}>
                <h1 className={styles.login__text}>Login</h1>
                <div className={styles.underline}></div>
                <div className={styles.container__buttons}>
                    <div className={styles.container__inputs}>
                        <input className={styles.input} type="email" name="email" onChange={handleChange}
                               placeholder="email"></input>
                        <input className={styles.input} type="password" name="password" onChange={handleChange}
                               placeholder="password"></input>
                    </div>
                </div>
                <div className={styles.container__buttons}>
                    <button className={styles.button__login} onClick={()=>{
                        handleLogin().then(() => {
                            handleRole()
                        });
                    }}>Login</button>
                </div>
            </div>
        );
    }


    export default LoginPage;