const { app, db } = require('../index');

// create new user
app.post('/users/create', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO `users` (name, email) VALUES (?,?)', [name, email], (err, result) => {
        if (err) throw err;
        res.json({message: 'User added successfully', id: result.insertId});
    });
});

// get all users
app.get('/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// get single user
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

// update user
app.put('/users/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, results) => {
        if (err) throw err;
        res.json({ message: 'User updated' })
    });
});

// delete user
app.delete('/users/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
        if(err) throw err;
        res.json({ message: 'Deleted user' })
    });
});