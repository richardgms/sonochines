// Estado global da aplicação
const gameState = {
    currentLevel: 0,
    currentQuestion: 0,
    quizScore: 0,
    badges: [],
    userAnswers: [],
    startTime: Date.now()
};

// Dados do quiz
const quizData = [
    {
        question: "Quantas horas de sono você consegue por noite?",
        options: [
            { text: "Menos de 4 horas", score: 1 },
            { text: "4-6 horas", score: 2 },
            { text: "6-8 horas", score: 3 },
            { text: "Mais de 8 horas", score: 4 }
        ]
    },
    {
        question: "Quanto tempo você demora para adormecer?",
        options: [
            { text: "Mais de 2 horas", score: 1 },
            { text: "1-2 horas", score: 2 },
            { text: "30-60 minutos", score: 3 },
            { text: "Menos de 30 minutos", score: 4 }
        ]
    },
    {
        question: "Quantas vezes você acorda durante a noite?",
        options: [
            { text: "Mais de 5 vezes", score: 1 },
            { text: "3-5 vezes", score: 2 },
            { text: "1-2 vezes", score: 3 },
            { text: "Raramente acordo", score: 4 }
        ]
    },
    {
        question: "Como você se sente ao acordar?",
        options: [
            { text: "Completamente exausto", score: 1 },
            { text: "Ainda cansado", score: 2 },
            { text: "Razoavelmente descansado", score: 3 },
            { text: "Energizado e revigorado", score: 4 }
        ]
    },
    {
        question: "Você usa dispositivos eletrônicos antes de dormir?",
        options: [
            { text: "Sim, até o momento de dormir", score: 1 },
            { text: "Sim, mas paro 30min antes", score: 2 },
            { text: "Raramente uso à noite", score: 3 },
            { text: "Nunca uso antes de dormir", score: 4 }
        ]
    }
];

// Ranks baseados na pontuação
const sleepRanks = {
    5: {
        title: "Recruta Insone Crítico",
        description: "Sua situação é crítica! Você precisa de intervenção imediata para recuperar o controle do seu sono.",
        level: "Crítico",
        urgency: "Emergencial",
        badge: "fas fa-exclamation-triangle",
        color: "#c62828"
    },
    10: {
        title: "Soldado em Batalha",
        description: "Você está lutando bravamente, mas precisa de reforços estratégicos para vencer a guerra do sono.",
        level: "Alto",
        urgency: "Alta",
        badge: "fas fa-user-tie",
        color: "#f57c00"
    },
    15: {
        title: "Tenente em Treinamento",
        description: "Você tem potencial, mas ainda precisa aperfeiçoar suas táticas para alcançar o sono perfeito.",
        level: "Moderado",
        urgency: "Moderada",
        badge: "fas fa-medal",
        color: "#ffc107"
    },
    20: {
        title: "Capitão do Descanso",
        description: "Você já domina algumas técnicas, mas pode se tornar um verdadeiro mestre com o treinamento certo.",
        level: "Baixo",
        urgency: "Preventiva",
        badge: "fas fa-crown",
        color: "#4caf50"
    }
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    startCountdown();
    setupExitIntent();
    trackPageView();
});

function initializeApp() {
    // Configurar progresso inicial
    updateProgressBar(0);
    
    // Ativar primeira badge
    activateBadge(1);
    
    // Configurar elementos visuais
    animateHeroElements();
    
    console.log('Landing Page Gamificada iniciada!');
}

function setupEventListeners() {
    // Botão principal do hero
    const startMissionBtn = document.getElementById('startMission');
    if (startMissionBtn) {
        startMissionBtn.addEventListener('click', () => {
            trackEvent('mission_started', 'engagement');
            startLevel1();
        });
    }

    // Botões de progressão
    const continueToLevel2Btn = document.getElementById('continueToLevel2');
    if (continueToLevel2Btn) {
        continueToLevel2Btn.addEventListener('click', () => {
            trackEvent('level2_started', 'progression');
            startLevel2();
        });
    }

    const continueToLevel3Btn = document.getElementById('continueToLevel3');
    if (continueToLevel3Btn) {
        continueToLevel3Btn.addEventListener('click', () => {
            trackEvent('level3_started', 'progression');
            startLevel3();
        });
    }

    // Botão de compra
    const purchaseBtn = document.getElementById('purchaseButton');
    if (purchaseBtn) {
        purchaseBtn.addEventListener('click', () => {
            trackEvent('purchase_intent', 'conversion');
            handlePurchase();
        });
    }

    // Popup de saída
    const closePopupBtn = document.getElementById('closePopup');
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', closeExitPopup);
    }

    const finalOfferBtn = document.getElementById('finalOffer');
    if (finalOfferBtn) {
        finalOfferBtn.addEventListener('click', () => {
            trackEvent('exit_offer_accepted', 'conversion');
            handlePurchase(true);
        });
    }

    // Video placeholder
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', () => {
            trackEvent('video_click', 'engagement');
            playDemoVideo();
        });
    }
}

