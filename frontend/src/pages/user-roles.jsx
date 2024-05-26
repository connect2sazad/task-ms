import React from 'react';

import { Description, Keywords } from '../components/constants.component';
import WebHead from '../components/webhead.component';
import Header from '../components/header.component';
import Sidebar from '../components/sidebar.component';
import Footer from '../components/footer.component';

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

            ],
            data: []
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
                            <div>jkb</div>
                        </main>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default UserRolesPage;