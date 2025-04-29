const mongoose = require('mongoose');
const Question = require('../Server/models/ChatBotModel/Question'); 
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Question.deleteMany({});
    await Question.insertMany([
      {
        question: 'How long does parcel delivery take?',
        answer: 'Delivery usually takes 2-5 business days depending on the destination.',
        keywords: ['delivery', 'time', 'long', 'take', 'parcel'],
      },
      {
        question: 'How to track my parcel?',
        answer: 'You can track your parcel using the tracking ID provided in your confirmation email.',
        keywords: ['track', 'parcel', 'status'],
      },
      {
        question: 'What is the cost of sending a parcel?',
        answer: 'The cost depends on the weight and destination. Please use our calculator on the website.',
        keywords: ['cost', 'price', 'send', 'parcel'],
      },
    ]);
    console.log('Data seeded');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));