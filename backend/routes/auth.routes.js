import Router from 'express'
import passport from 'passport';

const router = Router()
// Rotas
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ message: info.message });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ id: user.id, nome: user.nome, email: user.email });
        });
    })(req, res, next);
});

router.post('/auth/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).send('Erro no logout');
        res.send('Logout realizado!');
    });
});

router.get('/auth/perfil', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Não autorizado');
    res.json({ id: req.user.id, nome: req.user.nome, email: req.user.email });
});

export default router;