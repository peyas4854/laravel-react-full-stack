import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../context/ContextProvicer.jsx";
import {useEffect} from "react";
import apiService from "../../service/api.service.js";

export default function DefaultLayout() {
    // user context api
    const {user, token, setUser, setToken} = useStateContext()
    if (!token) {
        return <Navigate to="/login"/>
    }
    const logout = (e) => {
        e.preventDefault();
        apiService.post('/logout')
            .then(() => {
                //set user and token in context api
                setUser({});
                setToken(null);
            }).catch((error) => {
            console.log('error', error)
        })
    }
   // on load component call user api for get authenticated user
    useEffect(() => {
        apiService.get('/user')
            .then((res) => {
                setUser(res.data);
            }).catch((error) => {
            console.log('error', error)
        })

    }, [])

    return (
        <div>
            <div id="defaultLayout">
                <aside>
                    <Link to="/">Dashboard</Link>
                    <Link to="/users">Users</Link>
                </aside>
                <div className="content">
                    <header>
                        <div>
                            Header
                        </div>
                        <div>
                            {user.name}
                            <a href="#" onClick={logout} className=" btn-logout"> Logout</a>
                        </div>
                    </header>
                    <main>
                        <Outlet/>
                    </main>
                </div>
            </div>
        </div>
    )
}
