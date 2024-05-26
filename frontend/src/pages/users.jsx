import React from "react";
import axios from "axios";

import withRouter from "../components/withrouter.component";
import Header from "../components/header.component";
import Footer from "../components/footer.component";
import Sidebar from "../components/sidebar.component";
import WebHead from "../components/webhead.component";
import TableData from "../components/tabledata.component";
import { Description, Keywords, formatDate } from "../components/constants.component";
import NewUser from "../components/newuser.component";

class UsersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            head_insiders: {
                page_title: "Users",
                keywords: Keywords,
                description: Description,
            },
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
                    name: "Last Update",
                    selector: (row) => row.last_update,
                },
            ],
            data: [],
            showModal: false,
        };
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
                    last_update: formatDate(user.updated_at),
                };
            });

            this.setState({ data: formattedUsers });

        } catch (error) {
            this.setState({ message: `Failed to load profile: ${error.response?.data?.message || error.message}` });
            this.props.navigate('/login');
        }
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
                            <TableData columns={this.state.columns} data={this.state.data} 
                                additionalComponent={<NewUser onUserCreated={this.fetchUsers} />} 
                            />
                        </main>
                    </div>
                </div>
                <Footer />
                
            </>
        );
    }
}

export default withRouter(UsersPage);
