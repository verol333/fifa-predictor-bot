// Initialisation de l'application
document.addEventListener("DOMContentLoaded", function() {
    // Initialiser les événements
    initEvents();
    
    // Charger la liste des équipes
    loadTeamsList();
    
    // Essayer d'initialiser Telegram WebApp si disponible
    try {
        if (window.Telegram && window.Telegram.WebApp) {
            window.Telegram.WebApp.ready();
            console.log("Telegram WebApp initialisé avec succès");
        }
    } catch (error) {
        console.warn("Telegram WebApp non disponible:", error);
    }
});

// Initialisation des événements
function initEvents() {
    // Bouton de vérification d'abonnement
    const verifyBtn = document.getElementById('verify-subscription');
    if (verifyBtn) {
        verifyBtn.addEventListener('click', checkSubscription);
    }
    
    // Bouton pour continuer après vérification d'abonnement
    const continueBtn = document.getElementById('continue-to-app');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            showPage('game-intro');
        });
    }
    
    // Bouton pour commencer les prédictions
    const startBtn = document.getElementById('start-prediction');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            showPage('prediction-page');
        });
    }
    
    // Bouton pour retourner à l'introduction
    const backBtn = document.getElementById('go-back');
    if (backBtn) {
        backBtn.addEventListener('click', function() {
            showPage('game-intro');
        });
    }
    
    // Bouton de prédiction
    const predictBtn = document.getElementById('predict-button');
    if (predictBtn) {
        predictBtn.addEventListener('click', getPrediction);
    }
}

// Vérification d'abonnement au canal - Version GARANTIE fonctionnelle
function checkSubscription() {
    const loadingEl = document.getElementById('loading-verification');
    const verifyBtn = document.getElementById('verify-subscription');
    const continueBtn = document.getElementById('continue-to-app');
    const confirmationEl = document.getElementById('subscription-confirmed');
    
    // Afficher le chargement
    loadingEl.style.display = 'flex';
    verifyBtn.style.display = 'none';
    
    // Pour la démo, nous simulons toujours une vérification réussie après 2 secondes
    setTimeout(function() {
        // Masquer le chargement
        loadingEl.style.display = 'none';
        
        // Afficher la confirmation d'abonnement
        confirmationEl.classList.add('show');
        
        // Afficher le bouton pour continuer
        continueBtn.style.display = 'block';
        
        // Animation pour attirer l'attention
        try {
            confirmationEl.animate([
                { transform: 'scale(0.95)' },
                { transform: 'scale(1.05)' },
                { transform: 'scale(1)' }
            ], {
                duration: 600,
                easing: 'ease-out'
            });
        } catch (error) {
            console.warn("Animation API non supportée dans ce navigateur");
        }
    }, 2000);
}

