/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Mode Verset Mystère
 * ═══════════════════════════════════════════════════════════════════════════
 */

const MysteryMode = {
    /**
     * Démarrer le mode mystère
     */
    start() {
        const page = document.getElementById('mysterePage');
        if (page) page.classList.add('active');
        
        App.state.currentVerseIndex = 0;
        this.displayVerse();
    },

    /**
     * Afficher le verset mystère
     */
    displayVerse() {
        const verse = App.state.currentSeries[App.state.currentVerseIndex];
        const state = App.modes.mystere;
        
        // Reset état
        state.indicesUsed = 0;
        state.currentVerse = verse;
        state.partieRevealed = false;
        state.livreRevealed = false;
        state.chapitreRevealed = false;
        
        // Vérifier les indices auto-révélés via les filtres
        let autoRevealed = 0;
        if (App.config.selectedPartie !== 'toutes') {
            state.partieRevealed = true;
            autoRevealed++;
        }
        if (App.config.selectedLivre !== 'tous') {
            state.livreRevealed = true;
            state.partieRevealed = true;
            autoRevealed++;
        }
        if (App.config.selectedChapitre !== 'tous') {
            state.chapitreRevealed = true;
            state.livreRevealed = true;
            state.partieRevealed = true;
            autoRevealed++;
        }
        
        // Header
        const progressEl = document.getElementById('mystereProgress');
        if (progressEl) progressEl.textContent = `Verset ${App.state.currentVerseIndex + 1} sur ${App.state.currentSeries.length}`;
        
        const progress = ((App.state.currentVerseIndex + 1) / App.state.currentSeries.length) * 100;
        const progressFill = document.getElementById('mystereProgressFill');
        if (progressFill) progressFill.style.width = progress + '%';
        
        // Afficher le texte
        const textEl = document.getElementById('mystereVersetText');
        if (textEl) textEl.textContent = '« ' + verse.text + ' »';
        
        // Réinitialiser les selects
        this.initSelects();
        
        // Mettre à jour les boutons d'indices
        this.updateHintButtons(autoRevealed);
        
        // État des boutons
        const checkBtn = document.getElementById('mystereCheckBtn');
        const nextBtn = document.getElementById('mystereNextBtn');
        const messageEl = document.getElementById('mystereMessage');
        
        if (checkBtn) checkBtn.style.display = 'block';
        if (nextBtn) nextBtn.style.display = 'none';
        if (messageEl) messageEl.innerHTML = '';
    },

    /**
     * Initialiser les selects
     */
    initSelects() {
        const state = App.modes.mystere;
        const verse = state.currentVerse;
        
        // Select Livre
        const selectLivre = document.getElementById('mystereLivre');
        if (selectLivre) {
            selectLivre.innerHTML = '<option value="">-- Livre --</option>';
            
            const livres = Data.getLivres(state.partieRevealed ? verse.partie : null);
            livres.forEach(livre => {
                const option = document.createElement('option');
                option.value = livre.nom;
                option.textContent = livre.nom;
                selectLivre.appendChild(option);
            });
            
            if (state.livreRevealed) {
                selectLivre.value = verse.livre;
                this.onLivreChange();
            }
        }
        
        // Select Chapitre (disabled par défaut)
        const selectChapitre = document.getElementById('mystereChapitre');
        if (selectChapitre) {
            selectChapitre.innerHTML = '<option value="">-- Chapitre --</option>';
            selectChapitre.disabled = !state.livreRevealed;
            
            if (state.chapitreRevealed) {
                selectChapitre.value = verse.chapitre;
                this.onChapitreChange();
            }
        }
        
        // Select Verset (disabled par défaut)
        const selectVerset = document.getElementById('mystereVerset');
        if (selectVerset) {
            selectVerset.innerHTML = '<option value="">-- Verset --</option>';
            selectVerset.disabled = !state.chapitreRevealed;
        }
    },

    /**
     * Mettre à jour les boutons d'indices
     */
    updateHintButtons(autoRevealed) {
        const state = App.modes.mystere;
        
        // Bouton Partie
        const btnPartie = document.getElementById('indicePartie');
        if (btnPartie) {
            if (state.partieRevealed && App.config.selectedPartie !== 'toutes') {
                btnPartie.classList.add('auto-revealed');
                btnPartie.disabled = true;
            } else if (state.partieRevealed) {
                btnPartie.classList.add('used');
                btnPartie.disabled = true;
            } else {
                btnPartie.classList.remove('auto-revealed', 'used');
                btnPartie.disabled = false;
            }
        }
        
        // Bouton Livre
        const btnLivre = document.getElementById('indiceLivre');
        if (btnLivre) {
            if (state.livreRevealed && App.config.selectedLivre !== 'tous') {
                btnLivre.classList.add('auto-revealed');
                btnLivre.disabled = true;
            } else if (state.livreRevealed) {
                btnLivre.classList.add('used');
                btnLivre.disabled = true;
            } else {
                btnLivre.classList.remove('auto-revealed', 'used');
                btnLivre.disabled = false;
            }
        }
        
        // Bouton Chapitre
        const btnChapitre = document.getElementById('indiceChapitre');
        if (btnChapitre) {
            if (state.chapitreRevealed && App.config.selectedChapitre !== 'tous') {
                btnChapitre.classList.add('auto-revealed');
                btnChapitre.disabled = true;
            } else if (state.chapitreRevealed) {
                btnChapitre.classList.add('used');
                btnChapitre.disabled = true;
            } else {
                btnChapitre.classList.remove('auto-revealed', 'used');
                btnChapitre.disabled = false;
            }
        }
    },

    /**
     * Révéler un indice
     * @param {string} type - 'partie', 'livre', ou 'chapitre'
     */
    revealHint(type) {
        const state = App.modes.mystere;
        const verse = state.currentVerse;
        
        switch (type) {
            case 'partie':
                if (!state.partieRevealed) {
                    state.partieRevealed = true;
                    state.indicesUsed++;
                    // Filtrer les livres par partie
                    this.filterLivresByPartie(verse.partie);
                }
                break;
                
            case 'livre':
                // Révèle aussi la partie
                if (!state.partieRevealed) {
                    state.partieRevealed = true;
                }
                if (!state.livreRevealed) {
                    state.livreRevealed = true;
                    state.indicesUsed++;
                    document.getElementById('mystereLivre').value = verse.livre;
                    this.onLivreChange();
                }
                break;
                
            case 'chapitre':
                // Révèle aussi partie et livre
                if (!state.partieRevealed) state.partieRevealed = true;
                if (!state.livreRevealed) {
                    state.livreRevealed = true;
                    document.getElementById('mystereLivre').value = verse.livre;
                    this.onLivreChange();
                }
                if (!state.chapitreRevealed) {
                    state.chapitreRevealed = true;
                    state.indicesUsed++;
                    document.getElementById('mystereChapitre').value = verse.chapitre;
                    this.onChapitreChange();
                }
                break;
        }
        
        this.updateHintButtons(0);
    },

    /**
     * Filtrer les livres par partie
     */
    filterLivresByPartie(partie) {
        const selectLivre = document.getElementById('mystereLivre');
        const currentValue = selectLivre.value;
        
        selectLivre.innerHTML = '<option value="">-- Livre --</option>';
        
        const livres = Data.getLivres(partie);
        livres.forEach(livre => {
            const option = document.createElement('option');
            option.value = livre.nom;
            option.textContent = livre.nom;
            selectLivre.appendChild(option);
        });
        
        selectLivre.value = currentValue;
    },

    /**
     * Quand le livre change
     */
    onLivreChange() {
        const livre = document.getElementById('mystereLivre').value;
        const selectChapitre = document.getElementById('mystereChapitre');
        const selectVerset = document.getElementById('mystereVerset');
        
        selectChapitre.innerHTML = '<option value="">-- Chapitre --</option>';
        selectVerset.innerHTML = '<option value="">-- Verset --</option>';
        
        if (!livre) {
            selectChapitre.disabled = true;
            selectVerset.disabled = true;
            return;
        }
        
        selectChapitre.disabled = false;
        
        const chapitres = Data.getChapitres(livre);
        chapitres.forEach(chap => {
            const option = document.createElement('option');
            option.value = chap;
            option.textContent = 'Chapitre ' + chap;
            selectChapitre.appendChild(option);
        });
    },

    /**
     * Quand le chapitre change
     */
    onChapitreChange() {
        const livre = document.getElementById('mystereLivre').value;
        const chapitre = document.getElementById('mystereChapitre').value;
        const selectVerset = document.getElementById('mystereVerset');
        
        selectVerset.innerHTML = '<option value="">-- Verset --</option>';
        
        if (!chapitre) {
            selectVerset.disabled = true;
            return;
        }
        
        selectVerset.disabled = false;
        
        const versets = Data.getVersetsParLivre(livre).filter(v => v.chapitre === parseInt(chapitre));
        versets.forEach(v => {
            const option = document.createElement('option');
            option.value = v.verset;
            option.textContent = 'Verset ' + v.verset;
            selectVerset.appendChild(option);
        });
    },

    /**
     * Vérifier la réponse
     */
    check() {
        const state = App.modes.mystere;
        const verse = state.currentVerse;
        
        const selectedLivre = document.getElementById('mystereLivre').value;
        const selectedChapitre = document.getElementById('mystereChapitre').value;
        const selectedVerset = document.getElementById('mystereVerset').value;
        
        const correct = selectedLivre === verse.livre &&
                       parseInt(selectedChapitre) === verse.chapitre &&
                       parseInt(selectedVerset) === verse.verset;
        
        Stats.recordAttempt('mystere', correct, correct ? verse.reference : null);
        
        App.state.seriesResults.attempts.push({
            verse: verse.reference,
            correct: correct
        });
        
        const messageEl = document.getElementById('mystereMessage');
        
        if (correct) {
            App.state.seriesResults.correct++;
            
            const points = Math.max(20, 100 - state.indicesUsed * 30);
            if (messageEl) {
                messageEl.innerHTML = `<div class="message success">${i18n.messages.success} ${i18n.format(i18n.mystery.points, { n: points })}</div>`;
            }
            
            document.getElementById('mystereCheckBtn').style.display = 'none';
            document.getElementById('mystereNextBtn').style.display = 'block';
        } else {
            if (messageEl) {
                messageEl.innerHTML = `<div class="message error">${i18n.messages.error}<br>La bonne réponse était : <strong>${verse.reference}</strong></div>`;
            }
            
            document.getElementById('mystereCheckBtn').style.display = 'none';
            document.getElementById('mystereNextBtn').style.display = 'block';
        }
    },

    /**
     * Passer au verset suivant
     */
    next() {
        App.state.currentVerseIndex++;
        
        if (App.state.currentVerseIndex >= App.state.currentSeries.length) {
            document.getElementById('mysterePage').classList.remove('active');
            UI.showResults();
        } else {
            this.displayVerse();
        }
    },

    /**
     * Initialiser les événements
     */
    init() {
        // Indices
        document.getElementById('indicePartie')?.addEventListener('click', () => this.revealHint('partie'));
        document.getElementById('indiceLivre')?.addEventListener('click', () => this.revealHint('livre'));
        document.getElementById('indiceChapitre')?.addEventListener('click', () => this.revealHint('chapitre'));
        
        // Selects
        document.getElementById('mystereLivre')?.addEventListener('change', () => this.onLivreChange());
        document.getElementById('mystereChapitre')?.addEventListener('change', () => this.onChapitreChange());
        
        // Boutons
        document.getElementById('mystereCheckBtn')?.addEventListener('click', () => this.check());
        document.getElementById('mystereNextBtn')?.addEventListener('click', () => this.next());
        document.getElementById('mystereHomeBtn')?.addEventListener('click', () => UI.returnHome());
    }
};

// Rendre accessible globalement
window.MysteryMode = MysteryMode;
