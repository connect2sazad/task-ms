import axios from "axios";
import { BACKEND_PORT } from "../components/constants.component";

class Service {

    constructor(props) {
        this.config = {
            port: BACKEND_PORT,
            host: 'localhost',
            ...props
        }
        this.response = null;
        this.data = {};
        this.error = null;
        this.headers = {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        };
        this.currentUserid = localStorage.getItem('userid');
        this.status = 0;
        this.message = '';
    }

    create_url() {
        this.endpoint = `http://${this.config.host}:${this.config.port}/${this.hit}`;
    }

    async get() {
        try {
            const response = await axios.get(this.endpoint, this.headers);
            this.response = response;
            this.status = response.status;
            this.message = response.data.message;
        } catch (error) {
            this.error = error;
            console.err(error);
            alert("Error from " + this.endpoint);
        }
    }

    async post() {
        try {
            const response = await axios.post(this.endpoint, this.data, this.headers);
            this.response = response;
            this.status = response.status;
            this.message = response.data.message;
        } catch (error) {
            this.error = error;
            console.err(error);
            alert("Error from " + this.endpoint);
        }
    }

    async put() {
        try {
            const response = await axios.put(this.endpoint, this.data, this.headers);
            this.response = response;
            this.status = response.status;
            this.message = response.data.message;
        } catch (error) {
            this.error = error;
            console.err(error);
            alert("Error from " + this.endpoint);
        }
    }

    async delete() {
        try {
            const response = await axios.delete(this.endpoint, this.headers);
            this.response = response;
            this.status = response.status;
            this.message = response.data.message;
        } catch (error) {
            this.error = error;
            console.err(error);
            alert("Error from " + this.endpoint);
        }
    }

}

export default Service;