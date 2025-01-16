function routeSearch(req, res) {
    console.log(req.query);

    if (req.query.global !== undefined) {
        console.log(req.query);
        req.url = "/search/global/?searchInput=" + req.query.global;

        req.app.handle(req, res);
    } else if (req.query.users !== undefined) {
        req.url = "/search/users?username=" + req.query.users;

        req.app.handle(req, res);
    } else if (req.query.posts !== undefined) {
        console.log(req.query);
        req.url = "/search/posts?title=" + req.query.posts;

        req.app.handle(req, res);
    }
}

export { routeSearch };
