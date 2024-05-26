import React from "react";
import withRouter from "../components/withrouter.component";
import Header from "../components/header.component";
import Footer from "../components/footer.component";
import Sidebar from "../components/sidebar.component";
import WebHead from "../components/webhead.component";

class NewPostPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            head_insiders: {
                page_title: "New Post",
                keywords: ["Best Site", "Best Site 2", "Best Site 3"],
                description: 'Test Description'
            },
        };
    }

    componentDidMount(){
        
    }

    render() {

        
        return (
            <>
                <WebHead headInsiders={this.state.head_insiders} />
                <Header />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar styles="col-md-3 bg-light col-lg-2" selected="new-post" />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 py-md-4">
                            <h4 className="mb-4">New Post</h4>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="task-details" className="form-label">Task Details</label>
                                    <textarea className="form-control" id="task-details" rows="3"></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="date" className="form-label">Date</label>
                                    <input type="date" className="form-control" id="date" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="time" className="form-label">Time</label>
                                    <input type="time" className="form-control" id="time" />
                                </div>
                                <div className="mb-3 form-check">
                                    <input type="checkbox" className="form-check-input" id="is-completed" />
                                    <label className="form-check-label" htmlFor="is-completed">Mark as Completed</label>
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </main>
                    </div>
                </div>
                <Footer />
            </>

        );
    }
}

export default withRouter(NewPostPage);
