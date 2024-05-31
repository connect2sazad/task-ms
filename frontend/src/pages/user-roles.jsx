import React from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import { Description, Keywords } from '../components/constants.component';
import WebHead from '../components/webhead.component';
import Header from '../components/header.component';
import Sidebar from '../components/sidebar.component';
import Footer from '../components/footer.component';
import TableData from '../components/tabledata.component';
import NewUserRole from '../components/newuserrole.component';
import withRouter from '../components/withrouter.component';
import SetStatus from '../components/setstatus.component';
import { FaPencilAlt, FaPowerOff, FaTimes } from 'react-icons/fa';

class UserRolesPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            head_insiders: {
                page_title: "User Roles",
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
                    name: "Role Name",
                    selector: (row) => row.name,
                },
                {
                    name: "Role",
                    selector: (row) => row.role,
                },
                {
                    name: "Status",
                    selector: (row) => row.is_active,
                },
                {
                    name: "Permissions",
                    selector: (row) => row.permissions,
                },
                {
                    name: "Actions",
                    selector: (row) => row.actions,
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
                loading: false
            });

            const user_roles = response.data.user_roles;
            let count = 0;

            const formattedUsers = user_roles.map((user_role, index) => {
                count++;
                return {
                    id: count,
                    name: user_role.name,
                    role: user_role.role,
                    is_active: user_role.is_active ? "Active" : "Inactive",
                    permissions: user_role.permissions,
                    actions: (
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-sm btn-outline-secondary" onClick={() => this.editUser(user_role)}><FaPencilAlt /></button>
                            <button className="btn btn-sm btn-outline-dark" onClick={() => SetStatus('user-roles', user_role.id, 'is_active', this.fetchUserRoles)}><FaPowerOff /></button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => SetStatus('user-roles', user_role.id, 'is_deleted', this.fetchUserRoles)}><FaTimes /></button>
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
                            {
                                this.state.loading
                                ?
                                <div className="d-flex justify-content-center w-100">
                                    <ClipLoader size={50} color={"#123abc"} loading={this.state.loading} />
                                </div>
                                :
                                <TableData columns={this.state.columns} data={this.state.data} 
                                additionalComponent={<NewUserRole onUserRoleCreated={this.fetchUserRoles} />} 
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

export default withRouter(UserRolesPage);