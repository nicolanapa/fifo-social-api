# What is this?

lorem

# How to run it

First clone the [_api_](https://github.com/nicolanapa/fifo-social-api) (this) repository and then the [_front-end_](https://github.com/nicolanapa/fifo-social-frontend) repository

```
git clone https://github.com/nicolanapa/fifo-social-api.git
git clone https://github.com/nicolanapa/fifo-social-frontend.git
```

You now need to setup a _.env_ at the root of **fifo-social-api** with these constants:
<br>
You need to change values that are commented out with <>

```
PORT=3000
DB_PASSWORD="<db password>"
DB_HOST="<ip>"
DB_USER="<user of choosen db>"
DB_PUBLIC_NAME="fifos_public"
DB_PRIVATE_NAME="fifos_private"
DB_PORT=5432
DB_CONNECTION_STRING="<whole string, use this if not using the above values>"
SSL="<leave empty if testing out or using a reverse proxy><'true'><'false'>"
SECRET_SESSION="<random secure password>"
LENGTH_GENERATED_PASSWORD=2
PRETTY_LOGGING=true
WRITE_ERROR_TO_FILE=true
CORS_ORIGIN="<'http://localhost:5173'>"
```

Create the two DB, _fifos_private_ and _fifos_public_ (though you can name them however you want), and run `npm run startDb` in **fifo-social-api**
<br>
Don't forget to `npm install` in both repos!

```
cd ./fifo-social-api
npm install

cd ./fifo-social-frontend
npm install
```

If you want to simply check if everything's running, run with vite in **fifo-social-frontend**

```
npm run dev # or devHost
```

Then to host in production, you should do in **fifo-social-frontend**:

```
npm run build
```

## Requirements

```

```

# Logs and Errors
