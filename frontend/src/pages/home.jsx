import React from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners"; // Import the ClipLoader from react-spinners

import withRouter from '../components/withrouter.component';
import WebHead from '../components/webhead.component';
import Header from "../components/header.component";
import Sidebar from "../components/sidebar.component";
import Footer from "../components/footer.component";
import PostCard from "../components/postcard.component";
import { Keywords, Description, api } from "../components/constants.component";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            posts: [],
            loading: true, // Add a loading state to manage the loader visibility
            head_insiders: {
                page_title: "Home",
                keywords: Keywords,
                description: Description
            },
        };
    }

    componentDidMount() {
        this.fetchPosts();
    }

    fetchPosts = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(api('posts'), {
                headers: {
                    'Authorization': token
                }
            });
            this.setState({ 
                message: response.data.message, 
                posts: response.data.posts,
                loading: false // Set loading to false after data is fetched
            });
        } catch (error) {
            this.setState({ 
                message: `Failed to load posts: ${error.response?.data?.message || error.message}`,
                loading: false // Set loading to false in case of error
            });
            // this.props.navigate('/login');
            this.props.router.navigate('/login');
        }
    }

    render() {
        return (
            <>
                <WebHead headInsiders={this.state.head_insiders} />
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar styles="col-md-3 bg-light col-lg-2" selected="home" />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            <h4 className="my-4">Dashboard</h4>
                            <div className="task-posts-container row">
                                {
                                    this.state.loading 
                                        ? <div className="d-flex justify-content-center w-100">
                                            <ClipLoader size={50} color={"#123abc"} loading={this.state.loading} />
                                          </div>
                                        : this.state.posts.length > 0
                                            ? this.state.posts.map((post, index) => (
                                                <div className="col-md-4 mb-4" key={index}>
                                                    <PostCard post={post} />
                                                </div>
                                            ))
                                            : <p>No posts available</p>
                                }
                            </div>
                        </main>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default withRouter(HomePage);
