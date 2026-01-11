/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Module Données
 * ═══════════════════════════════════════════════════════════════════════════
 */

const Data = {
    /**
     * Obtenir les données filtrées par le filtre Testament
     * (utilise le filtre global si disponible, sinon versesData brut)
     */
    _getData() {
        return (typeof getFilteredVerses === 'function') ? getFilteredVerses() : versesData;
    },

    
    /**
     * Obtenir la liste des parties (selon le filtre Testament actif)
     * @returns {string[]}
     */
    getParties() {
        const data = (typeof getFilteredVerses === 'function') ? getFilteredVerses() : this._getData();
        return Object.keys(data);
    },

    /**
     * Obtenir la liste des livres
     * @param {string} partie - Filtrer par partie (optionnel)
     * @returns {Array<{nom: string, partie: string}>}
     */
    getLivres(partie = null) {
        const livres = [];
        
        Object.keys(this._getData()).forEach(p => {
            if (partie && partie !== 'toutes' && p !== partie) return;
            
            Object.keys(this._getData()[p]).forEach(livre => {
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
        
        Object.keys(this._getData()).forEach(partie => {
            if (this._getData()[partie][livre]) {
                this._getData()[partie][livre].forEach(v => {
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
        
        Object.keys(this._getData()).forEach(partie => {
            if (this._getData()[partie][livre]) {
                versets = versets.concat(this._getData()[partie][livre]);
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
                Object.keys(this._getData()).forEach(partie => {
                    if (this._getData()[partie][selectedLivre]) {
                        verses = verses.concat(this._getData()[partie][selectedLivre]);
                    }
                });
            } else {
                if (this._getData()[selectedPartie] && this._getData()[selectedPartie][selectedLivre]) {
                    verses = this._getData()[selectedPartie][selectedLivre];
                }
            }
            
            // Filtrer par chapitre si spécifié
            if (selectedChapitre !== 'tous') {
                verses = verses.filter(v => v.chapitre === parseInt(selectedChapitre));
            }
        } else if (selectedPartie !== 'toutes') {
            // Filtrer par partie uniquement
            Object.values(this._getData()[selectedPartie] || {}).forEach(livreVerses => {
                verses = verses.concat(livreVerses);
            });
        } else {
            // Tous les versets
            Object.values(this._getData()).forEach(partie => {
                Object.values(partie).forEach(livreVerses => {
                    verses = verses.concat(livreVerses);
                });
            });
        }
        
        return verses;
    },

    /**
     * Extraire les versets depuis des ranges
     * @param {Array} ranges - Tableau de ranges {livre, chapitre, debut, fin}
     * @returns {Array}
     */
    extractVersesFromRanges(ranges) {
        let verses = [];
        
        ranges.forEach(range => {
            // Accès DIRECT à versesData sans filtre Testament
            // pour permettre de mélanger AT et NT dans les passages/groupes
            let livreVerses = [];
            Object.keys(versesData).forEach(partie => {
                if (versesData[partie][range.livre]) {
                    livreVerses = livreVerses.concat(versesData[partie][range.livre]);
                }
            });
            
            const filtered = livreVerses.filter(v => {
                return v.chapitre === range.chapitre && 
                       v.verset >= range.debut && 
                       v.verset <= range.fin;
            });
            
            verses = verses.concat(filtered);
        });
        
        // Trier par ordre biblique
        verses.sort((a, b) => {
            if (a.livre !== b.livre) return a.livre.localeCompare(b.livre);
            if (a.chapitre !== b.chapitre) return a.chapitre - b.chapitre;
            return a.verset - b.verset;
        });
        
        return verses;
    },

    /**
     * Créer une série de versets selon le mode de contenu sélectionné
     * @returns {Array}
     */
    createRandomSeries() {
        let verses = [];
        
        // Récupérer les versets selon le mode
        switch (App.config.contentMode) {
            case 'passage':
                // Passage célèbre
                if (!App.config.selectedPassageId) {
                    console.error('Aucun passage sélectionné');
                    return [];
                }
                const passage = this.getPassageById(App.config.selectedPassageId);
                if (!passage) {
                    console.error('Passage introuvable:', App.config.selectedPassageId);
                    return [];
                }
                verses = this.extractVersesFromRanges(passage.ranges);
                break;
                
            case 'custom':
                // Groupe personnalisé
                if (!App.config.selectedCustomGroupId) {
                    console.error('Aucun groupe sélectionné');
                    return [];
                }
                const group = CustomGroups.getById(App.config.selectedCustomGroupId);
                if (!group) {
                    console.error('Groupe introuvable:', App.config.selectedCustomGroupId);
                    return [];
                }
                verses = this.extractVersesFromRanges(group.ranges);
                break;
                
            default:
                // Filtres classiques
                verses = this.getFilteredVerses();
        }
        
        if (verses.length === 0) {
            console.error('Aucun verset trouvé');
            return [];
        }
        
        // Trier par ordre biblique
        verses.sort((a, b) => {
            if (a.livre !== b.livre) return a.livre.localeCompare(b.livre);
            if (a.chapitre !== b.chapitre) return a.chapitre - b.chapitre;
            return a.verset - b.verset;
        });
        
        // Sélectionner les versets selon seriesLength
        if (App.config.seriesLength === 'all') {
            // Limite de sécurité : max 50 versets
            return verses.slice(0, 50);
        }
        
        const count = App.config.seriesLength;
        
        if (verses.length <= count) {
            return verses;
        }
        
        // Choisir un point de départ aléatoire pour une séquence consécutive
        const maxStart = verses.length - count;
        const startIndex = Math.floor(Math.random() * (maxStart + 1));
        
        return verses.slice(startIndex, startIndex + count);
    },

    /**
     * Obtenir un passage célèbre par ID
     * @param {string} id - ID du passage
     * @returns {Object|null}
     */
    getPassageById(id) {
        if (!window.PASSAGES_CELEBRES) return null;
        
        const allPassages = [
            ...PASSAGES_CELEBRES.at,
            ...PASSAGES_CELEBRES.nt
        ];
        
        return allPassages.find(p => p.id === id) || null;
    },

    /**
     * Obtenir TOUS les versets (sans filtre)
     * @returns {Array}
     */
    getAllVerses() {
        let verses = [];
        Object.values(this._getData()).forEach(partie => {
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
            Object.values(this._getData()[partie] || {}).forEach(livreVerses => {
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
        
        Object.values(this._getData()).forEach(partie => {
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
        Object.values(this._getData()).forEach(partie => {
            Object.values(partie).forEach(livreVerses => {
                count += livreVerses.length;
            });
        });
        return count;
    }
};

// Rendre accessible globalement
window.Data = Data;
