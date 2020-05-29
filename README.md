# london-user-list
Front end for querying an API for listing users in London and those within 50 miles of London.

## Workings
This solution uses the city endpoint of the API for getting users in London. 

For those outside the city but within 50 miles the solution assumes London to be a specific point (). The city endpoint is first called for London to find users to discount. Then the endpoint for retrieving all users is queried and the list of returned users iterated through. The solution can then find all those within 50 miles (using the  formula) who are not in the list of users previously returned from the city endpoint.

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
