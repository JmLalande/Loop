/* La banque de séries. Deux lignes par jour.

   DAYS est la ligne principale, et chaque entrée parle d'une durée qui
   correspond au jour auquel elle est associée. Le jour 47 reçoit un siège qui a
   duré 47 jours. L'idée : le nombre à l'écran et le nombre dans la phrase sont
   le même nombre, donc le fait se lit comme une mesure de la série au lieu
   d'une anecdote tombée là par hasard. Une entrée qui ne colle pas à sa clé va
   dans POOL, aussi bonne soit-elle.

   POOL est la ligne bonus : des faits sans durée dedans, ou avec une durée qui
   ne correspond à aucun jour. Rien ne se répète tant que la banque au complet
   n'a pas été dépensée.

   Ni l'une ni l'autre ne parle jamais de cette application. ---------------- */
"use strict";

/* Associé à un nombre de jours exact. Les jours 1 à 100 sont couverts sans
   trou. Après, seulement les nombres qui valent la peine d'être atteints. Un
   jour sans entrée emprunte à POOL. */
const DAYS = {
  1:  "La guerre anglo-zanzibarite de 1896 a duré 38 minutes. Tu viens déjà de durer plus longtemps qu'une guerre.",
  2:  "Le Vésuve a mis environ deux jours à ensevelir Pompéi en l'an 79. La plus grande partie de la ville est morte dans les quinze premières minutes du deuxième matin.",
  3:  "Apollo 11 a mis trois jours juste pour se rendre à la Lune.",
  4:  "Le grand incendie de Londres a brûlé quatre jours en 1666 et détruit 13 200 maisons. Six morts ont été recensés.",
  5:  "Le premier voyage du Titanic, qui a aussi été le seul, a duré quatre jours et quatorze heures.",
  6:  "La guerre des Six Jours. Tu viens de l'égaler.",
  7:  "Ranulph Fiennes a couru sept marathons sur sept continents en sept jours, à 59 ans, quatre mois après une crise cardiaque et un double pontage.",
  8:  "Apollo 11 est allé sur la Lune et est revenu en 8 jours, 3 heures et 18 minutes. Ça fait maintenant plus longtemps que tu t'entraînes que tout l'alunissage a duré.",
  9:  "Le Rutan Voyager a fait le tour du monde sans atterrir ni refaire le plein en 9 jours et 3 minutes, en 1986. La cabine avait la taille d'une cabine téléphonique.",
  10: "Toutes les papilles de ta langue ont été remplacées depuis que tu as commencé. Elles se renouvellent à peu près aux dix jours.",
  11: "Randy Gardner est resté éveillé 11 jours en 1964 pour une expo-sciences d'école. Le record a été retiré, jugé trop dangereux à tenter.",
  12: "Apollo 17, la dernière fois que quelqu'un a quitté l'orbite basse, a duré 12 jours et 14 heures. Personne n'y est retourné depuis 1972.",
  13: "La crise des missiles de Cuba a duré treize jours en octobre 1962. Personne n'a beaucoup dormi.",
  14: "Deux semaines. La Lune est passée de pleine à nouvelle depuis que tu as commencé.",
  15: "Hannibal a mis quinze jours à traverser les Alpes en 218 av. J.-C. Trente-sept éléphants sont entrés et un seul a survécu au premier hiver en Italie.",
  16: "Shackleton a traversé 1 300 km d'océan Austral en chaloupe ouverte, jusqu'en Géorgie du Sud, en 16 jours. Quatre relevés au sextant pour toute navigation.",
  17: "Les 33 mineurs chiliens ont passé 17 jours coincés avant que quiconque en surface sache qu'ils étaient vivants.",
  18: "Louis Washkansky, le premier homme à recevoir une greffe du coeur, a vécu 18 jours. Le chirurgien a réessayé un mois plus tard et ce patient-là a vécu dix-neuf mois.",
  19: "Le premier Tour de France, en 1903, s'est couru en six étapes sur dix-neuf jours. Toute aide était interdite, alors les coureurs transportaient leurs pneus de rechange autour des épaules et réparaient leurs vélos eux-mêmes le soir.",
  20: "Un coeur humain commence à battre vers vingt jours, avant qu'il y ait un cerveau pour s'en rendre compte.",
  21: "L'équipage d'Apollo 11 a été mis en quarantaine 21 jours au retour, au cas où la Lune transporterait quelque chose. La roulotte dans laquelle ils ont attendu est au Smithsonian.",
  22: "Spoutnik a émis pendant trois semaines, puis ses piles sont mortes et il a continué de tourner en silence trois mois de plus.",
  23: "Le Tour de France couvre environ 3 500 km sur 23 jours, avec deux jours de repos dedans.",
  24: "Un monarque né l'été vit environ trois semaines. La génération qui migre vers le Mexique vit huit mois, et personne ne sait comment elle trouve une forêt qu'elle n'a jamais vue.",
  25: "Le Soleil vient de faire un tour complet à son équateur. Ça lui prend 25 jours là et 35 aux pôles. Il n'est pas solide, donc il ne tourne pas d'un seul bloc.",
  26: "La couche externe de ta peau s'est entièrement remplacée. La cellule à la surface de ton avant-bras en ce moment a commencé au fond de l'épiderme il y a un mois et est morte en montant.",
  27: "La Lune a fait une orbite complète de la Terre depuis que tu as commencé. Ça prend 27.3 jours.",
  28: "Skylab 2 a passé 28 jours en orbite en 1973, un record à l'époque. L'équipage a dû réparer à la main le pare-soleil déchiré de la station avant de pouvoir y vivre.",
  29: "Un mois lunaire fait 29.5 jours. Douze de ces mois-là tombent onze jours trop courts pour une année solaire, et c'est pour ça que le ramadan recule dans les saisons.",
  30: "Un mois en orbite et ta colonne est mesurablement plus longue. Les astronautes reviennent jusqu'à 5 cm plus grands et perdent tout ça dans les jours qui suivent leur retour debout.",
  31: "Une lapine est gestante 31 jours. Certains mammifères peuvent aussi mettre une gestation sur pause, gardant un oeuf fécondé en suspens des mois jusqu'à ce que la saison soit bonne.",
  32: "Un mois en orbite coûte environ un pour cent de l'os des hanches, ce qu'une personne sur Terre perd en un an.",
  33: "Lindbergh a traversé l'Atlantique seul en 33 heures 30, éveillé tout le long, sans pare-brise avant. Il naviguait avec un périscope.",
  34: "Amundsen a atteint le pôle Sud 34 jours avant Scott, et il avait planifié chacun de ces jours-là pendant des années.",
  35: "Les cinq premières semaines de n'importe quel programme de force, c'est surtout ton système nerveux qui apprend à se servir de ce que tu as déjà. Le muscle neuf arrive après.",
  36: "Iwo Jima était planifiée pour cinq jours et en a pris trente-six.",
  37: "Colomb a mis 36 jours pour traverser des Canaries jusqu'à la terre ferme en 1492. Tu viens de faire la traversée.",
  38: "La flotte de Magellan a eu besoin de 38 jours juste pour passer le détroit qui porte maintenant son nom.",
  39: "Un voilier postal traversait l'Atlantique vers l'ouest en une quarantaine de jours en 1820, contre le vent et le Gulf Stream. Vers l'est, ça prenait vingt-cinq jours. L'océan n'est pas symétrique.",
  40: "Quarante jours. Le déluge de Noé, le carême, et à peu près la limite de ce qu'une personne en santé survit sans manger.",
  41: "Un thon rouge traverse l'Atlantique en six semaines environ, et revient frayer dans la mer où il est né.",
  42: "Le tour du monde à la voile en solitaire le plus rapide fait 42 jours et 16 heures, Francois Gabart, 2017. Seul, sans arrêt, sans aide.",
  43: "Un oeuf d'autruche prend 42 jours à éclore, deux fois celui d'une poule. Son jaune est la plus grosse cellule que fabrique un animal.",
  44: "Un tendon met environ six semaines à reprendre ce qu'un muscle reprend en deux. Les tendons n'ont presque pas d'apport sanguin, alors ils guérissent sur une autre horloge que tout ce qui est attaché après.",
  45: "Six semaines dans un plâtre et le muscle autour de la fracture est visiblement plus petit. Il revient plus vite qu'il est parti, parce que les noyaux que tu as construits restent en place.",
  46: "Le record de la traversée des États-Unis à la course est de 46 jours. 5 000 km, plus de deux marathons et demi par jour, en 1980.",
  47: "Vicksburg a tenu 47 jours et s'est rendue le 4 juillet 1863. La ville n'a pas officiellement fêté la fête de l'Indépendance pendant les quatre-vingt-un ans suivants.",
  48: "Mis à la dérive depuis le Bounty avec dix-huit hommes, aucune carte et un sextant, Bligh a mené une chaloupe ouverte sur 6 700 km en quarante-sept jours.",
  49: "Le bouddhisme tibétain donne aux morts quarante-neuf jours entre une vie et la suivante, et les vivants leur font la lecture à voix haute tout ce temps-là.",
  50: "Le Soleil a maintenant tourné deux fois depuis que tu as commencé.",
  51: "La lumière partie du Soleil ton premier matin est neuf mille fois plus loin de lui que toi, et toujours nulle part proche d'une autre étoile.",
  52: "Le Self-Transcendence 3100 couvre 5 000 km autour d'un seul pâté de maisons dans Queens. La limite est de 52 jours, ce qui donne 96 km par jour.",
  53: "Diana Nyad a nagé de Cuba à la Floride à 64 ans, à sa cinquième tentative. 177 km en 53 heures, sans cage anti-requins.",
  54: "Deux mois au lit et tu perds environ un cinquième de ton muscle. La NASA paie des volontaires pour rester couchés tête vers le bas, parce que c'est la façon la moins chère d'étudier ce que l'orbite fait à un corps.",
  55: "Les légations étrangères de Pékin ont tenu en état de siège du 20 juin au 14 août 1900. Hollywood a appelé le film 55 jours à Pékin et a eu le bon chiffre.",
  56: "Huit semaines après un infarctus, la cicatrice est finie et permanente. Le muscle cardiaque ne repousse pas, alors la paroi reste simplement plus mince là où elle est morte.",
  57: "Huit semaines sans rien faire et un athlète entraîné a perdu la majeure partie de son adaptation aérobie et presque rien de sa force. Le coeur se déconditionne bien plus vite que le muscle.",
  58: "Huit semaines, c'est le délai normal entre une usine de Shenzhen et une tablette au Québec : une trentaine de jours en mer et le reste dans les ports et les camions.",
  59: "Skylab 3 a passé 59 jours en orbite en 1973 et l'équipage est revenu en meilleure forme que celui d'avant, parce qu'on leur avait enfin donné de quoi s'entraîner.",
  60: "Le Spirit of St. Louis de Lindbergh a été conçu, construit et piloté en soixante jours, par une compagnie qui n'avait jamais rien fait de tel.",
  61: "Le miel cristallise dans un pot après quelques mois et ne se gâte jamais. Des pots trouvés scellés dans des tombeaux égyptiens étaient encore mangeables.",
  62: "Une graine de tomate devient une tomate mûre en une soixantaine de jours de beau soleil. Le plant passe la première moitié à bâtir l'usine et la deuxième à s'en servir.",
  63: "Michel Siffre a passé deux mois seul dans une grotte glaciaire en 1962 sans horloge. Il en est sorti le 14 septembre convaincu qu'on était le 20 août.",
  64: "Deux hommes sont restés en vol au-dessus de Las Vegas pendant 64 jours en 1958, ravitaillés deux fois par jour depuis un camion en marche. Personne n'a volé plus longtemps sans se poser.",
  65: "Un oeuf de manchot empereur prend environ 65 jours à éclore, et le mâle le garde sur ses pieds tout ce temps-là sans manger.",
  66: "Le chiffre célèbre pour former une habitude, c'est 66 jours. L'étude d'où il vient a en fait trouvé un écart allant de 18 à 254.",
  67: "Le mont St. Helens a donné deux mois d'avertissement en 1980. La face nord gonflait vers l'extérieur d'un mètre et demi par jour et tout le monde le voyait. Personne ne savait ce que ça voulait dire.",
  68: "Un serpent à sonnette remplace un croc cassé en une dizaine de semaines, et il en garde un de rechange derrière chacun de ceux qu'il utilise.",
  69: "Les 33 mineurs chiliens sont restés sous terre 69 jours, de l'effondrement jusqu'au dernier homme sorti de la capsule de sauvetage.",
  70: "Une patrouille de sous-marin nucléaire dure environ soixante-dix jours. Le réacteur pourrait tenir vingt ans sans ravitaillement. C'est la nourriture et l'équipage qui fixent l'horaire.",
  71: "Dix semaines après une brûlure, la peau neuve est encore rouge et bombée, et elle va continuer de se remodeler pendant deux ans. Guérir n'est pas un événement, c'est un calendrier.",
  72: "Les survivants des Andes en 1972 ont tenu 72 jours à 3 600 m. Les recherches avaient été abandonnées au jour 8.",
  73: "Nellie Bly a fait le tour du monde en 72 jours en 1889 avec une seule robe et un seul sac, pour prouver que les quatre-vingts jours de Verne étaient battables.",
  74: "La guerre des Malouines a duré 74 jours.",
  75: "Le siège de Leningrad a duré 872 jours. Tu es au jour 75 de quelque chose de nettement plus agréable.",
  76: "Steven Callahan a dérivé 76 jours seul en travers de l'Atlantique dans un radeau de survie en 1982, après qu'une baleine ait crevé son bateau dans la nuit.",
  77: "Un embryon de poulet a besoin de 21 jours, un humain de 280, et un requin du Groenland n'est pas capable de se reproduire avant 150 ans. L'horloge tourne à des vitesses complètement différentes selon ce qui est en train d'être construit.",
  78: "Le tour du monde à vélo le plus rapide fait 78 jours, sans assistance, à plus de 300 km par jour en moyenne.",
  79: "Un albatros hurleur couve son oeuf 79 jours, plus longtemps que n'importe quel autre oiseau, le couple se relayant par quarts d'une semaine.",
  80: "Le tour du monde en quatre-vingts jours. Le chiffre de Verne était une vraie estimation de 1872, pas une fantaisie. Une journaliste l'a fait en 72 jours en 1889.",
  81: "Un oeuf de kiwi prend environ 80 jours à éclore et remplit le quart du corps de la mère. Elle arrête de manger les derniers jours parce qu'il ne reste plus de place en dedans.",
  82: "Un spermatozoïde prend environ quatre-vingts jours pour passer de cellule souche à produit fini. Tout ce qui abîme la chaîne de production prend ce temps-là à paraître, et ce temps-là à disparaître.",
  83: "Sojourner, le premier rover martien, était conçu pour durer sept jours. Il a roulé 83 jours.",
  84: "L'équipage de Skylab 4 a passé 84 jours en orbite. Un jour ils ont fermé la radio et pris congé sans prévenir, parce que le sol leur avait planifié plus que ce qu'une personne peut tenir. Chaque mission depuis a du temps protégé.",
  85: "Un test sanguin de sucre moyen regarde trois mois en arrière, parce que le marqueur voyage sur les globules rouges et qu'ils vivent 120 jours. Tu ne peux pas étudier la veille.",
  86: "Douze semaines, c'est la durée standard d'une étude d'entraînement. C'est aussi pour ça qu'on ne sait à peu près rien de ce qui se passe au quatrième mois.",
  87: "Le puits de Deepwater Horizon a coulé pendant 87 jours avant que quelqu'un réussisse à le boucher.",
  88: "Mercure a fait le tour complet du Soleil. Son année entière fait 88 jours terrestres.",
  89: "Un nerf coupé repousse d'environ un millimètre par jour. C'est pour ça qu'une blessure à la main se mesure en mois et une blessure à la peau en semaines.",
  90: "Trois mois : les plaquettes de ton sang se sont renouvelées une trentaine de fois, et les globules rouges pas tout à fait une fois.",
  91: "Un quart d'année, et la durée d'une saison à deux jours près. La Terre n'orbite pas à vitesse constante, alors l'été du nord dure environ cinq jours de plus que l'hiver du nord.",
  92: "Une pile au lithium laissée à pleine charge trois mois subit des dommages qu'elle ne récupère jamais. C'est pour ça qu'on expédie les appareils chargés à environ quarante pour cent.",
  93: "Les rovers martiens Spirit et Opportunity étaient conçus pour durer 90 jours. Opportunity a roulé quinze ans et s'est arrêté parce qu'une tempête de poussière a bloqué le Soleil.",
  94: "Le premier vol sans escale autour du monde a pris 94 heures en 1949, ravitaillé quatre fois en vol par d'autres avions.",
  95: "L'offensive des Cent-Jours qui a mis fin à la Première Guerre mondiale en a duré 95.",
  96: "Trois mois, c'est le temps qu'il faut à une reine pour remplacer chaque ouvrière de la ruche. Elle pond deux mille oeufs par jour et elles vivent six semaines, alors la colonie que tu vois en août n'a aucun membre en commun avec celle de mai.",
  97: "La fréquentation des gyms a la même forme chaque année : un pic le 1er janvier, un effondrement en février, un plancher à la mi-avril qui ne remonte jamais.",
  98: "La traversée du Pacifique par Magellan a pris 98 jours. Ils ont manqué de nourriture vers le quarantième et ont mangé le cuir du gréement.",
  99: "L'aller-retour d'Amundsen du camp de base au pôle Sud a pris 99 jours. Il est revenu en ayant pris du poids.",
  100: "Le retour de Napoléon de l'île d'Elbe jusqu'à Waterloo est resté dans l'histoire comme les Cent-Jours. Ça en a fait 111.",
  101: "Le Kon-Tiki a dérivé 6 900 km en travers du Pacifique en 101 jours sur des billots de balsa attachés avec de la corde, parce que Heyerdahl refusait le fil de fer.",
  110: "Une lionne est gestante 110 jours, une tigresse 105, une chatte 64. Les grands félins ne prennent pas beaucoup plus de temps que les petits.",
  115: "Un manchot empereur mâle jeûne environ 115 jours à travers la parade, la ponte et l'incubation, debout dans le noir à quarante sous zéro avec un oeuf sur les pieds.",
  120: "Chaque globule rouge de ton corps a été remplacé depuis le jour un. Pas un seul n'était là quand tu as commencé.",
  125: "Le premier équipage de Mir y est resté 125 jours en 1986. Mir elle-même était construite pour cinq ans et est restée en orbite quinze ans.",
  128: "Viking 1 était construit pour durer 90 jours sur Mars et a envoyé des données pendant six ans. Quelqu'un sur Terre a téléversé une mauvaise commande et tué l'antenne.",
  148: "L'équipe polaire de Scott est restée dehors 148 jours et est morte à 18 km d'un dépôt de vivres qu'elle avait garni elle-même.",
  150: "Ton foie s'est remplacé depuis que tu as commencé. Il se renouvelle à peu près aux 150 jours, et c'est le seul organe que tu as qui va repousser à partir d'un fragment.",
  165: "Une rotation à la Station spatiale dure environ six mois. C'est à peu près là que la perte osseuse commence à dépasser ce que l'exercice peut retenir.",
  176: "Une journée sur Mercure dure 176 jours terrestres, deux fois sa propre année.",
  180: "Une demi-année. La Terre t'a transportée sur environ 470 millions de km autour du Soleil depuis que tu as commencé.",
  182: "L'hiver au pôle Sud dure 182 jours sans lever de soleil, et pendant huit mois aucun avion ne peut atteindre la station.",
  205: "Michel Siffre est retourné sous terre en 1972 et y est resté 205 jours dans une grotte du Texas. Sans lumière du jour, son corps a dérivé vers des journées de 48 heures et il ne s'en est jamais aperçu.",
  225: "Vénus a fait une orbite complète du Soleil. Son année fait 225 jours terrestres. Sa journée en fait 243.",
  243: "Une journée vénusienne. Vénus tourne tellement lentement que sa journée dure plus longtemps que son année, et elle tourne à l'envers.",
  252: "La First Fleet a passé 252 jours en mer pour se rendre en Australie en 1788 et a perdu 48 personnes sur 1 400. C'était considéré comme un triomphe de la santé à bord à l'époque.",
  259: "Un transfert de Hohmann vers Mars prend environ 259 jours. Si tu étais partie de la Terre le matin où tu as commencé, tu arriverais aujourd'hui.",
  280: "Une grossesse humaine, du premier jour à la date prévue.",
  300: "Un martinet noir peut rester en vol dix mois sans se poser. Il mange, boit, s'accouple et dort dans les airs.",
  312: "Robin Knox-Johnston a fini le premier tour du monde en solitaire sans escale en 312 jours, le seul des neuf partants à revenir.",
  340: "Scott Kelly a passé 340 jours d'affilée à bord de la Station spatiale. Tu viens de l'égaler, sans les radiations.",
  365: "Un an. La Terre est revenue exactement où elle était partie. Pas toi.",
  370: "La Longue Marche a couvert 9 000 km en 370 jours. Environ une personne sur dix parmi celles qui sont parties est arrivée.",
  400: "Plus longtemps d'affilée qu'aucun humain n'a passé dans l'espace, à une exception près.",
  437: "Tu viens d'égaler les 437 jours de Valeri Poliakov à bord de Mir. Personne n'a battu ça depuis 1995."
};

