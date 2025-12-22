/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Mode Classique
 * ═══════════════════════════════════════════════════════════════════════════
 */

const ClassicMode = {
    /**
     * Démarrer le mode classique
     */
    start() {
        if (App.config.readingFirst) {
            this.showReading();
        } else {
            this.showExercise();
        }
    },

    /**
     * Afficher la page de lecture préalable
     */
    showReading() {
        const readingPage = document.getElementById('readingPage');
        if (readingPage) {
            readingPage.classList.add('active');
        } else {
            console.error('readingPage non trouvé!');
        }
        
        let html = '';
        App.state.currentSeries.forEach((verse, i) => {
            html += `
                <div class="verse-item">
                    <div class="verse-ref">${i + 1}. ${verse.reference}</div>
                    <div class="verse-text">${verse.text}</div>
                </div>
            `;
        });
        
        const verseList = document.getElementById('verseList');
        if (verseList) {
            verseList.innerHTML = html;
        } else {
            console.error('verseList non trouvé!');
        }
    },

    /**
     * Afficher la page d'exercice
     */
    showExercise() {
        const readingPage = document.getElementById('readingPage');
        const exercisePage = document.getElementById('exercisePage');
        
        if (readingPage) readingPage.classList.remove('active');
        if (exercisePage) {
            exercisePage.classList.add('active');
        } else {
            console.error('exercisePage non trouvé!');
        }
        
        // 📊 Analytics : tracker le lancement de l'exercice classique
        if (typeof Analytics !== 'undefined' && App.state.currentVerseIndex === 0) {
            Analytics.trackExerciceStart(
                'classique',
                App.config.difficulty,
                App.state.currentSeries.length
            );
        }
        
        this.displayVerse();
    },

    /**
     * Afficher le verset avec les trous
     */
    displayVerse() {
        
        const verse = App.state.currentSeries[App.state.currentVerseIndex];
        
        if (!verse) {
            console.error('Verset non trouvé à l\'index', App.state.currentVerseIndex);
            return;
        }
        
        
        // Mettre à jour le header
        const exerciseRef = document.getElementById('reference');
        const exerciseProgress = document.getElementById('seriesProgress');
        const exerciseProgressFill = document.getElementById('progressFill');
        
        
        if (exerciseRef) exerciseRef.textContent = verse.reference;
        if (exerciseProgress) {
            exerciseProgress.textContent = `Verset ${App.state.currentVerseIndex + 1} sur ${App.state.currentSeries.length}`;
        }
        if (exerciseProgressFill) {
            const progress = ((App.state.currentVerseIndex + 1) / App.state.currentSeries.length) * 100;
            exerciseProgressFill.style.width = progress + '%';
        }
        
        // Construire l'exercice
        const exerciseContent = document.getElementById('verseContainer');
        
        if (exerciseContent) {
            const exerciseHtml = this.buildExercise(verse);
            exerciseContent.innerHTML = exerciseHtml;
        }
        
        // Réinitialiser l'état des boutons
        const checkBtn = document.getElementById('checkBtn');
        const showBtn = document.getElementById('showBtn');
        const nextBtn = document.getElementById('nextBtn');
        const hintCheckbox = document.getElementById('hintCheckboxClassique');
        const showFirstLetter = document.getElementById('showFirstLetter');
        
        if (checkBtn) checkBtn.style.display = 'block';
        if (showBtn) showBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        if (hintCheckbox) hintCheckbox.style.display = 'flex';
        if (showFirstLetter) showFirstLetter.checked = false;
        
        // Vider le message
        const exerciseMessage = document.getElementById('message');
        if (exerciseMessage) exerciseMessage.innerHTML = '';
        
        // Focus sur le premier input
        setTimeout(() => {
            const firstInput = document.querySelector('#verseContainer input');
            if (firstInput) firstInput.focus();
        }, 100);
    },

    /**
     * Construire l'exercice à trous
     * @param {Object} verse - Le verset
     * @returns {string} HTML de l'exercice
     */
buildExercise(verse) {
        const words = verse.text.split(' ');
        
        // Filtrer les mots importants (on garde l'apostrophe dans le mot)
        const importantWords = words.map((w, i) => ({ word: w, index: i }))
            .filter(w => {
                const cleanWord = w.word.replace(/[.,;:!?«»""]/g, '');
                return cleanWord.length > 3 && 
                       !App.excludedWords.includes(cleanWord.toLowerCase().replace(/[''`]/g, ''));
            });
        
        // Déterminer le nombre de trous
        const difficultyRange = App.blanksCount[App.config.difficulty];
        let numBlanks = Math.floor(Math.random() * (difficultyRange.max - difficultyRange.min + 1)) + difficultyRange.min;
        numBlanks = Math.min(numBlanks, Math.max(1, Math.floor(importantWords.length / 2)));
        
        // Sélectionner les mots à cacher
        const selectedIndices = [];
        const tempImportant = [...importantWords];
        
        for (let i = 0; i < numBlanks && tempImportant.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * tempImportant.length);
            const selected = tempImportant.splice(randomIndex, 1)[0];
            selectedIndices.push(selected.index);
        }
        
// Construire le HTML
        let html = '<div class="verse-text">';
        words.forEach((word, index) => {
            if (selectedIndices.includes(index)) {
                // Extraire uniquement la ponctuation FINALE (pas l'apostrophe au milieu)
                const punctMatch = word.match(/[.,;:!?«»""]+$/);
                const punctuation = punctMatch ? punctMatch[0] : '';
                const cleanWord = punctuation ? word.slice(0, -punctuation.length) : word;
                const inputWidth = Math.max(40, cleanWord.length * 10);
                
                html += `<span class="blank" data-answer="${cleanWord}" style="width: ${inputWidth}px;">
                    <input type="text" placeholder="?" autocomplete="off">
                </span>${punctuation} `;
            } else {
                html += `<span class="word">${word}</span> `;
            }
        });
        html += '</div>';
        
        return html;
    },

    /**
     * Vérifier les réponses
     */
check() {
        const blanks = document.querySelectorAll('#verseContainer .blank');
        let correctCount = 0;
        const totalCount = blanks.length;
        
        blanks.forEach(blank => {
            const input = blank.querySelector('input');
            const userAnswer = input.value.trim();
            const correctAnswer = blank.dataset.answer;
            
            // Vérifier avec tolérance
            if (this.isAnswerAcceptable(userAnswer, correctAnswer)) {
                blank.classList.add('correct');
                blank.classList.remove('wrong');
                correctCount++;
                // Afficher la bonne réponse si légèrement différente
                if (this.normalize(userAnswer) !== this.normalize(correctAnswer)) {
                    input.value = correctAnswer;
                }
            } else {
                blank.classList.add('wrong');
                blank.classList.remove('correct');
            }
        });
        
        const allCorrect = (correctCount === totalCount);
        const verse = App.state.currentSeries[App.state.currentVerseIndex];
        
        // Enregistrer la tentative
        Stats.recordAttempt('classique', allCorrect, allCorrect ? verse.reference : null);
        
        // Enregistrer dans les résultats de la série
        App.state.seriesResults.attempts.push({
            verse: verse.reference,
            correct: allCorrect
        });
        
        const checkBtn = document.getElementById('checkBtn');
        const showBtn = document.getElementById('showBtn');
        const nextBtn = document.getElementById('nextBtn');
        const hintCheckbox = document.getElementById('hintCheckboxClassique');
        const exerciseMessage = document.getElementById('message');
        
        if (allCorrect) {
            App.state.seriesResults.correct++;
            
            if (exerciseMessage) {
                exerciseMessage.innerHTML = `<div class="message success">${this.getSuccessMessage()}</div>`;
            }
            if (checkBtn) checkBtn.style.display = 'none';
            if (showBtn) showBtn.style.display = 'block';
            if (nextBtn) nextBtn.style.display = 'block';
            if (hintCheckbox) hintCheckbox.style.display = 'none';
        } else {
            if (exerciseMessage) {
                const encouragement = this.getEncouragementMessage(correctCount, totalCount);
                exerciseMessage.innerHTML = `<div class="message error">${encouragement}</div>`;
            }
            if (showBtn) showBtn.style.display = 'block';
        }
    },

    /**
     * Messages de succès variés
     */
    getSuccessMessage() {
        const messages = [
            "✨ Excellent ! Tu as tout bon !",
            "🌟 Parfait ! Continue comme ça !",
            "👏 Bravo ! Ta mémoire est au top !",
            "💪 Super ! Tu maîtrises ce verset !",
            "🎯 Impeccable ! Bien joué !",
            "✅ Magnifique ! Pas une seule erreur !"
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    },

    /**
     * Messages d'encouragement selon le score
     */
    getEncouragementMessage(correct, total) {
        const ratio = correct / total;
        const scoreText = `<strong>${correct} sur ${total}</strong>`;
        
        // Tout faux
        if (correct === 0) {
            const messages = [
                `${scoreText} — Prends ton temps et réessaie ! 🌱`,
                `${scoreText} — La mémorisation demande de la patience, tu vas y arriver ! 💪`,
                `${scoreText} — Utilise l'indice "première lettre" si besoin ! 💡`
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        }
        
        // Moins de la moitié
        if (ratio < 0.5) {
            const messages = [
                `${scoreText} — C'est un bon début ! Continue, tu progresses ! 🌿`,
                `${scoreText} — Tu y es presque, encore un petit effort ! 🔥`,
                `${scoreText} — Bien essayé ! La Parole s'enracine peu à peu 📖`
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        }
        
        // La moitié ou plus
        if (ratio < 1) {
            const messages = [
                `${scoreText} — Presque ! Tu y es vraiment proche ! ✨`,
                `${scoreText} — Excellent effort ! Plus qu'un petit pas ! 🎯`,
                `${scoreText} — Super ! Tu connais bien ce verset, finis en beauté ! 💫`
            ];
            return messages[Math.floor(Math.random() * messages.length)];
        }
        
        return `${scoreText} — Réessaie, tu peux le faire ! 💪`;
    },

    /**
     * Normaliser une chaîne (minuscules, sans accents, sans ponctuation)
     */
    normalize(str) {
        return str.trim()
            .toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Enlever les accents
            .replace(/[''`]/g, '')      // Enlever les apostrophes
            .replace(/[.,;:!?«»""]/g, ''); // Enlever la ponctuation
    },

    /**
     * Calculer la distance de Levenshtein entre deux chaînes
     */
    levenshtein(a, b) {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;
        
        const matrix = [];
        
        for (let i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        
        for (let j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        matrix[i][j - 1] + 1,     // insertion
                        matrix[i - 1][j] + 1      // suppression
                    );
                }
            }
        }
        
        return matrix[b.length][a.length];
    },

    /**
     * Vérifier si une réponse est acceptable (avec tolérance)
     */
    isAnswerAcceptable(userAnswer, correctAnswer) {
        // Normaliser les deux réponses
        const normalizedUser = this.normalize(userAnswer);
        const normalizedCorrect = this.normalize(correctAnswer);
        
        // Si vide, c'est faux
        if (!normalizedUser) return false;
        
        // Correspondance exacte (après normalisation)
        if (normalizedUser === normalizedCorrect) return true;
        
        // ═══════════════════════════════════════════════════════════════
        // CAS SPÉCIAL : Jésus-Christ et ses variantes
        // ═══════════════════════════════════════════════════════════════
        const correctLower = correctAnswer.toLowerCase().replace(/[-\s]/g, '');
        if (correctLower === 'jésuschrist' || correctLower === 'jesuschrist') {
            const userLower = userAnswer.toLowerCase().trim()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            // Accepter : jésus, christ, jésus christ, jésus-christ
            const validVariants = ['jesus', 'christ', 'jesuschrist', 'jesus-christ', 'jesus christ'];
            if (validVariants.includes(userLower.replace(/[-\s]/g, '')) || 
                validVariants.includes(userLower)) {
                return true;
            }
        }
        
        // ═══════════════════════════════════════════════════════════════
        // Tolérance aux fautes selon la longueur du mot
        // ═══════════════════════════════════════════════════════════════
        const distance = this.levenshtein(normalizedUser, normalizedCorrect);
        const wordLength = normalizedCorrect.length;
        
        // Mots courts (1-4 lettres) : aucune tolérance
        // Mots moyens (5-7 lettres) : 1 erreur tolérée
        // Mots longs (8+ lettres) : 2 erreurs tolérées
        let tolerance = 0;
        if (wordLength >= 5 && wordLength <= 7) {
            tolerance = 1;
        } else if (wordLength >= 8) {
            tolerance = 2;
        }
        
        return distance <= tolerance;
    },

    /**
     * Afficher les réponses
     */
    showAnswers() {
        const blanks = document.querySelectorAll('#verseContainer .blank');
        
        blanks.forEach(blank => {
            const input = blank.querySelector('input');
            input.value = blank.dataset.answer;
            blank.classList.add('correct');
            blank.classList.remove('wrong');
        });
        
        const checkBtn = document.getElementById('checkBtn');
        const showBtn = document.getElementById('showBtn');
        const nextBtn = document.getElementById('nextBtn');
        const hintCheckbox = document.getElementById('hintCheckboxClassique');
        
        if (checkBtn) checkBtn.style.display = 'none';
        if (showBtn) showBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'block';
        if (hintCheckbox) hintCheckbox.style.display = 'none';
    },

    /**
     * Passer au verset suivant
     */
    next() {
        App.state.currentVerseIndex++;
        
        if (App.state.currentVerseIndex >= App.state.currentSeries.length) {
            const exercisePage = document.getElementById('exercisePage');
            if (exercisePage) exercisePage.classList.remove('active');
            UI.showResults();
        } else {
            this.displayVerse();
        }
    },

    /**
     * Afficher/masquer l'indice première lettre
     * @param {boolean} show - Afficher ou masquer
     */
    toggleFirstLetterHint(show) {
        const blanks = document.querySelectorAll('#verseContainer .blank');
        
        blanks.forEach(blank => {
            const answer = blank.dataset.answer;
            const input = blank.querySelector('input');
            
            if (show && answer) {
                const firstLetter = answer.charAt(0).toLowerCase();
                if (input.value === '' || input.value.toLowerCase() === firstLetter) {
                    input.value = firstLetter;
                    input.dataset.hasHint = 'true';
                }
            } else {
                if (input.dataset.hasHint === 'true' && input.value.length === 1) {
                    input.value = '';
                    input.dataset.hasHint = 'false';
                }
            }
        });
    },

    /**
     * Initialiser les événements
     */
    init() {
        // Bouton "J'ai lu"
        const startExerciseBtn = document.getElementById('startExerciseBtn');
        if (startExerciseBtn) {
            startExerciseBtn.addEventListener('click', () => this.showExercise());
        }
        
        // Bouton vérifier
        const checkBtn = document.getElementById('checkBtn');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => this.check());
        }
        
        // Bouton afficher
        const showBtn = document.getElementById('showBtn');
        if (showBtn) {
            showBtn.addEventListener('click', () => this.showAnswers());
        }
        
        // Bouton suivant
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.next());
        }
        
        // Checkbox indice première lettre
        const showFirstLetter = document.getElementById('showFirstLetter');
        if (showFirstLetter) {
            showFirstLetter.addEventListener('change', function() {
                ClassicMode.toggleFirstLetterHint(this.checked);
            });
        }
        
        // Touche Entrée
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const exercisePage = document.getElementById('exercisePage');
                if (exercisePage && exercisePage.classList.contains('active')) {
                    const checkBtn = document.getElementById('checkBtn');
                    const nextBtn = document.getElementById('nextBtn');
                    
                    if (checkBtn && checkBtn.style.display !== 'none') {
                        checkBtn.click();
                    } else if (nextBtn && nextBtn.style.display !== 'none') {
                        nextBtn.click();
                    }
                }
            }
        });
    }
};

// Rendre accessible globalement
window.ClassicMode = ClassicMode;
