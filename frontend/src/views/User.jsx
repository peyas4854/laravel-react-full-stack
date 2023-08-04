import {useEffect, useState} from "react";
import apiService from "../service/api.service.js";
import {Link} from "react-router-dom";

export default function Users() {

    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUsers();
    }, []);
    const getUsers = () => {
        setLoading(true);
        apiService.get('/users')
            .then((res) => {
                setLoading(false);
                console.log('res', res.data.data)
                setUsers(res.data.data);
            }).catch((error) => {
            setLoading(false);
        })

    }

    const onDelete = (user)=>{
        if(!window.confirm('Are you sure want to delete user?')){
            return
        }
        apiService.delete(`/users/${user.id}`)
            .then ( (res) =>{
                //TODO : show notifications
                getUsers();
            }).catch ( (error) =>{

        });
    }
    return (
        <div>
            <div style={{display: "flex", justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Users</h1>
                <Link to="/users/new" className="btn-add">Add new</Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Create Date</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    {
                        !loading &&
                        <tbody>
                        {
                            users && users.map(user => (
                                <tr key={user.id}>
                                    <td>  {user.id}</td>
                                    <td>  {user.name}</td>
                                    <td>  {user.email}</td>
                                    <td>  {user.created_at}</td>
                                    <td>
                                        <Link className="btn-edit" to={'/users/' + user.id}> Edit </Link>
                                        <button onClick={e=>onDelete(user)} className="btn-delete"> Delete</button>
                                    </td>


                                </tr>
                            ))
                        }

                        </tbody>
                    }

                    {
                        loading &&
                        <tbody>
                        <tr>
                            <td className="text-center" colSpan="5">Loading ... </td>
                        </tr>
                        </tbody>
                    }

                </table>


            </div>
        </div>
    )
}