/* La ligne bonus. Aucune durée, ou une durée qui ne colle à aucun jour.
   Indexées pour ne jamais se répéter avant que la banque soit vidée. */
const POOL = [
  "Les Jeux de 1928 ont fait courir le 800 m féminin, puis l'ont banni pendant 32 ans parce que les finissantes avaient l'air fatiguées.",
  "Le trou le plus profond jamais foré a atteint 12.26 km après 20 ans. La croûte fait 35 km d'épaisseur.",
  "La vitesse de pointe d'Usain Bolt a été de 44.7 km/h, tenue environ un cinquième de seconde. Personne ne l'a battue depuis 2009.",
  "Le Krakatoa a explosé en 1883 assez fort pour être entendu à 4 800 km, et a crevé les tympans de marins à 64 km de là.",
  "Wilhelm Rontgen a découvert les rayons X le 8 novembre 1895 et avait imagé la main de sa femme quelques semaines plus tard. Elle a dit : je viens de voir ma mort.",
  "Douze hommes ont marché sur la Lune. Une journée chacun.",
  "Le mur de Berlin est monté en une seule nuit d'août 1961 et est resté debout 10 315 jours.",
  "Le code Enigma a été cassé, recassé et cassé encore pendant six ans. Les machines de Turing passaient au travers de 15 milliards de milliards de réglages.",
  "Le jour J a débarqué 156 000 hommes sur 80 km de plage en une journée. Le planifier a pris plus d'un an.",
  "Les quatre vols des frères Wright le 17 décembre 1903 totalisent 98 secondes en l'air. Toute l'aviation motorisée part de là.",
  "La réponse de Douglas Adams à tout était 42. Il a dit l'avoir choisi parce que c'était un nombre parfaitement ordinaire.",
  "Le record d'apnée est de 24 minutes 37 secondes.",
  "Kilian Jornet a grimpé l'Everest deux fois en une semaine en 2017, sans oxygène d'appoint et sans cordes fixes.",
  "Apollo 13 a décollé, a été mis hors d'état et était de retour en cinq jours et vingt-deux heures.",
  "L'expédition de Magellan a pris trois ans. Un navire sur cinq est revenu, avec 18 des 270 hommes partis.",
  "Le Hindenburg traversait l'Atlantique en une soixantaine d'heures, trois fois plus vite que n'importe quel navire. Trente-sept personnes sont mortes en 34 secondes et ça a été la fin des dirigeables.",
  "Une commande radio envoyée à Voyager 1 met environ 23 heures à arriver, donc une conversation avec la sonde prend deux jours.",
  "La couche externe de ta cornée se remplace environ aux dix jours, et c'est pour ça qu'un oeil égratigné guérit du jour au lendemain.",
  "Valentina Terechkova a fait 48 fois le tour de la Terre en trois jours en 1963. C'était plus de temps de vol que tous les astronautes américains réunis à ce moment-là.",
  "Le coeur d'un rorqual bleu en plongée bat environ deux fois par minute.",
  "Gettysburg a duré trois jours. Waterloo, une journée.",
  "Environ dix pour cent de ton squelette est en reconstruction active à n'importe quel moment. Le renouvellement complet prend dix ans et ne s'arrête jamais.",
  "Ton corps a produit environ deux millions de globules rouges pendant que cette séance durait.",
  "On s'attend à ce que le disque d'or des Voyager reste lisible pendant un milliard d'années. Rien d'autre fabriqué par des humains n'approche ça.",
  "Une pieuvre a neuf cerveaux et le sang bleu, et les deux tiers de ses neurones sont dans ses bras.",
  "Le marathon olympique de 1904 a été gagné par un homme qui en avait fait onze milles en auto. Il a été disqualifié, et le deuxième prenait de la strychnine.",
  "Les tardigrades survivent au vide, à 150 C, et à mille fois la radiation qui tue un humain. Ils sont allés dans l'espace et en sont revenus intacts.",
  "Le coeur d'un colibri tourne à 1 200 battements par minute en vol et à 50 quand il dort.",
  "La Grande Muraille n'est pas visible de l'espace à l'oeil nu. Les pistes d'aéroport, oui.",
  "Hannibal a traversé les Alpes avec 37 éléphants en 218 av. J.-C. Un seul a survécu au premier hiver en Italie.",
  "Tes os sont démantelés et rebâtis en continu. Le squelette que tu as là a environ dix ans.",
  "Le Concorde faisait Heathrow-JFK en 2 heures 52. Rien n'a volé plus vite sur ce trajet depuis sa retraite en 2003.",
  "La machine d'Anticythère modélisait le ciel avec 30 engrenages de bronze vers 100 av. J.-C. Rien d'aussi complexe n'est réapparu pendant 1 400 ans.",
  "Un seul éclair transporte environ un milliard de joules, livrés en 30 microsecondes.",
  "Les manchots empereurs tiennent une mêlée dans des vents à moins 60 C pendant deux mois sans manger, en tournant pour que personne ne reste sur le bord.",
  "Le cycliste néerlandais Fred Rompelberg a atteint 268 km/h à vélo en 1995, dans l'aspiration d'un dragster sur les plaines de Bonneville.",
  "La lumière met 100 000 ans à traverser notre galaxie et 8 minutes à te parvenir du Soleil.",
  "L'armée romaine marchait 30 km par jour avec 30 kg sur le dos, puis bâtissait un camp fortifié chaque soir sans exception.",
  "Il y a plus d'arrangements possibles d'un paquet de cartes brassé que d'atomes dans notre galaxie. Chaque brassage que tu as fait dans ta vie était presque certainement une première.",
  "L'Everest grandit d'environ 4 mm par année. L'Himalaya est encore en collision.",
  "L'aorte d'un rorqual bleu est assez large pour qu'un humain y rampe.",
  "Les derniers mammouths laineux étaient vivants sur l'île Wrangel alors que la grande pyramide était déjà debout.",
  "Le Soleil perd quatre millions de tonnes de masse chaque seconde, converties en la lumière que tu sens sur ton visage.",
  "Eddy Merckx a établi le record de l'heure en 1972, puis a dit que c'était la sortie la plus dure de sa vie et n'a jamais réessayé.",
  "La paroi de ton estomac se remplace aux trois à cinq jours, parce qu'autrement elle se digérerait elle-même.",
  "La trêve de Noël 1914 a impliqué environ 100 000 hommes le long du front de l'Ouest. L'état-major a interdit toute répétition l'année suivante.",
  "Les abeilles naviguent avec la lumière polarisée, et se disent où sont les fleurs en dansant l'angle par rapport au Soleil.",
  "L'astéroïde de Chicxulub faisait environ 10 km de large et a libéré l'énergie de dix milliards d'Hiroshima en une seconde.",
  "La bibliothèque d'Alexandrie n'a pas brûlé en une nuit. Elle a décliné sur des siècles de coupures de financement.",
  "Un mètre cube d'eau de mer contient environ 25 kg de sel et à peu près 13 milliardièmes de gramme d'or.",
  "Wim Hof a grimpé à 7 200 m sur l'Everest en shorts. Des physiologistes l'ont étudié des années avant d'accepter que c'était la respiration qui faisait ça.",
  "La matière d'une étoile à neutrons est tellement dense qu'une cuillère à thé pèserait à peu près le même poids que l'Everest.",
  "La grippe espagnole a tué plus de monde en 1918 que la guerre qu'elle a suivie, et ce sont les plus jeunes et les plus en santé qui sont morts le plus vite.",
  "Tes yeux font environ trois saccades par seconde. Ton cerveau efface le flou entre les deux, et c'est pour ça que tu ne le vois jamais.",
  "Les messagers de Gengis Khan couvraient 300 km par jour en changeant de cheval à des relais répartis sur un empire de 9 000 km de large.",
  "Il y a assez d'ADN dans ton corps, déroulé, pour se rendre au Soleil et revenir une soixantaine de fois.",
  "Le Trieste a atteint le fond de la fosse des Mariannes en 1960. Seulement une poignée de gens y sont retournés depuis, et douze ont marché sur la Lune.",
  "Les fourmis cultivent des champignons depuis 60 millions d'années, et elles désherbent et fertilisent la récolte.",
  "Le Colossus de Bletchley lisait 5 000 caractères par seconde en 1944. Son existence est restée secrète trente ans, alors ses concepteurs n'ont eu aucun crédit pendant que l'informatique s'inventait autour d'eux.",
  "Un avion de ligne en croisière est plus proche de sa vitesse de décrochage que la plupart des pilotes trouvent confortable d'y penser.",
  "Les requins existent depuis plus longtemps que les arbres, et depuis plus longtemps que Saturne a des anneaux.",
  "Une reine et une ouvrière partent d'oeufs identiques. La seule différence, c'est ce qu'on donne à manger à la larve.",
  "La chose la plus lourde qu'un humain ait soulevée du sol fait 524 kg, et l'homme qui l'a fait n'a pas pu marcher normalement pendant des semaines.",
  "Ta force de préhension prédit ton risque de mourir de à peu près n'importe quoi mieux que ta pression artérielle.",
  "La colonne d'un chat a 53 vertèbres contre 33 pour toi, et c'est pour ça qu'il peut se retourner à l'intérieur de sa propre longueur.",
  "Le Sahara était vert il y a quatre mille ans, avec des lacs et des hippopotames. Le changement a pris quelques siècles.",
  "L'os est plus solide que le béton à poids égal, et ton fémur encaisse environ 4 000 newtons avant de casser.",
  "Le son voyage quatre fois plus vite dans l'eau que dans l'air, et c'est pour ça que tu ne peux pas dire d'où vient un bruit sous l'eau.",
  "Un cumulus moyen pèse environ 500 tonnes, tenu en l'air par de l'air qui pèse légèrement plus.",
  "Chaque atome de fer dans ton sang a été fabriqué dans une étoile qui a explosé avant que le Soleil existe.",
  "Le cou d'une girafe a sept vertèbres, comme le tien. Celui d'une souris aussi.",
  "Le muscle, c'est environ 20 pour cent de protéines et 75 pour cent d'eau. La plus grande partie de ce que tu sens grossir, c'est de la plomberie.",
  "Cléopâtre a vécu plus proche dans le temps de l'alunissage que de la construction de la grande pyramide.",
  "Le record de tractions en 24 heures est de 8 940. Ça fait une aux dix secondes, éveillé, pendant une journée complète.",
  "Ton corps contient environ 0.2 mg d'or, surtout dans ton sang.",
  "L'université d'Oxford enseignait déjà quand l'Empire aztèque a été fondé.",
  "Un éternuement sort de ton nez à environ 160 km/h et les gouttelettes peuvent flotter dix minutes dans l'air.",
  "Le plus grand arbre sur Terre fait 116 m et monte l'eau jusqu'en haut par évaporation seulement, contre la gravité, sans pompe.",
  "Personne ne sait pourquoi on bâille. Le côté contagieux est bien documenté et complètement inexpliqué.",
  "Il y a plus de puissance de calcul dans une clé d'auto moderne que dans tout Apollo 11.",
  "L'océan Pacifique est plus large que la Lune.",
  "Tes ongles poussent environ deux fois plus vite sur ta main dominante, et plus vite l'été que l'hiver.",
  "Les bananes sont légèrement radioactives, et un camion plein peut déclencher les détecteurs de radiation d'un port.",
  "La plongée en apnée la plus profonde atteint 214 m. Les poumons se compriment à peu près à la taille d'un poing et se remplissent en remontant."
];

