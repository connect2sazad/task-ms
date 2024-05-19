import React from "react";
import { Link } from "react-router-dom";

import Header from "../components/header.component";
import Sidebar from "../components/sidebar.component";
import Footer from "../components/footer.component";

class HomePage extends React.Component {

    render() {
        return (
            <>
                <Header />
                <section>
                    <Sidebar />

                    <div className="tms-main-container">

                        <h1>Dashboard</h1>
                        <hr />

                        <div className="task-posts-container">


                            <div className="a-task-post-wrapper">
                                <div className="task-post-title">
                                    <span className="bold">#7801</span>
                                    <span>test1</span>
                                    <span>⦿</span>
                                    <span className="italic"><Link to="http://127.0.0.1/tms/users/?userid=admin">admin</Link></span>
                                </div>
                                <hr />
                                <div className="task-post-description">
                                    <p>
                                        test1 test1
                                    </p>
                                </div>
                                <hr />
                                <div className="status">
                                    <div className="task-current-status">✓ Completed</div>

                                    <div className="task_time">08:10 am</div>
                                    <div className="task_date">2022-07-24</div>
                                </div>
                            </div>

                            <div className="a-task-post-wrapper">
                                <div className="task-post-title">
                                    <span className="bold">#7802</span>
                                    <span>test</span>
                                    <span>⦿</span>
                                    <span className="italic"><Link to="http://127.0.0.1/tms/users/?userid=admin">admin</Link></span>
                                </div>
                                <hr />
                                <div className="task-post-description">
                                    <p>
                                        teststttt
                                    </p>
                                </div>
                                <hr />
                                <div className="status">
                                    <div className="task-current-status">! Pending</div>

                                    <div className="task_time">10:15 am</div>
                                    <div className="task_date">2024-05-12</div>
                                </div>
                            </div>

                            <div className="a-task-post-wrapper">
                                <div className="task-post-title">
                                    <span className="bold">#7803</span>
                                    <span>test2</span>
                                    <span>⦿</span>
                                    <span className="italic"><Link
                                        to="http://127.0.0.1/tms/users/?userid=connect2sazad">connect2sazad</Link></span>
                                </div>
                                <hr />
                                <div className="task-post-description">
                                    <p>
                                        asfas
                                    </p>
                                </div>
                                <hr />
                                <div className="status">
                                    <div className="task-current-status">✓ Completed</div>

                                    <div className="task_time">06:18 am</div>
                                    <div className="task_date">2024-05-11</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <Footer/>
            </>
        );
    }
}

export default HomePage;