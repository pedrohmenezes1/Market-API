#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const exec = util.promisify(require('child_process').exec);
async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch {
    (error) => {
      console.log(error);
    };
  }
}

async function hasYarn() {
  try {
    await execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (process.argv.length < 3) {
  console.log('Especifique o diretório do projeto de destino.');
  console.log('Por exemplo:');
  console.log('    npx create-nodejs-app meu-app');
  console.log('    Ou');
  console.log('    npm init nodejs-app meu-app');
  process.exit(1);
}

const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/pedrohmenezes1/Market-API.git';

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log('O diretório já existe. Escolha outro nome para o projeto.');
  } else {
    console.log(error);
  }
  process.exit(1);
}

async function setup() {
  try {
    console.log(`Baixando arquivos do repositório. ${repo}`);
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
    console.log('Clonado com sucesso.');
    console.log('');

    process.chdir(appPath);

    const useYarn = await hasYarn();
    console.log('Instalando dependências...');
    if (useYarn) {
      await runCmd('yarn install');
    } else {
      await runCmd('npm install');
    }
    console.log('Dependências instaladas com sucesso.');
    console.log();

    fs.copyFileSync(path.join(appPath, '.env.example'), path.join(appPath, '.env'));
    console.log('Environment files copied.');

    await runCmd('npx rimraf ./.git');

    fs.unlinkSync(path.join(appPath, 'CHANGELOG.md'));
    fs.unlinkSync(path.join(appPath, 'bin', 'nodeApp.js'));
    fs.rmdirSync(path.join(appPath, 'bin'));
    if (!useYarn) {
      fs.unlinkSync(path.join(appPath, 'yarn.lock'));
    }

    console.log('A instalação foi concluída!');
    console.log();

    console.log('Sugerimos que você comece digitando:');
    console.log(`    cd ${folderName}`);
    console.log(useYarn ? '    yarn dev' : '    npm run dev');
    console.log();
    console.log('Veja README.md para mais informações');
  } catch (error) {
    console.log(error);
  }
}

setup();
