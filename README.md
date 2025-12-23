# Sentiment Analysis Web App

A lightweight sentiment analysis tool that runs entirely in your browser. No server needed, no API calls - just pure JavaScript doing the heavy lifting.

## What it does

Drop in any text and get instant feedback on whether it's positive, negative, or neutral. The app uses a dictionary-based approach to analyze the emotional tone of your writing.

## Features

- **Instant analysis** - Everything happens client-side, so results are immediate
- **Smart word matching** - Recognizes common positive and negative words and phrases
- **Visual feedback** - Color-coded badges that animate in (green = positive, red = negative, orange = neutral)
- **Input validation** - Won't let you analyze empty text
- **Keyboard shortcuts** - Hit Ctrl+Enter or Shift+Enter to analyze quickly
- **Fully responsive** - Looks good on any screen size
- **No dependencies** - Pure vanilla JavaScript, no frameworks or libraries

## How to use

1. Clone or download this repository
2. Open `index.html` in any modern browser
3. Type or paste your text into the input box
4. Click "Check Sentiment" or press Ctrl+Enter
5. See the sentiment result appear as a colored badge

That's it. No installation, no setup, no configuration.

## How it works

The sentiment analyzer uses a lexicon-based approach:

1. Breaks down your text into individual words
2. Checks each word against dictionaries of positive and negative terms
3. Calculates a sentiment score based on the words found
4. Takes into account negations (like "not good" being negative)
5. Returns the overall sentiment with a visual indicator

It's not as sophisticated as machine learning models, but it's surprisingly effective for everyday text analysis.

## Tech Stack

- **HTML5** - Structure
- **CSS3** - Styling with gradients, animations, and responsive design
- **JavaScript (ES6+)** - Sentiment analysis logic

Zero dependencies. Zero build steps. Just open and run.

## File Structure

```
├── index.html       # Main page structure
├── style.css        # All styling and animations
└── script.js        # Sentiment analysis engine
```

## Limitations

- Dictionary-based approach means it might miss context or sarcasm
- Limited to the words in the positive/negative dictionaries
- Doesn't understand complex grammar or sentence structure
- Works best with English text

For more advanced sentiment analysis, you'd want to integrate machine learning APIs like Google Cloud Natural Language, IBM Watson, or Azure Text Analytics.

## Contributing

Found a bug? Have an idea? Feel free to open an issue or submit a pull request. This is a learning project, so all suggestions are welcome.

## License

Free to use however you want. No attribution needed, but always appreciated!
