import {Link, Outlet} from "react-router-dom";

export default function DefaultLayout() {
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
                            User Info
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
