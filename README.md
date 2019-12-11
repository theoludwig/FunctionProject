# FunctionProject
![Badge Status](https://cloud.divlo.fr/public_files/others/Trash/under_dev.svg)

[À propos de Divlo](https://divlo.fr/) | [Youtube](https://www.youtube.com/c/Divlo) | [Twitch](https://www.twitch.tv/divlo) | [Twitter](https://twitter.com/Divlo_FR) | [E-mail](mailto:contact@divlo.fr)

## À propos de FunctionProject
[FunctionProject](https://function.divlo.fr/) est un projet créé par [Divlo](https://divlo.fr/) qui a pour but de rassembler plein de mini-programmes permettant de faire plusieurs choses comme **savoir la météo**, générer un **nombre aléatoire**, etc. 

Le projet est disponible sur [function.divlo.fr](https://function.divlo.fr/).

[![FunctionProject](./img/FunctionProject.png)](https://function.divlo.fr/)

## Installation
**Note :** Vous aurez besoin d’un serveur Apache pour utiliser PHP (exemple: [XAMPP](https://www.apachefriends.org)).

Cloner le dépôt en utilisant git :
```text
git clone https://github.com/Divlo/FunctionProject
```

Puis créer un nouveau fichier dans ```/php``` du nom  de ```keyVariable.php```, puis vous mettrez ce code à l'intérieur, il faudra modifier la valeur de la variable '$apiWeather' par votre clé d'api de [openweathermap.org](https://openweathermap.org/).
```php
<?php
$apiWeather = 'votre clé api pour openweathermap.org';
```

Sachez tout de même que vous ne pourrez pas utiliser la fonction linkShortener car elle dépend de [short-links.divlo.fr/](https://short-links.divlo.fr/).
Cependant, vous avez accès à la structure de la base de donnée dans ```/php/short_links.sql```.

Enjoy! =D

## Librairies
* [Fontawesome](https://fontawesome.com/) 
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [jQuery UI](https://jqueryui.com/)
* [Moment.js](https://momentjs.com/)
* [Marked.js](https://github.com/markedjs/marked)

## Documentation 
La documentation est disponible sur [function.divlo.fr/documentation](https://function.divlo.fr/documentation).
Dans la documentation, il y a la toutes les fonctions, ce qu'elles return, etc.

## Licence 
Ce projet est sous licence MIT - voir le fichier [LICENSE](./LICENSE) pour plus de détails.