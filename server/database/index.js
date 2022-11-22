const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/lvfood?readPreference=primary&appname=lvfood&ssl=false', {
mongoose
  .connect(
    'mongodb+srv://lv-food:BomEuZankiKgthdM@lv-food.74rgm.mongodb.net/lv-food?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    },
  )
  .then(async () => {
    console.log('Connexion ok!');
  })
  .catch((err) => {
    console.log(err);
  });
