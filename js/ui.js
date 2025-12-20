/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Module Interface Utilisateur
 * ═══════════════════════════════════════════════════════════════════════════
 */

const UI = {
    /**
     * Initialiser les éléments DOM
     */
    initElements() {
        App.elements = {
            // Pages principales
            header: document.getElementById('header'),
            homePage: document.getElementById('homePage'),
            readingPage: document.getElementById('readingPage'),
            exercisePage: document.getElementById('exercisePage'),
            reconstitutionPage: document.getElementById('reconstitutionPage'),
            mysterePage: document.getElementById('mysterePage'),
            chainePage: document.getElementById('chainePage'),
            audioPage: document.getElementById('audioPage'),
            resultsPage: document.getElementById('resultsPage'),
            
            // Onglets
            tabButtons: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content')
        };
    },

    /**
     * Initialiser la navigation par onglets
     */
    initTabs() {
        // Mapping des data-tab vers les IDs des contenus
        const tabMapping = {
            'exercice': 'tabExercice',
            'lire': 'tabLire',
            'mediter': 'tabMediter',
            'priere': 'tabPriere',
            'explorer': 'tabExplorer',
            'stats': 'tabStats',
            'liturgie': 'tabLiturgie'
        };

        App.elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Désactiver tous les onglets
                App.elements.tabButtons.forEach(b => b.classList.remove('active'));
                App.elements.tabContents.forEach(c => c.classList.remove('active'));
                
                // Activer l'onglet cliqué
                btn.classList.add('active');
                const tabKey = btn.dataset.tab;
                const contentId = tabMapping[tabKey];
                const content = document.getElementById(contentId);
                if (content) {
                    content.classList.add('active');
                }
                
                // Actions spécifiques par onglet
                if (tabKey === 'stats') {
                    Stats.updateDisplay();
                }
            });
        });
    },

    /**
     * Afficher une page
     * @param {string} pageId - ID de la page à afficher
     */
    showPage(pageId) {
        // Masquer toutes les pages d'exercice
        const pages = [
            'readingPage', 'exercisePage', 'reconstitutionPage',
            'mysterePage', 'chainePage', 'audioPage', 'resultsPage'
        ];
        
        pages.forEach(id => {
            const page = document.getElementById(id);
            if (page) page.classList.remove('active');
        });
        
        // Afficher la page demandée
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    },

    /**
     * Retourner à l'accueil
     */
    returnHome() {
        // Masquer toutes les pages d'exercice
        const pages = [
            'readingPage', 'exercisePage', 'reconstitutionPage',
            'mysterePage', 'chainePage', 'audioPage', 'resultsPage'
        ];
        
        pages.forEach(id => {
            const page = document.getElementById(id);
            if (page) page.classList.remove('active');
        });
        
        // Afficher l'accueil
        if (App.elements.header) App.elements.header.classList.remove('hidden');
        if (App.elements.homePage) App.elements.homePage.classList.remove('hidden');
    },

    /**
     * Mettre à jour la visibilité des options selon le mode
     * @param {string} mode - Le mode sélectionné
     */
    updateOptionsVisibility(mode) {
        const configDifficulty = document.getElementById('configDifficulty');
        const configReading = document.getElementById('configReading');
        
        // Difficulté : Classique et Reconstitution uniquement
        if (mode === 'classique' || mode === 'reconstitution') {
            if (configDifficulty) configDifficulty.style.display = 'block';
            
            // Adapter les descriptions selon le mode
            const diffFacileDesc = document.getElementById('diffFacileDesc');
            const diffMoyenDesc = document.getElementById('diffMoyenDesc');
            const diffDifficileDesc = document.getElementById('diffDifficileDesc');
            
            if (mode === 'reconstitution') {
                if (diffFacileDesc) diffFacileDesc.textContent = i18n.difficulty.facile.descReconstitution;
                if (diffMoyenDesc) diffMoyenDesc.textContent = i18n.difficulty.moyen.descReconstitution;
                if (diffDifficileDesc) diffDifficileDesc.textContent = i18n.difficulty.difficile.descReconstitution;
            } else {
                if (diffFacileDesc) diffFacileDesc.textContent = i18n.difficulty.facile.descClassique;
                if (diffMoyenDesc) diffMoyenDesc.textContent = i18n.difficulty.moyen.descClassique;
                if (diffDifficileDesc) diffDifficileDesc.textContent = i18n.difficulty.difficile.descClassique;
            }
        } else {
            if (configDifficulty) configDifficulty.style.display = 'none';
        }
        
        // Lecture préalable : Classique, Reconstitution, Suite
        if (mode === 'classique' || mode === 'reconstitution' || mode === 'chaine') {
            if (configReading) configReading.style.display = 'block';
        } else {
            if (configReading) configReading.style.display = 'none';
        }
    },

    /**
     * Afficher un message
     * @param {string} elementId - ID de l'élément message
     * @param {string} text - Texte du message
     * @param {string} type - Type de message ('success', 'error', 'info')
     */
    showMessage(elementId, text, type = 'info') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<div class="message ${type}">${text}</div>`;
        }
    },

    /**
     * Afficher les résultats de la série
     */
    showResults() {
        if (App.elements.exercisePage) App.elements.exercisePage.classList.remove('active');
        if (App.elements.resultsPage) App.elements.resultsPage.classList.add('active');
        
        // Enregistrer la session
        Stats.recordSession(App.config.mode);
        
        const { correct, total } = App.state.seriesResults;
        const score = Math.round((correct / total) * 100);
        
        const scoreEl = document.getElementById('resultsScore');
        if (scoreEl) scoreEl.textContent = score + '%';
        
        const modeNames = {
            classique: i18n.modes.classique.icon + ' ' + i18n.modes.classique.name,
            reconstitution: i18n.modes.reconstitution.icon + ' ' + i18n.modes.reconstitution.name,
            mystere: i18n.modes.mystere.icon + ' ' + i18n.modes.mystere.name,
            chaine: i18n.modes.suite.icon + ' ' + i18n.modes.suite.name,
            audio: i18n.modes.dictee.icon + ' ' + i18n.modes.dictee.name
        };
        
        // Label adapté pour le mode Suite
        const resultLabel = App.config.mode === 'chaine' 
            ? i18n.results.questionsSuccess 
            : i18n.results.versesSuccess;
        
        const details = document.getElementById('resultsDetails');
        if (details) {
            details.innerHTML = `
                <div class="result-item">
                    <span class="result-label">${i18n.results.mode}</span>
                    <span class="result-value">${modeNames[App.config.mode] || App.config.mode}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${resultLabel}</span>
                    <span class="result-value">${correct} / ${total}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${i18n.results.level}</span>
                    <span class="result-value">${App.config.difficulty.charAt(0).toUpperCase() + App.config.difficulty.slice(1)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${i18n.results.currentStreak}</span>
                    <span class="result-value">${App.stats.streak} 🔥</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${i18n.results.bestStreak}</span>
                    <span class="result-value">${App.stats.bestStreak} ⭐</span>
                </div>
            `;
        }
    },

    /**
     * Initialiser les boutons de mode
     */
    initModeButtons() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                App.config.mode = btn.dataset.mode;
                this.updateOptionsVisibility(App.config.mode);
            });
        });
    },

    /**
     * Initialiser les boutons de difficulté
     */
    initDifficultyButtons() {
        document.querySelectorAll('.option-btn[data-difficulty]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.option-btn[data-difficulty]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                App.config.difficulty = btn.dataset.difficulty;
            });
        });
    },

    /**
     * Initialiser les boutons de nombre de versets
     */
    initSeriesLengthButtons() {
        document.querySelectorAll('.option-btn[data-series]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.option-btn[data-series]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                App.config.seriesLength = parseInt(btn.dataset.series);
            });
        });
    },

    /**
     * Initialiser les boutons de lecture préalable
     */
    initReadingButtons() {
        document.querySelectorAll('.toggle-btn[data-reading]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.toggle-btn[data-reading]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                App.config.readingFirst = btn.dataset.reading === 'true';
            });
        });
    },

    /**
     * Initialiser les sélecteurs de filtres
     */
    initFilterSelects() {
        const selectPartie = document.getElementById('selectPartie');
        const selectLivre = document.getElementById('selectLivre');
        const selectChapitre = document.getElementById('selectChapitre');
        
        if (selectPartie) {
            selectPartie.addEventListener('change', () => {
                App.config.selectedPartie = selectPartie.value;
                Data.updateLivreDropdown();
            });
        }
        
        if (selectLivre) {
            selectLivre.addEventListener('change', () => {
                App.config.selectedLivre = selectLivre.value;
                Data.updateChapitreDropdown();
            });
        }
        
        if (selectChapitre) {
            selectChapitre.addEventListener('change', () => {
                App.config.selectedChapitre = selectChapitre.value;
            });
        }
    },

    /**
     * Initialiser les boutons de navigation
     */
    initNavigationButtons() {
        // Boutons retour à l'accueil
        ['homeBtn1', 'homeBtn2', 'homeBtn3', 'classicHomeBtn', 'reconstitutionHomeBtn', 
         'mystereHomeBtn', 'chaineHomeBtn', 'audioHomeBtn'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => this.returnHome());
            }
        });
        
        // Bouton recommencer
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                if (App.elements.resultsPage) App.elements.resultsPage.classList.remove('active');
                Exercises.startExercise();
            });
        }
    }
};

// Rendre accessible globalement
window.UI = UI;
