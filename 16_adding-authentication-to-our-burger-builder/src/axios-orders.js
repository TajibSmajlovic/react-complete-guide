import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://myburgerbuilder-smajke.firebaseio.com/'
});

export default instance;