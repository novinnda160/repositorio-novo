import bcrypt from 'bcryptjs';

const password = 'admialevar'; // A senha que você quer criptografar
bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`Senha criptografada: ${hash}`);
});
