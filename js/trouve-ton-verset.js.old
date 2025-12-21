/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Trouve ton Verset
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Une expérience contemplative et personnalisée pour découvrir
 * le verset que Dieu a préparé pour toi aujourd'hui.
 */

const TrouveTonVerset = {
    
    // État du quiz
    state: {
        currentQuestion: 0,
        scores: {},
        answers: [],
        selectedVerset: null,
        dominantFamille: null,
        history: []
    },

    // ═══════════════════════════════════════════════════════════════════════
    // INITIALISATION
    // ═══════════════════════════════════════════════════════════════════════
    
    init() {
        this.loadHistory();
    },

    loadHistory() {
        const saved = localStorage.getItem('verset_history');
        if (saved) {
            try {
                this.state.history = JSON.parse(saved);
            } catch(e) {
                this.state.history = [];
            }
        }
    },

    saveHistory() {
        localStorage.setItem('verset_history', JSON.stringify(this.state.history));
    },

    // ═══════════════════════════════════════════════════════════════════════
    // LANCEMENT DU QUIZ
    // ═══════════════════════════════════════════════════════════════════════

    start() {
        // Réinitialiser l'état
        this.state = {
            currentQuestion: 0,
            scores: {
                paix: 0, force: 0, amour: 0, esperance: 0,
                confiance: 0, joie: 0, sagesse: 0, reconfort: 0
            },
            answers: [],
            selectedVerset: null,
            dominantFamille: null,
            history: this.state.history
        };

        this.showOverlay();
        this.showAccueil();
    },

    showOverlay() {
        let overlay = document.getElementById('versetQuizOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'versetQuizOverlay';
            overlay.className = 'verset-quiz-overlay';
            document.body.appendChild(overlay);
        }
        
        // Forcer le reflow pour l'animation
        overlay.offsetHeight;
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    },

    hideOverlay() {
        const overlay = document.getElementById('versetQuizOverlay');
        if (overlay) {
            overlay.classList.remove('visible');
            setTimeout(() => {
                overlay.remove();
            }, 500);
        }
        document.body.style.overflow = '';
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ÉCRAN D'ACCUEIL
    // ═══════════════════════════════════════════════════════════════════════

    showAccueil() {
        const overlay = document.getElementById('versetQuizOverlay');
        const messages = VersetsSpeciaux.messages;

        overlay.innerHTML = `
            <div class="verset-quiz-container accueil">
                <button class="quiz-close-btn" id="quizCloseBtn">✕</button>
                
                <div class="accueil-content">
                    <div class="accueil-icon">
                        <span class="icon-glow"></span>
                        <span class="icon-main">✨</span>
                    </div>
                    
                    <h1 class="accueil-title">${messages.accueil.titre}</h1>
                    <p class="accueil-subtitle">${messages.accueil.sousTitre}</p>
                    
                    <div class="accueil-text">
                        <p>${messages.accueil.texte}</p>
                    </div>
                    
                    <div class="accueil-decoration">
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                        <span class="dot"></span>
                    </div>
                    
                    <button class="btn-start-quiz" id="startQuizBtn">
                        <span class="btn-text">${messages.accueil.bouton}</span>
                        <span class="btn-icon">→</span>
                    </button>
                </div>
            </div>
        `;

        // Events
        document.getElementById('quizCloseBtn').addEventListener('click', () => this.hideOverlay());
        document.getElementById('startQuizBtn').addEventListener('click', () => this.showQuestion(0));
    },

    // ═══════════════════════════════════════════════════════════════════════
    // AFFICHAGE DES QUESTIONS
    // ═══════════════════════════════════════════════════════════════════════

    showQuestion(index) {
        this.state.currentQuestion = index;
        const question = VersetsSpeciaux.questions[index];
        const total = VersetsSpeciaux.questions.length;
        const progress = ((index) / total) * 100;

        const overlay = document.getElementById('versetQuizOverlay');
        
        overlay.innerHTML = `
            <div class="verset-quiz-container question fade-in">
                <button class="quiz-close-btn" id="quizCloseBtn">✕</button>
                
                <div class="question-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <div class="progress-dots">
                        ${Array(total).fill(0).map((_, i) => `
                            <span class="progress-dot ${i < index ? 'done' : ''} ${i === index ? 'current' : ''}"></span>
                        `).join('')}
                    </div>
                </div>

                <div class="question-content">
                    <div class="question-number">Question ${index + 1} sur ${total}</div>
                    <h2 class="question-text">${question.texte}</h2>
                    <p class="question-subtitle">${question.sousTitre}</p>
                </div>

                <div class="answers-container">
                    ${question.reponses.map((rep, i) => `
                        <button class="answer-btn" data-index="${i}">
                            <span class="answer-icon">${rep.icone}</span>
                            <span class="answer-text">${rep.texte}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;

        // Events
        document.getElementById('quizCloseBtn').addEventListener('click', () => this.hideOverlay());
        
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const answerIndex = parseInt(btn.dataset.index);
                this.selectAnswer(answerIndex);
            });
        });
    },

    selectAnswer(answerIndex) {
        const question = VersetsSpeciaux.questions[this.state.currentQuestion];
        const answer = question.reponses[answerIndex];

        // Animation de sélection
        const btn = document.querySelector(`.answer-btn[data-index="${answerIndex}"]`);
        btn.classList.add('selected');

        // Enregistrer la réponse
        this.state.answers.push(answerIndex);

        // Ajouter les scores
        Object.keys(answer.scores).forEach(famille => {
            this.state.scores[famille] += answer.scores[famille];
        });

        // Transition vers la question suivante ou résultat
        setTimeout(() => {
            if (this.state.currentQuestion < VersetsSpeciaux.questions.length - 1) {
                this.showQuestion(this.state.currentQuestion + 1);
            } else {
                this.showTransition();
            }
        }, 400);
    },

    // ═══════════════════════════════════════════════════════════════════════
    // TRANSITION AVANT RÉSULTAT
    // ═══════════════════════════════════════════════════════════════════════

    showTransition() {
        const overlay = document.getElementById('versetQuizOverlay');

        overlay.innerHTML = `
            <div class="verset-quiz-container transition">
                <div class="transition-content">
                    <div class="transition-icon">
                        <div class="pulse-ring"></div>
                        <div class="pulse-ring delay-1"></div>
                        <div class="pulse-ring delay-2"></div>
                        <span class="icon-dove">🕊️</span>
                    </div>
                    <p class="transition-text">${VersetsSpeciaux.messages.transition}</p>
                </div>
            </div>
        `;

        // Calculer le résultat pendant la transition
        setTimeout(() => {
            this.calculateResult();
            this.showResult();
        }, 3000);
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CALCUL DU RÉSULTAT
    // ═══════════════════════════════════════════════════════════════════════

    calculateResult() {
        // Trouver la famille dominante
        let maxScore = 0;
        let dominant = 'paix';

        Object.keys(this.state.scores).forEach(famille => {
            if (this.state.scores[famille] > maxScore) {
                maxScore = this.state.scores[famille];
                dominant = famille;
            }
        });

        this.state.dominantFamille = dominant;

        // Sélectionner un verset de cette famille
        const versetsOfFamille = VersetsSpeciaux.versets.filter(v => v.famille === dominant);
        const randomIndex = Math.floor(Math.random() * versetsOfFamille.length);
        this.state.selectedVerset = versetsOfFamille[randomIndex];
        
        // Ne pas sauvegarder automatiquement - l'utilisateur cliquera sur le bouton
    },

    // ═══════════════════════════════════════════════════════════════════════
    // AFFICHAGE DU RÉSULTAT
    // ═══════════════════════════════════════════════════════════════════════

    showResult() {
        const overlay = document.getElementById('versetQuizOverlay');
        const famille = VersetsSpeciaux.familles[this.state.dominantFamille];
        const verset = this.state.selectedVerset;
        const priere = PrieresData.collection.find(p => p.id === famille.priereRecommandee);
        
        // Vérifier si déjà sauvegardé aujourd'hui
        const todayVerset = this.getTodaysVerset();
        const alreadySaved = todayVerset !== undefined;

        overlay.innerHTML = `
            <div class="verset-quiz-container result">
                <button class="quiz-close-btn light" id="quizCloseBtn">✕</button>
                
                <div class="result-header" style="background: linear-gradient(135deg, ${famille.couleur} 0%, ${this.darkenColor(famille.couleur, 20)} 100%)">
                    <div class="result-famille">
                        <span class="famille-icon">${famille.icone}</span>
                        <span class="famille-name">${famille.nom}</span>
                    </div>
                    <p class="result-intro">${VersetsSpeciaux.messages.revelation}</p>
                </div>

                <div class="result-body">
                    <div class="verset-card">
                        <div class="verset-text-container">
                            <span class="quote-mark">"</span>
                            <p class="verset-text" id="versetTextAnimated"></p>
                            <span class="quote-mark end">"</span>
                        </div>
                        <div class="verset-reference">${verset.reference}</div>
                    </div>

                    <div class="message-personnel">
                        <p>${famille.message}</p>
                    </div>

                    <div class="priere-suggestion">
                        <p class="priere-intro">${VersetsSpeciaux.messages.priereIntro}</p>
                        <button class="priere-card" id="openPriereBtn" style="border-color: ${famille.couleur}">
                            <span class="priere-icon">${priere?.icone || '🙏'}</span>
                            <span class="priere-name">${priere?.titre || 'Prière'}</span>
                            <span class="priere-arrow">→</span>
                        </button>
                    </div>
                </div>

                <div class="result-actions">
                    <button class="action-btn secondary" id="saveVersetBtn" ${alreadySaved ? 'disabled' : ''}>
                        <span class="action-icon">${alreadySaved ? '✓' : '💾'}</span>
                        <span>${alreadySaved ? 'Sauvegardé' : 'Sauvegarder'}</span>
                    </button>
                    <button class="action-btn secondary" id="historyBtn">
                        <span class="action-icon">📚</span>
                        <span>Historique</span>
                    </button>
                </div>
                
                <div class="result-actions-row2">
                    <button class="action-btn outline" id="meditateBtn">
                        <span class="action-icon">🙏</span>
                        <span>Méditer ce verset</span>
                    </button>
                    <button class="action-btn outline" id="readContextBtn">
                        <span class="action-icon">📖</span>
                        <span>Lire le contexte</span>
                    </button>
                </div>
                
                <div class="result-actions-final">
                    <button class="action-btn primary" id="finishBtn">
                        <span>Amen</span>
                        <span class="action-icon">✨</span>
                    </button>
                </div>
            </div>
        `;

        // Animation du texte du verset
        this.animateVersetText(verset.texte);

        // Events
        document.getElementById('quizCloseBtn').addEventListener('click', () => this.hideOverlay());
        document.getElementById('finishBtn').addEventListener('click', () => this.hideOverlay());
        
        document.getElementById('openPriereBtn').addEventListener('click', () => {
            // Ouvrir la prière SANS fermer l'overlay
            if (priere) {
                this.showPrayerInModal(priere);
            }
        });

        document.getElementById('saveVersetBtn')?.addEventListener('click', () => {
            if (!alreadySaved) {
                this.saveCurrentVerset();
                // Mettre à jour le bouton
                const btn = document.getElementById('saveVersetBtn');
                btn.disabled = true;
                btn.innerHTML = '<span class="action-icon">✓</span><span>Sauvegardé !</span>';
            }
        });

        document.getElementById('historyBtn')?.addEventListener('click', () => {
            this.showHistoryModal();
        });

        document.getElementById('meditateBtn').addEventListener('click', () => {
            this.hideOverlay();
            this.goToMeditate();
        });

        document.getElementById('readContextBtn').addEventListener('click', () => {
            this.hideOverlay();
            this.goToRead();
        });
    },

    // ═══════════════════════════════════════════════════════════════════════
    // AFFICHER LA PRIÈRE SANS FERMER LE RÉSULTAT
    // ═══════════════════════════════════════════════════════════════════════

    showPrayerInModal(priere) {
        // Créer une modal par-dessus l'overlay existant
        let modal = document.getElementById('priereOverModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'priereOverModal';
            modal.className = 'priere-over-modal';
            document.body.appendChild(modal);
        }

        const cat = PrieresData.categories.find(c => c.id === priere.categorie);

        modal.innerHTML = `
            <div class="priere-over-content">
                <div class="priere-over-header" style="background: ${cat?.couleur || '#667eea'}">
                    <span class="priere-over-icon">${priere.icone}</span>
                    <h2>${priere.titre}</h2>
                    <button class="priere-over-close" id="closePriereOver">✕</button>
                </div>
                <div class="priere-over-body">
                    <p class="priere-over-origine">${priere.origine}</p>
                    <div class="priere-over-text">${priere.texte.replace(/\n/g, '<br>')}</div>
                </div>
                <div class="priere-over-footer">
                    <button class="btn-priere-back" id="backToResultBtn">← Retour au verset</button>
                </div>
            </div>
        `;

        modal.classList.add('visible');

        document.getElementById('closePriereOver').addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        document.getElementById('backToResultBtn').addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        // Fermer en cliquant à l'extérieur
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('visible');
            }
        });
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SAUVEGARDER LE VERSET
    // ═══════════════════════════════════════════════════════════════════════

    saveCurrentVerset() {
        const now = new Date();
        const entry = {
            date: now.toISOString(),
            dateFormatted: now.toLocaleDateString('fr-FR', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
            }),
            timeFormatted: now.toLocaleTimeString('fr-FR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            famille: this.state.dominantFamille,
            familleNom: VersetsSpeciaux.familles[this.state.dominantFamille].nom,
            familleIcone: VersetsSpeciaux.familles[this.state.dominantFamille].icone,
            verset: this.state.selectedVerset
        };

        // Ajouter en premier dans l'historique
        this.state.history.unshift(entry);

        // Limiter à 50 entrées
        if (this.state.history.length > 50) {
            this.state.history = this.state.history.slice(0, 50);
        }

        this.saveHistory();
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HISTORIQUE
    // ═══════════════════════════════════════════════════════════════════════

    showHistoryModal() {
        let modal = document.getElementById('historyOverModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'historyOverModal';
            modal.className = 'priere-over-modal';
            document.body.appendChild(modal);
        }

        const history = this.state.history;

        let historyHtml = '';
        if (history.length === 0) {
            historyHtml = '<p class="history-empty">Aucun verset sauvegardé pour le moment.</p>';
        } else {
            historyHtml = history.map((entry, index) => `
                <div class="history-item">
                    <div class="history-item-header">
                        <span class="history-famille">${entry.familleIcone || '✨'} ${entry.familleNom || entry.famille}</span>
                        <span class="history-date">${entry.dateFormatted || new Date(entry.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div class="history-verset">
                        <p class="history-text">"${entry.verset.texte.substring(0, 120)}${entry.verset.texte.length > 120 ? '...' : ''}"</p>
                        <span class="history-ref">${entry.verset.reference}</span>
                    </div>
                    ${entry.timeFormatted ? `<span class="history-time">à ${entry.timeFormatted}</span>` : ''}
                </div>
            `).join('');
        }

        modal.innerHTML = `
            <div class="priere-over-content history-modal">
                <div class="priere-over-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
                    <span class="priere-over-icon">📚</span>
                    <h2>Mes versets</h2>
                    <button class="priere-over-close" id="closeHistoryModal">✕</button>
                </div>
                <div class="priere-over-body history-body">
                    ${historyHtml}
                </div>
                <div class="priere-over-footer">
                    <button class="btn-priere-back" id="backFromHistory">← Retour</button>
                </div>
            </div>
        `;

        modal.classList.add('visible');

        document.getElementById('closeHistoryModal').addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        document.getElementById('backFromHistory').addEventListener('click', () => {
            modal.classList.remove('visible');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('visible');
            }
        });
    },

    animateVersetText(text) {
        const container = document.getElementById('versetTextAnimated');
        if (!container) return;

        // Afficher le texte mot par mot
        const words = text.split(' ');
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < words.length) {
                container.innerHTML += (currentIndex > 0 ? ' ' : '') + words[currentIndex];
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 80);
    },

    goToMeditate() {
        // Changer d'onglet
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        document.querySelector('[data-tab="mediter"]')?.classList.add('active');
        document.getElementById('tabMediter')?.classList.add('active');

        // Définir le verset dans MeditateTab
        if (window.MeditateTab && this.state.selectedVerset) {
            MeditateTab.currentVerse = {
                reference: this.state.selectedVerset.reference,
                text: this.state.selectedVerset.texte
            };
            MeditateTab.displayVerse();
        }
    },

    goToRead() {
        // Parser la référence pour trouver le livre et chapitre
        const ref = this.state.selectedVerset.reference;
        
        // Regex pour extraire livre et chapitre (ex: "Jean 14:27", "1 Jean 4:16", "Psaume 23:2-3")
        const match = ref.match(/^(.+?)\s+(\d+)(?::|\s|$)/);
        
        if (match) {
            const livreName = match[1].trim();
            const chapitre = match[2];

            // Changer d'onglet
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            
            document.querySelector('[data-tab="lire"]')?.classList.add('active');
            document.getElementById('tabLire')?.classList.add('active');

            // Mapping des noms de livres vers les parties (valeurs exactes des options HTML)
            // Important: Les livres avec numéros doivent être vérifiés en premier
            const livresMapping = [
                // Épîtres avec numéros (vérifier en premier pour éviter confusion avec version sans numéro)
                { livre: '1 Corinthiens', partie: 'Épîtres de Paul' },
                { livre: '2 Corinthiens', partie: 'Épîtres de Paul' },
                { livre: '1 Thessaloniciens', partie: 'Épîtres de Paul' },
                { livre: '2 Thessaloniciens', partie: 'Épîtres de Paul' },
                { livre: '1 Timothée', partie: 'Épîtres de Paul' },
                { livre: '2 Timothée', partie: 'Épîtres de Paul' },
                { livre: '1 Pierre', partie: 'Épîtres Générales' },
                { livre: '2 Pierre', partie: 'Épîtres Générales' },
                { livre: '1 Jean', partie: 'Épîtres Générales' },
                { livre: '2 Jean', partie: 'Épîtres Générales' },
                { livre: '3 Jean', partie: 'Épîtres Générales' },
                // Évangiles
                { livre: 'Matthieu', partie: 'Évangiles' },
                { livre: 'Marc', partie: 'Évangiles' },
                { livre: 'Luc', partie: 'Évangiles' },
                { livre: 'Jean', partie: 'Évangiles' },
                // Actes
                { livre: 'Actes', partie: 'Actes' },
                // Épîtres de Paul (sans numéro)
                { livre: 'Romains', partie: 'Épîtres de Paul' },
                { livre: 'Galates', partie: 'Épîtres de Paul' },
                { livre: 'Éphésiens', partie: 'Épîtres de Paul' },
                { livre: 'Ephésiens', partie: 'Épîtres de Paul' },
                { livre: 'Philippiens', partie: 'Épîtres de Paul' },
                { livre: 'Colossiens', partie: 'Épîtres de Paul' },
                { livre: 'Tite', partie: 'Épîtres de Paul' },
                { livre: 'Philémon', partie: 'Épîtres de Paul' },
                // Épîtres Générales
                { livre: 'Hébreux', partie: 'Épîtres Générales' },
                { livre: 'Jacques', partie: 'Épîtres Générales' },
                { livre: 'Jude', partie: 'Épîtres Générales' },
                // Apocalypse
                { livre: 'Apocalypse', partie: 'Apocalypse' }
            ];

            // Trouver la partie (correspondance exacte)
            let partieValue = '';
            for (const mapping of livresMapping) {
                if (livreName === mapping.livre) {
                    partieValue = mapping.partie;
                    break;
                }
            }

            // Attendre un peu que l'onglet soit affiché
            setTimeout(() => {
                // 1. Sélectionner la partie
                const selectPartie = document.getElementById('lirePartie');
                if (selectPartie && partieValue) {
                    selectPartie.value = partieValue;
                    // Mettre à jour ReadTab
                    if (window.ReadTab) {
                        ReadTab.selectedPartie = partieValue;
                        ReadTab.updateLivreDropdown();
                    }
                }

                // 2. Attendre la mise à jour des livres puis sélectionner
                setTimeout(() => {
                    const selectLivre = document.getElementById('lireLivre');
                    if (selectLivre) {
                        // Chercher le livre
                        for (let option of selectLivre.options) {
                            if (option.value === livreName || option.text === livreName) {
                                selectLivre.value = option.value;
                                if (window.ReadTab) {
                                    ReadTab.selectedLivre = option.value;
                                    ReadTab.updateChapitreDropdown();
                                    // Activer le bouton info
                                    const infoBtn = document.getElementById('bookInfoBtn');
                                    if (infoBtn) infoBtn.disabled = false;
                                }
                                break;
                            }
                        }
                    }

                    // 3. Attendre la mise à jour des chapitres puis sélectionner
                    setTimeout(() => {
                        const selectChapitre = document.getElementById('lireChapitre');
                        if (selectChapitre) {
                            selectChapitre.value = chapitre;
                            if (window.ReadTab) {
                                ReadTab.selectedChapitre = chapitre;
                                ReadTab.displayChapter();
                            }
                        }

                        // Scroll vers le contenu
                        const content = document.getElementById('lectureContent');
                        if (content) {
                            content.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }, 100);
            }, 150);
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HISTORIQUE
    // ═══════════════════════════════════════════════════════════════════════

    getHistory() {
        return this.state.history;
    },

    getTodaysVerset() {
        const today = new Date().toISOString().split('T')[0];
        return this.state.history.find(h => h.date && h.date.startsWith(today));
    },

    // ═══════════════════════════════════════════════════════════════════════
    // UTILITAIRES
    // ═══════════════════════════════════════════════════════════════════════

    darkenColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max((num >> 16) - amt, 0);
        const G = Math.max((num >> 8 & 0x00FF) - amt, 0);
        const B = Math.max((num & 0x0000FF) - amt, 0);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    }
};

// Rendre accessible globalement
window.TrouveTonVerset = TrouveTonVerset;
