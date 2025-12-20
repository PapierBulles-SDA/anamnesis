/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Onglet Explorer (Recherche)
 * ═══════════════════════════════════════════════════════════════════════════
 */

const ExploreTab = {
    results: [],
    currentQuery: '',

    /**
     * Effectuer une recherche
     */
    search() {
        const query = document.getElementById('searchInput')?.value.trim();
        const partie = document.getElementById('explorePartie')?.value || 'toutes';
        const livre = document.getElementById('exploreLivre')?.value || 'tous';
        const mode = document.querySelector('input[name="searchMode"]:checked')?.value || 'ET';
        
        if (!query || query.length < 2) {
            this.showError('Entrez au moins 2 caractères pour rechercher.');
            return;
        }

        this.currentQuery = query;

        // Récupérer TOUS les versets
        let versets = Data.getAllVerses();
        
        // Appliquer les filtres de l'onglet Explorer
        if (partie !== 'toutes') {
            versets = versets.filter(v => v.partie === partie);
        }
        if (livre !== 'tous') {
            versets = versets.filter(v => v.livre === livre);
        }

        // Séparer les mots par virgules ou espaces
        const words = query.toLowerCase()
            .split(/[,\s]+/)
            .map(w => w.trim())
            .filter(w => w.length > 0);
        
        // Rechercher
        this.results = versets.filter(verse => {
            const text = verse.text.toLowerCase();
            if (mode === 'ET') {
                return words.every(word => text.includes(word));
            } else {
                return words.some(word => text.includes(word));
            }
        });

        // Trier par livre, chapitre, verset
        this.results.sort((a, b) => {
            if (a.livre !== b.livre) return a.livre.localeCompare(b.livre);
            if (a.chapitre !== b.chapitre) return a.chapitre - b.chapitre;
            return a.verset - b.verset;
        });

        this.displayResults();
    },

    /**
     * Afficher les résultats
     */
    displayResults() {
        const container = document.getElementById('resultsContainer');
        const countEl = document.getElementById('resultsCount');
        const summaryEl = document.getElementById('resultsSummary');
        const listEl = document.getElementById('versesList');
        const toggleBtn = document.getElementById('toggleVersesBtn');
        
        // Afficher le conteneur
        if (container) {
            container.style.display = 'block';
        }
        
        // Nombre de résultats
        if (countEl) {
            countEl.textContent = this.results.length + ' verset(s) trouvé(s)';
        }

        // Résumé par livre - TOUS les livres
        if (summaryEl) {
            if (this.results.length === 0) {
                summaryEl.innerHTML = '';
            } else {
                const byBook = {};
                this.results.forEach(v => {
                    byBook[v.livre] = (byBook[v.livre] || 0) + 1;
                });

                // Trier par nombre décroissant
                const sortedBooks = Object.entries(byBook).sort((a, b) => b[1] - a[1]);
                
                let html = '<div class="results-summary-title">📚 Répartition par livre :</div>';
                html += '<div class="results-by-book">';
                sortedBooks.forEach(([livre, count]) => {
                    html += `<span class="book-badge" data-livre="${livre}">${livre} <strong>(${count})</strong></span>`;
                });
                html += '</div>';
                summaryEl.innerHTML = html;

                // Clic sur un badge pour filtrer
                summaryEl.querySelectorAll('.book-badge').forEach(badge => {
                    badge.addEventListener('click', () => {
                        const livre = badge.dataset.livre;
                        this.filterResultsByBook(livre);
                    });
                });
            }
        }

        // Liste des versets
        if (listEl) {
            if (this.results.length === 0) {
                listEl.innerHTML = '<p class="no-results">😕 Aucun verset trouvé pour "<strong>' + this.escapeHtml(this.currentQuery) + '</strong>"</p>';
                listEl.style.display = 'block';
            } else {
                let html = '';
                const maxDisplay = Math.min(100, this.results.length);
                
                this.results.slice(0, maxDisplay).forEach(verse => {
                    const highlightedText = this.highlightText(verse.text);
                    html += `
                        <div class="result-verse" data-ref="${verse.reference}">
                            <div class="result-ref">${verse.reference}</div>
                            <div class="result-text">${highlightedText}</div>
                        </div>
                    `;
                });

                if (this.results.length > maxDisplay) {
                    html += `<p class="results-more">📖 ... et ${this.results.length - maxDisplay} autres versets</p>`;
                }

                listEl.innerHTML = html;
                listEl.style.display = 'block';

                // Événements de clic pour copier
                listEl.querySelectorAll('.result-verse').forEach(el => {
                    el.addEventListener('click', () => {
                        const ref = el.dataset.ref;
                        this.copyToClipboard(ref, el);
                    });
                });
            }
        }

        // Bouton toggle
        if (toggleBtn) {
            toggleBtn.style.display = this.results.length > 0 ? 'block' : 'none';
            toggleBtn.textContent = '▼ Masquer les versets';
        }
    },

    /**
     * Filtrer les résultats affichés par livre
     */
    filterResultsByBook(livre) {
        const listEl = document.getElementById('versesList');
        if (!listEl) return;

        const filtered = this.results.filter(v => v.livre === livre);
        
        let html = '<div class="filter-active">📖 Filtré sur <strong>' + livre + '</strong> (' + filtered.length + ' versets) <button class="clear-filter-btn" onclick="ExploreTab.displayResults()">✕ Voir tous</button></div>';
        
        filtered.forEach(verse => {
            const highlightedText = this.highlightText(verse.text);
            html += `
                <div class="result-verse" data-ref="${verse.reference}">
                    <div class="result-ref">${verse.reference}</div>
                    <div class="result-text">${highlightedText}</div>
                </div>
            `;
        });

        listEl.innerHTML = html;

        // Événements de clic
        listEl.querySelectorAll('.result-verse').forEach(el => {
            el.addEventListener('click', () => {
                const ref = el.dataset.ref;
                this.copyToClipboard(ref, el);
            });
        });
    },

    /**
     * Basculer l'affichage des versets
     */
    toggleVerses() {
        const listEl = document.getElementById('versesList');
        const toggleBtn = document.getElementById('toggleVersesBtn');

        if (!listEl) return;

        const isVisible = listEl.style.display !== 'none';
        
        if (isVisible) {
            listEl.style.display = 'none';
            if (toggleBtn) toggleBtn.textContent = '▶ Voir les versets';
        } else {
            listEl.style.display = 'block';
            if (toggleBtn) toggleBtn.textContent = '▼ Masquer les versets';
        }
    },

    /**
     * Compter les versets filtrés
     */
    countVerses() {
        const partie = document.getElementById('explorePartie')?.value || 'toutes';
        const livre = document.getElementById('exploreLivre')?.value || 'tous';
        
        let versets = Data.getAllVerses();
        
        if (partie !== 'toutes') {
            versets = versets.filter(v => v.partie === partie);
        }
        if (livre !== 'tous') {
            versets = versets.filter(v => v.livre === livre);
        }

        this.showContainer();

        const summaryEl = document.getElementById('resultsSummary');
        const countEl = document.getElementById('resultsCount');
        const listEl = document.getElementById('versesList');
        const toggleBtn = document.getElementById('toggleVersesBtn');

        if (countEl) {
            const label = livre !== 'tous' ? livre : (partie !== 'toutes' ? partie : 'le Nouveau Testament');
            countEl.textContent = versets.length + ' versets dans ' + label;
        }

        if (summaryEl) {
            const byBook = {};
            versets.forEach(v => {
                byBook[v.livre] = (byBook[v.livre] || 0) + 1;
            });

            let html = '<div class="results-summary-title">📚 Répartition par livre :</div>';
            html += '<div class="results-by-book">';
            Object.entries(byBook)
                .sort((a, b) => b[1] - a[1])
                .forEach(([livre, count]) => {
                    html += '<span class="book-badge">' + livre + ' <strong>(' + count + ')</strong></span>';
                });
            html += '</div>';
            summaryEl.innerHTML = html;
        }

        if (listEl) listEl.style.display = 'none';
        if (toggleBtn) toggleBtn.style.display = 'none';
    },

    /**
     * Afficher les mots fréquents
     */
    showFrequentWords() {
        const partie = document.getElementById('explorePartie')?.value || 'toutes';
        
        this.showContainer();
        
        let versets = Data.getAllVerses();
        if (partie !== 'toutes') {
            versets = versets.filter(v => v.partie === partie);
        }

        // Compter les mots
        const wordCount = {};
        const excludedWords = ['le', 'la', 'les', 'un', 'une', 'des', 'de', 'du', 'et', 'ou', 'à', 'au', 
            'en', 'dans', 'pour', 'par', 'sur', 'car', 'que', 'qui', 'est', 'son', 'sa', 'ses', 
            'ce', 'cet', 'cette', 'ces', 'mais', 'donc', 'or', 'ni', 'ne', 'pas', 'plus', 
            'il', 'elle', 'ils', 'elles', 'je', 'tu', 'nous', 'vous', 'on', 'se', 'lui',
            'a', 'ai', 'as', 'ont', 'été', 'être', 'avoir', 'fait', 'dit', 'fut', 'sont',
            'tout', 'tous', 'toute', 'toutes', 'leur', 'leurs', 'avec', 'sans', 'comme',
            'quand', 'si', 'eux', 'aussi', 'même', 'ceux', 'celui', 'celle', 'celles'];

        versets.forEach(v => {
            const words = v.text.toLowerCase().replace(/[.,;:!?«»""''()-]/g, '').split(/\s+/);
            words.forEach(word => {
                if (word.length > 3 && !excludedWords.includes(word)) {
                    wordCount[word] = (wordCount[word] || 0) + 1;
                }
            });
        });

        // Top 40
        const top = Object.entries(wordCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 40);

        const summaryEl = document.getElementById('resultsSummary');
        const countEl = document.getElementById('resultsCount');
        const listEl = document.getElementById('versesList');
        const toggleBtn = document.getElementById('toggleVersesBtn');

        if (countEl) {
            countEl.textContent = 'Top 40 des mots les plus fréquents';
        }

        if (summaryEl) {
            let html = '<div class="word-cloud">';
            const maxCount = top[0][1];
            top.forEach(([word, count]) => {
                const size = Math.max(13, Math.min(28, 13 + (count / maxCount) * 15));
                const opacity = 0.6 + (count / maxCount) * 0.4;
                html += '<span class="word-item" style="font-size: ' + size + 'px; opacity: ' + opacity + ';" ';
                html += 'onclick="document.getElementById(\'searchInput\').value=\'' + word + '\'; ExploreTab.search();" ';
                html += 'title="Cliquez pour rechercher">' + word + ' (' + count + ')</span>';
            });
            html += '</div>';
            summaryEl.innerHTML = html;
        }

        if (listEl) listEl.style.display = 'none';
        if (toggleBtn) toggleBtn.style.display = 'none';
    },

    /**
     * Afficher les statistiques
     */
    showStats() {
        this.showContainer();
        
        const summaryEl = document.getElementById('resultsSummary');
        const countEl = document.getElementById('resultsCount');
        const listEl = document.getElementById('versesList');
        const toggleBtn = document.getElementById('toggleVersesBtn');

        const versets = Data.getAllVerses();
        
        // Stats par partie
        const byPartie = {};
        versets.forEach(v => {
            byPartie[v.partie] = (byPartie[v.partie] || 0) + 1;
        });

        if (countEl) {
            countEl.textContent = versets.length + ' versets au total';
        }

        if (summaryEl) {
            let html = '<div class="stats-section">';
            html += '<div class="results-summary-title">📊 Répartition par partie du Nouveau Testament :</div>';
            html += '<div class="stats-chart">';
            
            Object.entries(byPartie)
                .sort((a, b) => b[1] - a[1])
                .forEach(([partie, count]) => {
                    const percent = Math.round((count / versets.length) * 100);
                    html += '<div class="stat-bar">';
                    html += '<span class="stat-label">' + partie + '</span>';
                    html += '<div class="stat-bar-container">';
                    html += '<div class="stat-bar-fill" style="width: ' + percent + '%"></div>';
                    html += '</div>';
                    html += '<span class="stat-value">' + count + ' (' + percent + '%)</span>';
                    html += '</div>';
                });
            
            html += '</div></div>';
            summaryEl.innerHTML = html;
        }

        if (listEl) listEl.style.display = 'none';
        if (toggleBtn) toggleBtn.style.display = 'none';
    },

    /**
     * Mettre en évidence le texte recherché
     */
    highlightText(text) {
        if (!this.currentQuery) return text;
        
        const words = this.currentQuery.toLowerCase()
            .split(/[,\s]+/)
            .map(w => w.trim())
            .filter(w => w.length > 0);
        
        let result = text;
        words.forEach(word => {
            const regex = new RegExp('(' + this.escapeRegex(word) + ')', 'gi');
            result = result.replace(regex, '<mark>$1</mark>');
        });
        return result;
    },

    /**
     * Échapper les caractères spéciaux pour regex
     */
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    },

    /**
     * Échapper le HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    /**
     * Afficher une erreur
     */
    showError(msg) {
        this.showContainer();
        const countEl = document.getElementById('resultsCount');
        const summaryEl = document.getElementById('resultsSummary');
        const listEl = document.getElementById('versesList');
        
        if (countEl) countEl.textContent = '⚠️ ' + msg;
        if (summaryEl) summaryEl.innerHTML = '';
        if (listEl) listEl.style.display = 'none';
    },

    /**
     * Afficher le conteneur de résultats
     */
    showContainer() {
        const container = document.getElementById('resultsContainer');
        if (container) {
            container.style.display = 'block';
        }
    },

    /**
     * Copier dans le presse-papier
     */
    copyToClipboard(text, element) {
        navigator.clipboard.writeText(text).then(() => {
            // Message de confirmation
            const msg = document.createElement('span');
            msg.className = 'copied-message';
            msg.textContent = '📋 Référence copiée !';
            element.appendChild(msg);
            
            setTimeout(() => msg.remove(), 1500);
        }).catch(() => {
            alert('Référence : ' + text);
        });
    },

    /**
     * Mettre à jour le dropdown des livres
     */
    updateLivreDropdown() {
        const partie = document.getElementById('explorePartie')?.value || 'toutes';
        const select = document.getElementById('exploreLivre');
        
        if (!select) return;

        select.innerHTML = '<option value="tous">Tous les livres</option>';

        const livres = Data.getLivres(partie !== 'toutes' ? partie : null);
        livres.forEach(livre => {
            const option = document.createElement('option');
            option.value = livre.nom;
            option.textContent = livre.nom;
            select.appendChild(option);
        });
    },

    /**
     * Initialiser les événements
     */
    init() {
        // Bouton rechercher
        document.getElementById('searchBtn')?.addEventListener('click', () => this.search());
        
        // Recherche sur Entrée
        document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.search();
        });

        // Actions rapides
        document.getElementById('countBtn')?.addEventListener('click', () => this.countVerses());
        document.getElementById('statsBtn')?.addEventListener('click', () => this.showStats());
        document.getElementById('wordsBtn')?.addEventListener('click', () => this.showFrequentWords());

        // Toggle versets
        document.getElementById('toggleVersesBtn')?.addEventListener('click', () => this.toggleVerses());

        // Filtres
        document.getElementById('explorePartie')?.addEventListener('change', () => this.updateLivreDropdown());
    }
};

// Rendre accessible globalement
window.ExploreTab = ExploreTab;
