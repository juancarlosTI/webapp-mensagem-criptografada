import express from 'express';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './user-session/manage.user-session.js';
import CriptografyRouter from './routes/criptografy.routes.js';
import UserRouter from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'
import { ensureAuth } from './middlewares/ensureAuth.middleware.js';
import './prisma/seed.js';

// Instancia do servidor
const app = express();
// Middleware para parse de JSON automaticamente
app.use(express.json());

// Sessão
app.use(session({
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // true se usar HTTPS
}));

app.get('/', (req,res) => {
    return res.send('Bem vindo')
})


initializePassport();       // Configura estratégias
app.use(passport.initialize());
app.use(passport.session());

// Rotas de login
app.use('/auth', authRoutes);

// Autenticação
app.use(ensureAuth);

// Rota para serviço de criptografia
app.use('/criptografia', CriptografyRouter);

// Rota para serviço de user
app.use('/usuario', UserRouter);




// Inicia o servidor
app.listen(3000, () => console.log("Servidor Express rodando na porta 3000"));
