/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Onglet Prière
 * ═══════════════════════════════════════════════════════════════════════════
 */

const PrayerTab = {
    // État
    currentSection: 'home',
    intentions: [],
    chapeletCount: 0,
    lectioTimer: null,
    lectioCurrentStep: 0,
    lectioTimeLeft: 0,
    lectioVerse: null,

    // ═══════════════════════════════════════════════════════════════════════
    // INITIALISATION
    // ═══════════════════════════════════════════════════════════════════════
    init() {
        this.loadData();
        this.bindEvents();
        this.showHome();
    },

    loadData() {
        // Intentions
        const savedIntentions = localStorage.getItem('prayer_intentions');
        if (savedIntentions) {
            try {
                this.intentions = JSON.parse(savedIntentions);
            } catch (e) {
                this.intentions = [];
            }
        }

        // Compteur chapelet
        this.chapeletCount = parseInt(localStorage.getItem('chapelet_count') || '0');
    },

    saveIntentions() {
        localStorage.setItem('prayer_intentions', JSON.stringify(this.intentions));
    },

    saveChapeletCount() {
        localStorage.setItem('chapelet_count', this.chapeletCount.toString());
    },

    bindEvents() {
        // Navigation principale
        document.querySelectorAll('.prayer-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.navigateTo(section);
            });
        });

        // Bouton retour
        document.getElementById('prayerBackBtn')?.addEventListener('click', () => {
            this.showHome();
        });

        // Trouve ton Verset
        document.getElementById('trouveTonVersetBtn')?.addEventListener('click', () => {
            if (window.TrouveTonVerset) {
                TrouveTonVerset.start();
            }
        });
    },

    // ═══════════════════════════════════════════════════════════════════════
    // NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════
    navigateTo(section) {
        this.currentSection = section;
        
        // Masquer accueil, afficher contenu
        document.getElementById('prayerHome').style.display = 'none';
        document.getElementById('prayerContent').style.display = 'block';
        document.getElementById('prayerBackBtn').style.display = 'flex';

        const content = document.getElementById('prayerContentInner');
        
        switch(section) {
            case 'chapelet':
                this.showChapelet(content);
                break;
            case 'lectio':
                this.showLectio(content);
                break;
            case 'intentions':
                this.showIntentions(content);
                break;
            case 'collection':
                this.showCollection(content);
                break;
        }
    },

    showHome() {
        this.currentSection = 'home';
        document.getElementById('prayerHome').style.display = 'block';
        document.getElementById('prayerContent').style.display = 'none';
        document.getElementById('prayerBackBtn').style.display = 'none';
        
        // Arrêter le timer lectio si actif
        if (this.lectioTimer) {
            clearInterval(this.lectioTimer);
            this.lectioTimer = null;
        }

        // Mettre à jour les stats affichées
        this.updateHomeStats();
    },

    updateHomeStats() {
        const countEl = document.getElementById('chapeletCountDisplay');
        if (countEl) {
            countEl.textContent = this.chapeletCount;
        }

        const intentionsCount = document.getElementById('intentionsCountDisplay');
        if (intentionsCount) {
            const active = this.intentions.filter(i => !i.exauce).length;
            intentionsCount.textContent = active;
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // CHAPELET VISUEL
    // ═══════════════════════════════════════════════════════════════════════
    
    // État du chapelet
    chapeletState: {
        mystereKey: null,
        currentMystere: 0,
        currentBead: 0,
        autoMode: false,
        autoTimer: null,
        soundEnabled: true
    },

    showChapelet(container) {
        const mysteres = PrieresData.mysteres;
        const jour = this.getMysteresDuJour();

        let html = '<div class="chapelet-home">';
        
        // Titre
        html += '<div class="chapelet-home-header">';
        html += '<h2>📿 Le Saint Rosaire</h2>';
        html += '<p>Choisis les mystères à méditer</p>';
        html += '</div>';
        
        // Cartes des mystères
        html += '<div class="mysteres-cards">';
        
        Object.keys(mysteres).forEach(key => {
            const m = mysteres[key];
            const isToday = key === jour;
            html += '<div class="mystere-select-card' + (isToday ? ' today' : '') + '" data-mystere="' + key + '" style="--mystere-color: ' + m.couleur + '">';
            html += '<div class="mystere-card-inner">';
            html += '<div class="mystere-select-icon">' + this.getMystereIcon(key) + '</div>';
            html += '<div class="mystere-select-name">' + m.nom.replace('Mystères ', '') + '</div>';
            html += '<div class="mystere-select-day">' + m.jour + '</div>';
            if (isToday) html += '<div class="today-badge">Aujourd\'hui</div>';
            html += '</div>';
            html += '</div>';
        });
        
        html += '</div>';

        // Stats
        html += '<div class="chapelet-stats-bar">';
        html += '<div class="stat-item">';
        html += '<span class="stat-icon">🔥</span>';
        html += '<span class="stat-value">' + this.getChapeletStreak() + '</span>';
        html += '<span class="stat-label">jours de suite</span>';
        html += '</div>';
        html += '<div class="stat-item">';
        html += '<span class="stat-icon">📿</span>';
        html += '<span class="stat-value">' + this.chapeletCount + '</span>';
        html += '<span class="stat-label">chapelets priés</span>';
        html += '</div>';
        html += '</div>';

        html += '</div>';
        container.innerHTML = html;

        // Events
        container.querySelectorAll('.mystere-select-card').forEach(card => {
            card.addEventListener('click', () => {
                const key = card.dataset.mystere;
                this.startVisualChapelet(key);
            });
        });
    },

    getMystereIcon(key) {
        const icons = { joyeux: '😊', lumineux: '✨', douloureux: '💜', glorieux: '👑' };
        return icons[key] || '📿';
    },

    getMysteresDuJour() {
        const day = new Date().getDay();
        const mapping = [
            'glorieux', 'joyeux', 'douloureux', 'glorieux', 
            'lumineux', 'douloureux', 'joyeux'
        ];
        return mapping[day];
    },

    getChapeletStreak() {
        return parseInt(localStorage.getItem('chapelet_streak') || '0');
    },

    startVisualChapelet(mystereKey) {
        const mystere = PrieresData.mysteres[mystereKey];
        
        this.chapeletState = {
            mystereKey: mystereKey,
            mystere: mystere,
            currentMystere: 0,
            currentBead: 0,
            autoMode: false,
            autoTimer: null,
            soundEnabled: true
        };

        this.renderVisualChapelet();
    },

    renderVisualChapelet() {
        const state = this.chapeletState;
        const mystere = state.mystere;
        const currentMystereData = mystere.liste[state.currentMystere];
        
        let modal = document.getElementById('chapeletVisualModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'chapeletVisualModal';
            modal.className = 'chapelet-visual-overlay';
            document.body.appendChild(modal);
        }

        const prayerInfo = this.getCurrentPrayerInfo();
        const progress = this.getChapeletProgress();

        let html = '<div class="chapelet-visual">';
        
        // Header
        html += '<div class="chapelet-visual-header" style="background: linear-gradient(135deg, ' + mystere.couleur + ' 0%, ' + this.darkenColor(mystere.couleur, 20) + ' 100%)">';
        html += '<button class="chapelet-close" id="closeChapeletVisual">✕</button>';
        html += '<div class="mystere-badge">Mystère ' + (state.currentMystere + 1) + '/5</div>';
        html += '<h2>' + currentMystereData.titre + '</h2>';
        html += '<p>' + currentMystereData.meditation + '</p>';
        html += '</div>';

        // Rosaire visuel
        html += '<div class="rosary-visual">';
        html += this.renderRosaryVisual();
        html += '</div>';

        // Zone prière
        html += '<div class="prayer-zone">';
        html += '<div class="prayer-header">';
        html += '<span class="prayer-icon">' + prayerInfo.icon + '</span>';
        html += '<span class="prayer-name">' + prayerInfo.name + '</span>';
        if (prayerInfo.counter) {
            html += '<span class="prayer-counter">' + prayerInfo.counter + '</span>';
        }
        html += '</div>';
        html += '<div class="prayer-text">' + prayerInfo.text + '</div>';
        html += '</div>';

        // Progression
        html += '<div class="chapelet-progress-bar">';
        html += '<div class="progress-fill" style="width: ' + progress + '%"></div>';
        html += '<span class="progress-text">' + Math.round(progress) + '%</span>';
        html += '</div>';

        // Contrôles
        html += '<div class="chapelet-controls">';
        html += '<button class="ctrl-btn sound-btn" id="chapeletSoundBtn" title="Son">';
        html += state.soundEnabled ? '🔔' : '🔕';
        html += '</button>';
        html += '<button class="ctrl-btn main-btn" id="chapeletNextBead">';
        html += '<span class="btn-text">Perle suivante</span>';
        html += '<span class="btn-icon">▶</span>';
        html += '</button>';
        html += '<button class="ctrl-btn auto-btn ' + (state.autoMode ? 'active' : '') + '" id="chapeletAutoBtn" title="Mode automatique">';
        html += state.autoMode ? '⏸️' : '▶️';
        html += '</button>';
        html += '</div>';

        html += '</div>';
        
        modal.innerHTML = html;
        modal.classList.add('visible');
        document.body.style.overflow = 'hidden';

        this.bindChapeletEvents();
    },

    renderRosaryVisual() {
        const state = this.chapeletState;
        let html = '<div class="rosary-beads">';
        
        // Croix
        html += '<div class="rosary-cross">✝️</div>';
        
        // 5 dizaines en arc
        html += '<div class="rosary-arc">';
        
        for (let d = 0; d < 5; d++) {
            const isDone = d < state.currentMystere;
            const isCurrent = d === state.currentMystere;
            
            html += '<div class="dizaine' + (isCurrent ? ' current' : '') + (isDone ? ' done' : '') + '">';
            
            // Grande perle (Notre Père)
            html += '<div class="bead big ' + this.getBeadClass(d, 0) + '"></div>';
            
            // 10 petites perles
            html += '<div class="small-beads">';
            for (let b = 1; b <= 10; b++) {
                html += '<div class="bead small ' + this.getBeadClass(d, b) + '"></div>';
            }
            html += '</div>';
            
            html += '</div>';
        }
        
        html += '</div>';
        html += '</div>';
        
        return html;
    },

    getBeadClass(dizaine, bead) {
        const state = this.chapeletState;
        if (dizaine < state.currentMystere) return 'prayed';
        if (dizaine > state.currentMystere) return '';
        if (bead < state.currentBead) return 'prayed';
        if (bead === state.currentBead) return 'active';
        return '';
    },

    getCurrentPrayerInfo() {
        const bead = this.chapeletState.currentBead;
        
        if (bead === 0) {
            return {
                icon: '🙏',
                name: 'Notre Père',
                counter: '',
                text: PrieresData.collection.find(p => p.id === 'notre-pere').texte.replace(/\n/g, '<br>')
            };
        } else if (bead <= 10) {
            return {
                icon: '🌹',
                name: 'Je vous salue Marie',
                counter: bead + '/10',
                text: PrieresData.collection.find(p => p.id === 'je-vous-salue').texte.replace(/\n/g, '<br>')
            };
        } else {
            return {
                icon: '✨',
                name: 'Gloire au Père',
                counter: '',
                text: PrieresData.collection.find(p => p.id === 'gloire-au-pere').texte.replace(/\n/g, '<br>')
            };
        }
    },

    getChapeletProgress() {
        const state = this.chapeletState;
        const beadsPerMystere = 12; // 1 Notre Père + 10 Je vous salue + 1 Gloire
        const totalBeads = 5 * beadsPerMystere;
        const prayedBeads = (state.currentMystere * beadsPerMystere) + state.currentBead;
        return (prayedBeads / totalBeads) * 100;
    },

    bindChapeletEvents() {
        const self = this;
        
        document.getElementById('closeChapeletVisual')?.addEventListener('click', () => {
            self.closeChapelet();
        });

        document.getElementById('chapeletNextBead')?.addEventListener('click', () => {
            self.nextBead();
        });

        document.getElementById('chapeletAutoBtn')?.addEventListener('click', () => {
            self.toggleAutoMode();
        });

        document.getElementById('chapeletSoundBtn')?.addEventListener('click', () => {
            self.chapeletState.soundEnabled = !self.chapeletState.soundEnabled;
            const btn = document.getElementById('chapeletSoundBtn');
            if (btn) btn.textContent = self.chapeletState.soundEnabled ? '🔔' : '🔕';
        });
    },

    nextBead() {
        const state = this.chapeletState;
        
        if (state.soundEnabled) this.playBeadSound();

        if (state.currentBead < 11) {
            state.currentBead++;
        } else {
            if (state.currentMystere < 4) {
                state.currentMystere++;
                state.currentBead = 0;
            } else {
                this.completeChapelet();
                return;
            }
        }

        this.renderVisualChapelet();
    },

    toggleAutoMode() {
        const state = this.chapeletState;
        state.autoMode = !state.autoMode;
        
        if (state.autoMode) {
            const self = this;
            state.autoTimer = setInterval(() => self.nextBead(), 6000);
        } else if (state.autoTimer) {
            clearInterval(state.autoTimer);
            state.autoTimer = null;
        }
        
        this.renderVisualChapelet();
    },

    playBeadSound() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 520;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.08, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
        } catch (e) {}
    },

    darkenColor(hex, percent) {
        const num = parseInt(hex.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = Math.max((num >> 16) - amt, 0);
        const G = Math.max((num >> 8 & 0x00FF) - amt, 0);
        const B = Math.max((num & 0x0000FF) - amt, 0);
        return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
    },

    completeChapelet() {
        if (this.chapeletState.autoTimer) {
            clearInterval(this.chapeletState.autoTimer);
        }
        
        this.chapeletCount++;
        this.saveChapeletCount();
        this.updateChapeletStreak();

        const mystere = this.chapeletState.mystere;
        const modal = document.getElementById('chapeletVisualModal');
        
        if (modal) {
            modal.innerHTML = '<div class="chapelet-complete-screen">' +
                '<div class="complete-glow"></div>' +
                '<div class="complete-rosary">📿</div>' +
                '<h2>Chapelet terminé</h2>' +
                '<p class="complete-mystere-name">' + mystere.nom + '</p>' +
                '<p class="complete-blessing">Que la Vierge Marie intercède pour toi<br>et pour toutes tes intentions.</p>' +
                '<div class="complete-stats-row">' +
                '<div class="complete-stat"><div class="stat-number">' + this.chapeletCount + '</div><div class="stat-text">chapelets</div></div>' +
                '<div class="complete-stat"><div class="stat-number">' + this.getChapeletStreak() + '</div><div class="stat-text">jours</div></div>' +
                '</div>' +
                '<button class="complete-btn" id="chapeletDoneBtn">Amen ✨</button>' +
                '</div>';

            document.getElementById('chapeletDoneBtn')?.addEventListener('click', () => {
                this.closeChapelet();
            });
        }
    },

    updateChapeletStreak() {
        const lastDate = localStorage.getItem('chapelet_last_date');
        const today = new Date().toISOString().split('T')[0];
        
        if (lastDate === today) return;
        
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        let streak = parseInt(localStorage.getItem('chapelet_streak') || '0');
        streak = (lastDate === yesterdayStr) ? streak + 1 : 1;
        
        localStorage.setItem('chapelet_streak', streak.toString());
        localStorage.setItem('chapelet_last_date', today);
    },

    closeChapelet() {
        if (this.chapeletState.autoTimer) {
            clearInterval(this.chapeletState.autoTimer);
        }
        
        const modal = document.getElementById('chapeletVisualModal');
        if (modal) {
            modal.classList.remove('visible');
        }
        document.body.style.overflow = '';
        
        this.updateHomeStats();
        const container = document.getElementById('prayerContentInner');
        if (container && this.currentSection === 'chapelet') {
            this.showChapelet(container);
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // LECTIO DIVINA
    // ═══════════════════════════════════════════════════════════════════════
    showLectio(container) {
        let html = '<div class="lectio-container">';
        
        html += '<div class="lectio-intro">';
        html += '<h2>📖 Lectio Divina</h2>';
        html += '<p>Une méthode de prière contemplative en 4 étapes pour laisser la Parole de Dieu transformer ton cœur.</p>';
        html += '</div>';

        // Étapes
        html += '<div class="lectio-steps-preview">';
        PrieresData.lectioDivina.forEach((step, i) => {
            html += '<div class="lectio-step-preview">';
            html += '<span class="step-icon" style="background: ' + step.couleur + '">' + step.icone + '</span>';
            html += '<span class="step-name">' + step.titre + '</span>';
            html += '<span class="step-duration">' + Math.floor(step.duree / 60) + ' min</span>';
            html += '</div>';
        });
        html += '</div>';

        // Sélection du verset
        html += '<div class="lectio-verse-selection">';
        html += '<h3>Choisis ton verset</h3>';
        html += '<div class="verse-options">';
        html += '<button class="verse-option-btn active" data-type="random">🎲 Verset aléatoire</button>';
        html += '<button class="verse-option-btn" data-type="liturgy">📅 Évangile du jour</button>';
        html += '</div>';
        html += '</div>';

        // Bouton commencer
        html += '<button class="btn-start-lectio" id="startLectioBtn">🕯️ Commencer la Lectio Divina</button>';

        html += '</div>';
        container.innerHTML = html;

        // Events
        container.querySelectorAll('.verse-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.verse-option-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        document.getElementById('startLectioBtn').addEventListener('click', () => {
            const type = container.querySelector('.verse-option-btn.active').dataset.type;
            this.startLectio(container, type);
        });
    },

    startLectio(container, type) {
        // Obtenir le verset
        if (type === 'random') {
            this.lectioVerse = Data.getRandomVerse();
        } else {
            // Pour l'instant, utiliser un verset aléatoire
            // Plus tard, intégrer l'évangile du jour depuis l'API liturgique
            this.lectioVerse = Data.getRandomVerse();
        }

        this.lectioCurrentStep = 0;
        this.renderLectioStep(container);
    },

    renderLectioStep(container) {
        const step = PrieresData.lectioDivina[this.lectioCurrentStep];
        this.lectioTimeLeft = step.duree;

        let html = '<div class="lectio-active">';
        
        // Header avec étape
        html += '<div class="lectio-active-header" style="background: ' + step.couleur + '">';
        html += '<div class="lectio-step-info">';
        html += '<span class="step-number">Étape ' + (this.lectioCurrentStep + 1) + '/4</span>';
        html += '<h2>' + step.icone + ' ' + step.etape + '</h2>';
        html += '<p>' + step.titre + '</p>';
        html += '</div>';
        html += '<div class="lectio-timer" id="lectioTimer">' + this.formatTime(this.lectioTimeLeft) + '</div>';
        html += '</div>';

        // Progression
        html += '<div class="lectio-progress">';
        PrieresData.lectioDivina.forEach((s, i) => {
            const status = i < this.lectioCurrentStep ? 'done' : (i === this.lectioCurrentStep ? 'active' : '');
            html += '<div class="progress-step ' + status + '" style="--step-color: ' + s.couleur + '">';
            html += '<span class="progress-icon">' + s.icone + '</span>';
            html += '</div>';
        });
        html += '</div>';

        // Verset
        html += '<div class="lectio-verse-display">';
        html += '<div class="verse-text">« ' + this.lectioVerse.text + ' »</div>';
        html += '<div class="verse-ref">' + this.lectioVerse.reference + '</div>';
        html += '</div>';

        // Instruction
        html += '<div class="lectio-instruction">';
        html += '<p>' + step.instruction + '</p>';
        html += '</div>';

        // Zone de notes (pour Oratio)
        if (this.lectioCurrentStep === 2) {
            html += '<div class="lectio-notes">';
            html += '<textarea id="lectioNotesArea" placeholder="Écris ta prière ici..."></textarea>';
            html += '</div>';
        }

        // Contrôles
        html += '<div class="lectio-controls">';
        html += '<button class="btn-lectio-control" id="lectioPauseBtn">⏸️ Pause</button>';
        html += '<button class="btn-lectio-control primary" id="lectioNextBtn">Étape suivante ▶</button>';
        html += '</div>';

        html += '</div>';
        container.innerHTML = html;

        // Démarrer le timer
        this.startLectioTimer(container);

        // Events
        document.getElementById('lectioPauseBtn').addEventListener('click', () => {
            this.toggleLectioPause();
        });

        document.getElementById('lectioNextBtn').addEventListener('click', () => {
            this.nextLectioStep(container);
        });
    },

    startLectioTimer(container) {
        if (this.lectioTimer) clearInterval(this.lectioTimer);
        
        this.lectioTimer = setInterval(() => {
            this.lectioTimeLeft--;
            const timerEl = document.getElementById('lectioTimer');
            if (timerEl) {
                timerEl.textContent = this.formatTime(this.lectioTimeLeft);
            }

            if (this.lectioTimeLeft <= 0) {
                // Auto-passer à l'étape suivante avec un son doux
                this.playBell();
                this.nextLectioStep(container);
            }
        }, 1000);
    },

    toggleLectioPause() {
        const btn = document.getElementById('lectioPauseBtn');
        if (this.lectioTimer) {
            clearInterval(this.lectioTimer);
            this.lectioTimer = null;
            btn.textContent = '▶️ Reprendre';
        } else {
            this.startLectioTimer(document.getElementById('prayerContentInner'));
            btn.textContent = '⏸️ Pause';
        }
    },

    nextLectioStep(container) {
        if (this.lectioTimer) {
            clearInterval(this.lectioTimer);
            this.lectioTimer = null;
        }

        this.lectioCurrentStep++;
        
        if (this.lectioCurrentStep >= 4) {
            // Fin de la Lectio
            this.showLectioComplete(container);
        } else {
            this.renderLectioStep(container);
        }
    },

    showLectioComplete(container) {
        let html = '<div class="lectio-complete">';
        html += '<div class="complete-icon">🕯️</div>';
        html += '<h2>Lectio Divina terminée</h2>';
        html += '<p>Que cette Parole demeure en toi et porte du fruit.</p>';
        html += '<div class="complete-verse">';
        html += '<p>« ' + this.lectioVerse.text.substring(0, 100) + '... »</p>';
        html += '<span>' + this.lectioVerse.reference + '</span>';
        html += '</div>';
        html += '<button class="btn-primary" id="lectioFinishBtn">Amen</button>';
        html += '</div>';
        
        container.innerHTML = html;

        document.getElementById('lectioFinishBtn').addEventListener('click', () => {
            this.showLectio(container);
        });
    },

    formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return m + ':' + (s < 10 ? '0' : '') + s;
    },

    playBell() {
        // Son de cloche simple avec Web Audio API
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 830;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 1);
        } catch (e) {
            // Silently fail if audio not supported
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // INTENTIONS
    // ═══════════════════════════════════════════════════════════════════════
    showIntentions(container) {
        let html = '<div class="intentions-container">';
        
        html += '<div class="intentions-header">';
        html += '<h2>💝 Mes intentions de prière</h2>';
        html += '</div>';

        // Formulaire ajout
        html += '<div class="intention-form">';
        html += '<div class="intention-categories">';
        PrieresData.intentionCategories.forEach(cat => {
            html += '<button class="intention-cat-btn" data-cat="' + cat.id + '">';
            html += '<span class="cat-icon">' + cat.icone + '</span>';
            html += '<span class="cat-name">' + cat.nom + '</span>';
            html += '</button>';
        });
        html += '</div>';
        html += '<input type="text" id="intentionInput" placeholder="Mon intention de prière..." />';
        html += '<button class="btn-add-intention" id="addIntentionBtn">➕ Ajouter</button>';
        html += '</div>';

        // Liste des intentions actives
        html += '<div class="intentions-list" id="intentionsList">';
        html += this.renderIntentionsList();
        html += '</div>';

        // Mur des grâces
        const exaucees = this.intentions.filter(i => i.exauce);
        if (exaucees.length > 0) {
            html += '<div class="graces-section">';
            html += '<h3>🌟 Mur des grâces</h3>';
            html += '<p class="graces-count">' + exaucees.length + ' prière(s) exaucée(s)</p>';
            html += '<button class="btn-show-graces" id="showGracesBtn">Voir les grâces reçues</button>';
            html += '</div>';
        }

        html += '</div>';
        container.innerHTML = html;

        // Events
        let selectedCat = 'autre';
        container.querySelectorAll('.intention-cat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.intention-cat-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedCat = btn.dataset.cat;
            });
        });

        document.getElementById('addIntentionBtn').addEventListener('click', () => {
            const input = document.getElementById('intentionInput');
            const text = input.value.trim();
            if (text) {
                this.addIntention(text, selectedCat);
                input.value = '';
                document.getElementById('intentionsList').innerHTML = this.renderIntentionsList();
                this.bindIntentionEvents();
            }
        });

        document.getElementById('intentionInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                document.getElementById('addIntentionBtn').click();
            }
        });

        document.getElementById('showGracesBtn')?.addEventListener('click', () => {
            this.showGracesModal();
        });

        this.bindIntentionEvents();
    },

    renderIntentionsList() {
        const active = this.intentions.filter(i => !i.exauce);
        
        if (active.length === 0) {
            return '<p class="no-intentions">Aucune intention pour le moment.<br>Confie tes prières au Seigneur.</p>';
        }

        let html = '';
        active.forEach((intention, index) => {
            const cat = PrieresData.intentionCategories.find(c => c.id === intention.categorie) || PrieresData.intentionCategories[5];
            const realIndex = this.intentions.indexOf(intention);
            
            html += '<div class="intention-card" data-index="' + realIndex + '">';
            html += '<div class="intention-icon">' + cat.icone + '</div>';
            html += '<div class="intention-content">';
            html += '<p class="intention-text">' + this.escapeHtml(intention.texte) + '</p>';
            html += '<span class="intention-date">' + this.formatDate(intention.date) + '</span>';
            html += '</div>';
            html += '<div class="intention-actions">';
            html += '<button class="btn-exauce" data-index="' + realIndex + '" title="Marquer comme exaucé">✨</button>';
            html += '<button class="btn-delete-intention" data-index="' + realIndex + '" title="Supprimer">🗑️</button>';
            html += '</div>';
            html += '</div>';
        });
        
        return html;
    },

    bindIntentionEvents() {
        document.querySelectorAll('.btn-exauce').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                this.markAsExauce(index);
            });
        });

        document.querySelectorAll('.btn-delete-intention').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const index = parseInt(btn.dataset.index);
                this.deleteIntention(index);
            });
        });
    },

    addIntention(texte, categorie) {
        this.intentions.unshift({
            texte: texte,
            categorie: categorie,
            date: new Date().toISOString(),
            exauce: false
        });
        this.saveIntentions();
        this.updateHomeStats();
    },

    markAsExauce(index) {
        const intention = this.intentions[index];
        if (!intention) return;

        // Demander un petit témoignage
        const temoignage = prompt('Comment cette prière a-t-elle été exaucée ? (optionnel)');
        
        intention.exauce = true;
        intention.dateExauce = new Date().toISOString();
        intention.temoignage = temoignage || '';
        
        this.saveIntentions();
        
        // Rafraîchir l'affichage
        const container = document.getElementById('prayerContentInner');
        this.showIntentions(container);
    },

    deleteIntention(index) {
        if (confirm('Supprimer cette intention ?')) {
            this.intentions.splice(index, 1);
            this.saveIntentions();
            document.getElementById('intentionsList').innerHTML = this.renderIntentionsList();
            this.bindIntentionEvents();
            this.updateHomeStats();
        }
    },

    showGracesModal() {
        let modal = document.getElementById('gracesModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'gracesModal';
            modal.className = 'prayer-modal-overlay';
            document.body.appendChild(modal);
        }

        const exaucees = this.intentions.filter(i => i.exauce);
        
        let html = '<div class="prayer-modal graces-modal">';
        html += '<div class="graces-modal-header">';
        html += '<h2>🌟 Mur des grâces</h2>';
        html += '<button class="modal-close" id="closeGracesModal">✕</button>';
        html += '</div>';
        html += '<div class="graces-list">';
        
        exaucees.forEach(i => {
            const cat = PrieresData.intentionCategories.find(c => c.id === i.categorie) || PrieresData.intentionCategories[5];
            html += '<div class="grace-card">';
            html += '<div class="grace-icon">' + cat.icone + '</div>';
            html += '<div class="grace-content">';
            html += '<p class="grace-text">' + this.escapeHtml(i.texte) + '</p>';
            if (i.temoignage) {
                html += '<p class="grace-temoignage">« ' + this.escapeHtml(i.temoignage) + ' »</p>';
            }
            html += '<span class="grace-date">Exaucé le ' + this.formatDate(i.dateExauce) + '</span>';
            html += '</div>';
            html += '</div>';
        });
        
        html += '</div>';
        html += '</div>';
        
        modal.innerHTML = html;
        modal.classList.add('visible');

        document.getElementById('closeGracesModal').onclick = () => {
            modal.classList.remove('visible');
        };

        modal.onclick = (e) => {
            if (e.target === modal) modal.classList.remove('visible');
        };
    },

    // ═══════════════════════════════════════════════════════════════════════
    // COLLECTION DE PRIÈRES
    // ═══════════════════════════════════════════════════════════════════════
    showCollection(container) {
        let html = '<div class="collection-container">';
        
        html += '<div class="collection-header">';
        html += '<h2>📜 Collection de prières</h2>';
        html += '</div>';

        // Filtres par catégorie
        html += '<div class="collection-filters">';
        html += '<button class="filter-btn active" data-filter="all">Toutes</button>';
        PrieresData.categories.forEach(cat => {
            html += '<button class="filter-btn" data-filter="' + cat.id + '">' + cat.icone + '</button>';
        });
        html += '</div>';

        // Liste des prières
        html += '<div class="prayers-grid" id="prayersGrid">';
        PrieresData.collection.forEach(priere => {
            html += this.renderPrayerCard(priere);
        });
        html += '</div>';

        html += '</div>';
        container.innerHTML = html;

        // Events filtres
        container.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                const grid = document.getElementById('prayersGrid');
                
                if (filter === 'all') {
                    grid.innerHTML = PrieresData.collection.map(p => this.renderPrayerCard(p)).join('');
                } else {
                    const filtered = PrieresData.collection.filter(p => p.categorie === filter);
                    grid.innerHTML = filtered.map(p => this.renderPrayerCard(p)).join('');
                }
                
                this.bindPrayerCardEvents();
            });
        });

        this.bindPrayerCardEvents();
    },

    renderPrayerCard(priere) {
        const cat = PrieresData.categories.find(c => c.id === priere.categorie);
        return '<div class="prayer-card" data-id="' + priere.id + '">' +
            '<div class="prayer-card-icon" style="background: ' + (cat?.couleur || '#667eea') + '">' + priere.icone + '</div>' +
            '<div class="prayer-card-title">' + priere.titre + '</div>' +
            '</div>';
    },

    bindPrayerCardEvents() {
        document.querySelectorAll('.prayer-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                this.showPrayerModal(id);
            });
        });
    },

    showPrayerModal(id) {
        const priere = PrieresData.collection.find(p => p.id === id);
        if (!priere) return;

        let modal = document.getElementById('prayerModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'prayerModal';
            modal.className = 'prayer-modal-overlay';
            document.body.appendChild(modal);
        }

        const cat = PrieresData.categories.find(c => c.id === priere.categorie);

        let html = '<div class="prayer-modal prayer-display-modal">';
        html += '<div class="prayer-modal-header" style="background: ' + (cat?.couleur || '#667eea') + '">';
        html += '<span class="prayer-modal-icon">' + priere.icone + '</span>';
        html += '<h2>' + priere.titre + '</h2>';
        html += '<button class="modal-close" id="closePrayerModal">✕</button>';
        html += '</div>';
        html += '<div class="prayer-modal-body">';
        html += '<p class="prayer-origine">' + priere.origine + '</p>';
        html += '<div class="prayer-text-full">' + priere.texte.replace(/\n/g, '<br>') + '</div>';
        html += '</div>';
        html += '</div>';

        modal.innerHTML = html;
        modal.classList.add('visible');

        document.getElementById('closePrayerModal').onclick = () => {
            modal.classList.remove('visible');
        };

        modal.onclick = (e) => {
            if (e.target === modal) modal.classList.remove('visible');
        };
    },

    // ═══════════════════════════════════════════════════════════════════════
    // UTILITAIRES
    // ═══════════════════════════════════════════════════════════════════════
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    formatDate(isoString) {
        const date = new Date(isoString);
        return date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
};

// Rendre accessible globalement
window.PrayerTab = PrayerTab;
