const db = require('../db/db.config.js');

// HELPER FUNCTIONS
const loopNtimes = (n, callback) => {
  for (let i = 0; i < n; i += 1) {
    callback(i);
  }
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;

const makeQuery = (table, fields, vals) => {
  const queryStr = `INSERT INTO ${table} (${fields.join(', ')}) VALUES ?`;
  db.query(queryStr, [vals], (err) => {
    if (err) console.log(`Failed to post to ${table}: ${err}`);
    else console.log(`Posted to ${table}`);
  });
};


// DATA GENERATORS FOR USERS, HOSTS, LOCATIONS, REVIEWS, BOOKED_DATES, AND LISTINGS TABLES
const makeUsersData = () => {
  const mockUsernames = ['pupofjoe', 'whalewhalewhale', 'singleFlaMingle', 'whatdoestheMDNfirefoxsay', 'toadallyCool', 'chimpion', 'couchpugtato', 'instaham', 'hipsterpotamus', 'kittyPerry', 'littlemewmaid', 'sleepingmewty'];
  const values = [];
  loopNtimes(200, (i) => {
    const n = getRandomInt(0, mockUsernames.length - 1);
    const username = mockUsernames[n] + i;
    values.push([username]);
  });
  return values;
};

const makeHostsData = () => {
  const values = [];
  const memo = {};
  loopNtimes(100, () => {
    let userId = null;
    do {
      userId = getRandomInt(1, 100);
    } while (memo[userId]);
    memo[userId] = 1;
    values.push([userId]);
  });
  return values;
};

const makeLocationsData = () => {
  const values = [];
  loopNtimes(100, () => {
    const zipcode = getRandomInt(11111, 88888);
    values.push([zipcode]);
  });
  return values;
};

const makeReviewsData = () => {
  const values = [];
  loopNtimes(100, () => {
    const totalReviews = getRandomInt(0, 1111);
    const avgRating = Math.random() * 4;
    values.push([totalReviews, avgRating]);
  });
  return values;
};

const makeListingsData = () => {
  const values = [];
  const memo = {
    hostId: {},
    locationId: {},
    reviewId: {},
  };
  loopNtimes(100, () => {
    const fields = ['hostId', 'locationId', 'reviewId'];
    let row = [];
    let id = null;
    fields.forEach((field) => {
      do {
        id = getRandomInt(1, 100);
      } while (memo[field][id]);
      row.push(id);
    });
    const views = getRandomInt(0, 600);
    const minStay = getRandomInt(1, 3);
    const maxGuests = getRandomInt(2, 10);
    const fees = getRandomFloat(1, 10);
    const rate = getRandomFloat(1, 300);
    row = row.concat(views, minStay, maxGuests, fees, rate);
    values.push(row);
  });

  return values;
};

const makeBookedDatesData = () => {
  const values = [];
  const memo = {};
  const today = new Date(Date.now());
  loopNtimes(80, () => {
    // populate 80 unique listings
    let listingId = null;
    do {
      listingId = getRandomInt(1, 100);
    } while (memo[listingId]);
    loopNtimes(3, (i) => {
      // populate three months starting from date of current test
      // with 2 reservations each month
      const year = today.getYear();
      const month = today.getMonth() + i;
      const date1 = getRandomInt(5, 10);
      const date2 = getRandomInt(16, 24);
      const stayLength1 = getRandomInt(1, 5);
      const stayLength2 = getRandomInt(1, 5);
      const checkIn1 = new Date(year, month, date1);
      const checkOut1 = new Date(year, month, date1 + stayLength1);
      const checkIn2 = new Date(year, month, date2);
      const checkOut2 = new Date(year, month, date2 + stayLength2);
      values.push([listingId, checkIn1, checkOut1]);
      values.push([listingId, checkIn2, checkOut2]);
    });
  });
  return values;
};

/*
LISTING DESCRIPTION GENERATOR: UNUSED FOR NOW
const mockListingData = {
 adjectives: ['mewtiful', 'spacious', 'gllamarous', 'whale-built',
  'open air', 'cozy', 'brand new', 'vibrant'],
 penType: ['doghouse', 'barn', 'fishbowl', 'lions den', 'nest', 'quiet hermit shell'],
 preposition: ['in', 'by','close to'],
 locale: ['ruff neighborhood', 'dog park', 'upscale guppie area', 'cowtown'];
}

const populateListingDescriptionsTable = () => {
  let values = [];
  loopNtimes (100, () => {
    let adjective = getRandomInt(0, mockListingData.adjectives.length - 1);
    let penType = getRandomInt(0, mockListingData.penType.length - 1);
    let preposition = getRandomInt(0, mockListingData.preposition.length - 1);
    let locale = getRandomInt(0, mockListingData.locale.length - 1);
    var description = `${adjective} ${penType} ${preposition} ${locale}`;
    values.push(makeQuery('listing_descriptions', ['description'], [description]));
  });
  return values;
}
*/

const populate = () => {
  makeQuery('users', ['username'], makeUsersData());
  makeQuery('hosts', ['user_id'], makeHostsData());
  makeQuery('locations', ['zipcode'], makeLocationsData());
  makeQuery('reviews', ['total_reviews', 'avg_rating'], makeReviewsData());
  makeQuery('listings', ['host_id', 'location_id', 'review_id', 'weekly_views', 'min_stay', 'max_guests', 'fees', 'rate'], makeListingsData());
  makeQuery('booked_dates', ['listing_id', 'check_in', 'check_out'], makeBookedDatesData());
};

populate();
