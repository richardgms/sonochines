# Landing Page Gamificada - Ebook "Sono de Guerra"

## 📋 Visão Geral

Landing page gamificada para venda do ebook "Técnicas Militares Chinesas para o Sono Perfeito" com sistema de progressão em 3 níveis, quiz interativo, badges desbloqueáveis e elementos de conversão otimizados.

## 🎯 Funcionalidades Principais

### 🎮 Sistema de Gamificação
- **3 Níveis de Progressão:**
  - Nível 1: Recruta Insone (Quiz diagnóstico)
  - Nível 2: Soldado em Treinamento (Preview das técnicas)
  - Nível 3: Guerreiro do Descanso (Oferta principal)

- **Sistema de Badges:**
  - Recruta Identificado
  - Soldado Iniciante
  - Guerreiro do Sono

- **Barra de Progresso Visual** com indicadores militares

### 📝 Quiz Interativo
- 5 perguntas sobre hábitos de sono
- Sistema de pontuação personalizado
- Resultado baseado em ranks militares
- Feedback visual imediato

### 💰 Elementos de Conversão
- Contador regressivo de urgência
- Popup de exit-intent com oferta especial
- Garantia de 30 dias destacada
- Depoimentos sociais autênticos
- Bônus exclusivos valorizados

### 📱 Responsividade
- Design mobile-first
- Otimizado para todos os dispositivos
- Performance otimizada (< 3 segundos de carregamento)

## 🚀 Como Usar

### 1. Hospedagem
```bash
# Clone o repositório
git clone [url-do-repositorio]

# Navegue até o diretório
cd sonochines

# Abra o index.html em um servidor web
# Recomendado: Live Server (VS Code) ou similar
```

### 2. Personalização

#### Modificar Conteúdo
- **Textos**: Edite diretamente no `index.html`
- **Cores**: Ajuste as variáveis CSS em `:root` no `style.css`
- **Quiz**: Modifique o array `quizData` no `script.js`

#### Configurar Analytics
```javascript
// No script.js, configure:
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID');

// Facebook Pixel
fbq('init', 'PIXEL_ID');
```

#### Integrar Payment Gateway
```javascript
// Na função handlePurchase(), integre com:
// - Stripe
// - PayPal
// - PagSeguro
// - Mercado Pago
```

## 🎨 Estrutura do Design

### Paleta de Cores
```css
--primary-color: #1a4b3e    /* Verde militar */
--secondary-color: #2d5a27  /* Verde escuro */
--accent-color: #d4af37     /* Dourado */
--danger-color: #c62828     /* Vermelho urgência */
--success-color: #2e7d32    /* Verde sucesso */
```

### Tipografia
- **Fonte Principal**: Inter (Google Fonts)
- **Hierarquia**: 5xl para títulos principais até xs para detalhes
- **Peso**: 400-800 conforme importância

### Animações
- Transições suaves (0.3s ease)
- Animações de entrada escalonadas
- Efeitos hover sutis
- Feedback visual imediato

## 📊 Métricas e Tracking

### Eventos Trackados
- `page_view`: Visualização da página
- `mission_started`: Início do Level 1
- `quiz_answer`: Resposta do quiz
- `quiz_completed`: Quiz finalizado
- `level2_started`: Início do Level 2
- `level3_started`: Início do Level 3
- `badge_unlocked`: Badge desbloqueado
- `demo_video_started`: Vídeo demo iniciado
- `purchase_intent`: Intenção de compra
- `checkout_initiated`: Checkout iniciado
- `exit_intent_popup_shown`: Popup de saída exibido

### Dados Coletados
- Tempo na página
- Progresso no funil
- Pontuação do quiz
- Badges conquistados
- Dispositivo utilizado
- Origem do tráfego

## 🔧 Personalização Avançada

### Modificar Quiz
```javascript
// Em script.js, edite o array quizData:
const quizData = [
    {
        question: "Sua pergunta aqui",
        options: [
            { text: "Opção A", score: 1 },
            { text: "Opção B", score: 2 },
            // ... mais opções
        ]
    },
    // ... mais perguntas
];
```

