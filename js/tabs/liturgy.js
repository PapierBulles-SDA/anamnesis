/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Onglet Liturgie (Calendrier)
 * ═══════════════════════════════════════════════════════════════════════════
 */

const LiturgyTab = {
    currentDate: new Date(),
    selectedDate: new Date(),
    zone: 'france',

    /**
     * Rendre le calendrier
     */
    renderCalendar() {
        const container = document.getElementById('calendarDays');
        const titleEl = document.getElementById('calMonthTitle');
        
        if (!container) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Titre
        const monthNames = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        if (titleEl) {
            titleEl.textContent = `${monthNames[month]} ${year}`;
        }

        // Premier jour du mois
        const firstDay = new Date(year, month, 1);
        const startingDay = (firstDay.getDay() + 6) % 7; // Lundi = 0

        // Nombre de jours dans le mois
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Jours du mois précédent
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        container.innerHTML = '';

        // Jours du mois précédent
        for (let i = startingDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = daysInPrevMonth - i;
            container.appendChild(day);
        }

        // Jours du mois courant
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.textContent = i;

            // Marquer aujourd'hui
            if (today.getFullYear() === year && 
                today.getMonth() === month && 
                today.getDate() === i) {
                day.classList.add('today');
            }

            // Marquer la sélection
            if (this.selectedDate.getFullYear() === year && 
                this.selectedDate.getMonth() === month && 
                this.selectedDate.getDate() === i) {
                day.classList.add('selected');
            }

            // Dimanche en rouge
            const dayOfWeek = new Date(year, month, i).getDay();
            if (dayOfWeek === 0) {
                day.classList.add('sunday');
            }

            // Événement de clic
            day.addEventListener('click', () => {
                this.selectDate(new Date(year, month, i));
            });

            container.appendChild(day);
        }

        // Jours du mois suivant
        const totalCells = startingDay + daysInMonth;
        const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
        for (let i = 1; i <= remaining; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day other-month';
            day.textContent = i;
            container.appendChild(day);
        }
    },

    /**
     * Mois précédent
     */
    prevMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    },

    /**
     * Mois suivant
     */
    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    },

    /**
     * Sélectionner une date
     */
    selectDate(date) {
        this.selectedDate = date;
        this.renderCalendar();
        this.loadContent(date);
    },

    /**
     * Charger le contenu liturgique
     */
    loadContent(date) {
        // Format YYYY-MM-DD en heure locale (pas UTC)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;
        
        const url = `https://www.aelf.org/${dateStr}/${this.zone}/messe`;

        // Mettre à jour la date affichée
        const dateEl = document.getElementById('liturgieDate');
        if (dateEl) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateEl.textContent = date.toLocaleDateString('fr-FR', options);
        }

        // Charger l'iframe
        const iframe = document.getElementById('liturgieFrame');
        if (iframe) {
            iframe.src = url;
        }

        // Mettre à jour le lien
        const link = document.getElementById('liturgieLink');
        if (link) {
            link.href = url;
        }
    },

    /**
     * Changer la zone liturgique
     */
    setZone(zone) {
        this.zone = zone;
        this.loadContent(this.selectedDate);
    },

    /**
     * Initialiser les événements
     */
    init() {
        // Navigation du calendrier
        document.getElementById('calPrevMonth')?.addEventListener('click', () => this.prevMonth());
        document.getElementById('calNextMonth')?.addEventListener('click', () => this.nextMonth());

        // Sélecteur de zone
        const zoneSelect = document.getElementById('liturgieZone');
        if (zoneSelect) {
            zoneSelect.addEventListener('change', () => {
                this.setZone(zoneSelect.value);
            });
        }

        // Initialiser
        this.renderCalendar();
        this.loadContent(this.selectedDate);
    }
};

// Rendre accessible globalement
window.LiturgyTab = LiturgyTab;