// Nível 1: Quiz Gamificado
function startLevel1() {
    gameState.currentLevel = 1;
    
    // Esconder hero e mostrar quiz
    hideSection('hero');
    showSection('level1');
    
    // Atualizar progresso
    updateProgressBar(33);
    activateBadge(1);
    
    // Inicializar quiz
    gameState.currentQuestion = 0;
    gameState.quizScore = 0;
    gameState.userAnswers = [];
    
    displayQuestion();
    
    // Scroll para o quiz
    scrollToSection('level1');
}

function displayQuestion() {
    const questionData = quizData[gameState.currentQuestion];
    const questionNumber = gameState.currentQuestion + 1;
    
    // Atualizar elementos da pergunta
    document.getElementById('questionNumber').textContent = questionNumber.toString().padStart(2, '0');
    document.getElementById('questionTitle').textContent = questionData.question;
    document.getElementById('quizProgressText').textContent = `Pergunta ${questionNumber} de ${quizData.length}`;
    
    // Atualizar barra de progresso do quiz
    const progressPercent = (questionNumber / quizData.length) * 100;
    const progressBar = document.querySelector('.quiz-progress-bar');
    progressBar.style.setProperty('--progress-width', `${progressPercent}%`);
    
    // Renderizar opções
    const optionsContainer = document.getElementById('questionOptions');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.setAttribute('data-score', option.score);
        
        button.innerHTML = `
            <span class="option-letter">${String.fromCharCode(65 + index)}</span>
            <span class="option-text">${option.text}</span>
        `;
        
        button.addEventListener('click', () => selectAnswer(option.score, button));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(score, buttonElement) {
    // Desabilitar todos os botões
    const allButtons = document.querySelectorAll('.option-button');
    allButtons.forEach(btn => {
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.5';
    });
    
    // Destacar resposta selecionada
    buttonElement.style.opacity = '1';
    buttonElement.style.borderColor = 'var(--accent-color)';
    buttonElement.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
    
    // Salvar resposta
    gameState.userAnswers.push({
        question: gameState.currentQuestion,
        score: score,
        answer: buttonElement.querySelector('.option-text').textContent
    });
    
    gameState.quizScore += score;
    
    // Feedback visual
    showAnswerFeedback(buttonElement);
    
    // Avançar para próxima pergunta após delay
    setTimeout(() => {
        if (gameState.currentQuestion < quizData.length - 1) {
            gameState.currentQuestion++;
            displayQuestion();
        } else {
            finishQuiz();
        }
    }, 1500);
    
    trackEvent('quiz_answer', 'engagement', {
        question: gameState.currentQuestion + 1,
        score: score
    });
}

function showAnswerFeedback(button) {
    // Criar elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = 'answer-feedback';
    feedback.innerHTML = '<i class="fas fa-check"></i> Resposta registrada!';
    feedback.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: var(--success-color);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 14px;
        font-weight: 600;
        animation: slideIn 0.3s ease;
        z-index: 100;
    `;
    
    button.style.position = 'relative';
    button.appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 1200);
}

function finishQuiz() {
    // Calcular resultado
    const result = calculateQuizResult();
    
    // Esconder quiz e mostrar resultado
    hideSection('level1');
    showSection('quizResult');
    
    // Preencher resultado
    displayQuizResult(result);
    
    // Unlock badge
    unlockBadge('recruta_identificado');
    
    trackEvent('quiz_completed', 'conversion', {
        total_score: gameState.quizScore,
        rank: result.title
    });
    
    scrollToSection('quizResult');
}

function calculateQuizResult() {
    let result;
    
    if (gameState.quizScore <= 8) {
        result = sleepRanks[5];
    } else if (gameState.quizScore <= 12) {
        result = sleepRanks[10];
    } else if (gameState.quizScore <= 16) {
        result = sleepRanks[15];
    } else {
        result = sleepRanks[20];
    }
    
    return result;
}

function displayQuizResult(result) {
    // Atualizar badge do resultado
    const resultBadge = document.getElementById('resultBadge');
    resultBadge.innerHTML = `<i class="${result.badge}"></i>`;
    resultBadge.style.background = result.color;
    
    // Atualizar textos
    document.getElementById('resultTitle').textContent = `Seu Rank Militar: ${result.title}`;
    document.getElementById('resultDescription').textContent = result.description;
    document.getElementById('insomniaLevel').textContent = result.level;
    document.getElementById('urgencyLevel').textContent = result.urgency;
    
    // Aplicar cor do nível de urgência
    const urgencyElement = document.getElementById('urgencyLevel');
    urgencyElement.style.color = result.color;
}

// Nível 2: Preview das Técnicas
function startLevel2() {
    gameState.currentLevel = 2;
    
    hideSection('quizResult');
    showSection('level2');
    
    updateProgressBar(66);
    activateBadge(2);
    
    // Animar técnicas
    animateTechniques();
    
    // Unlock badge soldado
    setTimeout(() => {
        unlockBadge('soldado_iniciante');
    }, 2000);
    
    scrollToSection('level2');
}

function animateTechniques() {
    const techniqueCards = document.querySelectorAll('.technique-card');
    
    techniqueCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'slideIn 0.6s ease forwards';
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

function playDemoVideo() {
    // Simular reprodução de vídeo
    const videoPlaceholder = document.querySelector('.video-placeholder');
    
    videoPlaceholder.innerHTML = `
        <div class="video-playing">
            <div class="video-progress-bar">
                <div class="video-progress" style="width: 0%; background: var(--accent-color); height: 4px; border-radius: 2px; transition: width 0.1s;"></div>
            </div>
            <p style="margin: 20px 0; color: var(--text-secondary);">Reproduzindo demonstração das técnicas...</p>
            <button class="cta-button primary" onclick="stopDemo()">
                <i class="fas fa-pause"></i> Pausar Demonstração
            </button>
        </div>
    `;
    
    // Simular progresso do vídeo
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1;
        const progressBar = document.querySelector('.video-progress');
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            videoPlaceholder.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 80px; color: var(--success-color); margin-bottom: 20px;"></i>
                <h4>Demonstração Concluída!</h4>
                <p>Agora você sabe como aplicar as técnicas básicas. Pronto para o arsenal completo?</p>
            `;
        }
    }, 120); // 2 minutos simulados em 12 segundos
    
    trackEvent('demo_video_started', 'engagement');
}

