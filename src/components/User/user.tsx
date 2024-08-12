'use client';
import styles from "./user.module.css";
import userPhoto from "./user-profile-4255.png"
import Image from "next/image";


interface UserProps {
    user: {
        id: number;
        email: string;
        role: string;
    }
}



const User: React.FC<UserProps> = ({ user }) => {
    return (
        <div className={styles.user}>
            <div className={styles.userphoto__container}>
                <Image className={styles.user__photo} src={userPhoto} alt="User photo"/>
            </div>
            <div className={styles.userinfo__container}>
                <p>{user.id}</p>
                <p>{user.email}</p>
                <p>{user.role}</p>
            </div>
        </div>
    );
}

export default User;
