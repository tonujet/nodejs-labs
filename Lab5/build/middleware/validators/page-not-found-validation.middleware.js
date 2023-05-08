"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNotFoundValidationMiddleware = void 0;
function pageNotFoundValidationMiddleware(req, res, next) {
    res.status(404).send(`Could not find page with url: https://${req.hostname}${req.path}`);
}
exports.pageNotFoundValidationMiddleware = pageNotFoundValidationMiddleware;
