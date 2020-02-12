const mongoose = require('mongoose');
// mongoose.connect('mongodb://database/checkout');
mongoose.connect('mongodb://localhost/checkout');

const repoSchema = mongoose.Schema({
  _id: Number,
  name: String,
  starReviewTotal: Number,
  numberOfReviews: Number,
  bookedDates: Object,
  guestsAllowed: {
    adult: Number,
    child: Number,
    infant: Number
  },
  priceRelatedToSumOfAdultAndChild: Object,
  views: {
    today: Number,
    lastWeek: Number,
    lastMonth: Number
  }
});

const House = mongoose.model('house', repoSchema);

module.exports.House = House;