// Nível 3: Oferta Principal
function startLevel3() {
    gameState.currentLevel = 3;
    
    hideSection('level2');
    showSection('level3');
    
    updateProgressBar(100);
    activateBadge(3);
    
    // Unlock badge guerreiro
    unlockBadge('guerreiro_do_sono');
    
    // Animar elementos da oferta
    animateOfferElements();
    
    scrollToSection('level3');
}

function animateOfferElements() {
    const bonusItems = document.querySelectorAll('.bonus-item');
    
    bonusItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'slideIn 0.5s ease forwards';
        }, index * 150);
    });
}

// Sistema de Badges
function unlockBadge(badgeId) {
    if (!gameState.badges.includes(badgeId)) {
        gameState.badges.push(badgeId);
        showBadgeUnlocked(badgeId);
    }
}

function showBadgeUnlocked(badgeId) {
    // Criar notificação de badge desbloqueado
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <div class="badge-notification-content">
            <i class="fas fa-trophy"></i>
            <div>
                <h4>Conquista Desbloqueada!</h4>
                <p>${getBadgeDescription(badgeId)}</p>
            </div>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--gradient-gold);
        color: var(--dark-bg);
        padding: 20px;
        border-radius: 12px;
        box-shadow: var(--shadow-heavy);
        z-index: 9999;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Remover após 4 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
    
    trackEvent('badge_unlocked', 'achievement', { badge: badgeId });
}

function getBadgeDescription(badgeId) {
    const descriptions = {
        'recruta_identificado': 'Recruta Identificado - Diagnóstico concluído!',
        'soldado_iniciante': 'Soldado Iniciante - Técnicas básicas dominadas!',
        'guerreiro_do_sono': 'Guerreiro do Sono - Pronto para a batalha final!'
    };
    
    return descriptions[badgeId] || 'Nova conquista desbloqueada!';
}

