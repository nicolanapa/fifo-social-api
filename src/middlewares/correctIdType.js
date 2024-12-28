function correctIdType(req, res, next) {
    if (req.params.genericId !== undefined) {
        if (
            Number.isInteger(parseInt(req.params.genericId)) &&
            req.params.genericId >= 1
        ) {
            return next();
        }
    }

    req.customError = "ID type is not a Number";

    next(new Error(req.params.genericId + " is not a Number"));
}

export { correctIdType };
