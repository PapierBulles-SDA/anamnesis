/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Mode Reconstitution
 * ═══════════════════════════════════════════════════════════════════════════
 */

const ReconstitutionMode = {
    /**
     * Démarrer le mode reconstitution
     */
    start() {
        const page = document.getElementById('reconstitutionPage');
        if (page) page.classList.add('active');
        
        App.state.currentVerseIndex = 0;
        
        if (App.config.readingFirst) {
            this.showReading();
        } else {
            document.getElementById('reconstitutionReading').style.display = 'none';
            document.getElementById('reconstitutionExercise').style.display = 'block';
            this.displayVerse();
        }
    },

    /**
     * Afficher la lecture préalable (tous les versets de la série)
     */
    showReading() {
        const title = document.getElementById('reconstitutionRef');
        const progress = document.getElementById('reconstitutionProgress');
        const progressFill = document.getElementById('reconstitutionProgressFill');
        
        if (title) title.textContent = App.state.currentSeries[0].livre;
        if (progress) progress.textContent = `${App.state.currentSeries.length} versets à mémoriser`;
        if (progressFill) progressFill.style.width = '0%';
        
        // Afficher TOUS les versets de la série
        let html = '';
        App.state.currentSeries.forEach((verse, i) => {
            html += `
                <div class="reading-verse-item">
                    <div class="reading-verse-ref">${i + 1}. ${verse.reference}</div>
                    <div class="reading-verse-text">${verse.text}</div>
                </div>
            `;
        });
        
        const readingText = document.getElementById('reconstitutionReadingText');
        if (readingText) {
            readingText.innerHTML = html;
        }
        
        document.getElementById('reconstitutionReading').style.display = 'block';
        document.getElementById('reconstitutionExercise').style.display = 'none';
    },

    /**
     * Afficher l'exercice
     */
    displayVerse() {
        const verse = App.state.currentSeries[App.state.currentVerseIndex];
        
        // Header
        const refEl = document.getElementById('reconstitutionRef');
        if (refEl) refEl.textContent = verse.reference;
        
        const progressEl = document.getElementById('reconstitutionProgress');
        if (progressEl) progressEl.textContent = `Verset ${App.state.currentVerseIndex + 1} sur ${App.state.currentSeries.length}`;
        
        const progress = ((App.state.currentVerseIndex + 1) / App.state.currentSeries.length) * 100;
        const progressFill = document.getElementById('reconstitutionProgressFill');
        if (progressFill) progressFill.style.width = progress + '%';
        
        // Créer les blocs
        const blocks = this.createBlocks(verse.text);
        
        // Zone de réponse vide
        const answerZone = document.getElementById('answerZone');
        if (answerZone) answerZone.innerHTML = '';
        
        // Zone des blocs mélangés
        const shuffledBlocks = this.shuffleBlocks([...blocks]);
        let chipsHtml = '';
        shuffledBlocks.forEach((block, i) => {
            chipsHtml += `<div class="word-chip block-chip" draggable="true" data-block-index="${blocks.indexOf(block)}">${block}</div>`;
        });
        const wordsZone = document.getElementById('wordsZone');
        if (wordsZone) wordsZone.innerHTML = chipsHtml;
        
        // État des boutons
        document.getElementById('reconstitutionCheckBtn').style.display = 'block';
        document.getElementById('reconstitutionNextBtn').style.display = 'none';
        document.getElementById('reconstitutionMessage').innerHTML = '';
        
        // Initialiser le drag & drop
        this.initDragDrop();
    },

    /**
     * Créer les blocs selon la difficulté
     * @param {string} text - Texte du verset
     * @returns {string[]} Tableau des blocs
     */
    createBlocks(text) {
        const words = text.split(' ');
        const blocks = [];
        
        // Nombre de blocs selon difficulté
        let numBlocks;
        switch (App.config.difficulty) {
            case 'facile': numBlocks = 3; break;
            case 'moyen': numBlocks = Math.min(5, Math.max(4, Math.floor(words.length / 3))); break;
            case 'difficile': numBlocks = Math.min(8, Math.max(6, Math.floor(words.length / 2))); break;
            default: numBlocks = 4;
        }
        
        numBlocks = Math.min(numBlocks, words.length);
        
        // Répartir les mots en blocs équilibrés
        const baseSize = Math.floor(words.length / numBlocks);
        const remainder = words.length % numBlocks;
        
        let currentIndex = 0;
        for (let i = 0; i < numBlocks; i++) {
            const blockSize = baseSize + (i < remainder ? 1 : 0);
            const blockWords = words.slice(currentIndex, currentIndex + blockSize);
            blocks.push(blockWords.join(' '));
            currentIndex += blockSize;
        }
        
        return blocks;
    },

    /**
     * Mélanger les blocs (avec vérification)
     * @param {string[]} blocks - Les blocs à mélanger
     * @returns {string[]} Blocs mélangés
     */
    shuffleBlocks(blocks) {
        const original = blocks.join('|');
        let attempts = 0;
        
        do {
            for (let i = blocks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
            }
            attempts++;
        } while (blocks.join('|') === original && attempts < 10);
        
        return blocks;
    },

    /**
     * Initialiser le drag & drop
     */
    initDragDrop() {
        const chips = document.querySelectorAll('#wordsZone .word-chip');
        const answerZone = document.getElementById('answerZone');
        const chipsZone = document.getElementById('wordsZone');
        
        // Desktop drag & drop
        chips.forEach(chip => {
            chip.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', '');
                chip.classList.add('dragging');
            });
            
            chip.addEventListener('dragend', () => {
                chip.classList.remove('dragging');
            });
        });
        
        [answerZone, chipsZone].forEach(zone => {
            if (!zone) return;
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const dragging = document.querySelector('.word-chip.dragging');
                if (dragging) {
                    zone.appendChild(dragging);
                }
            });
        });
        
        // Mobile touch events
        this.initTouchDrag();
    },

    /**
     * Initialiser le drag tactile pour mobile
     */
    initTouchDrag() {
        const state = App.modes.reconstitution.touchDragState;
        
        document.querySelectorAll('#wordsZone .word-chip, #answerZone .word-chip').forEach(chip => {
            chip.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const rect = chip.getBoundingClientRect();
                
                state.isDragging = true;
                state.chip = chip;
                state.offsetX = touch.clientX - rect.left;
                state.offsetY = touch.clientY - rect.top;
                
                // Créer le fantôme
                state.ghost = chip.cloneNode(true);
                state.ghost.classList.add('touch-ghost');
                state.ghost.style.position = 'fixed';
                state.ghost.style.zIndex = '9999';
                state.ghost.style.pointerEvents = 'none';
                state.ghost.style.transform = 'scale(1.08)';
                state.ghost.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                document.body.appendChild(state.ghost);
                
                state.ghost.style.left = (touch.clientX - state.offsetX) + 'px';
                state.ghost.style.top = (touch.clientY - state.offsetY) + 'px';
                
                chip.style.opacity = '0.4';
            }, { passive: false });
        });
        
        document.addEventListener('touchmove', (e) => {
            if (!state.isDragging || !state.ghost) return;
            e.preventDefault();
            
            const touch = e.touches[0];
            state.ghost.style.left = (touch.clientX - state.offsetX) + 'px';
            state.ghost.style.top = (touch.clientY - state.offsetY) + 'px';
            
            // Highlight des zones
            const answerZone = document.getElementById('answerZone');
            const chipsZone = document.getElementById('wordsZone');
            
            [answerZone, chipsZone].forEach(zone => {
                if (!zone) return;
                const rect = zone.getBoundingClientRect();
                if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
                    touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
                    zone.classList.add('drag-over');
                } else {
                    zone.classList.remove('drag-over');
                }
            });
        }, { passive: false });
        
        document.addEventListener('touchend', (e) => {
            if (!state.isDragging) return;
            
            const answerZone = document.getElementById('answerZone');
            const chipsZone = document.getElementById('wordsZone');
            
            // Nettoyer
            if (state.ghost) {
                const ghostRect = state.ghost.getBoundingClientRect();
                const ghostCenter = {
                    x: ghostRect.left + ghostRect.width / 2,
                    y: ghostRect.top + ghostRect.height / 2
                };
                
                document.body.removeChild(state.ghost);
                
                // Déterminer la zone de drop
                [answerZone, chipsZone].forEach(zone => {
                    if (!zone) return;
                    zone.classList.remove('drag-over');
                    const rect = zone.getBoundingClientRect();
                    
                    if (ghostCenter.x >= rect.left && ghostCenter.x <= rect.right &&
                        ghostCenter.y >= rect.top && ghostCenter.y <= rect.bottom) {
                        zone.appendChild(state.chip);
                    }
                });
            }
            
            if (state.chip) {
                state.chip.style.opacity = '1';
            }
            
            state.isDragging = false;
            state.chip = null;
            state.ghost = null;
        });
    },

    /**
     * Réinitialiser les blocs
     */
    reset() {
        this.displayVerse();
    },

    /**
     * Vérifier la réponse
     */
    check() {
        const answerChips = document.querySelectorAll('#answerZone .word-chip');
        const allChips = document.querySelectorAll('.word-chip');
        
        // Vérifier que tous les blocs sont dans la zone réponse
        if (answerChips.length !== allChips.length) {
            document.getElementById('reconstitutionMessage').innerHTML = 
                '<div class="message error">⚠️ Place tous les blocs dans la zone de réponse.</div>';
            return;
        }
        
        // Vérifier l'ordre
        let correct = true;
        answerChips.forEach((chip, i) => {
            if (parseInt(chip.dataset.blockIndex) !== i) {
                correct = false;
                chip.classList.add('wrong');
            } else {
                chip.classList.add('correct');
            }
        });
        
        const verse = App.state.currentSeries[App.state.currentVerseIndex];
        
        Stats.recordAttempt('reconstitution', correct, correct ? verse.reference : null);
        
        App.state.seriesResults.attempts.push({
            verse: verse.reference,
            correct: correct
        });
        
        if (correct) {
            App.state.seriesResults.correct++;
            document.getElementById('reconstitutionMessage').innerHTML = 
                `<div class="message success">${i18n.messages.success}</div>`;
            document.getElementById('reconstitutionCheckBtn').style.display = 'none';
            document.getElementById('reconstitutionNextBtn').style.display = 'block';
        } else {
            document.getElementById('reconstitutionMessage').innerHTML = 
                `<div class="message error">${i18n.messages.error}</div>`;
        }
    },

    /**
     * Passer au verset suivant
     */
    next() {
        App.state.currentVerseIndex++;
        
        if (App.state.currentVerseIndex >= App.state.currentSeries.length) {
            document.getElementById('reconstitutionPage').classList.remove('active');
            UI.showResults();
        } else {
            this.displayVerse();
        }
    },

    /**
     * Initialiser les événements
     */
    init() {
        document.getElementById('reconstitutionStartExerciseBtn')?.addEventListener('click', () => {
            document.getElementById('reconstitutionReading').style.display = 'none';
            document.getElementById('reconstitutionExercise').style.display = 'block';
            this.displayVerse();
        });
        
        document.getElementById('reconstitutionResetBtn')?.addEventListener('click', () => this.reset());
        document.getElementById('reconstitutionCheckBtn')?.addEventListener('click', () => this.check());
        document.getElementById('reconstitutionNextBtn')?.addEventListener('click', () => this.next());
        document.getElementById('reconstitutionHomeBtn')?.addEventListener('click', () => UI.returnHome());
    }
};

// Rendre accessible globalement
window.ReconstitutionMode = ReconstitutionMode;
