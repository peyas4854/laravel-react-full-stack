import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import apiService from "../service/api.service.js";

export default function UserForm() {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
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
    return (
        <div>
            {user.id && <h1> Update User :{user.name}</h1>}
            {!user.id && <h1> New User </h1>}
            <div className="card animated fadeInDown">

                {
                    loading && (
                        <div className="text-center">
                            Loading ...
                        </div>
                    )
                }

            </div>
        </div>
    )
}
