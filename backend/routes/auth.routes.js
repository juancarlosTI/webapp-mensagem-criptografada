import Router from 'express'
import passport from 'passport';

const router = Router()

// --- Rotas ---
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).send(info.message)

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.send(`Olá ${user.username}, login realizado!`);
        });
    })(req, res, next);

});

router.post('/logout', (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).send('Erro no logout');
        res.send('Logout realizado com sucesso!');
    });
});

router.get('/perfil', (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).send('Não autorizado');
    res.send(`Perfil do usuário: ${req.user.username}`);
});

export default router;