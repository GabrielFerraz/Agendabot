const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27018/agendabot',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const agendamentoSchema = new mongoose.Schema({
  user: String,
  username: String,
  day: Number,
  slot: Number
}, {
  collection: 'agendamento'
});

module.exports = {
  Mongoose: mongoose,
  AgendamentoSchema: agendamentoSchema
}