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
const quotes = 
[
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
    },
    {
      quote:"Si vous ne pouvez expliquer un concept à un enfant de six ans, c'est que vous ne le comprenez pas complètement.",
      source:"Albert Einstein"
    },
    {
      quote:"C'est normal de ne pas savoir. Ce n'est pas parce que tu ne sais pas comment faire que tu es un mauvais développeur.",
      source:"Développeur Libre"
    },
    {
      quote:"Si vous êtes en train de changer le monde, votre travail porte sur des choses importantes. Si bien que vous êtes excités dès que vous vous levez le matin.",
      source:"Larry Page"
    },
    {
      quote:"Innover, c'est savoir abandonner des milliers de bonnes idées.",
      source:"Steve Jobs"
    },
    {
      quote:"Les détails comptent, il vaut mieux attendre de les maîtriser.",
      source:"Steve Jobs"
    },
    {
      quote:"Dans un monde qui évolue très vite, la seule stratégie qui est vouée à l'échec de façon garantie est de ne pas prendre de risques.",
      source:"Mark Zuckerberg"
    },
    {
      quote:"Si vous vous décidez à n'entreprendre que des choses dont vous êtes sûr qu’elles vont réussir, vous allez manquer tout un tas d' opportunités.",
      source:"Jeff Bezos"
    },
    {
      quote:"L'enseignement devrait être ainsi : celui qui le reçoit le recueille comme un don inestimable mais jamais comme une contrainte pénible.",
      source:"Albert Einstein"
    },
    {
      quote:"Vous devez être prêt à être mal compris si vous décidez d’innover.",
      source:"Jeff Bezos"
    },
    {
      quote:"Vos clients les plus malheureux sont votre meilleure source d'apprentissage.",
      source:"Bill Gates"
    },
    {
      quote:"Tout le monde a une idée. Mais il s’agit surtout de la mettre à exécution et d’attirer d’autres personnes pour vous aider à travailler et améliorer cette idée.",
      source:"Jack Dorsey"
    },
    {
      quote:"Ne fais jamais rien contre ta conscience, même si l'Etat te le demande.",
      source:"Albert Einstein"
    },
    {
      quote:"Un problème sans solution est un problème mal posé.",
      source:"Albert Einstein"
    },
    {
      quote:"Personne n’est trop vieux pour se fixer un nouvel objectif ou réaliser de nouveaux rêves.",
      source:"Les Brown"
    },
    {
      quote:"La seule façon de faire du bon travail est d’aimer ce que vous faites. Si vous n’avez pas encore trouvé, continuez à chercher.",
      source:"Steve Jobs"
    },
    {
      quote:"Un pessimiste voit la difficulté dans chaque opportunité, un optimiste voit l’opportunité dans chaque difficulté.",
      source:"Winston Churchill"
    },
    {
      quote:"Les gagnants trouvent des moyens, les perdants des excuses.",
      source:"F. D. Roosevelt"
    },
    {
      quote:"La plus grande erreur que puisse faire un homme est d’avoir peur d’en faire une.",
      source:"Elbert Hubbard"
    },
    {
      quote:"J’ai décidé d’être heureux parce que c’est bon pour la santé.",
      source:"Voltaire"
    },
    {
      quote:"Pour ce qui est de l’avenir, il ne s’agit pas de le prévoir, mais de le rendre possible.",
      source:"Antoine de Saint-Exupéry"
    },
    {
      quote:"Celui qui veut atteindre un objectif lointain doit faire de petits pas.",
      source:"Saul Bellow"
    },
    {
      quote:"Il n’y a pas de réussites faciles ni d’échecs définitifs.",
      source:"Marcel Proust"
    },
    {
      quote:"Hier n’existe plus , demain ne viendra peut-être jamais. Il n’y a que le miracle du moment présent, savoure-le. C’est un cadeau!",
      source:"Marie Stilkind"
    },
    {
      quote:"Il faut viser la lune, parce qu’au moins, si vous échouez, vous finirez dans les étoiles.",
      source:"Oscar Wilde"
    },
    {
      quote:"Celui qui veut réussir trouve un moyen. Celui qui veut rien faire trouve une excuse.",
      source:"Proverbe"
    },
    {
      quote:"Vous ne trouverez jamais ce que vous ne cherchez pas.",
      source:"Confucius"
    },
    {
      quote:"Si vous pouvez le rêver, vous pouvez le faire.",
      source:"Walt Disney"
    },
    {
      quote:"La persévérance, c’est ce qui rend l’impossible possible, le possible probable et le probable réalisé.",
      source:"Léon Trotsky"
    },
    {
      quote:"Il n’y a qu’une façon d’échouer, c’est d’abandonner avant d’avoir réussi.",
      source:"Georges Clémenceau"
    },
    {
      quote:"La folie, c’est de refaire la même chose et d’en attendre un résultat différent.",
      source:"Albert Einstein"
    },
    {
      quote:"L’échec n’est qu’une opportunité pour recommencer la même chose plus intelligemment.",
      source:"Henry Ford"
    },
    {
      quote:"Rien n'est plus puissant qu'une idée dont l'heure est venue.",
      source:"Victor Hugo"
    }
];