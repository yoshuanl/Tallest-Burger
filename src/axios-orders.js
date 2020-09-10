import axios from 'axios';

const instanse = axios.create({
    baseURL: 'https://my-burger-6aea0.firebaseio.com/'
});

export default instanse;