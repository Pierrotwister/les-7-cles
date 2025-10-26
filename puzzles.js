// Définition des 7 clés : titre, texte, réponses acceptées, indice doux, id suivante
window.PUZZLES = [
  {
    id: "1",
    title: "Clé I — Le Galet du Silence",
    riddle: `« Je dors entre les vagues, tranquille.
Je n’ai pas besoin de mots pour me faire entendre.
Quand on me tient, tout se pose un instant. »`,
    accepted: ["silence", "écoute", "ecoute"],
    hint: "Ce mot n’est pas dit mais il relie.",
    next: "2"
  },
  {
    id: "2",
    title: "Clé II — Le Miroir de l’Onde",
    riddle: `« Je reflète sans rien dire.
Je montre ce qu’on me donne, jamais ce qu’on me cache.
Si tu me regardes avec douceur, tu te verras autrement. »`,
    accepted: ["miroir", "reflet"],
    hint: "Cherche ce qui réchauffe sans feu, ce qu’on sent sur la peau.",
    next: "3"
  },
  {
    id: "3",
    title: "Clé III — La Porte des Sens",
    riddle: `« Je ne parle pas, mais je réconforte.
On me trouve dans un sourire, un regard, un geste simple.
Je réveille la douceur quand le froid s’installe. »`,
    accepted: ["chaleur", "toucher", "coeur", "douceur", "cœur", "tendresse"],
    hint: "Quand le corps se souvient, l’âme respire.",
    next: "4"
  },
  {
    id: "4",
    title: "Clé IV — Le Pont des Ombres",
    riddle: `« Je relie ce qui s’éloigne.
Je tremble parfois, mais je tiens bon quand on ose me traverser.
Je suis ce fil invisible entre la peur et le courage. »`,
    accepted: ["confiance"],
    hint: "Avancer, même si ça tremble.",
    hint2: "Ce n’est pas du courage : c’est ce qui le rend possible. On la donne, on la gagne, on la perd parfois.",
    next: "5"
  },
  {
    id: "5",
    title: "Clé V — L’Étoile de l’Espoir",
    riddle: `« Je brille sans feu.
Je ne parle pas, je guide.
Tu ne me vois que dans la nuit. »`,
    accepted: ["étoile", "etoile", "espoir"],
    hint: "Une lueur suffit.",
    next: "6"
  },
  {
    id: "6",
    title: "Clé VI — Le Feu de l’Âme",
    riddle: `« Je brûle sans blesser.
Je réchauffe sans consumer.
Quand je suis sincère, je ne détruis rien. »`,
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
    hint2: "Ce mot n’exige rien : il apaise, accepte et laisse vivre. Cherche ce qui soigne sans posséder.",
    next: null
  }
];
