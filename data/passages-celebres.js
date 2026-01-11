/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Passages Bibliques Célèbres
 * ═══════════════════════════════════════════════════════════════════════════
 */

const PASSAGES_CELEBRES = {
    at: [
        {
            id: 'decalogue_exode',
            nom: 'Les Dix Paroles (Exode 20, 1-17)',
            icone: '🔹',
            ranges: [
                { livre: 'Exode', chapitre: 20, debut: 1, fin: 17 }
            ],
            description: 'Fondement de la Loi biblique.'
        },
        {
            id: 'decalogue_deut',
            nom: 'Les Dix Paroles (Deutéronome 5, 6-22)',
            icone: '🔹',
            ranges: [
                { livre: 'Deutéronome', chapitre: 5, debut: 6, fin: 22 }
            ],
            description: 'Fondement de la Loi biblique.'
        },
        {
            id: 'shema',
            nom: 'Le Shema Israël (Deutéronome 6, 4-9)',
            icone: '🔹',
            ranges: [
                { livre: 'Deutéronome', chapitre: 6, debut: 4, fin: 9 }
            ],
            description: 'Profession de foi centrale du judaïsme.'
        },
        {
            id: 'benediction_aaron',
            nom: 'La Bénédiction sacerdotale (Nombres 6, 24-26)',
            icone: '🔹',
            ranges: [
                { livre: 'Nombres', chapitre: 6, debut: 24, fin: 26 }
            ],
            description: 'Bénédiction liturgique très ancienne.'
        },
        {
            id: 'cantique_moise',
            nom: 'Le Cantique de Moïse (Exode 15, 1-18)',
            icone: '🔹',
            ranges: [
                { livre: 'Exode', chapitre: 15, debut: 1, fin: 18 }
            ],
            description: 'Chant après le passage de la mer Rouge.'
        },
        {
            id: 'cantique_debora',
            nom: 'Le Cantique de Débora (Juges 5)',
            icone: '🔹',
            ranges: [
                { livre: 'Juges', chapitre: 5, debut: 1, fin: 31 }
            ],
            description: 'Chant de victoire et de mémoire.'
        },
        {
            id: 'psaume23',
            nom: 'Le Psaume du Bon Pasteur (Psaume 23)',
            icone: '🔹',
            ranges: [
                { livre: 'Psaumes', chapitre: 23, debut: 1, fin: 6 }
            ],
            description: 'Texte de confiance et de protection.'
        },
        {
            id: 'psaumes_montees',
            nom: 'Les Psaumes des montées (Psaumes 120-134)',
            icone: '🔹',
            ranges: [
                { livre: 'Psaumes', chapitre: 120, debut: 1, fin: 7 },
                { livre: 'Psaumes', chapitre: 121, debut: 1, fin: 8 },
                { livre: 'Psaumes', chapitre: 122, debut: 1, fin: 9 },
                { livre: 'Psaumes', chapitre: 123, debut: 1, fin: 4 },
                { livre: 'Psaumes', chapitre: 124, debut: 1, fin: 8 },
                { livre: 'Psaumes', chapitre: 125, debut: 1, fin: 5 },
                { livre: 'Psaumes', chapitre: 126, debut: 1, fin: 6 },
                { livre: 'Psaumes', chapitre: 127, debut: 1, fin: 5 },
                { livre: 'Psaumes', chapitre: 128, debut: 1, fin: 6 },
                { livre: 'Psaumes', chapitre: 129, debut: 1, fin: 8 },
                { livre: 'Psaumes', chapitre: 130, debut: 1, fin: 8 },
                { livre: 'Psaumes', chapitre: 131, debut: 1, fin: 3 },
                { livre: 'Psaumes', chapitre: 132, debut: 1, fin: 18 },
                { livre: 'Psaumes', chapitre: 133, debut: 1, fin: 3 },
                { livre: 'Psaumes', chapitre: 134, debut: 1, fin: 3 }
            ],
            description: 'Chants de pèlerinage vers Jérusalem.'
        },
        {
            id: 'serviteur_souffrant',
            nom: 'Le Serviteur souffrant (Isaïe 52, 13 – 53, 12)',
            icone: '🔹',
            ranges: [
                { livre: 'Isaïe', chapitre: 52, debut: 13, fin: 15 },
                { livre: 'Isaïe', chapitre: 53, debut: 1, fin: 12 }
            ],
            description: 'Passage majeur de la littérature prophétique.'
        },
        {
            id: 'cantique_cantiques',
            nom: 'Le Cantique des cantiques (livre complet)',
            icone: '🔹',
            ranges: [
                { livre: 'Cantique des Cantiques', chapitre: 1, debut: 1, fin: 17 },
                { livre: 'Cantique des Cantiques', chapitre: 2, debut: 1, fin: 17 },
                { livre: 'Cantique des Cantiques', chapitre: 3, debut: 1, fin: 11 },
                { livre: 'Cantique des Cantiques', chapitre: 4, debut: 1, fin: 16 },
                { livre: 'Cantique des Cantiques', chapitre: 5, debut: 1, fin: 16 },
                { livre: 'Cantique des Cantiques', chapitre: 6, debut: 1, fin: 13 },
                { livre: 'Cantique des Cantiques', chapitre: 7, debut: 1, fin: 14 },
                { livre: 'Cantique des Cantiques', chapitre: 8, debut: 1, fin: 14 }
            ],
            description: 'Poème d\'amour symbolique.'
        }
    ],
    
    nt: [
        {
            id: 'beatitudes_mt',
            nom: 'Les Béatitudes (Matthieu 5, 3-12)',
            icone: '🔹',
            ranges: [
                { livre: 'Matthieu', chapitre: 5, debut: 3, fin: 12 }
            ],
            description: 'Ouverture du Sermon sur la montagne.'
        },
        {
            id: 'beatitudes_lc',
            nom: 'Les Béatitudes (Luc 6, 20-23)',
            icone: '🔹',
            ranges: [
                { livre: 'Luc', chapitre: 6, debut: 20, fin: 23 }
            ],
            description: 'Version courte des Béatitudes.'
        },
        {
            id: 'sermon_montagne',
            nom: 'Le Sermon sur la montagne (Matthieu 5-7)',
            icone: '🔹',
            ranges: [
                { livre: 'Matthieu', chapitre: 5, debut: 1, fin: 48 },
                { livre: 'Matthieu', chapitre: 6, debut: 1, fin: 34 },
                { livre: 'Matthieu', chapitre: 7, debut: 1, fin: 29 }
            ],
            description: 'Ensemble d\'enseignements fondamentaux.'
        },
        {
            id: 'notre_pere_mt',
            nom: 'Le Notre Père (Matthieu 6, 9-13)',
            icone: '🔹',
            ranges: [
                { livre: 'Matthieu', chapitre: 6, debut: 9, fin: 13 }
            ],
            description: 'Prière enseignée par Jésus.'
        },
        {
            id: 'notre_pere_lc',
            nom: 'Le Notre Père (Luc 11, 2-4)',
            icone: '🔹',
            ranges: [
                { livre: 'Luc', chapitre: 11, debut: 2, fin: 4 }
            ],
            description: 'Prière enseignée par Jésus.'
        },
        {
            id: 'paraboles_mt13',
            nom: 'Les Paraboles du Royaume (Matthieu 13)',
            icone: '🔹',
            ranges: [
                { livre: 'Matthieu', chapitre: 13, debut: 1, fin: 58 }
            ],
            description: 'Paraboles clés du semeur, grain de moutarde, etc.'
        },
        {
            id: 'paraboles_mc4',
            nom: 'Les Paraboles du Royaume (Marc 4)',
            icone: '🔹',
            ranges: [
                { livre: 'Marc', chapitre: 4, debut: 1, fin: 41 }
            ],
            description: 'Paraboles du semeur et de la lampe.'
        },
        {
            id: 'paraboles_lc8',
            nom: 'Les Paraboles (Luc 8)',
            icone: '🔹',
            ranges: [
                { livre: 'Luc', chapitre: 8, debut: 1, fin: 56 }
            ],
            description: 'Parabole du semeur et autres récits.'
        },
        {
            id: 'paraboles_lc15',
            nom: 'Les Paraboles de la miséricorde (Luc 15)',
            icone: '🔹',
            ranges: [
                { livre: 'Luc', chapitre: 15, debut: 1, fin: 32 }
            ],
            description: 'Brebis perdue, pièce perdue, fils prodigue.'
        },
        {
            id: 'bon_samaritain',
            nom: 'Le Bon Samaritain (Luc 10, 25-37)',
            icone: '🔹',
            ranges: [
                { livre: 'Luc', chapitre: 10, debut: 25, fin: 37 }
            ],
            description: 'Parabole majeure sur le prochain.'
        },
        {
            id: 'pain_vie',
            nom: 'Le Discours sur le Pain de vie (Jean 6, 22-59)',
            icone: '🔹',
            ranges: [
                { livre: 'Jean', chapitre: 6, debut: 22, fin: 59 }
            ],
            description: 'Enseignement central de l\'Évangile de Jean.'
        },
        {
            id: 'commandement_amour',
            nom: 'Le Commandement de l\'amour (Jean 13, 34-35)',
            icone: '🔹',
            ranges: [
                { livre: 'Jean', chapitre: 13, debut: 34, fin: 35 }
            ],
            description: 'Nouveau commandement selon Jésus.'
        },
        {
            id: 'discours_adieu',
            nom: 'Le Discours d\'adieu (Jean 13-17)',
            icone: '🔹',
            ranges: [
                { livre: 'Jean', chapitre: 13, debut: 1, fin: 38 },
                { livre: 'Jean', chapitre: 14, debut: 1, fin: 31 },
                { livre: 'Jean', chapitre: 15, debut: 1, fin: 27 },
                { livre: 'Jean', chapitre: 16, debut: 1, fin: 33 },
                { livre: 'Jean', chapitre: 17, debut: 1, fin: 26 }
            ],
            description: 'Derniers enseignements avant la Passion.'
        },
        {
            id: 'passion_mt',
            nom: 'La Passion (Matthieu 26-27)',
            icone: '🔹',
            ranges: [
                { livre: 'Matthieu', chapitre: 26, debut: 1, fin: 75 },
                { livre: 'Matthieu', chapitre: 27, debut: 1, fin: 66 }
            ],
            description: 'Récit central du christianisme.'
        },
        {
            id: 'passion_mc',
            nom: 'La Passion (Marc 14-15)',
            icone: '🔹',
            ranges: [
                { livre: 'Marc', chapitre: 14, debut: 1, fin: 72 },
                { livre: 'Marc', chapitre: 15, debut: 1, fin: 47 }
            ],
            description: 'Récit central du christianisme.'
        },
        {
            id: 'passion_lc',
            nom: 'La Passion (Luc 22-23)',
            icone: '🔹',
            ranges: [
                { livre: 'Luc', chapitre: 22, debut: 1, fin: 71 },
                { livre: 'Luc', chapitre: 23, debut: 1, fin: 56 }
            ],
            description: 'Récit central du christianisme.'
        },
        {
            id: 'passion_jn',
            nom: 'La Passion (Jean 18-19)',
            icone: '🔹',
            ranges: [
                { livre: 'Jean', chapitre: 18, debut: 1, fin: 40 },
                { livre: 'Jean', chapitre: 19, debut: 1, fin: 42 }
            ],
            description: 'Récit central du christianisme.'
        },
        {
            id: 'hymne_charite',
            nom: 'L\'Hymne à la charité (1 Corinthiens 13)',
            icone: '🔹',
            ranges: [
                { livre: '1 Corinthiens', chapitre: 13, debut: 1, fin: 13 }
            ],
            description: 'Texte clé de Paul.'
        },
        {
            id: 'fruit_esprit',
            nom: 'Le Fruit de l\'Esprit (Galates 5, 22-23)',
            icone: '🔹',
            ranges: [
                { livre: 'Galates', chapitre: 5, debut: 22, fin: 23 }
            ],
            description: 'Liste de vertus spirituelles.'
        },
        {
            id: 'armure_dieu',
            nom: 'L\'Armure de Dieu (Éphésiens 6, 10-17)',
            icone: '🔹',
            ranges: [
                { livre: 'Éphésiens', chapitre: 6, debut: 10, fin: 17 }
            ],
            description: 'Image symbolique de la vie spirituelle.'
        },
        {
            id: 'prologue_jean',
            nom: 'Le Prologue de Jean (Jean 1, 1-18)',
            icone: '🔹',
            ranges: [
                { livre: 'Jean', chapitre: 1, debut: 1, fin: 18 }
            ],
            description: 'Texte théologique fondamental.'
        }
    ]
};

// Rendre accessible globalement
window.PASSAGES_CELEBRES = PASSAGES_CELEBRES;
