// DOM elements
const textInput = document.getElementById('textInput');
const checkSentimentBtn = document.getElementById('checkSentiment');
const sentimentBadge = document.getElementById('sentimentBadge');
const badgeText = sentimentBadge.querySelector('.badge-text');

// Sentiment options
const sentiments = ['Positive', 'Negative', 'Neutral'];

// Function to get random sentiment
function getRandomSentiment() {
    const randomIndex = Math.floor(Math.random() * sentiments.length);
    return sentiments[randomIndex];
}

// Function to update badge appearance
function updateBadge(sentiment) {
    // Remove all sentiment classes
    sentimentBadge.classList.remove('positive', 'negative', 'neutral', 'hidden');
    
    // Add the new sentiment class
    sentimentBadge.classList.add(sentiment.toLowerCase());
    sentimentBadge.classList.add('show');
    
    // Update badge text
    badgeText.textContent = sentiment;
}

// Function to add loading effect
function showLoadingEffect() {
    checkSentimentBtn.disabled = true;
    checkSentimentBtn.style.opacity = '0.7';
    
    const btnText = checkSentimentBtn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    
    let dots = '';
    const loadingInterval = setInterval(() => {
        dots = dots.length >= 3 ? '' : dots + '.';
        btnText.textContent = `Analyzing${dots}`;
    }, 200);
    
    // Simulate analysis time (1-2 seconds)
    const analysisTime = Math.random() * 1000 + 1000;
    
    setTimeout(() => {
        clearInterval(loadingInterval);
        btnText.textContent = originalText;
        checkSentimentBtn.disabled = false;
        checkSentimentBtn.style.opacity = '1';
        
        // Show random sentiment
        const randomSentiment = getRandomSentiment();
        updateBadge(randomSentiment);
    }, analysisTime);
}

// Function to validate input
function validateInput() {
    const text = textInput.value.trim();
    if (text.length === 0) {
        // Show error state
        textInput.style.borderColor = '#ff416c';
        textInput.style.boxShadow = '0 0 0 3px rgba(255, 65, 108, 0.1)';
        
        // Reset error state after 2 seconds
        setTimeout(() => {
            textInput.style.borderColor = '#e1e5e9';
            textInput.style.boxShadow = 'none';
        }, 2000);
        
        return false;
    }
    return true;
}

// Event listeners
checkSentimentBtn.addEventListener('click', () => {
    if (validateInput()) {
        showLoadingEffect();
    }
});

// Allow Enter key to trigger analysis (Ctrl+Enter or Shift+Enter)
textInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.shiftKey) && e.key === 'Enter') {
        e.preventDefault();
        if (validateInput()) {
            showLoadingEffect();
        }
    }
});

// Reset badge when input is cleared
textInput.addEventListener('input', () => {
    if (textInput.value.trim().length === 0) {
        sentimentBadge.classList.remove('show', 'positive', 'negative', 'neutral');
        sentimentBadge.classList.add('hidden');
    }
});

// Add some interactive feedback
textInput.addEventListener('focus', () => {
    textInput.parentElement.style.transform = 'scale(1.02)';
});

textInput.addEventListener('blur', () => {
    textInput.parentElement.style.transform = 'scale(1)';
});

// Add smooth transition for input section
textInput.parentElement.style.transition = 'transform 0.2s ease';

// Initialize - hide badge on load
sentimentBadge.classList.add('hidden');
