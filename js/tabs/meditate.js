/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Onglet Méditer
 * ═══════════════════════════════════════════════════════════════════════════
 */

const MeditateTab = {
    currentVerse: null,
    meditations: [],
    historiqueVisible: false,

    /**
     * Charger les méditations depuis localStorage
     */
    loadMeditations() {
        const saved = localStorage.getItem('meditations');
        if (saved) {
            try {
                this.meditations = JSON.parse(saved);
            } catch (e) {
                this.meditations = [];
            }
        }
    },

    /**
     * Sauvegarder les méditations
     */
    saveMeditations() {
        localStorage.setItem('meditations', JSON.stringify(this.meditations));
    },

    /**
     * Afficher un verset adapté à la période liturgique
     */
    showRandomVerse() {
        // Utiliser les versets adaptés à la période liturgique
        if (typeof VersetsMeditation !== 'undefined') {
            const verset = VersetsMeditation.getVersetDuJour();
            if (verset) {
                this.currentVerse = verset;
                this.displayVerse();
                
                // 📊 Analytics : tracker le nouveau verset avec sa période
                if (typeof Analytics !== 'undefined') {
                    Analytics.trackMeditationNouveau(verset.periode || 'ordinaire');
                }
                return;
            }
        }
        
        // Fallback sur Data.getRandomVerse si VersetsMeditation n'est pas chargé
        const verse = Data.getRandomVerse();
        if (verse) {
            this.currentVerse = verse;
            this.displayVerse();
        }
    },

    /**
     * Afficher le verset courant
     */
    displayVerse() {
        if (!this.currentVerse) return;

        const refEl = document.getElementById('meditationReference');
        const textEl = document.getElementById('meditationText');
        const periodeEl = document.getElementById('meditationPeriode');

        if (refEl) refEl.textContent = this.currentVerse.reference;
        if (textEl) textEl.textContent = '« ' + this.currentVerse.text + ' »';
        
        // Afficher la période liturgique si disponible
        if (periodeEl && this.currentVerse.periodeNom) {
            periodeEl.innerHTML = `
                <span class="periode-icone">${this.currentVerse.periodeIcone}</span>
                <span class="periode-nom">${this.currentVerse.periodeNom}</span>
            `;
            periodeEl.style.display = 'flex';
        } else if (periodeEl) {
            periodeEl.style.display = 'none';
        }
    },

    /**
     * Vérifier si une méditation existe déjà (même verset, même jour)
     */
    isDuplicate(reference) {
        const today = new Date().toISOString().split('T')[0];
        return this.meditations.some(med => {
            const medDate = med.timestamp ? med.timestamp.split('T')[0] : med.date;
            return med.reference === reference && medDate === today;
        });
    },

    /**
     * Sauvegarder une méditation
     */
    saveMeditation() {
        const notes = document.getElementById('journalTextarea')?.value.trim();
        
        if (!this.currentVerse) {
            this.showMessage('⚠️ Aucun verset sélectionné.', 'warning');
            return;
        }

        // Vérifier les doublons
        if (this.isDuplicate(this.currentVerse.reference)) {
            if (!confirm('Une méditation sur ce verset existe déjà aujourd\'hui. Voulez-vous quand même sauvegarder ?')) {
                return;
            }
        }

        const now = new Date();
        const meditation = {
            timestamp: now.toISOString(),
            reference: this.currentVerse.reference,
            text: this.currentVerse.text,
            notes: notes || ''
        };

        // Ajouter au début
        this.meditations.unshift(meditation);
        this.saveMeditations();
        this.displayHistory();

        // Vider le textarea
        const textarea = document.getElementById('journalTextarea');
        if (textarea) textarea.value = '';

        // 📊 Analytics : tracker la méditation sauvegardée
        if (typeof Analytics !== 'undefined') {
            Analytics.trackMeditationSaved();
        }

        // Confirmation
        this.showMessage('✅ Méditation sauvegardée !', 'success');
    },

    /**
     * Afficher un message temporaire
     */
    showMessage(text, type) {
        const msgEl = document.getElementById('journalSavedMsg');
        if (msgEl) {
            msgEl.textContent = text;
            msgEl.className = 'journal-saved-msg ' + type;
            msgEl.style.display = 'block';
            setTimeout(() => {
                msgEl.style.display = 'none';
            }, 2500);
        }
    },

    /**
     * Basculer l'affichage de l'historique
     */
    toggleHistorique() {
        this.historiqueVisible = !this.historiqueVisible;
        
        const list = document.getElementById('historiqueList');
        const btn = document.getElementById('toggleHistoriqueBtn');
        const clearBtn = document.getElementById('clearHistoriqueBtn');
        
        if (this.historiqueVisible) {
            if (list) list.style.display = 'block';
            if (btn) btn.textContent = '▼ Masquer l\'historique';
            if (clearBtn && this.meditations.length > 0) clearBtn.style.display = 'inline-block';
            this.displayHistory();
        } else {
            if (list) list.style.display = 'none';
            if (btn) btn.textContent = '▶ Voir l\'historique';
            if (clearBtn) clearBtn.style.display = 'none';
        }
    },

    /**
     * Formater la date et l'heure
     */
    formatDateTime(timestamp) {
        const date = new Date(timestamp);
        
        const dateStr = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        const timeStr = date.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        
        return { date: dateStr, time: timeStr };
    },

    /**
     * Afficher l'historique des méditations
     */
    displayHistory() {
        const container = document.getElementById('historiqueList');
        if (!container) return;

        if (this.meditations.length === 0) {
            container.innerHTML = '<p class="no-history">Aucune méditation enregistrée pour le moment.</p>';
            return;
        }

        let html = '';
        this.meditations.forEach((med, index) => {
            // Compatibilité avec l'ancien format (date) et le nouveau (timestamp)
            const timestamp = med.timestamp || med.date + 'T12:00:00';
            const formatted = this.formatDateTime(timestamp);

            html += '<div class="meditation-item" data-index="' + index + '">';
            
            // En-tête avec date, heure et suppression
            html += '<div class="meditation-header">';
            html += '<div class="meditation-datetime">';
            html += '<span class="meditation-date">' + formatted.date + '</span>';
            html += '<span class="meditation-time">à ' + formatted.time + '</span>';
            html += '</div>';
            html += '<button class="meditation-delete" data-index="' + index + '" title="Supprimer">🗑️</button>';
            html += '</div>';
            
            // Référence
            html += '<div class="meditation-ref">' + med.reference + '</div>';
            
            // Verset complet en italique
            html += '<div class="meditation-verse-full">« ' + med.text + ' »</div>';
            
            // Notes de méditation (si présentes)
            if (med.notes && med.notes.trim()) {
                html += '<div class="meditation-notes-section">';
                html += '<div class="meditation-notes-label">Ma méditation :</div>';
                html += '<div class="meditation-notes-content">' + this.escapeHtml(med.notes) + '</div>';
                html += '</div>';
            }
            
            html += '</div>';
        });

        container.innerHTML = html;

        // Événements de suppression
        container.querySelectorAll('.meditation-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                this.deleteMeditation(index);
            });
        });

        // Événements de clic pour revoir
        container.querySelectorAll('.meditation-item').forEach(item => {
            item.addEventListener('click', (e) => {
                // Ne pas déclencher si on clique sur le bouton supprimer
                if (e.target.classList.contains('meditation-delete')) return;
                const index = parseInt(item.dataset.index);
                this.viewMeditation(index);
            });
        });
    },

    /**
     * Échapper le HTML
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML.replace(/\n/g, '<br>');
    },

    /**
     * Supprimer une méditation
     */
    deleteMeditation(index) {
        if (confirm('Supprimer cette méditation ?')) {
            this.meditations.splice(index, 1);
            this.saveMeditations();
            this.displayHistory();
            
            // Masquer le bouton effacer tout si plus de méditations
            const clearBtn = document.getElementById('clearHistoriqueBtn');
            if (clearBtn && this.meditations.length === 0) {
                clearBtn.style.display = 'none';
            }
        }
    },

    /**
     * Effacer tout l'historique
     */
    clearHistory() {
        if (confirm('Effacer toutes les méditations ? Cette action est irréversible.')) {
            this.meditations = [];
            this.saveMeditations();
            this.displayHistory();
            
            const clearBtn = document.getElementById('clearHistoriqueBtn');
            if (clearBtn) clearBtn.style.display = 'none';
        }
    },

    /**
     * Voir une méditation passée
     */
    viewMeditation(index) {
        const med = this.meditations[index];
        if (!med) return;

        this.currentVerse = {
            reference: med.reference,
            text: med.text
        };
        this.displayVerse();

        const notesEl = document.getElementById('journalTextarea');
        if (notesEl) notesEl.value = med.notes || '';

        // Scroll vers le haut
        document.getElementById('tabMediter')?.scrollIntoView({ behavior: 'smooth' });
    },

    /**
     * Initialiser les événements
     */
    init() {
        // Bouton verset aléatoire
        document.getElementById('nouveauVersetBtn')?.addEventListener('click', () => {
            this.showRandomVerse();
        });

        // Bouton sauvegarder
        document.getElementById('saveJournalBtn')?.addEventListener('click', () => {
            this.saveMeditation();
        });

        // Toggle historique
        document.getElementById('toggleHistoriqueBtn')?.addEventListener('click', () => {
            this.toggleHistorique();
        });

        // Effacer historique
        document.getElementById('clearHistoriqueBtn')?.addEventListener('click', () => {
            this.clearHistory();
        });

        // Charger les données
        this.loadMeditations();

        // Afficher un verset initial
        this.showRandomVerse();
    }
};

// Rendre accessible globalement
window.MeditateTab = MeditateTab;
