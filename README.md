# Civics Study Flashcard App

A mobile-friendly web application for studying flashcards. Select a deck, work through cards one at a time with random order, and assign statuses to track progress.

## Features

- Multiple hardcoded decks of flashcards
- Random card order for each session
- No card repetition within a session
- Status assignment: Learned or Repeat
- Learned cards are excluded from future sessions
- Repeat cards are added back to the end of the current session
- Mobile-responsive design
- Progress tracking with localStorage

### Backlog

- **Quiz Mode:** 20 random questions, 12 correct required to pass.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

## Usage

1. Select a deck from the main screen
2. Click "Show Answer" to reveal the answer
3. Choose "Learned" to mark the card as mastered (it won't appear again)
4. Choose "Repeat" to add the card back to the end of the current session
5. Continue until all cards are done or go back to select another deck

## Project Structure

- `src/App.tsx` - Main app component
- `src/components/DeckSelector.tsx` - Deck selection screen
- `src/components/FlashcardViewer.tsx` - Flashcard study interface
- `src/data.ts` - Hardcoded deck data
- `src/types.ts` - TypeScript type definitions

## Technologies Used

- React 19
- TypeScript
- Vite
- CSS for styling
- Question/Answer data sourced from USCIS: [Official list of civics questions and answers for the 2025 naturalization test. ](https://www.uscis.gov/citizenship/find-study-materials-and-resources/study-for-the-test)

## Deployment

This app is hosted on GitHub Pages using GitHub Actions for automated deployment.

### Setting Up Deployment

1. **Create a GitHub Repository:**
   - Go to [GitHub.com](https://github.com) and create a new repository named `civics-study` (or your preferred name).

2. **Push Your Code:**
   - Add the GitHub remote:
     ```bash
     git remote add origin https://github.com/yourusername/civics-study.git
     ```
   - Push to the main branch:
     ```bash
     git push -u origin main
     ```

3. **Enable GitHub Pages:**
   - In your repository settings, go to "Pages".
   - Under "Source", select "GitHub Actions".
   - The workflow file (`.github/workflows/deploy.yml`) will handle building and deploying your app.

4. **Access Your Site:**
   - After the first push, the workflow will run and deploy your site.
   - The URL will be `https://yourusername.github.io/civics-study/`.

The deployment workflow automatically builds the app on every push to the `main` branch and deploys it to GitHub Pages.
