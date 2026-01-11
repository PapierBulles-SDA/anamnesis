/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Configuration et État Global
 * ═══════════════════════════════════════════════════════════════════════════
 */

const App = {
    // Configuration utilisateur
    config: {
        mode: 'classique',
        difficulty: 'moyen',
        seriesLength: 5, // ou 'all' pour tous les versets
        readingFirst: true,
        
        // Mode de sélection du contenu
        contentMode: 'filters', // 'filters' | 'passage' | 'custom'
        selectedPassageId: null,
        selectedCustomGroupId: null,
        
        // Filtres classiques
        selectedPartie: 'toutes',
        selectedLivre: 'tous',
        selectedChapitre: 'tous'
    },

    // État de l'exercice en cours
    state: {
        currentSeries: [],
        currentVerseIndex: 0,
        seriesResults: {
            total: 0,
            correct: 0,
            attempts: []
        }
    },

    // État spécifique aux modes
    modes: {
        reconstitution: {
            touchDragState: {
                isDragging: false,
                chip: null,
                ghost: null,
                startX: 0,
                startY: 0,
                offsetX: 0,
                offsetY: 0
            }
        },
        mystere: {
            indicesUsed: 0,
            currentVerse: null,
            partieRevealed: false,
            livreRevealed: false,
            chapitreRevealed: false,
            selectsInitialized: false
        },
        suite: {
            currentIndex: 0,
            answered: false,
            correctVerse: null,
            options: []
        },
        audio: {
            currentSpeed: 1
        }
    },

    // Statistiques
    stats: {
        learned: 0,
        attempts: 0,
        successes: 0,
        streak: 0,
        bestStreak: 0,
        sessions: 0,
        byMode: {
            classique: { versets: 0, attempts: 0, successes: 0, sessions: 0 },
            reconstitution: { versets: 0, attempts: 0, successes: 0, sessions: 0 },
            mystere: { versets: 0, attempts: 0, successes: 0, sessions: 0 },
            chaine: { versets: 0, attempts: 0, successes: 0, sessions: 0 },
            audio: { versets: 0, attempts: 0, successes: 0, sessions: 0 }
        }
    },

    // Configuration des difficultés
    blanksCount: {
        facile: { min: 1, max: 2 },
        moyen: { min: 3, max: 4 },
        difficile: { min: 5, max: 10 }
    },

    // Mots à exclure pour les trous
    excludedWords: [
        'le', 'la', 'les', 'un', 'une', 'des', 'de', 'du',
        'et', 'ou', 'à', 'au', 'en', 'dans', 'pour', 'par', 'sur',
        'car', 'que', 'qui', 'est', 'son', 'sa', 'ses',
        'ce', 'cet', 'cette', 'ces', 'mais', 'donc', 'or', 'ni',
        'ne', 'pas', 'plus', 'tout', 'tous', 'toute', 'toutes'
    ],

    // Références aux éléments DOM (initialisées dans app.js)
    elements: {}
};

// Rendre accessible globalement
window.App = App;
