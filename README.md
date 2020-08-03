<h1 align="center"><a href="https://function.divlo.fr/">FunctionProject</a></h1>

<p align="center">
  <strong>Apprenez la programmation grâce à l'apprentissage par projet alias fonction.</strong>
</p>

<p align="center">
  <a href="https://gitmoji.carloscuesta.me/"><img src="https://camo.githubusercontent.com/2a4924a23bd9ef18afe793f4999b1b9ec474e48f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6769746d6f6a692d253230f09f989c253230f09f988d2d4646444436372e7376673f7374796c653d666c61742d737175617265" alt="Gitmoji"/></a>
  <a href="https://standardjs.com"><img alt="JavaScript Style Guide" src="https://img.shields.io/badge/code_style-standard-brightgreen.svg"/></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/licence-MIT-blue.svg" alt="Licence MIT"/></a>
  <img src="https://img.shields.io/github/stars/Divlo/FunctionProject?style=social" alt="Stars">
  <br/> <br/>
  <a href="https://function.divlo.fr/"><img src="https://raw.githubusercontent.com/Divlo/FunctionProject/master/.github/FunctionProject.png" alt="FunctionProject" /></a>
</p>

## ⚙️ À propos

**FunctionProject** regroupe plein de **fonctions** sous différentes catégories. Chaque fonction dispose d'une partie "**Utilisation**", et d'une partie "**Article**" pour expliquer le code de celle-çi (le plus souvent, le code est rédigé en **Javascript**).

En plus de présenter des fonctions, FunctionProject est un **blog** ce qui permet la publication d'article à propos du **développement web** et plus généralement de la **programmation informatique**.

Si vous aimez le projet, vous pouvez aider à **le faire connaître** en utilisant [#FunctionProject](https://twitter.com/hashtag/FunctionProject) sur **Twitter**. 🐦

Les dernières versions publiées : [https://github.com/Divlo/FunctionProject/releases](https://github.com/Divlo/FunctionProject/releases)

Le projet est disponible sur [function.divlo.fr](https://function.divlo.fr/) (actuellement en version 2.0).

## 🚀 Open Source 

Le partage est essentiel afin de progresser, l'**Open Source** permet l'entraide et le **partage de connaissance** entre développeurs.

Si vous voulez **contribuer**, avant toute chose écrivez une **"[issue](https://github.com/Divlo/FunctionProject/issues)" sur GitHub** à propos des changements que vous voulez apporter et on pourra en **discuter avec grand plaisir**. 😉

## 🌐 Installation

**Note :** En installant, la version locale vous n'aurez pas accès aux données. Seulement une **base de donnée vide**.

Si vous voulez avoir les données des catégories et des fonctions, vous pouvez d'abord lancer l'API pour que Sequelize crée les tables SQl et ensuite exécuter le fichier SQL [backup.sql](./.github/backup.sql).

### Prérequis :

- NodeJS (et npm) → version récente
- Base de donnée MySQL → J'utilise Wamp ce qui me permet d'avoir phpmyadmin.

### Commandes (à suivre dans l'ordre) :

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

Vous devrez ensuite configurer l'API en créant un fichier `.env` à la racine du dossier `/api` et prendre exemple du fichier `.env.example` avec votre configuration.

### Lancer l'environnement de développement : 

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

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](./LICENSE) pour plus de détails.