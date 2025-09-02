// middlewares/auth.middleware.js
export function ensureAuth(req, res, next) {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ error: "Não autorizado. Faça login primeiro." });
}
