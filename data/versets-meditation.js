/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Versets pour la Méditation
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Versets forts, compréhensibles seuls, adaptés à chaque période liturgique.
 * Louis Segond 1910 (libre de droits)
 */

const VersetsMeditation = {

    // ═══════════════════════════════════════════════════════════════════════
    // DÉTECTION DE LA PÉRIODE LITURGIQUE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Calculer la date de Pâques (algorithme de Meeus/Jones/Butcher)
     */
    calculerPaques(annee) {
        const a = annee % 19;
        const b = Math.floor(annee / 100);
        const c = annee % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const mois = Math.floor((h + l - 7 * m + 114) / 31);
        const jour = ((h + l - 7 * m + 114) % 31) + 1;
        return new Date(annee, mois - 1, jour);
    },

    /**
     * Obtenir la période liturgique actuelle
     */
    getPeriodeLiturgique(date = new Date()) {
        const annee = date.getFullYear();
        const mois = date.getMonth(); // 0-11
        const jour = date.getDate();
        
        // Dates fixes
        const paques = this.calculerPaques(annee);
        const mercrediCendres = new Date(paques);
        mercrediCendres.setDate(paques.getDate() - 46);
        
        const rameaux = new Date(paques);
        rameaux.setDate(paques.getDate() - 7);
        
        const pentecote = new Date(paques);
        pentecote.setDate(paques.getDate() + 49);
        
        // Avent : 4 dimanches avant Noël (environ 3 semaines avant le 25 déc)
        const noel = new Date(annee, 11, 25);
        const premierDimancheAvent = new Date(annee, 11, 25);
        // Trouver le 4ème dimanche avant Noël
        const jourNoel = noel.getDay(); // 0 = dimanche
        const joursAvantPremierDimanche = (jourNoel === 0) ? 7 : jourNoel;
        premierDimancheAvent.setDate(25 - joursAvantPremierDimanche - 21);
        
        // Baptême du Seigneur (dimanche après le 6 janvier, ou le 7 si le 6 est dimanche)
        let bapteme = new Date(annee, 0, 6);
        if (bapteme.getDay() === 0) {
            bapteme.setDate(7);
        } else {
            bapteme.setDate(6 + (7 - bapteme.getDay()));
        }

        // Comparer les dates
        const dateNum = date.getTime();

        // Toussaint : 25 octobre - 2 novembre
        if (mois === 9 && jour >= 25 || mois === 10 && jour <= 2) {
            return 'toussaint';
        }

        // Avent
        if (date >= premierDimancheAvent && mois === 11 && jour < 25) {
            return 'avent';
        }

        // Noël : 25 décembre - Baptême du Seigneur
        if ((mois === 11 && jour >= 25) || (mois === 0 && date <= bapteme)) {
            return 'noel';
        }

        // Carême (Mercredi des Cendres jusqu'aux Rameaux exclus)
        if (date >= mercrediCendres && date < rameaux) {
            return 'careme';
        }

        // Semaine Sainte (Rameaux jusqu'à Pâques exclus)
        if (date >= rameaux && date < paques) {
            return 'semaineSainte';
        }

        // Temps Pascal (Pâques jusqu'à Pentecôte inclus)
        if (date >= paques && date <= pentecote) {
            // Pentecôte même
            if (date.getDate() === pentecote.getDate() && 
                date.getMonth() === pentecote.getMonth()) {
                return 'pentecote';
            }
            return 'paques';
        }

        // Temps Ordinaire
        return 'ordinaire';
    },

    /**
     * Obtenir les infos de la période
     */
    getInfoPeriode(periode) {
        const infos = {
            avent: {
                nom: 'Temps de l\'Avent',
                icone: '🕯️',
                couleur: '#6B5B95',
                description: 'Préparons nos cœurs à accueillir le Sauveur'
            },
            noel: {
                nom: 'Temps de Noël',
                icone: '⭐',
                couleur: '#FFD700',
                description: 'Le Verbe s\'est fait chair et il a habité parmi nous'
            },
            careme: {
                nom: 'Temps du Carême',
                icone: '🏜️',
                couleur: '#8B4513',
                description: 'Quarante jours pour revenir au Seigneur'
            },
            semaineSainte: {
                nom: 'Semaine Sainte',
                icone: '✝️',
                couleur: '#800020',
                description: 'Contemplons le mystère de la Passion'
            },
            paques: {
                nom: 'Temps Pascal',
                icone: '🌅',
                couleur: '#FFD700',
                description: 'Christ est ressuscité, Alléluia !'
            },
            pentecote: {
                nom: 'Pentecôte',
                icone: '🔥',
                couleur: '#FF4500',
                description: 'L\'Esprit Saint descend sur les Apôtres'
            },
            toussaint: {
                nom: 'Toussaint',
                icone: '👑',
                couleur: '#FFFFFF',
                description: 'Fêtons tous les saints et prions pour nos défunts'
            },
            ordinaire: {
                nom: 'Temps Ordinaire',
                icone: '🌿',
                couleur: '#228B22',
                description: 'Marcher chaque jour avec le Christ'
            }
        };
        return infos[periode] || infos.ordinaire;
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VERSETS PAR PÉRIODE
    // ═══════════════════════════════════════════════════════════════════════

    versets: {
        // ═══════════════════════════════════════════════════════════════════
        // AVENT - Attente, promesse, venue du Messie
        // ═══════════════════════════════════════════════════════════════════
        avent: [
            { reference: "Matthieu 1:23", text: "Voici, la vierge sera enceinte, elle enfantera un fils, et on lui donnera le nom d'Emmanuel, ce qui signifie Dieu avec nous." },
            { reference: "Luc 1:37", text: "Car rien n'est impossible à Dieu." },
            { reference: "Luc 1:46-47", text: "Mon âme exalte le Seigneur, et mon esprit se réjouit en Dieu, mon Sauveur." },
            { reference: "Luc 1:78-79", text: "Grâce aux entrailles de la miséricorde de notre Dieu, en vertu de laquelle le soleil levant nous a visités d'en haut, pour éclairer ceux qui sont assis dans les ténèbres et dans l'ombre de la mort." },
            { reference: "Matthieu 3:3", text: "Préparez le chemin du Seigneur, aplanissez ses sentiers." },
            { reference: "Luc 3:4-6", text: "Toute vallée sera comblée, toute montagne et toute colline seront abaissées; ce qui est tortueux sera redressé, et les chemins raboteux seront aplanis. Et toute chair verra le salut de Dieu." },
            { reference: "Romains 13:11", text: "C'est l'heure de vous réveiller enfin du sommeil, car maintenant le salut est plus près de nous que lorsque nous avons cru." },
            { reference: "Philippiens 4:4-5", text: "Réjouissez-vous toujours dans le Seigneur; je le répète, réjouissez-vous. Le Seigneur est proche." },
            { reference: "Jacques 5:7-8", text: "Soyez donc patients, frères jusqu'à l'avènement du Seigneur. Voici, le laboureur attend le précieux fruit de la terre, prenant patience à son égard. Vous aussi, soyez patients, affermissez vos cœurs, car l'avènement du Seigneur est proche." },
            { reference: "Apocalypse 22:20", text: "Celui qui atteste ces choses dit: Oui, je viens bientôt. Amen! Viens, Seigneur Jésus!" },
            { reference: "Luc 1:38", text: "Je suis la servante du Seigneur; qu'il me soit fait selon ta parole." },
            { reference: "Luc 1:45", text: "Heureuse celle qui a cru, parce que les choses qui lui ont été dites de la part du Seigneur auront leur accomplissement." }
        ],

        // ═══════════════════════════════════════════════════════════════════
        // NOËL - Nativité, incarnation, lumière
        // ═══════════════════════════════════════════════════════════════════
        noel: [
            { reference: "Jean 1:14", text: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père." },
            { reference: "Jean 1:9", text: "Cette lumière était la véritable lumière, qui, en venant dans le monde, éclaire tout homme." },
            { reference: "Luc 2:10-11", text: "Ne craignez point; car je vous annonce une bonne nouvelle, qui sera pour tout le peuple le sujet d'une grande joie: c'est qu'aujourd'hui, dans la ville de David, il vous est né un Sauveur, qui est le Christ, le Seigneur." },
            { reference: "Luc 2:14", text: "Gloire à Dieu dans les lieux très hauts, et paix sur la terre parmi les hommes qu'il agrée!" },
            { reference: "Matthieu 2:2", text: "Où est le roi des Juifs qui vient de naître? car nous avons vu son étoile en Orient, et nous sommes venus pour l'adorer." },
            { reference: "Luc 2:19", text: "Marie gardait toutes ces choses, et les repassait dans son cœur." },
            { reference: "Galates 4:4-5", text: "Lorsque les temps ont été accomplis, Dieu a envoyé son Fils, né d'une femme, né sous la loi, afin qu'il rachetât ceux qui étaient sous la loi, afin que nous reçussions l'adoption." },
            { reference: "1 Jean 4:9", text: "L'amour de Dieu a été manifesté envers nous en ce que Dieu a envoyé son Fils unique dans le monde, afin que nous vivions par lui." },
            { reference: "Jean 3:16", text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle." },
            { reference: "Tite 2:11", text: "Car la grâce de Dieu, source de salut pour tous les hommes, a été manifestée." },
            { reference: "2 Corinthiens 8:9", text: "Car vous connaissez la grâce de notre Seigneur Jésus Christ, qui pour vous s'est fait pauvre, de riche qu'il était, afin que par sa pauvreté vous fussiez enrichis." },
            { reference: "Luc 2:30-32", text: "Mes yeux ont vu ton salut, salut que tu as préparé devant tous les peuples, lumière pour éclairer les nations, et gloire d'Israël, ton peuple." }
        ],

        // ═══════════════════════════════════════════════════════════════════
        // CARÊME - Conversion, désert, repentir, combat spirituel
        // ═══════════════════════════════════════════════════════════════════
        careme: [
            { reference: "Joël 2:12-13", text: "Maintenant encore, dit l'Éternel, revenez à moi de tout votre cœur, avec des jeûnes, avec des pleurs et des lamentations! Déchirez vos cœurs et non vos vêtements." },
            { reference: "Matthieu 4:4", text: "L'homme ne vivra pas de pain seulement, mais de toute parole qui sort de la bouche de Dieu." },
            { reference: "Matthieu 6:6", text: "Quand tu pries, entre dans ta chambre, ferme ta porte, et prie ton Père qui est là dans le lieu secret; et ton Père, qui voit dans le secret, te le rendra." },
            { reference: "Matthieu 6:21", text: "Car là où est ton trésor, là aussi sera ton cœur." },
            { reference: "Marc 1:15", text: "Le temps est accompli, et le royaume de Dieu est proche. Repentez-vous, et croyez à la bonne nouvelle." },
            { reference: "2 Corinthiens 5:17", text: "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées; voici, toutes choses sont devenues nouvelles." },
            { reference: "Ézéchiel 36:26", text: "Je vous donnerai un cœur nouveau, et je mettrai en vous un esprit nouveau; j'ôterai de votre corps le cœur de pierre, et je vous donnerai un cœur de chair." },
            { reference: "1 Jean 1:9", text: "Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité." },
            { reference: "Romains 12:2", text: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence, afin que vous discerniez quelle est la volonté de Dieu." },
            { reference: "Jacques 4:8", text: "Approchez-vous de Dieu, et il s'approchera de vous. Nettoyez vos mains, pécheurs; purifiez vos cœurs, hommes irrésolus." },
            { reference: "Luc 9:23", text: "Si quelqu'un veut venir après moi, qu'il renonce à lui-même, qu'il se charge chaque jour de sa croix, et qu'il me suive." },
            { reference: "Psaume 51:12", text: "O Dieu, crée en moi un cœur pur, renouvelle en moi un esprit bien disposé." }
        ],

        // ═══════════════════════════════════════════════════════════════════
        // SEMAINE SAINTE - Passion, sacrifice, amour suprême
        // ═══════════════════════════════════════════════════════════════════
        semaineSainte: [
            { reference: "Jean 13:1", text: "Jésus, ayant aimé les siens qui étaient dans le monde, mit le comble à son amour pour eux." },
            { reference: "Jean 15:13", text: "Il n'y a pas de plus grand amour que de donner sa vie pour ses amis." },
            { reference: "Philippiens 2:8", text: "Il s'est humilié lui-même, se rendant obéissant jusqu'à la mort, même jusqu'à la mort de la croix." },
            { reference: "Isaïe 53:5", text: "Mais il était blessé pour nos péchés, brisé pour nos iniquités; le châtiment qui nous donne la paix est tombé sur lui, et c'est par ses meurtrissures que nous sommes guéris." },
            { reference: "Marc 14:36", text: "Abba, Père, toutes choses te sont possibles, éloigne de moi cette coupe! Toutefois, non pas ce que je veux, mais ce que tu veux." },
            { reference: "Luc 23:34", text: "Père, pardonne-leur, car ils ne savent ce qu'ils font." },
            { reference: "Luc 23:43", text: "Je te le dis en vérité, aujourd'hui tu seras avec moi dans le paradis." },
            { reference: "Jean 19:30", text: "Quand Jésus eut pris le vinaigre, il dit: Tout est accompli. Et, baissant la tête, il rendit l'esprit." },
            { reference: "Romains 5:8", text: "Mais Dieu prouve son amour envers nous, en ce que, lorsque nous étions encore des pécheurs, Christ est mort pour nous." },
            { reference: "1 Pierre 2:24", text: "Lui qui a porté lui-même nos péchés en son corps sur le bois, afin que morts aux péchés nous vivions pour la justice; lui par les meurtrissures duquel vous avez été guéris." },
            { reference: "Hébreux 12:2", text: "Ayant les regards sur Jésus, le chef et le consommateur de la foi, qui, en vue de la joie qui lui était réservée, a souffert la croix, méprisé l'ignominie." },
            { reference: "Jean 19:26-27", text: "Jésus, voyant sa mère, et auprès d'elle le disciple qu'il aimait, dit à sa mère: Femme, voilà ton fils. Puis il dit au disciple: Voilà ta mère." }
        ],

        // ═══════════════════════════════════════════════════════════════════
        // PÂQUES - Résurrection, vie nouvelle, victoire
        // ═══════════════════════════════════════════════════════════════════
        paques: [
            { reference: "Matthieu 28:6", text: "Il n'est point ici; il est ressuscité, comme il l'avait dit. Venez, voyez le lieu où il était couché." },
            { reference: "Jean 11:25-26", text: "Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort; et quiconque vit et croit en moi ne mourra jamais." },
            { reference: "Romains 6:9", text: "Sachant que Christ ressuscité des morts ne meurt plus; la mort n'a plus de pouvoir sur lui." },
            { reference: "1 Corinthiens 15:55-57", text: "O mort, où est ta victoire? O mort, où est ton aiguillon? Grâces soient rendues à Dieu, qui nous donne la victoire par notre Seigneur Jésus Christ!" },
            { reference: "Colossiens 3:1", text: "Si donc vous êtes ressuscités avec Christ, cherchez les choses d'en haut, où Christ est assis à la droite de Dieu." },
            { reference: "Romains 8:11", text: "Et si l'Esprit de celui qui a ressuscité Jésus d'entre les morts habite en vous, celui qui a ressuscité Christ d'entre les morts rendra aussi la vie à vos corps mortels." },
            { reference: "Jean 20:29", text: "Parce que tu m'as vu, tu as cru. Heureux ceux qui n'ont pas vu, et qui ont cru!" },
            { reference: "1 Pierre 1:3", text: "Béni soit Dieu, le Père de notre Seigneur Jésus Christ, qui, selon sa grande miséricorde, nous a régénérés, pour une espérance vivante, par la résurrection de Jésus Christ d'entre les morts." },
            { reference: "Apocalypse 1:18", text: "Je suis le premier et le dernier, et le vivant. J'étais mort; et voici, je suis vivant aux siècles des siècles." },
            { reference: "Jean 14:19", text: "Encore un peu de temps, et le monde ne me verra plus; mais vous, vous me verrez, car je vis, et vous vivrez aussi." },
            { reference: "Éphésiens 2:4-5", text: "Mais Dieu, qui est riche en miséricorde, à cause du grand amour dont il nous a aimés, nous qui étions morts par nos offenses, nous a rendus à la vie avec Christ." },
            { reference: "2 Corinthiens 4:14", text: "Sachant que celui qui a ressuscité le Seigneur Jésus nous ressuscitera aussi avec Jésus, et nous fera paraître avec vous en sa présence." }
        ],

        // ═══════════════════════════════════════════════════════════════════
        // PENTECÔTE - Esprit Saint, dons, mission
        // ═══════════════════════════════════════════════════════════════════
        pentecote: [
            { reference: "Actes 2:4", text: "Et ils furent tous remplis du Saint Esprit, et se mirent à parler en d'autres langues, selon que l'Esprit leur donnait de s'exprimer." },
            { reference: "Actes 1:8", text: "Vous recevrez une puissance, le Saint Esprit survenant sur vous, et vous serez mes témoins à Jérusalem, dans toute la Judée, dans la Samarie, et jusqu'aux extrémités de la terre." },
            { reference: "Jean 14:26", text: "Mais le consolateur, l'Esprit Saint, que le Père enverra en mon nom, vous enseignera toutes choses, et vous rappellera tout ce que je vous ai dit." },
            { reference: "Jean 16:13", text: "Quand le consolateur sera venu, l'Esprit de vérité, il vous conduira dans toute la vérité." },
            { reference: "Romains 8:26", text: "De même aussi l'Esprit nous aide dans notre faiblesse, car nous ne savons pas ce qu'il nous convient de demander dans nos prières." },
            { reference: "Galates 5:22-23", text: "Mais le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance." },
            { reference: "1 Corinthiens 12:4-7", text: "Il y a diversité de dons, mais le même Esprit; diversité de ministères, mais le même Seigneur. Or, à chacun la manifestation de l'Esprit est donnée pour l'utilité commune." },
            { reference: "Éphésiens 4:3-4", text: "Efforcez-vous de conserver l'unité de l'esprit par le lien de la paix. Il y a un seul corps et un seul Esprit." },
            { reference: "2 Corinthiens 3:17", text: "Or, le Seigneur c'est l'Esprit; et là où est l'Esprit du Seigneur, là est la liberté." },
            { reference: "Romains 8:14", text: "Car tous ceux qui sont conduits par l'Esprit de Dieu sont fils de Dieu." },
            { reference: "Jean 7:38-39", text: "Celui qui croit en moi, des fleuves d'eau vive couleront de son sein, comme dit l'Écriture. Il dit cela de l'Esprit que devaient recevoir ceux qui croiraient en lui." },
            { reference: "Éphésiens 5:18", text: "Ne vous enivrez pas de vin: c'est de la débauche. Soyez, au contraire, remplis de l'Esprit." }
        ],

        // ═══════════════════════════════════════════════════════════════════
        // TOUSSAINT - Saints, vie éternelle, communion des saints
        // ═══════════════════════════════════════════════════════════════════
        toussaint: [
            { reference: "Matthieu 5:3-4", text: "Heureux les pauvres en esprit, car le royaume des cieux est à eux! Heureux les affligés, car ils seront consolés!" },
            { reference: "Matthieu 5:8-9", text: "Heureux ceux qui ont le cœur pur, car ils verront Dieu! Heureux ceux qui procurent la paix, car ils seront appelés fils de Dieu!" },
            { reference: "Apocalypse 7:9", text: "Après cela, je regardai, et voici, il y avait une grande foule, que personne ne pouvait compter, de toute nation, de toute tribu, de tout peuple, et de toute langue." },
            { reference: "Apocalypse 21:4", text: "Il essuiera toute larme de leurs yeux, et la mort ne sera plus, et il n'y aura plus ni deuil, ni cri, ni douleur, car les premières choses ont disparu." },
            { reference: "Hébreux 12:1", text: "Nous donc aussi, puisque nous sommes environnés d'une si grande nuée de témoins, rejetons tout fardeau, et courons avec persévérance dans la carrière qui nous est ouverte." },
            { reference: "Jean 14:2-3", text: "Il y a plusieurs demeures dans la maison de mon Père. Je vais vous préparer une place. Et, lorsque je m'en serai allé, je reviendrai, et je vous prendrai avec moi." },
            { reference: "1 Thessaloniciens 4:17", text: "Ainsi, nous serons toujours avec le Seigneur." },
            { reference: "Philippiens 3:20", text: "Mais notre cité à nous est dans les cieux, d'où nous attendons aussi comme Sauveur le Seigneur Jésus Christ." },
            { reference: "1 Jean 3:2", text: "Nous savons que, lorsque cela sera manifesté, nous serons semblables à lui, parce que nous le verrons tel qu'il est." },
            { reference: "Apocalypse 14:13", text: "Heureux dès à présent les morts qui meurent dans le Seigneur! Oui, dit l'Esprit, afin qu'ils se reposent de leurs travaux, car leurs œuvres les suivent." },
            { reference: "2 Timothée 4:7-8", text: "J'ai combattu le bon combat, j'ai achevé la course, j'ai gardé la foi. Désormais la couronne de justice m'est réservée." },
            { reference: "Romains 8:18", text: "J'estime que les souffrances du temps présent ne sauraient être comparées à la gloire à venir qui sera révélée pour nous." }
        ],

        // ═══════════════════════════════════════════════════════════════════
        // TEMPS ORDINAIRE - Versets universels pour la vie quotidienne
        // ═══════════════════════════════════════════════════════════════════
        ordinaire: [
            // FOI ET CONFIANCE
            { reference: "Proverbes 3:5-6", text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse; reconnais-le dans toutes tes voies, et il aplanira tes sentiers." },
            { reference: "Jérémie 29:11", text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance." },
            { reference: "Psaume 23:1", text: "L'Éternel est mon berger: je ne manquerai de rien." },
            { reference: "Psaume 27:1", text: "L'Éternel est ma lumière et mon salut: de qui aurais-je crainte? L'Éternel est le soutien de ma vie: de qui aurais-je peur?" },
            { reference: "Philippiens 4:13", text: "Je puis tout par celui qui me fortifie." },
            { reference: "Romains 8:28", text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu." },
            { reference: "Matthieu 11:28", text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos." },
            
            // AMOUR
            { reference: "Jean 13:34", text: "Je vous donne un commandement nouveau: Aimez-vous les uns les autres; comme je vous ai aimés, vous aussi, aimez-vous les uns les autres." },
            { reference: "1 Corinthiens 13:4-7", text: "L'amour est patient, il est plein de bonté; l'amour n'est point envieux; l'amour ne se vante point, il ne s'enfle point d'orgueil." },
            { reference: "1 Jean 4:19", text: "Pour nous, nous l'aimons, parce qu'il nous a aimés le premier." },
            { reference: "Romains 8:38-39", text: "Car j'ai l'assurance que ni la mort ni la vie, ni les anges ni les dominations, ni les choses présentes ni les choses à venir, ne pourra nous séparer de l'amour de Dieu manifesté en Jésus Christ." },
            
            // PAIX ET SÉRÉNITÉ
            { reference: "Jean 14:27", text: "Je vous laisse la paix, je vous donne ma paix. Je ne vous donne pas comme le monde donne. Que votre cœur ne se trouble point, et ne s'alarme point." },
            { reference: "Philippiens 4:6-7", text: "Ne vous inquiétez de rien; mais en toute chose faites connaître vos besoins à Dieu par des prières. Et la paix de Dieu, qui surpasse toute intelligence, gardera vos cœurs." },
            { reference: "Isaïe 26:3", text: "A celui qui est ferme dans ses sentiments tu assures la paix, la paix, parce qu'il se confie en toi." },
            
            // FORCE ET COURAGE
            { reference: "Josué 1:9", text: "Ne t'ai-je pas donné cet ordre: Fortifie-toi et prends courage? Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi partout où tu iras." },
            { reference: "Isaïe 40:31", text: "Mais ceux qui se confient en l'Éternel renouvellent leur force. Ils prennent le vol comme les aigles; ils courent, et ne se lassent point." },
            { reference: "2 Timothée 1:7", text: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse." },
            
            // SAGESSE ET GUIDANCE
            { reference: "Jacques 1:5", text: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée." },
            { reference: "Psaume 119:105", text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier." },
            { reference: "Proverbes 16:3", text: "Recommande à l'Éternel tes œuvres, et tes projets réussiront." },
            
            // PRIÈRE
            { reference: "Matthieu 7:7", text: "Demandez, et l'on vous donnera; cherchez, et vous trouverez; frappez, et l'on vous ouvrira." },
            { reference: "1 Thessaloniciens 5:16-18", text: "Soyez toujours joyeux. Priez sans cesse. Rendez grâces en toutes choses." },
            { reference: "Marc 11:24", text: "C'est pourquoi je vous dis: Tout ce que vous demanderez en priant, croyez que vous l'avez reçu, et vous le verrez s'accomplir." },
            
            // VIE CHRÉTIENNE
            { reference: "Galates 2:20", text: "J'ai été crucifié avec Christ; et si je vis, ce n'est plus moi qui vis, c'est Christ qui vit en moi." },
            { reference: "Colossiens 3:17", text: "Et quoi que vous fassiez, en parole ou en œuvre, faites tout au nom du Seigneur Jésus, en rendant par lui des actions de grâces à Dieu le Père." },
            { reference: "Michée 6:8", text: "On t'a fait connaître, ô homme, ce qui est bien; et ce que l'Éternel demande de toi, c'est que tu pratiques la justice, que tu aimes la miséricorde, et que tu marches humblement avec ton Dieu." }
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FONCTION PRINCIPALE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Obtenir un verset aléatoire adapté à la période liturgique
     */
    getVersetDuJour(date = new Date()) {
        const periode = this.getPeriodeLiturgique(date);
        const versetsPeriode = this.versets[periode] || this.versets.ordinaire;
        
        // Tirer un verset aléatoire dans la période
        const index = Math.floor(Math.random() * versetsPeriode.length);
        const verset = versetsPeriode[index];
        
        // Ajouter les infos de la période
        const infoPeriode = this.getInfoPeriode(periode);
        
        return {
            ...verset,
            periode: periode,
            periodeNom: infoPeriode.nom,
            periodeIcone: infoPeriode.icone,
            periodeCouleur: infoPeriode.couleur,
            periodeDescription: infoPeriode.description
        };
    },

    /**
     * Obtenir tous les versets d'une période
     */
    getVersetsPeriode(periode) {
        return this.versets[periode] || this.versets.ordinaire;
    }
};

// Rendre accessible globalement
window.VersetsMeditation = VersetsMeditation;
