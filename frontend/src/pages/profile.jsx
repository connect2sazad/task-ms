import React from 'react';

import withRouter from '../components/withrouter.component';
import Header from '../components/header.component';
import WebHead from '../components/webhead.component';
import Sidebar from '../components/sidebar.component';
import Footer from '../components/footer.component';
import { Description, Keywords } from '../components/constants.component';

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            head_insiders: {
                page_title: "Home",
                keywords: Keywords,
                description: Description
            },
            message: '',
            userid: null
        };
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = async () => {
        const { userid } = this.props.router.params;
        if (!userid) {
            this.setState({
                userid: localStorage.getItem('userid')
            });
        } else {
            this.setState({
                userid
            });
        }
    }

    render() {
        return (
            <>
                <WebHead headInsiders={this.state.head_insiders} />
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar styles="col-md-3 bg-light col-lg-2" selected="profile" />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.state.userid}
                            </main>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default withRouter(ProfilePage);
