import Listing from '../models/listing';

/**
 * Load listing and append listing to req.
 */
function load(req, res, next, id) {
  Listing.get(id).then((listing) => {
    req.listing = listing;    // eslint-disable-line no-param-reassign
    return next();
  }).error((e) => next(e));
}

/**
 * Get listings
 * @returns {Listing}
 */
function get(req, res) {
  return res.json(req.listing);
}

/**
* Create new listing
* @returns {Listing}
*/
function create(req, res, next) {
  const {
    siteId = '',
    firstName = '',
    lastName = '',
    paymentMethods = [],
    languagesSpoken = [],
    typeOfPractice = '',
    officeManagersName = '',
    practiceWebsite = '',
    practicePhone = '',
    zipCode = '',
    state = '',
    city = '',
    addressOne = '',
    addressTwo = '',
    country = '',
    practiceName = '',
    takingPatients = '',
    sex = '',
    email = '',
    designation = '',
    lat = null,
    long = null } = req.body;
  const listing = new Listing({
    site_id: siteId,
    first_name: firstName,
    last_name: lastName,
    payment_methods: paymentMethods,
    languages_spoken: languagesSpoken,
    type_of_practice: typeOfPractice,
    office_managers_name: officeManagersName,
    practice_website: practiceWebsite,
    practice_phone: practicePhone,
    zip_code: zipCode,
    state: state, // eslint-disable-line object-shorthand
    city: city, // eslint-disable-line object-shorthand
    address_1: addressOne,
    address_2: addressTwo,
    country: country, // eslint-disable-line object-shorthand
    practice_name: practiceName,
    taking_patients: takingPatients,
    sex: sex, // eslint-disable-line object-shorthand
    email: email, // eslint-disable-line object-shorthand
    designation: designation, // eslint-disable-line object-shorthand
    lat: lat, // eslint-disable-line object-shorthand
    long: long, // eslint-disable-line object-shorthand
  });
  listing.saveAsync()
    .then((savedListing) => res.json(savedListing))
    .error((e) => next(e));
}

function update(req, res, next) {
  const {
    siteId,
    firstName,
    lastName,
    paymentMethods,
    languagesSpoken,
    typeOfPractice,
    officeManagersName,
    practiceWebsite,
    practicePhone,
    zipCode,
    state,
    city,
    addressOne,
    addressTwo,
    country,
    practiceName,
    takingPatients,
    sex,
    email,
    designation,
    lat,
    long } = req.body;
  const listing = req.listing;

  listing.site_id = siteId;
  listing.first_name = firstName;
  listing.last_name = lastName;
  listing.payment_methods = paymentMethods;
  listing.languages_spoken = languagesSpoken;
  listing.type_of_practice = typeOfPractice;
  listing.office_managers_name = officeManagersName;
  listing.practice_website = practiceWebsite;
  listing.practice_phone = practicePhone;
  listing.zip_code = zipCode;
  listing.state = state; // eslint-disable-line object-shorthand
  listing.city = city; // eslint-disable-line object-shorthand
  listing.address_1 = addressOne;
  listing.address_2 = addressTwo;
  listing.country = country; // eslint-disable-line object-shorthand
  listing.practice_name = practiceName;
  listing.taking_patients = takingPatients;
  listing.sex = sex; // eslint-disable-line object-shorthand
  listing.email = email; // eslint-disable-line object-shorthand
  listing.designation = designation; // eslint-disable-line object-shorthand
  listing.lat = lat; // eslint-disable-line object-shorthand
  listing.long = long; // eslint-disable-line object-shorthand

  listing.saveAsync()
    .then((savedListing) => res.json(savedListing))
    .error((e) => next(e));
}

/**
 * Get listing list.
 * @property {number} req.query.skip - Number of listings to be skipped.
 * @property {number} req.query.limit - Limit number of listings to be returned.
 * @returns {Listing[]}
 */
function list(req, res, next) {
  const { limit = 1000, skip = 0, siteId = '' } = req.query;
  Listing.list({ limit, skip, siteId }).then((listings) => res.json(listings))
    .error((e) => next(e));
}

/**
 * Delete listing.
 * @returns {Listing}
 */
function remove(req, res, next) {
  const { listing } = req;
  listing.removeAsync()
    .then((deletedListing) => res.json(deletedListing))
    .error((e) => next(e));
}

export default { list, create, remove, get, load, update };