/* Jamais deux fois la même de suite. L'index stocké empêche les répétitions. */
const BREAKS = [
  "Retour à zéro. Le grand collisionneur de hadrons aussi, neuf jours après sa mise en marche, quand un mauvais joint de soudure lui a coûté quatorze mois. Il a fini par trouver le Higgs.",
  "Série perdue. Voyager 2 s'est tue deux semaines en 2020 parce que la seule antenne sur Terre capable de l'atteindre était pointée ailleurs pour des réparations. Elle émet encore.",
  "De retour au jour zéro. L'entropie est invaincue sur des échelles de temps assez longues. Le truc a toujours été de continuer à faire tourner l'expérience.",
  "Cassée. Les frères Wright se sont écrasés le 14 décembre 1903 et ont volé pour de bon trois jours plus tard.",
  "Zéro encore. Apollo 13 a perdu un réservoir d'oxygène à 320 000 km de la maison et tout le monde est revenu vivant. Perdre le plan, ce n'est pas la même chose que perdre.",
  "Série terminée. L'équipe d'Edison a testé des milliers de matériaux de filament. Le résumé utile, c'est que ceux qui ont échoué étaient quand même des données.",
  "Remise à zéro. Le navire de Shackleton a été broyé par les glaces en 1915 et l'expédition est devenue un sauvetage. Les 28 hommes ont tous survécu.",
  "Retour à rien. Le Mars Climate Orbiter a été perdu en 1999 parce qu'une équipe travaillait en livres et l'autre en newtons. La NASA a continué d'aller sur Mars.",
  "C'est fini pour la série. Roger Bannister a manqué le mille en quatre minutes pendant deux ans avant le jour où ça a marché.",
  "Zéro. La dérive des continents a été ridiculisée cinquante ans avant que les données des fonds marins la rendent évidente. Être en avance et avoir tort, ça se ressemble de l'intérieur.",
  "Cassée. Les quatre premiers lancements de Falcon 1 ont été des échecs et la compagnie avait de l'argent pour exactement un de plus.",
  "Remise à zéro. Darwin a gardé sa théorie sur la glace pendant vingt ans. Recommencer coûte moins cher que ça."
];

