/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Module Interface Utilisateur
 * ═══════════════════════════════════════════════════════════════════════════
 */

const UI = {
    /**
     * Initialiser les éléments DOM
     */
    initElements() {
        App.elements = {
            // Pages principales
            header: document.getElementById('header'),
            homePage: document.getElementById('homePage'),
            readingPage: document.getElementById('readingPage'),
            exercisePage: document.getElementById('exercisePage'),
            reconstitutionPage: document.getElementById('reconstitutionPage'),
            mysterePage: document.getElementById('mysterePage'),
            chainePage: document.getElementById('chainePage'),
            audioPage: document.getElementById('audioPage'),
            resultsPage: document.getElementById('resultsPage'),
            
            // Onglets
            tabButtons: document.querySelectorAll('.tab-btn'),
            tabContents: document.querySelectorAll('.tab-content')
        };
    },

    /**
     * Initialiser la navigation par onglets
     */
    initTabs() {
        // Mapping des data-tab vers les IDs des contenus
        const tabMapping = {
            'exercice': 'tabExercice',
            'lire': 'tabLire',
            'mediter': 'tabMediter',
            'priere': 'tabPriere',
            'explorer': 'tabExplorer',
            'stats': 'tabStats',
            'liturgie': 'tabLiturgie'
        };

        App.elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Désactiver tous les onglets
                App.elements.tabButtons.forEach(b => b.classList.remove('active'));
                App.elements.tabContents.forEach(c => c.classList.remove('active'));
                
                // Activer l'onglet cliqué
                btn.classList.add('active');
                const tabKey = btn.dataset.tab;
                const contentId = tabMapping[tabKey];
                const content = document.getElementById(contentId);
                if (content) {
                    content.classList.add('active');
                }
                
                // 📊 Analytics : tracker l'onglet visité
                if (typeof Analytics !== 'undefined') {
                    Analytics.trackOnglet(tabKey);
                }
                
                // Actions spécifiques par onglet
                if (tabKey === 'stats') {
                    Stats.updateDisplay();
                }
            });
        });
    },

    /**
     * Afficher une page
     * @param {string} pageId - ID de la page à afficher
     */
    showPage(pageId) {
        // Masquer toutes les pages d'exercice
        const pages = [
            'readingPage', 'exercisePage', 'reconstitutionPage',
            'mysterePage', 'chainePage', 'audioPage', 'resultsPage'
        ];
        
        pages.forEach(id => {
            const page = document.getElementById(id);
            if (page) page.classList.remove('active');
        });
        
        // Afficher la page demandée
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    },

    /**
     * Retourner à l'accueil
     */
    returnHome() {
        // Masquer toutes les pages d'exercice
        const pages = [
            'readingPage', 'exercisePage', 'reconstitutionPage',
            'mysterePage', 'chainePage', 'audioPage', 'resultsPage'
        ];
        
        pages.forEach(id => {
            const page = document.getElementById(id);
            if (page) page.classList.remove('active');
        });
        
        // Afficher l'accueil
        if (App.elements.header) App.elements.header.classList.remove('hidden');
        if (App.elements.homePage) App.elements.homePage.classList.remove('hidden');
    },
    /**
     * Initialiser les onglets de contenu
     */
    initContentTabs() {
        const tabs = document.querySelectorAll('.content-tab');
        const contents = document.querySelectorAll('.content-tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.contentTab;
                
                // Désactiver tous les onglets
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // Activer l'onglet cliqué
                tab.classList.add('active');
                
                // Activer le contenu correspondant
                let targetContent = null;
                switch(targetTab) {
                    case 'filters':
                        targetContent = document.getElementById('contentFilters');
                        App.config.contentMode = 'filters';
                        break;
                    case 'passage':
                        targetContent = document.getElementById('contentPassage');
                        App.config.contentMode = 'passage';
                        this.populatePassagesSelect();
                        break;
                    case 'custom':
                        targetContent = document.getElementById('contentCustom');
                        App.config.contentMode = 'custom';
                        CustomGroups.populateSelect();
                        break;
                }
                
                if (targetContent) {
                    targetContent.classList.add('active');
                }
                
                // Réinitialiser les sélections
                App.config.selectedPassageId = null;
                App.config.selectedCustomGroupId = null;
            });
        });
    },

    /**
     * Peupler le select des passages célèbres
     */
    populatePassagesSelect() {
        const select = document.getElementById('selectPassage');
        if (!select || !window.PASSAGES_CELEBRES) return;
        
        select.innerHTML = '<option value="">-- Sélectionne un passage --</option>';
        
        // Ancien Testament
        const optgroupAT = document.createElement('optgroup');
        optgroupAT.label = '📜 Ancien Testament';
        PASSAGES_CELEBRES.at.forEach(passage => {
            const option = document.createElement('option');
            option.value = passage.id;
            option.textContent = passage.nom;
            optgroupAT.appendChild(option);
        });
        select.appendChild(optgroupAT);
        
        // Nouveau Testament
        const optgroupNT = document.createElement('optgroup');
        optgroupNT.label = '✝️ Nouveau Testament';
        PASSAGES_CELEBRES.nt.forEach(passage => {
            const option = document.createElement('option');
            option.value = passage.id;
            option.textContent = passage.nom;
            optgroupNT.appendChild(option);
        });
        select.appendChild(optgroupNT);
    },

    /**
     * Afficher les infos d'un passage célèbre
     */
    displayPassageInfo(passageId) {
        const infoDiv = document.getElementById('passageInfo');
        if (!infoDiv) return;
        
        if (!passageId) {
            infoDiv.style.display = 'none';
            return;
        }
        
        const passage = Data.getPassageById(passageId);
        if (!passage) {
            infoDiv.style.display = 'none';
            return;
        }
        
        const verses = Data.extractVersesFromRanges(passage.ranges);
        
        let html = `
            <div class="passage-info-header">
                <strong>${passage.icone} ${passage.nom}</strong>
                <span class="passage-count">${verses.length} versets</span>
            </div>
            <div class="passage-description">${passage.description}</div>
            <div class="passage-ranges">
        `;
        
        passage.ranges.forEach(range => {
            html += `<div class="range-item">
                📖 ${range.livre} ${range.chapitre}, ${range.debut}-${range.fin}
            </div>`;
        });
        
        html += '</div>';
        infoDiv.innerHTML = html;
        infoDiv.style.display = 'block';
    },

    /**
     * Initialiser les onglets de contenu pour LIRE
     */
    initLireContentTabs() {
        const tabs = document.querySelectorAll('[data-content-tab^="lire-"]');
        const contents = [
            document.getElementById('contentLireFilters'),
            document.getElementById('contentLirePassage'),
            document.getElementById('contentLireCustom')
        ];
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetTab = tab.dataset.contentTab;
                
                // Désactiver tous les onglets
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                // Activer l'onglet cliqué
                tab.classList.add('active');
                
                // Activer le contenu correspondant
                let targetContent = null;
                switch(targetTab) {
                    case 'lire-filters':
                        targetContent = document.getElementById('contentLireFilters');
                        break;
                    case 'lire-passage':
                        targetContent = document.getElementById('contentLirePassage');
                        this.populateLirePassagesSelect();
                        break;
                    case 'lire-custom':
                        targetContent = document.getElementById('contentLireCustom');
                        this.populateLireCustomGroupsSelect();
                        break;
                }
                
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    },

    /**
     * Peupler le select des passages célèbres pour LIRE
     */
    populateLirePassagesSelect() {
        const select = document.getElementById('lireSelectPassage');
        if (!select || !window.PASSAGES_CELEBRES) return;
        
        select.innerHTML = '<option value="">-- Sélectionne un passage --</option>';
        
        // Ancien Testament
        const optgroupAT = document.createElement('optgroup');
        optgroupAT.label = '📜 Ancien Testament';
        PASSAGES_CELEBRES.at.forEach(passage => {
            const option = document.createElement('option');
            option.value = passage.id;
            option.textContent = passage.nom;
            optgroupAT.appendChild(option);
        });
        select.appendChild(optgroupAT);
        
        // Nouveau Testament
        const optgroupNT = document.createElement('optgroup');
        optgroupNT.label = '✝️ Nouveau Testament';
        PASSAGES_CELEBRES.nt.forEach(passage => {
            const option = document.createElement('option');
            option.value = passage.id;
            option.textContent = passage.nom;
            optgroupNT.appendChild(option);
        });
        select.appendChild(optgroupNT);
    },

    /**
     * Peupler le select des groupes personnalisés pour LIRE
     */
    populateLireCustomGroupsSelect() {
        const select = document.getElementById('lireSelectCustomGroup');
        if (!select) return;
        
        const groups = CustomGroups.load();
        
        select.innerHTML = '<option value="">-- Sélectionne un groupe --</option>';
        
        groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id;
            option.textContent = `${group.name} (${group.count} versets)`;
            select.appendChild(option);
        });
    },

    /**
     * Afficher les infos d'un passage pour LIRE
     */
    displayLirePassageInfo(passageId) {
        const infoDiv = document.getElementById('lirePassageInfo');
        if (!infoDiv) return;
        
        if (!passageId) {
            infoDiv.style.display = 'none';
            return;
        }
        
        const passage = Data.getPassageById(passageId);
        if (!passage) {
            infoDiv.style.display = 'none';
            return;
        }
        
        const verses = Data.extractVersesFromRanges(passage.ranges);
        
        let html = `
            <div class="passage-info-header">
                <strong>${passage.icone} ${passage.nom}</strong>
                <span class="passage-count">${verses.length} versets</span>
            </div>
            <div class="passage-description">${passage.description}</div>
            <div class="passage-ranges">
        `;
        
        passage.ranges.forEach(range => {
            html += `<div class="range-item">
                📖 ${range.livre} ${range.chapitre}, ${range.debut}-${range.fin}
            </div>`;
        });
        
        html += '</div>';
        infoDiv.innerHTML = html;
        infoDiv.style.display = 'block';
    },

    /**
     * Afficher les infos d'un groupe pour LIRE
     */
    displayLireCustomGroupInfo(groupId) {
        const infoDiv = document.getElementById('lireCustomGroupInfo');
        if (!infoDiv) return;
        
        if (!groupId) {
            infoDiv.style.display = 'none';
            return;
        }
        
        const group = CustomGroups.getById(groupId);
        if (!group) {
            infoDiv.style.display = 'none';
            return;
        }
        
        let html = `
            <div class="group-info-header">
                <strong>${group.name}</strong>
                <span class="group-count">${group.count} versets</span>
            </div>
            <div class="group-ranges">
        `;
        
        group.ranges.forEach(range => {
            html += `<div class="range-item">
                📖 ${range.livre} ${range.chapitre}, ${range.debut}-${range.fin}
            </div>`;
        });
        
        html += '</div>';
        infoDiv.innerHTML = html;
        infoDiv.style.display = 'block';
    },

    /**
     * Mettre à jour la visibilité des options selon le mode
     * @param {string} mode - Le mode sélectionné
     */
    updateOptionsVisibility(mode) {
        const configDifficulty = document.getElementById('configDifficulty');
        const configReading = document.getElementById('configReading');
        
        // Difficulté : Classique et Reconstitution uniquement
        if (mode === 'classique' || mode === 'reconstitution') {
            if (configDifficulty) configDifficulty.style.display = 'block';
            
            // Adapter les descriptions selon le mode
            const diffFacileDesc = document.getElementById('diffFacileDesc');
            const diffMoyenDesc = document.getElementById('diffMoyenDesc');
            const diffDifficileDesc = document.getElementById('diffDifficileDesc');
            
            if (mode === 'reconstitution') {
                if (diffFacileDesc) diffFacileDesc.textContent = i18n.difficulty.facile.descReconstitution;
                if (diffMoyenDesc) diffMoyenDesc.textContent = i18n.difficulty.moyen.descReconstitution;
                if (diffDifficileDesc) diffDifficileDesc.textContent = i18n.difficulty.difficile.descReconstitution;
            } else {
                if (diffFacileDesc) diffFacileDesc.textContent = i18n.difficulty.facile.descClassique;
                if (diffMoyenDesc) diffMoyenDesc.textContent = i18n.difficulty.moyen.descClassique;
                if (diffDifficileDesc) diffDifficileDesc.textContent = i18n.difficulty.difficile.descClassique;
            }
        } else {
            if (configDifficulty) configDifficulty.style.display = 'none';
        }
        
        // Lecture préalable : Classique, Reconstitution, Suite
        if (mode === 'classique' || mode === 'reconstitution' || mode === 'chaine') {
            if (configReading) configReading.style.display = 'block';
        } else {
            if (configReading) configReading.style.display = 'none';
        }
    },

    /**
     * Afficher un message
     * @param {string} elementId - ID de l'élément message
     * @param {string} text - Texte du message
     * @param {string} type - Type de message ('success', 'error', 'info')
     */
    showMessage(elementId, text, type = 'info') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = `<div class="message ${type}">${text}</div>`;
        }
    },

    /**
     * Afficher les résultats de la série
     */
    showResults() {
        if (App.elements.exercisePage) App.elements.exercisePage.classList.remove('active');
        if (App.elements.resultsPage) App.elements.resultsPage.classList.add('active');
        
        // Enregistrer la session
        Stats.recordSession(App.config.mode);
        
        const { correct, total } = App.state.seriesResults;
        const score = Math.round((correct / total) * 100);
        
        // 📊 Analytics : tracker la fin d'exercice avec le score
        if (typeof Analytics !== 'undefined') {
            Analytics.trackExerciceComplete(App.config.mode, score);
        }
        
        const scoreEl = document.getElementById('resultsScore');
        if (scoreEl) scoreEl.textContent = score + '%';
        
        const modeNames = {
            classique: i18n.modes.classique.icon + ' ' + i18n.modes.classique.name,
            reconstitution: i18n.modes.reconstitution.icon + ' ' + i18n.modes.reconstitution.name,
            mystere: i18n.modes.mystere.icon + ' ' + i18n.modes.mystere.name,
            chaine: i18n.modes.suite.icon + ' ' + i18n.modes.suite.name,
            audio: i18n.modes.dictee.icon + ' ' + i18n.modes.dictee.name
        };
        
        // Label adapté pour le mode Suite
        const resultLabel = App.config.mode === 'chaine' 
            ? i18n.results.questionsSuccess 
            : i18n.results.versesSuccess;
        
        // Message d'encouragement selon le score
        const encouragement = this.getResultEncouragement(score, correct, total);
        
        const details = document.getElementById('resultsDetails');
        if (details) {
            details.innerHTML = `
                <div class="result-encouragement">${encouragement}</div>
                <div class="result-item">
                    <span class="result-label">${i18n.results.mode}</span>
                    <span class="result-value">${modeNames[App.config.mode] || App.config.mode}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${resultLabel}</span>
                    <span class="result-value">${correct} / ${total}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${i18n.results.level}</span>
                    <span class="result-value">${App.config.difficulty.charAt(0).toUpperCase() + App.config.difficulty.slice(1)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${i18n.results.currentStreak}</span>
                    <span class="result-value">${App.stats.streak} 🔥</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${i18n.results.bestStreak}</span>
                    <span class="result-value">${App.stats.bestStreak} ⭐</span>
                </div>
                <div class="result-actions-extra">
                    <button class="restart-same-btn" id="restartSameBtn">
                        🔄 Refaire avec les mêmes versets
                    </button>
                    <p class="restart-same-hint">Les mots à trouver seront différents</p>
                </div>
            `;
            
            // Attacher l'événement au bouton
            const restartSameBtn = document.getElementById('restartSameBtn');
            if (restartSameBtn) {
                restartSameBtn.addEventListener('click', () => {
                    this.restartSameVerses();
                });
            }
        }
    },

    /**
     * Message d'encouragement selon le score
     */
    getResultEncouragement(score, correct, total) {
        if (score === 100) {
            const messages = [
                "🏆 Parfait ! Tu as tout réussi !",
                "🌟 Excellent ! Mémoire impeccable !",
                "✨ Magnifique ! Sans aucune erreur !",
                "👑 Bravo ! Tu maîtrises ces versets !"
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        }
        
        if (score >= 80) {
            const messages = [
                "🎯 Très bien ! Tu y es presque !",
                "💪 Super travail ! Continue comme ça !",
                "🌿 Belle performance ! Tu progresses !"
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        }
        
        if (score >= 50) {
            const messages = [
                "📖 Bien ! La Parole prend racine en toi",
                "🌱 Encourageant ! Chaque effort compte",
                "💫 Tu avances ! Persévère !"
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        }
        
        const messages = [
            "🙏 Pas de découragement ! La mémorisation prend du temps",
            "💝 Continue ! Chaque essai fortifie ta mémoire",
            "🕊️ La Parole de Dieu mérite qu'on y revienne"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    },

    /**
     * Refaire l'exercice avec les mêmes versets
     */
    restartSameVerses() {
        // 📊 Analytics : tracker le refaire avec mêmes versets
        if (typeof Analytics !== 'undefined') {
            Analytics.trackRefaireMemes();
        }
        
        // Réinitialiser l'état
        App.state.currentVerseIndex = 0;
        App.state.seriesResults = {
            correct: 0,
            total: App.state.currentSeries.length,
            attempts: []
        };
        
        // Masquer la page résultats
        if (App.elements.resultsPage) App.elements.resultsPage.classList.remove('active');
        
        // Relancer selon le mode
        switch(App.config.mode) {
            case 'classique':
                if (App.config.readingFirst) {
                    ClassicMode.showReading();
                } else {
                    ClassicMode.showExercise();
                }
                break;
            case 'reconstitution':
                if (App.config.readingFirst) {
                    ReconstitutionMode.showReading();
                } else {
                    ReconstitutionMode.showExercise();
                }
                break;
            case 'mystere':
                MysteryMode.showExercise();
                break;
            case 'chaine':
                if (App.config.readingFirst) {
                    SuiteMode.showReading();
                } else {
                    SuiteMode.showExercise();
                }
                break;
            case 'audio':
                DictationMode.showExercise();
                break;
            default:
                Exercises.startExercise();
        }
    },

	/**
		 * Afficher la modal d'info du livre (pour l'onglet Exercice)
		 */
		showExerciseBookInfo() {
			const selectedLivre = App.config.selectedLivre;
			if (!selectedLivre || selectedLivre === 'tous') return;
			
			const info = window.LivresInfo ? window.LivresInfo[selectedLivre] : null;
			if (!info) {
				alert('Informations non disponibles pour ce livre.');
				return;
			}

			const overlay = document.getElementById('bookModalOverlay');
			const badge = document.getElementById('bookModalBadge');
			const title = document.getElementById('bookModalTitle');
			const content = document.getElementById('bookModalContent');

			if (!overlay || !content) return;

			if (badge) {
				badge.textContent = info.partie;
				badge.style.backgroundColor = info.couleur;
			}
			if (title) {
				title.textContent = selectedLivre;
			}

			let html = '';
			html += '<div class="book-info-quick">';
			html += '<div class="info-item"><span class="info-icon">✍️</span><span class="info-label">Auteur</span><span class="info-value">' + info.auteur + '</span></div>';
			html += '<div class="info-item"><span class="info-icon">📅</span><span class="info-label">Date</span><span class="info-value">' + info.date + '</span></div>';
			html += '<div class="info-item"><span class="info-icon">📍</span><span class="info-label">Lieu</span><span class="info-value">' + info.lieu + '</span></div>';
			html += '<div class="info-item"><span class="info-icon">👥</span><span class="info-label">Destinataires</span><span class="info-value">' + info.destinataires + '</span></div>';
			html += '<div class="info-item"><span class="info-icon">📖</span><span class="info-label">Chapitres</span><span class="info-value">' + info.chapitres + ' chapitres, ' + info.versets + ' versets</span></div>';
			html += '</div>';

			html += '<div class="book-info-section">';
			html += '<h3>📝 Résumé</h3>';
			html += '<p>' + info.resume + '</p>';
			html += '</div>';

			html += '<div class="book-info-section">';
			html += '<h3>🎯 Thèmes clés</h3>';
			html += '<div class="book-themes">';
			info.themes.forEach(theme => {
				html += '<span class="book-theme">' + theme + '</span>';
			});
			html += '</div>';
			html += '</div>';

			html += '<details class="book-info-details">';
			html += '<summary>📚 Structure du livre</summary>';
			html += '<div class="book-structure">';
			info.structure.forEach(s => {
				html += '<div class="structure-item">';
				html += '<span class="structure-chapters">' + s.chapitres + '</span>';
				html += '<span class="structure-title">' + s.section + '</span>';
				html += '</div>';
			});
			html += '</div>';
			html += '</details>';

			html += '<details class="book-info-details">';
			html += '<summary>⭐ Versets clés</summary>';
			html += '<div class="book-key-verses">';
			info.versetsCles.forEach(v => {
				html += '<div class="key-verse">';
				html += '<span class="key-verse-ref">' + selectedLivre + ' ' + v.ref + '</span>';
				html += '<span class="key-verse-title">' + v.titre + '</span>';
				html += '</div>';
			});
			html += '</div>';
			html += '</details>';

			content.innerHTML = html;
			overlay.classList.add('visible');
			document.body.style.overflow = 'hidden';
		},


    /**
     * Initialiser les boutons de mode
     */
    initModeButtons() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                App.config.mode = btn.dataset.mode;
                this.updateOptionsVisibility(App.config.mode);
            });
        });
    },

    /**
     * Initialiser les boutons de difficulté
     */
    initDifficultyButtons() {
        document.querySelectorAll('.option-btn[data-difficulty]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.option-btn[data-difficulty]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                App.config.difficulty = btn.dataset.difficulty;
            });
        });
    },

    /**
     * Initialiser les boutons de nombre de versets
     */
    initSeriesLengthButtons() {
        document.querySelectorAll('.option-btn[data-series]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.option-btn[data-series]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const value = btn.dataset.series;
                App.config.seriesLength = value === 'all' ? 'all' : parseInt(value);
            });
        });
    },

    /**
     * Initialiser les boutons de lecture préalable
     */
    initReadingButtons() {
        document.querySelectorAll('.toggle-btn[data-reading]').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.toggle-btn[data-reading]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                App.config.readingFirst = btn.dataset.reading === 'true';
            });
        });
    },

    /**
     * Initialiser les sélecteurs de filtres
     */
