import {Link} from "react-router-dom";

export default function Signup(){
    const onSubmit = (ev)=>{
        ev.preventDefault();
        console.log('submit click');
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">

                <form onSubmit={onSubmit}>
                    <h1 className="title">
                        SignUp
                    </h1>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input type="password" placeholder="Password Confirmation" />
                    <button className="btn btn-block">SignUp</button>
                    <p className="message">
                        Already Registered ? <Link to="/login"> Sign In</Link>
                    </p>
                </form>
            </div>

        </div>
    )
}
