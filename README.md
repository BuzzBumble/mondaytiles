# Monday Tiles
For the [Monday Apps Challenge ](https://mondayappsteams.devpost.com/ "Monday Apps Challenge ")

*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

## Basic Setup
Clone and install
```
$ git clone git@github.com:BuzzBumble/mondaytiles.git
$ cd mondaytiles
$ npm i
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode and exposes an ngrok URL.
* Defaults to [localhost:8301](http://localhost:8301 "localhost:8301")
* Get the exposed ngrok URL from [localhost:4040](http://localhost:4040 "localhost:4040")

### `npm run local`

Runs server locally without `ngrok`
You can manually run ngrok with `ngrok http 8301`

### `npm test`
* *tests not yet implemented*

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Environment Variables
`.env` can be created to add environment variables
* Prefix variable name with `REACT_APP_` to use within the app

**Variables currently in use:**
```
BROWSER=none // Prevents opening a new window/tab in browser when server starts
REACT_APP_API_TOKEN=[token] // For querying the API outside of the live preview
EXTEND_ESLINT=true // Tells create-react-app to let us extend the eslint config
```
