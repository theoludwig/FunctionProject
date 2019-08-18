# FunctionProject
![Badge Status](https://cloud.divlo.fr/public_files/others/under_dev.svg)

[À propos de Divlo](https://divlo.fr/) | [Youtube](https://www.youtube.com/c/Divlo) | [Twitch](https://www.twitch.tv/divlofr) | [Twitter](https://twitter.com/Divlo_FR) | [Steam](https://steamcommunity.com/id/Divlo/) | [Discord](https://discordapp.com/invite/WWK2JPz)

## À propos de FunctionProject
[FunctionProject](https://function.divlo.fr/) est un projet créé par [Divlo](https://divlo.fr/) qui a pour but de rassembler plein de mini-programme (fonctions JavaScript) permettant de faire plusieurs choses comme **savoir la météo**, générer un **nombre aléatoire**, etc. 

Le projet est disponible sur [function.divlo.fr](https://function.divlo.fr/).

[Projet uniquement en français]

[![FunctionProject](https://cloud.divlo.fr/public_files/others/FunctionProject.png)](https://function.divlo.fr/)

## La liste des Fonctions Principales :   
| Nom | Description | Paramètre(s) |
| -- | -- | -- |
| **weatherRequest(url,toDo)** | Permet de faire une requête à l'API openweathermap.org. | - url : l'url avec le nom de la ville. - toDo : afficher l'heure uniquement ou aussi la météo ? |
| **randomNumber(min, max)** | Génère un nombre aléatoire entre un minimum inclus et un maximum inclus. | - min : Nombre Minimum - max : Nombre Maximum |
| **calculateAge(birthDate)** | Calcule l'âge de quelqu'un selon la date de naissance. | - birthDate : date de naissance au format (dd/mm/yyyy). |
| **convertTemperature(degree,unit)** | Convertit des Degré Celsius en Degré Fahrenheit et l'inverse aussi. | - degre : Le nombre que vous voulez convertir - unite : l'unité du nombre que vous voulez convertir (°C ou °F)	|
| **convertDistance (firstValue, unitFirstValue, unitFinalValue)** | Convertit la longueur (distance) avec les unités allant de picomètre au Téramètre. | - firstValue : Le nombre que vous voulez convertir - unitFirstValue : l'unité du nombre que vous voulez convertir - unitFinalValue : l'unité de votre nombre après la conversion	|

## La liste des Fonctions Annexes :   
| Nom | Description | Paramètre(s) |
| -- | -- | -- |
| **isEmptyValue(value)** | Vérifie si une valeur est vide. | - value : valeur à testé |
| **formatNumberResult(num)** | Formate les nombres avec des espaces (ex : 76120 = 76 120). | - num : nombre à formaté |
| **convertPuissanceToNumber(num)** | Convertit les puissances de 10 en nombre (ex: 1e+5 = 100 000). | - num : nombre à formaté |
| **capitalize (s)** | Majuscule à la 1ère lettre d'une string. | - s : string à formaté |
| **dateTimeUTC(utc)** | Donne la date et l'heure selon l'UTC (Universal Time Coordinated). | - utc : heure de décalage avec l'utc |
| **showDateTime(enteredOffset)** | Affiche la date et l'heure (format : dd/mm/yyyy - 00:00:00). | - enteredOffset : date à formaté |
| **realDateTime(id)** | Affiche l'heure en temps réel. | - id : l'id de votre span/div où vous voulez afficher l'heure en temps réel |
| **timeZone(json)** | Récupére le décalage en secondes à partir de l'heure UTC grâce à l'API openweathermap.org. | - json : le json de l'API |