### Adicionar Novas Badges
```javascript
// Criar nova badge
function unlockCustomBadge() {
    unlockBadge('custom_badge_id');
}

// Adicionar descrição
function getBadgeDescription(badgeId) {
    const descriptions = {
        'custom_badge_id': 'Sua descrição personalizada!',
        // ... outras badges
    };
    return descriptions[badgeId];
}
```

### Modificar Ranks do Quiz
```javascript
// Em script.js, edite o objeto sleepRanks:
const sleepRanks = {
    5: {
        title: "Seu Rank Personalizado",
        description: "Descrição do rank...",
        level: "Crítico",
        urgency: "Alta",
        badge: "fas fa-icon-name",
        color: "#hexcolor"
    },
    // ... outros ranks
};
```

## 🎯 Otimizações de Conversão

### A/B Tests Sugeridos
1. **Headline Principal**: Testar diferentes ângulos de dor
2. **CTA Buttons**: Cores e textos diferentes
3. **Preço**: Valores e apresentação
4. **Urgência**: Diferentes tipos de escassez
5. **Depoimentos**: Quantidade e posicionamento

### Elementos de Prova Social
- Depoimentos com fotos reais
- Números de vendas (social proof)
- Badges de segurança e garantia
- Menções na mídia (se aplicável)

### Otimizações Mobile
- Botões com tamanho adequado para touch
- Formulários simplificados
- Carregamento progressivo de imagens
- Scroll suave entre seções

## 📈 Métricas de Sucesso

### KPIs Principais
- **Taxa de Conversão**: Meta 8-12%
- **Tempo na Página**: >3 minutos
- **Conclusão do Quiz**: >70%
- **Engajamento Level 2**: >80%

### Funil de Conversão
```
100% - Visitantes
 70% - Iniciam Quiz (Level 1)
 85% - Completam Quiz
 80% - Avançam para Level 2
 75% - Avançam para Level 3
 12% - Convertem em vendas
```

## 🛠️ Requisitos Técnicos

### Navegadores Suportados
- Chrome 70+
- Firefox 65+
- Safari 12+
- Edge 44+
- Mobile browsers (iOS 12+, Android 8+)

### Performance
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s

### SEO
- Meta tags otimizadas
- Structured data para rich snippets
- Open Graph para redes sociais
- URLs amigáveis (se multi-página)

## 🚀 Deploy e Manutenção

### Hospedagem Recomendada
- **Netlify**: Deploy automático, CDN global
- **Vercel**: Otimizado para performance
- **AWS S3 + CloudFront**: Escalabilidade enterprise
- **GitHub Pages**: Opção gratuita para testes

### Monitoramento
- Google Analytics 4
- Google Search Console
- GTMetrix para performance
- Hotjar para heatmaps

### Backup e Versionamento
```bash
# Commit regular das alterações
git add .
git commit -m "Otimização: [descrição]"
git push origin main
```

## 🎨 Assets Necessários

### Imagens (Sugestões)
- Logo do produto (SVG preferível)
- Mockup do ebook em 3D
- Fotos dos depoimentos (licenciadas)
- Ícones militares personalizados
- Background patterns sutis

### Vídeos
- Demo das técnicas (2-3 minutos)
- Depoimento em vídeo (opcional)
- Animação do logo (opcional)

## 🔒 Segurança e Privacidade

### LGPD/GDPR Compliance
- Cookie consent banner
- Política de privacidade
- Opt-in explícito para emails
- Direito ao esquecimento

### Segurança
- HTTPS obrigatório
- Sanitização de inputs
- Rate limiting para formulários
- Backup regular dos dados

## 📞 Suportefdsagffasfd

Para dúvidas ou personalizações:dfsdafdasfda f3,3ads f
dsa f
das f
dsaf 
s
f d
sf
sdg
s
- **Email**: dev@sonodeguerra.com
- **WhatsApp**: (83) 98807-3784
- **Documentação**: Este README

---

**Desenvolvido com 💜 para maximizar conversões e proporcionar uma experiência única aos usuários.** 