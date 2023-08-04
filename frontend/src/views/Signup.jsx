import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import apiService from "../service/api.service.js";
import {useStateContext} from "../context/ContextProvicer.jsx";

export default function Signup() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser,setToken} = useStateContext();

    const onSubmit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }
        console.log('payload', payload);
        apiService.post('/register', payload)
            .then((res) => {
                console.log('response', res.data);
                setUser(res.data.user);
                setToken(res.data.token);
            }).catch((error) => {
            if (error.response.status == 422) {
                setErrors(error.response.data.errors);
            }
        })
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">

                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        SignUp
                    </h1>

                    {
                        errors && <div className="alert">
                            { Object.keys(errors).map(key =>(
                                <p key={key}>  { errors[key][0] }</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type="text" placeholder="Name"/>
                    <input ref={emailRef} type="email" placeholder="Email"/>
                    <input ref={passwordRef} type="password" placeholder="Password"/>
                    <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation"/>
                    <button className="btn btn-block">SignUp</button>
                    <p className="message">
                        Already Registered ? <Link to="/login"> Sign In</Link>
                    </p>
                </form>
            </div>

        </div>
    )
}
