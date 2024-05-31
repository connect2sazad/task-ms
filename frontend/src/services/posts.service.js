import Service from './service.service';

class PostService extends Service {
    constructor(props) {
        super(props);
        this.hit = 'posts';
    }

    async getAllPosts() {
        this.hit = 'posts';
        this.create_url();
        await this.get();
        return this.response.data.posts;
    }

    async createPost(data){
        this.hit = 'posts/create';
        this.create_url();
        this.data = data;
        await this.post();
        return this.response;
    }

}

export default PostService;
