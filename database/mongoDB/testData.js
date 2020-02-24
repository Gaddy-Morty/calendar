const moment = require('moment');

const getRandomValue = function (array) {
  let index = Math.floor(Math.random() * array.length)
  return array[index]
}

const getName = function () {
  let names = ['David', 'Phil', 'Justin', 'Pankaj', 'Lizzy', 'Sarah']
  return getRandomValue(names)
}

const getStarReviewTotal = function () {
  return 5 * Math.random()
}

const getNumberOfReviews = function () {
  return Math.floor(100 * Math.random())
}

const getBookedDates = function () {
  const bookedDates = {}
  const numberOfBookings = Math.floor(Math.random() * 180)
  for (let i = 0; i < numberOfBookings; i++) {
    let dayBooked = Math.floor(Math.random() * 180)
    let currentDate = moment().add(dayBooked, 'days').format('L')
    bookedDates[currentDate] = true;
  }
  return bookedDates;
}

const getGuestsAllowed = function () {
  let adultsAllowed = Math.floor(Math.random() * 10) + 2
  let childrenAllowed = Math.floor(adultsAllowed / 2 * Math.random())
  return {
    adult: adultsAllowed,
    child: childrenAllowed,
    infant: 5
  }
}

const getPriceRelatedToSumOfAdultAndChild = function (adultAndChild) {
  const price = {}
  const basePrice = Math.floor(Math.random() * 250) + 50
  for (var i = 0; i < adultAndChild; i++) {
    price[i + 1] = basePrice
  }
  return price
}

const getViews = function () {
  let today = Math.floor(50 * Math.random())
  let lastWeek = today + Math.floor(200 * Math.random())
  let lastMonth = lastWeek + Math.floor(600 * Math.random())
  return {
    today: today,
    lastWeek: lastWeek,
    lastMonth: lastMonth
  }
}

const generateData = function (amountOfData) {
  const dataset = [];

  for (let i = 0; i < amountOfData; i++) {
    let guestsAllowed = getGuestsAllowed()
    let adultAndChild = guestsAllowed.adult + guestsAllowed.child
    let data = {
      name: getName(),
      starReviewTotal: getStarReviewTotal(),
      numberOfReviews: getNumberOfReviews(),
      bookedDates: getBookedDates(),
      guestsAllowed: guestsAllowed,
      priceRelatedToSumOfAdultAndChild: getPriceRelatedToSumOfAdultAndChild(adultAndChild),
      views: getViews()
    };
    data['_id'] = i + 1
    dataset.push(data)

  }
  return dataset
}

module.exports = generateData(100)
