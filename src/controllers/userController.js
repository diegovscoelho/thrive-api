const db = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const emailCheck = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.status(409).json({ message: 'Este e-mail já está em uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];
    res.status(201).json({ message: 'Conta criada com sucesso!', user: newUser });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
 
  try {
    const userResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if(userResult.rows.length === 0) {
      return res.status(401).json({message: 'Crendeciais inválidas.'});
    }

    const user = userResult.rows[0];

    const passwordCorrect = await bcrypt.compare(password, user.password);

    if(!passwordCorrect) {
      return res.status(401).json({message: 'Crendeciais inválidas.'});
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido!', token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({message: "Não foi possível autenticar o usuário."});
  }
}

module.exports = {
  createUser,
  loginUser,
};