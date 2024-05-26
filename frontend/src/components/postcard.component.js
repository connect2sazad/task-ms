import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">
                    <span className="fw-bold">#{post.id}</span>
                    <span>{post.title}</span>
                    <span className="text-primary">⦿</span>
                    <span className="font-italic"><Link to="#">{post.assigned_by}</Link></span>
                </h5>
                <hr />
                <div className="card-text">
                    <p>{post.description}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                    <div className="task-current-status text-success">✓ Completed</div>
                    <div className="task-time">{post.time}</div>
                    <div className="task-date">{post.date}</div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;
