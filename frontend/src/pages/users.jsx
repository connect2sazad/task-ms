import React from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { FaEye, FaPencilAlt, FaPowerOff, FaTimes } from "react-icons/fa";

import withRouter from "../components/withrouter.component";
import Header from "../components/header.component";
import Footer from "../components/footer.component";
import Sidebar from "../components/sidebar.component";
import WebHead from "../components/webhead.component";
import TableData from "../components/tabledata.component";
import { Description, Keywords, formatDate } from "../components/constants.component";
import NewUser from "../components/newuser.component";
import SetStatus from "../components/setstatus.component";

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            head_insiders: {
                page_title: "Users",
                keywords: Keywords,
                description: Description,
            },
            loading: true,
            columns: [
                {
                    name: "#",
                    selector: (row) => row.id,
                },
                {
                    name: "Name",
                    selector: (row) => row.name,
                },
                {
                    name: "Email",
                    selector: (row) => row.email,
                },
                {
                    name: "Handle",
                    selector: (row) => row.handle,
                },
                {
                    name: "Status",
                    selector: (row) => row.is_active,
                },
                {
                    name: "Role",
                    selector: (row) => row.role,
                },
                {
                    name: "Last Update",
                    selector: (row) => row.last_update,
                },
                {
                    name: "Actions",
                    selector: (row) => row.actions,
                },
            ],
            data: [],
            showModal: false,
        };
        // this.fetchUsers =  this.
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:5555/users', {
                headers: {
                    'Authorization': token
                }
            });
            this.setState({
                message: response.data.message,
                loading: false
                // posts: response.data.posts 
            });

            const users = response.data.users;
            let count = 0;

            const formattedUsers = users.map((user, index) => {
                count++;
                return {
                    id: count,
                    name: `${user.first_name} ${user.last_name}`,
                    email: user.email,
                    handle: user.userid,
                    role: user.role,
                    is_active: user.is_active ? 'Active' : 'Inactive',
                    last_update: formatDate(user.updated_at),
                    actions: (
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-sm btn-outline-primary" onClick={() => this.viewUser(user.userid)}><FaEye /></button>
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => this.editUser(user.userid)}><FaPencilAlt /></button>
                            <button className="btn btn-sm btn-outline-dark" onClick={() => SetStatus('users', user.userid, 'is_active', this.fetchUsers)}><FaPowerOff /></button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => SetStatus('users', user.userid, 'is_deleted', this.fetchUsers)}><FaTimes /></button>
                        </div>
                    )
                };
            });

            this.setState({ data: formattedUsers });

        } catch (error) {
            this.setState({
                message: `Failed to load profile: ${error.response?.data?.message || error.message}`,
                loading: false
            });
            this.props.router.navigate('/login');
        }
    }

    viewUser = (userid) => {
        this.props.router.navigate(`/profile/${userid}`);
    }   

    editUser = (userid) => {

    }

    render() {
        return (
            <>
                <WebHead headInsiders={this.state.head_insiders} />
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar styles="col-md-3 bg-light col-lg-2" selected="users" />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-md-4">
                            <h4 className="mb-4">
                                {this.state.head_insiders.page_title}
                            </h4>
                            {
                                this.state.loading
                                    ?
                                    <div className="d-flex justify-content-center w-100">
                                        <ClipLoader size={50} color={"#123abc"} loading={this.state.loading} />
                                    </div>
                                    :
                                    <TableData columns={this.state.columns} data={this.state.data}
                                        additionalComponent={<NewUser onUserCreated={this.fetchUsers} />}
                                    />
                            }

                        </main>
                    </div>
                </div>
                <Footer />

            </>
        );
    }
}

export default withRouter(UsersPage);
