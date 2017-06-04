import 'isomorphic-fetch';

const url = route => `${process.env.URL}:${process.env.PORT}${route}`;

const AppApi = {
    fetchPosts() {
        return fetch(url('/posts.json'))
            .then(response => response.json());
    }
};

export default AppApi;
