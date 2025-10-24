// Définition des 7 clés : titre, texte, réponses acceptées, indice doux, id suivante
window.PUZZLES = [
  {
    id: "1",
    title: "Clé I — Le Galet du Silence",
    riddle: `« Je roule entre les vagues et les tempêtes.
Je n’ai pas de bouche, pourtant on m’entend.
Quand on me tient dans la main, tout devient calme.
Qui suis-je, ou que portes-tu en toi quand tu me trouves ? »`,
    accepted: ["silence", "écoute", "ecoute"],
    hint: "Ce mot n’est pas dit mais il relie.",
    next: "2"
  },
  {
    id: "2",
    title: "Clé II — Le Miroir de l’Onde",
    riddle: `« Je ne dis jamais la vérité tout à fait,
pourtant sans moi tu ne saurais pas qui tu es.
J’imite tout ce que tu montres,
mais jamais ce que tu caches. »`,
    accepted: ["miroir", "reflet"],
    hint: "Regarder sans peur, c’est déjà commencer à guérir.",
    next: "3"
  },
  {
    id: "3",
    title: "Clé III — La Porte des Sens",
    riddle: `« Je ne parle pas, mais je fais frissonner.
On me cherche sur la peau, on me fuit quand je brûle.
Je rappelle un instant, un parfum, une caresse. »`,
    accepted: ["chaleur", "toucher"],
    hint: "Quand le corps se souvient, l’âme respire.",
    next: "4"
  },
  {
    id: "4",
    title: "Clé IV — Le Pont des Ombres",
    riddle: `« Je ne tiens que si tu me traverses.
Je relie ce que la peur sépare.
Je tremble parfois, mais sans moi, tu n’avances pas. »`,
    accepted: ["confiance"],
    hint: "Avancer, même si ça tremble.",
    next: "5"
  },
  {
    id: "5",
    title: "Clé V — L’Étoile de l’Espoir",
    riddle: `« Je brille sans feu.
Je guide sans ordre.
Tu ne me vois que dans la nuit. »`,
    accepted: ["étoile", "etoile", "espoir"],
    hint: "Une lueur suffit.",
    next: "6"
  },
  {
    id: "6",
    title: "Clé VI — Le Feu de l’Âme",
    riddle: `« Je dévore ou je réchauffe,
je peux blesser ou créer.
Certains me craignent, d’autres m’invoquent.
Quand je suis vrai, je ne détruis plus. »`,
    accepted: ["amour", "passion"],
    hint: "Le feu apprivoisé devient lumière.",
    next: "7"
  },
  {
    id: "7",
    title: "Clé VII — La Clé du Cœur",
    riddle: `« Sept clés t’ont ouvert sept portes.
Cherche entre elles ce qu’elles avaient en commun.
Ce n’est ni une promesse ni un serment,
mais un souffle qui continue malgré tout. »`,
    accepted: ["vie", "guérison", "guerison", "amour"],
    hint: "Un mot simple, et pourtant…",
    next: null
  }
];
