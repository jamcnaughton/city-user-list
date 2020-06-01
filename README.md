# city-user-list
Front end for querying an API which lists users in and nearby a city.

## Workings
This solution uses the city endpoint of the supplied API for getting users in the targetted city. It then calls the all users endpoint. Users returned from the first query are excluded from the second query, then the remaining users are iterated through to find those within the specified distance of the target's city central point (using the Haversine formula). The resulting list of users is combined with those returned from the first query to produce all the users in the city and those considered to be nearby.

The solution is currently configured to use London as its target city (latitude/longitude: 51.509865, -0.118092) and is set to consider users within 50 miles to be nearby.

## Commands

The following commands assume you have NodeJs with NPM installed and are to be executed from the project's root directory.

### Set up

```bash
npm install
```

### Run

```bash
npm run start
```

### Test

```bash
npm run test
```