function activateBadge(level) {
    const badge = document.getElementById(`badge${level}`);
    if (badge) {
        badge.classList.add('active');
    }
}

// Sistema de Progresso
function updateProgressBar(percent) {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }
}

// Navegação entre seções
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.remove('hidden');
    }
}

function hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('hidden');
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Contador Regressivo
function startCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!hoursElement || !minutesElement || !secondsElement) return;
    
    // Definir tempo limite (24 horas a partir de agora)
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            // Oferta expirada
            document.querySelector('.urgency-timer').innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <span style="color: var(--danger-color); font-weight: 800;">Oferta Expirada! Entre em contato para condições especiais.</span>
            `;
            return;
        }
        
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Exit Intent Popup
function setupExitIntent() {
    let hasShownPopup = false;
    
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !hasShownPopup && gameState.currentLevel >= 2) {
            showExitPopup();
            hasShownPopup = true;
        }
    });
    
    // Mobile: scroll para cima rápido
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY < lastScrollY - 100 && !hasShownPopup && gameState.currentLevel >= 2) {
            showExitPopup();
            hasShownPopup = true;
        }
        lastScrollY = window.scrollY;
    });
}

function showExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.classList.remove('hidden');
        trackEvent('exit_intent_popup_shown', 'engagement');
    }
}

function closeExitPopup() {
    const popup = document.getElementById('exitPopup');
    if (popup) {
        popup.classList.add('hidden');
        trackEvent('exit_intent_popup_closed', 'engagement');
    }
}

// Funcionalidades de Compra
function handlePurchase(isExitOffer = false) {
    const price = isExitOffer ? 'R$ 37' : 'R$ 47';
    const discount = isExitOffer ? '62% OFF' : '51% OFF';
    
    // Simular redirecionamento para checkout
    const checkoutData = {
        product: 'Sono de Guerra - Ebook',
        price: price,
        discount: discount,
        level: gameState.currentLevel,
        badges: gameState.badges,
        quizScore: gameState.quizScore,
        timeOnPage: Math.floor((Date.now() - gameState.startTime) / 1000)
    };
    
    // Em produção, redirecionaria para página de pagamento
    console.log('Dados do checkout:', checkoutData);
    
    // Mostrar confirmação
    alert(`Redirecionando para checkout...\nProduto: ${checkoutData.product}\nPreço: ${price}\nDesconto: ${discount}`);
    
    trackEvent('checkout_initiated', 'conversion', checkoutData);
}

// Animações do Hero
function animateHeroElements() {
    // Adicionar classes de animação aos elementos
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-stats, .cta-button');
    
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Sistema de Analytics
function trackEvent(eventName, category, data = {}) {
    // Integração com Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            event_category: category,
            event_label: JSON.stringify(data),
            value: data.value || 1
        });
    }
    
    // Log para desenvolvimento
    console.log(`Event: ${eventName}`, { category, data });
    
    // Pixels do Facebook/Meta
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, data);
    }
}

function trackPageView() {
    trackEvent('page_view', 'navigation', {
        page: window.location.pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString()
    });
}

// Utility Functions
function stopDemo() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    videoPlaceholder.innerHTML = `
        <i class="fas fa-play-circle"></i>
        <h4>Demonstração Prática</h4>
        <p>Veja como aplicar essas técnicas na prática (2 minutos)</p>
    `;
}

// Adicionar estilos dinâmicos para animações
const animationStyles = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .badge-notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .badge-notification-content i {
        font-size: 24px;
        color: var(--dark-bg);
    }
    
    .badge-notification-content h4 {
        margin: 0 0 5px 0;
        font-size: 16px;
        font-weight: 700;
    }
    
    .badge-notification-content p {
        margin: 0;
        font-size: 14px;
        opacity: 0.8;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Debug: Adicionar controles de desenvolvedor
if (window.location.hostname === 'localhost' || window.location.search.includes('debug=true')) {
    console.log('Debug mode ativo');
    
    window.gameDebug = {
        skipToLevel: (level) => {
            if (level === 2) startLevel2();
            if (level === 3) startLevel3();
        },
        showExitPopup: () => showExitPopup(),
        simulateQuizComplete: () => {
            gameState.quizScore = 12;
            finishQuiz();
        },
        unlockAllBadges: () => {
            unlockBadge('recruta_identificado');
            unlockBadge('soldado_iniciante');
            unlockBadge('guerreiro_do_sono');
        }
    };
    
    console.log('Comandos disponíveis:', Object.keys(window.gameDebug));
} 