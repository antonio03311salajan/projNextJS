'use client';
import styles from "./sidebar.module.css"
import Link from "next/link";

interface Props {
    email: string,
}

const SideBar = (props: Props) => {
    return (
        <main>
            <div className={styles.sidebar__container}>
                <div className={styles.userinfo__container}>
                    <p>
                        {
                            props.email
                        }
                    </p>
                </div>
                <div className={styles.buttons__container}>
                    <input type="checkbox" className={styles.buttons__container__checkbox} id="toggle"/>
                    <label htmlFor="toggle" className={styles.buttons__container__nav__button}>
                        <span className={styles.buttons__container__icon}>
                            &nbsp;
                        </span>
                    </label>
                    <div className={styles.buttons__container__nav__background}>&nbsp;</div>

                    <nav className={styles.buttons__container__nav}>
                        <ul className={styles.buttons__container__nav__list}>
                            {localStorage.getItem("role") === "admin" &&
                                <li className={styles.button__container__listitem}>
                                    <button className={styles.button__dashboard  +" "+ styles.buttons__container__list__item}>
                                        <Link className={styles.button__dashboard__text} href={"/user/find-all"}>Dashboard</Link>
                                    </button>
                                </li>
                            }
                            <li className={styles.button__container__listitem}>
                                <button className={styles.button__dashboard +" "+ styles.buttons__container__list__item}>
                                <Link className={styles.button__dashboard__text} href={"/"}>Account</Link>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
        </div>
    </main>
)
}

export default SideBar;