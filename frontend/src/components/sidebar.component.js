import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <ul>
                    <li>
                        <Link to="http://127.0.0.1/tms/">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="http://127.0.0.1/tms/add-new-task">Add new Task</Link>
                    </li>
                    <li>
                        <Link to="http://127.0.0.1/tms/manage-tasks">Manage Tasks</Link>
                    </li>
                    <li>
                        <Link to="http://127.0.0.1/tms/settings">Settings</Link>
                    </li>
                    <li>
                        <Link to="http://127.0.0.1/tms/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Sidebar;