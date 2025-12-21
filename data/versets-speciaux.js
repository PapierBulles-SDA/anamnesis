/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Versets Spéciaux pour "Trouve ton Verset"
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Version 2.0 - Refonte complète avec système intelligent
 * 
 * 3 PARCOURS SYMBOLIQUES :
 * - 🕊️ Trinité (3 questions) : Père, Fils, Esprit
 * - ✝️ Les Plaies (5 questions) : L'amour rédempteur du Christ
 * - ✨ Plénitude (7 questions) : Perfection divine, repos du 7ème jour
 * 
 * SYSTÈME DE MATCHING INTELLIGENT :
 * Chaque verset est tagué sur 5 dimensions pour un matching précis.
 * Plus de tirage aléatoire : le verset correspond vraiment à l'utilisateur.
 * 
 * 200 versets du NOUVEAU TESTAMENT (Louis Segond 1910)
 */

const VersetsSpeciaux = {

    // ═══════════════════════════════════════════════════════════════════════
    // CONFIGURATION DES PARCOURS
    // ═══════════════════════════════════════════════════════════════════════

    parcours: {
        trinite: {
            id: 'trinite',
            nom: 'Trinité',
            icone: '🕊️',
            questions: 3,
            symbolique: 'Père, Fils et Saint-Esprit',
            description: 'Un verset selon ta famille spirituelle',
            couleur: '#5C9EAD'
        },
        plaies: {
            id: 'plaies',
            nom: 'Les Plaies',
            icone: '✝️',
            questions: 5,
            symbolique: 'Les 5 plaies du Christ, l\'amour qui sauve',
            description: 'Un verset adapté à ton état et ton besoin',
            couleur: '#9B2335'
        },
        plenitude: {
            id: 'plenitude',
            nom: 'Plénitude',
            icone: '✨',
            questions: 7,
            symbolique: 'Le 7ème jour, repos et perfection divine',
            description: 'Un verset très personnalisé pour toi',
            couleur: '#6B5B95'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DIMENSIONS DU TAGGING
    // ═══════════════════════════════════════════════════════════════════════
    
    dimensions: {
        emotion: ['paix', 'joie', 'tristesse', 'peur', 'colere', 'confusion', 'lassitude', 'gratitude', 'esperance', 'solitude'],
        besoin: ['etre_rassure', 'etre_guide', 'etre_aime', 'trouver_force', 'lacher_prise', 'perseverer', 'pardonner', 'etre_pardonne', 'comprendre', 'agir'],
        situation: ['epreuve', 'deuil', 'attente', 'decision', 'conflit', 'solitude', 'maladie', 'doute', 'nouveau_depart', 'quotidien', 'gratitude', 'conversion'],
        intensite: ['legere', 'moderee', 'profonde'],
        posture: ['recevoir', 'agir', 'contempler', 'se_reposer', 'louer']
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FAMILLES DE VERSETS (pour compatibilité et affichage)
    // ═══════════════════════════════════════════════════════════════════════

    familles: {
        paix: {
            id: 'paix',
            nom: 'Paix',
            icone: '🌿',
            couleur: '#4CAF50',
            couleurLight: '#E8F5E9',
            priereRecommandee: 'saint-francois',
            message: "Le Seigneur voit ton agitation intérieure. Il t'invite à déposer ton fardeau et à entrer dans son repos. Laisse sa paix envahir chaque recoin de ton être, comme une eau calme qui apaise tout sur son passage."
        },
        force: {
            id: 'force',
            nom: 'Force',
            icone: '🔥',
            couleur: '#FF5722',
            couleurLight: '#FBE9E7',
            priereRecommandee: 'ame-du-christ',
            message: "Tu n'es pas seul dans ce combat. La force de Dieu coule en toi, non pas pour éviter l'épreuve, mais pour la traverser. Avec Lui, tu peux affronter ce jour et ceux qui suivent."
        },
        amour: {
            id: 'amour',
            nom: 'Amour',
            icone: '❤️',
            couleur: '#E91E63',
            couleurLight: '#FCE4EC',
            priereRecommandee: 'acte-charite',
            message: "Tu es infiniment aimé(e), tel(le) que tu es, avec tes forces et tes fragilités. Rien ni personne ne pourra jamais te séparer de cet amour qui t'a choisi avant même ta naissance."
        },
        esperance: {
            id: 'esperance',
            nom: 'Espérance',
            icone: '✨',
            couleur: '#FF9800',
            couleurLight: '#FFF3E0',
            priereRecommandee: 'therese-avila',
            message: "L'avenir t'inquiète, et c'est humain. Mais Celui qui tient les étoiles dans sa main tient aussi ton histoire. Le meilleur reste à écrire, et Dieu en est l'auteur."
        },
        confiance: {
            id: 'confiance',
            nom: 'Confiance',
            icone: '🙏',
            couleur: '#3F51B5',
            couleurLight: '#E8EAF6',
            priereRecommandee: 'abandon-foucauld',
            message: "Lâcher prise n'est pas abandonner, c'est remettre entre des mains plus sûres que les tiennes. Dieu veille sur chacun de tes pas, même ceux que tu ne vois pas encore."
        },
        joie: {
            id: 'joie',
            nom: 'Joie',
            icone: '🎉',
            couleur: '#FFC107',
            couleurLight: '#FFFDE7',
            priereRecommandee: 'magnificat',
            message: "La joie n'est pas l'absence de difficultés, mais une source qui jaillit du plus profond, là où Dieu demeure. Aujourd'hui, laisse cette joie te surprendre et te porter."
        },
        sagesse: {
            id: 'sagesse',
            nom: 'Sagesse',
            icone: '💡',
            couleur: '#9C27B0',
            couleurLight: '#F3E5F5',
            priereRecommandee: 'esprit-saint',
            message: "L'Esprit Saint est ton conseiller, ton guide intérieur. Dans le silence de ton cœur, Il éclaire ton chemin et te donne le discernement dont tu as besoin."
        },
        reconfort: {
            id: 'reconfort',
            nom: 'Réconfort',
            icone: '💜',
            couleur: '#673AB7',
            couleurLight: '#EDE7F6',
            priereRecommandee: 'psaume-22',
            message: "Dieu connaît ta douleur, Il recueille chacune de tes larmes. Tu n'es pas seul(e) dans cette traversée. Sa tendresse t'enveloppe, même quand tu ne la sens pas."
        },
        pardon: {
            id: 'pardon',
            nom: 'Pardon',
            icone: '🙌',
            couleur: '#00BCD4',
            couleurLight: '#E0F7FA',
            priereRecommandee: 'psaume-50',
            message: "Le pardon est un chemin, pas un instant. Que tu aies besoin de pardonner ou d'être pardonné(e), Dieu marche avec toi sur cette route de libération."
        },
        perseverance: {
            id: 'perseverance',
            nom: 'Persévérance',
            icone: '🏃',
            couleur: '#795548',
            couleurLight: '#EFEBE9',
            priereRecommandee: 'psaume-91',
            message: "La course est longue, mais tu n'es pas disqualifié(e). Chaque pas compte, chaque effort est vu. Continue, un pas après l'autre, les yeux fixés sur Celui qui t'attend."
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // LES 7 QUESTIONS PROGRESSIVES
    // ═══════════════════════════════════════════════════════════════════════
    // Questions 1-3 : Parcours Trinité
    // Questions 1-5 : Parcours Plaies  
    // Questions 1-7 : Parcours Plénitude

    questions: [
        // ═══════════════════════════════════════════════════════════════════
        // QUESTION 1 : État émotionnel (Trinité, Plaies, Plénitude)
        // ═══════════════════════════════════════════════════════════════════
        {
            id: 1,
            texte: "En ce moment, qu'est-ce qui habite ton cœur ?",
            sousTitre: "Accueille ce qui est là, sans jugement...",
            reponses: [
                { 
                    texte: "Une paix, un calme intérieur", 
                    icone: "🌿", 
                    tags: { emotion: 'paix', intensite: 'legere' },
                    scores: { paix: 3, joie: 2, confiance: 1 }
                },
                { 
                    texte: "Une joie, de la gratitude", 
                    icone: "✨", 
                    tags: { emotion: 'gratitude', intensite: 'legere' },
                    scores: { joie: 3, paix: 2, amour: 1 }
                },
                { 
                    texte: "Une inquiétude, de l'anxiété", 
                    icone: "😰", 
                    tags: { emotion: 'peur', intensite: 'moderee' },
                    scores: { paix: 3, confiance: 2, esperance: 1 }
                },
                { 
                    texte: "Une tristesse, un poids", 
                    icone: "💧", 
                    tags: { emotion: 'tristesse', intensite: 'moderee' },
                    scores: { reconfort: 3, amour: 2, esperance: 1 }
                },
                { 
                    texte: "Une fatigue, un épuisement", 
                    icone: "😔", 
                    tags: { emotion: 'lassitude', intensite: 'moderee' },
                    scores: { reconfort: 3, force: 2, paix: 1 }
                },
                { 
                    texte: "Une colère, une frustration", 
                    icone: "😤", 
                    tags: { emotion: 'colere', intensite: 'moderee' },
                    scores: { paix: 3, pardon: 2, sagesse: 1 }
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // QUESTION 2 : Besoin profond (Trinité, Plaies, Plénitude)
        // ═══════════════════════════════════════════════════════════════════
        {
            id: 2,
            texte: "De quoi ton âme a-t-elle le plus soif ?",
            sousTitre: "Ce dont tu as vraiment besoin au fond de toi...",
            reponses: [
                { 
                    texte: "Être rassuré(e), apaisé(e)", 
                    icone: "🤲", 
                    tags: { besoin: 'etre_rassure' },
                    scores: { paix: 3, confiance: 2, reconfort: 1 }
                },
                { 
                    texte: "Être aimé(e), accueilli(e)", 
                    icone: "💗", 
                    tags: { besoin: 'etre_aime' },
                    scores: { amour: 3, reconfort: 2, joie: 1 }
                },
                { 
                    texte: "Trouver la force de continuer", 
                    icone: "💪", 
                    tags: { besoin: 'trouver_force' },
                    scores: { force: 3, perseverance: 2, esperance: 1 }
                },
                { 
                    texte: "Être guidé(e), éclairé(e)", 
                    icone: "💡", 
                    tags: { besoin: 'etre_guide' },
                    scores: { sagesse: 3, confiance: 2, paix: 1 }
                },
                { 
                    texte: "Lâcher prise, me reposer", 
                    icone: "🌙", 
                    tags: { besoin: 'lacher_prise' },
                    scores: { paix: 3, confiance: 2, reconfort: 1 }
                },
                { 
                    texte: "Pardonner ou être pardonné(e)", 
                    icone: "🕊️", 
                    tags: { besoin: 'pardonner' },
                    scores: { pardon: 3, paix: 2, amour: 1 }
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // QUESTION 3 : Posture intérieure (Trinité, Plaies, Plénitude)
        // ═══════════════════════════════════════════════════════════════════
        {
            id: 3,
            texte: "Comment voudrais-tu accueillir cette parole ?",
            sousTitre: "Ta disposition de cœur en cet instant...",
            reponses: [
                { 
                    texte: "Recevoir, me laisser consoler", 
                    icone: "🙏", 
                    tags: { posture: 'recevoir' },
                    scores: { reconfort: 2, amour: 2, paix: 2 }
                },
                { 
                    texte: "Contempler, méditer en silence", 
                    icone: "🧘", 
                    tags: { posture: 'contempler' },
                    scores: { paix: 2, sagesse: 2, confiance: 2 }
                },
                { 
                    texte: "Trouver l'élan pour agir", 
                    icone: "🚀", 
                    tags: { posture: 'agir' },
                    scores: { force: 2, perseverance: 2, sagesse: 2 }
                },
                { 
                    texte: "Me reposer en Dieu", 
                    icone: "😌", 
                    tags: { posture: 'se_reposer' },
                    scores: { paix: 2, confiance: 2, reconfort: 2 }
                },
                { 
                    texte: "Louer, rendre grâce", 
                    icone: "🙌", 
                    tags: { posture: 'louer' },
                    scores: { joie: 2, amour: 2, esperance: 2 }
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // QUESTION 4 : Situation de vie (Plaies, Plénitude)
        // ═══════════════════════════════════════════════════════════════════
        {
            id: 4,
            texte: "Quelle est ta situation en ce moment ?",
            sousTitre: "Ce que tu traverses dans ta vie...",
            reponses: [
                { 
                    texte: "Une épreuve, un combat", 
                    icone: "⚔️", 
                    tags: { situation: 'epreuve' },
                    scores: { force: 3, perseverance: 2, esperance: 1 }
                },
                { 
                    texte: "Un deuil, une perte", 
                    icone: "🖤", 
                    tags: { situation: 'deuil' },
                    scores: { reconfort: 3, esperance: 2, amour: 1 }
                },
                { 
                    texte: "Une attente, une incertitude", 
                    icone: "⏳", 
                    tags: { situation: 'attente' },
                    scores: { confiance: 3, esperance: 2, paix: 1 }
                },
                { 
                    texte: "Une décision importante", 
                    icone: "🔀", 
                    tags: { situation: 'decision' },
                    scores: { sagesse: 3, confiance: 2, paix: 1 }
                },
                { 
                    texte: "Un conflit, une relation difficile", 
                    icone: "💔", 
                    tags: { situation: 'conflit' },
                    scores: { pardon: 3, paix: 2, amour: 1 }
                },
                { 
                    texte: "La vie quotidienne, rien de particulier", 
                    icone: "☀️", 
                    tags: { situation: 'quotidien' },
                    scores: { joie: 2, paix: 2, confiance: 2 }
                },
                { 
                    texte: "Un nouveau départ, un changement", 
                    icone: "🌱", 
                    tags: { situation: 'nouveau_depart' },
                    scores: { esperance: 3, confiance: 2, force: 1 }
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // QUESTION 5 : Relation avec Dieu (Plaies, Plénitude)
        // ═══════════════════════════════════════════════════════════════════
        {
            id: 5,
            texte: "Où en es-tu avec Dieu en ce moment ?",
            sousTitre: "Ta relation avec Lui, telle qu'elle est...",
            reponses: [
                { 
                    texte: "Je me sens proche, en confiance", 
                    icone: "🙏", 
                    tags: { relation: 'proche' },
                    scores: { joie: 2, amour: 2, confiance: 2 }
                },
                { 
                    texte: "Je me sens distant(e), comme éloigné(e)", 
                    icone: "🌫️", 
                    tags: { relation: 'distant' },
                    scores: { reconfort: 3, amour: 2, confiance: 1 }
                },
                { 
                    texte: "Je doute, j'ai des questions", 
                    icone: "❓", 
                    tags: { relation: 'doute', situation: 'doute' },
                    scores: { sagesse: 3, confiance: 2, esperance: 1 }
                },
                { 
                    texte: "Je suis en recherche, en chemin", 
                    icone: "🚶", 
                    tags: { relation: 'recherche' },
                    scores: { sagesse: 2, esperance: 2, confiance: 2 }
                },
                { 
                    texte: "Je reviens vers Lui après un éloignement", 
                    icone: "🏠", 
                    tags: { relation: 'retour', situation: 'conversion' },
                    scores: { amour: 3, pardon: 2, esperance: 1 }
                },
                { 
                    texte: "Je suis en colère contre Lui", 
                    icone: "😠", 
                    tags: { relation: 'colere', emotion: 'colere' },
                    scores: { reconfort: 2, amour: 2, paix: 2 }
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // QUESTION 6 : Ce qui pèse ou manque (Plénitude)
        // ═══════════════════════════════════════════════════════════════════
        {
            id: 6,
            texte: "Qu'est-ce qui pèse ou manque le plus ?",
            sousTitre: "Ce qui t'empêche d'être pleinement en paix...",
            reponses: [
                { 
                    texte: "La peur de l'avenir", 
                    icone: "😨", 
                    tags: { poids: 'peur_avenir', emotion: 'peur' },
                    scores: { esperance: 3, confiance: 2, paix: 1 }
                },
                { 
                    texte: "Un sentiment de solitude", 
                    icone: "🏝️", 
                    tags: { poids: 'solitude', situation: 'solitude', emotion: 'solitude' },
                    scores: { amour: 3, reconfort: 2, joie: 1 }
                },
                { 
                    texte: "La culpabilité, le regret", 
                    icone: "⚖️", 
                    tags: { poids: 'culpabilite', besoin: 'etre_pardonne' },
                    scores: { pardon: 3, amour: 2, paix: 1 }
                },
                { 
                    texte: "Le manque de sens, de direction", 
                    icone: "🧭", 
                    tags: { poids: 'sens', emotion: 'confusion' },
                    scores: { sagesse: 3, esperance: 2, confiance: 1 }
                },
                { 
                    texte: "L'épuisement, le surmenage", 
                    icone: "🔋", 
                    tags: { poids: 'epuisement', emotion: 'lassitude' },
                    scores: { paix: 3, force: 2, reconfort: 1 }
                },
                { 
                    texte: "Une blessure relationnelle", 
                    icone: "💔", 
                    tags: { poids: 'blessure', situation: 'conflit' },
                    scores: { pardon: 3, reconfort: 2, amour: 1 }
                },
                { 
                    texte: "Rien de particulier, tout va bien", 
                    icone: "🌈", 
                    tags: { poids: 'aucun' },
                    scores: { joie: 3, paix: 2, amour: 1 }
                }
            ]
        },

        // ═══════════════════════════════════════════════════════════════════
        // QUESTION 7 : Intensité et attente (Plénitude)
        // ═══════════════════════════════════════════════════════════════════
        {
            id: 7,
            texte: "Avec quelle intensité vis-tu cela ?",
            sousTitre: "Pour te donner la parole la plus juste...",
            reponses: [
                { 
                    texte: "C'est léger, passager", 
                    icone: "🍃", 
                    tags: { intensite: 'legere' },
                    scores: { joie: 2, paix: 2, confiance: 2 }
                },
                { 
                    texte: "C'est présent, mais gérable", 
                    icone: "🌤️", 
                    tags: { intensite: 'moderee' },
                    scores: { force: 2, esperance: 2, sagesse: 2 }
                },
                { 
                    texte: "C'est profond, ça m'habite beaucoup", 
                    icone: "🌊", 
                    tags: { intensite: 'profonde' },
                    scores: { reconfort: 3, force: 2, esperance: 1 }
                },
                { 
                    texte: "C'est intense, j'ai vraiment besoin d'aide", 
                    icone: "🆘", 
                    tags: { intensite: 'profonde', urgence: true },
                    scores: { reconfort: 3, amour: 2, force: 1 }
                }
            ]
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // COLLECTION DE 200 VERSETS DU NOUVEAU TESTAMENT
    // Chaque verset est tagué sur les 5 dimensions pour le matching
    // ═══════════════════════════════════════════════════════════════════════

    versets: [
        // ═══════════════════════════════════════════════════════════════════
        // 🌿 PAIX (25 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "Jean 14:27", 
            texte: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.", 
            famille: "paix",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure', 'lacher_prise'], situations: ['epreuve', 'attente'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'se_reposer'] }
        },
        { 
            reference: "Philippiens 4:7", 
            texte: "Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.", 
            famille: "paix",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure'], situations: ['attente', 'decision'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Matthieu 11:28", 
            texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", 
            famille: "paix",
            tags: { emotions: ['lassitude', 'tristesse'], besoins: ['lacher_prise', 'etre_rassure'], situations: ['epreuve', 'quotidien'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'se_reposer'] }
        },
        { 
            reference: "Matthieu 11:29", 
            texte: "Prenez mon joug sur vous et recevez mes instructions, car je suis doux et humble de cœur ; et vous trouverez du repos pour vos âmes.", 
            famille: "paix",
            tags: { emotions: ['lassitude', 'confusion'], besoins: ['etre_guide', 'lacher_prise'], situations: ['quotidien', 'decision'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Jean 16:33", 
            texte: "Je vous ai dit ces choses, afin que vous ayez la paix en moi. Vous aurez des tribulations dans le monde ; mais prenez courage, j'ai vaincu le monde.", 
            famille: "paix",
            tags: { emotions: ['peur', 'tristesse'], besoins: ['trouver_force', 'etre_rassure'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'agir'] }
        },
        { 
            reference: "Colossiens 3:15", 
            texte: "Et que la paix de Christ, à laquelle vous avez été appelés pour former un seul corps, règne dans vos cœurs.", 
            famille: "paix",
            tags: { emotions: ['confusion', 'colere'], besoins: ['lacher_prise'], situations: ['conflit', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "2 Thessaloniciens 3:16", 
            texte: "Que le Seigneur de la paix vous donne lui-même la paix en tout temps, de toute manière !", 
            famille: "paix",
            tags: { emotions: ['peur', 'confusion', 'lassitude'], besoins: ['etre_rassure'], situations: ['quotidien', 'epreuve'], intensites: ['legere', 'moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 14:1", 
            texte: "Que votre cœur ne se trouble point. Croyez en Dieu, et croyez en moi.", 
            famille: "paix",
            tags: { emotions: ['peur', 'tristesse'], besoins: ['etre_rassure'], situations: ['deuil', 'epreuve', 'attente'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Philippiens 4:6", 
            texte: "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.", 
            famille: "paix",
            tags: { emotions: ['peur', 'confusion'], besoins: ['lacher_prise', 'etre_rassure'], situations: ['attente', 'decision'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'louer'] }
        },
        { 
            reference: "Marc 4:39", 
            texte: "S'étant réveillé, il menaça le vent, et dit à la mer : Silence ! tais-toi ! Et le vent cessa, et il y eut un grand calme.", 
            famille: "paix",
            tags: { emotions: ['peur'], besoins: ['etre_rassure'], situations: ['epreuve'], intensites: ['profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Romains 8:6", 
            texte: "L'affection de la chair, c'est la mort, tandis que l'affection de l'esprit, c'est la vie et la paix.", 
            famille: "paix",
            tags: { emotions: ['confusion'], besoins: ['etre_guide'], situations: ['decision', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['contempler'] }
        },
        { 
            reference: "Hébreux 4:9-10", 
            texte: "Il y a donc un repos de sabbat réservé au peuple de Dieu. Car celui qui entre dans le repos de Dieu se repose de ses œuvres, comme Dieu s'est reposé des siennes.", 
            famille: "paix",
            tags: { emotions: ['lassitude'], besoins: ['lacher_prise', 'etre_rassure'], situations: ['epreuve', 'quotidien'], intensites: ['moderee', 'profonde'], postures: ['se_reposer'] }
        },
        { 
            reference: "Romains 15:13", 
            texte: "Que le Dieu de l'espérance vous remplisse de toute joie et de toute paix dans la foi.", 
            famille: "paix",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_rassure'], situations: ['attente', 'epreuve'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'louer'] }
        },
        { 
            reference: "Marc 5:34", 
            texte: "Ma fille, ta foi t'a sauvée ; va en paix, et sois guérie de ton mal.", 
            famille: "paix",
            tags: { emotions: ['peur', 'lassitude'], besoins: ['etre_rassure'], situations: ['maladie', 'epreuve'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Luc 7:50", 
            texte: "Jésus dit à la femme : Ta foi t'a sauvée, va en paix.", 
            famille: "paix",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_pardonne', 'etre_aime'], situations: ['conversion'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 20:19", 
            texte: "Jésus vint, se présenta au milieu d'eux, et leur dit : La paix soit avec vous !", 
            famille: "paix",
            tags: { emotions: ['peur'], besoins: ['etre_rassure'], situations: ['epreuve', 'doute'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 20:21", 
            texte: "Jésus leur dit de nouveau : La paix soit avec vous ! Comme le Père m'a envoyé, moi aussi je vous envoie.", 
            famille: "paix",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_guide', 'trouver_force'], situations: ['nouveau_depart'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Romains 5:1", 
            texte: "Étant donc justifiés par la foi, nous avons la paix avec Dieu par notre Seigneur Jésus-Christ.", 
            famille: "paix",
            tags: { emotions: ['confusion', 'peur'], besoins: ['etre_rassure'], situations: ['conversion', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'louer'] }
        },
        { 
            reference: "Éphésiens 2:14", 
            texte: "Car il est notre paix, lui qui des deux n'en a fait qu'un, et qui a renversé le mur de séparation.", 
            famille: "paix",
            tags: { emotions: ['colere', 'confusion'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Colossiens 1:20", 
            texte: "Il a voulu par lui réconcilier tout avec lui-même, tant ce qui est sur la terre que ce qui est dans les cieux, en faisant la paix par lui, par le sang de sa croix.", 
            famille: "paix",
            tags: { emotions: ['confusion', 'tristesse'], besoins: ['etre_rassure', 'comprendre'], situations: ['doute', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['contempler'] }
        },
        { 
            reference: "1 Pierre 3:11", 
            texte: "Qu'il recherche la paix et la poursuive.", 
            famille: "paix",
            tags: { emotions: ['colere', 'confusion'], besoins: ['lacher_prise'], situations: ['conflit', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Hébreux 12:14", 
            texte: "Recherchez la paix avec tous, et la sanctification, sans laquelle personne ne verra le Seigneur.", 
            famille: "paix",
            tags: { emotions: ['colere'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Jacques 3:18", 
            texte: "Le fruit de la justice est semé dans la paix par ceux qui recherchent la paix.", 
            famille: "paix",
            tags: { emotions: ['confusion'], besoins: ['etre_guide'], situations: ['conflit', 'quotidien'], intensites: ['legere'], postures: ['agir', 'contempler'] }
        },
        { 
            reference: "1 Thessaloniciens 5:23", 
            texte: "Que le Dieu de paix vous sanctifie lui-même tout entiers, et que tout votre être, l'esprit, l'âme et le corps, soit conservé irrépréhensible.", 
            famille: "paix",
            tags: { emotions: ['lassitude', 'confusion'], besoins: ['etre_rassure', 'lacher_prise'], situations: ['quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "2 Corinthiens 13:11", 
            texte: "Vivez en paix, et le Dieu d'amour et de paix sera avec vous.", 
            famille: "paix",
            tags: { emotions: ['paix', 'joie'], besoins: ['lacher_prise'], situations: ['quotidien', 'conflit'], intensites: ['legere'], postures: ['agir', 'louer'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // 🔥 FORCE (25 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "Philippiens 4:13", 
            texte: "Je puis tout par celui qui me fortifie.", 
            famille: "force",
            tags: { emotions: ['lassitude', 'peur'], besoins: ['trouver_force', 'perseverer'], situations: ['epreuve', 'decision'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "2 Timothée 1:7", 
            texte: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.", 
            famille: "force",
            tags: { emotions: ['peur'], besoins: ['trouver_force', 'etre_rassure'], situations: ['decision', 'nouveau_depart'], intensites: ['legere', 'moderee'], postures: ['agir', 'recevoir'] }
        },
        { 
            reference: "Éphésiens 6:10", 
            texte: "Au reste, fortifiez-vous dans le Seigneur, et par sa force toute-puissante.", 
            famille: "force",
            tags: { emotions: ['peur', 'lassitude'], besoins: ['trouver_force'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "1 Corinthiens 16:13", 
            texte: "Veillez, demeurez fermes dans la foi, soyez des hommes, fortifiez-vous.", 
            famille: "force",
            tags: { emotions: ['peur', 'lassitude'], besoins: ['trouver_force', 'perseverer'], situations: ['epreuve'], intensites: ['moderee'], postures: ['agir'] }
        },
        { 
            reference: "2 Corinthiens 12:9", 
            texte: "Ma grâce te suffit, car ma puissance s'accomplit dans la faiblesse.", 
            famille: "force",
            tags: { emotions: ['lassitude', 'tristesse'], besoins: ['trouver_force', 'etre_rassure'], situations: ['epreuve', 'maladie'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "2 Corinthiens 12:10", 
            texte: "Quand je suis faible, c'est alors que je suis fort.", 
            famille: "force",
            tags: { emotions: ['lassitude'], besoins: ['trouver_force'], situations: ['epreuve'], intensites: ['profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Éphésiens 3:16", 
            texte: "Qu'il vous donne, selon la richesse de sa gloire, d'être puissamment fortifiés par son Esprit dans l'homme intérieur.", 
            famille: "force",
            tags: { emotions: ['lassitude', 'peur'], besoins: ['trouver_force'], situations: ['epreuve', 'quotidien'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Colossiens 1:11", 
            texte: "Fortifiés à tous égards par sa puissance glorieuse, en sorte que vous soyez toujours et avec joie persévérants et patients.", 
            famille: "force",
            tags: { emotions: ['lassitude'], besoins: ['trouver_force', 'perseverer'], situations: ['epreuve', 'attente'], intensites: ['moderee', 'profonde'], postures: ['agir', 'recevoir'] }
        },
        { 
            reference: "Hébreux 12:1", 
            texte: "Courons avec persévérance dans la carrière qui nous est ouverte.", 
            famille: "force",
            tags: { emotions: ['lassitude'], besoins: ['perseverer', 'trouver_force'], situations: ['epreuve', 'quotidien'], intensites: ['moderee'], postures: ['agir'] }
        },
        { 
            reference: "Hébreux 12:2", 
            texte: "Ayant les regards sur Jésus, le chef et le consommateur de la foi.", 
            famille: "force",
            tags: { emotions: ['confusion', 'lassitude'], besoins: ['perseverer', 'etre_guide'], situations: ['epreuve', 'doute'], intensites: ['moderee', 'profonde'], postures: ['contempler', 'agir'] }
        },
        { 
            reference: "1 Pierre 5:10", 
            texte: "Le Dieu de toute grâce vous perfectionnera lui-même, vous affermira, vous fortifiera, vous rendra inébranlables.", 
            famille: "force",
            tags: { emotions: ['lassitude', 'peur'], besoins: ['trouver_force', 'etre_rassure'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Actes 1:8", 
            texte: "Vous recevrez une puissance, le Saint Esprit survenant sur vous.", 
            famille: "force",
            tags: { emotions: ['peur'], besoins: ['trouver_force'], situations: ['nouveau_depart', 'decision'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'agir'] }
        },
        { 
            reference: "Apocalypse 3:8", 
            texte: "Je connais tes œuvres. Voici, j'ai mis devant toi une porte ouverte, que personne ne peut fermer, car tu as peu de puissance, et tu as gardé ma parole.", 
            famille: "force",
            tags: { emotions: ['lassitude', 'peur'], besoins: ['trouver_force', 'perseverer'], situations: ['epreuve', 'nouveau_depart'], intensites: ['moderee', 'profonde'], postures: ['agir', 'recevoir'] }
        },
        { 
            reference: "Romains 8:37", 
            texte: "Dans toutes ces choses nous sommes plus que vainqueurs par celui qui nous a aimés.", 
            famille: "force",
            tags: { emotions: ['peur', 'lassitude'], besoins: ['trouver_force', 'perseverer'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "Éphésiens 6:13", 
            texte: "Prenez toutes les armes de Dieu, afin de pouvoir résister dans le mauvais jour, et tenir ferme après avoir tout surmonté.", 
            famille: "force",
            tags: { emotions: ['peur'], besoins: ['trouver_force', 'perseverer'], situations: ['epreuve'], intensites: ['profonde'], postures: ['agir'] }
        },
        { 
            reference: "2 Thessaloniciens 3:3", 
            texte: "Le Seigneur est fidèle, il vous affermira et vous préservera du malin.", 
            famille: "force",
            tags: { emotions: ['peur'], besoins: ['etre_rassure', 'trouver_force'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "1 Corinthiens 15:58", 
            texte: "Soyez fermes, inébranlables, travaillant de mieux en mieux à l'œuvre du Seigneur, sachant que votre travail ne sera pas vain dans le Seigneur.", 
            famille: "force",
            tags: { emotions: ['lassitude', 'confusion'], besoins: ['perseverer', 'trouver_force'], situations: ['quotidien', 'epreuve'], intensites: ['moderee'], postures: ['agir'] }
        },
        { 
            reference: "2 Corinthiens 4:16", 
            texte: "C'est pourquoi nous ne perdons pas courage. Et lors même que notre homme extérieur se détruit, notre homme intérieur se renouvelle de jour en jour.", 
            famille: "force",
            tags: { emotions: ['lassitude', 'tristesse'], besoins: ['trouver_force', 'perseverer'], situations: ['maladie', 'epreuve'], intensites: ['profonde'], postures: ['agir', 'recevoir'] }
        },
        { 
            reference: "2 Corinthiens 4:17", 
            texte: "Nos légères afflictions du moment présent produisent pour nous un poids éternel de gloire.", 
            famille: "force",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['perseverer'], situations: ['epreuve'], intensites: ['profonde'], postures: ['contempler'] }
        },
        { 
            reference: "Jacques 1:12", 
            texte: "Heureux l'homme qui supporte patiemment la tentation ; car, après avoir été éprouvé, il recevra la couronne de vie.", 
            famille: "force",
            tags: { emotions: ['lassitude'], besoins: ['perseverer', 'trouver_force'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "1 Corinthiens 10:13", 
            texte: "Dieu est fidèle, et il ne permettra pas que vous soyez tentés au delà de vos forces ; mais avec la tentation il préparera aussi le moyen d'en sortir.", 
            famille: "force",
            tags: { emotions: ['peur', 'lassitude'], besoins: ['trouver_force', 'etre_rassure'], situations: ['epreuve'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Hébreux 10:36", 
            texte: "Car vous avez besoin de persévérance, afin qu'après avoir accompli la volonté de Dieu, vous obteniez ce qui vous est promis.", 
            famille: "force",
            tags: { emotions: ['lassitude'], besoins: ['perseverer'], situations: ['attente', 'epreuve'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "Galates 6:9", 
            texte: "Ne nous lassons pas de faire le bien ; car nous moissonnerons au temps convenable, si nous ne nous relâchons pas.", 
            famille: "force",
            tags: { emotions: ['lassitude'], besoins: ['perseverer', 'trouver_force'], situations: ['quotidien', 'attente'], intensites: ['moderee'], postures: ['agir'] }
        },
        { 
            reference: "Apocalypse 2:10", 
            texte: "Sois fidèle jusqu'à la mort, et je te donnerai la couronne de vie.", 
            famille: "force",
            tags: { emotions: ['peur', 'lassitude'], besoins: ['perseverer'], situations: ['epreuve'], intensites: ['profonde'], postures: ['agir'] }
        },
        { 
            reference: "Matthieu 10:22", 
            texte: "Celui qui persévérera jusqu'à la fin sera sauvé.", 
            famille: "force",
            tags: { emotions: ['lassitude', 'peur'], besoins: ['perseverer'], situations: ['epreuve'], intensites: ['profonde'], postures: ['agir'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // ❤️ AMOUR (25 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "Jean 3:16", 
            texte: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", 
            famille: "amour",
            tags: { emotions: ['tristesse', 'solitude'], besoins: ['etre_aime'], situations: ['quotidien', 'conversion'], intensites: ['legere', 'moderee', 'profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Romains 8:38-39", 
            texte: "Ni la mort ni la vie, ni les anges ni les dominations, ni le présent ni l'avenir, ni les puissances, ni la hauteur ni la profondeur, ne pourra nous séparer de l'amour de Dieu.", 
            famille: "amour",
            tags: { emotions: ['peur', 'solitude', 'tristesse'], besoins: ['etre_aime', 'etre_rassure'], situations: ['epreuve', 'deuil'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "1 Jean 4:19", 
            texte: "Pour nous, nous l'aimons, parce qu'il nous a aimés le premier.", 
            famille: "amour",
            tags: { emotions: ['gratitude'], besoins: ['etre_aime'], situations: ['quotidien'], intensites: ['legere'], postures: ['louer', 'contempler'] }
        },
        { 
            reference: "1 Jean 4:16", 
            texte: "Dieu est amour ; et celui qui demeure dans l'amour demeure en Dieu, et Dieu demeure en lui.", 
            famille: "amour",
            tags: { emotions: ['solitude', 'confusion'], besoins: ['etre_aime'], situations: ['quotidien', 'doute'], intensites: ['legere', 'moderee'], postures: ['contempler'] }
        },
        { 
            reference: "1 Jean 4:10", 
            texte: "Cet amour consiste, non point en ce que nous avons aimé Dieu, mais en ce qu'il nous a aimés et a envoyé son Fils.", 
            famille: "amour",
            tags: { emotions: ['tristesse', 'confusion'], besoins: ['etre_aime', 'etre_pardonne'], situations: ['conversion', 'doute'], intensites: ['moderee'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "1 Jean 3:1", 
            texte: "Voyez quel amour le Père nous a témoigné, pour que nous soyons appelés enfants de Dieu ! Et nous le sommes.", 
            famille: "amour",
            tags: { emotions: ['solitude', 'tristesse'], besoins: ['etre_aime'], situations: ['doute', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'louer'] }
        },
        { 
            reference: "Jean 15:9", 
            texte: "Comme le Père m'a aimé, je vous ai aussi aimés. Demeurez dans mon amour.", 
            famille: "amour",
            tags: { emotions: ['solitude'], besoins: ['etre_aime'], situations: ['quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Jean 15:13", 
            texte: "Il n'y a pas de plus grand amour que de donner sa vie pour ses amis.", 
            famille: "amour",
            tags: { emotions: ['tristesse', 'gratitude'], besoins: ['etre_aime'], situations: ['quotidien', 'deuil'], intensites: ['moderee', 'profonde'], postures: ['contempler'] }
        },
        { 
            reference: "Romains 5:8", 
            texte: "Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.", 
            famille: "amour",
            tags: { emotions: ['tristesse', 'confusion'], besoins: ['etre_aime', 'etre_pardonne'], situations: ['conversion', 'doute'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Galates 2:20", 
            texte: "Ce n'est plus moi qui vis, c'est Christ qui vit en moi ; la vie que je vis maintenant, je la vis dans la foi au Fils de Dieu, qui m'a aimé et qui s'est livré lui-même pour moi.", 
            famille: "amour",
            tags: { emotions: ['confusion', 'gratitude'], besoins: ['etre_aime', 'comprendre'], situations: ['conversion', 'quotidien'], intensites: ['moderee'], postures: ['contempler'] }
        },
        { 
            reference: "Éphésiens 3:18-19", 
            texte: "Vous puissiez comprendre quelle est la largeur, la longueur, la profondeur et la hauteur de l'amour de Christ.", 
            famille: "amour",
            tags: { emotions: ['confusion', 'solitude'], besoins: ['etre_aime', 'comprendre'], situations: ['doute', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['contempler'] }
        },
        { 
            reference: "1 Corinthiens 13:4", 
            texte: "L'amour est patient, il est plein de bonté ; l'amour n'est point envieux ; l'amour ne se vante point.", 
            famille: "amour",
            tags: { emotions: ['colere', 'confusion'], besoins: ['pardonner', 'etre_guide'], situations: ['conflit'], intensites: ['legere', 'moderee'], postures: ['agir', 'contempler'] }
        },
        { 
            reference: "1 Corinthiens 13:8", 
            texte: "L'amour ne périt jamais.", 
            famille: "amour",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_rassure', 'etre_aime'], situations: ['deuil', 'conflit'], intensites: ['moderee', 'profonde'], postures: ['contempler'] }
        },
        { 
            reference: "1 Corinthiens 13:13", 
            texte: "Maintenant donc ces trois choses demeurent : la foi, l'espérance, l'amour ; mais la plus grande de ces choses, c'est l'amour.", 
            famille: "amour",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['quotidien'], intensites: ['legere'], postures: ['contempler'] }
        },
        { 
            reference: "Jean 13:34", 
            texte: "Je vous donne un commandement nouveau : Aimez-vous les uns les autres ; comme je vous ai aimés, vous aussi, aimez-vous les uns les autres.", 
            famille: "amour",
            tags: { emotions: ['colere', 'confusion'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "1 Jean 4:7", 
            texte: "Bien-aimés, aimons-nous les uns les autres ; car l'amour est de Dieu, et quiconque aime est né de Dieu et connaît Dieu.", 
            famille: "amour",
            tags: { emotions: ['colere', 'confusion'], besoins: ['pardonner', 'etre_guide'], situations: ['conflit', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "1 Jean 4:18", 
            texte: "Il n'y a point de crainte dans l'amour, mais l'amour parfait chasse la crainte.", 
            famille: "amour",
            tags: { emotions: ['peur'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve', 'attente'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Romains 8:35", 
            texte: "Qui nous séparera de l'amour de Christ ? Sera-ce la tribulation, ou l'angoisse, ou la persécution, ou la faim, ou la nudité, ou le péril, ou l'épée ?", 
            famille: "amour",
            tags: { emotions: ['peur', 'tristesse'], besoins: ['etre_aime', 'etre_rassure'], situations: ['epreuve'], intensites: ['profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Éphésiens 2:4-5", 
            texte: "Dieu, qui est riche en miséricorde, à cause du grand amour dont il nous a aimés, nous qui étions morts par nos offenses, nous a rendus vivants avec Christ.", 
            famille: "amour",
            tags: { emotions: ['tristesse', 'confusion'], besoins: ['etre_aime', 'etre_pardonne'], situations: ['conversion', 'doute'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jérémie 31:3", 
            texte: "Je t'aime d'un amour éternel ; c'est pourquoi je te conserve ma bonté.", 
            famille: "amour",
            tags: { emotions: ['solitude', 'tristesse'], besoins: ['etre_aime'], situations: ['deuil', 'solitude'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 15:12", 
            texte: "C'est ici mon commandement : Aimez-vous les uns les autres, comme je vous ai aimés.", 
            famille: "amour",
            tags: { emotions: ['colere'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "1 Pierre 4:8", 
            texte: "Avant tout, ayez les uns pour les autres une ardente charité, car la charité couvre une multitude de péchés.", 
            famille: "amour",
            tags: { emotions: ['colere', 'tristesse'], besoins: ['pardonner', 'etre_pardonne'], situations: ['conflit'], intensites: ['moderee'], postures: ['agir'] }
        },
        { 
            reference: "Colossiens 3:14", 
            texte: "Par-dessus toutes ces choses, revêtez-vous de l'amour, qui est le lien de la perfection.", 
            famille: "amour",
            tags: { emotions: ['confusion', 'colere'], besoins: ['pardonner', 'etre_guide'], situations: ['conflit', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "1 Jean 3:16", 
            texte: "Nous avons connu l'amour, en ce qu'il a donné sa vie pour nous ; nous aussi, nous devons donner notre vie pour les frères.", 
            famille: "amour",
            tags: { emotions: ['gratitude'], besoins: ['etre_aime'], situations: ['quotidien'], intensites: ['legere', 'moderee'], postures: ['contempler', 'agir'] }
        },
        { 
            reference: "2 Corinthiens 5:14", 
            texte: "Car l'amour de Christ nous presse.", 
            famille: "amour",
            tags: { emotions: ['confusion', 'gratitude'], besoins: ['etre_guide', 'agir'], situations: ['nouveau_depart', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // ✨ ESPÉRANCE (25 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "Romains 8:28", 
            texte: "Nous savons que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.", 
            famille: "esperance",
            tags: { emotions: ['confusion', 'tristesse'], besoins: ['comprendre', 'etre_rassure'], situations: ['epreuve', 'attente'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Hébreux 10:23", 
            texte: "Retenons fermement la profession de notre espérance, car celui qui a fait la promesse est fidèle.", 
            famille: "esperance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure', 'perseverer'], situations: ['attente', 'doute'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "Apocalypse 21:4", 
            texte: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur.", 
            famille: "esperance",
            tags: { emotions: ['tristesse'], besoins: ['etre_rassure'], situations: ['deuil', 'maladie'], intensites: ['profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "1 Pierre 1:3", 
            texte: "Béni soit Dieu qui, selon sa grande miséricorde, nous a régénérés pour une espérance vivante.", 
            famille: "esperance",
            tags: { emotions: ['tristesse', 'gratitude'], besoins: ['etre_rassure'], situations: ['conversion', 'nouveau_depart'], intensites: ['legere', 'moderee'], postures: ['louer'] }
        },
        { 
            reference: "Romains 5:5", 
            texte: "L'espérance ne trompe point, parce que l'amour de Dieu est répandu dans nos cœurs par le Saint Esprit.", 
            famille: "esperance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure'], situations: ['attente', 'doute'], intensites: ['moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Hébreux 6:19", 
            texte: "Cette espérance, nous la possédons comme une ancre de l'âme, sûre et solide.", 
            famille: "esperance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure'], situations: ['epreuve', 'attente'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Jean 14:2-3", 
            texte: "Il y a plusieurs demeures dans la maison de mon Père. Je vais vous préparer une place.", 
            famille: "esperance",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_rassure'], situations: ['deuil', 'maladie'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Apocalypse 22:5", 
            texte: "Il n'y aura plus de nuit ; et ils n'auront besoin ni de lampe ni de lumière, parce que le Seigneur Dieu les éclairera.", 
            famille: "esperance",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_rassure'], situations: ['deuil', 'epreuve'], intensites: ['profonde'], postures: ['contempler'] }
        },
        { 
            reference: "Tite 2:13", 
            texte: "En attendant la bienheureuse espérance, et la manifestation de la gloire du grand Dieu et de notre Sauveur Jésus Christ.", 
            famille: "esperance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure', 'perseverer'], situations: ['attente'], intensites: ['legere', 'moderee'], postures: ['contempler'] }
        },
        { 
            reference: "1 Thessaloniciens 4:13", 
            texte: "Nous ne voulons pas que vous soyez dans l'ignorance au sujet de ceux qui dorment, afin que vous ne vous affligiez pas comme les autres qui n'ont point d'espérance.", 
            famille: "esperance",
            tags: { emotions: ['tristesse'], besoins: ['etre_rassure', 'comprendre'], situations: ['deuil'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Romains 15:4", 
            texte: "Tout ce qui a été écrit d'avance l'a été pour notre instruction, afin que, par la patience et par la consolation que donnent les Écritures, nous possédions l'espérance.", 
            famille: "esperance",
            tags: { emotions: ['confusion', 'lassitude'], besoins: ['comprendre', 'perseverer'], situations: ['epreuve', 'quotidien'], intensites: ['moderee'], postures: ['contempler'] }
        },
        { 
            reference: "Jérémie 29:11", 
            texte: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance.", 
            famille: "esperance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure', 'comprendre'], situations: ['attente', 'decision'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Lamentations 3:22-23", 
            texte: "Les bontés de l'Éternel ne sont pas épuisées, ses compassions ne sont pas à leur terme ; elles se renouvellent chaque matin.", 
            famille: "esperance",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['etre_rassure'], situations: ['epreuve', 'quotidien'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'louer'] }
        },
        { 
            reference: "Romains 8:24", 
            texte: "Car c'est en espérance que nous sommes sauvés. Or, l'espérance qu'on voit n'est plus espérance : ce qu'on voit, peut-on l'espérer encore ?", 
            famille: "esperance",
            tags: { emotions: ['confusion'], besoins: ['comprendre', 'perseverer'], situations: ['attente', 'doute'], intensites: ['moderee'], postures: ['contempler'] }
        },
        { 
            reference: "Romains 8:25", 
            texte: "Mais si nous espérons ce que nous ne voyons pas, nous l'attendons avec persévérance.", 
            famille: "esperance",
            tags: { emotions: ['lassitude'], besoins: ['perseverer'], situations: ['attente'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "1 Pierre 1:13", 
            texte: "Mettez votre espérance tout entière dans la grâce qui vous sera apportée, lorsque Jésus Christ apparaîtra.", 
            famille: "esperance",
            tags: { emotions: ['confusion', 'peur'], besoins: ['etre_rassure'], situations: ['attente'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Colossiens 1:27", 
            texte: "Christ en vous, l'espérance de la gloire.", 
            famille: "esperance",
            tags: { emotions: ['confusion'], besoins: ['comprendre'], situations: ['doute', 'quotidien'], intensites: ['legere'], postures: ['contempler'] }
        },
        { 
            reference: "1 Timothée 4:10", 
            texte: "Nous avons mis notre espérance dans le Dieu vivant, qui est le Sauveur de tous les hommes.", 
            famille: "esperance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure'], situations: ['epreuve', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "1 Jean 3:2-3", 
            texte: "Nous savons que, lorsqu'il paraîtra, nous serons semblables à lui, parce que nous le verrons tel qu'il est. Quiconque a cette espérance en lui se purifie.", 
            famille: "esperance",
            tags: { emotions: ['confusion'], besoins: ['comprendre', 'etre_guide'], situations: ['quotidien'], intensites: ['legere'], postures: ['contempler', 'agir'] }
        },
        { 
            reference: "Hébreux 11:1", 
            texte: "Or la foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas.", 
            famille: "esperance",
            tags: { emotions: ['confusion', 'peur'], besoins: ['comprendre', 'etre_rassure'], situations: ['doute', 'attente'], intensites: ['moderee'], postures: ['contempler'] }
        },
        { 
            reference: "Apocalypse 21:5", 
            texte: "Voici, je fais toutes choses nouvelles.", 
            famille: "esperance",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['etre_rassure'], situations: ['epreuve', 'nouveau_depart'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "2 Corinthiens 4:18", 
            texte: "Nous ne regardons pas aux choses visibles, mais aux choses invisibles ; car les choses visibles sont pour un temps, mais les invisibles sont éternelles.", 
            famille: "esperance",
            tags: { emotions: ['tristesse', 'confusion'], besoins: ['comprendre', 'perseverer'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['contempler'] }
        },
        { 
            reference: "Philippiens 1:6", 
            texte: "Celui qui a commencé en vous cette bonne œuvre la rendra parfaite pour le jour de Jésus Christ.", 
            famille: "esperance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure'], situations: ['doute', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Romains 8:18", 
            texte: "J'estime que les souffrances du temps présent ne sauraient être comparées à la gloire à venir.", 
            famille: "esperance",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['perseverer', 'etre_rassure'], situations: ['epreuve', 'maladie'], intensites: ['profonde'], postures: ['contempler'] }
        },
        { 
            reference: "Apocalypse 7:16-17", 
            texte: "Ils n'auront plus faim, ils n'auront plus soif, et le soleil ne les frappera plus. Car l'agneau les paîtra et les conduira aux sources des eaux de la vie.", 
            famille: "esperance",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['etre_rassure'], situations: ['epreuve', 'maladie', 'deuil'], intensites: ['profonde'], postures: ['recevoir', 'contempler'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // 🙏 CONFIANCE (25 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "Matthieu 6:26", 
            texte: "Regardez les oiseaux du ciel : ils ne sèment ni ne moissonnent, et ils n'amassent rien dans des greniers ; et votre Père céleste les nourrit.", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['lacher_prise', 'etre_rassure'], situations: ['attente', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['contempler', 'se_reposer'] }
        },
        { 
            reference: "Matthieu 6:33", 
            texte: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_guide', 'lacher_prise'], situations: ['decision', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "1 Pierre 5:7", 
            texte: "Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'lassitude'], besoins: ['lacher_prise', 'etre_rassure'], situations: ['epreuve', 'quotidien'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'se_reposer'] }
        },
        { 
            reference: "Hébreux 13:6", 
            texte: "C'est avec assurance que nous pouvons dire : Le Seigneur est mon aide, je ne craindrai rien.", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure', 'trouver_force'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Marc 11:24", 
            texte: "Tout ce que vous demanderez en priant, croyez que vous l'avez reçu, et vous le verrez s'accomplir.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure'], situations: ['attente'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Matthieu 7:7", 
            texte: "Demandez, et l'on vous donnera ; cherchez, et vous trouverez ; frappez, et l'on vous ouvrira.", 
            famille: "confiance",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'etre_rassure'], situations: ['decision', 'attente'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Luc 12:32", 
            texte: "Ne crains point, petit troupeau ; car votre Père a trouvé bon de vous donner le royaume.", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve', 'attente'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 14:13", 
            texte: "Tout ce que vous demanderez en mon nom, je le ferai, afin que le Père soit glorifié dans le Fils.", 
            famille: "confiance",
            tags: { emotions: ['confusion'], besoins: ['etre_rassure'], situations: ['attente'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Romains 8:31", 
            texte: "Si Dieu est pour nous, qui sera contre nous ?", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure', 'trouver_force'], situations: ['epreuve', 'conflit'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "2 Timothée 1:12", 
            texte: "Je sais en qui j'ai cru, et je suis persuadé qu'il a la puissance de garder mon dépôt jusqu'à ce jour-là.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure'], situations: ['attente', 'doute'], intensites: ['moderee'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Hébreux 4:16", 
            texte: "Approchons-nous donc avec assurance du trône de la grâce, afin d'obtenir miséricorde.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'tristesse'], besoins: ['etre_pardonne', 'etre_rassure'], situations: ['conversion', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Proverbes 3:5-6", 
            texte: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers.", 
            famille: "confiance",
            tags: { emotions: ['confusion', 'peur'], besoins: ['etre_guide', 'lacher_prise'], situations: ['decision'], intensites: ['moderee'], postures: ['recevoir', 'se_reposer'] }
        },
        { 
            reference: "Matthieu 6:34", 
            texte: "Ne vous inquiétez donc pas du lendemain ; car le lendemain aura soin de lui-même. À chaque jour suffit sa peine.", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['lacher_prise', 'etre_rassure'], situations: ['attente', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['se_reposer'] }
        },
        { 
            reference: "Jean 14:14", 
            texte: "Si vous demandez quelque chose en mon nom, je le ferai.", 
            famille: "confiance",
            tags: { emotions: ['confusion'], besoins: ['etre_rassure'], situations: ['attente'], intensites: ['legere'], postures: ['recevoir'] }
        },
        { 
            reference: "Matthieu 7:11", 
            texte: "Si donc, méchants comme vous l'êtes, vous savez donner de bonnes choses à vos enfants, à combien plus forte raison votre Père qui est dans les cieux donnera-t-il de bonnes choses à ceux qui les lui demandent.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure', 'etre_aime'], situations: ['attente', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Hébreux 13:5", 
            texte: "Je ne te délaisserai point, et je ne t'abandonnerai point.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'solitude'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve', 'solitude'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Psaume 23:4", 
            texte: "Quand je marche dans la vallée de l'ombre de la mort, je ne crains aucun mal, car tu es avec moi.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'tristesse'], besoins: ['etre_rassure'], situations: ['epreuve', 'deuil', 'maladie'], intensites: ['profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Philippiens 4:19", 
            texte: "Mon Dieu pourvoira à tous vos besoins selon sa richesse, avec gloire, en Jésus-Christ.", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure', 'lacher_prise'], situations: ['attente', 'epreuve'], intensites: ['moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Luc 12:6-7", 
            texte: "Ne vend-on pas cinq passereaux pour deux sous ? Cependant, aucun d'eux n'est oublié devant Dieu. Même vos cheveux sont tous comptés. Ne craignez donc point.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'solitude'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve', 'solitude'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Matthieu 10:31", 
            texte: "Ne craignez donc point : vous valez plus que beaucoup de passereaux.", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 10:28", 
            texte: "Je leur donne la vie éternelle ; et elles ne périront jamais, et personne ne les ravira de ma main.", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure'], situations: ['epreuve', 'doute'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "2 Corinthiens 1:9-10", 
            texte: "Nous avons porté en nous-mêmes notre sentence de mort, afin de ne pas placer notre confiance en nous-mêmes, mais de la placer en Dieu, qui ressuscite les morts.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'lassitude'], besoins: ['lacher_prise'], situations: ['epreuve', 'maladie'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 6:37", 
            texte: "Celui qui vient à moi, je ne le mettrai pas dehors.", 
            famille: "confiance",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_rassure', 'etre_aime'], situations: ['conversion', 'doute'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Romains 8:32", 
            texte: "Lui qui n'a point épargné son propre Fils, mais qui l'a livré pour nous tous, comment ne nous donnera-t-il pas aussi toutes choses avec lui ?", 
            famille: "confiance",
            tags: { emotions: ['peur'], besoins: ['etre_rassure'], situations: ['attente', 'epreuve'], intensites: ['moderee'], postures: ['contempler'] }
        },
        { 
            reference: "1 Jean 5:14", 
            texte: "Nous avons auprès de lui cette assurance que, si nous demandons quelque chose selon sa volonté, il nous écoute.", 
            famille: "confiance",
            tags: { emotions: ['confusion'], besoins: ['etre_rassure'], situations: ['attente', 'quotidien'], intensites: ['legere'], postures: ['recevoir'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // 🎉 JOIE (20 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "Jean 15:11", 
            texte: "Je vous ai dit ces choses, afin que ma joie soit en vous, et que votre joie soit parfaite.", 
            famille: "joie",
            tags: { emotions: ['joie', 'gratitude'], besoins: ['etre_aime'], situations: ['quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'louer'] }
        },
        { 
            reference: "Philippiens 4:4", 
            texte: "Réjouissez-vous toujours dans le Seigneur ; je le répète, réjouissez-vous.", 
            famille: "joie",
            tags: { emotions: ['joie', 'tristesse'], besoins: ['etre_rassure'], situations: ['epreuve', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['louer'] }
        },
        { 
            reference: "Romains 14:17", 
            texte: "Le royaume de Dieu, c'est la justice, la paix et la joie, par le Saint Esprit.", 
            famille: "joie",
            tags: { emotions: ['joie', 'confusion'], besoins: ['comprendre'], situations: ['quotidien'], intensites: ['legere'], postures: ['contempler'] }
        },
        { 
            reference: "1 Thessaloniciens 5:16", 
            texte: "Soyez toujours joyeux.", 
            famille: "joie",
            tags: { emotions: ['joie', 'tristesse'], besoins: ['etre_rassure'], situations: ['quotidien', 'epreuve'], intensites: ['legere', 'moderee'], postures: ['louer'] }
        },
        { 
            reference: "1 Thessaloniciens 5:18", 
            texte: "Rendez grâces en toutes choses, car c'est à votre égard la volonté de Dieu en Jésus Christ.", 
            famille: "joie",
            tags: { emotions: ['gratitude', 'confusion'], besoins: ['etre_guide'], situations: ['quotidien', 'epreuve'], intensites: ['legere', 'moderee'], postures: ['louer'] }
        },
        { 
            reference: "Jacques 1:2", 
            texte: "Mes frères, regardez comme un sujet de joie complète les diverses épreuves auxquelles vous pouvez être exposés.", 
            famille: "joie",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['perseverer', 'comprendre'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['contempler'] }
        },
        { 
            reference: "Jean 16:22", 
            texte: "Je vous reverrai, et votre cœur se réjouira, et nul ne vous ravira votre joie.", 
            famille: "joie",
            tags: { emotions: ['tristesse', 'esperance'], besoins: ['etre_rassure'], situations: ['deuil', 'attente'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Luc 10:20", 
            texte: "Réjouissez-vous de ce que vos noms sont écrits dans les cieux.", 
            famille: "joie",
            tags: { emotions: ['joie', 'gratitude'], besoins: ['etre_rassure'], situations: ['quotidien'], intensites: ['legere'], postures: ['louer'] }
        },
        { 
            reference: "Galates 5:22", 
            texte: "Le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la fidélité, la douceur, la maîtrise de soi.", 
            famille: "joie",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['quotidien'], intensites: ['legere'], postures: ['contempler'] }
        },
        { 
            reference: "Actes 2:28", 
            texte: "Tu m'as fait connaître les sentiers de la vie, tu me rempliras de joie par ta présence.", 
            famille: "joie",
            tags: { emotions: ['joie', 'gratitude'], besoins: ['etre_guide', 'etre_aime'], situations: ['quotidien', 'nouveau_depart'], intensites: ['legere', 'moderee'], postures: ['louer', 'recevoir'] }
        },
        { 
            reference: "Jean 16:24", 
            texte: "Demandez, et vous recevrez, afin que votre joie soit parfaite.", 
            famille: "joie",
            tags: { emotions: ['confusion'], besoins: ['etre_rassure'], situations: ['attente'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Luc 15:10", 
            texte: "Il y a de la joie devant les anges de Dieu pour un seul pécheur qui se repent.", 
            famille: "joie",
            tags: { emotions: ['gratitude'], besoins: ['etre_pardonne', 'etre_aime'], situations: ['conversion'], intensites: ['legere', 'moderee'], postures: ['louer'] }
        },
        { 
            reference: "Néhémie 8:10", 
            texte: "La joie de l'Éternel sera votre force.", 
            famille: "joie",
            tags: { emotions: ['lassitude', 'tristesse'], besoins: ['trouver_force'], situations: ['epreuve', 'quotidien'], intensites: ['moderee'], postures: ['recevoir', 'louer'] }
        },
        { 
            reference: "1 Pierre 1:8", 
            texte: "Vous l'aimez sans l'avoir vu, et vous croyez en lui sans le voir encore, et vous vous réjouissez d'une joie ineffable et glorieuse.", 
            famille: "joie",
            tags: { emotions: ['joie', 'gratitude'], besoins: ['etre_aime'], situations: ['quotidien'], intensites: ['legere', 'moderee'], postures: ['louer'] }
        },
        { 
            reference: "Romains 15:13", 
            texte: "Que le Dieu de l'espérance vous remplisse de toute joie et de toute paix dans la foi.", 
            famille: "joie",
            tags: { emotions: ['joie', 'esperance'], besoins: ['etre_rassure'], situations: ['quotidien', 'attente'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 17:13", 
            texte: "Et maintenant je vais à toi, et je dis ces choses dans le monde, afin qu'ils aient en eux ma joie parfaite.", 
            famille: "joie",
            tags: { emotions: ['joie'], besoins: ['etre_aime'], situations: ['quotidien'], intensites: ['legere'], postures: ['recevoir'] }
        },
        { 
            reference: "Actes 13:52", 
            texte: "Les disciples étaient remplis de joie et du Saint Esprit.", 
            famille: "joie",
            tags: { emotions: ['joie', 'gratitude'], besoins: ['etre_guide'], situations: ['quotidien', 'nouveau_depart'], intensites: ['legere'], postures: ['louer'] }
        },
        { 
            reference: "Matthieu 25:21", 
            texte: "C'est bien, bon et fidèle serviteur ; tu as été fidèle en peu de chose, je te confierai beaucoup ; entre dans la joie de ton maître.", 
            famille: "joie",
            tags: { emotions: ['joie', 'gratitude'], besoins: ['etre_rassure'], situations: ['quotidien'], intensites: ['legere'], postures: ['louer'] }
        },
        { 
            reference: "Luc 2:10", 
            texte: "L'ange leur dit : Ne craignez point ; car je vous annonce une bonne nouvelle, qui sera pour tout le peuple le sujet d'une grande joie.", 
            famille: "joie",
            tags: { emotions: ['peur', 'joie'], besoins: ['etre_rassure'], situations: ['quotidien', 'epreuve'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Hébreux 12:2", 
            texte: "Jésus, qui, en vue de la joie qui lui était réservée, a souffert la croix, méprisé l'ignominie.", 
            famille: "joie",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['perseverer'], situations: ['epreuve'], intensites: ['profonde'], postures: ['contempler'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // 💡 SAGESSE (20 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "Jacques 1:5", 
            texte: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['decision'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Colossiens 3:16", 
            texte: "Que la parole de Christ habite parmi vous abondamment ; instruisez-vous les uns les autres en toute sagesse.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['comprendre', 'etre_guide'], situations: ['quotidien'], intensites: ['legere'], postures: ['agir', 'contempler'] }
        },
        { 
            reference: "Éphésiens 1:17", 
            texte: "Que le Dieu de notre Seigneur Jésus Christ vous donne un esprit de sagesse et de révélation.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['decision', 'doute'], intensites: ['moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 16:13", 
            texte: "Quand le consolateur sera venu, l'Esprit de vérité, il vous conduira dans toute la vérité.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['decision', 'doute'], intensites: ['moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 8:32", 
            texte: "Vous connaîtrez la vérité, et la vérité vous affranchira.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['comprendre'], situations: ['doute', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Matthieu 7:24", 
            texte: "Quiconque entend ces paroles que je dis et les met en pratique, sera semblable à un homme prudent qui a bâti sa maison sur le roc.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'agir'], situations: ['decision', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Jacques 3:17", 
            texte: "La sagesse d'en haut est premièrement pure, ensuite pacifique, modérée, conciliante, pleine de miséricorde et de bons fruits.", 
            famille: "sagesse",
            tags: { emotions: ['confusion', 'colere'], besoins: ['etre_guide'], situations: ['conflit', 'decision'], intensites: ['legere', 'moderee'], postures: ['agir', 'contempler'] }
        },
        { 
            reference: "Colossiens 1:9", 
            texte: "Que vous soyez remplis de la connaissance de sa volonté, en toute sagesse et intelligence spirituelle.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['decision'], intensites: ['moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "1 Corinthiens 2:12", 
            texte: "Nous avons reçu, non l'esprit du monde, mais l'Esprit qui vient de Dieu, afin que nous connaissions les choses que Dieu nous a données par sa grâce.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['comprendre'], situations: ['doute', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Jean 14:26", 
            texte: "Le consolateur, l'Esprit Saint, que le Père enverra en mon nom, vous enseignera toutes choses.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['decision', 'quotidien'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Romains 12:2", 
            texte: "Soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['decision', 'conversion'], intensites: ['moderee'], postures: ['agir', 'contempler'] }
        },
        { 
            reference: "Éphésiens 5:15-16", 
            texte: "Prenez donc garde de vous conduire avec circonspection, non comme des insensés, mais comme des sages ; rachetez le temps, car les jours sont mauvais.", 
            famille: "sagesse",
            tags: { emotions: ['confusion', 'lassitude'], besoins: ['etre_guide'], situations: ['quotidien', 'decision'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Proverbes 2:6", 
            texte: "Car l'Éternel donne la sagesse ; de sa bouche sortent la connaissance et l'intelligence.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['decision'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "1 Corinthiens 1:30", 
            texte: "C'est par lui que vous êtes en Jésus Christ, lequel, de par Dieu, a été fait pour nous sagesse, justice et sanctification et rédemption.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['comprendre'], situations: ['doute', 'quotidien'], intensites: ['legere'], postures: ['contempler'] }
        },
        { 
            reference: "Philippiens 1:9-10", 
            texte: "Que votre amour augmente de plus en plus en connaissance et en pleine intelligence pour discerner les choses les meilleures.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['decision'], intensites: ['legere', 'moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "2 Timothée 3:16", 
            texte: "Toute Écriture est inspirée de Dieu, et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide', 'comprendre'], situations: ['quotidien'], intensites: ['legere'], postures: ['contempler'] }
        },
        { 
            reference: "Proverbes 3:13", 
            texte: "Heureux l'homme qui a trouvé la sagesse, et l'homme qui possède l'intelligence !", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide'], situations: ['quotidien'], intensites: ['legere'], postures: ['contempler'] }
        },
        { 
            reference: "1 Rois 3:9", 
            texte: "Accorde donc à ton serviteur un cœur intelligent pour juger ton peuple, pour discerner le bien du mal.", 
            famille: "sagesse",
            tags: { emotions: ['confusion'], besoins: ['etre_guide'], situations: ['decision'], intensites: ['moderee'], postures: ['recevoir'] }
        },
        { 
            reference: "Jacques 1:19", 
            texte: "Que tout homme soit prompt à écouter, lent à parler, lent à se mettre en colère.", 
            famille: "sagesse",
            tags: { emotions: ['colere'], besoins: ['etre_guide'], situations: ['conflit'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Matthieu 10:16", 
            texte: "Soyez donc prudents comme les serpents, et simples comme les colombes.", 
            famille: "sagesse",
            tags: { emotions: ['peur', 'confusion'], besoins: ['etre_guide'], situations: ['decision', 'epreuve'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // 💜 RÉCONFORT (20 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "2 Corinthiens 1:3-4", 
            texte: "Béni soit Dieu, le Père des miséricordes et le Dieu de toute consolation, qui nous console dans toutes nos afflictions.", 
            famille: "reconfort",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['etre_rassure'], situations: ['epreuve', 'deuil'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Matthieu 5:4", 
            texte: "Heureux les affligés, car ils seront consolés !", 
            famille: "reconfort",
            tags: { emotions: ['tristesse'], besoins: ['etre_rassure'], situations: ['deuil', 'epreuve'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 14:18", 
            texte: "Je ne vous laisserai pas orphelins, je viendrai à vous.", 
            famille: "reconfort",
            tags: { emotions: ['solitude', 'tristesse'], besoins: ['etre_aime', 'etre_rassure'], situations: ['deuil', 'solitude'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 14:16", 
            texte: "Je prierai le Père, et il vous donnera un autre consolateur, afin qu'il demeure éternellement avec vous.", 
            famille: "reconfort",
            tags: { emotions: ['solitude', 'tristesse'], besoins: ['etre_rassure'], situations: ['deuil', 'solitude'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Matthieu 28:20", 
            texte: "Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde.", 
            famille: "reconfort",
            tags: { emotions: ['solitude', 'peur'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve', 'solitude', 'quotidien'], intensites: ['legere', 'moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Apocalypse 7:17", 
            texte: "L'agneau les conduira aux sources des eaux de la vie, et Dieu essuiera toute larme de leurs yeux.", 
            famille: "reconfort",
            tags: { emotions: ['tristesse'], besoins: ['etre_rassure'], situations: ['deuil', 'maladie'], intensites: ['profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "2 Corinthiens 4:8-9", 
            texte: "Nous sommes pressés de toute manière, mais non réduits à l'extrémité ; dans la détresse, mais non dans le désespoir.", 
            famille: "reconfort",
            tags: { emotions: ['lassitude', 'peur'], besoins: ['trouver_force', 'etre_rassure'], situations: ['epreuve'], intensites: ['profonde'], postures: ['recevoir', 'agir'] }
        },
        { 
            reference: "2 Thessaloniciens 2:16-17", 
            texte: "Que notre Seigneur Jésus Christ lui-même, et Dieu notre Père, qui nous a aimés, console vos cœurs.", 
            famille: "reconfort",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve', 'deuil'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 11:25", 
            texte: "Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort.", 
            famille: "reconfort",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_rassure'], situations: ['deuil', 'maladie'], intensites: ['profonde'], postures: ['recevoir', 'contempler'] }
        },
        { 
            reference: "Luc 4:18", 
            texte: "L'Esprit du Seigneur est sur moi, parce qu'il m'a oint pour annoncer une bonne nouvelle aux pauvres ; il m'a envoyé pour guérir ceux qui ont le cœur brisé.", 
            famille: "reconfort",
            tags: { emotions: ['tristesse'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve', 'deuil'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Psaume 34:18", 
            texte: "L'Éternel est près de ceux qui ont le cœur brisé, et il sauve ceux qui ont l'esprit dans l'abattement.", 
            famille: "reconfort",
            tags: { emotions: ['tristesse', 'lassitude'], besoins: ['etre_rassure', 'etre_aime'], situations: ['epreuve', 'deuil'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Psaume 147:3", 
            texte: "Il guérit ceux qui ont le cœur brisé, et il panse leurs blessures.", 
            famille: "reconfort",
            tags: { emotions: ['tristesse'], besoins: ['etre_rassure'], situations: ['deuil', 'epreuve', 'conflit'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Isaïe 41:10", 
            texte: "Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu ; je te fortifie, je viens à ton secours.", 
            famille: "reconfort",
            tags: { emotions: ['peur', 'solitude'], besoins: ['etre_rassure', 'trouver_force'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Isaïe 43:2", 
            texte: "Si tu traverses les eaux, je serai avec toi ; si tu traverses les fleuves, ils ne te submergeront point.", 
            famille: "reconfort",
            tags: { emotions: ['peur'], besoins: ['etre_rassure'], situations: ['epreuve'], intensites: ['profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Psaume 23:1-2", 
            texte: "L'Éternel est mon berger : je ne manquerai de rien. Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles.", 
            famille: "reconfort",
            tags: { emotions: ['lassitude', 'peur'], besoins: ['lacher_prise', 'etre_rassure'], situations: ['epreuve', 'quotidien'], intensites: ['moderee', 'profonde'], postures: ['se_reposer'] }
        },
        { 
            reference: "Psaume 46:1", 
            texte: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse.", 
            famille: "reconfort",
            tags: { emotions: ['peur', 'tristesse'], besoins: ['etre_rassure'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Isaïe 40:31", 
            texte: "Ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles.", 
            famille: "reconfort",
            tags: { emotions: ['lassitude'], besoins: ['trouver_force', 'etre_rassure'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Romains 8:26", 
            texte: "L'Esprit nous aide dans notre faiblesse, car nous ne savons pas ce qu'il nous convient de demander dans nos prières.", 
            famille: "reconfort",
            tags: { emotions: ['confusion', 'lassitude'], besoins: ['etre_guide', 'etre_rassure'], situations: ['epreuve', 'doute'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Jean 11:35", 
            texte: "Jésus pleura.", 
            famille: "reconfort",
            tags: { emotions: ['tristesse'], besoins: ['etre_aime', 'etre_rassure'], situations: ['deuil'], intensites: ['profonde'], postures: ['contempler'] }
        },
        { 
            reference: "Matthieu 11:30", 
            texte: "Car mon joug est doux, et mon fardeau léger.", 
            famille: "reconfort",
            tags: { emotions: ['lassitude'], besoins: ['lacher_prise', 'etre_rassure'], situations: ['epreuve', 'quotidien'], intensites: ['moderee'], postures: ['recevoir', 'se_reposer'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // 🙌 PARDON (15 versets)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "1 Jean 1:9", 
            texte: "Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.", 
            famille: "pardon",
            tags: { emotions: ['tristesse', 'confusion'], besoins: ['etre_pardonne'], situations: ['conversion'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Éphésiens 4:32", 
            texte: "Soyez bons les uns envers les autres, compatissants, vous pardonnant réciproquement, comme Dieu vous a pardonné en Christ.", 
            famille: "pardon",
            tags: { emotions: ['colere'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "Colossiens 3:13", 
            texte: "Supportez-vous les uns les autres, et, si l'un a sujet de se plaindre de l'autre, pardonnez-vous réciproquement. De même que Christ vous a pardonné, pardonnez-vous aussi.", 
            famille: "pardon",
            tags: { emotions: ['colere'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "Matthieu 6:14", 
            texte: "Si vous pardonnez aux hommes leurs offenses, votre Père céleste vous pardonnera aussi.", 
            famille: "pardon",
            tags: { emotions: ['colere'], besoins: ['pardonner', 'etre_pardonne'], situations: ['conflit'], intensites: ['moderee'], postures: ['agir'] }
        },
        { 
            reference: "Luc 6:37", 
            texte: "Ne jugez point, et vous ne serez point jugés ; ne condamnez point, et vous ne serez point condamnés ; absolvez, et vous serez absous.", 
            famille: "pardon",
            tags: { emotions: ['colere'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Marc 11:25", 
            texte: "Lorsque vous êtes debout faisant votre prière, si vous avez quelque chose contre quelqu'un, pardonnez.", 
            famille: "pardon",
            tags: { emotions: ['colere'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Matthieu 18:21-22", 
            texte: "Seigneur, combien de fois pardonnerai-je à mon frère ? Jusqu'à sept fois ? Jésus lui dit : Je ne te dis pas jusqu'à sept fois, mais jusqu'à soixante-dix fois sept fois.", 
            famille: "pardon",
            tags: { emotions: ['colere', 'lassitude'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "Actes 3:19", 
            texte: "Repentez-vous donc et convertissez-vous, pour que vos péchés soient effacés.", 
            famille: "pardon",
            tags: { emotions: ['tristesse', 'confusion'], besoins: ['etre_pardonne'], situations: ['conversion'], intensites: ['moderee'], postures: ['agir'] }
        },
        { 
            reference: "Romains 8:1", 
            texte: "Il n'y a donc maintenant aucune condamnation pour ceux qui sont en Jésus-Christ.", 
            famille: "pardon",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_pardonne', 'etre_rassure'], situations: ['conversion', 'quotidien'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "2 Corinthiens 5:17", 
            texte: "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées ; voici, toutes choses sont devenues nouvelles.", 
            famille: "pardon",
            tags: { emotions: ['tristesse', 'confusion'], besoins: ['etre_pardonne'], situations: ['conversion', 'nouveau_depart'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Luc 23:34", 
            texte: "Père, pardonne-leur, car ils ne savent ce qu'ils font.", 
            famille: "pardon",
            tags: { emotions: ['colere'], besoins: ['pardonner'], situations: ['conflit'], intensites: ['profonde'], postures: ['contempler', 'agir'] }
        },
        { 
            reference: "Psaume 103:12", 
            texte: "Autant l'orient est éloigné de l'occident, autant il éloigne de nous nos transgressions.", 
            famille: "pardon",
            tags: { emotions: ['tristesse'], besoins: ['etre_pardonne', 'etre_rassure'], situations: ['conversion'], intensites: ['moderee', 'profonde'], postures: ['recevoir', 'louer'] }
        },
        { 
            reference: "Isaïe 1:18", 
            texte: "Venez et plaidons ! dit l'Éternel. Si vos péchés sont comme le cramoisi, ils deviendront blancs comme la neige.", 
            famille: "pardon",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_pardonne'], situations: ['conversion'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Michée 7:19", 
            texte: "Il aura encore compassion de nous, il mettra sous ses pieds nos iniquités ; tu jetteras au fond de la mer tous leurs péchés.", 
            famille: "pardon",
            tags: { emotions: ['tristesse'], besoins: ['etre_pardonne', 'etre_rassure'], situations: ['conversion'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },
        { 
            reference: "Hébreux 8:12", 
            texte: "Car je pardonnerai leurs iniquités, et je ne me souviendrai plus de leurs péchés.", 
            famille: "pardon",
            tags: { emotions: ['tristesse', 'peur'], besoins: ['etre_pardonne', 'etre_rassure'], situations: ['conversion'], intensites: ['moderee', 'profonde'], postures: ['recevoir'] }
        },

        // ═══════════════════════════════════════════════════════════════════
        // 🏃 PERSÉVÉRANCE (5 versets supplémentaires)
        // ═══════════════════════════════════════════════════════════════════
        { 
            reference: "Romains 5:3-4", 
            texte: "La tribulation produit la persévérance, la persévérance la victoire dans l'épreuve, et cette victoire l'espérance.", 
            famille: "perseverance",
            tags: { emotions: ['lassitude', 'tristesse'], besoins: ['perseverer', 'comprendre'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['contempler'] }
        },
        { 
            reference: "Jacques 1:3-4", 
            texte: "L'épreuve de votre foi produit la patience. Mais il faut que la patience accomplisse parfaitement son œuvre.", 
            famille: "perseverance",
            tags: { emotions: ['lassitude'], besoins: ['perseverer'], situations: ['epreuve', 'attente'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "2 Pierre 1:6", 
            texte: "Joignez à la science la tempérance, à la tempérance la patience, à la patience la piété.", 
            famille: "perseverance",
            tags: { emotions: ['confusion', 'lassitude'], besoins: ['perseverer', 'etre_guide'], situations: ['quotidien'], intensites: ['legere', 'moderee'], postures: ['agir'] }
        },
        { 
            reference: "Apocalypse 3:10", 
            texte: "Parce que tu as gardé la parole de la persévérance en moi, je te garderai aussi à l'heure de la tentation.", 
            famille: "perseverance",
            tags: { emotions: ['lassitude', 'peur'], besoins: ['perseverer', 'etre_rassure'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        },
        { 
            reference: "Luc 21:19", 
            texte: "Par votre persévérance vous sauverez vos âmes.", 
            famille: "perseverance",
            tags: { emotions: ['lassitude'], besoins: ['perseverer'], situations: ['epreuve'], intensites: ['moderee', 'profonde'], postures: ['agir'] }
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // MESSAGES D'ACCOMPAGNEMENT
    // ═══════════════════════════════════════════════════════════════════════

    messages: {
        choixParcours: {
            titre: "Quel chemin veux-tu emprunter ?",
            sousTitre: "Choisis selon le temps que tu as et la profondeur que tu recherches"
        },
        accueil: {
            titre: "Un moment pour toi",
            sousTitre: "Prends quelques instants...",
            texte: "Le Seigneur a une parole spécialement pour toi aujourd'hui. Réponds avec ton cœur, sans réfléchir trop.",
            bouton: "Je suis prêt(e)"
        },
        transition: "Le Seigneur prépare une parole pour toi...",
        revelation: "Aujourd'hui, cette parole est pour toi...",
        revelation2versets: "Ces deux paroles se répondent pour toi aujourd'hui...",
        priereIntro: "Pour aller plus loin dans la prière :"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ALGORITHME DE MATCHING
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Calcule le score de correspondance entre un profil utilisateur et un verset
     * @param {Object} userProfile - Profil construit à partir des réponses
     * @param {Object} verset - Verset avec ses tags
     * @returns {number} Score de correspondance (0-100)
     */
    calculateMatchScore(userProfile, verset) {
        let score = 0;
        let maxScore = 0;

        // Correspondance émotionnelle (poids: 25)
        if (userProfile.emotion && verset.tags.emotions) {
            maxScore += 25;
            if (verset.tags.emotions.includes(userProfile.emotion)) {
                score += 25;
            } else if (verset.tags.emotions.some(e => this.areEmotionsRelated(e, userProfile.emotion))) {
                score += 15;
            }
        }

        // Correspondance besoin (poids: 30)
        if (userProfile.besoin && verset.tags.besoins) {
            maxScore += 30;
            if (verset.tags.besoins.includes(userProfile.besoin)) {
                score += 30;
            } else if (verset.tags.besoins.some(b => this.areBesoinsRelated(b, userProfile.besoin))) {
                score += 18;
            }
        }

        // Correspondance situation (poids: 25)
        if (userProfile.situation && verset.tags.situations) {
            maxScore += 25;
            if (verset.tags.situations.includes(userProfile.situation)) {
                score += 25;
            } else if (verset.tags.situations.some(s => this.areSituationsRelated(s, userProfile.situation))) {
                score += 12;
            }
        }

        // Correspondance intensité (poids: 10)
        if (userProfile.intensite && verset.tags.intensites) {
            maxScore += 10;
            if (verset.tags.intensites.includes(userProfile.intensite)) {
                score += 10;
            }
        }

        // Correspondance posture (poids: 10)
        if (userProfile.posture && verset.tags.postures) {
            maxScore += 10;
            if (verset.tags.postures.includes(userProfile.posture)) {
                score += 10;
            }
        }

        return maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
    },

    /**
     * Vérifie si deux émotions sont liées
     */
    areEmotionsRelated(e1, e2) {
        const relations = {
            'tristesse': ['lassitude', 'solitude'],
            'peur': ['confusion'],
            'lassitude': ['tristesse'],
            'solitude': ['tristesse'],
            'confusion': ['peur'],
            'joie': ['gratitude', 'paix'],
            'gratitude': ['joie'],
            'paix': ['joie']
        };
        return relations[e1]?.includes(e2) || relations[e2]?.includes(e1);
    },

    /**
     * Vérifie si deux besoins sont liés
     */
    areBesoinsRelated(b1, b2) {
        const relations = {
            'etre_rassure': ['etre_aime', 'lacher_prise'],
            'etre_aime': ['etre_rassure'],
            'lacher_prise': ['etre_rassure', 'se_reposer'],
            'trouver_force': ['perseverer'],
            'perseverer': ['trouver_force'],
            'pardonner': ['etre_pardonne'],
            'etre_pardonne': ['pardonner', 'etre_aime']
        };
        return relations[b1]?.includes(b2) || relations[b2]?.includes(b1);
    },

    /**
     * Vérifie si deux situations sont liées
     */
    areSituationsRelated(s1, s2) {
        const relations = {
            'epreuve': ['maladie', 'deuil', 'conflit'],
            'deuil': ['epreuve', 'solitude'],
            'maladie': ['epreuve'],
            'solitude': ['deuil'],
            'attente': ['decision'],
            'decision': ['attente', 'nouveau_depart'],
            'nouveau_depart': ['decision', 'conversion'],
            'conversion': ['nouveau_depart']
        };
        return relations[s1]?.includes(s2) || relations[s2]?.includes(s1);
    },

    /**
     * Trouve les meilleurs versets pour un profil utilisateur
     * @param {Object} userProfile - Profil utilisateur
     * @param {number} count - Nombre de versets à retourner (1 ou 2)
     * @param {Array} excludeRefs - Références à exclure (historique)
     * @returns {Array} Les meilleurs versets
     */
    findBestVersets(userProfile, count = 1, excludeRefs = []) {
        const scored = this.versets
            .filter(v => !excludeRefs.includes(v.reference))
            .map(v => ({
                verset: v,
                score: this.calculateMatchScore(userProfile, v)
            }))
            .sort((a, b) => b.score - a.score);

        // Si on veut 2 versets, prendre le meilleur et un complémentaire
        if (count === 2 && scored.length >= 2) {
            const best = scored[0];
            // Chercher un verset complémentaire (famille différente si possible)
            const complementaire = scored.find(s => 
                s.verset.famille !== best.verset.famille && 
                s.score >= 50
            ) || scored[1];
            
            return [best.verset, complementaire.verset];
        }

        return scored.slice(0, count).map(s => s.verset);
    }
};

// Rendre accessible globalement
window.VersetsSpeciaux = VersetsSpeciaux;
