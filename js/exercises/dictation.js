/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Mode Dictée Audio
 * ═══════════════════════════════════════════════════════════════════════════
 */

const DictationMode = {
    /**
     * Démarrer le mode dictée
     */
    start() {
        const page = document.getElementById('audioPage');
        if (page) page.classList.add('active');
        
        App.state.currentVerseIndex = 0;
        App.modes.audio.currentSpeed = 1;
        
        this.displayVerse();
    },

    /**
     * Afficher le verset à dicter
     */
    displayVerse() {
        const verse = App.state.currentSeries[App.state.currentVerseIndex];
        
        // Header
        document.getElementById('audioRef').textContent = verse.reference;
        document.getElementById('audioProgress').textContent = 
            `Verset ${App.state.currentVerseIndex + 1} sur ${App.state.currentSeries.length}`;
        
        const progress = ((App.state.currentVerseIndex + 1) / App.state.currentSeries.length) * 100;
        document.getElementById('audioProgressFill').style.width = progress + '%';
        
        document.getElementById('audioReference').textContent = verse.reference;
        
        // Reset
        document.getElementById('dicteeTextarea').value = '';
        document.getElementById('dicteeResult').style.display = 'none';
        document.getElementById('dicteeResult').innerHTML = '';
        document.getElementById('dicteeScore').innerHTML = '';
        
        // Boutons
        document.getElementById('audioCheckBtn').style.display = 'block';
        document.getElementById('audioNextBtn').style.display = 'none';
        
        // Reset vitesse active
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.classList.toggle('active', parseFloat(btn.dataset.speed) === 1);
        });
    },

    /**
     * Lire le verset
     */
    speak() {
        const verse = App.state.currentSeries[App.state.currentVerseIndex];
        
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(verse.text);
            utterance.lang = 'fr-FR';
            utterance.rate = App.modes.audio.currentSpeed;
            
            // Chercher une voix française
            const voices = window.speechSynthesis.getVoices();
            const frenchVoice = voices.find(v => v.lang.startsWith('fr'));
            if (frenchVoice) {
                utterance.voice = frenchVoice;
            }
            
            window.speechSynthesis.speak(utterance);
        } else {
            alert('La synthèse vocale n\'est pas supportée par votre navigateur.');
        }
    },

    /**
     * Changer la vitesse
     */
    setSpeed(speed) {
        App.modes.audio.currentSpeed = speed;
        
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.classList.toggle('active', parseFloat(btn.dataset.speed) === speed);
        });
    },

    /**
     * Vérifier la transcription
     */
    check() {
        const verse = App.state.currentSeries[App.state.currentVerseIndex];
        const userText = document.getElementById('dicteeTextarea').value.trim();
        
        if (!userText) {
            document.getElementById('dicteeScore').innerHTML = 
                '<div class="message error">⚠️ Écris ta transcription avant de vérifier.</div>';
            return;
        }
        
        // Comparer les textes
        const result = this.compareTexts(verse.text, userText);
        
        // Afficher le résultat
        document.getElementById('dicteeResult').innerHTML = result.html;
        document.getElementById('dicteeResult').style.display = 'block';
        
        const scorePercent = result.score;
        const success = scorePercent >= 80;
        
        Stats.recordAttempt('audio', success, success ? verse.reference : null);
        
        App.state.seriesResults.attempts.push({
            verse: verse.reference,
            correct: success
        });
        
        if (success) {
            App.state.seriesResults.correct++;
            document.getElementById('dicteeScore').innerHTML = 
                `<div class="message success">${i18n.messages.success} Score : ${scorePercent}%</div>`;
        } else {
            document.getElementById('dicteeScore').innerHTML = 
                `<div class="message error">Score : ${scorePercent}% (80% minimum requis)</div>`;
        }
        
        document.getElementById('audioCheckBtn').style.display = 'none';
        document.getElementById('audioNextBtn').style.display = 'block';
    },

    /**
     * Comparer deux textes
     */
    compareTexts(original, user) {
        // Normaliser
        const normalize = (text) => text.toLowerCase()
            .replace(/[.,;:!?«»""''']/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        const originalWords = normalize(original).split(' ');
        const userWords = normalize(user).split(' ');
        
        let html = '';
        let correctCount = 0;
        
        originalWords.forEach((word, i) => {
            // Chercher le mot dans une fenêtre de 3 mots
            let found = false;
            for (let j = Math.max(0, i - 2); j < Math.min(userWords.length, i + 3); j++) {
                if (userWords[j] === word) {
                    found = true;
                    break;
                }
            }
            
            if (found) {
                html += `<span class="correct">${word}</span> `;
                correctCount++;
            } else {
                // Chercher un mot similaire (même début ou fin)
                let similar = false;
                for (let j = Math.max(0, i - 2); j < Math.min(userWords.length, i + 3); j++) {
                    if (userWords[j] && (
                        userWords[j].startsWith(word.substring(0, 3)) ||
                        word.startsWith(userWords[j].substring(0, 3))
                    )) {
                        similar = true;
                        break;
                    }
                }
                
                if (similar) {
                    html += `<span class="typo">${word}</span> `;
                    correctCount += 0.5;
                } else {
                    html += `<span class="missing">[${word}]</span> `;
                }
            }
        });
        
        const score = Math.round((correctCount / originalWords.length) * 100);
        
        return { html, score };
    },

    /**
     * Passer au verset suivant
     */
    next() {
        App.state.currentVerseIndex++;
        
        if (App.state.currentVerseIndex >= App.state.currentSeries.length) {
            document.getElementById('audioPage').classList.remove('active');
            UI.showResults();
        } else {
            this.displayVerse();
        }
    },

    /**
     * Initialiser les événements
     */
    init() {
        // Charger les voix
        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
        
        document.getElementById('audioPlayBtn')?.addEventListener('click', () => this.speak());
        document.getElementById('audioReplayBtn')?.addEventListener('click', () => this.speak());
        
        document.querySelectorAll('.speed-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setSpeed(parseFloat(btn.dataset.speed));
            });
        });
        
        document.getElementById('audioCheckBtn')?.addEventListener('click', () => this.check());
        document.getElementById('audioNextBtn')?.addEventListener('click', () => this.next());
        document.getElementById('audioHomeBtn')?.addEventListener('click', () => UI.returnHome());
    }
};

// Rendre accessible globalement
window.DictationMode = DictationMode;
