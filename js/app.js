/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Application Principale
 * ═══════════════════════════════════════════════════════════════════════════
 */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log('🙏 Anamnésis - Initialisation...');

    // Vérifier que les données sont chargées
    if (typeof versesData === 'undefined') {
        console.error('❌ Les données des versets ne sont pas chargées !');
        alert('Erreur : Les données de la Bible ne sont pas chargées.');
        return;
    }

    // Vérifier les modules
    const modules = ['App', 'i18n', 'Stats', 'Data', 'UI', 'ClassicMode', 'ReconstitutionMode', 'MysteryMode', 'SuiteMode', 'DictationMode', 'Exercises'];
    let allModulesLoaded = true;
    
    modules.forEach(mod => {
        if (typeof window[mod] === 'undefined') {
            console.error(`❌ Module ${mod} non chargé!`);
            allModulesLoaded = false;
        } else {
            console.log(`✅ Module ${mod} chargé`);
        }
    });
    
    if (!allModulesLoaded) {
        alert('Erreur: Certains modules ne sont pas chargés. Vérifiez la console.');
        return;
    }

    console.log(`📖 ${Data.getTotalVersesCount()} versets disponibles`);

    // Initialiser l'interface
    try {
        UI.initElements();
        
        
        UI.initTabs();
        
        
        UI.initModeButtons();
        
        
        UI.initDifficultyButtons();
        
        
        UI.initSeriesLengthButtons();
        
        
        UI.initReadingButtons();
        
        
        UI.initFilterSelects();
        
        
        UI.initNavigationButtons();
        
    } catch(e) {
        console.error('❌ Erreur UI:', e);
    }

    // Mettre à jour les dropdowns
    try {
        Data.updateFilterDropdowns();
        
    } catch(e) {
        console.error('❌ Erreur Data:', e);
    }

    // Initialiser les exercices
    try {
        Exercises.init();
        
    } catch(e) {
        console.error('❌ Erreur Exercises:', e);
    }

    // Initialiser les onglets
    try {
        ReadTab.init();
        
    } catch(e) {
        console.error('❌ Erreur ReadTab:', e);
    }
    
    try {
        MeditateTab.init();
        
    } catch(e) {
        console.error('❌ Erreur MeditateTab:', e);
    }
    
    try {
        ExploreTab.init();
        
    } catch(e) {
        console.error('❌ Erreur ExploreTab:', e);
    }
    
    try {
        LiturgyTab.init();
        
    } catch(e) {
        console.error('❌ Erreur LiturgyTab:', e);
    }
    
    try {
        PrayerTab.init();
        
    } catch(e) {
        console.error('❌ Erreur PrayerTab:', e);
    }

    try {
        TrouveTonVerset.init();
        
    } catch(e) {
        console.error('❌ Erreur TrouveTonVerset:', e);
    }

    // Charger les statistiques
    try {
        Stats.load();
        
    } catch(e) {
        console.error('❌ Erreur Stats:', e);
    }

    // Activer le premier mode par défaut
    UI.updateOptionsVisibility('classique');

    console.log('✅ Anamnésis initialisé avec succès !');
});

/**
 * Gestion des erreurs globales
 */
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('🔴 Erreur:', msg, 'à la ligne', lineNo, 'dans', url);
    return false;
};
