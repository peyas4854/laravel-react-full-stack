import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import apiService from "../service/api.service.js";
import {useStateContext} from "../context/ContextProvicer.jsx";

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const [errors, setErrors] = useState(null);
    const {setUser,setToken} = useStateContext();

    const onSubmit = (ev)=>{
        ev.preventDefault()

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        console.log('submit click',payload);
        setErrors({});
        apiService.post('/login', payload)
            .then((res) => {
                console.log('response', res.data);
                setUser(res.data.user);
                setToken(res.data.token);

            }).catch((error) => {
            if (error.response.status == 422) {
                setErrors(error.response.data.errors);
            }else if(error.response.status == 401){
                console.log(error.response.data)
                setErrors( {
                    email:[error.response.data.error]
                })
            }
        })
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        Login into you account
                    </h1>
                    {
                        errors && <div className="alert">
                            { Object.keys(errors).map(key =>(
                                <p key={key}>  { errors[key][0] }</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef}  type="email" placeholder="Email" />
                    <input ref={passwordRef}  type="password" placeholder="Password" />
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered ? <Link to="/signup"> Create an account</Link>
                    </p>
                </form>
            </div>

        </div>
    )
}
