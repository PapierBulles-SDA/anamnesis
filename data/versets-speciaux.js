/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Versets Spéciaux pour "Trouve ton Verset"
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Collection de 100 versets du NOUVEAU TESTAMENT uniquement,
 * soigneusement sélectionnés pour leur beauté et leur capacité à toucher le cœur.
 * 
 * 5 questions (symbolique des 5 plaies) pour une évaluation profonde.
 */

const VersetsSpeciaux = {

    // ═══════════════════════════════════════════════════════════════════════
    // FAMILLES DE VERSETS
    // ═══════════════════════════════════════════════════════════════════════

    familles: {
        paix: {
            id: 'paix',
            nom: 'Paix',
            icone: '🌿',
            couleur: '#4CAF50',
            couleurLight: '#E8F5E9',
            priereRecommandee: 'saint-francois',
            message: "Le Seigneur voit ton agitation. Il t'invite au repos de son cœur. Laisse sa paix envahir chaque recoin de ton être."
        },
        force: {
            id: 'force',
            nom: 'Force',
            icone: '💪',
            couleur: '#FF5722',
            couleurLight: '#FBE9E7',
            priereRecommandee: 'ame-du-christ',
            message: "Tu n'es pas seul dans ce combat. Sa force coule en toi. Avec Lui, tu peux traverser cette journée."
        },
        amour: {
            id: 'amour',
            nom: 'Amour',
            icone: '❤️',
            couleur: '#E91E63',
            couleurLight: '#FCE4EC',
            priereRecommandee: 'je-vous-salue',
            message: "Tu es infiniment aimé(e), tel(le) que tu es. Rien ni personne ne peut te séparer de cet amour."
        },
        esperance: {
            id: 'esperance',
            nom: 'Espérance',
            icone: '✨',
            couleur: '#FF9800',
            couleurLight: '#FFF3E0',
            priereRecommandee: 'magnificat',
            message: "L'avenir t'inquiète ? Celui qui tient les étoiles tient aussi ta vie. Ton histoire n'est pas finie."
        },
        confiance: {
            id: 'confiance',
            nom: 'Confiance',
            icone: '🙏',
            couleur: '#3F51B5',
            couleurLight: '#E8EAF6',
            priereRecommandee: 'notre-pere',
            message: "Lâche prise, doucement. Ses mains sont plus sûres que les tiennes. Il veille sur chacun de tes pas."
        },
        joie: {
            id: 'joie',
            nom: 'Joie',
            icone: '🎉',
            couleur: '#FFC107',
            couleurLight: '#FFFDE7',
            priereRecommandee: 'gloire-au-pere',
            message: "La joie est un don de Dieu, et elle est pour toi aujourd'hui. Laisse-la jaillir de ton cœur !"
        },
        sagesse: {
            id: 'sagesse',
            nom: 'Sagesse',
            icone: '💡',
            couleur: '#9C27B0',
            couleurLight: '#F3E5F5',
            priereRecommandee: 'esprit-saint',
            message: "L'Esprit Saint est ton conseiller. Dans le silence, Il éclaire ton chemin et guide tes décisions."
        },
        reconfort: {
            id: 'reconfort',
            nom: 'Réconfort',
            icone: '💜',
            couleur: '#673AB7',
            couleurLight: '#EDE7F6',
            priereRecommandee: 'psaume-22',
            message: "Il connaît ta douleur, Il recueille chacune de tes larmes. Tu es précieux(se) à ses yeux."
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // LES 5 QUESTIONS (Symbolique des 5 plaies)
    // ═══════════════════════════════════════════════════════════════════════

    questions: [
        {
            id: 1,
            texte: "Comment te sens-tu en ce moment ?",
            sousTitre: "Écoute ton cœur...",
            reponses: [
                { texte: "En paix, serein(e)", icone: "😊", scores: { joie: 3, paix: 2, confiance: 1 } },
                { texte: "Fatigué(e), un peu lourd(e)", icone: "😔", scores: { reconfort: 3, paix: 2, force: 1 } },
                { texte: "Inquiet(e), agité(e)", icone: "😰", scores: { paix: 3, confiance: 2, esperance: 1 } },
                { texte: "Motivé(e), déterminé(e)", icone: "🔥", scores: { force: 3, joie: 2, sagesse: 1 } }
            ]
        },
        {
            id: 2,
            texte: "De quoi ton âme a-t-elle soif ?",
            sousTitre: "Ce dont tu as vraiment besoin...",
            reponses: [
                { texte: "De calme et de silence", icone: "🌿", scores: { paix: 3, reconfort: 2, confiance: 1 } },
                { texte: "De force pour tenir", icone: "⚡", scores: { force: 3, esperance: 2, confiance: 1 } },
                { texte: "D'être aimé(e) et compris(e)", icone: "💗", scores: { amour: 3, reconfort: 2, joie: 1 } },
                { texte: "De lumière pour comprendre", icone: "💡", scores: { sagesse: 3, confiance: 2, paix: 1 } }
            ]
        },
        {
            id: 3,
            texte: "Qu'est-ce qui t'attend aujourd'hui ?",
            sousTitre: "Ce que cette journée te réserve...",
            reponses: [
                { texte: "Un défi à relever", icone: "🏔️", scores: { force: 3, sagesse: 2, esperance: 1 } },
                { texte: "Des rencontres importantes", icone: "👥", scores: { amour: 3, sagesse: 2, joie: 1 } },
                { texte: "Une journée ordinaire", icone: "☀️", scores: { joie: 3, paix: 2, confiance: 1 } },
                { texte: "Un moment difficile", icone: "🌧️", scores: { reconfort: 3, force: 2, esperance: 1 } }
            ]
        },
        {
            id: 4,
            texte: "Dans ta prière, que voudrais-tu ?",
            sousTitre: "Ce que tu portes devant Dieu...",
            reponses: [
                { texte: "Lui rendre grâce", icone: "🙌", scores: { joie: 3, amour: 2, paix: 1 } },
                { texte: "Lui confier mes soucis", icone: "🤲", scores: { confiance: 3, paix: 2, esperance: 1 } },
                { texte: "Sentir sa présence", icone: "✨", scores: { reconfort: 3, amour: 2, confiance: 1 } },
                { texte: "Recevoir sa direction", icone: "🧭", scores: { sagesse: 3, confiance: 2, force: 1 } }
            ]
        },
        {
            id: 5,
            texte: "Ce soir, tu aimerais te coucher avec...",
            sousTitre: "Ce que tu espères garder de cette journée...",
            reponses: [
                { texte: "Un cœur apaisé", icone: "😌", scores: { paix: 3, reconfort: 2, confiance: 1 } },
                { texte: "La joie au cœur", icone: "😄", scores: { joie: 3, amour: 2, esperance: 1 } },
                { texte: "Le sentiment d'avoir avancé", icone: "🚀", scores: { force: 3, sagesse: 2, esperance: 1 } },
                { texte: "La certitude d'être aimé(e)", icone: "🥰", scores: { amour: 3, reconfort: 2, confiance: 1 } }
            ]
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // COLLECTION DE 100 VERSETS DU NOUVEAU TESTAMENT UNIQUEMENT
    // ═══════════════════════════════════════════════════════════════════════

    versets: [
        // ═══════════════════════════════════════════════════════════════════
        // 🌿 PAIX (13 versets)
        // ═══════════════════════════════════════════════════════════════════
        { reference: "Jean 14:27", texte: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point.", famille: "paix" },
        { reference: "Philippiens 4:7", texte: "Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs et vos pensées en Jésus-Christ.", famille: "paix" },
        { reference: "Matthieu 11:28", texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", famille: "paix" },
        { reference: "Matthieu 11:29", texte: "Prenez mon joug sur vous et recevez mes instructions, car je suis doux et humble de cœur ; et vous trouverez du repos pour vos âmes.", famille: "paix" },
        { reference: "Jean 16:33", texte: "Je vous ai dit ces choses, afin que vous ayez la paix en moi. Vous aurez des tribulations dans le monde ; mais prenez courage, j'ai vaincu le monde.", famille: "paix" },
        { reference: "Colossiens 3:15", texte: "Et que la paix de Christ, à laquelle vous avez été appelés pour former un seul corps, règne dans vos cœurs.", famille: "paix" },
        { reference: "Romains 15:13", texte: "Que le Dieu de l'espérance vous remplisse de toute joie et de toute paix dans la foi.", famille: "paix" },
        { reference: "2 Thessaloniciens 3:16", texte: "Que le Seigneur de la paix vous donne lui-même la paix en tout temps, de toute manière !", famille: "paix" },
        { reference: "Jean 14:1", texte: "Que votre cœur ne se trouble point. Croyez en Dieu, et croyez en moi.", famille: "paix" },
        { reference: "Philippiens 4:6", texte: "Ne vous inquiétez de rien ; mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de grâces.", famille: "paix" },
        { reference: "Marc 4:39", texte: "S'étant réveillé, il menaça le vent, et dit à la mer : Silence ! tais-toi ! Et le vent cessa, et il y eut un grand calme.", famille: "paix" },
        { reference: "Romains 8:6", texte: "L'affection de la chair, c'est la mort, tandis que l'affection de l'esprit, c'est la vie et la paix.", famille: "paix" },
        { reference: "Hébreux 4:9", texte: "Il y a donc un repos de sabbat réservé au peuple de Dieu.", famille: "paix" },

        // ═══════════════════════════════════════════════════════════════════
        // 💪 FORCE (13 versets)
        // ═══════════════════════════════════════════════════════════════════
        { reference: "Philippiens 4:13", texte: "Je puis tout par celui qui me fortifie.", famille: "force" },
        { reference: "2 Timothée 1:7", texte: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.", famille: "force" },
        { reference: "Éphésiens 6:10", texte: "Au reste, fortifiez-vous dans le Seigneur, et par sa force toute-puissante.", famille: "force" },
        { reference: "1 Corinthiens 16:13", texte: "Veillez, demeurez fermes dans la foi, soyez des hommes, fortifiez-vous.", famille: "force" },
        { reference: "2 Corinthiens 12:9", texte: "Ma grâce te suffit, car ma puissance s'accomplit dans la faiblesse.", famille: "force" },
        { reference: "2 Corinthiens 12:10", texte: "Quand je suis faible, c'est alors que je suis fort.", famille: "force" },
        { reference: "Éphésiens 3:16", texte: "Qu'il vous donne, selon la richesse de sa gloire, d'être puissamment fortifiés par son Esprit dans l'homme intérieur.", famille: "force" },
        { reference: "Colossiens 1:11", texte: "Fortifiés à tous égards par sa puissance glorieuse, en sorte que vous soyez toujours et avec joie persévérants et patients.", famille: "force" },
        { reference: "Hébreux 12:1", texte: "Courons avec persévérance dans la carrière qui nous est ouverte.", famille: "force" },
        { reference: "Hébreux 12:2", texte: "Ayant les regards sur Jésus, le chef et le consommateur de la foi.", famille: "force" },
        { reference: "1 Pierre 5:10", texte: "Le Dieu de toute grâce vous perfectionnera lui-même, vous affermira, vous fortifiera, vous rendra inébranlables.", famille: "force" },
        { reference: "Apocalypse 3:8", texte: "Je connais tes œuvres. Voici, j'ai mis devant toi une porte ouverte, que personne ne peut fermer, car tu as peu de puissance, et tu as gardé ma parole.", famille: "force" },
        { reference: "Actes 1:8", texte: "Vous recevrez une puissance, le Saint Esprit survenant sur vous.", famille: "force" },

        // ═══════════════════════════════════════════════════════════════════
        // ❤️ AMOUR (13 versets)
        // ═══════════════════════════════════════════════════════════════════
        { reference: "Jean 3:16", texte: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.", famille: "amour" },
        { reference: "Romains 8:38-39", texte: "Ni la mort ni la vie, ni les anges ni les dominations, ni le présent ni l'avenir, ni les puissances, ni la hauteur ni la profondeur, ne pourra nous séparer de l'amour de Dieu.", famille: "amour" },
        { reference: "1 Jean 4:19", texte: "Pour nous, nous l'aimons, parce qu'il nous a aimés le premier.", famille: "amour" },
        { reference: "1 Jean 4:16", texte: "Dieu est amour ; et celui qui demeure dans l'amour demeure en Dieu, et Dieu demeure en lui.", famille: "amour" },
        { reference: "1 Jean 4:10", texte: "Cet amour consiste, non point en ce que nous avons aimé Dieu, mais en ce qu'il nous a aimés et a envoyé son Fils.", famille: "amour" },
        { reference: "1 Jean 3:1", texte: "Voyez quel amour le Père nous a témoigné, pour que nous soyons appelés enfants de Dieu ! Et nous le sommes.", famille: "amour" },
        { reference: "Jean 15:9", texte: "Comme le Père m'a aimé, je vous ai aussi aimés. Demeurez dans mon amour.", famille: "amour" },
        { reference: "Jean 15:13", texte: "Il n'y a pas de plus grand amour que de donner sa vie pour ses amis.", famille: "amour" },
        { reference: "Romains 5:8", texte: "Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous.", famille: "amour" },
        { reference: "Galates 2:20", texte: "Ce n'est plus moi qui vis, c'est Christ qui vit en moi ; la vie que je vis maintenant, je la vis dans la foi au Fils de Dieu, qui m'a aimé et qui s'est livré lui-même pour moi.", famille: "amour" },
        { reference: "Éphésiens 3:18-19", texte: "Vous puissiez comprendre quelle est la largeur, la longueur, la profondeur et la hauteur de l'amour de Christ.", famille: "amour" },
        { reference: "1 Corinthiens 13:4", texte: "L'amour est patient, il est plein de bonté ; l'amour n'est point envieux ; l'amour ne se vante point.", famille: "amour" },
        { reference: "1 Corinthiens 13:8", texte: "L'amour ne périt jamais.", famille: "amour" },

        // ═══════════════════════════════════════════════════════════════════
        // ✨ ESPÉRANCE (12 versets)
        // ═══════════════════════════════════════════════════════════════════
        { reference: "Romains 8:28", texte: "Nous savons que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein.", famille: "esperance" },
        { reference: "Romains 15:13", texte: "Que le Dieu de l'espérance vous remplisse de toute joie et de toute paix dans la foi, pour que vous abondiez en espérance.", famille: "esperance" },
        { reference: "Hébreux 10:23", texte: "Retenons fermement la profession de notre espérance, car celui qui a fait la promesse est fidèle.", famille: "esperance" },
        { reference: "Apocalypse 21:4", texte: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur.", famille: "esperance" },
        { reference: "2 Corinthiens 4:17", texte: "Nos légères afflictions du moment présent produisent pour nous un poids éternel de gloire.", famille: "esperance" },
        { reference: "1 Pierre 1:3", texte: "Béni soit Dieu qui, selon sa grande miséricorde, nous a régénérés pour une espérance vivante.", famille: "esperance" },
        { reference: "Romains 5:5", texte: "L'espérance ne trompe point, parce que l'amour de Dieu est répandu dans nos cœurs par le Saint Esprit.", famille: "esperance" },
        { reference: "Tite 2:13", texte: "En attendant la bienheureuse espérance, et la manifestation de la gloire du grand Dieu et de notre Sauveur Jésus Christ.", famille: "esperance" },
        { reference: "1 Thessaloniciens 4:13", texte: "Nous ne voulons pas que vous soyez dans l'ignorance au sujet de ceux qui dorment, afin que vous ne vous affligiez pas comme les autres qui n'ont point d'espérance.", famille: "esperance" },
        { reference: "Hébreux 6:19", texte: "Cette espérance, nous la possédons comme une ancre de l'âme, sûre et solide.", famille: "esperance" },
        { reference: "Jean 14:2-3", texte: "Il y a plusieurs demeures dans la maison de mon Père. Je vais vous préparer une place.", famille: "esperance" },
        { reference: "Apocalypse 22:5", texte: "Il n'y aura plus de nuit ; et ils n'auront besoin ni de lampe ni de lumière, parce que le Seigneur Dieu les éclairera.", famille: "esperance" },

        // ═══════════════════════════════════════════════════════════════════
        // 🙏 CONFIANCE (12 versets)
        // ═══════════════════════════════════════════════════════════════════
        { reference: "Matthieu 6:26", texte: "Regardez les oiseaux du ciel : ils ne sèment ni ne moissonnent, et ils n'amassent rien dans des greniers ; et votre Père céleste les nourrit.", famille: "confiance" },
        { reference: "Matthieu 6:33", texte: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.", famille: "confiance" },
        { reference: "1 Pierre 5:7", texte: "Déchargez-vous sur lui de tous vos soucis, car lui-même prend soin de vous.", famille: "confiance" },
        { reference: "Hébreux 13:6", texte: "C'est avec assurance que nous pouvons dire : Le Seigneur est mon aide, je ne craindrai rien.", famille: "confiance" },
        { reference: "Marc 11:24", texte: "Tout ce que vous demanderez en priant, croyez que vous l'avez reçu, et vous le verrez s'accomplir.", famille: "confiance" },
        { reference: "Matthieu 7:7", texte: "Demandez, et l'on vous donnera ; cherchez, et vous trouverez ; frappez, et l'on vous ouvrira.", famille: "confiance" },
        { reference: "Luc 12:32", texte: "Ne crains point, petit troupeau ; car votre Père a trouvé bon de vous donner le royaume.", famille: "confiance" },
        { reference: "Jean 14:13", texte: "Tout ce que vous demanderez en mon nom, je le ferai, afin que le Père soit glorifié dans le Fils.", famille: "confiance" },
        { reference: "Romains 8:31", texte: "Si Dieu est pour nous, qui sera contre nous ?", famille: "confiance" },
        { reference: "Philippiens 1:6", texte: "Celui qui a commencé en vous cette bonne œuvre la rendra parfaite pour le jour de Jésus Christ.", famille: "confiance" },
        { reference: "2 Timothée 1:12", texte: "Je sais en qui j'ai cru, et je suis persuadé qu'il a la puissance de garder mon dépôt jusqu'à ce jour-là.", famille: "confiance" },
        { reference: "Hébreux 4:16", texte: "Approchons-nous donc avec assurance du trône de la grâce, afin d'obtenir miséricorde.", famille: "confiance" },

        // ═══════════════════════════════════════════════════════════════════
        // 🎉 JOIE (12 versets)
        // ═══════════════════════════════════════════════════════════════════
        { reference: "Jean 15:11", texte: "Je vous ai dit ces choses, afin que ma joie soit en vous, et que votre joie soit parfaite.", famille: "joie" },
        { reference: "Philippiens 4:4", texte: "Réjouissez-vous toujours dans le Seigneur ; je le répète, réjouissez-vous.", famille: "joie" },
        { reference: "Romains 14:17", texte: "Le royaume de Dieu, c'est la justice, la paix et la joie, par le Saint Esprit.", famille: "joie" },
        { reference: "1 Thessaloniciens 5:16", texte: "Soyez toujours joyeux.", famille: "joie" },
        { reference: "1 Thessaloniciens 5:18", texte: "Rendez grâces en toutes choses, car c'est à votre égard la volonté de Dieu en Jésus Christ.", famille: "joie" },
        { reference: "Jacques 1:2", texte: "Mes frères, regardez comme un sujet de joie complète les diverses épreuves auxquelles vous pouvez être exposés.", famille: "joie" },
        { reference: "Jean 16:22", texte: "Je vous reverrai, et votre cœur se réjouira, et nul ne vous ravira votre joie.", famille: "joie" },
        { reference: "Luc 10:20", texte: "Réjouissez-vous de ce que vos noms sont écrits dans les cieux.", famille: "joie" },
        { reference: "Galates 5:22", texte: "Le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la fidélité, la douceur, la maîtrise de soi.", famille: "joie" },
        { reference: "Actes 2:28", texte: "Tu m'as fait connaître les sentiers de la vie, tu me rempliras de joie par ta présence.", famille: "joie" },
        { reference: "Jean 16:24", texte: "Demandez, et vous recevrez, afin que votre joie soit parfaite.", famille: "joie" },
        { reference: "Luc 15:10", texte: "Il y a de la joie devant les anges de Dieu pour un seul pécheur qui se repent.", famille: "joie" },

        // ═══════════════════════════════════════════════════════════════════
        // 💡 SAGESSE (12 versets)
        // ═══════════════════════════════════════════════════════════════════
        { reference: "Jacques 1:5", texte: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée.", famille: "sagesse" },
        { reference: "Colossiens 3:16", texte: "Que la parole de Christ habite parmi vous abondamment ; instruisez-vous les uns les autres en toute sagesse.", famille: "sagesse" },
        { reference: "Éphésiens 1:17", texte: "Que le Dieu de notre Seigneur Jésus Christ vous donne un esprit de sagesse et de révélation.", famille: "sagesse" },
        { reference: "Jean 16:13", texte: "Quand le consolateur sera venu, l'Esprit de vérité, il vous conduira dans toute la vérité.", famille: "sagesse" },
        { reference: "Jean 8:32", texte: "Vous connaîtrez la vérité, et la vérité vous affranchira.", famille: "sagesse" },
        { reference: "Matthieu 7:24", texte: "Quiconque entend ces paroles que je dis et les met en pratique, sera semblable à un homme prudent qui a bâti sa maison sur le roc.", famille: "sagesse" },
        { reference: "Jacques 3:17", texte: "La sagesse d'en haut est premièrement pure, ensuite pacifique, modérée, conciliante, pleine de miséricorde et de bons fruits.", famille: "sagesse" },
        { reference: "Colossiens 1:9", texte: "Que vous soyez remplis de la connaissance de sa volonté, en toute sagesse et intelligence spirituelle.", famille: "sagesse" },
        { reference: "1 Corinthiens 2:12", texte: "Nous avons reçu, non l'esprit du monde, mais l'Esprit qui vient de Dieu, afin que nous connaissions les choses que Dieu nous a données par sa grâce.", famille: "sagesse" },
        { reference: "Jean 14:26", texte: "Le consolateur, l'Esprit Saint, que le Père enverra en mon nom, vous enseignera toutes choses.", famille: "sagesse" },
        { reference: "Romains 12:2", texte: "Soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu.", famille: "sagesse" },
        { reference: "Éphésiens 5:15-16", texte: "Prenez donc garde de vous conduire avec circonspection, non comme des insensés, mais comme des sages ; rachetez le temps, car les jours sont mauvais.", famille: "sagesse" },

        // ═══════════════════════════════════════════════════════════════════
        // 💜 RÉCONFORT (13 versets)
        // ═══════════════════════════════════════════════════════════════════
        { reference: "2 Corinthiens 1:3-4", texte: "Béni soit Dieu, le Père des miséricordes et le Dieu de toute consolation, qui nous console dans toutes nos afflictions.", famille: "reconfort" },
        { reference: "Matthieu 5:4", texte: "Heureux les affligés, car ils seront consolés !", famille: "reconfort" },
        { reference: "Jean 14:18", texte: "Je ne vous laisserai pas orphelins, je viendrai à vous.", famille: "reconfort" },
        { reference: "Jean 14:16", texte: "Je prierai le Père, et il vous donnera un autre consolateur, afin qu'il demeure éternellement avec vous.", famille: "reconfort" },
        { reference: "Matthieu 28:20", texte: "Et voici, je suis avec vous tous les jours, jusqu'à la fin du monde.", famille: "reconfort" },
        { reference: "Apocalypse 7:17", texte: "L'agneau les conduira aux sources des eaux de la vie, et Dieu essuiera toute larme de leurs yeux.", famille: "reconfort" },
        { reference: "2 Corinthiens 4:8-9", texte: "Nous sommes pressés de toute manière, mais non réduits à l'extrémité ; dans la détresse, mais non dans le désespoir.", famille: "reconfort" },
        { reference: "Romains 8:18", texte: "J'estime que les souffrances du temps présent ne sauraient être comparées à la gloire à venir.", famille: "reconfort" },
        { reference: "2 Thessaloniciens 2:16-17", texte: "Que notre Seigneur Jésus Christ lui-même, et Dieu notre Père, qui nous a aimés, console vos cœurs.", famille: "reconfort" },
        { reference: "Jean 11:25", texte: "Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort.", famille: "reconfort" },
        { reference: "Matthieu 11:28", texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.", famille: "reconfort" },
        { reference: "Luc 4:18", texte: "L'Esprit du Seigneur est sur moi, parce qu'il m'a oint pour annoncer une bonne nouvelle aux pauvres ; il m'a envoyé pour guérir ceux qui ont le cœur brisé.", famille: "reconfort" },
        { reference: "Hébreux 13:5", texte: "Je ne te délaisserai point, et je ne t'abandonnerai point.", famille: "reconfort" }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // MESSAGES D'ACCOMPAGNEMENT
    // ═══════════════════════════════════════════════════════════════════════

    messages: {
        accueil: {
            titre: "Un moment pour toi",
            sousTitre: "Prends quelques instants...",
            texte: "Le Seigneur a une parole spécialement pour toi aujourd'hui. Réponds à ces 5 questions avec ton cœur.",
            bouton: "Je suis prêt(e)"
        },
        transition: "Le Seigneur prépare une parole pour toi...",
        revelation: "Aujourd'hui, cette parole est pour toi...",
        priereIntro: "Pour aller plus loin dans la prière :"
    }
};

// Rendre accessible globalement
window.VersetsSpeciaux = VersetsSpeciaux;
