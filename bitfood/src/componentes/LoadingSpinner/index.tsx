import React, { useEffect, useState } from "react"
import styles from "./LoadingSpinner.module.scss"
import loader from "../../http/loader"
import { LoadingSpinnerProps } from "./model"
import { useLoadingSpinner } from "./useLoadingSpinner"

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({id = "", loading = false, message = "" }) => {

    const { status } = useLoadingSpinner()
    
    useEffect(() => {
        console.log("Status: ", status())
    }, [status()])

    
    if (id !== "") {
        return (<div id={id} className={styles.SpinnerContainer}>
            <div className={styles.Spinner}></div>
            <p className={styles.Spinner + "--Text"}>
                {message}
            </p>
        </div>)
    } else {
        return (<div className={`${styles.SpinnerContainer} ${status() ? styles.Show : styles.Hide}`}>
            <div className={styles.Spinner}></div>
            <p className={styles.Spinner + "--Text"}>
                {message}
            </p>
        </div>)           
    }    
}

export default LoadingSpinner