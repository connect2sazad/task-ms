import React from 'react';
import axios from 'axios';
import withRouter from '../components/withrouter.component';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get('http://localhost:5555/profile', {
                headers: {
                    'Authorization': token
                }
            });
            this.setState({ message: response.data.message, userid: response.data.userid });
        } catch (error) {
            this.setState({ message: `Failed to load profile: ${error.response?.data?.message || error.message}` });
            this.props.navigate('/login');
        }
    }

    render() {
        return (
            <section>
                <div className="profile-section">
                    <h1>Profile</h1>
                    {this.state.message && <p>{this.state.message}</p>}
                    {this.state.userid && <p>{this.state.userid}</p>}
                </div>
            </section>
        );
    }
}

export default withRouter(ProfilePage);
