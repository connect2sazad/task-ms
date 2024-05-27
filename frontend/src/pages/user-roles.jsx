import React from 'react';
import axios from 'axios';

import { Description, Keywords } from '../components/constants.component';
import WebHead from '../components/webhead.component';
import Header from '../components/header.component';
import Sidebar from '../components/sidebar.component';
import Footer from '../components/footer.component';
import TableData from '../components/tabledata.component';
import NewUserRole from '../components/newuserrole.component';
import withRouter from '../components/withrouter.component';

class UserRolesPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            head_insiders: {
                page_title: "User Roles",
                keywords: Keywords,
                description: Description,
            },
            columns: [
                {
                    name: "#",
                    selector: (row) => row.id,
                },
                {
                    name: "Role",
                    selector: (row) => row.role,
                },
                {
                    name: "Name",
                    selector: (row) => row.name,
                },
                {
                    name: "Permissions",
                    selector: (row) => row.permissions,
                },
            ],
            data: [],
        }
    }

    componentDidMount() {
        this.fetchUserRoles();
    }

    fetchUserRoles = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:5555/user-roles', {
                headers: {
                    'Authorization': token
                }
            });
            this.setState({ 
                message: response.data.message, 
            });

            const user_roles = response.data.user_roles;
            let count = 0;

            const formattedUsers = user_roles.map((user_role, index) => {
                count++;
                return {
                    id: count,
                    name: user_role.name,
                    role: user_role.role,
                    permissions: user_role.permissions,
                };
            });

            this.setState({ data: formattedUsers });

        } catch (error) {
            this.setState({ message: `Failed to load profile: ${error.response?.data?.message || error.message}` });
            this.props.navigate('/login');
        }
    }

    render(){
        return(
            <>
                <WebHead headInsiders={this.state.head_insiders} />
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar styles="col-md-3 bg-light col-lg-2" selected="user-roles" />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-md-4">
                            <h4 className="mb-4">
                                {this.state.head_insiders.page_title}
                            </h4>
                            <TableData columns={this.state.columns} data={this.state.data} 
                                additionalComponent={<NewUserRole onUserRoleCreated={this.fetchUserRoles} />} 
                            />
                        </main>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default withRouter(UserRolesPage);