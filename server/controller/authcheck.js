module.exports = (req, res, next) => {
    if (['/', '/api/login', '/api/new-user'].includes(req.path)) {
        return next()
    }
    if (req.session && req.session.user) {
        return next()
    }
    return res.status(401).send("unauthorized");
}