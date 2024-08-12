import styles from "./createuser.module.css"
import {useEffect, useState} from "react";

const CreateUserPage = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [userCreated, setUserCreated] = useState(false);

    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    function handleCreate() {
        const path = "/user"
        fetch(process.env.NEXT_PUBLIC_API_URL + path, {
            method: "POST",
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
            }),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => res.json());
        // @ts-ignore
        document.querySelector(`input`).value="";
        setUserCreated(true);
    }

    useEffect(()=>{
        setTimeout(()=>{
            setUserCreated(false);
        },3000)
    },[userCreated])

    return (
        <div className={styles.container}>
            <h1 className={styles.login__text}>Create User</h1>
            <div className={styles.underline}></div>
            <div className={styles.container__buttons}>
                <div className={styles.container__inputs}>
                    <input id={"email_input"} className={styles.input} type="email" name="email" onChange={handleChange}
                           placeholder="email"></input>
                    <input id={"password_input"} className={styles.input} type="password" name="password" onChange={handleChange}
                           placeholder="password"></input>
                </div>
            </div>
            <div className={styles.container__buttons}>
                <button className={styles.button__login} onClick={handleCreate}>Create</button>
            </div>
            {userCreated &&
                <p className={styles.user_created__message}>User created successfully</p>
            }
        </div>
    );
}

export default CreateUserPage;