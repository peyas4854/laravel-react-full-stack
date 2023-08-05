import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiService from "../service/api.service.js";
import {useStateContext} from "../context/ContextProvicer.jsx";

export default function UserForm() {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const navigate = useNavigate();
    const {setNotification} = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            apiService.get(`/users/${id}`)
                .then((res) => {
                    console.log('res', res.data.data);
                    setLoading(false);
                    setUser(res.data.data);
                }).catch((error) => {
                setLoading(true);
                console.log('error', error);
            })
        }, [])
    }
    const onSubmit = (ev) => {
        ev.preventDefault();

        if (id) {
            console.log('update user', user);
            apiService.update(`/users/${id}`, user)
                .then((res) => {
                    // TODO : show notification
                    setNotification('User updated successfully')
                    navigate('/users')
                }).catch((error) => {
                if (error.response.status == 422) {
                    setErrors(error.response.data.errors);
                }
            });
        } else {
            console.log('create user', user);
            apiService.post(`/users`, user)
                .then((res) => {
                    // TODO : show notification
                    setNotification('User created successfully')
                    navigate('/users')
                }).catch((error) => {
                if (error.response.status == 422) {
                    setErrors(error.response.data.errors);
                }
            });
        }


    }
    return (
        <div>
            {user.id && <h1> Update User :{user.name}</h1>}
            {!user.id && <h1> Create User </h1>}
            <div className="card animated fadeInDown">

                {
                    loading && (
                        <div className="text-center">
                            Loading ...
                        </div>
                    )
                }
                {
                    errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>  {errors[key][0]}</p>
                        ))}
                    </div>
                }
                {
                    !loading &&
                    <form onSubmit={onSubmit}>
                        {/* Two-way data binding  for name and email */}
                        <input value={user.name} onChange={ev => setUser({...user, name: ev.target.value})} type="text"
                               placeholder="Name"/>
                        <input value={user.email} onChange={ev => setUser({...user, email: ev.target.value})}
                               type="email" placeholder="Email"/>
                        <input onChange={ev => setUser({...user, password: ev.target.value})} type="password"
                               placeholder="Password"/>
                        <input onChange={ev => setUser({...user, password_confirmation: ev.target.value})}
                               type="password" placeholder="Password Confirmation"/>
                        <button className="btn"> Save</button>
                    </form>
                }


            </div>
        </div>
    )
}