/* Étale les tirages dans la banque au lieu de la parcourir en ordre. 7919 est
   premier, donc avancer par bonds de 7919 visite toutes les places libres avant
   d'en répéter une. */
function poolPick(day, seenPool, skip){
  const used = seenPool || [];
  let free = POOL.map((_,i)=>i).filter(i => !used.includes(i));
  if(!free.length) free = POOL.map((_,i)=>i);
  if(free.length > 1 && typeof skip === "number"){
    const rest = free.filter(i => i !== skip);
    if(rest.length) free = rest;
  }
  return free[(day * 7919) % free.length];
}

function milestoneFor(day, seenPool){
  if(DAYS[day]) return {text: DAYS[day], keyed: true};
  const pick = poolPick(day, seenPool);
  return {text: POOL[pick], keyed: false, poolIndex: pick};
}

/* La deuxième ligne. Décale le jour pour ne jamais tomber sur l'entrée que la
   ligne principale vient d'utiliser un jour sans clé. */
function bonusFor(day, seenPool, skipIndex){
  const pick = poolPick(day + 1, seenPool, skipIndex);
  return {text: POOL[pick], poolIndex: pick};
}

function breakMessage(lastIndex){
  let i = (typeof lastIndex === "number" ? lastIndex + 1 : 0) % BREAKS.length;
  return {text: BREAKS[i], index: i};
}
