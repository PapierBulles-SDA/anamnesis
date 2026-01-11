/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Informations sur les livres de la Bible (AT + NT)
 * ═══════════════════════════════════════════════════════════════════════════
 */

const LivresInfo = {
    // ═══════════════════════════════════════════════════════════════════════
    // ANCIEN TESTAMENT - TORAH (5 livres)
    // ═══════════════════════════════════════════════════════════════════════
    "Genèse": {
        partie: "Torah",
        couleur: "#8B4513",
        auteur: "Moïse (tradition)",
        profession: "Législateur et prophète",
        date: "XVe-Ve siècles av. J.-C.",
        lieu: "Désert du Sinaï",
        destinataires: "Le peuple d'Israël",
        genre: "Récit des origines",
        chapitres: 50,
        versets: 1533,
        resume: "Création du monde, chute, déluge, patriarches (Abraham, Isaac, Jacob), Joseph en Égypte.",
        themes: ["Création divine", "Chute et péché", "Alliance avec Abraham", "Providence de Dieu"],
        structure: [
            { section: "Création et origines", chapitres: "1-11" },
            { section: "Abraham et l'alliance", chapitres: "12-25" },
            { section: "Isaac et Jacob", chapitres: "26-36" },
            { section: "Joseph en Égypte", chapitres: "37-50" }
        ],
        versetsCles: [
            { ref: "1:1", titre: "Au commencement Dieu créa" },
            { ref: "12:1-3", titre: "Appel d'Abraham" }
        ]
    },

    "Exode": {
        partie: "Torah",
        couleur: "#8B4513",
        auteur: "Moïse",
        profession: "Législateur et prophète",
        date: "XVe-Ve siècles av. J.-C.",
        lieu: "Égypte et désert du Sinaï",
        destinataires: "Le peuple d'Israël",
        genre: "Récit de libération",
        chapitres: 40,
        versets: 1213,
        resume: "Esclavage en Égypte, 10 plaies, Pâque, traversée de la mer Rouge, Sinaï, Décalogue, Tabernacle.",
        themes: ["Délivrance", "Alliance au Sinaï", "Les Dix Commandements", "Présence de Dieu"],
        structure: [
            { section: "Oppression et délivrance", chapitres: "1-15" },
            { section: "De la mer au Sinaï", chapitres: "16-18" },
            { section: "Alliance et Loi", chapitres: "19-24" },
            { section: "Le Tabernacle", chapitres: "25-40" }
        ],
        versetsCles: [
            { ref: "3:14", titre: "Je suis celui qui suis" },
            { ref: "20:1-17", titre: "Les Dix Commandements" }
        ]
    },

    "Lévitique": {
        partie: "Torah",
        couleur: "#8B4513",
        auteur: "Moïse",
        profession: "Législateur et prophète",
        date: "XVe-Ve siècles av. J.-C.",
        lieu: "Désert du Sinaï",
        destinataires: "Le peuple d'Israël",
        genre: "Code législatif",
        chapitres: 27,
        versets: 859,
        resume: "Lois sur les sacrifices, la pureté rituelle, le sacerdoce, la sainteté, les fêtes.",
        themes: ["Sainteté de Dieu", "Sacrifices", "Pureté", "Sacerdoce"],
        structure: [
            { section: "Les sacrifices", chapitres: "1-7" },
            { section: "Les prêtres", chapitres: "8-10" },
            { section: "Pureté et impureté", chapitres: "11-16" },
            { section: "Lois de sainteté", chapitres: "17-27" }
        ],
        versetsCles: [
            { ref: "19:2", titre: "Soyez saints car je suis saint" },
            { ref: "17:11", titre: "La vie est dans le sang" }
        ]
    },

    "Nombres": {
        partie: "Torah",
        couleur: "#8B4513",
        auteur: "Moïse",
        profession: "Législateur et prophète",
        date: "XVe-Ve siècles av. J.-C.",
        lieu: "Désert du Sinaï à Moab",
        destinataires: "Le peuple d'Israël",
        genre: "Récit historique",
        chapitres: 36,
        versets: 1288,
        resume: "Recensements, 40 ans au désert, rébellions, mort de la génération incrédule.",
        themes: ["Fidélité de Dieu", "Conséquences de la rébellion", "Nouvelle génération"],
        structure: [
            { section: "Au Sinaï", chapitres: "1-10" },
            { section: "Au désert", chapitres: "11-21" },
            { section: "Vers Canaan", chapitres: "22-36" }
        ],
        versetsCles: [
            { ref: "6:24-26", titre: "Bénédiction sacerdotale" },
            { ref: "14:18", titre: "Patience de Dieu" }
        ]
    },

    "Deutéronome": {
        partie: "Torah",
        couleur: "#8B4513",
        auteur: "Moïse",
        profession: "Législateur et prophète",
        date: "XVe-Ve siècles av. J.-C.",
        lieu: "Plaines de Moab",
        destinataires: "Le peuple d'Israël",
        genre: "Discours de Moïse",
        chapitres: 34,
        versets: 959,
        resume: "Trois discours de Moïse rappelant la Loi, bénédictions et malédictions, mort de Moïse.",
        themes: ["Shema Israël", "Amour de Dieu", "Choix entre vie et mort"],
        structure: [
            { section: "Premier discours", chapitres: "1-4" },
            { section: "Deuxième discours", chapitres: "5-26" },
            { section: "Troisième discours", chapitres: "27-30" },
            { section: "Fin de Moïse", chapitres: "31-34" }
        ],
        versetsCles: [
            { ref: "6:4-5", titre: "Shema Israël" },
            { ref: "30:19", titre: "Choisis la vie" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ANCIEN TESTAMENT - LIVRES HISTORIQUES (12 livres)
    // ═══════════════════════════════════════════════════════════════════════
    "Josué": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Anonyme (tradition: Josué)",
        profession: "Chef militaire",
        date: "VIIe-VIe av. J.-C.",
        lieu: "Canaan",
        destinataires: "Le peuple d'Israël",
        genre: "Récit de conquête",
        chapitres: 24,
        versets: 658,
        resume: "Conquête de Canaan sous Josué, traversée du Jourdain, Jéricho, partage du territoire.",
        themes: ["Fidélité de Dieu", "Conquête divine", "Obéissance", "Héritage"],
        structure: [
            { section: "Entrée en Canaan", chapitres: "1-5" },
            { section: "Conquête du pays", chapitres: "6-12" },
            { section: "Partage du territoire", chapitres: "13-21" },
            { section: "Alliance à Sichem", chapitres: "22-24" }
        ],
        versetsCles: [
            { ref: "1:8", titre: "Médite la Loi jour et nuit" },
            { ref: "24:15", titre: "Moi et ma maison servirons l'Éternel" }
        ]
    },

    "Juges": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Anonyme",
        profession: "Compilateur historique",
        date: "VIIe-VIe av. J.-C.",
        lieu: "Canaan",
        destinataires: "Le peuple d'Israël",
        genre: "Cycles de délivrance",
        chapitres: 21,
        versets: 618,
        resume: "Période sombre: cycles d'apostasie-oppression-cri-juge-paix. 12 juges dont Débora, Gédéon, Samson.",
        themes: ["Cycle de l'apostasie", "Fidélité de Dieu", "Conséquences du péché"],
        structure: [
            { section: "Introduction", chapitres: "1-3" },
            { section: "Les douze juges", chapitres: "3-16" },
            { section: "Chaos moral", chapitres: "17-21" }
        ],
        versetsCles: [
            { ref: "2:18-19", titre: "Le cycle répétitif" },
            { ref: "21:25", titre: "Chacun faisait ce qui lui semblait bon" }
        ]
    },

    "Ruth": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Anonyme",
        profession: "Narrateur",
        date: "Xe-VIe av. J.-C.",
        lieu: "Bethléem",
        destinataires: "Le peuple d'Israël",
        genre: "Nouvelle historique",
        chapitres: 4,
        versets: 85,
        resume: "Ruth la Moabite fidèle suit Naomi, épouse Boaz. Ancêtre de David et du Messie.",
        themes: ["Providence divine", "Fidélité", "Rédemption", "Inclusion des étrangers"],
        structure: [
            { section: "Retour à Bethléem", chapitres: "1" },
            { section: "Glanage chez Boaz", chapitres: "2" },
            { section: "Demande de rachat", chapitres: "3" },
            { section: "Mariage et généalogie", chapitres: "4" }
        ],
        versetsCles: [
            { ref: "1:16", titre: "Ton peuple sera mon peuple" },
            { ref: "4:14", titre: "Béni soit l'Éternel" }
        ]
    },

    "1 Samuel": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Anonyme (sources prophétiques)",
        profession: "Chroniqueur",
        date: "Xe-VIe av. J.-C.",
        lieu: "Israël",
        destinataires: "Le peuple d'Israël",
        genre: "Historiographie",
        chapitres: 31,
        versets: 810,
        resume: "Samuel dernier juge, Saül premier roi rejeté, David oint, Goliath, fuite devant Saül.",
        themes: ["Monarchie vs théocratie", "Obéissance vaut mieux que sacrifices", "Dieu regarde au cœur"],
        structure: [
            { section: "Samuel prophète", chapitres: "1-7" },
            { section: "Saül premier roi", chapitres: "8-15" },
            { section: "David et Saül", chapitres: "16-31" }
        ],
        versetsCles: [
            { ref: "15:22", titre: "L'obéissance vaut mieux" },
            { ref: "16:7", titre: "L'Éternel regarde au cœur" }
        ]
    },

    "2 Samuel": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Anonyme",
        profession: "Chroniqueur royal",
        date: "Xe-VIe av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Le peuple d'Israël",
        genre: "Chroniques davidiques",
        chapitres: 24,
        versets: 695,
        resume: "Règne de David: Jérusalem capitale, Arche, alliance éternelle (2 S 7), péché Bath-Shéba, Absalom.",
        themes: ["Alliance davidique", "Miséricorde divine", "Conséquences du péché"],
        structure: [
            { section: "David roi de Juda", chapitres: "1-4" },
            { section: "David roi d'Israël", chapitres: "5-10" },
            { section: "Péché et conséquences", chapitres: "11-20" },
            { section: "Appendices", chapitres: "21-24" }
        ],
        versetsCles: [
            { ref: "7:16", titre: "Ta maison subsistera à jamais" },
            { ref: "12:13", titre: "J'ai péché contre l'Éternel" }
        ]
    },

    "1 Rois": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Anonyme (école deutéronomiste)",
        profession: "Historien prophétique",
        date: "VIIe-VIe av. J.-C.",
        lieu: "Royaume divisé",
        destinataires: "Israël en exil",
        genre: "Annales royales",
        chapitres: 22,
        versets: 816,
        resume: "Salomon et le Temple, schisme (931 av. J.-C.), Élie contre Achab et Jézabel, Baal vs YHWH au Carmel.",
        themes: ["Sagesse de Salomon", "Schisme jugement", "Élie vs Baal", "Rétribution"],
        structure: [
            { section: "Salomon roi sage", chapitres: "1-11" },
            { section: "Schisme du royaume", chapitres: "12-16" },
            { section: "Élie prophète", chapitres: "17-22" }
        ],
        versetsCles: [
            { ref: "8:27", titre: "Les cieux ne peuvent te contenir" },
            { ref: "18:39", titre: "L'Éternel est Dieu!" }
        ]
    },

    "2 Rois": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Anonyme (école deutéronomiste)",
        profession: "Chroniqueur prophétique",
        date: "VIe av. J.-C.",
        lieu: "Royaumes jusqu'à l'exil",
        destinataires: "Israël en exil",
        genre: "Historiographie théologique",
        chapitres: 25,
        versets: 719,
        resume: "Élisée miracles, chute d'Israël 722 av. J.-C. (Assyrie), réformes Ézéchias/Josias, chute Juda 586 (Babylone).",
        themes: ["Jugement inexorable", "Patience de Dieu", "Réformes temporaires", "Exil"],
        structure: [
            { section: "Élisée prophète", chapitres: "1-8" },
            { section: "Chute d'Israël 722", chapitres: "9-17" },
            { section: "Juda seul jusqu'à 586", chapitres: "18-25" }
        ],
        versetsCles: [
            { ref: "17:7-23", titre: "Explication chute Israël" },
            { ref: "25:9", titre: "Le Temple brûlé" }
        ]
    },

    "1 Chroniques": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Le Chroniste (Esdras?)",
        profession: "Scribe sacerdotal",
        date: "IVe av. J.-C.",
        lieu: "Jérusalem post-exilique",
        destinataires: "Communauté restaurée",
        genre: "Historiographie sacerdotale",
        chapitres: 29,
        versets: 942,
        resume: "Généalogies d'Adam à l'exil, David idéalisé organisateur du culte, préparatifs du Temple.",
        themes: ["Continuité du peuple", "David et le culte", "Temple central", "Lévites"],
        structure: [
            { section: "Généalogies", chapitres: "1-9" },
            { section: "David roi", chapitres: "10-22" },
            { section: "Organisation du Temple", chapitres: "23-29" }
        ],
        versetsCles: [
            { ref: "17:11-14", titre: "Alliance davidique" },
            { ref: "29:14", titre: "Tout vient de toi" }
        ]
    },

    "2 Chroniques": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Le Chroniste",
        profession: "Scribe sacerdotal",
        date: "IVe av. J.-C.",
        lieu: "Jérusalem post-exilique",
        destinataires: "Communauté restaurée",
        genre: "Historiographie sacerdotale",
        chapitres: 36,
        versets: 822,
        resume: "Salomon Temple, rois de Juda seuls, rétribution immédiate, réformes Ézéchias/Josias, édit Cyrus.",
        themes: ["Rétribution immédiate", "Temple central", "Chercher YHWH", "Réformes"],
        structure: [
            { section: "Salomon et Temple", chapitres: "1-9" },
            { section: "Rois de Juda", chapitres: "10-28" },
            { section: "Réformes et exil", chapitres: "29-36" }
        ],
        versetsCles: [
            { ref: "7:14", titre: "Si mon peuple s'humilie" },
            { ref: "36:23", titre: "Que chacun monte" }
        ]
    },

    "Esdras": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Esdras",
        profession: "Prêtre-scribe",
        date: "Ve av. J.-C.",
        lieu: "De Babylone à Jérusalem",
        destinataires: "Communauté restaurée",
        genre: "Mémoires de restauration",
        chapitres: 10,
        versets: 280,
        resume: "Retours d'exil: Zorobabel 538 av. J.-C. Temple 515, Esdras 458 Loi et réforme mariages mixtes.",
        themes: ["Fidélité de Dieu", "Reconstruction Temple", "Loi centrale", "Sainteté"],
        structure: [
            { section: "Premier retour Temple", chapitres: "1-6" },
            { section: "Esdras et réforme", chapitres: "7-10" }
        ],
        versetsCles: [
            { ref: "1:1", titre: "Esprit de Cyrus réveillé" },
            { ref: "7:10", titre: "Esdras étudia la Loi" }
        ]
    },

    "Néhémie": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Néhémie",
        profession: "Échanson puis gouverneur",
        date: "Ve av. J.-C.",
        lieu: "De Suse à Jérusalem",
        destinataires: "Communauté de Jérusalem",
        genre: "Mémoires personnelles",
        chapitres: 13,
        versets: 406,
        resume: "Néhémie 445 av. J.-C.: murailles en 52 jours malgré opposition, réveil spirituel avec Esdras, réformes.",
        themes: ["Prière fondement", "Vigilance", "Justice sociale", "Sainteté sabbat"],
        structure: [
            { section: "Murailles 52 jours", chapitres: "1-7" },
            { section: "Réveil et réformes", chapitres: "8-13" }
        ],
        versetsCles: [
            { ref: "2:20", titre: "Dieu nous fera réussir" },
            { ref: "8:10", titre: "Joie de l'Éternel" }
        ]
    },

    "Esther": {
        partie: "Livres Historiques",
        couleur: "#2E8B57",
        auteur: "Anonyme (Mardochée?)",
        profession: "Chroniqueur de cour",
        date: "Ve-IVe av. J.-C.",
        lieu: "Suse (Perse)",
        destinataires: "Juifs de la diaspora",
        genre: "Nouvelle historique",
        chapitres: 10,
        versets: 167,
        resume: "Esther reine en Perse, complot Haman exterminer Juifs, Esther intercède, Haman pendu, fête Purim.",
        themes: ["Providence cachée", "Courage d'Esther", "Renversement", "Identité juive"],
        structure: [
            { section: "Esther devient reine", chapitres: "1-2" },
            { section: "Complot et délivrance", chapitres: "3-7" },
            { section: "Victoire et Purim", chapitres: "8-10" }
        ],
        versetsCles: [
            { ref: "4:14", titre: "Pour un temps comme celui-ci" },
            { ref: "4:16", titre: "Si je péris, je péris" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ANCIEN TESTAMENT - LIVRES POÉTIQUES (5 livres)
    // ═══════════════════════════════════════════════════════════════════════
    "Job": {
        partie: "Livres Poétiques",
        couleur: "#9370DB",
        auteur: "Anonyme",
        profession: "Sage",
        date: "IXe-Ve av. J.-C.",
        lieu: "Uz",
        destinataires: "Chercheurs de sagesse",
        genre: "Dialogue poétique",
        chapitres: 42,
        versets: 1070,
        resume: "Job juste éprouvé, dialogues sur la souffrance, Dieu répond du tourbillon, restauration double.",
        themes: ["Souffrance du juste", "Souveraineté de Dieu", "Sagesse limitée"],
        structure: [
            { section: "Prologue: épreuves", chapitres: "1-2" },
            { section: "Dialogues avec amis", chapitres: "3-37" },
            { section: "Dieu répond", chapitres: "38-42" }
        ],
        versetsCles: [
            { ref: "19:25", titre: "Mon Rédempteur est vivant" },
            { ref: "42:5", titre: "Mon œil t'a vu" }
        ]
    },

    "Psaumes": {
        partie: "Livres Poétiques",
        couleur: "#9370DB",
        auteur: "David et autres",
        profession: "Roi, musiciens",
        date: "Xe-IIIe av. J.-C.",
        lieu: "Israël",
        destinataires: "Adorateurs",
        genre: "Poésie liturgique",
        chapitres: 150,
        versets: 2461,
        resume: "150 prières et louanges: lamentations, actions de grâces, psaumes royaux, de pèlerinage.",
        themes: ["Louange", "Lamentation", "Confiance", "Messie", "Torah"],
        structure: [
            { section: "Livre I", chapitres: "1-41" },
            { section: "Livre II", chapitres: "42-72" },
            { section: "Livre III", chapitres: "73-89" },
            { section: "Livre IV", chapitres: "90-106" },
            { section: "Livre V", chapitres: "107-150" }
        ],
        versetsCles: [
            { ref: "1:1-2", titre: "Heureux l'homme" },
            { ref: "23:1", titre: "L'Éternel est mon berger" },
            { ref: "119:105", titre: "Ta parole, lampe" }
        ]
    },

    "Proverbes": {
        partie: "Livres Poétiques",
        couleur: "#9370DB",
        auteur: "Salomon principalement",
        profession: "Roi sage",
        date: "Xe-Ve av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Chercheurs de sagesse",
        genre: "Littérature de sagesse",
        chapitres: 31,
        versets: 915,
        resume: "Sagesse pratique: crainte de l'Éternel, paroles, famille, travail, femme vertueuse.",
        themes: ["Crainte de l'Éternel", "Sagesse vs folie", "Paroles", "Famille"],
        structure: [
            { section: "Appels de la Sagesse", chapitres: "1-9" },
            { section: "Proverbes de Salomon", chapitres: "10-29" },
            { section: "Agur et Lemuel", chapitres: "30-31" }
        ],
        versetsCles: [
            { ref: "1:7", titre: "Crainte de l'Éternel" },
            { ref: "31:10", titre: "Femme vertueuse" }
        ]
    },

    "Ecclésiaste": {
        partie: "Livres Poétiques",
        couleur: "#9370DB",
        auteur: "Salomon (Qohélet)",
        profession: "Roi sage",
        date: "Xe-IIIe av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Chercheurs de sens",
        genre: "Réflexion philosophique",
        chapitres: 12,
        versets: 222,
        resume: "Vanité des vanités, recherche du sens, un temps pour tout, crains Dieu garde ses commandements.",
        themes: ["Vanité", "Sagesse limitée", "Temps", "Crainte de Dieu"],
        structure: [
            { section: "Vanité de tout", chapitres: "1-6" },
            { section: "Sagesse et temps", chapitres: "7-11" },
            { section: "Conclusion", chapitres: "12" }
        ],
        versetsCles: [
            { ref: "1:2", titre: "Vanité des vanités" },
            { ref: "3:1", titre: "Un temps pour tout" },
            { ref: "12:13", titre: "Crains Dieu" }
        ]
    },

    "Cantique des Cantiques": {
        partie: "Livres Poétiques",
        couleur: "#9370DB",
        auteur: "Salomon",
        profession: "Roi",
        date: "Xe av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Peuple d'Israël",
        genre: "Poème d'amour",
        chapitres: 8,
        versets: 117,
        resume: "Poème célébrant l'amour conjugal, allégorie de l'amour entre Dieu et son peuple.",
        themes: ["Amour conjugal", "Beauté", "Désir", "Union", "Allégorie"],
        structure: [
            { section: "Recherche de l'aimé", chapitres: "1-3" },
            { section: "Louanges mutuelles", chapitres: "4-5" },
            { section: "Union consommée", chapitres: "6-8" }
        ],
        versetsCles: [
            { ref: "2:4", titre: "Sa bannière: l'amour" },
            { ref: "8:6", titre: "L'amour fort comme la mort" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ANCIEN TESTAMENT - PROPHÈTES (17 livres)
    // ═══════════════════════════════════════════════════════════════════════
    "Ésaïe": {
        partie: "Prophètes",
        couleur: "#DC143C",
        auteur: "Ésaïe",
        profession: "Prophète",
        date: "VIIIe av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Juda et Jérusalem",
        genre: "Prophétie",
        chapitres: 66,
        versets: 1292,
        resume: "Jugement, Serviteur souffrant, consolation, nouvelle création.",
        themes: ["Sainteté YHWH", "Messie", "Serviteur", "Salut"],
        structure: [
            { section: "Jugement", chapitres: "1-39" },
            { section: "Consolation", chapitres: "40-55" },
            { section: "Gloire future", chapitres: "56-66" }
        ],
        versetsCles: [
            { ref: "6:3", titre: "Saint saint saint" },
            { ref: "53:5", titre: "Blessé pour nos péchés" }
        ]
    },

    "Jérémie": {
        partie: "Prophètes",
        couleur: "#DC143C",
        auteur: "Jérémie",
        profession: "Prophète",
        date: "VIIe-VIe av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Juda",
        genre: "Prophétie",
        chapitres: 52,
        versets: 1364,
        resume: "Chute Jérusalem annoncée, nouvelle alliance, espoir restauration.",
        themes: ["Nouvelle alliance", "Jugement", "Restauration"],
        structure: [
            { section: "Oracles", chapitres: "1-25" },
            { section: "Biographie", chapitres: "26-45" },
            { section: "Nations", chapitres: "46-52" }
        ],
        versetsCles: [
            { ref: "1:5", titre: "Je t'ai connu" },
            { ref: "31:31", titre: "Nouvelle alliance" }
        ]
    },

    "Lamentations": {
        partie: "Prophètes",
        couleur: "#DC143C",
        auteur: "Jérémie (tradition)",
        profession: "Prophète",
        date: "586 av. J.-C.",
        lieu: "Jérusalem détruite",
        destinataires: "Exilés",
        genre: "Poésie élégiaque",
        chapitres: 5,
        versets: 154,
        resume: "Cinq poèmes pleurant destruction Jérusalem, espoir miséricorde.",
        themes: ["Deuil", "Péché", "Miséricorde", "Espoir"],
        structure: [
            { section: "Désolation", chapitres: "1-2" },
            { section: "Espoir", chapitres: "3" },
            { section: "Repentance", chapitres: "4-5" }
        ],
        versetsCles: [
            { ref: "3:22-23", titre: "Bontés de l'Éternel" }
        ]
    },

    "Ézéchiel": {
        partie: "Prophètes",
        couleur: "#DC143C",
        auteur: "Ézéchiel",
        profession: "Prêtre-prophète",
        date: "VIe av. J.-C.",
        lieu: "Exil babylonien",
        destinataires: "Exilés",
        genre: "Prophétie apocalyptique",
        chapitres: 48,
        versets: 1273,
        resume: "Visions gloire YHWH, jugements, vallée ossements, Temple nouveau.",
        themes: ["Gloire YHWH", "Responsabilité", "Cœur nouveau", "Temple"],
        structure: [
            { section: "Jugement Jérusalem", chapitres: "1-24" },
            { section: "Jugement nations", chapitres: "25-32" },
            { section: "Restauration", chapitres: "33-48" }
        ],
        versetsCles: [
            { ref: "36:26", titre: "Cœur nouveau" },
            { ref: "37:1-14", titre: "Vallée ossements" }
        ]
    },

    "Daniel": {
        partie: "Prophètes",
        couleur: "#DC143C",
        auteur: "Daniel",
        profession: "Haut fonctionnaire",
        date: "VIe av. J.-C.",
        lieu: "Babylone et Perse",
        destinataires: "Exilés",
        genre: "Apocalypse",
        chapitres: 12,
        versets: 357,
        resume: "Fidélité en exil, visions 4 empires, 70 semaines, Fils de l'homme.",
        themes: ["Fidélité", "Souveraineté", "Royaumes", "Fils d'homme"],
        structure: [
            { section: "Récits historiques", chapitres: "1-6" },
            { section: "Visions apocalyptiques", chapitres: "7-12" }
        ],
        versetsCles: [
            { ref: "2:44", titre: "Royaume éternel" },
            { ref: "7:13", titre: "Fils de l'homme" }
        ]
    },

    "Osée": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Osée",
        profession: "Prophète",
        date: "VIIIe av. J.-C.",
        lieu: "Royaume du Nord",
        destinataires: "Israël",
        genre: "Prophétie symbolique",
        chapitres: 14,
        versets: 197,
        resume: "Mariage symbolique: amour fidèle YHWH malgré infidélité Israël.",
        themes: ["Amour fidèle", "Idolâtrie", "Connaissance Dieu"],
        structure: [
            { section: "Mariage symbolique", chapitres: "1-3" },
            { section: "Oracles", chapitres: "4-14" }
        ],
        versetsCles: [
            { ref: "6:6", titre: "Miséricorde non sacrifices" }
        ]
    },

    "Joël": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Joël",
        profession: "Prophète",
        date: "IXe-Ve av. J.-C.",
        lieu: "Juda",
        destinataires: "Juda",
        genre: "Prophétie",
        chapitres: 3,
        versets: 73,
        resume: "Sauterelles, jour YHWH, effusion Esprit, jugement nations.",
        themes: ["Jour YHWH", "Repentance", "Esprit", "Jugement"],
        structure: [
            { section: "Sauterelles", chapitres: "1-2" },
            { section: "Esprit et jugement", chapitres: "2-3" }
        ],
        versetsCles: [
            { ref: "2:28", titre: "Effusion Esprit" }
        ]
    },

    "Amos": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Amos",
        profession: "Berger",
        date: "VIIIe av. J.-C.",
        lieu: "Royaume du Nord",
        destinataires: "Israël",
        genre: "Prophétie sociale",
        chapitres: 9,
        versets: 146,
        resume: "Justice sociale, jugements nations, privilège = responsabilité.",
        themes: ["Justice", "Jugement", "Faux culte", "Restauration"],
        structure: [
            { section: "Jugements", chapitres: "1-2" },
            { section: "Oracles Israël", chapitres: "3-6" },
            { section: "Visions", chapitres: "7-9" }
        ],
        versetsCles: [
            { ref: "5:24", titre: "Justice comme torrent" }
        ]
    },

    "Abdias": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Abdias",
        profession: "Prophète",
        date: "VIe av. J.-C.",
        lieu: "Juda",
        destinataires: "Juda",
        genre: "Oracle",
        chapitres: 1,
        versets: 21,
        resume: "Oracle contre Édom, jour YHWH, royaume à YHWH.",
        themes: ["Jugement Édom", "Orgueil", "Jour YHWH"],
        structure: [
            { section: "Jugement Édom", chapitres: "1" }
        ],
        versetsCles: [
            { ref: "1:15", titre: "Jour YHWH proche" }
        ]
    },

    "Jonas": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Anonyme",
        profession: "Narrateur",
        date: "VIIIe av. J.-C.",
        lieu: "Israël et Ninive",
        destinataires: "Israël",
        genre: "Récit prophétique",
        chapitres: 4,
        versets: 48,
        resume: "Fuite, poisson 3 jours, Ninive repent, leçon compassion universelle.",
        themes: ["Miséricorde", "Repentance", "Mission", "Colère"],
        structure: [
            { section: "Fuite et poisson", chapitres: "1-2" },
            { section: "Ninive et leçon", chapitres: "3-4" }
        ],
        versetsCles: [
            { ref: "1:17", titre: "3 jours dans poisson" },
            { ref: "4:2", titre: "Dieu compatissant" }
        ]
    },

    "Michée": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Michée",
        profession: "Prophète",
        date: "VIIIe av. J.-C.",
        lieu: "Juda",
        destinataires: "Juda et Samarie",
        genre: "Prophétie",
        chapitres: 7,
        versets: 105,
        resume: "Justice sociale, Bethléem Messie, pratique vs culte.",
        themes: ["Justice", "Messie Bethléem", "Pardon"],
        structure: [
            { section: "Jugement", chapitres: "1-3" },
            { section: "Messie", chapitres: "4-5" },
            { section: "Plaidoyer", chapitres: "6-7" }
        ],
        versetsCles: [
            { ref: "5:2", titre: "Bethléem Messie" },
            { ref: "6:8", titre: "Justice et miséricorde" }
        ]
    },

    "Nahum": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Nahum",
        profession: "Prophète",
        date: "VIIe av. J.-C.",
        lieu: "Juda",
        destinataires: "Juda",
        genre: "Oracle",
        chapitres: 3,
        versets: 47,
        resume: "Chute Ninive 612 av. J.-C., YHWH venge opprimés.",
        themes: ["Jugement Ninive", "Vengeance divine", "Justice"],
        structure: [
            { section: "YHWH vengeur", chapitres: "1" },
            { section: "Chute Ninive", chapitres: "2-3" }
        ],
        versetsCles: [
            { ref: "1:7", titre: "Bon refuge" }
        ]
    },

    "Habacuc": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Habacuc",
        profession: "Prophète",
        date: "VIIe av. J.-C.",
        lieu: "Juda",
        destinataires: "Juda",
        genre: "Dialogue prophétique",
        chapitres: 3,
        versets: 56,
        resume: "Pourquoi méchants prospèrent? Juste vit par foi, cantique confiance.",
        themes: ["Théodicée", "Foi", "Juste vit par foi", "Confiance"],
        structure: [
            { section: "Dialogue foi", chapitres: "1-2" },
            { section: "Cantique", chapitres: "3" }
        ],
        versetsCles: [
            { ref: "2:4", titre: "Juste vit par foi" },
            { ref: "3:17-18", titre: "Je me réjouirai" }
        ]
    },

    "Sophonie": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Sophonie",
        profession: "Prophète",
        date: "VIIe av. J.-C.",
        lieu: "Juda",
        destinataires: "Juda",
        genre: "Prophétie",
        chapitres: 3,
        versets: 53,
        resume: "Jour YHWH proche, jugement universel, reste purifié, joie.",
        themes: ["Jour YHWH", "Jugement", "Reste", "Joie"],
        structure: [
            { section: "Jour YHWH", chapitres: "1-2" },
            { section: "Reste et joie", chapitres: "3" }
        ],
        versetsCles: [
            { ref: "3:17", titre: "YHWH se réjouit" }
        ]
    },

    "Aggée": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Aggée",
        profession: "Prophète",
        date: "520 av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Retour exil",
        genre: "Prophétie",
        chapitres: 2,
        versets: 38,
        resume: "520 av. J.-C., encouragement rebâtir Temple, priorités, gloire future.",
        themes: ["Temple", "Priorités", "Gloire", "YHWH avec nous"],
        structure: [
            { section: "Appel rebâtir", chapitres: "1" },
            { section: "Gloire promesses", chapitres: "2" }
        ],
        versetsCles: [
            { ref: "2:9", titre: "Gloire future" }
        ]
    },

    "Zacharie": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Zacharie",
        profession: "Prophète",
        date: "520 av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Retour exil",
        genre: "Prophétie apocalyptique",
        chapitres: 14,
        versets: 211,
        resume: "8 visions, Messie roi-prêtre, deux venues, royaume universel.",
        themes: ["Visions", "Messie", "Deux venues", "Royaume"],
        structure: [
            { section: "8 visions", chapitres: "1-6" },
            { section: "Jeûnes", chapitres: "7-8" },
            { section: "Oracles messianiques", chapitres: "9-14" }
        ],
        versetsCles: [
            { ref: "9:9", titre: "Roi humble" },
            { ref: "12:10", titre: "Ils ont percé" }
        ]
    },

    "Malachie": {
        partie: "Prophètes",
        couleur: "#FF6347",
        auteur: "Malachie",
        profession: "Prophète",
        date: "Ve av. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Retour exil",
        genre: "Prophétie",
        chapitres: 4,
        versets: 55,
        resume: "Dernier prophète AT, culte corrompu, dîmes, soleil justice, Élie précurseur.",
        themes: ["Amour YHWH", "Culte pur", "Dîmes", "Élie précurseur"],
        structure: [
            { section: "Culte mariages", chapitres: "1-2" },
            { section: "Dîmes Élie", chapitres: "3-4" }
        ],
        versetsCles: [
            { ref: "3:10", titre: "Éprouvez-moi" },
            { ref: "4:5", titre: "J'enverrai Élie" }
        ]
    },


    // ═══════════════════════════════════════════════════════════════════════
    // NOUVEAU TESTAMENT
    // ═══════════════════════════════════════════════════════════════════════
    "Matthieu": {
        partie: "Évangiles",
        couleur: "#4a90d9",
        auteur: "Matthieu (Lévi)",
        profession: "Ancien collecteur d'impôts, apôtre de Jésus",
        date: "60-70 ap. J.-C.",
        lieu: "Probablement Antioche de Syrie",
        destinataires: "Communauté juive convertie au christianisme",
        genre: "Évangile / Récit biographique",
        chapitres: 28,
        versets: 1071,
        resume: "Premier évangile du canon, Matthieu présente Jésus comme le Messie promis par les prophètes d'Israël. Il s'attache à démontrer l'accomplissement des Écritures hébraïques et organise l'enseignement de Jésus en cinq grands discours, dont le célèbre Sermon sur la Montagne.",
        themes: [
            "Jésus, Messie et Roi d'Israël",
            "Accomplissement des prophéties",
            "Le Royaume des cieux",
            "La nouvelle justice (Sermon sur la Montagne)",
            "L'Église comme nouvelle communauté"
        ],
        structure: [
            { section: "Naissance et enfance", chapitres: "1-2" },
            { section: "Préparation au ministère", chapitres: "3-4" },
            { section: "Sermon sur la Montagne", chapitres: "5-7" },
            { section: "Miracles et mission", chapitres: "8-10" },
            { section: "Opposition et paraboles", chapitres: "11-13" },
            { section: "Formation des disciples", chapitres: "14-18" },
            { section: "Montée vers Jérusalem", chapitres: "19-25" },
            { section: "Passion et résurrection", chapitres: "26-28" }
        ],
        versetsCles: [
            { ref: "5:3-12", titre: "Les Béatitudes" },
            { ref: "6:9-13", titre: "Le Notre Père" },
            { ref: "28:19-20", titre: "L'envoi en mission" }
        ]
    },

    "Marc": {
        partie: "Évangiles",
        couleur: "#4a90d9",
        auteur: "Marc (Jean-Marc)",
        profession: "Collaborateur de Pierre et Paul",
        date: "65-70 ap. J.-C.",
        lieu: "Rome",
        destinataires: "Chrétiens d'origine païenne, probablement à Rome",
        genre: "Évangile / Récit biographique",
        chapitres: 16,
        versets: 678,
        resume: "L'évangile le plus court et probablement le plus ancien. Marc présente Jésus comme le Fils de Dieu en action, multipliant les récits de miracles et de guérisons. Son style vif et direct donne un sentiment d'urgence au ministère de Jésus.",
        themes: [
            "Jésus, Fils de Dieu et Serviteur souffrant",
            "Le secret messianique",
            "La puissance de Jésus sur le mal",
            "Le chemin de la croix",
            "L'incompréhension des disciples"
        ],
        structure: [
            { section: "Préparation et début du ministère", chapitres: "1" },
            { section: "Ministère en Galilée", chapitres: "2-6" },
            { section: "Voyages hors de Galilée", chapitres: "7-9" },
            { section: "Montée vers Jérusalem", chapitres: "10" },
            { section: "Ministère à Jérusalem", chapitres: "11-13" },
            { section: "Passion et résurrection", chapitres: "14-16" }
        ],
        versetsCles: [
            { ref: "1:15", titre: "Annonce du Royaume" },
            { ref: "8:29", titre: "Confession de Pierre" },
            { ref: "10:45", titre: "Le Fils de l'homme serviteur" }
        ]
    },

    "Luc": {
        partie: "Évangiles",
        couleur: "#4a90d9",
        auteur: "Luc",
        profession: "Médecin, compagnon de voyage de Paul",
        date: "80-85 ap. J.-C.",
        lieu: "Probablement Grèce ou Asie Mineure",
        destinataires: "Théophile et les chrétiens d'origine grecque",
        genre: "Évangile / Récit historique",
        chapitres: 24,
        versets: 1151,
        resume: "Luc, seul auteur païen du Nouveau Testament, offre un récit ordonné et détaillé de la vie de Jésus. Son évangile met en valeur la miséricorde divine envers les exclus : pauvres, femmes, pécheurs et étrangers. C'est l'évangile de la joie et de la prière.",
        themes: [
            "Jésus, Sauveur universel",
            "La miséricorde envers les exclus",
            "Le rôle de l'Esprit Saint",
            "La prière et la joie",
            "Les femmes dans le ministère de Jésus"
        ],
        structure: [
            { section: "Prologue et récits de l'enfance", chapitres: "1-2" },
            { section: "Préparation au ministère", chapitres: "3-4" },
            { section: "Ministère en Galilée", chapitres: "5-9" },
            { section: "Voyage vers Jérusalem", chapitres: "10-19" },
            { section: "Ministère à Jérusalem", chapitres: "20-21" },
            { section: "Passion et résurrection", chapitres: "22-24" }
        ],
        versetsCles: [
            { ref: "1:46-55", titre: "Le Magnificat" },
            { ref: "15:11-32", titre: "Le fils prodigue" },
            { ref: "23:34", titre: "Pardon sur la croix" }
        ]
    },

    "Jean": {
        partie: "Évangiles",
        couleur: "#4a90d9",
        auteur: "Jean",
        profession: "Apôtre, \"le disciple que Jésus aimait\"",
        date: "90-100 ap. J.-C.",
        lieu: "Éphèse",
        destinataires: "Communautés chrétiennes d'Asie Mineure",
        genre: "Évangile / Récit théologique",
        chapitres: 21,
        versets: 879,
        resume: "Le quatrième évangile se distingue par sa profondeur théologique. Jean médite sur l'identité divine de Jésus, le Verbe fait chair. À travers sept signes et sept \"Je suis\", il invite le lecteur à croire que Jésus est le Christ, le Fils de Dieu.",
        themes: [
            "Jésus, Verbe éternel et Fils de Dieu",
            "La lumière face aux ténèbres",
            "Les sept signes et les sept \"Je suis\"",
            "La vie éternelle par la foi",
            "L'amour comme commandement nouveau"
        ],
        structure: [
            { section: "Prologue", chapitres: "1:1-18" },
            { section: "Le livre des signes", chapitres: "1-12" },
            { section: "Le livre de la gloire", chapitres: "13-20" },
            { section: "Épilogue", chapitres: "21" }
        ],
        versetsCles: [
            { ref: "1:1-14", titre: "Le Prologue" },
            { ref: "3:16", titre: "Dieu a tant aimé le monde" },
            { ref: "14:6", titre: "Je suis le chemin, la vérité, la vie" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ACTES
    // ═══════════════════════════════════════════════════════════════════════
    "Actes": {
        partie: "Actes",
        couleur: "#2ecc71",
        auteur: "Luc",
        profession: "Médecin, compagnon de voyage de Paul",
        date: "80-85 ap. J.-C.",
        lieu: "Probablement Grèce",
        destinataires: "Théophile et les chrétiens d'origine grecque",
        genre: "Récit historique",
        chapitres: 28,
        versets: 1007,
        resume: "Suite de l'évangile de Luc, les Actes racontent la naissance et l'expansion de l'Église primitive, de Jérusalem jusqu'à Rome. Le livre suit principalement deux figures : Pierre (ch. 1-12) et Paul (ch. 13-28), sous l'impulsion de l'Esprit Saint.",
        themes: [
            "L'action de l'Esprit Saint",
            "L'expansion universelle de l'Évangile",
            "La communauté des croyants",
            "Le témoignage jusqu'au martyre",
            "La relation entre Juifs et païens"
        ],
        structure: [
            { section: "L'Église à Jérusalem", chapitres: "1-7" },
            { section: "Expansion en Judée et Samarie", chapitres: "8-12" },
            { section: "Premier voyage de Paul", chapitres: "13-14" },
            { section: "Concile de Jérusalem", chapitres: "15" },
            { section: "Deuxième et troisième voyages", chapitres: "16-21" },
            { section: "Arrestation et voyage à Rome", chapitres: "22-28" }
        ],
        versetsCles: [
            { ref: "1:8", titre: "Programme du livre" },
            { ref: "2:42-47", titre: "La première communauté" },
            { ref: "17:22-31", titre: "Discours à Athènes" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ÉPÎTRES DE PAUL
    // ═══════════════════════════════════════════════════════════════════════
    "Romains": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations, ancien pharisien",
        date: "57-58 ap. J.-C.",
        lieu: "Corinthe",
        destinataires: "L'Église de Rome",
        genre: "Épître / Traité théologique",
        chapitres: 16,
        versets: 433,
        resume: "Chef-d'œuvre théologique de Paul, l'épître aux Romains expose systématiquement l'Évangile : tous ont péché, mais tous peuvent être justifiés par la foi en Jésus-Christ. Paul y développe les thèmes de la grâce, de la foi et de la vie dans l'Esprit.",
        themes: [
            "La justification par la foi",
            "L'universalité du péché et du salut",
            "La vie dans l'Esprit",
            "Israël et les nations",
            "L'éthique chrétienne"
        ],
        structure: [
            { section: "Introduction", chapitres: "1:1-17" },
            { section: "La colère de Dieu contre le péché", chapitres: "1:18-3:20" },
            { section: "La justification par la foi", chapitres: "3:21-5:21" },
            { section: "La sanctification", chapitres: "6-8" },
            { section: "Israël et le salut", chapitres: "9-11" },
            { section: "Exhortations pratiques", chapitres: "12-15" },
            { section: "Salutations finales", chapitres: "16" }
        ],
        versetsCles: [
            { ref: "1:16-17", titre: "Thème de l'épître" },
            { ref: "8:28-39", titre: "Plus que vainqueurs" },
            { ref: "12:1-2", titre: "Le culte raisonnable" }
        ]
    },

    "1 Corinthiens": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "54-55 ap. J.-C.",
        lieu: "Éphèse",
        destinataires: "L'Église de Corinthe",
        genre: "Épître pastorale",
        chapitres: 16,
        versets: 437,
        resume: "Paul répond aux problèmes d'une jeune Église divisée : factions, immoralité, procès entre chrétiens, questions sur le mariage et les idoles. Il enseigne sur les charismes, l'amour (ch. 13) et la résurrection des morts.",
        themes: [
            "L'unité de l'Église",
            "La sagesse de la croix",
            "Le corps comme temple",
            "Les dons spirituels et l'amour",
            "La résurrection"
        ],
        structure: [
            { section: "Divisions dans l'Église", chapitres: "1-4" },
            { section: "Désordres moraux", chapitres: "5-6" },
            { section: "Questions sur le mariage", chapitres: "7" },
            { section: "Viandes sacrifiées aux idoles", chapitres: "8-10" },
            { section: "Le culte et les charismes", chapitres: "11-14" },
            { section: "La résurrection", chapitres: "15" },
            { section: "Conclusion", chapitres: "16" }
        ],
        versetsCles: [
            { ref: "1:18-25", titre: "La folie de la croix" },
            { ref: "13:1-13", titre: "L'hymne à l'amour" },
            { ref: "15:3-8", titre: "Le kérygme" }
        ]
    },

    "2 Corinthiens": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "55-56 ap. J.-C.",
        lieu: "Macédoine",
        destinataires: "L'Église de Corinthe",
        genre: "Épître pastorale",
        chapitres: 13,
        versets: 257,
        resume: "Lettre très personnelle où Paul défend son apostolat face à ses détracteurs. Il partage ses souffrances, sa faiblesse et la consolation de Dieu. Il encourage aussi la générosité envers l'Église de Jérusalem.",
        themes: [
            "Le ministère apostolique",
            "La force dans la faiblesse",
            "La réconciliation avec Dieu",
            "La générosité chrétienne",
            "La nouvelle alliance"
        ],
        structure: [
            { section: "Consolation dans l'épreuve", chapitres: "1-2" },
            { section: "Le ministère de la nouvelle alliance", chapitres: "3-6" },
            { section: "La collecte pour Jérusalem", chapitres: "7-9" },
            { section: "Défense de l'apostolat de Paul", chapitres: "10-13" }
        ],
        versetsCles: [
            { ref: "4:7-10", titre: "Trésor dans des vases d'argile" },
            { ref: "5:17-21", titre: "Nouvelle création" },
            { ref: "12:9-10", titre: "La force dans la faiblesse" }
        ]
    },

    "Galates": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "49-55 ap. J.-C.",
        lieu: "Incertain (Antioche, Éphèse ou Corinthe)",
        destinataires: "Les Églises de Galatie",
        genre: "Épître polémique",
        chapitres: 6,
        versets: 149,
        resume: "Manifeste de la liberté chrétienne. Paul s'oppose vigoureusement à ceux qui veulent imposer la circoncision et la Loi aux païens convertis. Il affirme que le salut vient par la foi seule, non par les œuvres de la Loi.",
        themes: [
            "La justification par la foi seule",
            "La liberté chrétienne",
            "L'unité en Christ",
            "La vie selon l'Esprit",
            "Le fruit de l'Esprit"
        ],
        structure: [
            { section: "Défense de l'Évangile de Paul", chapitres: "1-2" },
            { section: "Foi et Loi", chapitres: "3-4" },
            { section: "La liberté chrétienne", chapitres: "5-6" }
        ],
        versetsCles: [
            { ref: "2:20", titre: "Crucifié avec Christ" },
            { ref: "3:28", titre: "Tous un en Christ" },
            { ref: "5:22-23", titre: "Le fruit de l'Esprit" }
        ]
    },

    "Éphésiens": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "60-62 ap. J.-C.",
        lieu: "Rome (captivité)",
        destinataires: "L'Église d'Éphèse et les Églises d'Asie",
        genre: "Épître circulaire",
        chapitres: 6,
        versets: 155,
        resume: "Grande vision de l'Église comme corps du Christ et épouse bien-aimée. Paul médite sur le dessein éternel de Dieu : réconcilier toutes choses en Christ. La seconde partie offre des exhortations pour la vie chrétienne.",
        themes: [
            "Le dessein éternel de Dieu",
            "L'Église, corps du Christ",
            "L'unité Juifs-païens",
            "La vie nouvelle en Christ",
            "Le combat spirituel"
        ],
        structure: [
            { section: "Bénédictions spirituelles en Christ", chapitres: "1" },
            { section: "Salut par grâce et unité", chapitres: "2-3" },
            { section: "Vie digne de l'appel", chapitres: "4-5" },
            { section: "Le combat spirituel", chapitres: "6" }
        ],
        versetsCles: [
            { ref: "2:8-10", titre: "Sauvés par grâce" },
            { ref: "4:4-6", titre: "Un seul Seigneur, une seule foi" },
            { ref: "6:10-18", titre: "L'armure de Dieu" }
        ]
    },

    "Philippiens": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "60-62 ap. J.-C.",
        lieu: "Rome (captivité)",
        destinataires: "L'Église de Philippes",
        genre: "Épître de remerciement",
        chapitres: 4,
        versets: 104,
        resume: "Lettre de la joie, écrite depuis la prison. Paul remercie les Philippiens pour leur soutien et les exhorte à l'unité et à l'humilité, citant le magnifique hymne au Christ (2:6-11). Malgré ses chaînes, Paul déborde d'espérance.",
        themes: [
            "La joie dans toutes circonstances",
            "L'humilité du Christ",
            "Le combat pour l'Évangile",
            "La communion fraternelle",
            "La course vers le but"
        ],
        structure: [
            { section: "Action de grâce et prière", chapitres: "1:1-11" },
            { section: "Situation de Paul", chapitres: "1:12-26" },
            { section: "Exhortations à l'unité", chapitres: "1:27-2:18" },
            { section: "Projets et nouvelles", chapitres: "2:19-30" },
            { section: "La vraie justice", chapitres: "3" },
            { section: "Joie et remerciements", chapitres: "4" }
        ],
        versetsCles: [
            { ref: "2:5-11", titre: "L'hymne au Christ" },
            { ref: "3:13-14", titre: "Courir vers le but" },
            { ref: "4:4-7", titre: "Réjouissez-vous toujours" }
        ]
    },

    "Colossiens": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "60-62 ap. J.-C.",
        lieu: "Rome (captivité)",
        destinataires: "L'Église de Colosses",
        genre: "Épître doctrinale",
        chapitres: 4,
        versets: 95,
        resume: "Face à de faux enseignements, Paul proclame la suprématie absolue du Christ sur toute la création. En lui habite toute la plénitude de Dieu. Les croyants sont appelés à vivre cette réalité dans leur quotidien.",
        themes: [
            "La suprématie du Christ",
            "La plénitude en Christ",
            "Mort et résurrection avec Christ",
            "La vie nouvelle",
            "Les relations transformées"
        ],
        structure: [
            { section: "Action de grâce", chapitres: "1:1-14" },
            { section: "La suprématie du Christ", chapitres: "1:15-2:5" },
            { section: "Mise en garde contre les erreurs", chapitres: "2:6-23" },
            { section: "La vie nouvelle en Christ", chapitres: "3-4" }
        ],
        versetsCles: [
            { ref: "1:15-20", titre: "Hymne au Christ cosmique" },
            { ref: "2:9-10", titre: "Plénitude en Christ" },
            { ref: "3:1-4", titre: "Cherchez les choses d'en haut" }
        ]
    },

    "1 Thessaloniciens": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "50-51 ap. J.-C.",
        lieu: "Corinthe",
        destinataires: "L'Église de Thessalonique",
        genre: "Épître pastorale",
        chapitres: 5,
        versets: 89,
        resume: "Probablement la plus ancienne lettre de Paul. Il encourage une jeune communauté persécutée, répond à leurs questions sur le retour du Christ et le sort des défunts, et les exhorte à la sanctification.",
        themes: [
            "L'exemple des Thessaloniciens",
            "La sanctification",
            "Le retour du Christ",
            "L'espérance pour les défunts",
            "La vigilance"
        ],
        structure: [
            { section: "Action de grâce", chapitres: "1" },
            { section: "Le ministère de Paul", chapitres: "2-3" },
            { section: "Exhortations à la sainteté", chapitres: "4:1-12" },
            { section: "Le retour du Seigneur", chapitres: "4:13-5:11" },
            { section: "Instructions finales", chapitres: "5:12-28" }
        ],
        versetsCles: [
            { ref: "4:13-18", titre: "Espérance de la résurrection" },
            { ref: "5:16-18", titre: "Joie, prière, reconnaissance" },
            { ref: "5:23", titre: "Sanctification complète" }
        ]
    },

    "2 Thessaloniciens": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "51-52 ap. J.-C.",
        lieu: "Corinthe",
        destinataires: "L'Église de Thessalonique",
        genre: "Épître eschatologique",
        chapitres: 3,
        versets: 47,
        resume: "Paul corrige des malentendus sur le Jour du Seigneur. Certains, croyant ce jour imminent, avaient cessé de travailler. Paul enseigne sur l'homme de péché et rappelle l'importance du travail.",
        themes: [
            "La persévérance dans l'épreuve",
            "Le Jour du Seigneur",
            "L'homme de péché",
            "La dignité du travail",
            "La tradition apostolique"
        ],
        structure: [
            { section: "Encouragement dans la persécution", chapitres: "1" },
            { section: "Le Jour du Seigneur", chapitres: "2:1-12" },
            { section: "Exhortations à tenir ferme", chapitres: "2:13-17" },
            { section: "Contre l'oisiveté", chapitres: "3" }
        ],
        versetsCles: [
            { ref: "2:1-4", titre: "L'apostasie et l'homme de péché" },
            { ref: "2:15", titre: "Gardez les traditions" },
            { ref: "3:10", titre: "Qui ne travaille pas ne mange pas" }
        ]
    },

    "1 Timothée": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "62-65 ap. J.-C.",
        lieu: "Macédoine",
        destinataires: "Timothée, responsable de l'Église d'Éphèse",
        genre: "Épître pastorale",
        chapitres: 6,
        versets: 113,
        resume: "Instructions à un jeune responsable d'Église. Paul traite de l'organisation de la communauté, des critères pour les ministères (évêques, diacres), et met en garde contre les faux enseignements.",
        themes: [
            "La saine doctrine",
            "L'organisation de l'Église",
            "Les qualités des responsables",
            "Le combat de la foi",
            "Le rapport à l'argent"
        ],
        structure: [
            { section: "Mise en garde contre les faux docteurs", chapitres: "1" },
            { section: "La prière et les femmes", chapitres: "2" },
            { section: "Les ministères", chapitres: "3" },
            { section: "Contre les faux enseignements", chapitres: "4" },
            { section: "Diverses instructions", chapitres: "5-6" }
        ],
        versetsCles: [
            { ref: "2:5-6", titre: "Un seul médiateur" },
            { ref: "3:16", titre: "Le mystère de la piété" },
            { ref: "6:10", titre: "L'amour de l'argent" }
        ]
    },

    "2 Timothée": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "64-67 ap. J.-C.",
        lieu: "Rome (seconde captivité)",
        destinataires: "Timothée",
        genre: "Épître pastorale / Testament spirituel",
        chapitres: 4,
        versets: 83,
        resume: "Dernière lettre de Paul, écrite face à la mort. Il transmet le flambeau à Timothée, l'exhortant à garder le dépôt de la foi et à persévérer dans le ministère malgré les épreuves. Testament émouvant d'un apôtre.",
        themes: [
            "La transmission de la foi",
            "La fidélité dans l'épreuve",
            "L'inspiration des Écritures",
            "Le bon combat de la foi",
            "L'espérance finale"
        ],
        structure: [
            { section: "Exhortation à la fidélité", chapitres: "1" },
            { section: "L'exemple du soldat, de l'athlète, du laboureur", chapitres: "2" },
            { section: "Les temps difficiles", chapitres: "3" },
            { section: "Testament de Paul", chapitres: "4" }
        ],
        versetsCles: [
            { ref: "1:7", titre: "Esprit de force et d'amour" },
            { ref: "3:16-17", titre: "L'Écriture inspirée" },
            { ref: "4:7-8", titre: "J'ai combattu le bon combat" }
        ]
    },

    "Tite": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "62-65 ap. J.-C.",
        lieu: "Macédoine ou Nicopolis",
        destinataires: "Tite, responsable des Églises de Crète",
        genre: "Épître pastorale",
        chapitres: 3,
        versets: 46,
        resume: "Instructions pour organiser les Églises de Crète. Paul définit les qualités des anciens, rappelle la grâce qui nous éduque et encourage les bonnes œuvres comme fruit du salut.",
        themes: [
            "Les qualités des responsables",
            "La saine doctrine",
            "La grâce éducatrice",
            "Les bonnes œuvres",
            "La vie dans la société"
        ],
        structure: [
            { section: "Les anciens et les faux docteurs", chapitres: "1" },
            { section: "La conduite chrétienne", chapitres: "2" },
            { section: "Les bonnes œuvres", chapitres: "3" }
        ],
        versetsCles: [
            { ref: "2:11-14", titre: "La grâce éducatrice" },
            { ref: "3:4-7", titre: "Sauvés par sa miséricorde" },
            { ref: "3:8", titre: "S'appliquer aux bonnes œuvres" }
        ]
    },

    "Philémon": {
        partie: "Épîtres de Paul",
        couleur: "#9b59b6",
        auteur: "Paul",
        profession: "Apôtre des nations",
        date: "60-62 ap. J.-C.",
        lieu: "Rome (captivité)",
        destinataires: "Philémon, chrétien de Colosses",
        genre: "Épître personnelle",
        chapitres: 1,
        versets: 25,
        resume: "Billet personnel où Paul intercède pour Onésime, esclave fugitif de Philémon, devenu chrétien. Paul demande à Philémon de l'accueillir non plus comme esclave mais comme frère. Chef-d'œuvre de diplomatie chrétienne.",
        themes: [
            "La fraternité en Christ",
            "Le pardon et la réconciliation",
            "La transformation par l'Évangile",
            "L'intercession",
            "L'égalité devant Dieu"
        ],
        structure: [
            { section: "Salutation et action de grâce", chapitres: "1-7" },
            { section: "Intercession pour Onésime", chapitres: "8-21" },
            { section: "Conclusion", chapitres: "22-25" }
        ],
        versetsCles: [
            { ref: "1:15-16", titre: "Plus un esclave, un frère" },
            { ref: "1:18", titre: "Mets cela sur mon compte" },
            { ref: "1:6", titre: "La communion de la foi" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ÉPÎTRES GÉNÉRALES
    // ═══════════════════════════════════════════════════════════════════════
    "Hébreux": {
        partie: "Épîtres Générales",
        couleur: "#e67e22",
        auteur: "Anonyme",
        profession: "Auteur cultivé, bon connaisseur de l'AT et de la liturgie juive",
        date: "60-70 ap. J.-C.",
        lieu: "Incertain",
        destinataires: "Chrétiens d'origine juive tentés de retourner au judaïsme",
        genre: "Homélie / Traité théologique",
        chapitres: 13,
        versets: 303,
        resume: "Magistrale démonstration de la supériorité du Christ et de la nouvelle alliance. Jésus est présenté comme le grand prêtre parfait, supérieur aux anges, à Moïse et au sacerdoce lévitique. Appel à persévérer dans la foi.",
        themes: [
            "La supériorité du Christ",
            "Le sacerdoce éternel de Jésus",
            "La nouvelle alliance",
            "La foi des ancêtres",
            "La persévérance"
        ],
        structure: [
            { section: "Supériorité du Fils", chapitres: "1-2" },
            { section: "Supérieur à Moïse et Josué", chapitres: "3-4" },
            { section: "Le sacerdoce du Christ", chapitres: "5-10" },
            { section: "La foi et l'endurance", chapitres: "11-12" },
            { section: "Exhortations finales", chapitres: "13" }
        ],
        versetsCles: [
            { ref: "1:1-3", titre: "Dieu a parlé par le Fils" },
            { ref: "11:1", titre: "Définition de la foi" },
            { ref: "12:1-2", titre: "Les yeux fixés sur Jésus" }
        ]
    },

    "Jacques": {
        partie: "Épîtres Générales",
        couleur: "#e67e22",
        auteur: "Jacques",
        profession: "\"Frère du Seigneur\", responsable de l'Église de Jérusalem",
        date: "45-50 ap. J.-C.",
        lieu: "Jérusalem",
        destinataires: "Les douze tribus dans la dispersion (judéo-chrétiens)",
        genre: "Épître de sagesse",
        chapitres: 5,
        versets: 108,
        resume: "Enseignement pratique sur la foi vivante qui se manifeste par les œuvres. Jacques aborde l'épreuve, la tentation, l'écoute de la Parole, le favoritisme, la langue, la prière et le soin des pauvres.",
        themes: [
            "La foi et les œuvres",
            "La sagesse d'en haut",
            "La maîtrise de la langue",
            "La patience dans l'épreuve",
            "Le soin des pauvres"
        ],
        structure: [
            { section: "Les épreuves et la tentation", chapitres: "1" },
            { section: "Foi et œuvres", chapitres: "2" },
            { section: "La langue et la sagesse", chapitres: "3" },
            { section: "Humilité et jugement", chapitres: "4" },
            { section: "Patience et prière", chapitres: "5" }
        ],
        versetsCles: [
            { ref: "1:22", titre: "Mettez la Parole en pratique" },
            { ref: "2:17", titre: "Foi sans œuvres est morte" },
            { ref: "5:16", titre: "La prière du juste" }
        ]
    },

    "1 Pierre": {
        partie: "Épîtres Générales",
        couleur: "#e67e22",
        auteur: "Pierre",
        profession: "Apôtre de Jésus-Christ",
        date: "64-67 ap. J.-C.",
        lieu: "Rome (\"Babylone\")",
        destinataires: "Chrétiens dispersés en Asie Mineure",
        genre: "Épître circulaire",
        chapitres: 5,
        versets: 105,
        resume: "Lettre d'encouragement à des chrétiens persécutés. Pierre rappelle l'espérance vivante de la résurrection, appelle à la sainteté et enseigne comment vivre en étrangers dans le monde tout en honorant les autorités.",
        themes: [
            "L'espérance vivante",
            "La sainteté de vie",
            "La souffrance pour Christ",
            "La soumission dans la société",
            "L'Église, peuple de Dieu"
        ],
        structure: [
            { section: "L'espérance et la sainteté", chapitres: "1" },
            { section: "L'Église, peuple de Dieu", chapitres: "2:1-10" },
            { section: "Conduite dans le monde", chapitres: "2:11-3:12" },
            { section: "Souffrir pour Christ", chapitres: "3:13-4:19" },
            { section: "Exhortations aux anciens", chapitres: "5" }
        ],
        versetsCles: [
            { ref: "1:3-5", titre: "Espérance vivante" },
            { ref: "2:9", titre: "Peuple choisi" },
            { ref: "5:7", titre: "Déchargez-vous sur lui" }
        ]
    },

    "2 Pierre": {
        partie: "Épîtres Générales",
        couleur: "#e67e22",
        auteur: "Pierre (ou disciple de Pierre)",
        profession: "Apôtre de Jésus-Christ",
        date: "64-68 ap. J.-C. (ou plus tard)",
        lieu: "Rome",
        destinataires: "Chrétiens en général",
        genre: "Testament spirituel",
        chapitres: 3,
        versets: 61,
        resume: "Testament de Pierre avant sa mort. Il met en garde contre les faux docteurs qui nient le retour du Christ. Il rappelle la certitude de la Parole prophétique et encourage à croître dans la grâce.",
        themes: [
            "La croissance spirituelle",
            "L'autorité des Écritures",
            "Les faux enseignants",
            "Le jour du Seigneur",
            "La patience de Dieu"
        ],
        structure: [
            { section: "Croître dans la foi", chapitres: "1" },
            { section: "Les faux docteurs", chapitres: "2" },
            { section: "Le jour du Seigneur", chapitres: "3" }
        ],
        versetsCles: [
            { ref: "1:20-21", titre: "L'inspiration prophétique" },
            { ref: "3:8-9", titre: "Patience divine" },
            { ref: "3:18", titre: "Croître dans la grâce" }
        ]
    },

    "1 Jean": {
        partie: "Épîtres Générales",
        couleur: "#e67e22",
        auteur: "Jean",
        profession: "Apôtre, \"le disciple que Jésus aimait\"",
        date: "90-100 ap. J.-C.",
        lieu: "Éphèse",
        destinataires: "Communautés johanniques d'Asie Mineure",
        genre: "Épître homilétique",
        chapitres: 5,
        versets: 105,
        resume: "Méditation sur la communion avec Dieu qui est lumière et amour. Jean combat ceux qui nient l'incarnation du Christ et appelle à marcher dans la lumière, à s'aimer les uns les autres et à vaincre le monde par la foi.",
        themes: [
            "Dieu est lumière et amour",
            "Marcher dans la vérité",
            "L'amour fraternel",
            "Discerner les esprits",
            "La victoire sur le monde"
        ],
        structure: [
            { section: "La communion avec Dieu", chapitres: "1:1-2:17" },
            { section: "Mise en garde contre l'antichrist", chapitres: "2:18-27" },
            { section: "Enfants de Dieu", chapitres: "2:28-3:24" },
            { section: "Discerner les esprits", chapitres: "4:1-6" },
            { section: "L'amour de Dieu", chapitres: "4:7-5:21" }
        ],
        versetsCles: [
            { ref: "1:5-7", titre: "Dieu est lumière" },
            { ref: "4:7-12", titre: "Dieu est amour" },
            { ref: "5:4", titre: "La victoire par la foi" }
        ]
    },

    "2 Jean": {
        partie: "Épîtres Générales",
        couleur: "#e67e22",
        auteur: "Jean (\"l'ancien\")",
        profession: "Apôtre",
        date: "90-100 ap. J.-C.",
        lieu: "Éphèse",
        destinataires: "\"La Dame élue et ses enfants\" (une Église)",
        genre: "Épître brève",
        chapitres: 1,
        versets: 13,
        resume: "Court billet encourageant à marcher dans la vérité et l'amour, tout en mettant en garde contre les faux enseignants qui nient la venue de Christ en chair. Ne pas les accueillir.",
        themes: [
            "La vérité et l'amour",
            "Le commandement ancien",
            "Les séducteurs",
            "La vigilance"
        ],
        structure: [
            { section: "Salutation", chapitres: "1-3" },
            { section: "Marcher dans la vérité", chapitres: "4-6" },
            { section: "Mise en garde", chapitres: "7-11" },
            { section: "Conclusion", chapitres: "12-13" }
        ],
        versetsCles: [
            { ref: "1:6", titre: "Marcher selon ses commandements" },
            { ref: "1:9", titre: "Demeurer dans l'enseignement" }
        ]
    },

    "3 Jean": {
        partie: "Épîtres Générales",
        couleur: "#e67e22",
        auteur: "Jean (\"l'ancien\")",
        profession: "Apôtre",
        date: "90-100 ap. J.-C.",
        lieu: "Éphèse",
        destinataires: "Gaïus, chrétien fidèle",
        genre: "Épître personnelle",
        chapitres: 1,
        versets: 15,
        resume: "Billet personnel à Gaïus, le félicitant pour son hospitalité envers les missionnaires itinérants. Contraste entre le bon Gaïus et le mauvais Diotrèphe qui refuse l'autorité de Jean.",
        themes: [
            "L'hospitalité chrétienne",
            "Marcher dans la vérité",
            "Le bon et le mauvais exemple",
            "Le témoignage"
        ],
        structure: [
            { section: "Éloge de Gaïus", chapitres: "1-8" },
            { section: "Critique de Diotrèphe", chapitres: "9-10" },
            { section: "Éloge de Démétrius", chapitres: "11-12" },
            { section: "Conclusion", chapitres: "13-15" }
        ],
        versetsCles: [
            { ref: "1:4", titre: "Joie pour les enfants dans la vérité" },
            { ref: "1:11", titre: "Imite le bien" }
        ]
    },

    "Jude": {
        partie: "Épîtres Générales",
        couleur: "#e67e22",
        auteur: "Jude",
        profession: "\"Serviteur de Jésus-Christ et frère de Jacques\"",
        date: "65-80 ap. J.-C.",
        lieu: "Incertain",
        destinataires: "Chrétiens en général",
        genre: "Épître polémique",
        chapitres: 1,
        versets: 25,
        resume: "Vigoureux avertissement contre des intrus qui pervertissent la grâce en débauche et renient le Seigneur. Jude utilise des exemples de l'AT et de la littérature juive pour dénoncer leur sort.",
        themes: [
            "La foi transmise une fois pour toutes",
            "Le jugement des impies",
            "La persévérance des saints",
            "La doxologie finale"
        ],
        structure: [
            { section: "Salutation et but", chapitres: "1-4" },
            { section: "Exemples de jugement", chapitres: "5-16" },
            { section: "Exhortations", chapitres: "17-23" },
            { section: "Doxologie", chapitres: "24-25" }
        ],
        versetsCles: [
            { ref: "1:3", titre: "Combattre pour la foi" },
            { ref: "1:24-25", titre: "Doxologie magnifique" }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // APOCALYPSE
    // ═══════════════════════════════════════════════════════════════════════
    "Apocalypse": {
        partie: "Apocalypse",
        couleur: "#e74c3c",
        auteur: "Jean",
        profession: "\"Votre frère et compagnon dans l'épreuve\"",
        date: "90-96 ap. J.-C.",
        lieu: "Île de Patmos (exil)",
        destinataires: "Les sept Églises d'Asie",
        genre: "Apocalypse / Prophétie",
        chapitres: 22,
        versets: 404,
        resume: "Vision grandiose du Christ glorifié et de la fin des temps. À travers des symboles puissants, Jean révèle le combat entre le bien et le mal, le jugement des nations et la victoire finale de l'Agneau. Le livre s'achève sur la nouvelle Jérusalem.",
        themes: [
            "Le Christ glorifié",
            "Le combat cosmique",
            "Les jugements divins",
            "La persévérance des saints",
            "La nouvelle création"
        ],
        structure: [
            { section: "Prologue et vision du Christ", chapitres: "1" },
            { section: "Lettres aux sept Églises", chapitres: "2-3" },
            { section: "La cour céleste et les sceaux", chapitres: "4-7" },
            { section: "Les trompettes", chapitres: "8-11" },
            { section: "Le dragon et les bêtes", chapitres: "12-14" },
            { section: "Les coupes de la colère", chapitres: "15-16" },
            { section: "Chute de Babylone", chapitres: "17-18" },
            { section: "Victoire finale", chapitres: "19-20" },
            { section: "Nouvelle Jérusalem", chapitres: "21-22" }
        ],
        versetsCles: [
            { ref: "1:8", titre: "L'Alpha et l'Oméga" },
            { ref: "3:20", titre: "Je me tiens à la porte" },
            { ref: "21:1-5", titre: "Nouveaux cieux, nouvelle terre" }
        ]
    }
};

// Rendre accessible globalement
window.LivresInfo = LivresInfo;
