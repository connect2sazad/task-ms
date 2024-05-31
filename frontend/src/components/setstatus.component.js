import axios from "axios";

const SetStatus = async (route, id, column, updateFunc) => {
    const token = localStorage.getItem('token');

    // console.log(`http://localhost:5555/${route}/${id}/status`);
    
    try {
        await axios.put(`http://localhost:5555/${route}/${id}/status`, {
            column: column,
        }, {
            headers: {
                'Authorization': token
            }
        });
        // console.log(response.data.message);
        updateFunc();

    } catch (error) {
        console.log({ message: `Failed to update user: ${error.response?.data?.message || error.message}` });
        // this.props.navigate('/login');
    }
}

export default SetStatus;