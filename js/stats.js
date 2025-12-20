/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Module Statistiques
 * ═══════════════════════════════════════════════════════════════════════════
 */

const Stats = {
    /**
     * Charger les statistiques depuis localStorage
     */
    load() {
        const saved = localStorage.getItem('bibleStats');
        if (saved) {
            try {
                const loaded = JSON.parse(saved);
                
                // Migration : s'assurer que byMode existe avec tous les modes
                if (!loaded.byMode) {
                    loaded.byMode = App.stats.byMode;
                }
                
                // S'assurer que tous les modes existent
                const defaultModes = ['classique', 'reconstitution', 'mystere', 'chaine', 'audio'];
                defaultModes.forEach(mode => {
                    if (!loaded.byMode[mode]) {
                        loaded.byMode[mode] = { versets: 0, attempts: 0, successes: 0, sessions: 0 };
                    }
                });
                
                // Fusionner avec les valeurs par défaut
                App.stats = { ...App.stats, ...loaded };
            } catch (e) {
                console.error('Erreur lors du chargement des stats:', e);
            }
        }
        
        this.updateDisplay();
    },

    /**
     * Sauvegarder les statistiques dans localStorage
     */
    save() {
        localStorage.setItem('bibleStats', JSON.stringify(App.stats));
        this.updateDisplay();
    },

    /**
     * Réinitialiser toutes les statistiques
     */
    reset() {
        if (confirm(i18n.stats.resetConfirm)) {
            // Supprimer les marqueurs de versets appris
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('learned_')) {
                    localStorage.removeItem(key);
                }
            });
            
            // Réinitialiser les stats
            App.stats = {
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
            };
            
            this.save();
        }
    },

    /**
     * Enregistrer une tentative
     * @param {string} mode - Le mode d'exercice
     * @param {boolean} success - Si la tentative est réussie
     * @param {string} verseRef - Référence du verset (pour marquer comme appris)
     */
    recordAttempt(mode, success, verseRef = null) {
        App.stats.attempts++;
        
        if (App.stats.byMode[mode]) {
            App.stats.byMode[mode].attempts++;
        }
        
        if (success) {
            App.stats.successes++;
            App.stats.streak++;
            
            if (App.stats.streak > App.stats.bestStreak) {
                App.stats.bestStreak = App.stats.streak;
            }
            
            if (App.stats.byMode[mode]) {
                App.stats.byMode[mode].successes++;
            }
            
            // Marquer le verset comme appris (si pas déjà fait)
            if (verseRef) {
                this.markAsLearned(mode, verseRef);
            }
        } else {
            App.stats.streak = 0;
        }
        
        this.save();
    },

    /**
     * Marquer un verset comme appris
     * @param {string} mode - Le mode d'exercice
     * @param {string} verseRef - Référence du verset
     */
    markAsLearned(mode, verseRef) {
        const learnedKey = `learned_${verseRef}`;
        if (!localStorage.getItem(learnedKey)) {
            App.stats.learned++;
            if (App.stats.byMode[mode]) {
                App.stats.byMode[mode].versets++;
            }
            localStorage.setItem(learnedKey, 'true');
        }
    },

    /**
     * Incrémenter le compteur de sessions
     * @param {string} mode - Le mode d'exercice
     */
    recordSession(mode) {
        App.stats.sessions++;
        if (App.stats.byMode[mode]) {
            App.stats.byMode[mode].sessions++;
        }
        this.save();
    },

    /**
     * Calculer le taux de réussite
     * @param {number} successes - Nombre de réussites
     * @param {number} attempts - Nombre de tentatives
     * @returns {number} - Pourcentage de réussite
     */
    calculateRate(successes, attempts) {
        if (attempts === 0) return 0;
        return Math.round((successes / attempts) * 100);
    },

    /**
     * Mettre à jour l'affichage des statistiques
     */
    updateDisplay() {
        // Stats globales (header)
        const headerLearned = document.getElementById('learnedCount');
        const headerStreak = document.getElementById('streakCount');
        const headerRate = document.getElementById('successRate');
        
        if (headerLearned) headerLearned.textContent = App.stats.learned;
        if (headerStreak) headerStreak.textContent = App.stats.streak;
        if (headerRate) {
            headerRate.textContent = this.calculateRate(App.stats.successes, App.stats.attempts) + '%';
        }
        
        // Stats onglet Stats - Global
        const statsLearned = document.getElementById('totalVersets');
        const statsRate = document.getElementById('totalSuccess');
        const statsSessions = document.getElementById('totalSessions');
        const statsBest = document.getElementById('bestStreak');
        
        if (statsLearned) statsLearned.textContent = App.stats.learned;
        if (statsRate) {
            statsRate.textContent = this.calculateRate(App.stats.successes, App.stats.attempts) + '%';
        }
        if (statsSessions) statsSessions.textContent = App.stats.sessions;
        if (statsBest) statsBest.textContent = App.stats.bestStreak;
        
        // Stats par mode - mapping des IDs
        const modeIdMapping = {
            classique: { versets: 'classiqueVersets', success: 'classiqueSuccess', sessions: 'classiqueSessions' },
            reconstitution: { versets: 'reconstitutionVersets', success: 'reconstitutionSuccess', sessions: 'reconstitutionSessions' },
            mystere: { versets: 'mystereVersets', success: 'mystereSuccess', sessions: 'mystereSessions' },
            chaine: { versets: 'chaineVersetsStats', success: 'chaineSuccessStats', sessions: 'chaineSessionsStats' },
            audio: { versets: 'audioVersetsStats', success: 'audioSuccessStats', sessions: 'audioSessionsStats' }
        };
        
        Object.keys(modeIdMapping).forEach(mode => {
            const modeStats = App.stats.byMode[mode];
            const ids = modeIdMapping[mode];
            
            if (modeStats) {
                const versetsEl = document.getElementById(ids.versets);
                const successEl = document.getElementById(ids.success);
                const sessionsEl = document.getElementById(ids.sessions);
                
                if (versetsEl) versetsEl.textContent = modeStats.versets;
                if (successEl) {
                    successEl.textContent = this.calculateRate(modeStats.successes, modeStats.attempts) + '%';
                }
                if (sessionsEl) sessionsEl.textContent = modeStats.sessions;
            }
        });
        
        // Bouton reset
        const resetBtn = document.getElementById('resetStatsBtn');
        if (resetBtn && !resetBtn.hasListener) {
            resetBtn.addEventListener('click', () => this.reset());
            resetBtn.hasListener = true;
        }
    }
};

// Rendre accessible globalement
window.Stats = Stats;
