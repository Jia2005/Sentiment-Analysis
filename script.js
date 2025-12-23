const textInput = document.getElementById('textInput');
const checkSentimentBtn = document.getElementById('checkSentiment');
const sentimentBadge = document.getElementById('sentimentBadge');
const badgeText = sentimentBadge.querySelector('.badge-text');

const positiveWords = [
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome',
    'love', 'loved', 'loving', 'beautiful', 'perfect', 'best', 'happy', 'joy',
    'joyful', 'delightful', 'exciting', 'excited', 'brilliant', 'superb',
    'outstanding', 'fabulous', 'terrific', 'magnificent', 'splendid', 'marvelous',
    'lovely', 'nice', 'pleasant', 'glad', 'satisfied', 'positive', 'success',
    'successful', 'winner', 'winning', 'enjoy', 'enjoyed', 'enjoying', 'fun',
    'funny', 'laugh', 'laughing', 'smile', 'smiling', 'thanks', 'thank',
    'grateful', 'appreciate', 'appreciated', 'blessing', 'blessed', 'proud',
    'celebrate', 'celebration', 'hope', 'hopeful', 'inspire', 'inspiring',
    'brilliant', 'incredible', 'impressive', 'remarkable', 'worthy', 'valuable',
    'adorable', 'charming', 'delicious', 'yummy', 'tasty', 'divine', 'comfortable'
];

const negativeWords = [
    'bad', 'terrible', 'horrible', 'awful', 'worst', 'hate', 'hated', 'hating',
    'sad', 'unhappy', 'depressed', 'disappointing', 'disappointed', 'disappointment',
    'angry', 'mad', 'furious', 'annoying', 'annoyed', 'frustrating', 'frustrated',
    'poor', 'inferior', 'useless', 'pathetic', 'fail', 'failed', 'failure',
    'wrong', 'mistake', 'error', 'problem', 'difficult', 'hard', 'struggle',
    'struggling', 'pain', 'painful', 'hurt', 'hurting', 'sick', 'ill', 'disease',
    'die', 'death', 'kill', 'dead', 'lose', 'lost', 'loser', 'losing', 'defeat',
    'defeated', 'ugly', 'disgusting', 'gross', 'nasty', 'rude', 'mean', 'cruel',
    'harsh', 'severe', 'critical', 'negative', 'never', 'nothing', 'nobody',
    'worthless', 'hopeless', 'helpless', 'miserable', 'sad', 'sorry', 'regret',
    'waste', 'wasted', 'broken', 'damage', 'damaged', 'destroy', 'destroyed'
];

const negations = ['not', 'no', 'never', 'neither', 'nobody', 'nothing', 'nowhere', "don't", "doesn't", "didn't", "won't", "wouldn't", "shouldn't", "can't", "cannot"];

function analyzeSentiment(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g);
    
    if (!words || words.length === 0) {
        return 'Neutral';
    }

    let positiveScore = 0;
    let negativeScore = 0;
    let negationFlag = false;

    for (let i = 0; i < words.length; i++) {
        const word = words[i];
        
        if (negations.includes(word)) {
            negationFlag = true;
            continue;
        }

        const isPositive = positiveWords.includes(word);
        const isNegative = negativeWords.includes(word);

        if (isPositive) {
            if (negationFlag) {
                negativeScore += 1;
            } else {
                positiveScore += 1;
            }
        } else if (isNegative) {
            if (negationFlag) {
                positiveScore += 1;
            } else {
                negativeScore += 1;
            }
        }

        if (isPositive || isNegative) {
            negationFlag = false;
        }
    }

    const totalScore = positiveScore - negativeScore;
    const totalWords = words.length;
    const sentimentRatio = totalScore / totalWords;

    if (totalScore > 0 && sentimentRatio > 0.05) {
        return 'Positive';
    } else if (totalScore < 0 && sentimentRatio < -0.05) {
        return 'Negative';
    } else {
        return 'Neutral';
    }
}

function updateBadge(sentiment) {
    sentimentBadge.classList.remove('positive', 'negative', 'neutral', 'hidden');
    sentimentBadge.classList.add(sentiment.toLowerCase());
    sentimentBadge.classList.add('show');
    badgeText.textContent = sentiment;
}

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

    setTimeout(() => {
        clearInterval(loadingInterval);
        btnText.textContent = originalText;
        checkSentimentBtn.disabled = false;
        checkSentimentBtn.style.opacity = '1';
        
        const text = textInput.value;
        const sentiment = analyzeSentiment(text);
        updateBadge(sentiment);
    }, 800);
}

function validateInput() {
    const text = textInput.value.trim();
    
    if (text.length === 0) {
        textInput.style.borderColor = '#ff416c';
        textInput.style.boxShadow = '0 0 0 3px rgba(255, 65, 108, 0.1)';
        setTimeout(() => {
            textInput.style.borderColor = '#e1e5e9';
            textInput.style.boxShadow = 'none';
        }, 2000);
        return false;
    }
    
    return true;
}

checkSentimentBtn.addEventListener('click', () => {
    if (validateInput()) {
        showLoadingEffect();
    }
});

textInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.shiftKey) && e.key === 'Enter') {
        e.preventDefault();
        if (validateInput()) {
            showLoadingEffect();
        }
    }
});

textInput.addEventListener('input', () => {
    if (textInput.value.trim().length === 0) {
        sentimentBadge.classList.remove('show', 'positive', 'negative', 'neutral');
        sentimentBadge.classList.add('hidden');
    }
});

textInput.addEventListener('focus', () => {
    textInput.parentElement.style.transform = 'scale(1.02)';
});

textInput.addEventListener('blur', () => {
    textInput.parentElement.style.transform = 'scale(1)';
});

textInput.parentElement.style.transition = 'transform 0.2s ease';
sentimentBadge.classList.add('hidden');
