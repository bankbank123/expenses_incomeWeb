import '../css/Login.css'
import axios from 'axios'
import { useRef } from 'react'
import { useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {

    const location = useLocation()


    addEventListener("unload", function () {
        localStorage.setItem('FromPath', location.pathname)
    })

    const username = useRef()
    const password = useRef()

    const ShowPassword = () => {
        const password_input = document.getElementById('password_input')
        const open_eye = document.getElementById('open_eye')
        const close_eye = document.getElementById('close_eye')
        open_eye.style.display = "flex"
        close_eye.style.display = "none"
        password_input.type = 'text'

    }

    const HidePassword = () => {
        const password_input = document.getElementById('password_input')
        const open_eye = document.getElementById('open_eye')
        const close_eye = document.getElementById('close_eye')
        open_eye.style.display = "none"
        close_eye.style.display = "flex"
        password_input.type = 'password'
    }

    const onClickLogin = () => {
        const payload = {
            'username': username.current.value,
            'password': password.current.value
        }

        axios.post("http://127.0.0.1:8000/api/user/login/", payload).then((response) => {
            localStorage.setItem('token', response.data)
        })
    }


    return (
        <div className='login-container'>
            <div className="form-login-container">
                <div className="login-header">
                    Welcome back to website <br />
                    Login into account
                </div>
                <div className="username-container">
                    <label htmlFor="username_input" className='login-text'>Username</label>
                    <input type="text" name="username" id="username_input" className='login-input' ref={username} />
                </div>
                <div className="password-container">
                    <label htmlFor="password_input" className='login-text'>Password</label>
                    <input type="password" name="password" id="password_input" className='login-input' ref={password} />
                    <FaEye className='open-eye login-icon' id='open_eye' onClick={HidePassword} />
                    <FaEyeSlash className='close-eye login-icon' id='close_eye' onClick={ShowPassword} />
                </div>
                <div className="btn-submit" onClick={onClickLogin}>
                    Login
                </div>
            </div>
        </div>
    )
}

