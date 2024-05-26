import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="d-flex justify-content-between p-3 bg-dark text-white">
                <div>
                    &copy; {new Date().getUTCFullYear()} Lyncdigit. All Rights Reserved.
                </div>
                <div>
                    Powered by <Link to="https://www.lyncdigit.com/" target="_blank" rel="noopener noreferrer" className="text-white">Lyncdigit</Link>
                </div>
            </div>
        </>
    );
}

export default Footer;
