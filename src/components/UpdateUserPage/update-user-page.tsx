import {useEffect, useState} from "react";
import styles from "../CreateUserPage/createuser.module.css";


const UpdateUserPage = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
        id:"",
    })

    const [userUpdated, setUserUpdated] = useState(false);

    const handleChange = (e: any) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    function handleUpdate() {
        const path = "/user/"
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
                document.querySelector(`input`).value="";
                if(res.status===400 || res.status===401){
                    console.log("Error");
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

    return (
        <div className={styles.container}>
            <h1 className={styles.login__text}>Update User</h1>
            <div className={styles.underline}></div>
            <div className={styles.container__buttons}>
                <div className={styles.container__inputs}>
                    <input id={"id_input"} className={styles.input} type="text" name="id" onChange={handleChange}
                           placeholder="User Id"></input>
                    <input id={"email_input"} className={styles.input} type="email" name="email" onChange={handleChange}
                           placeholder="email"></input>
                    <input id={"password_input"} className={styles.input} type="password" name="password" onChange={handleChange}
                           placeholder="password"></input>
                </div>
            </div>
            <div className={styles.container__buttons}>
                <button className={styles.button__login} onClick={handleUpdate}>Update</button>
            </div>
            {userUpdated &&
                <p className={styles.user_created__message}>User updated successfully</p>
            }
        </div>
    );
}

export default UpdateUserPage