/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Module Analytics (GoatCounter)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Tracking anonyme et respectueux de la vie privée.
 * Aucune donnée personnelle n'est collectée.
 */

const Analytics = {
    /**
     * Envoyer un événement à GoatCounter
     * @param {string} category - Catégorie (onglet, exercice, priere...)
     * @param {string} action - Action (clic, start, complete...)
     * @param {string} label - Détail optionnel
     */
    track(category, action, label = '') {
        // Construire le chemin
        let path = `${category}/${action}`;
        if (label) {
            path += `/${label}`;
        }
        
        // Envoyer à GoatCounter si disponible
        if (typeof goatcounter !== 'undefined' && goatcounter.count) {
            goatcounter.count({
                path: path,
                event: true
            });
        }
        
        // Log en dev (à commenter en production si souhaité)
        // console.log('📊 Analytics:', path);
    },

    // ═══════════════════════════════════════════════════════════════════════
    // RACCOURCIS PAR CATÉGORIE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Changement d'onglet
     */
    trackOnglet(nomOnglet) {
        this.track('onglet', nomOnglet);
    },

    /**
     * Sélection d'un mode d'exercice
     */
    trackModeSelection(mode) {
        this.track('exercice', 'mode', mode);
    },

    /**
     * Lancement d'un exercice
     */
    trackExerciceStart(mode, difficulte, nbVersets) {
        this.track('exercice', 'start', `${mode}-${difficulte}-${nbVersets}v`);
    },

    /**
     * Fin d'un exercice
     */
    trackExerciceComplete(mode, score) {
        this.track('exercice', 'complete', `${mode}-${score}pct`);
    },

    /**
     * Trouve ton Verset - choix du parcours
     */
    trackTrouveTonVerset(parcours) {
        this.track('trouve-verset', 'parcours', parcours);
    },

    /**
     * Trouve ton Verset - résultat (famille)
     */
    trackTrouveTonVersetResultat(famille) {
        this.track('trouve-verset', 'resultat', famille);
    },

    /**
     * Méditation sauvegardée
     */
    trackMeditationSaved() {
        this.track('mediter', 'saved');
    },

    /**
     * Nouveau verset de méditation
     */
    trackMeditationNouveau(periode) {
        this.track('mediter', 'nouveau', periode);
    },

    /**
     * Chapelet - mystère choisi
     */
    trackChapelet(mystere) {
        this.track('priere', 'chapelet', mystere);
    },

    /**
     * Lectio Divina lancée
     */
    trackLectioDivina() {
        this.track('priere', 'lectio-divina');
    },

    /**
     * Prière consultée
     */
    trackPriere(priereId) {
        this.track('priere', 'consulter', priereId);
    },

    /**
     * Lecture d'un livre
     */
    trackLecture(livre, chapitre) {
        this.track('lire', livre, `ch${chapitre}`);
    },

    /**
     * Recherche Explorer
     */
    trackRecherche(type) {
        this.track('explorer', 'recherche', type);
    },

    /**
     * Refaire exercice avec mêmes versets
     */
    trackRefaireMemes() {
        this.track('exercice', 'refaire-memes');
    }
};

// Rendre accessible globalement
window.Analytics = Analytics;
