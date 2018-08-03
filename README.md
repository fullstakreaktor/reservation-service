# Reservation Service for Airpnp

> Booking module allows user to see general listing details, vacancies in a month, and make a reservation by choosing check-in/check-out dates on a calendar, and specify number of guests.

## Related Projects

  - https://github.com/fullstakreaktor/hero-photo-service
  - https://github.com/fullstakreaktor/Review-service
  - https://github.com/fullstakreaktor/about-service
  - https://github.com/fullstakreaktor/kony-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> Some usage instructions

## Requirements

- Node 6.13.0
- Mysql 5.7.22 

## Development

### Setting Up 

To create database of mock data
From within root directory:

```sh
mysql -h localhost -u root 
source db/schema.sql
use reservation
source mock-data/mock_data.sql
```


To install dependencies
From within the root directory:

```sh
npm install -g webpack
npm install
npm run build
npm start
```

