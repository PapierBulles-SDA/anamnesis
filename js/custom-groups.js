/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANAMNÉSIS - Groupes de Versets Personnalisés
 * ═══════════════════════════════════════════════════════════════════════════
 */

const CustomGroups = {
    currentGroupId: null,
    tempRanges: [],
    
    /**
     * Charger les groupes depuis localStorage
     */
    load() {
        const saved = localStorage.getItem('customVerseGroups');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Erreur chargement groupes:', e);
                return [];
            }
        }
        return [];
    },

    /**
     * Sauvegarder les groupes dans localStorage
     */
    save(groups) {
        localStorage.setItem('customVerseGroups', JSON.stringify(groups));
    },

    /**
     * Obtenir un groupe par ID
     */
    getById(id) {
        const groups = this.load();
        return groups.find(g => g.id === id);
    },

    /**
     * Créer un nouveau groupe
     */
    create(name, ranges) {
        const groups = this.load();
        
        const newGroup = {
            id: 'custom_' + Date.now(),
            name: name,
            ranges: ranges,
            createdAt: Date.now(),
            count: this.countVersesInRanges(ranges)
        };
        
        groups.push(newGroup);
        this.save(groups);
        
        return newGroup;
    },

    /**
     * Mettre à jour un groupe
     */
    update(id, name, ranges) {
        const groups = this.load();
        const index = groups.findIndex(g => g.id === id);
        
        if (index !== -1) {
            groups[index].name = name;
            groups[index].ranges = ranges;
            groups[index].count = this.countVersesInRanges(ranges);
            this.save(groups);
            return groups[index];
        }
        
        return null;
    },

    /**
     * Supprimer un groupe
     */
    delete(id) {
        const groups = this.load();
        const filtered = groups.filter(g => g.id !== id);
        this.save(filtered);
        return filtered;
    },

    /**
     * Compter les versets dans des ranges
     */
    countVersesInRanges(ranges) {
        let count = 0;
        ranges.forEach(range => {
            count += (range.fin - range.debut + 1);
        });
        return count;
    },

    /**
     * Vérifier si les versets sont consécutifs
     */
    areConsecutive(verses) {
        if (verses.length < 2) return true;
        
        for (let i = 1; i < verses.length; i++) {
            const prev = verses[i - 1];
            const curr = verses[i];
            
            if (prev.livre === curr.livre && prev.chapitre === curr.chapitre) {
                if (curr.verset !== prev.verset + 1) return false;
            } else if (prev.livre === curr.livre && curr.chapitre === prev.chapitre + 1) {
                if (curr.verset !== 1) return false;
            } else {
                return false;
            }
        }
        
        return true;
    },

    /**
     * Peupler le select des groupes
     */
    populateSelect() {
        const select = document.getElementById('selectCustomGroup');
        if (!select) return;
        
        const groups = this.load();
        
        select.innerHTML = '<option value="">-- Sélectionne un groupe --</option>';
        
        groups.forEach(group => {
            const option = document.createElement('option');
            option.value = group.id;
            option.textContent = `${group.name} (${group.count} versets)`;
            select.appendChild(option);
        });
    },

    /**
     * Afficher les infos d'un groupe
     */
    displayGroupInfo(groupId) {
        const infoDiv = document.getElementById('customGroupInfo');
        if (!infoDiv) return;
        
        if (!groupId) {
            infoDiv.style.display = 'none';
            return;
        }
        
        const group = this.getById(groupId);
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
     * Ouvrir le modal de création/modification
     */
    openModal(groupId = null) {
        this.currentGroupId = groupId;
        this.tempRanges = [];
        
        const modal = document.getElementById('customGroupModal');
        const title = document.getElementById('modalTitle');
        const nameInput = document.getElementById('groupName');
        
        if (groupId) {
            // Mode modification
            const group = this.getById(groupId);
            if (!group) return;
            
            title.textContent = 'Modifier le groupe';
            nameInput.value = group.name;
            this.tempRanges = [...group.ranges];
            this.updateRangesList();
        } else {
            // Mode création
            title.textContent = 'Créer un groupe personnalisé';
            nameInput.value = '';
            this.resetForm();
        }
        
        modal.style.display = 'flex';
        this.initModalSelects();
    },

    /**
     * Fermer le modal
     */
    closeModal() {
        document.getElementById('customGroupModal').style.display = 'none';
        this.currentGroupId = null;
        this.tempRanges = [];
    },

    /**
     * Initialiser les selects du modal
     */
    initModalSelects() {
        const testamentSelect = document.getElementById('modalTestament');
        this.populateModalLivres(testamentSelect.value);
    },

    /**
     * Peupler les livres selon le testament
     */
    populateModalLivres(testament) {
        const select = document.getElementById('modalLivre');
        select.innerHTML = '<option value="">-- Sélectionne un livre --</option>';
        
        // Récupérer les livres depuis versesData
        const livres = [];
        Object.keys(versesData).forEach(partie => {
            Object.keys(versesData[partie]).forEach(livre => {
                const firstVerse = versesData[partie][livre][0];
                if (testament === 'all' || firstVerse.testament === testament) {
                    if (!livres.includes(livre)) {
                        livres.push(livre);
                    }
                }
            });
        });
        
        livres.sort().forEach(livre => {
            const option = document.createElement('option');
            option.value = livre;
            option.textContent = livre;
            select.appendChild(option);
        });
        
        // Reset chapitres
        document.getElementById('modalChapitre').innerHTML = '<option value="">-- Sélectionne d\'abord un livre --</option>';
    },

    /**
     * Peupler les chapitres selon le livre
     */
    populateModalChapitres(livre) {
        const select = document.getElementById('modalChapitre');
        select.innerHTML = '<option value="">-- Sélectionne un chapitre --</option>';
        
        if (!livre) return;
        
        // Récupérer les chapitres depuis versesData
        const chapitres = new Set();
        Object.keys(versesData).forEach(partie => {
            if (versesData[partie][livre]) {
                versesData[partie][livre].forEach(v => {
                    chapitres.add(v.chapitre);
                });
            }
        });
        
        Array.from(chapitres).sort((a, b) => a - b).forEach(chap => {
            const option = document.createElement('option');
            option.value = chap;
            option.textContent = 'Chapitre ' + chap;
            select.appendChild(option);
        });
    },

    /**
     * Ajouter un range à la liste temporaire
     */
    addRange() {
        const livre = document.getElementById('modalLivre').value;
        const chapitre = parseInt(document.getElementById('modalChapitre').value);
        const debut = parseInt(document.getElementById('modalVersetDebut').value);
        const fin = parseInt(document.getElementById('modalVersetFin').value);
        
        // Validation
        if (!livre || !chapitre || !debut || !fin) {
            alert('Veuillez remplir tous les champs.');
            return;
        }
        
        if (debut > fin) {
            alert('Le verset de début doit être inférieur ou égal au verset de fin.');
            return;
        }
        
        // Ajouter le range
        this.tempRanges.push({
            livre: livre,
            chapitre: chapitre,
            debut: debut,
            fin: fin
        });
        
        this.updateRangesList();
        this.resetRangeInputs();
    },

    /**
     * Supprimer un range de la liste temporaire
     */
    removeRange(index) {
        this.tempRanges.splice(index, 1);
        this.updateRangesList();
    },

    /**
     * Mettre à jour l'affichage de la liste des ranges
     */
    updateRangesList() {
        const list = document.getElementById('rangesList');
        const saveBtn = document.getElementById('saveGroupBtn');
        
        list.innerHTML = '';
        
        if (this.tempRanges.length === 0) {
            saveBtn.disabled = true;
            return;
        }
        
        this.tempRanges.forEach((range, index) => {
            const div = document.createElement('div');
            div.className = 'range-item-modal';
            div.innerHTML = `
                <span class="range-text">📖 ${range.livre} ${range.chapitre}, ${range.debut}-${range.fin}</span>
                <button class="range-remove" data-index="${index}">✕</button>
            `;
            list.appendChild(div);
        });
        
        // Event listeners sur les boutons de suppression
        list.querySelectorAll('.range-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeRange(index);
            });
        });
        
        saveBtn.disabled = false;
    },

    /**
     * Reset les inputs de range
     */
    resetRangeInputs() {
        document.getElementById('modalVersetDebut').value = '';
        document.getElementById('modalVersetFin').value = '';
    },

    /**
     * Reset complet du formulaire
     */
    resetForm() {
        document.getElementById('groupName').value = '';
        document.getElementById('modalTestament').value = 'NT';
        document.getElementById('modalLivre').innerHTML = '<option value="">-- Sélectionne un livre --</option>';
        document.getElementById('modalChapitre').innerHTML = '<option value="">-- Sélectionne d\'abord un livre --</option>';
        this.resetRangeInputs();
        document.getElementById('rangesList').innerHTML = '';
        this.tempRanges = [];
    },

    /**
     * Sauvegarder le groupe
     */
    saveGroup() {
        const name = document.getElementById('groupName').value.trim();
        
        if (!name) {
            alert('Veuillez donner un nom au groupe.');
            return;
        }
        
        if (this.tempRanges.length === 0) {
            alert('Veuillez ajouter au moins un passage.');
            return;
        }
        
        if (this.currentGroupId) {
            // Modification
            this.update(this.currentGroupId, name, this.tempRanges);
        } else {
            // Création
            this.create(name, this.tempRanges);
        }
        
        this.closeModal();
        this.populateSelect();
        
        // Réinitialiser la sélection
        const select = document.getElementById('selectCustomGroup');
        select.value = '';
        document.getElementById('editGroupBtn').disabled = true;
        document.getElementById('deleteGroupBtn').disabled = true;
        this.displayGroupInfo(null);
    },

    /**
     * Initialiser les événements
     */
    init() {
        // Bouton Créer
        document.getElementById('createGroupBtn')?.addEventListener('click', () => {
            this.openModal();
        });
        
        // Bouton Modifier
        document.getElementById('editGroupBtn')?.addEventListener('click', () => {
            const groupId = App.config.selectedCustomGroupId;
            if (groupId) this.openModal(groupId);
        });
        
        // Bouton Supprimer
        document.getElementById('deleteGroupBtn')?.addEventListener('click', () => {
            const groupId = App.config.selectedCustomGroupId;
            if (!groupId) return;
            
            const group = this.getById(groupId);
            if (confirm(`Supprimer le groupe "${group.name}" ?`)) {
                this.delete(groupId);
                this.populateSelect();
                App.config.selectedCustomGroupId = null;
                document.getElementById('selectCustomGroup').value = '';
                document.getElementById('editGroupBtn').disabled = true;
                document.getElementById('deleteGroupBtn').disabled = true;
                this.displayGroupInfo(null);
            }
        });
        
        // Sélection d'un groupe
        document.getElementById('selectCustomGroup')?.addEventListener('change', (e) => {
            const groupId = e.target.value;
            App.config.selectedCustomGroupId = groupId || null;
            
            document.getElementById('editGroupBtn').disabled = !groupId;
            document.getElementById('deleteGroupBtn').disabled = !groupId;
            
            this.displayGroupInfo(groupId);
        });
        
        // === MODAL EVENTS ===
        
        // Fermer modal
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('cancelModalBtn')?.addEventListener('click', () => {
            this.closeModal();
        });
        
        // Fermer en cliquant sur l'overlay
        document.getElementById('customGroupModal')?.addEventListener('click', (e) => {
            if (e.target.id === 'customGroupModal') {
                this.closeModal();
            }
        });
        
        // Testament change
        document.getElementById('modalTestament')?.addEventListener('change', (e) => {
            this.populateModalLivres(e.target.value);
        });
        
        // Livre change
        document.getElementById('modalLivre')?.addEventListener('change', (e) => {
            this.populateModalChapitres(e.target.value);
        });
        
        // Ajouter range
        document.getElementById('addRangeBtn')?.addEventListener('click', () => {
            this.addRange();
        });
        
        // Sauvegarder groupe
        document.getElementById('saveGroupBtn')?.addEventListener('click', () => {
            this.saveGroup();
        });
    }
};

// Rendre accessible globalement
window.CustomGroups = CustomGroups;
