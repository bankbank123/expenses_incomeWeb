import { useState } from 'react'
import { useRef } from 'react'
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import '../css/Signup.css'
import { MdOutlineError } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import axios from 'axios';


export default function Signup() {

    const username = useRef()
    const password = useRef()
    const passwordConfirmed = useRef()
    const email = useRef()
    const firstname = useRef()
    const lastname = useRef()
    const [error, setError] = useState('')

    const onClickCloseAlert = () => {
        const alert_container = document.getElementById('alert_container')
        const success_icon = document.getElementById('success_icon')
        const error_icon = document.getElementById('error_icon')
        error_icon.style.display = "none"
        success_icon.style.display = "none"
        alert_container.style.display = "none"
    }

    const onClickSignUp = () => {
        const alert_container = document.getElementById('alert_container')
        const error_icon = document.getElementById('error_icon')
        const success_icon = document.getElementById('success_icon')
        const payload = {
            'username': username.current.value,
            'password': password.current.value,
            'password_confirmed': passwordConfirmed.current.value,
            'email': email.current.value,
            'firstname': firstname.current.value,
            'lastname': lastname.current.value
        }
        if (payload.username === "" || payload.password === "" || payload.passwordConfirmed === "" || payload.email === "" || payload.firstname === "" || payload.lastname === "") {
            alert_container.style.display = "flex"
            success_icon.style.display = "none"
            error_icon.style.display = "flex"
            return setError('Please Enter Your Info')
        }
        if (payload.password !== payload.password_confirmed) {
            error_icon.style.display = "flex"
            success_icon.style.display = "none"
            alert_container.style.display = "flex"
            return setError('Password not match')
        }

        axios.post('http://127.0.0.1:8000/api/user/register/', payload).then((response) => {
            alert_container.style.display = "flex"
            success_icon.style.display = "flex"
            error_icon.style.display = "none"
            localStorage.setItem('token', response.data)
            setError('SignUp Sucessfully')
        }).catch(() => {
            alert_container.style.display = "flex"
            success_icon.style.display = "none"
            error_icon.style.display = "flex"
            setError('SignUp Failed')
        })
    }

    const onClickShowPasword = () => {
        const signup_password = document.getElementById('signup_password')
        const signup_openEye_password = document.getElementById('signup_openEye_password')
        const signup_closeEye_password = document.getElementById('signup_closeEye_password')
        signup_password.type = "text"
        signup_closeEye_password.style.display = "none"
        signup_openEye_password.style.display = "block"
    }

    const onClickShowPaswordConfirmed = () => {
        const signup_passwordConfirmed = document.getElementById('signup_passwordConfirmed')
        const signup_openEye_passwordConfirmed = document.getElementById('signup_openEye_passwordConfirmed')
        const signup_closeEye_passwordConfirmed = document.getElementById('signup_closeEye_passwordConfirmed')
        signup_passwordConfirmed.type = "text"
        signup_openEye_passwordConfirmed.style.display = "block"
        signup_closeEye_passwordConfirmed.style.display = "none"
    }

    const onClickHidePaswordConfirmed = () => {
        const signup_passwordConfirmed = document.getElementById('signup_passwordConfirmed')
        const signup_openEye_passwordConfirmed = document.getElementById('signup_openEye_passwordConfirmed')
        const signup_closeEye_passwordConfirmed = document.getElementById('signup_closeEye_passwordConfirmed')
        signup_passwordConfirmed.type = "password"
        signup_openEye_passwordConfirmed.style.display = "none"
        signup_closeEye_passwordConfirmed.style.display = "block"
    }

    const onClickHidePasword = () => {
        const signup_password = document.getElementById('signup_password')
        const signup_openEye_password = document.getElementById('signup_openEye_password')
        const signup_closeEye_password = document.getElementById('signup_closeEye_password')
        signup_password.type = "password"
        signup_closeEye_password.style.display = "block"
        signup_openEye_password.style.display = "none"
    }

    return (
        <div className='signup-container'>
            <div className="form-signup-container" id='form_signup_container'>
                <div className="signup-header">
                    Register Account
                </div>
                <div className="signup-username-container signup-input-container">
                    <label htmlFor="signup_username" className='signup-text'>Username</label>
                    <input type="text" name="username" id="signup_username" className='signup-input' ref={username} />
                </div>
                <div className="signup-password-container signup-input-container">
                    <label htmlFor="signup_password" className='signup-text'>Password</label>
                    <input type="password" name="password" id="signup_password" className='signup-input' ref={password} />
                    <FaEye className='signup-eye signup-open-eye' id='signup_openEye_password' onClick={onClickHidePasword}/>
                    <FaEyeSlash className='signup-eye' id='signup_closeEye_password' onClick={onClickShowPasword}/>
                </div>
                <div className="signup-passwordConfirmed-container signup-input-container">
                    <label htmlFor="signup_passwordConfirmed" className='signup-text'>Password Confirmed</label>
                    <input type="password" name="passwordConfirmed" id="signup_passwordConfirmed" className='signup-input' ref={passwordConfirmed} />
                    <FaEye className='signup-eye signup-open-eye' id='signup_openEye_passwordConfirmed' onClick={onClickHidePaswordConfirmed}/>
                    <FaEyeSlash className='signup-eye' id='signup_closeEye_passwordConfirmed' onClick={onClickShowPaswordConfirmed}/>
                </div>

                <div className="signup-email-container signup-input-container">
                    <label htmlFor="signup_email" className='signup-text'>Email</label>
                    <input type="email" name="email" id="signup_email" className='signup-input' ref={email} />
                </div>

                <div className="signup-firstname-container signup-input-container">
                    <label htmlFor="signup_firstname" className='signup-text'>Firstname</label>
                    <input type="text" name="firstname" id="signup_firstname" className='signup-input' ref={firstname} />
                </div>

                <div className="signup-lastname-container signup-input-container">
                    <label htmlFor="signup_lastname" className='signup-text'>Lastname</label>
                    <input type="text" name="lastname" id="signup_lastname" className='signup-input' ref={lastname} />
                </div>

                <div className="btn-submit btn-signup" onClick={onClickSignUp}>
                    SignUp
                </div>
            </div>
            <div className="alert-container" id='alert_container'>
                <IoMdClose className='alert-close-icon' onClick={onClickCloseAlert} />
                <div className="error-icon-container">
                    <MdOutlineError className='error-icon' id='error_icon' />
                    <FaCheckCircle className='error-icon success-icon' id='success_icon' />
                </div>
                <div className="error-text">
                    {error}
                </div>
            </div>
        </div>
    )
}
