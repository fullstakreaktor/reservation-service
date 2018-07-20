// HELPER FUNCTIONS
const loopNtimes = (n, callback) => {
  for (let i = 0; i < n; i += 1) {
    callback(i);
  }
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getRandomFloat = (min, max) => Math.random() * (max - min + 1) + min;

const makeQuery = (tableName, fields, values) => `INSERT INTO ${tableName} (${fields.join(', ')}) VALUES ("${values.join('", "')}");`;


// DATA GENERATORS FOR USERS, HOSTS, LOCATIONS, REVIEWS, BOOKED_DATES, AND LISTINGS TABLES
const populateUsersTable = () => {
  const mockUsernames = ['pupofjoe', 'whalewhalewhale', 'singleFlaMingle', 'whatdoestheMDNfirefoxsay', 'toadallyCool', 'chimpion', 'couchpugtato', 'instaham', 'hipsterpotamus', 'kittyPerry', 'littlemewmaid', 'sleepingmewty'];
  const queries = [];
  loopNtimes(200, () => {
    const n = getRandomInt(0, mockUsernames.length - 1);
    const username = mockUsernames[n];
    queries.push(makeQuery('users', ['username'], [username]));
  });
  return queries.join(' ');
};

const populateHostsTable = () => {
  const queries = [];
  const memo = {};
  let userId = null;
  loopNtimes(100, () => {
    do {
      userId = getRandomInt(0, 99);
    } while (memo[userId]);
    memo[userId] = 1;
    queries.push(makeQuery('hosts', ['user_id'], [userId]));
  });
  return queries.join(' ');
};

const populateLocationsTable = () => {
  const queries = [];
  loopNtimes(100, () => {
    const zipcode = getRandomInt(11111, 88888);
    queries.push(makeQuery('locations', ['zipcode'], [zipcode]));
  });
  return queries.join(' ');
};

const populateReviewsTable = () => {
  const queries = [];
  loopNtimes(100, () => {
    const totalReviews = getRandomInt(0, 1111);
    const avgRating = Math.random() * 4;
    queries.push(makeQuery('reviews', ['total_reviews', 'avg_rating'], [totalReviews, avgRating]));
  });
  return queries.join(' ');
};

const populateListingsTable = () => {
  const queries = [];
  const memo = {
    host_id: {},
    location_id: {},
    review_id: {},
  };
  loopNtimes(100, () => {
    let fields = ['host_id', 'location_id', 'review_id'];
    let values = [];
    let id = null;
    fields.forEach((field) => {
      do {
        id = getRandomInt(0, 99);
      } while (memo[field][id]);
      values.push(id);
    });
    const views = getRandomInt(0, 600);
    const minStay = getRandomInt(1, 3);
    const maxGuests = getRandomInt(2, 10);
    const fees = getRandomFloat(1, 10);
    const rate = getRandomFloat(1, 300);
    fields = fields.concat('weekly_views', 'min_stay', 'max_guests', 'fees', 'rate');
    values = values.concat(views, minStay, maxGuests, fees, rate);
    queries.push(makeQuery('listings', fields, values));
  });
  return queries.join(' ');
};

const populateBookedDatesTable = () => {
  const queries = [];
  const memo = {};
  const today = new Date(Date.now());
  loopNtimes(80, () => {
    // populate 80 unique listings
    let listingId = null;
    do {
      listingId = getRandomInt(0, 99);
    } while (memo[listingId]);
    loopNtimes(3, (i) => {
      // populate three months starting from date of current test
      // with 2 reservations each month
      const year = today.getYear();
      const month = today.getMonth() + i;
      const date1 = getRandomInt(1, 15);
      const date2 = getRandomInt(16, 28);
      const stayLength1 = getRandomInt(1, 5);
      const stayLength2 = getRandomInt(1, 5);
      const checkIn1 = new Date(year, month, date1);
      const checkOut1 = new Date(year, month, date1 + stayLength1);
      const checkIn2 = new Date(year, month, date2);
      const checkOut2 = new Date(year, month, date2 + stayLength2);
      queries.push(makeQuery('booked_dates', ['listing_id', 'check_in', 'check_out'], [listingId, checkIn1, checkOut1]));
      queries.push(makeQuery('booked_dates', ['listing_id', 'check_in', 'check_out'], [listingId, checkIn2, checkOut2]));
    });
  });
  return queries.join(' ');
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
  let queries = [];
  loopNtimes (100, () => {
    let adjective = getRandomInt(0, mockListingData.adjectives.length - 1);
    let penType = getRandomInt(0, mockListingData.penType.length - 1);
    let preposition = getRandomInt(0, mockListingData.preposition.length - 1);
    let locale = getRandomInt(0, mockListingData.locale.length - 1);
    var description = `${adjective} ${penType} ${preposition} ${locale}`;
    queries.push(makeQuery('listing_descriptions', ['description'], [description]));
  });
  return queries.join(' ');
}
*/

module.exports = {
  populateUsersTable,
  populateHostsTable,
  populateLocationsTable,
  populateReviewsTable,
  populateListingsTable,
  populateBookedDatesTable,
};
