/**
 * setup-admin.js
 * Execute: node setup-admin.js
 * Gera o hash bcrypt da senha do admin para colocar no .env
 */
const bcrypt = require('bcryptjs');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question('Digite a senha do admin: ', async (password) => {
  if (!password || password.length < 8) {
    console.error('❌ Senha deve ter ao menos 8 caracteres.');
    rl.close();
    return;
  }
  const hash = await bcrypt.hash(password, 10);
  console.log('\n✅ Hash gerado. Adicione ao seu .env:\n');
  console.log(`ADMIN_PASS_HASH=${hash}\n`);
  rl.close();
});
