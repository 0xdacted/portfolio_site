import React, { useState, useEffect } from 'react';
import { hashtagsData } from '../../data/hashtagsData';
import { Helmet } from 'react-helmet';

interface HashtagData {
  Hashtag: string;
  Count: number;
  index: number;
}

interface HashtagDisplayProps {
  hashtag: string;
  selectHashtag: (hashtag: string) => void;
}

interface GuessResultProps {
  guessResult: {
    correct: boolean;
    selectedHashtag: HashtagData;
    unselectedHashtag: HashtagData;
  } | null;
}

const GuessResultDisplay: React.FC<GuessResultProps> = ({ guessResult }) => {
  if (!guessResult) {
    return null;
  }

  const { correct, selectedHashtag, unselectedHashtag } = guessResult;

  return (
    <div className="p-2 sm:p-4 bg-gray-100 rounded-lg shadow-sm mb-4 sm:mb-6">
      <p className={`text-lg sm:text-xl m-2 font-bold text-center`}>
        {correct ? `Nice guess!` : `Unlucky!`}
        {` `}
        {selectedHashtag.Hashtag}
        {` `}
        was tweeted {` `}
        <span className={`${correct ? `text-green-600` : `text-red-600`}`}>
          {selectedHashtag.Count}
          {` `}
        </span>
        times and is ranked {` `}
        <span className={`${correct ? `text-green-600` : `text-red-600`}`}>
          {selectedHashtag.index + 1}
        </span>
        .
      </p>
      <p className={`text-lg sm:text-xl m-2 font-bold text-center`}>
        {unselectedHashtag.Hashtag} was tweeted{` `}
        <span className={`${!correct ? `text-green-600` : `text-red-600`}`}>
          {unselectedHashtag.Count}
          {` `}
        </span>
        {` `}
        times and is ranked {` `}
        <span className={`${!correct ? `text-green-600` : `text-red-600`}`}>
          {unselectedHashtag.index + 1}
        </span>
        .
      </p>
    </div>
  );
};

const HashtagDisplay: React.FC<HashtagDisplayProps> = ({
  hashtag,
  selectHashtag,
}) => {
  const cleanedHashtag = hashtag.replace(`#`, ``);
  return (
    <div className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center space-y-2 sm:space-y-3">
      <p className="text-lg sm:text-xl font-bold text-gray-800 text-center">
        {hashtag}
      </p>
      <button
        className="bg-blue-500 text-white rounded-full px-4 sm:px-6 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-600"
        onClick={() => selectHashtag(hashtag)}
      >
        Select
      </button>
      <a
        className="text-blue-500 hover:underline"
        href={`https://twitter.com/hashtag/${cleanedHashtag}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View on Twitter
      </a>
    </div>
  );
};

interface ScoreDisplayProps {
  currentScore: number;
  highScore: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  currentScore,
  highScore,
}) => {
  return (
    <div className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-sm mb-4 sm:mb-6">
      <p className="text-lg sm:text-xl font-bold text-gray-800 mb-2 text-center">
        Score: {currentScore}
      </p>
      <p className="text-lg sm:text-xl font-bold text-gray-800 text-center">
        High Score: {highScore}
      </p>
    </div>
  );
};

const Game: React.FC = () => {
  const [hashtag1, setHashtag1] = useState<HashtagData | null>(null);
  const [hashtag2, setHashtag2] = useState<HashtagData | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [guessResult, setGuessResult] = useState<{
    correct: boolean;
    selectedHashtag: HashtagData;
    unselectedHashtag: HashtagData;
  } | null>(null);

  const selectHashtag = (selectedHashtag: string) => {
    let correct = false;
    let selectedData: HashtagData | null = null;
    let unselectedData: HashtagData | null = null;

    if (
      selectedHashtag === hashtag1?.Hashtag &&
      hashtag1?.Count > (hashtag2?.Count ?? 0)
    ) {
      correct = true;
      selectedData = hashtag1;
      unselectedData = hashtag2;
    } else if (
      selectedHashtag === hashtag2?.Hashtag &&
      hashtag2?.Count > (hashtag1?.Count ?? 0)
    ) {
      correct = true;
      selectedData = hashtag2;
      unselectedData = hashtag1;
    } else {
      if (selectedHashtag === hashtag1?.Hashtag) {
        selectedData = hashtag1;
        unselectedData = hashtag2;
      } else {
        selectedData = hashtag2;
        unselectedData = hashtag1;
      }
    }
    if (selectedData && unselectedData) {
      setGuessResult({
        correct,
        selectedHashtag: selectedData,
        unselectedHashtag: unselectedData,
      });
    }
    if (
      (selectedHashtag === hashtag1?.Hashtag &&
        hashtag1?.Count > (hashtag2?.Count ?? 0)) ||
      (selectedHashtag === hashtag2?.Hashtag &&
        hashtag2?.Count > (hashtag1?.Count ?? 0))
    ) {
      setCurrentScore(currentScore + 1);
      if (currentScore + 1 > highScore) {
        setHighScore(currentScore + 1);
      }
    } else {
      setCurrentScore(0);
    }

    startGame();
  };
  const startGame = () => {
    const firstIndex = Math.floor(Math.random() * hashtagsData.length);
    const randomHashtag1 = { ...hashtagsData[firstIndex], index: firstIndex };
    let secondIndex = Math.floor(Math.random() * hashtagsData.length);
    while (secondIndex === firstIndex) {
      secondIndex = Math.floor(Math.random() * hashtagsData.length);
    }
    const randomHashtag2 = { ...hashtagsData[secondIndex], index: secondIndex };
    setHashtag1(randomHashtag1);
    setHashtag2(randomHashtag2);
  };

  const startButtonHandler = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    if (gameStarted) {
      startGame();
    }
  }, [gameStarted]);

  if (!gameStarted) {
    return (
      <div className="flex flex-col items-center justify-center py-4 px-2 sm:px-4">
        <Helmet>
          <title>Over Under Game | CodyC</title>
        </Helmet>

        <div className="p-4 sm:p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col space-y-3">
          <p className="text-lg sm:text-xl font-bold text-gray-800 text-center">
            Given two hashtags, guess which one was most popular from a dataset
            of millions of tweets scraped from February 9 2023 to February 13
            2023.
          </p>
          <p className="text-lg sm:text-xl font-bold text-gray-800 text-center">
            Click <span className="text-blue-500">View on Twitter</span>
            {` `}
            to open current search results for the given hashtags. But be
            careful! The thousand most popular hashtags in the dataset have not
            been screened for inappropriate content.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white rounded-full px-4 sm:px-6 py-2 transition-colors duration-200 ease-in-out hover:bg-blue-600"
              onClick={startButtonHandler}
            >
              Play
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-2 sm:px-4">
      <Helmet>
        <title>Over Under Game - CodyC</title>
      </Helmet>

      <GuessResultDisplay guessResult={guessResult} />

      <div className="flex flex-col sm:flex-row justify-around w-full sm:w-1/2 my-4 sm:my-6 gap-2 sm:gap-4">
        {hashtag1 && (
          <HashtagDisplay
            hashtag={hashtag1.Hashtag}
            selectHashtag={selectHashtag}
          />
        )}
        {hashtag2 && (
          <HashtagDisplay
            hashtag={hashtag2.Hashtag}
            selectHashtag={selectHashtag}
          />
        )}
      </div>

      <ScoreDisplay currentScore={currentScore} highScore={highScore} />
    </div>
  );
};
export default Game;
