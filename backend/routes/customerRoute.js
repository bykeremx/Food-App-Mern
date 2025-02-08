import express from 'express';

const route = express.Router();


route.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

export default route;