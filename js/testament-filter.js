// Filtre Testament pour Anamnésis - Version Finale
// Respecte l'architecture existante et coordonne avec ReadTab/ExploreTab

// État du filtre (défaut: NT)
let currentTestamentFilter = localStorage.getItem('testamentFilter') || 'NT';

/**
 * Retourne les versets filtrés selon le testament sélectionné
 * @returns {Object} Les versets filtrés
 */
function getFilteredVerses() {
  if (currentTestamentFilter === 'all') {
    return versesData;
  }
  
  const filtered = {};
  for (const [section, books] of Object.entries(versesData)) {
    const filteredBooks = {};
    for (const [book, verses] of Object.entries(books)) {
      if (verses.length > 0 && verses[0].testament === currentTestamentFilter) {
        filteredBooks[book] = verses;
      }
    }
    if (Object.keys(filteredBooks).length > 0) {
      filtered[section] = filteredBooks;
    }
  }
  return filtered;
}

/**
 * Retourne tous les versets sous forme de tableau plat
 * @returns {Array} Tableau de tous les versets
 */
function getAllVerses() {
  const filtered = getFilteredVerses();
  const allVerses = [];
  for (const section of Object.values(filtered)) {
    for (const verses of Object.values(section)) {
      allVerses.push(...verses);
    }
  }
  return allVerses;
}

/**
 * Rafraîchir l'onglet Exercice
 */
function refreshExerciceTab() {
  const selectPartie = document.getElementById('selectPartie');
  if (!selectPartie) return;
  
  const data = getFilteredVerses();
  const parties = Object.keys(data);
  
  // Reconstruire UNIQUEMENT le menu Partie (les autres menus sont gérés par Data)
  selectPartie.innerHTML = '<option value="toutes">Toutes les parties</option>';
  parties.forEach(partie => {
    const option = document.createElement('option');
    option.value = partie;
    option.textContent = partie;
    selectPartie.appendChild(option);
  });
  
  // Réinitialiser la sélection
  selectPartie.value = 'toutes';
  
  // Mettre à jour App.config
  if (typeof App !== 'undefined' && App.config) {
    App.config.selectedPartie = 'toutes';
    App.config.selectedLivre = 'tous';
    App.config.selectedChapitre = 'tous';
  }
  
  // Laisser Data gérer les dropdowns Livre et Chapitre
  if (typeof Data !== 'undefined' && Data.updateFilterDropdowns) {
    Data.updateFilterDropdowns();
  }
}

/**
 * Rafraîchir l'onglet Lire
 * Utilise les méthodes existantes de ReadTab
 */
function refreshLireTab() {
  const lirePartie = document.getElementById('lirePartie');
  if (!lirePartie || typeof ReadTab === 'undefined') return;
  
  const data = getFilteredVerses();
  const parties = Object.keys(data);
  
  // Reconstruire UNIQUEMENT le menu Partie
  lirePartie.innerHTML = '<option value="">-- Choisir une partie --</option>';
  parties.forEach(partie => {
    const option = document.createElement('option');
    option.value = partie;
    option.textContent = partie;
    lirePartie.appendChild(option);
  });
  
  // Réinitialiser les variables d'état de ReadTab
  ReadTab.selectedPartie = null;
  ReadTab.selectedLivre = null;
  ReadTab.selectedChapitre = null;
  lirePartie.value = '';
  
  // Appeler les méthodes existantes de ReadTab pour gérer Livre et Chapitre
  ReadTab.updateLivreDropdown();
  ReadTab.updateChapitreDropdown();
  ReadTab.displayChapter(); // Vide la zone de lecture
}

/**
 * Rafraîchir l'onglet Explorer
 * Utilise les méthodes existantes d'ExploreTab
 */
