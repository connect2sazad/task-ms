const dbconfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'task_ms',
}

const port = 5555;

const JWT_SECRET_KEY = 'r92wthw8g2k1yhvvm8edgdafxh8xtw0wluob734h';

module.exports = {
    port,
    dbconfig,
    JWT_SECRET_KEY
};