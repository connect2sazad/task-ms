import Service from './service.service';

class UserService extends Service{

    constructor(props){
        super(props);
        this.hit = 'users';
    }

    async getAllUsers(){
        this.hit = 'users';
        this.create_url();
        await this.get();
        return this.response.data.users;
    }

    async createUser(data){
        this.hit = 'users/create';
        this.create_url();
        this.data = data;
        await this.post();
        return this.response;
    }

}

export default UserService;