/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Mode Suite (Quel verset vient après ?)
 * ═══════════════════════════════════════════════════════════════════════════
 */

const SuiteMode = {
    /**
     * Démarrer le mode suite
     */
    start() {
        const page = document.getElementById('chainePage');
        if (page) page.classList.add('active');
        
        const state = App.modes.suite;
        state.currentIndex = 0;
        state.answered = false;
        
        // Vérifier qu'on a au moins 2 versets
        if (App.state.currentSeries.length < 2) {
            document.getElementById('chaineReading').style.display = 'none';
            document.getElementById('chaineExercise').style.display = 'block';
            document.getElementById('suiteOptions').innerHTML = '';
            document.getElementById('suiteCurrentRef').textContent = '';
            document.getElementById('suiteCurrentText').textContent = '';
            document.getElementById('chaineProgress').textContent = '';
            document.getElementById('chaineMessage').innerHTML = 
                `<div class="message error">${i18n.messages.notEnoughVerses}</div>`;
            document.getElementById('chaineNextBtn').style.display = 'none';
            return;
        }
        
        if (App.config.readingFirst) {
            this.showReading();
        } else {
            document.getElementById('chaineReading').style.display = 'none';
            document.getElementById('chaineExercise').style.display = 'block';
            this.displayQuestion();
        }
    },

    /**
     * Afficher la lecture préalable
     */
    showReading() {
        const totalQuestions = App.state.currentSeries.length - 1;
        
        document.getElementById('chaineTitle').textContent = i18n.modes.suite.name;
        document.getElementById('chaineProgress').textContent = 
            i18n.format(i18n.suite.versesToRead, { n: App.state.currentSeries.length, m: totalQuestions });
        document.getElementById('chaineProgressFill').style.width = '0%';
        
        let html = '';
        App.state.currentSeries.forEach((verse, i) => {
            html += `
                <div class="verse-item">
                    <div class="verse-ref">${i + 1}. ${verse.reference}</div>
                    <div class="verse-text">${verse.text}</div>
                </div>
            `;
        });
        document.getElementById('chaineReadingList').innerHTML = html;
        
        document.getElementById('chaineReading').style.display = 'block';
        document.getElementById('chaineExercise').style.display = 'none';
    },

    /**
     * Afficher la question
     */
    displayQuestion() {
        const state = App.modes.suite;
        state.answered = false;
        
        const totalQuestions = App.state.currentSeries.length - 1;
        const currentQuestion = state.currentIndex;
        
        // Vérifier si terminé
        if (currentQuestion >= totalQuestions) {
            document.getElementById('chainePage').classList.remove('active');
            UI.showResults();
            return;
        }
        
        const currentVerse = App.state.currentSeries[currentQuestion];
        const nextVerse = App.state.currentSeries[currentQuestion + 1];
        
        // Header
        document.getElementById('chaineTitle').textContent = i18n.modes.suite.name;
        document.getElementById('chaineProgress').textContent = 
            i18n.format(i18n.suite.questionCount, { n: currentQuestion + 1, total: totalQuestions });
        
        const progress = ((currentQuestion + 1) / totalQuestions) * 100;
        document.getElementById('chaineProgressFill').style.width = progress + '%';
        
        // Verset actuel
        document.getElementById('suiteCurrentRef').textContent = currentVerse.reference;
        document.getElementById('suiteCurrentText').textContent = '« ' + currentVerse.text + ' »';
        
        // Générer les options
        const distractors = this.getDistractors(nextVerse, currentVerse, 3);
        
        let options = [{ verse: nextVerse, isCorrect: true }];
        distractors.forEach(d => {
            options.push({ verse: d, isCorrect: false });
        });
        
        // Mélanger
        options = options.sort(() => Math.random() - 0.5);
        
        // Stocker
        state.correctVerse = nextVerse;
        state.options = options;
        
        // Générer le HTML
        const letters = ['A', 'B', 'C', 'D'];
        let optionsHtml = '';
        options.forEach((opt, i) => {
            optionsHtml += `
                <div class="suite-option" data-index="${i}" data-correct="${opt.isCorrect}">
                    <span class="suite-option-letter">${letters[i]}</span>
                    <span class="suite-option-text">« ${opt.verse.text} »</span>
                </div>
            `;
        });
        
        document.getElementById('suiteOptions').innerHTML = optionsHtml;
        document.getElementById('chaineMessage').innerHTML = '';
        document.getElementById('suiteCorrectAnswer').style.display = 'none';
        document.getElementById('chaineNextBtn').style.display = 'none';
        
        // Event listeners
        document.querySelectorAll('.suite-option').forEach(option => {
            option.addEventListener('click', (e) => this.handleOptionClick(e));
        });
    },

    /**
     * Obtenir des distracteurs
     */
    getDistractors(correctVerse, currentVerse, count = 3) {
        const allVersesOfBook = Data.getVersetsParLivre(correctVerse.livre);
        
        let validDistractors = allVersesOfBook.filter(v => {
            if (v.reference === correctVerse.reference) return false;
            if (v.reference === currentVerse.reference) return false;
            if (App.state.currentSeries.some(sv => sv.reference === v.reference)) return false;
            return true;
        });
        
        // Si pas assez, prendre d'autres livres
        if (validDistractors.length < count) {
            const allVerses = Data.getFilteredVerses();
            const additional = allVerses.filter(v => {
                if (v.livre === correctVerse.livre) return false;
                if (App.state.currentSeries.some(sv => sv.reference === v.reference)) return false;
                return true;
            });
            validDistractors = validDistractors.concat(additional);
        }
        
        // Mélanger et retourner
        return validDistractors.sort(() => Math.random() - 0.5).slice(0, count);
    },

    /**
     * Gérer le clic sur une option
     */
    handleOptionClick(e) {
        const state = App.modes.suite;
        
        if (state.answered) return;
        state.answered = true;
        
        const clickedOption = e.currentTarget;
        const isCorrect = clickedOption.dataset.correct === 'true';
        
        // Désactiver toutes les options
        document.querySelectorAll('.suite-option').forEach(opt => {
            opt.classList.add('disabled');
            if (opt.dataset.correct === 'true') {
                opt.classList.add('correct');
            }
        });
        
        // Marquer l'option cliquée
        if (!isCorrect) {
            clickedOption.classList.add('wrong');
        }
        
        const currentVerse = App.state.currentSeries[state.currentIndex];
        
        Stats.recordAttempt('chaine', isCorrect);
        
        if (isCorrect) {
            // Marquer les deux versets comme appris
            Stats.markAsLearned('chaine', currentVerse.reference);
            Stats.markAsLearned('chaine', state.correctVerse.reference);
            
            App.state.seriesResults.correct++;
            document.getElementById('chaineMessage').innerHTML = 
                `<div class="message success">${i18n.messages.successSuite}</div>`;
        } else {
            document.getElementById('chaineMessage').innerHTML = 
                `<div class="message error">${i18n.messages.errorSuite}</div>`;
            
            // Afficher la bonne réponse
            document.getElementById('suiteCorrectRef').textContent = state.correctVerse.reference;
            document.getElementById('suiteCorrectText').textContent = '« ' + state.correctVerse.text + ' »';
            document.getElementById('suiteCorrectAnswer').style.display = 'block';
        }
        
        App.state.seriesResults.attempts.push({
            verse: currentVerse.reference + ' → ' + state.correctVerse.reference,
            correct: isCorrect
        });
        
        Stats.save();
        document.getElementById('chaineNextBtn').style.display = 'block';
    },

    /**
     * Passer à la question suivante
     */
    next() {
        App.modes.suite.currentIndex++;
        this.displayQuestion();
    },

    /**
     * Initialiser les événements
     */
    init() {
        document.getElementById('chaineStartExerciseBtn')?.addEventListener('click', () => {
            document.getElementById('chaineReading').style.display = 'none';
            document.getElementById('chaineExercise').style.display = 'block';
            this.displayQuestion();
        });
        
        document.getElementById('chaineNextBtn')?.addEventListener('click', () => this.next());
        document.getElementById('chaineHomeBtn')?.addEventListener('click', () => UI.returnHome());
    }
};

// Rendre accessible globalement
window.SuiteMode = SuiteMode;
