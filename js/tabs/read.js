/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Onglet Lire
 * ═══════════════════════════════════════════════════════════════════════════
 */

const ReadTab = {
    selectedPartie: null,
    selectedLivre: null,
    selectedChapitre: null,

    /**
     * Afficher les versets d'un chapitre
     */
    displayChapter() {
        const container = document.getElementById('lectureContent');
        const header = document.getElementById('lectureHeader');
        
        if (!container) return;

        if (!this.selectedLivre || !this.selectedChapitre) {
            container.innerHTML = '<div class="lecture-placeholder">📖 Sélectionne une partie, un livre et un chapitre pour commencer la lecture.</div>';
            if (header) header.innerHTML = '';
            return;
        }

        const versets = Data.getVersetsParLivre(this.selectedLivre)
            .filter(v => v.chapitre === parseInt(this.selectedChapitre));

        if (versets.length === 0) {
            container.innerHTML = '<p>Aucun verset trouvé.</p>';
            return;
        }

        if (header) {
            header.innerHTML = '<h2>' + this.selectedLivre + ' ' + this.selectedChapitre + '</h2>';
        }

        let html = '';
        versets.forEach(v => {
            html += '<div class="lecture-verset" data-ref="' + v.reference + '">';
            html += '<span class="verset-num">' + v.verset + '</span>';
            html += '<span class="verset-text">' + v.text + '</span>';
            html += '</div>';
        });

        container.innerHTML = html;

        // Ajouter les événements de clic pour copier
        container.querySelectorAll('.lecture-verset').forEach(el => {
            el.addEventListener('click', () => {
                const ref = el.dataset.ref;
                navigator.clipboard.writeText(ref).then(() => {
                    this.showCopiedMessage(el);
                });
            });
        });

        // Navigation entre chapitres
        this.updateNavigation();
    },

    /**
     * Afficher une liste de versets (pour passages/groupes)
     * @param {Array} verses - Liste de versets
     * @param {string} title - Titre du passage
     */
    displayVerses(verses, title) {
        const container = document.getElementById('lectureContent');
        const header = document.getElementById('lectureHeader');
        const nav = document.getElementById('lectureNav');
        
        if (!container || !header || verses.length === 0) return;
        
        // Afficher le titre
        header.innerHTML = `
            <h2 class="lecture-title">${title}</h2>
            <p class="lecture-subtitle">${verses.length} verset${verses.length > 1 ? 's' : ''}</p>
        `;
        
        // Afficher les versets
        let html = '';
        verses.forEach(verse => {
            html += `
                <div class="lecture-verset" data-ref="${verse.reference}">
                    <span class="verset-num">${verse.livre} ${verse.chapitre}:${verse.verset}</span>
                    <span class="verset-text">${verse.text}</span>
                </div>
            `;
        });
        
        container.innerHTML = html;
        
        // Ajouter les événements de clic pour copier
        container.querySelectorAll('.lecture-verset').forEach(el => {
            el.addEventListener('click', () => {
                const ref = el.dataset.ref;
                navigator.clipboard.writeText(ref).then(() => {
                    this.showCopiedMessage(el);
                });
            });
        });
        
        // Cacher la navigation (pas de chapitre suivant/précédent)
        if (nav) nav.innerHTML = '';
    },

    /**
     * Mettre à jour la navigation entre chapitres
     */
    updateNavigation() {
        const nav = document.getElementById('lectureNav');
        if (!nav || !this.selectedLivre) {
            if (nav) nav.innerHTML = '';
            return;
        }

        const chapitres = Data.getChapitres(this.selectedLivre);
        const currentIndex = chapitres.indexOf(parseInt(this.selectedChapitre));
        
        let html = '';
        
        if (currentIndex > 0) {
            html += '<button class="nav-btn prev-btn" data-chap="' + chapitres[currentIndex - 1] + '">◀ Chapitre ' + chapitres[currentIndex - 1] + '</button>';
        }
        
        if (currentIndex < chapitres.length - 1) {
            html += '<button class="nav-btn next-btn" data-chap="' + chapitres[currentIndex + 1] + '">Chapitre ' + chapitres[currentIndex + 1] + ' ▶</button>';
        }

        nav.innerHTML = html;

        // Événements
        nav.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectedChapitre = btn.dataset.chap;
                document.getElementById('lireChapitre').value = this.selectedChapitre;
                this.displayChapter();
            });
        });
    },

    /**
     * Afficher le message "copié"
     */
    showCopiedMessage(element) {
        const msg = document.createElement('span');
        msg.className = 'copied-message';
        msg.textContent = '📋 Copié !';
        element.appendChild(msg);
        
        setTimeout(() => {
            msg.remove();
        }, 1500);
    },

    /**
     * Mettre à jour le dropdown des livres
     */
    updateLivreDropdown() {
        const select = document.getElementById('lireLivre');
        const infoBtn = document.getElementById('bookInfoBtn');
        
        if (!select) return;

        select.innerHTML = '<option value="">-- Choisir un livre --</option>';

        if (!this.selectedPartie) {
            select.disabled = true;
            if (infoBtn) infoBtn.disabled = true;
            return;
        }

        select.disabled = false;

        const livres = Data.getLivres(this.selectedPartie);
        livres.forEach(livre => {
            const option = document.createElement('option');
            option.value = livre.nom;
            option.textContent = livre.nom;
            select.appendChild(option);
        });

        this.selectedLivre = null;
        this.selectedChapitre = null;
        if (infoBtn) infoBtn.disabled = true;
        this.updateChapitreDropdown();
    },

    /**
     * Mettre à jour le dropdown des chapitres
     */
    updateChapitreDropdown() {
        const select = document.getElementById('lireChapitre');
        if (!select) return;

        select.innerHTML = '<option value="">-- Choisir un chapitre --</option>';

        if (!this.selectedLivre) {
            select.disabled = true;
            this.displayChapter();
            return;
        }

        select.disabled = false;

        const chapitres = Data.getChapitres(this.selectedLivre);
        chapitres.forEach(chap => {
            const option = document.createElement('option');
            option.value = chap;
            option.textContent = 'Chapitre ' + chap;
            select.appendChild(option);
        });

        this.selectedChapitre = null;
        this.displayChapter();
    },

    /**
     * Afficher la modal d'info du livre
     */
    showBookInfo() {
        if (!this.selectedLivre) return;
        
        const info = window.LivresInfo ? window.LivresInfo[this.selectedLivre] : null;
        if (!info) {
            alert('Informations non disponibles pour ce livre.');
            return;
        }

        const overlay = document.getElementById('bookModalOverlay');
        const badge = document.getElementById('bookModalBadge');
        const title = document.getElementById('bookModalTitle');
        const content = document.getElementById('bookModalContent');

        if (!overlay || !content) return;

        // Header
        if (badge) {
            badge.textContent = info.partie;
            badge.style.backgroundColor = info.couleur;
        }
        if (title) {
            title.textContent = this.selectedLivre;
        }

        // Contenu
        let html = '';

        // Infos rapides
        html += '<div class="book-info-quick">';
        html += '<div class="info-item"><span class="info-icon">✍️</span><span class="info-label">Auteur</span><span class="info-value">' + info.auteur + '</span></div>';
        html += '<div class="info-item"><span class="info-icon">📅</span><span class="info-label">Date</span><span class="info-value">' + info.date + '</span></div>';
        html += '<div class="info-item"><span class="info-icon">📍</span><span class="info-label">Lieu</span><span class="info-value">' + info.lieu + '</span></div>';
        html += '<div class="info-item"><span class="info-icon">👥</span><span class="info-label">Destinataires</span><span class="info-value">' + info.destinataires + '</span></div>';
        html += '<div class="info-item"><span class="info-icon">📖</span><span class="info-label">Chapitres</span><span class="info-value">' + info.chapitres + ' chapitres, ' + info.versets + ' versets</span></div>';
        html += '</div>';

        // Résumé
        html += '<div class="book-info-section">';
        html += '<h3>📝 Résumé</h3>';
        html += '<p>' + info.resume + '</p>';
        html += '</div>';

        // Thèmes
        html += '<div class="book-info-section">';
        html += '<h3>🎯 Thèmes clés</h3>';
        html += '<div class="book-themes">';
        info.themes.forEach(theme => {
            html += '<span class="book-theme">' + theme + '</span>';
        });
        html += '</div>';
        html += '</div>';

        // Structure (dépliable)
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

        // Versets clés (dépliable)
        html += '<details class="book-info-details">';
        html += '<summary>⭐ Versets clés</summary>';
        html += '<div class="book-key-verses">';
        info.versetsCles.forEach(v => {
            html += '<div class="key-verse" data-ref="' + this.selectedLivre + ' ' + v.ref + '">';
            html += '<span class="key-verse-ref">' + this.selectedLivre + ' ' + v.ref + '</span>';
            html += '<span class="key-verse-title">' + v.titre + '</span>';
            html += '</div>';
        });
        html += '</div>';
        html += '</details>';

        content.innerHTML = html;

        // Événements sur les versets clés (aller au passage)
        content.querySelectorAll('.key-verse').forEach(el => {
            el.addEventListener('click', () => {
                const ref = el.dataset.ref;
                this.goToVerse(ref);
                this.hideBookInfo();
            });
        });

        // Afficher la modal
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    },

    /**
     * Fermer la modal
     */
    hideBookInfo() {
        const overlay = document.getElementById('bookModalOverlay');
        if (overlay) {
            overlay.classList.remove('visible');
            document.body.style.overflow = '';
        }
    },

    /**
     * Aller à un verset spécifique
     */
    goToVerse(ref) {
        // Parser la référence (ex: "Matthieu 5:3-12" -> livre=Matthieu, chapitre=5)
        const match = ref.match(/^(.+?)\s+(\d+)/);
        if (!match) return;

        const livre = match[1];
        const chapitre = match[2];

        // Mettre à jour les sélecteurs
        const selectLivre = document.getElementById('lireLivre');
        const selectChapitre = document.getElementById('lireChapitre');

        if (selectLivre && selectLivre.value !== livre) {
            selectLivre.value = livre;
            this.selectedLivre = livre;
            this.updateChapitreDropdown();
        }

        // Attendre que les chapitres soient chargés
        setTimeout(() => {
            if (selectChapitre) {
                selectChapitre.value = chapitre;
                this.selectedChapitre = chapitre;
                this.displayChapter();
            }
        }, 50);
    },

    /**
     * Initialiser les événements
     */
    init() {
        const selectPartie = document.getElementById('lirePartie');
        const selectLivre = document.getElementById('lireLivre');
        const selectChapitre = document.getElementById('lireChapitre');
        const infoBtn = document.getElementById('bookInfoBtn');
        const modalClose = document.getElementById('bookModalClose');
        const modalOverlay = document.getElementById('bookModalOverlay');

        if (selectPartie) {
            selectPartie.addEventListener('change', () => {
                this.selectedPartie = selectPartie.value || null;
                this.updateLivreDropdown();
            });
        }

        if (selectLivre) {
            selectLivre.addEventListener('change', () => {
                this.selectedLivre = selectLivre.value || null;
                // Activer/désactiver le bouton info
                if (infoBtn) {
                    infoBtn.disabled = !this.selectedLivre;
                }
                this.updateChapitreDropdown();
            });
        }

        if (selectChapitre) {
            selectChapitre.addEventListener('change', () => {
                this.selectedChapitre = selectChapitre.value || null;
                this.displayChapter();
            });
        }

        // Bouton info
        if (infoBtn) {
            infoBtn.addEventListener('click', () => {
                this.showBookInfo();
            });
        }

        // Fermer la modal
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.hideBookInfo();
            });
        }

        // Fermer en cliquant sur l'overlay
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.hideBookInfo();
                }
            });
        }

        // Fermer avec Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideBookInfo();
            }
        });
    }
};

// Rendre accessible globalement
window.ReadTab = ReadTab;
