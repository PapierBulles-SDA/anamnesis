/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Collection de prières
 * ═══════════════════════════════════════════════════════════════════════════
 */

const PrieresData = {
    // ═══════════════════════════════════════════════════════════════════════
    // PRIÈRES PRINCIPALES
    // ═══════════════════════════════════════════════════════════════════════
    collection: [
        {
            id: "notre-pere",
            titre: "Notre Père",
            categorie: "Essentielles",
            icone: "✝️",
            origine: "Enseignée par Jésus lui-même à ses disciples (Matthieu 6, 9-13)",
            texte: `Notre Père, qui es aux cieux,
que ton nom soit sanctifié,
que ton règne vienne,
que ta volonté soit faite sur la terre comme au ciel.
Donne-nous aujourd'hui notre pain de ce jour.
Pardonne-nous nos offenses,
comme nous pardonnons aussi à ceux qui nous ont offensés.
Et ne nous laisse pas entrer en tentation,
mais délivre-nous du Mal.
Amen.`
        },
        {
            id: "je-vous-salue",
            titre: "Je vous salue Marie",
            categorie: "Essentielles",
            icone: "🌹",
            origine: "Composée à partir de la salutation de l'ange Gabriel (Luc 1, 28) et d'Élisabeth (Luc 1, 42)",
            texte: `Je vous salue, Marie, pleine de grâce,
le Seigneur est avec vous.
Vous êtes bénie entre toutes les femmes,
et Jésus, le fruit de vos entrailles, est béni.

Sainte Marie, Mère de Dieu,
priez pour nous, pauvres pécheurs,
maintenant et à l'heure de notre mort.
Amen.`
        },
        {
            id: "gloire-au-pere",
            titre: "Gloire au Père",
            categorie: "Essentielles",
            icone: "✨",
            origine: "Doxologie trinitaire utilisée depuis les premiers siècles de l'Église",
            texte: `Gloire au Père,
et au Fils,
et au Saint-Esprit.

Comme il était au commencement,
maintenant et toujours,
pour les siècles des siècles.
Amen.`
        },
        {
            id: "credo",
            titre: "Je crois en Dieu",
            categorie: "Essentielles",
            icone: "⛪",
            origine: "Symbole des Apôtres, synthèse de la foi chrétienne (IIe siècle)",
            texte: `Je crois en Dieu, le Père tout-puissant,
Créateur du ciel et de la terre.

Et en Jésus Christ, son Fils unique, notre Seigneur,
qui a été conçu du Saint-Esprit,
est né de la Vierge Marie,
a souffert sous Ponce Pilate,
a été crucifié, est mort et a été enseveli,
est descendu aux enfers,
le troisième jour est ressuscité des morts,
est monté aux cieux,
est assis à la droite de Dieu le Père tout-puissant,
d'où il viendra juger les vivants et les morts.

Je crois en l'Esprit Saint,
à la sainte Église catholique,
à la communion des saints,
à la rémission des péchés,
à la résurrection de la chair,
à la vie éternelle.
Amen.`
        },
        {
            id: "esprit-saint",
            titre: "Viens, Esprit Saint",
            categorie: "Esprit Saint",
            icone: "🕊️",
            origine: "Séquence de Pentecôte, attribuée à Étienne Langton (XIIIe siècle)",
            texte: `Viens, Esprit Saint, emplis le cœur de tes fidèles,
et allume en eux le feu de ton amour.
Envoie ton Esprit et tout sera créé,
et tu renouvelleras la face de la terre.

Ô Dieu, qui as instruit les cœurs des fidèles
par la lumière du Saint-Esprit,
donne-nous, par ce même Esprit,
de goûter ce qui est bien
et de jouir sans cesse de sa consolation.
Par Jésus, le Christ, notre Seigneur.
Amen.`
        },
        {
            id: "saint-francois",
            titre: "Prière de Saint François",
            categorie: "Saints",
            icone: "🐦",
            origine: "Attribuée à Saint François d'Assise (XIIIe siècle), prière pour la paix",
            texte: `Seigneur, fais de moi un instrument de ta paix.
Là où il y a de la haine, que je mette l'amour.
Là où il y a l'offense, que je mette le pardon.
Là où il y a la discorde, que je mette l'union.
Là où il y a l'erreur, que je mette la vérité.
Là où il y a le doute, que je mette la foi.
Là où il y a le désespoir, que je mette l'espérance.
Là où il y a les ténèbres, que je mette ta lumière.
Là où il y a la tristesse, que je mette la joie.

Ô Maître, que je ne cherche pas tant
à être consolé qu'à consoler,
à être compris qu'à comprendre,
à être aimé qu'à aimer.

Car c'est en donnant qu'on reçoit,
c'est en s'oubliant qu'on trouve,
c'est en pardonnant qu'on est pardonné,
c'est en mourant qu'on ressuscite à l'éternelle vie.
Amen.`
        },
        {
            id: "acte-contrition",
            titre: "Acte de contrition",
            categorie: "Pénitence",
            icone: "💜",
            origine: "Prière de repentance préparant au sacrement de réconciliation",
            texte: `Mon Dieu, j'ai un très grand regret de t'avoir offensé,
parce que tu es infiniment bon, infiniment aimable,
et que le péché te déplaît.

Je prends la ferme résolution,
avec le secours de ta sainte grâce,
de ne plus t'offenser
et de faire pénitence.
Amen.`
        },
        {
            id: "magnificat",
            titre: "Magnificat",
            categorie: "Marie",
            icone: "👑",
            origine: "Cantique de Marie lors de la Visitation (Luc 1, 46-55)",
            texte: `Mon âme exalte le Seigneur,
exulte mon esprit en Dieu, mon Sauveur !

Il s'est penché sur son humble servante ;
désormais, tous les âges me diront bienheureuse.

Le Puissant fit pour moi des merveilles ;
Saint est son nom !

Sa miséricorde s'étend d'âge en âge
sur ceux qui le craignent.

Déployant la force de son bras,
il disperse les superbes.

Il renverse les puissants de leurs trônes,
il élève les humbles.

Il comble de biens les affamés,
renvoie les riches les mains vides.

Il relève Israël, son serviteur,
il se souvient de son amour,

de la promesse faite à nos pères,
en faveur d'Abraham et de sa race, à jamais.

Gloire au Père, et au Fils, et au Saint-Esprit,
pour les siècles des siècles.
Amen.`
        },
        {
            id: "angelus",
            titre: "Angélus",
            categorie: "Marie",
            icone: "🔔",
            origine: "Prière traditionnelle récitée trois fois par jour (6h, 12h, 18h)",
            texte: `V. L'ange du Seigneur apporta l'annonce à Marie.
R. Et elle conçut du Saint-Esprit.

Je vous salue, Marie...

V. Voici la servante du Seigneur.
R. Qu'il me soit fait selon ta parole.

Je vous salue, Marie...

V. Et le Verbe s'est fait chair.
R. Et il a habité parmi nous.

Je vous salue, Marie...

V. Priez pour nous, sainte Mère de Dieu.
R. Afin que nous devenions dignes des promesses du Christ.

Prions :
Que ta grâce, Seigneur notre Père,
se répande en nos cœurs.
Par le message de l'ange,
tu nous as fait connaître l'incarnation de ton Fils bien-aimé ;
conduis-nous, par sa passion et par sa croix,
jusqu'à la gloire de la résurrection.
Par Jésus, le Christ, notre Seigneur.
Amen.`
        },
        {
            id: "ame-du-christ",
            titre: "Âme du Christ",
            categorie: "Eucharistie",
            icone: "🍞",
            origine: "Anima Christi, prière médiévale (XIVe siècle), chère à Saint Ignace de Loyola",
            texte: `Âme du Christ, sanctifie-moi.
Corps du Christ, sauve-moi.
Sang du Christ, enivre-moi.
Eau du côté du Christ, lave-moi.

Passion du Christ, fortifie-moi.
Ô bon Jésus, exauce-moi.
Dans tes blessures, cache-moi.
Ne permets pas que je sois séparé de toi.

De l'ennemi malin, défends-moi.
À l'heure de ma mort, appelle-moi.
Ordonne-moi de venir à toi,
pour qu'avec tes saints je te loue
dans les siècles des siècles.
Amen.`
        },
        {
            id: "memorare",
            titre: "Souvenez-vous",
            categorie: "Marie",
            icone: "💙",
            origine: "Memorare, attribuée à Saint Bernard de Clairvaux (XIIe siècle)",
            texte: `Souvenez-vous, ô très miséricordieuse Vierge Marie,
qu'on n'a jamais entendu dire
qu'aucun de ceux qui ont eu recours à votre protection,
imploré votre assistance et réclamé votre secours,
ait été abandonné.

Animé d'une pareille confiance,
ô Vierge des vierges, ô ma Mère,
je viens à vous et, gémissant sous le poids de mes péchés,
je me prosterne à vos pieds.

Ô Mère du Verbe incarné,
ne méprisez pas mes prières,
mais écoutez-les favorablement et daignez les exaucer.
Amen.`
        },
        {
            id: "psaume-22",
            titre: "Psaume 22 (23)",
            categorie: "Psaumes",
            icone: "🐑",
            origine: "Psaume de David, le plus connu et aimé des Psaumes",
            texte: `Le Seigneur est mon berger : je ne manque de rien.
Sur des prés d'herbe fraîche, il me fait reposer.

Il me mène vers les eaux tranquilles
et me fait revivre ;
il me conduit par le juste chemin
pour l'honneur de son nom.

Si je traverse les ravins de la mort,
je ne crains aucun mal,
car tu es avec moi,
ton bâton me guide et me rassure.

Tu prépares la table pour moi
devant mes ennemis ;
tu répands le parfum sur ma tête,
ma coupe est débordante.

Grâce et bonheur m'accompagnent
tous les jours de ma vie ;
j'habiterai la maison du Seigneur
pour la durée de mes jours.`
        },
        {
            id: "psaume-50",
            titre: "Psaume 50 (51) - Miserere",
            categorie: "Psaumes",
            icone: "💧",
            origine: "Psaume de pénitence de David après son péché avec Bethsabée",
            texte: `Pitié pour moi, mon Dieu, dans ton amour,
selon ta grande miséricorde, efface mon péché.
Lave-moi tout entier de ma faute,
purifie-moi de mon offense.

Oui, je connais mon péché,
ma faute est toujours devant moi.
Contre toi, et toi seul, j'ai péché,
ce qui est mal à tes yeux, je l'ai fait.

Crée en moi un cœur pur, ô mon Dieu,
renouvelle et raffermis au fond de moi mon esprit.
Ne me chasse pas loin de ta face,
ne me reprends pas ton esprit saint.

Rends-moi la joie d'être sauvé ;
que l'esprit généreux me soutienne.
Seigneur, ouvre mes lèvres,
et ma bouche annoncera ta louange.`
        },
        {
            id: "salve-regina",
            titre: "Salve Regina",
            categorie: "Marie",
            icone: "🌟",
            origine: "Antienne mariale chantée depuis le XIe siècle",
            texte: `Salut, ô Reine, Mère de miséricorde,
notre vie, notre douceur, notre espérance, salut !

Enfants d'Ève, exilés, nous crions vers vous.
Vers vous nous soupirons, gémissant et pleurant
dans cette vallée de larmes.

Ô vous, notre avocate,
tournez vers nous vos regards miséricordieux,
et après cet exil,
montrez-nous Jésus, le fruit béni de vos entrailles.

Ô clémente, ô miséricordieuse, ô douce Vierge Marie.
Amen.`
        },
        {
            id: "priere-matin",
            titre: "Prière du matin",
            categorie: "Quotidien",
            icone: "🌅",
            origine: "Prière traditionnelle pour offrir sa journée à Dieu",
            texte: `Mon Dieu, je vous offre toutes les actions
que je vais faire aujourd'hui.
Je veux tout faire pour votre gloire
et pour le salut de mon âme.

Bénissez-moi, mon Dieu,
ainsi que tous ceux que j'aime.
Donnez-nous la force d'accomplir votre volonté
et préservez-nous du péché.

Je remets cette journée entre vos mains,
qu'elle soit un chant d'amour pour vous.
Amen.`
        },
        {
            id: "priere-soir",
            titre: "Prière du soir",
            categorie: "Quotidien",
            icone: "🌙",
            origine: "Prière traditionnelle de fin de journée",
            texte: `Seigneur, au terme de cette journée,
je viens te remercier pour tous tes bienfaits.

Pardonne-moi les fautes que j'ai commises,
les occasions manquées de faire le bien,
les paroles qui ont pu blesser.

Bénis ceux que j'ai rencontrés,
ceux qui m'ont fait du bien,
ceux qui souffrent en ce moment.

Je te confie ma nuit,
veille sur moi et sur ceux que j'aime.
Que ton ange me garde dans la paix.
Amen.`
        },
        // ═══════════════════════════════════════════════════════════════════
        // NOUVELLES PRIÈRES
        // ═══════════════════════════════════════════════════════════════════
        {
            id: "abandon-foucauld",
            titre: "Prière d'abandon",
            categorie: "Saints",
            icone: "🙇",
            origine: "Charles de Foucauld (1858-1916), canonisé en 2022",
            texte: `Mon Père, je m'abandonne à toi.
Fais de moi ce qu'il te plaira.
Quoi que tu fasses de moi, je te remercie.
Je suis prêt à tout, j'accepte tout.

Pourvu que ta volonté se fasse en moi,
en toutes tes créatures,
je ne désire rien d'autre, mon Dieu.

Je remets mon âme entre tes mains.
Je te la donne, mon Dieu,
avec tout l'amour de mon cœur,
parce que je t'aime,
et que ce m'est un besoin d'amour de me donner,
de me remettre entre tes mains sans mesure,
avec une infinie confiance,
car tu es mon Père.
Amen.`
        },
        {
            id: "therese-avila",
            titre: "Que rien ne te trouble",
            categorie: "Saints",
            icone: "🏰",
            origine: "Sainte Thérèse d'Avila (1515-1582), Docteur de l'Église",
            texte: `Que rien ne te trouble,
que rien ne t'épouvante.
Tout passe,
Dieu ne change pas.

La patience obtient tout.
Celui qui possède Dieu
ne manque de rien.
Dieu seul suffit.

Élève ta pensée,
monte au ciel,
ne t'angoisse de rien.
Que rien ne te trouble.

Suis Jésus Christ
d'un grand cœur,
et quoi qu'il arrive,
que rien ne t'épouvante.

Tu vois la gloire du monde ?
C'est une vaine gloire.
Il n'a rien de stable,
tout passe.

Aspire au céleste,
qui dure toujours.
Fidèle et riche en promesses,
Dieu ne change pas.

Aime-le comme il le mérite,
Bonté immense.
Mais il n'y a pas d'amour de qualité
sans la patience.

Que la confiance et la foi vive
maintiennent l'âme,
celui qui croit et espère
obtient tout.

Même s'il se voit assiégé par l'enfer,
il déjouera ses faveurs,
celui qui possède Dieu
ne manque de rien.

Que viennent croix, malheurs et peines :
si Dieu est ton trésor,
tu les dépasseras,
Dieu seul suffit.
Amen.`
        },
        {
            id: "te-deum",
            titre: "Te Deum",
            categorie: "Essentielles",
            icone: "🎺",
            origine: "Hymne de louange du IVe siècle, attribué à saint Ambroise et saint Augustin",
            texte: `À toi Dieu, notre louange !
Nous t'acclamons, tu es Seigneur !
À toi Père éternel,
l'hymne de l'univers.

Devant toi se prosternent les archanges,
les anges et les esprits des cieux ;
ils te rendent grâce ;
ils adorent et ils chantent :

Saint, Saint, Saint, le Seigneur,
Dieu de l'univers ;
le ciel et la terre sont remplis de ta gloire.

C'est toi que les Apôtres glorifient,
toi que proclament les prophètes,
toi dont témoignent les martyrs ;
c'est toi que par le monde entier
l'Église accueille et chante,
Père infiniment saint.

Ton Fils unique et véritable,
et le Saint-Esprit consolateur.

Ô Christ, tu es le Roi de gloire,
le Fils éternel du Père.
Prenant chair de la Vierge,
tu n'as pas craint de te faire homme
pour libérer l'humanité.

Par ta victoire sur la mort,
tu as ouvert à tout croyant
les portes du Royaume ;
tu sièges à la droite du Père ;
tu viendras pour le jugement.

Montre-toi le défenseur de tes serviteurs
rachetés par ton sang précieux.
Prends-les avec tous les saints
dans ta joie et dans ta lumière.
Amen.`
        },
        {
            id: "sub-tuum",
            titre: "Sous l'abri de ta miséricorde",
            categorie: "Marie",
            icone: "🛡️",
            origine: "Plus ancienne prière à Marie connue (IIIe siècle, Égypte)",
            texte: `Sous l'abri de ta miséricorde,
nous nous réfugions, Sainte Mère de Dieu.
Ne méprise pas nos prières
quand nous sommes dans l'épreuve,
mais de tous les dangers
délivre-nous toujours,
Vierge glorieuse et bénie.
Amen.`
        },
        {
            id: "nunc-dimittis",
            titre: "Cantique de Siméon",
            categorie: "Quotidien",
            icone: "🌠",
            origine: "Prière de Siméon au Temple (Luc 2, 29-32), traditionnellement récitée le soir",
            texte: `Maintenant, ô Maître souverain,
tu peux laisser ton serviteur s'en aller
en paix, selon ta parole.

Car mes yeux ont vu le salut
que tu préparais à la face des peuples :
lumière qui se révèle aux nations
et donne gloire à ton peuple Israël.

Gloire au Père, et au Fils, et au Saint-Esprit,
pour les siècles des siècles.
Amen.`
        },
        {
            id: "psaume-91",
            titre: "Psaume 91 - Protection divine",
            categorie: "Psaumes",
            icone: "🦅",
            origine: "Psaume de confiance en la protection de Dieu",
            texte: `Quand je me tiens sous l'abri du Très-Haut
et repose à l'ombre du Puissant,
je dis au Seigneur : « Mon refuge,
mon rempart, mon Dieu, dont je suis sûr ! »

C'est lui qui te sauve des filets du chasseur
et de la peste maléfique ;
il te couvre et te protège.
Tu trouves sous son aile un refuge.

Tu ne craindras ni les terreurs de la nuit,
ni la flèche qui vole au grand jour,
ni la peste qui rôde dans le noir,
ni le fléau qui frappe à midi.

Qu'il en tombe mille à tes côtés,
qu'il en tombe dix mille à ta droite,
toi, tu restes hors d'atteinte.

Le malheur ne pourra te toucher,
ni le danger, approcher de ta demeure :
il donne mission à ses anges
de te garder sur tous tes chemins.

Ils te porteront sur leurs mains
pour que ton pied ne heurte les pierres ;
tu marcheras sur la vipère et le scorpion,
tu écraseras le lion et le Dragon.

« Puisqu'il s'attache à moi, je le délivre ;
je le défends, car il connaît mon nom.
Il m'appelle, et moi, je lui réponds ;
je suis avec lui dans son épreuve.

Je veux le libérer, le glorifier ;
de longs jours, je veux le rassasier,
et je ferai qu'il voie mon salut. »`
        },
        {
            id: "benedicite",
            titre: "Bénédicité",
            categorie: "Quotidien",
            icone: "🍞",
            origine: "Prière traditionnelle avant le repas",
            texte: `Bénis-nous, Seigneur,
bénis ce repas,
ceux qui l'ont préparé,
et procure du pain
à ceux qui n'en ont pas.
Amen.`
        },
        {
            id: "action-graces",
            titre: "Action de grâces",
            categorie: "Quotidien",
            icone: "🙌",
            origine: "Prière traditionnelle après le repas",
            texte: `Nous te rendons grâce pour tous tes bienfaits,
Dieu tout-puissant, qui vis et règnes
pour les siècles des siècles.
Amen.

Et que les âmes des fidèles défunts,
par la miséricorde de Dieu,
reposent en paix.
Amen.`
        },
        {
            id: "acte-foi",
            titre: "Acte de Foi",
            categorie: "Essentielles",
            icone: "💎",
            origine: "Prière des vertus théologales",
            texte: `Mon Dieu, je crois fermement
toutes les vérités que tu nous as révélées
et que tu nous enseignes par ton Église,
parce que tu ne peux ni te tromper
ni nous tromper.
Amen.`
        },
        {
            id: "acte-charite",
            titre: "Acte de Charité",
            categorie: "Essentielles",
            icone: "❤️‍🔥",
            origine: "Prière des vertus théologales",
            texte: `Mon Dieu, je t'aime de tout mon cœur
et par-dessus toutes choses,
parce que tu es infiniment bon
et infiniment aimable.

J'aime mon prochain comme moi-même
pour l'amour de toi.
Amen.`
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // MYSTÈRES DU ROSAIRE
    // ═══════════════════════════════════════════════════════════════════════
    mysteres: {
        joyeux: {
            nom: "Mystères Joyeux",
            jour: "Lundi et Samedi",
            couleur: "#f1c40f",
            liste: [
                { titre: "L'Annonciation", verset: "Luc 1, 26-38", meditation: "L'ange Gabriel annonce à Marie qu'elle sera la mère du Sauveur." },
                { titre: "La Visitation", verset: "Luc 1, 39-56", meditation: "Marie rend visite à sa cousine Élisabeth, portant Jésus en son sein." },
                { titre: "La Nativité", verset: "Luc 2, 1-20", meditation: "Jésus naît à Bethléem dans la pauvreté d'une étable." },
                { titre: "La Présentation au Temple", verset: "Luc 2, 22-38", meditation: "Marie et Joseph présentent Jésus au Temple selon la Loi." },
                { titre: "Le Recouvrement au Temple", verset: "Luc 2, 41-52", meditation: "Jésus, à 12 ans, est retrouvé enseignant au Temple." }
            ]
        },
        lumineux: {
            nom: "Mystères Lumineux",
            jour: "Jeudi",
            couleur: "#3498db",
            liste: [
                { titre: "Le Baptême au Jourdain", verset: "Matthieu 3, 13-17", meditation: "Jésus est baptisé par Jean et l'Esprit descend sur lui." },
                { titre: "Les Noces de Cana", verset: "Jean 2, 1-12", meditation: "Jésus accomplit son premier miracle à la demande de Marie." },
                { titre: "L'Annonce du Royaume", verset: "Marc 1, 14-15", meditation: "Jésus proclame le Royaume et appelle à la conversion." },
                { titre: "La Transfiguration", verset: "Matthieu 17, 1-8", meditation: "Jésus révèle sa gloire divine sur la montagne." },
                { titre: "L'Institution de l'Eucharistie", verset: "Luc 22, 14-20", meditation: "Jésus donne son Corps et son Sang à la dernière Cène." }
            ]
        },
        douloureux: {
            nom: "Mystères Douloureux",
            jour: "Mardi et Vendredi",
            couleur: "#9b59b6",
            liste: [
                { titre: "L'Agonie à Gethsémani", verset: "Luc 22, 39-46", meditation: "Jésus prie et accepte la volonté du Père dans l'angoisse." },
                { titre: "La Flagellation", verset: "Jean 19, 1", meditation: "Jésus est attaché et flagellé par les soldats." },
                { titre: "Le Couronnement d'épines", verset: "Matthieu 27, 27-31", meditation: "Les soldats couronnent Jésus d'épines et se moquent de lui." },
                { titre: "Le Portement de Croix", verset: "Jean 19, 17", meditation: "Jésus porte sa croix jusqu'au Calvaire." },
                { titre: "La Crucifixion", verset: "Luc 23, 33-46", meditation: "Jésus meurt sur la croix pour le salut du monde." }
            ]
        },
        glorieux: {
            nom: "Mystères Glorieux",
            jour: "Mercredi et Dimanche",
            couleur: "#e74c3c",
            liste: [
                { titre: "La Résurrection", verset: "Matthieu 28, 1-10", meditation: "Jésus ressuscite, vainqueur de la mort." },
                { titre: "L'Ascension", verset: "Actes 1, 6-11", meditation: "Jésus monte au ciel et siège à la droite du Père." },
                { titre: "La Pentecôte", verset: "Actes 2, 1-13", meditation: "L'Esprit Saint descend sur les Apôtres." },
                { titre: "L'Assomption", verset: "Apocalypse 12, 1", meditation: "Marie est élevée au ciel, corps et âme." },
                { titre: "Le Couronnement de Marie", verset: "Apocalypse 12, 1", meditation: "Marie est couronnée Reine du Ciel et de la Terre." }
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CATÉGORIES
    // ═══════════════════════════════════════════════════════════════════════
    categories: [
        { id: "Essentielles", icone: "✝️", couleur: "#667eea" },
        { id: "Marie", icone: "🌹", couleur: "#e91e63" },
        { id: "Psaumes", icone: "📜", couleur: "#ff9800" },
        { id: "Saints", icone: "⭐", couleur: "#4caf50" },
        { id: "Esprit Saint", icone: "🕊️", couleur: "#00bcd4" },
        { id: "Pénitence", icone: "💜", couleur: "#9c27b0" },
        { id: "Eucharistie", icone: "🍞", couleur: "#795548" },
        { id: "Quotidien", icone: "🌅", couleur: "#607d8b" }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // ÉTAPES LECTIO DIVINA
    // ═══════════════════════════════════════════════════════════════════════
    lectioDivina: [
        {
            etape: "Lectio",
            titre: "Lecture",
            icone: "📖",
            duree: 180,
            instruction: "Lis lentement le texte, plusieurs fois si nécessaire. Laisse les mots résonner en toi.",
            couleur: "#4a90d9"
        },
        {
            etape: "Meditatio",
            titre: "Méditation",
            icone: "💭",
            duree: 300,
            instruction: "Quel mot, quelle phrase te touche particulièrement ? Médite, laisse le texte parler à ton cœur.",
            couleur: "#9b59b6"
        },
        {
            etape: "Oratio",
            titre: "Prière",
            icone: "🙏",
            duree: 300,
            instruction: "Réponds à Dieu. Que veux-tu lui dire ? Parle-lui simplement, du fond du cœur.",
            couleur: "#e67e22"
        },
        {
            etape: "Contemplatio",
            titre: "Contemplation",
            icone: "☁️",
            duree: 300,
            instruction: "Reste en silence, en présence de Dieu. Ne cherche pas à penser, juste être là, avec Lui.",
            couleur: "#2ecc71"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // CATÉGORIES D'INTENTIONS
    // ═══════════════════════════════════════════════════════════════════════
    intentionCategories: [
        { id: "famille", nom: "Famille", icone: "👨‍👩‍👧" },
        { id: "sante", nom: "Santé", icone: "🏥" },
        { id: "travail", nom: "Travail", icone: "💼" },
        { id: "monde", nom: "Monde", icone: "🌍" },
        { id: "gratitude", nom: "Gratitude", icone: "🙏" },
        { id: "autre", nom: "Autre", icone: "💝" }
    ]
};

// Rendre accessible globalement
window.PrieresData = PrieresData;
