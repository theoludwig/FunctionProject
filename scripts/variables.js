/* LES VARIABLES */

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
      quote: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
      source: "Albert Einstein"
    },
    {
      quote:"Be the change that you wish to see in the world.",
      source: "Mahatma Gandhi"
    },
    {
      quote:"Vote for the man who promise least, he'll be the least disappointing.",
      source:"Bernard Baruch"
    },
    {
      quote:"Hard work beats talent when talent doesn't work hard.",
      source:"Tim Notke"
    },
    {
      quote:"You want to wake up in the morning and think the future is going to be great - and that's what being a spacefaring civilization is all about. It's about believing in the future and thinking that the future will be better than the past. And I can't think of anything more exciting than going out there and being among the stars",
      source:"Elon Musk, SpaceX"
    }
  ];