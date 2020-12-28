<h1 align="center"><a href="https://function.divlo.fr/">FunctionProject</a></h1>

<p align="center">
  <strong>Apprenez la programmation grâce à l'apprentissage par projet alias fonction.</strong>
</p>

<p align="center">
  <a href="https://github.com/Divlo/FunctionProject/actions?query=workflow%3A%22Node.js+CI%22"><img src="https://github.com/Divlo/FunctionProject/workflows/Node.js%20CI/badge.svg" alt="Node.js CI" /></a>
  <a href="https://standardjs.com"><img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg" alt="Conventional Commits" /></a>
  <a href="./.github/CODE_OF_CONDUCT.md"><img src="https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg" alt="Contributor Covenant" /></a>
  <br/> <br/>
  <a href="https://function.divlo.fr/"><img src="https://raw.githubusercontent.com/Divlo/FunctionProject/master/.github/images/FunctionProject.png" alt="FunctionProject" /></a>
</p>

## ⚙️ À propos

**FunctionProject** regroupe plein de **fonctions** sous différentes catégories. Chaque fonction dispose d'une partie "**Utilisation**", et d'une partie "**Article**" pour expliquer le code de celle-çi (le plus souvent, le code est rédigé en **Javascript**).

En plus de présenter des fonctions, FunctionProject est un **blog** ce qui permet la publication d'article à propos du **développement web** et plus généralement de la **programmation informatique**.

Si vous aimez le projet, vous pouvez aider à **le faire connaître** en utilisant [#FunctionProject](https://twitter.com/hashtag/FunctionProject) sur **Twitter**. 🐦

Les dernières versions publiées : [https://github.com/Divlo/FunctionProject/releases](https://github.com/Divlo/FunctionProject/releases)

Le projet est disponible sur [function.divlo.fr](https://function.divlo.fr/) (actuellement en version 2.3).

## 🚀 Open Source

Le partage est essentiel afin de progresser, l'**Open Source** permet l'entraide et le **partage de connaissance** entre développeurs.

Si vous voulez **contribuer**, avant toute chose écrivez une **"[issue](https://github.com/Divlo/FunctionProject/issues)" sur GitHub** à propos des changements que vous voulez apporter et on pourra en **discuter avec grand plaisir**. 😉

## 🌐 Installation

**Note :** En installant, la version locale vous n'aurez pas accès aux données. Seulement une **base de donnée vide**.

Si vous voulez avoir les données des catégories et des fonctions, vous pouvez d'abord lancer l'API pour que Sequelize crée les tables SQl et ensuite exécuter le fichier SQL [backup.sql](./.github/backup.sql).

### Prérequis :

- [Node.js](https://nodejs.org/) >= 14
- [npm](https://www.npmjs.com/) >= 6
- [MySQL](https://www.mysql.com/) >= 8.0

### Commandes (à suivre dans l'ordre)

```sh
# Cloner le projet
git clone https://github.com/Divlo/FunctionProject.git FunctionProject

# Aller à la racine du projet
cd FunctionProject

# Installer les packages/dépendances
cd ./api
npm install
cd ../website
npm install
```

Vous devrez ensuite configurer les variables d'environnements en créant un fichier `.env` à la racine du dossier `/api`, `/website` et `s.divlo.fr` pour prendre exemple du fichier `.env.example` avec votre configuration.

### Lancer l'environnement de développement

#### Avec [docker](https://www.docker.com/)

```sh
# Setup and run all the services for you
docker-compose up --build
```

**Services started :**

- api : `http://localhost:8080`
- s.divlo.fr : `http://localhost:7000`
- website : `http://localhost:3000`
- [phpmyadmin](https://www.phpmyadmin.net/) : `http://localhost:8000`
- [MailDev](https://maildev.github.io/maildev/) : `http://localhost:1080`
- [MySQL database](https://www.mysql.com/) (with PORT 3006)

#### Sans docker

Dans deux terminals séparés :

- Lancer le front-end en allant dans `/website`

```sh
npm run dev # front-end lancé sur http://localhost:3000
```

- Lancer l'api en allant dans `/api`

```sh
npm run dev # API lancé sur http://localhost:8080
```

Enjoy! 😃

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## 📄 License

[MIT](./LICENSE)
