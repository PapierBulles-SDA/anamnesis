/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Textes Français
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Ce fichier contient tous les textes de l'interface.
 * Pour ajouter une nouvelle langue, dupliquer ce fichier (ex: en.js)
 * et traduire toutes les valeurs.
 */

const i18n = {
    // Informations générales
    app: {
        title: 'Anamnésis',
        subtitle: 'Mémorise le Nouveau Testament',
        author: 'Bienvenu d\'Audiffret',
        version: '1.0'
    },

    // Onglets
    tabs: {
        exercise: '📝 Exercice',
        read: '📖 Lire',
        meditate: '🙏 Méditer',
        explore: '🔍 Explorer',
        stats: '📊 Stats',
        liturgy: '⛪ Liturgie'
    },

    // Modes d'exercice
    modes: {
        classique: {
            icon: '✏️',
            name: 'Classique',
            desc: 'Compléter les mots'
        },
        reconstitution: {
            icon: '🧩',
            name: 'Reconstitution',
            desc: 'Remettre dans l\'ordre'
        },
        mystere: {
            icon: '🔮',
            name: 'Verset mystère',
            desc: 'Trouver la référence'
        },
        suite: {
            icon: '🔗',
            name: 'Suite',
            desc: 'Quel verset vient après ?'
        },
        dictee: {
            icon: '🎧',
            name: 'Dictée',
            desc: 'Écouter et transcrire'
        }
    },

    // Difficultés
    difficulty: {
        title: '🎯 Niveau de difficulté',
        facile: {
            name: 'Facile',
            descClassique: '1-2 mots',
            descReconstitution: '3 blocs'
        },
        moyen: {
            name: 'Moyen',
            descClassique: '3-4 mots',
            descReconstitution: '4-5 blocs'
        },
        difficile: {
            name: 'Difficile',
            descClassique: '5+ mots',
            descReconstitution: '6-8 blocs'
        }
    },

    // Nombre de versets
    seriesLength: {
        title: '📚 Nombre de versets',
        short: { value: 2, label: 'Rapide', desc: '2 versets' },
        medium: { value: 5, label: 'Standard', desc: '5 versets' },
        long: { value: 10, label: 'Long', desc: '10 versets' }
    },

    // Lecture préalable
    reading: {
        title: '👁️ Lecture préalable',
        yes: 'Oui (recommandé)',
        no: 'Non',
        preview: '📖 Lis attentivement ces versets :',
        startButton: 'J\'ai lu, commencer l\'exercice ✨'
    },

    // Filtres
    filters: {
        title: '📖 Choisir un passage',
        partie: 'Partie',
        livre: 'Livre',
        chapitre: 'Chapitre',
        all: 'Tous',
        allParties: 'Toutes les parties'
    },

    // Boutons
    buttons: {
        start: '🚀 Commencer',
        verify: '✅ Vérifier',
        next: 'Suivant ✨',
        nextQuestion: 'Question suivante ✨',
        show: '👁️ Afficher le verset',
        restart: '🔄 Recommencer',
        home: '🏠 Retour à l\'accueil',
        replay: '🔁 Réécouter',
        reset: 'Réinitialiser',
        save: 'Sauvegarder'
    },

    // Messages
    messages: {
        success: '✅ Parfait !',
        successSuite: '✅ Excellent ! C\'est le bon verset !',
        error: '❌ Ce n\'est pas correct.',
        errorSuite: '❌ Ce n\'est pas le bon verset.',
        tryAgain: 'Réessaye ou affiche le verset.',
        notEnoughVerses: '⚠️ Il faut au moins 2 versets consécutifs pour cet exercice.',
        correctAnswer: '✅ La bonne réponse était :',
        copied: '📋 Référence copiée !'
    },

    // Mode Classique
    classic: {
        hintCheckbox: '💡 Afficher indice première lettre'
    },

    // Mode Reconstitution
    reconstitution: {
        dropZone: '📥 Dépose les blocs ici dans le bon ordre',
        available: '📦 Blocs disponibles :',
        blocksCount: '{n} blocs à remettre dans l\'ordre',
        resetBlocks: '↩️ Recommencer'
    },

    // Mode Mystère
    mystery: {
        question: '🔮 D\'où vient ce verset ?',
        hints: '💡 Indices (réduisent les points)',
        hintPartie: '📂 Partie',
        hintLivre: '📖 Livre',
        hintChapitre: '📄 Chapitre',
        hintsAvailable: '💡 {n} indices disponibles',
        hintsWithAuto: '💡 {n} indices disponibles ({m} déjà connu via filtres)',
        selectPartie: '-- Partie --',
        selectLivre: '-- Livre --',
        selectChapitre: '-- Chapitre --',
        selectVerset: '-- Verset --',
        points: '{n} points'
    },

    // Mode Suite
    suite: {
        currentVerse: '📖 Verset actuel :',
        question: 'Quel verset vient <strong>juste après</strong> ?',
        questionCount: 'Question {n} sur {total}',
        versesToRead: '{n} versets à lire → {m} question(s)'
    },

    // Mode Dictée
    dictation: {
        instruction: '✍️ Transcris ce que tu entends :',
        placeholder: 'Écris le verset ici...',
        speeds: {
            slow: '🐢 Lent',
            normal: '🚶 Normal',
            fast: '🏃 Rapide'
        },
        score: 'Score : {n}%'
    },

    // Onglet Lire
    read: {
        title: '📖 Lecture du Nouveau Testament',
        selectBook: 'Sélectionne un livre et un chapitre'
    },

    // Onglet Méditer
    meditate: {
        title: '🙏 Méditation',
        verseOfDay: 'Verset du jour',
        randomVerse: '🎲 Verset aléatoire',
        notes: 'Notes de méditation',
        notesPlaceholder: 'Écris tes réflexions...',
        saveButton: '💾 Sauvegarder ma méditation',
        saved: '✅ Méditation sauvegardée !',
        history: '📜 Historique des méditations',
        noHistory: 'Aucune méditation enregistrée',
        delete: 'Supprimer'
    },

    // Onglet Explorer
    explore: {
        title: '🔍 Rechercher dans la Bible',
        placeholder: 'Rechercher un mot ou une phrase...',
        results: '{n} résultat(s) trouvé(s)',
        noResults: 'Aucun résultat',
        minChars: 'Entrez au moins 2 caractères'
    },

    // Onglet Stats
    stats: {
        title: '📊 Mes statistiques',
        global: {
            title: 'Statistiques globales',
            learned: 'versets appris',
            successRate: 'réussite',
            sessions: 'sessions',
            bestStreak: 'meilleure série'
        },
        byMode: {
            title: 'Par mode d\'exercice',
            verses: 'versets',
            successRate: 'réussite',
            sessions: 'sessions'
        },
        reset: '🗑️ Réinitialiser les statistiques',
        resetConfirm: 'Es-tu sûr de vouloir effacer toutes tes statistiques ?'
    },

    // Onglet Liturgie
    liturgy: {
        title: '⛪ Calendrier liturgique',
        zone: 'Zone liturgique',
        zones: {
            france: 'France',
            belgique: 'Belgique',
            suisse: 'Suisse',
            canada: 'Canada',
            luxembourg: 'Luxembourg',
            romain: 'Calendrier romain'
        },
        weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
        openAELF: '🔗 Ouvrir sur AELF.org'
    },

    // Résultats
    results: {
        title: 'Résultats',
        score: 'Score',
        mode: 'Mode',
        versesSuccess: 'Versets réussis',
        questionsSuccess: 'Questions réussies',
        level: 'Niveau',
        currentStreak: 'Série actuelle',
        bestStreak: 'Meilleure série'
    },

    // Parties du Nouveau Testament
    parties: {
        'Évangiles': 'Évangiles',
        'Actes': 'Actes',
        'Épîtres de Paul': 'Épîtres de Paul',
        'Épîtres générales': 'Épîtres générales',
        'Apocalypse': 'Apocalypse'
    }
};

// Fonction utilitaire pour les textes avec variables
i18n.format = function(text, vars) {
    let result = text;
    for (const [key, value] of Object.entries(vars)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
    return result;
};

// Rendre accessible globalement
window.i18n = i18n;
