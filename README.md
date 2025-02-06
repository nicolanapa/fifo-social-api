# What is this?

lorem

## Features

ipsum

# How to run the API and front-end

First clone the [_api_](https://github.com/nicolanapa/fifo-social-api) (this) repository and then the [_front-end_](https://github.com/nicolanapa/fifo-social-frontend) repository

```
git clone https://github.com/nicolanapa/fifo-social-api.git
git clone https://github.com/nicolanapa/fifo-social-frontend.git
```

### API Configuration

You now need to create and setup a _.env_ at the root of **fifo-social-api** with these constants:
<br>
_You need to change the values that are commented with <>_
<br>
_\<x> is a suggested value / type, 'x' in the config .env equals x (no strings)_

<!-- Rework to a list of options for better reading -->

```
PORT=3000
DB_PASSWORD="<db password>"
DB_HOST="<ip>"
DB_USER="<user of choosen db>"
DB_PUBLIC_NAME="fifos_public"
DB_PRIVATE_NAME="fifos_private"
DB_PORT=5432
DB_CONNECTION_STRING="<whole string, use this if not using the above values expect for PORT>"
SSL="<leave empty if testing out or using a reverse proxy><'true'><'false'>"    **<not implemented currently>**
SECRET_SESSION="<random secure password used for session cookies (they're kept only for authentication purposes)>"
LENGTH_GENERATED_PASSWORD=<an integer value for the generated password length (36 character password * length), then the password is given to the user when they signup><'2'>
PRETTY_LOGGING=<used for testing purposes, leave it on true><'true'><'false'>
WRITE_ERROR_TO_FILE=<writes new errors to /logs when they'll happen><'true'><'false'>
CORS_ORIGIN="<'http://localhost:5173'>"
```

Create the two DBs (_fifos_private_ and _fifos_public_ (though you can name them however you want)) in PostgreSQL, then run `npm run startDb` in **fifo-social-api** to automatically create all the needed Tables.

### Front-end Configuration

You also need to create and setup a _.env_ at the root of **fifo-social-frontend** with these constants:
<br>
_You need to change the values that are commented with <>_
<br>
_\<x> is a suggested value / type, 'x' in the config .env equals x (no strings)_

<!-- Rework to a list of options for better reading -->

```
VITE_PORT=<'5173'>
VITE_ALLOWED_HOSTS="<leave empty, otherwise insert a domain where the dev environment will be hosted on><''>"
VITE_SERVER_DOMAIN=<set here the domain or ip where the API Server is running><'http://localhost'>
VITE_SERVER_PORT=<needs to be the same value as PORT in API's .env><'3000'>
VITE_SERVER_FULL_DOMAIN=<set here the domain or ip where the API Server is running with the port included><'http://localhost:3000'>   <these last three variables will be reworked>
```

### Ending of the configuration

Don't forget to `npm install` in both repos!

```
cd ./fifo-social-api
npm install

cd ./fifo-social-frontend
npm install
```

If everything's ready in the back-end section, then start the Server / API with

```
npm run startWatch
```

If you want to simply check if everything's working in **fifo-social-frontend** then run the vite's dev environment up there

```
npm run dev # or devHost
```

To host in production, you should run this in **fifo-social-frontend**:

```
npm run build
```

And it'll output files that can be accessed by a HTTP server or Hoster

## Requirements or suggested versions

You need to have both Node.js and npm installed for the building part (front-end) and running of the API

1. The tested npm and Node.js versions are
    - v22.13.1 (npm), so expect 22+ to be supported
    - 10.9.2 (Node.js), so expect 10.9+ to be supported
2. The tested PostgreSQL version is
    - 17.2, so expect 17+ to be supported

# Logs and Errors

You can find Errors and logs (only Errors are shown and supported for the moment) inside the root directory, **/logs**, under any yyyy-mm-dd-log.txt file

## Errors

If PostgreSQL is not accepting the connection / permission denied then make sure you've opened and allowed its port in the Firewall and config file
<br>
