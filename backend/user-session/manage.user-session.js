
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

// MOCK

const users = [
    { id: 1, username: 'admin', password: '1234' },
    { id: 2, username: 'user', password: 'abcd' }
];


export default function initializePassport() {
    passport.use(new LocalStrategy((username, password, done) => {
        // Verificação (no futuro, acessar DB)
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return done(null, false, { message: 'Usuário ou senha inválidos' });
        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id); // salva o id na sessão
    });

    passport.deserializeUser((id, done) => {
        const user = users.find(u => u.id === id);
        done(null, user || false);
    });
}