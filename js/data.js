/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Module Données
 * ═══════════════════════════════════════════════════════════════════════════
 */

const Data = {
    /**
     * Obtenir la liste des parties du Nouveau Testament
     * @returns {string[]}
     */
    getParties() {
        return Object.keys(versesData);
    },

    /**
     * Obtenir la liste des livres
     * @param {string} partie - Filtrer par partie (optionnel)
     * @returns {Array<{nom: string, partie: string}>}
     */
    getLivres(partie = null) {
        const livres = [];
        
        Object.keys(versesData).forEach(p => {
            if (partie && partie !== 'toutes' && p !== partie) return;
            
            Object.keys(versesData[p]).forEach(livre => {
                livres.push({ nom: livre, partie: p });
            });
        });
        
        return livres;
    },

    /**
     * Obtenir les chapitres d'un livre
     * @param {string} livre - Nom du livre
     * @returns {number[]}
     */
    getChapitres(livre) {
        const chapitres = new Set();
        
        Object.keys(versesData).forEach(partie => {
            if (versesData[partie][livre]) {
                versesData[partie][livre].forEach(v => {
                    chapitres.add(v.chapitre);
                });
            }
        });
        
        return Array.from(chapitres).sort((a, b) => a - b);
    },

    /**
     * Obtenir tous les versets d'un livre
     * @param {string} livre - Nom du livre
     * @returns {Array}
     */
    getVersetsParLivre(livre) {
        let versets = [];
        
        Object.keys(versesData).forEach(partie => {
            if (versesData[partie][livre]) {
                versets = versets.concat(versesData[partie][livre]);
            }
        });
        
        return versets;
    },

    /**
     * Obtenir les versets filtrés selon la configuration
     * @returns {Array}
     */
    getFilteredVerses() {
        const { selectedPartie, selectedLivre, selectedChapitre } = App.config;
        let verses = [];
        
        if (selectedLivre !== 'tous') {
            // Filtrer par livre
            if (selectedPartie === 'toutes') {
                Object.keys(versesData).forEach(partie => {
                    if (versesData[partie][selectedLivre]) {
                        verses = verses.concat(versesData[partie][selectedLivre]);
                    }
                });
            } else {
                if (versesData[selectedPartie] && versesData[selectedPartie][selectedLivre]) {
                    verses = versesData[selectedPartie][selectedLivre];
                }
            }
            
            // Filtrer par chapitre si spécifié
            if (selectedChapitre !== 'tous') {
                verses = verses.filter(v => v.chapitre === parseInt(selectedChapitre));
            }
        } else if (selectedPartie !== 'toutes') {
            // Filtrer par partie uniquement
            Object.values(versesData[selectedPartie] || {}).forEach(livreVerses => {
                verses = verses.concat(livreVerses);
            });
        } else {
            // Tous les versets
            Object.values(versesData).forEach(partie => {
                Object.values(partie).forEach(livreVerses => {
                    verses = verses.concat(livreVerses);
                });
            });
        }
        
        return verses;
    },

    /**
     * Créer une série de versets consécutifs
     * @returns {Array}
     */
    createRandomSeries() {
        let verses = this.getFilteredVerses();
        
        // Trier par livre, chapitre, verset
        verses.sort((a, b) => {
            if (a.livre !== b.livre) return a.livre.localeCompare(b.livre);
            if (a.chapitre !== b.chapitre) return a.chapitre - b.chapitre;
            return a.verset - b.verset;
        });
        
        const count = App.config.seriesLength;
        
        if (verses.length <= count) {
            return verses;
        }
        
        // Choisir un point de départ aléatoire
        const maxStart = verses.length - count;
        const startIndex = Math.floor(Math.random() * (maxStart + 1));
        
        return verses.slice(startIndex, startIndex + count);
    },

    /**
     * Obtenir TOUS les versets (sans filtre)
     * @returns {Array}
     */
    getAllVerses() {
        let verses = [];
        Object.values(versesData).forEach(partie => {
            Object.values(partie).forEach(livreVerses => {
                verses = verses.concat(livreVerses);
            });
        });
        return verses;
    },

    /**
     * Obtenir un verset aléatoire
     * @param {string} partie - Filtrer par partie (optionnel)
     * @returns {Object}
     */
    getRandomVerse(partie = null) {
        let verses = [];
        
        if (partie && partie !== 'toutes') {
            Object.values(versesData[partie] || {}).forEach(livreVerses => {
                verses = verses.concat(livreVerses);
            });
        } else {
            verses = this.getFilteredVerses();
        }
        
        if (verses.length === 0) return null;
        
        const randomIndex = Math.floor(Math.random() * verses.length);
        return verses[randomIndex];
    },

    /**
     * Rechercher dans les versets
     * @param {string} query - Texte à rechercher
     * @returns {Array}
     */
    search(query) {
        if (!query || query.length < 2) return [];
        
        const normalizedQuery = query.toLowerCase().trim();
        const results = [];
        
        Object.values(versesData).forEach(partie => {
            Object.values(partie).forEach(livreVerses => {
                livreVerses.forEach(verse => {
                    if (verse.text.toLowerCase().includes(normalizedQuery)) {
                        results.push(verse);
                    }
                });
            });
        });
        
        return results;
    },

    /**
     * Mettre à jour les dropdowns de filtres
     */
    updateFilterDropdowns() {
        this.updateLivreDropdown();
        this.updateChapitreDropdown();
    },

    /**
     * Mettre à jour le dropdown des livres
     */
    updateLivreDropdown() {
        const selectLivre = document.getElementById('selectLivre');
        if (!selectLivre) return;
        
        const { selectedPartie } = App.config;
        
        selectLivre.innerHTML = '<option value="tous">Tous les livres</option>';
        
        const livres = this.getLivres(selectedPartie);
        livres.forEach(livre => {
            const option = document.createElement('option');
            option.value = livre.nom;
            option.textContent = livre.nom;
            selectLivre.appendChild(option);
        });
        
        App.config.selectedLivre = 'tous';
        App.config.selectedChapitre = 'tous';
    },

    /**
     * Mettre à jour le dropdown des chapitres
     */
    updateChapitreDropdown() {
        const selectChapitre = document.getElementById('selectChapitre');
        if (!selectChapitre) return;
        
        const { selectedLivre } = App.config;
        
        selectChapitre.innerHTML = '<option value="tous">Tous les chapitres</option>';
        
        if (selectedLivre === 'tous') {
            App.config.selectedChapitre = 'tous';
            return;
        }
        
        const chapitres = this.getChapitres(selectedLivre);
        chapitres.forEach(chap => {
            const option = document.createElement('option');
            option.value = chap;
            option.textContent = 'Chapitre ' + chap;
            selectChapitre.appendChild(option);
        });
        
        App.config.selectedChapitre = 'tous';
    },

    /**
     * Obtenir le nombre total de versets
     * @returns {number}
     */
    getTotalVersesCount() {
        let count = 0;
        Object.values(versesData).forEach(partie => {
            Object.values(partie).forEach(livreVerses => {
                count += livreVerses.length;
            });
        });
        return count;
    }
};

// Rendre accessible globalement
window.Data = Data;
