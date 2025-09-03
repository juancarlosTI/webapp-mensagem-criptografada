import express from 'express';
import session from 'express-session';
import passport from 'passport';
import initializePassport from './user-session/manage.user-session.js';
import CriptografyRouter from './routes/criptografy.routes.js';
import UserRouter from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'
import { ensureAuth } from './middlewares/ensureAuth.middleware.js';
import { Strategy as LocalStrategy } from 'passport-local';
import cors from 'cors';
import './prisma/seed.js';

// Instancia do servidor
const app = express();
// Middleware para parse de JSON automaticamente
app.use(express.json());

app.use(cors({
    origin: 'http://127.0.0.1:8080', // origem que pode acessar
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // métodos permitidos
    credentials: true // permite envio de cookies/sessão
}));
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


passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'email' }, // Passport exige dois campos, mas vamos usar email em ambos
  async (emailInput, _ignored, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: emailInput } });
      if (!user) return done(null, false, { message: 'Usuário não encontrado' });
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));


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
