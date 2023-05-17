function pageNotFoundValidationMiddleware(req, res, next) {
    res.status(404).send(`Could not find page with url: https://${req.hostname}${req.path}`);
}
export { pageNotFoundValidationMiddleware };
