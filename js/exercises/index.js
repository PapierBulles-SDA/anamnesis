/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Contrôleur des Exercices
 * ═══════════════════════════════════════════════════════════════════════════
 */

const Exercises = {
    /**
     * Démarrer un exercice
     */
    startExercise() {
        
        // Créer la série
        App.state.currentSeries = Data.createRandomSeries();
        App.state.currentVerseIndex = 0;
        
        if (App.state.currentSeries.length > 0) {
        }
        
        // Calculer le total selon le mode
        const total = App.config.mode === 'chaine' 
            ? App.state.currentSeries.length - 1 
            : App.state.currentSeries.length;
        
        App.state.seriesResults = {
            total: total,
            correct: 0,
            attempts: []
        };
        
        // Masquer l'accueil
        const header = document.getElementById('header');
        const homePage = document.getElementById('homePage');
        
        if (header) header.classList.add('hidden');
        if (homePage) homePage.classList.add('hidden');
        
        
        // Lancer le mode approprié
        switch (App.config.mode) {
            case 'reconstitution':
                ReconstitutionMode.start();
                break;
            case 'mystere':
                MysteryMode.start();
                break;
            case 'chaine':
                SuiteMode.start();
                break;
            case 'audio':
                DictationMode.start();
                break;
            default: // classique
                ClassicMode.start();
        }
    },

    /**
     * Initialiser tous les modes
     */
    init() {
        ClassicMode.init();
        ReconstitutionMode.init();
        MysteryMode.init();
        SuiteMode.init();
        DictationMode.init();
        
        // Bouton démarrer
        const startBtn = document.getElementById('startBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startExercise());
        }
    }
};

// Rendre accessible globalement
window.Exercises = Exercises;