function refreshExplorerTab() {
  const explorePartie = document.getElementById('explorePartie');
  if (!explorePartie || typeof ExploreTab === 'undefined') return;
  
  const data = getFilteredVerses();
  const parties = Object.keys(data);
  
  // Reconstruire UNIQUEMENT le menu Partie
  explorePartie.innerHTML = '<option value="toutes">Toutes les parties</option>';
  parties.forEach(partie => {
    const option = document.createElement('option');
    option.value = partie;
    option.textContent = partie;
    explorePartie.appendChild(option);
  });
  
  // Réinitialiser
  explorePartie.value = 'toutes';
  
  // Appeler la méthode existante d'ExploreTab pour gérer le menu Livre
  ExploreTab.updateLivreDropdown();
  
  // Vider les résultats
  const searchResults = document.getElementById('resultsContainer');
  if (searchResults) {
    searchResults.style.display = 'none';
    const versesList = document.getElementById('versesList');
    const countEl = document.getElementById('resultsCount');
    const summaryEl = document.getElementById('resultsSummary');
    if (versesList) versesList.innerHTML = '';
    if (countEl) countEl.textContent = '';
    if (summaryEl) summaryEl.innerHTML = '';
  }
}

/**
 * Rafraîchir tous les onglets
 */
function refreshAllTabs() {
  refreshExerciceTab();
  refreshLireTab();
  refreshExplorerTab();
}

/**
 * Change le filtre et met à jour l'interface
 * @param {string} testament - 'AT', 'NT' ou 'all'
 */
function setTestamentFilter(testament) {
  currentTestamentFilter = testament;
  localStorage.setItem('testamentFilter', testament);
  
  console.log('Testament changé:', testament);
  
  // Synchroniser tous les selects Testament
  document.querySelectorAll('.testament-select').forEach(select => {
    if (select.value !== testament) {
      select.value = testament;
    }
  });
  
  // Rafraîchir TOUS les onglets
  refreshAllTabs();
}

/**
 * Initialiser le filtre au chargement de la page
 */
function initTestamentFilter() {
  // Vérifier que tout est chargé
  if (typeof versesData === 'undefined') {
    console.warn('versesData non chargé, réessai...');
    setTimeout(initTestamentFilter, 100);
    return;
  }
  
  if (typeof Data === 'undefined' || typeof ReadTab === 'undefined' || typeof ExploreTab === 'undefined') {
    console.warn('Modules non chargés, réessai...');
    setTimeout(initTestamentFilter, 100);
    return;
  }
  
  const savedFilter = localStorage.getItem('testamentFilter') || 'NT';
  currentTestamentFilter = savedFilter;
  
  console.log('🔖 Initialisation filtre Testament:', savedFilter);
  
  // Mettre à jour tous les selects Testament
  const testamentSelects = document.querySelectorAll('.testament-select');
  if (testamentSelects.length === 0) {
    console.warn('Aucun select Testament trouvé, réessai...');
    setTimeout(initTestamentFilter, 100);
    return;
  }
  
  testamentSelects.forEach(select => {
    select.value = savedFilter;
    
    // Ajouter le gestionnaire d'événement (une seule fois)
    if (!select.dataset.listenerAdded) {
      select.addEventListener('change', (e) => {
        setTestamentFilter(e.target.value);
      });
      select.dataset.listenerAdded = 'true';
    }
  });
  
  // CRITIQUE : Rafraîchir TOUS les onglets avec le filtre sauvegardé
  // Cela met à jour les menus Partie/Livre/Chapitre selon le Testament
  setTimeout(() => {
    refreshAllTabs();
    console.log('✅ Tous les onglets rafraîchis avec Testament:', savedFilter);
  }, 50);
}

/**
 * Attendre que TOUT soit chargé
 * window.load se déclenche APRÈS DOMContentLoaded (donc après app.js)
 */
window.addEventListener('load', () => {
  // Petit délai pour s'assurer que tous les init() sont terminés
  setTimeout(initTestamentFilter, 100);
});

// Fallback si load est déjà passé
if (document.readyState === 'complete') {
  setTimeout(initTestamentFilter, 100);
}
