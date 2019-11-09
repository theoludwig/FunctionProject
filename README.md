# FunctionProject
![Badge Status](https://cloud.divlo.fr/public_files/others/Trash/under_dev.svg)

[À propos de Divlo](https://divlo.fr/) | [Youtube](https://www.youtube.com/c/Divlo) | [Twitch](https://www.twitch.tv/divlo) | [Twitter](https://twitter.com/Divlo_FR) | [E-mail](mailto:contact@divlo.fr)

## À propos de FunctionProject
[FunctionProject](https://function.divlo.fr/) est un projet créé par [Divlo](https://divlo.fr/) qui a pour but de rassembler plein de mini-programmes permettant de faire plusieurs choses comme **savoir la météo**, générer un **nombre aléatoire**, etc. 

Le projet est disponible sur [function.divlo.fr](https://function.divlo.fr/).

[Projet uniquement en français]

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

Enjoy! =D

## Librairies
* [Fontawesome](https://fontawesome.com/) 
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [jQuery UI](https://jqueryui.com/)
* [Moment.js](https://momentjs.com/)

## La liste des Fonctions Principales :
> Les fonctions principales se trouvent dans /scripts/fonctions_principales.js, n'hésitez pas à reprendre les fonctions pour vos projets personnels.

| Nom | Description | Paramètre(s) |
| -- | -- | -- |
| **weatherRequest()** | Affiche la météo et l'heure locale grâce à l'API : [openweathermap.org](https://openweathermap.org/). | Aucun paramètre, le nom de la ville où il faut récupérer la météo se récupère en php grâce au cookie fait en Javascript (voir main.js) |
| **randomNumber(min, max)** | Génère un nombre aléatoire entre un minimum inclus et un maximum inclus. | - min : Nombre Minimum - max : Nombre Maximum |
| **calculateAge(birthDate)** | Calcule l'âge de quelqu'un selon ça date de naissance. | - birthDate : date de naissance au format (dd/mm/yyyy). |
| **convertTemperature(degree,unit)** | Convertit des Degré Celsius en Degré Fahrenheit et l'inverse aussi. | - degre : Le nombre que vous voulez convertir - unite : l'unité du nombre que vous voulez convertir (°C ou °F)	|
| **convertDistance (firstValue, unitFirstValue, unitFinalValue)** | Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre. | - firstValue : Le nombre que vous voulez convertir - unitFirstValue : l'unité du nombre que vous voulez convertir - unitFinalValue : l'unité de votre nombre après la conversion	|
| **filterStudents(filteredLetter, students)** | Affiche uniquement les prénoms (qui sont dans la liste) qui commence par la lettre souhaitée. | - filteredLetter : la lettre à filtré - students : la liste des prénoms  |
| **randomQuote()** | Génère aléatoirement une citation ou un proverbe. | Aucun paramètre  |
| **convertCurrency(value, currency, url)** | Convertis une valeur dans une devise dans une autre devise grâce à l'API [exchangeratesapi.io](https://exchangeratesapi.io/). | - value : la valeur à convertir - currency : la devise à avoir après conversion - url : l'url de la requête à l'API en fonction du paramètre dans l'url '?base=' |
| **convertArabicToRoman(nombre)** | Convertis un nombre arabe en nombre romain. | - nombre : le nombre à convertir  |
| **convertRomanToArabic(str)** | Convertis un nombre romain en nombre arabe. | - str : le nombre romain à convertir  |
| **armstrongNumber(nombre)** | Vérifie si un nombre fait partie des nombres d'Armstrong. | - nombre : le nombre à tester  |
| **stringPermutations(string)** | Retourne un tableau contenant toutes les possibilités d'anagramme d'un mot | - string : le mot  |

## La liste des Fonctions Annexes :  
> Les fonctions annexes se trouvent dans /scripts/fonctions_annexes.js, n'hésitez pas à reprendre les fonctions pour vos projets personnels.

| Nom | Description | Paramètre(s) |
| -- | -- | -- |
| **isEmptyValue(value)** | Vérifie si une valeur est vide. | - value : valeur à testé |
| **formatNumberResult(num)** | Formate les nombres avec des espaces (ex : 76120 = 76 120). | - num : nombre à formaté |
| **isFloat(value)** | Vérifie si une string est un float (integer exclu).  | - value : valeur à testé |
| **convertPuissanceToNumber(num)** | Convertit les puissances de 10 en nombre (ex: 1e+5 = 100 000). | - num : nombre à formaté |
| **capitalize (s)** | Majuscule à la 1ère lettre d'une string. | - s : string à formaté |
| **dateTimeUTC(utc)** | Donne la date et l'heure selon l'UTC (Universal Time Coordinated). | - utc : heure de décalage avec l'utc |
| **showDateTime(enteredOffset)** | Affiche la date et l'heure (format : dd/mm/yyyy - 00:00:00). | - enteredOffset : date à formaté |
| **realDateTime(id)** | Affiche l'heure en temps réel. | - id : l'id de votre span/div où vous voulez afficher l'heure en temps réel |
| **isValidDate(s)** | Vérifie si une date est valide par rapport à la date d'aujourd'hui.  | - s : la date à verifier (format : dd/mm/yyyy) |
| **createSessionCookie(name, value)** | Créer un cookie de session  | - name : nom du cookie - value : valeur du cookie |

## License 
Ce projet est sous licence MIT - voir le fichier [LICENSE](./LICENSE) pour plus de détails.