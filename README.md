# city-user-list
Front end for querying an API which lists users in a city and those nearby separately.

## Workings
This solution is currently configured to use the city endpoint of the supplied API for getting users in London. 

For those outside the city but within 50 miles the solution assumes London to be a specific point (51.509865, -0.118092). The city endpoint is first called for London to find users to discount. Then the endpoint for retrieving all users is queried and the list of returned users iterated through. The solution can then find all those within 50 miles (using the Haversine formula) who are not in the list of users previously returned from the city endpoint.

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
