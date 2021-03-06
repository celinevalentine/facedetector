const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.apiKey,
});

const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: 'a403429f2ddf4b49b307e318f00e528b',
        version: '34ce21a40cc24b6b96ffee54aabff139',
      },
      req.body.input,
    )
    .then((data) => {
      console.log(res.json);
      res.json(data);
    })
    .catch((err) => res.status(400).json('unable to work with API'));
};

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => {
      res.json(entries[0]);
    })
    .catch((err) => res.status(400).json('unable to get entries'));
};

module.exports = {
  handleImage,
  handleApiCall,
};