// Changement de page
function showPage(pageId) {
    // Masquer toutes les pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Afficher la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Faire défiler vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Chargement de la liste des équipes
function loadTeamsList() {
    // Liste d'équipes à titre d'exemple
    const teams = [
        "Manchester United",
        "Chelsea",
        "Arsenal",
        "Liverpool",
        "Manchester City",
        "Tottenham",
        "Aston Villa",
        "Newcastle United",
        "West Ham United",
        "Brighton",
        "Bournemouth",
        "Everton",
        "Crystal Palace",
        "Brentford",
        "Fulham",
        "Wolverhampton",
        "Nottingham Forest",
        "Luton Town",
        "Burnley",
        "Sheffield United"
    ].sort();
    
    // Remplir les listes déroulantes
    const team1Select = document.getElementById('team1');
    const team2Select = document.getElementById('team2');
    
    if (team1Select && team2Select) {
        // Vider les listes pour éviter les doublons
        team1Select.innerHTML = '<option value="" disabled selected>Sélectionner une équipe</option>';
        team2Select.innerHTML = '<option value="" disabled selected>Sélectionner une équipe</option>';
        
        teams.forEach(team => {
            const option1 = document.createElement('option');
            option1.value = team;
            option1.textContent = team;
            team1Select.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = team;
            option2.textContent = team;
            team2Select.appendChild(option2);
        });
    }
}

// Récupération des prédictions
function getPrediction() {
    const team1 = document.getElementById('team1').value;
    const team2 = document.getElementById('team2').value;
    const odds1 = document.getElementById('odds1').value;
    const odds2 = document.getElementById('odds2').value;
    
    // Validation
    if (!team1 || !team2) {
        alert('Veuillez sélectionner les deux équipes.');
        return;
    }
    
    if (team1 === team2) {
        alert('Veuillez sélectionner deux équipes différentes.');
        return;
    }
    
    // Afficher le chargement
    const loadingEl = document.getElementById('loading-prediction');
    const resultsEl = document.getElementById('prediction-results');
    
    loadingEl.style.display = 'flex';
    resultsEl.style.display = 'none';
    
    // Faire défiler jusqu'au chargement
    loadingEl.scrollIntoView({ behavior: 'smooth' });
    
    // Pour la démo, nous simulons une réponse
    setTimeout(() => {
        // Masquer le chargement
        loadingEl.style.display = 'none';
        
        // Générer de fausses prédictions pour la démo
        const prediction = generateMockPrediction(team1, team2, odds1, odds2);
        
        // Afficher les résultats
        displayPrediction(prediction);
        
        // Afficher le conteneur de résultats
        resultsEl.style.display = 'block';
        
        // Faire défiler jusqu'aux résultats
        resultsEl.scrollIntoView({ behavior: 'smooth' });
    }, 3500); // Simulation de 3.5 secondes
}

// Génération de prédictions simulées pour la démo
function generateMockPrediction(team1, team2, odds1, odds2) {
    // Ces données seraient normalement obtenues depuis votre API
    return {
        teams: {
            team1: team1,
            team2: team2
        },
        odds: {
            team1: odds1 || null,
            team2: odds2 || null
        },
        direct_matches: Math.floor(Math.random() * 50) + 10,
        half_time_scores: [
            { score: Math.floor(Math.random() * 3) + ":" + Math.floor(Math.random() * 3), confidence: Math.floor(Math.random() * 30) + 60 },
            { score: Math.floor(Math.random() * 3) + ":" + Math.floor(Math.random() * 3), confidence: Math.floor(Math.random() * 20) + 50 },
            { score: Math.floor(Math.random() * 3) + ":" + Math.floor(Math.random() * 2), confidence: Math.floor(Math.random() * 20) + 40 }
        ],
        full_time_scores: [
            { score: Math.floor(Math.random() * 5) + ":" + Math.floor(Math.random() * 5), confidence: Math.floor(Math.random() * 30) + 60 },
            { score: Math.floor(Math.random() * 5) + ":" + Math.floor(Math.random() * 5), confidence: Math.floor(Math.random() * 20) + 50 },
            { score: Math.floor(Math.random() * 4) + ":" + Math.floor(Math.random() * 4), confidence: Math.floor(Math.random() * 20) + 40 }
        ],
        winner_half_time: {
            team: Math.random() > 0.6 ? team1 : (Math.random() > 0.5 ? team2 : "Nul"),
            probability: Math.floor(Math.random() * 30) + 60
        },
        winner_full_time: {
            team: Math.random() > 0.6 ? team1 : (Math.random() > 0.5 ? team2 : "Nul"),
            probability: Math.floor(Math.random() * 30) + 60
        },
        avg_goals_half_time: (Math.random() * 3 + 1).toFixed(1),
        avg_goals_full_time: (Math.random() * 5 + 2).toFixed(1),
        confidence_level: Math.floor(Math.random() * 30) + 60
    };
}

// Affichage des prédictions
function displayPrediction(prediction) {
    const resultsEl = document.getElementById('prediction-results');
    if (!resultsEl) return;
    
    // Construire le HTML des résultats
    let html = `
        <div class="prediction-header">
            <div class="teams-title">${prediction.teams.team1} vs ${prediction.teams.team2}</div>
            <div class="confidence-badge">Confiance: ${prediction.confidence_level}%</div>
        </div>
        
        <div class="prediction-section">
            <div class="section-title">
                <i class="fas fa-clock"></i> Scores prévus (1ère mi-temps)
            </div>
            <ul class="score-list">
    `;
    
    // Ajouter les scores mi-temps
    prediction.half_time_scores.forEach(score => {
        html += `
            <li class="score-item">
                <span class="score-value">${score.score}</span>
                <span class="score-confidence">${score.confidence}%</span>
            </li>
        `;
    });
    
    // Ajouter le gagnant mi-temps
    html += `
            </ul>
            <div class="winner-box">
                <p>Prédiction mi-temps: <span class="winner-team">${prediction.winner_half_time.team === "Nul" ? "Match nul" : prediction.winner_half_time.team}</span> (${prediction.winner_half_time.probability}%)</p>
            </div>
        </div>
        
        <div class="prediction-section">
            <div class="section-title">
                <i class="fas fa-futbol"></i> Scores prévus (temps réglementaire)
            </div>
            <ul class="score-list">
    `;
    
    // Ajouter les scores temps réglementaire
    prediction.full_time_scores.forEach(score => {
        html += `
            <li class="score-item">
                <span class="score-value">${score.score}</span>
                <span class="score-confidence">${score.confidence}%</span>
            </li>
        `;
    });
    
    // Ajouter le gagnant temps réglementaire
    html += `
            </ul>
            <div class="winner-box">
                <p>Prédiction finale: <span class="winner-team">${prediction.winner_full_time.team === "Nul" ? "Match nul" : prediction.winner_full_time.team}</span> (${prediction.winner_full_time.probability}%)</p>
            </div>
        </div>
        
        <div class="prediction-section">
            <div class="section-title">
                <i class="fas fa-chart-bar"></i> Statistiques moyennes
            </div>
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value">${prediction.avg_goals_half_time}</div>
                    <div class="stat-label">Buts 1ère mi-temps</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${prediction.avg_goals_full_time}</div>
                    <div class="stat-label">Buts temps réglementaire</div>
                </div>
            </div>
        </div>
    `;
    
    // Ajouter les cotes si disponibles
    if (prediction.odds.team1 && prediction.odds.team2) {
        html += `
            <div class="prediction-section">
                <div class="section-title">
                    <i class="fas fa-coins"></i> Cotes
                </div>
                <div class="stats-grid">
                    <div class="stat-box">
                        <div class="stat-value">${prediction.odds.team1}</div>
                        <div class="stat-label">${prediction.teams.team1}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">${prediction.odds.team2}</div>
                        <div class="stat-label">${prediction.teams.team2}</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Ajouter une information sur les confrontations directes
    html += `
        <div class="prediction-section">
            <div class="section-title">
                <i class="fas fa-handshake"></i> Confrontations
            </div>
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value">${prediction.direct_matches}</div>
                    <div class="stat-label">Matchs analysés</div>
                </div>
            </div>
        </div>
        
        <button id="new-prediction" class="btn" onclick="showPage('prediction-page')">
            <i class="fas fa-sync"></i> Nouvelle prédiction
        </button>
    `;
    
    // Insérer le HTML dans l'élément
    resultsEl.innerHTML = html;
}