initFilterSelects() {
        const selectPartie = document.getElementById('selectPartie');
        const selectLivre = document.getElementById('selectLivre');
        const selectChapitre = document.getElementById('selectChapitre');
        const exerciseBookInfoBtn = document.getElementById('exerciseBookInfoBtn');
        
        if (selectPartie) {
            selectPartie.addEventListener('change', () => {
                App.config.selectedPartie = selectPartie.value;
                Data.updateLivreDropdown();
                if (exerciseBookInfoBtn) {
                    exerciseBookInfoBtn.disabled = true;
                }
            });
        }
        
        if (selectLivre) {
            selectLivre.addEventListener('change', () => {
                App.config.selectedLivre = selectLivre.value;
                Data.updateChapitreDropdown();
                if (exerciseBookInfoBtn) {
                    exerciseBookInfoBtn.disabled = (selectLivre.value === 'tous');
                }
            });
        }
        
        if (selectChapitre) {
            selectChapitre.addEventListener('change', () => {
                App.config.selectedChapitre = selectChapitre.value;
            });
        }
        
        if (exerciseBookInfoBtn) {
            exerciseBookInfoBtn.addEventListener('click', () => {
                this.showExerciseBookInfo();
            });
        }
    },

    /**
     * Initialiser les boutons de navigation
     */
    initNavigationButtons() {
        // Boutons retour à l'accueil
        ['homeBtn1', 'homeBtn2', 'homeBtn3', 'classicHomeBtn', 'reconstitutionHomeBtn', 
         'mystereHomeBtn', 'chaineHomeBtn', 'audioHomeBtn'].forEach(id => {
            const btn = document.getElementById(id);
            if (btn) {
                btn.addEventListener('click', () => this.returnHome());
            }
        });
        
        // Bouton recommencer
        const restartBtn = document.getElementById('restartBtn');
        if (restartBtn) {
            restartBtn.addEventListener('click', () => {
                if (App.elements.resultsPage) App.elements.resultsPage.classList.remove('active');
                Exercises.startExercise();
            });
        }
    }
};

// Rendre accessible globalement
window.UI = UI;
