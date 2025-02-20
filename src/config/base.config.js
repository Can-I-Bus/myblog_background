let url = '';
let env = process.env.NODE_ENV;

if (env === 'development') {
    url = 'http://localhost:3001/';
} else {
    url = '';
}

export default {
    BASE_URL: url,
    TIMEOUT: 60000,
};
