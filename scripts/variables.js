/* LES VARIABLES */

let chemin = window.location.pathname;

/* Messages d'erreur */
const emptyMessageError = "Vous ne pouvez pas rentré de valeur vide.";
const messageError = "Vous n'avez pas rentré de valeur valide.";

/* Varibales pour les fonctions */
let timeNow = new Date();
let utcOffset = timeNow.getTimezoneOffset();
timeNow.setMinutes(timeNow.getMinutes() + utcOffset);

// Variable pour randomQuote
const quotes = [
    {
      quote:"Rêver, c’est ce qu’un humain peut faire de mieux.",
      source:"Divlo"
    },
    {
      quote: "Deux choses sont infinies: l'univers et la bêtise humaine; et je ne suis pas sûr de l'univers.",
      source: "Albert Einstein"
    },
    {
      quote: "Exige beaucoup de toi-même et attends peu des autres. Ainsi beaucoup d'ennuis te seront épargnés.",
      source: "Confucius"
    },
    {
      quote:"Soyez le changement que vous souhaitez voir dans le monde.",
      source: "Mahatma Gandhi"
    },
    {
      quote:"Fais de ta vie un rêve, et d'un rêve, une réalité.",
      source: "Antoine de Saint-Exupéry"
    },
    {
      quote: "La vie est un défi à relever, un bonheur à mériter, une aventure à tenter.",
      source: "Mère Teresa"
    },
    {
      quote:"Un sourire coûte moins cher que l'électricité, mais donne autant de lumière.",
      source:"Abbé Pierre"
    },
    {
      quote: "N'essayez pas de devenir un homme qui a du succès. Essayez de devenir un homme qui a de la valeur.",
      source: "Albert Einstein"
    },
    {
      quote:"Notre plus grande gloire n'est point de tomber, mais de savoir nous relever chaque fois que nous tombons.",
      source:"Confucius"
    },
    {
      quote:"Votez pour l'homme qui promet le moins, il sera le moins décevant.",
      source:"Bernard Baruch"
    },
    {
      quote:"Ne dis pas peu de choses en beaucoup de mots, mais dis beaucoup de choses en peu de mots.",
      source:"Pythagore"
    },
    {
      quote:"Le travail acharné bat le talent quand le talent ne travaille pas dur.",
      source:"Tim Notke"
    },
    {
      quote:"Choisissez un travail que vous aimez et vous n'aurez pas à travailler un seul jour de votre vie.",
      source:"Confucius"
    },
    {
      quote:"Vous voulez vous lever le matin en pensant que l'avenir sera formidable - et c'est en cela que réside le fait d'être une civilisation à la conquête de l'espace. Il s'agit de croire en l'avenir et de penser que celui-ci sera meilleur que le passé. Et je ne peux rien trouver de plus excitant que d’être parmi les étoiles.",
      source:"Elon Musk"
    }
  ];