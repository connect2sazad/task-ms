import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer>
                <div className="copyright">
                    Copyright &copy; Lyncdigit {new Date().getUTCFullYear()} </div>
                <div className="lyncdigit">
                    Powered by <Link to="https://www.lyncdigit.com/" target="_blank">Lyncdigit</Link>
                </div>
            </footer>
        </>
    );
}

export default Footer;