import React, { useEffect, useState } from "react"
import axios from "axios"

 import "../assets/styles/main.css"

export const Dashboard = () => {

    const [backendTest, setBackendTest] = useState("");

    useEffect(() => {
        axios.get('/api', { })
            .then(res => {
                setBackendTest(res.data)
        })

    }, []);

    return (
        <>
        <div>
            {backendTest}
        </div>
        </>
    )
}