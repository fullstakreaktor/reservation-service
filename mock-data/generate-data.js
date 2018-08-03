
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'reservation'
});

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
  const values = [['kittyPerry1']];
  loopNtimes(199, (i) => {
    const n = getRandomInt(0, mockUsernames.length - 1);
    const username = mockUsernames[n] + i;
    values.push([username]);
  });
  return values;
};

const makeHostsData = () => {
  const values = [[1]];
  const memo = {1:1};
  loopNtimes(120, () => {
    let userId = null;
    do {
      userId = getRandomInt(2, 130);
    } while (memo[userId]);
    memo[userId] = 1;
    values.push([userId]);
  });
  return values;
};

const makeReviewsData = () => {
  const values = [[99, 3.5]];
  loopNtimes(120, () => {
    const totalReviews = getRandomInt(0, 1111);
    const avgRating = Math.random() * 4;
    values.push([totalReviews, avgRating]);
  });
  return values;
};

const makeListingsData = () => {
  const values = [[1, 1, 555, 2, 5, 5, 20, 99]];
  const memo = {
    hostId: {1:1},
    reviewId: {1:1},
  };
  loopNtimes(98, () => {
    const fields = ['hostId', 'reviewId'];
    let row = [];
    let id = null;
    fields.forEach((field) => {
      do {
        id = getRandomInt(2, 100);
      } while (memo[field][id]);
      memo[field][id] =1;
      row.push(id);
    });
    const views = getRandomInt(0, 600);
    const minStay = getRandomInt(1, 3);
    const maxGuests = getRandomInt(2, 10);
    const fees = getRandomInt(1, 10);
    const taxRate = getRandomInt(1, 20);
    const rate = getRandomInt(1, 300);
    row = row.concat(views, minStay, maxGuests, fees, taxRate, rate);
    values.push(row);
  });

  return values;
};

const makeBookedDatesData = () => {
  const values = [];
  const memo = {1:1};
  const today = new Date(Date.now());
  const year = today.getFullYear();
  let month = today.getMonth();
  values.push([1, new Date(year, month, 4), new Date (year, month, 7)]);
  values.push([1, new Date(year, month, 15), new Date (year, month, 16)]);
  values.push([1, new Date(year, month, 19), new Date (year, month, 22)]);
  values.push([1, new Date(year, month + 1, 2), new Date (year, month + 1, 4)]);
  values.push([1, new Date(year, month + 1, 17), new Date (year, month + 1, 25)]);
  values.push([1, new Date(year, month + 2, 10), new Date (year, month + 2, 14)]);
  values.push([1, new Date(year, month + 2, 18), new Date (year, month + 2, 20)]);

  loopNtimes(80, () => {
    // populate 80 unique listings
    let listingId = null;
    do {
      listingId = getRandomInt(2, 97);
    } while (memo[listingId]);
    memo[listingId] = 1;

    loopNtimes(3, (i) => {
      // populate three months starting from date of current test
      // with 2 reservations each month
      month = today.getMonth() + i;
      let date1 = getRandomInt(5, 10);
      let date2 = getRandomInt(16, 24);
      let stayLength1 = getRandomInt(1, 5);
      let stayLength2 = getRandomInt(1, 5);
      let checkIn1 = new Date(year, month, date1);
      let checkOut1 = new Date(year, month, date1 + stayLength1);
      let checkIn2 = new Date(year, month, date2);
      let checkOut2 = new Date(year, month, date2 + stayLength2);
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
  makeQuery('reviews', ['total_reviews', 'avg_rating'], makeReviewsData());
  makeQuery('listings', ['host_id', 'review_id', 'weekly_views', 'min_stay', 'max_guests', 'fees', 'tax_rate', 'rate'], makeListingsData());
  makeQuery('booked_dates', ['listing_id', 'check_in', 'check_out'], makeBookedDatesData());
};

populate();
