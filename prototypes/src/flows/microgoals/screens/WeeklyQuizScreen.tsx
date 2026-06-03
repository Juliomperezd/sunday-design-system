import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, Button } from '@mi-org/design-system';
import { Icon } from '../../../../../design-system/src/prototype-components/Icon/Icon';
import { useMicrogoals } from '../MicrogoalsContext';
import styles from './WeeklyQuizScreen.module.css';

interface Question {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'What is the best moment to present the QR code to a guest?',
    options: [
      'At the start of the meal',
      'When they ask for the bill',
      'After the main course',
      'Before taking their order',
    ],
    correct: 1,
  },
  {
    id: 2,
    text: 'How much can Sunday increase your tips compared to cash payment?',
    options: [
      'Around 10%',
      'No difference',
      'Up to 20–30% more',
      'Less than with cash',
    ],
    correct: 2,
  },
  {
    id: 3,
    text: 'What should you do if a guest is struggling to scan the QR?',
    options: [
      'Take back the QR and process payment yourself',
      'Ignore it and come back later',
      'Offer to type in their card manually',
      'Help them open the camera and guide them patiently',
    ],
    correct: 3,
  },
];

export function WeeklyQuizScreen() {
  const navigate = useNavigate();
  const { completed, markComplete } = useMicrogoals();
  const isDone = completed.has(4);

  const [step, setStep] = useState(0); // 0 = intro, 1..N = question, N+1 = result
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const questionIndex = step - 1;
  const currentQ = QUESTIONS[questionIndex];
  const totalQ = QUESTIONS.length;
  const isResult = step === totalQ + 1;
  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;

  function handleSelect(idx: number) {
    if (!revealed) setSelected(idx);
  }

  function handleCheck() {
    if (selected === null) return;
    setRevealed(true);
  }

  function handleNext() {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = selected;
    setAnswers(newAnswers);
    setSelected(null);
    setRevealed(false);
    setStep(step + 1);
    if (step === totalQ) {
      markComplete(4);
    }
  }

  return (
    <div className={styles.screen}>
      <div className={styles.headerWrap}>
        <Header
          variant="inner"
          title="Weekly quiz"
          onBack={() => navigate('/microgoals')}
          rightActions={
            step >= 1 && !isResult
              ? [{ icon: <span className={styles.progress}>{step}/{totalQ}</span> }]
              : undefined
          }
        />
      </div>

      <div className={styles.scroll}>

        {/* ── Intro ── */}
        {step === 0 && (
          <div className={styles.introSection}>
            <div className={styles.introEmoji}>🧠</div>
            <p className={styles.introTitle}>Weekly quiz</p>
            <p className={styles.introBody}>
              Test your Sunday knowledge with {totalQ} quick questions. Answer correctly to earn your $5 reward!
            </p>
            <div className={styles.introPills}>
              <span className={styles.introPill}>
                <Icon name="star-01" size={14} color="#7C3AED" />
                {totalQ} questions
              </span>
              <span className={styles.introPill}>
                <Icon name="lightning-01-1" size={14} color="#EA580C" />
                ~2 min
              </span>
              <span className={styles.introPill}>
                <Icon name="coins-02" size={14} color="#059669" />
                $5 reward
              </span>
            </div>
          </div>
        )}

        {/* ── Question ── */}
        {step >= 1 && !isResult && currentQ && (
          <div className={styles.questionSection}>
            {/* Progress bar */}
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(step / totalQ) * 100}%` }}
              />
            </div>

            <p className={styles.questionText}>{currentQ.text}</p>

            <div className={styles.optionsList}>
              {currentQ.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === currentQ.correct;
                let cls = styles.option;
                if (revealed) {
                  if (isCorrect) cls = `${styles.option} ${styles.optionCorrect}`;
                  else if (isSelected) cls = `${styles.option} ${styles.optionWrong}`;
                } else if (isSelected) {
                  cls = `${styles.option} ${styles.optionSelected}`;
                }
                return (
                  <button key={i} className={cls} onClick={() => handleSelect(i)} disabled={revealed}>
                    <span className={styles.optionLetter}>{String.fromCharCode(65 + i)}</span>
                    <span className={styles.optionText}>{opt}</span>
                    {revealed && isCorrect && (
                      <Icon name="check-circle" size={18} color="#22C55E" />
                    )}
                    {revealed && isSelected && !isCorrect && (
                      <span className={styles.wrongX}>✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            {revealed && (
              <div className={selected === currentQ.correct ? styles.feedbackCorrect : styles.feedbackWrong}>
                <span>{selected === currentQ.correct ? '🎉 Correct!' : '😅 Not quite!'}</span>
                <p className={styles.feedbackText}>
                  {selected === currentQ.correct
                    ? 'Great job! Keep it up.'
                    : `The right answer is: "${currentQ.options[currentQ.correct]}"`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Result ── */}
        {isResult && (
          <div className={styles.resultSection}>
            <div className={styles.resultEmoji}>
              {score === totalQ ? '🏆' : score >= Math.ceil(totalQ / 2) ? '🎉' : '💪'}
            </div>
            <p className={styles.resultTitle}>
              {score === totalQ ? 'Perfect score!' : score >= Math.ceil(totalQ / 2) ? 'Well done!' : 'Keep practising!'}
            </p>
            <p className={styles.resultScore}>{score}/{totalQ} correct</p>
            <p className={styles.resultBody}>
              {score === totalQ
                ? 'You aced it. Your $5 reward has been added to your account!'
                : score >= Math.ceil(totalQ / 2)
                ? 'Good work! Your $5 reward has been added to your account.'
                : 'You completed the quiz — your $5 reward has been added. Review the answers and try again next week!'}
            </p>
            <div className={styles.earnedBadge}>
              <Icon name="coins-02" size={20} color="#059669" />
              <span>+$5 earned</span>
            </div>
          </div>
        )}

        <div style={{ height: 24 }} />
      </div>

      <div className={styles.bottom}>
        {isDone && step === 0 ? (
          <div className={styles.doneBanner}>
            <Icon name="check-circle" size={18} color="#22C55E" />
            <span>Quiz completed this week — $5 earned!</span>
          </div>
        ) : step === 0 ? (
          <Button variant="primary" size="large" onClick={() => setStep(1)}>
            Start quiz
          </Button>
        ) : isResult ? (
          <Button variant="secondary" size="large" onClick={() => navigate('/microgoals')}>
            Back to quests
          </Button>
        ) : revealed ? (
          <Button variant="primary" size="large" onClick={handleNext}>
            {step < totalQ ? 'Next question' : 'See results'}
          </Button>
        ) : (
          <Button variant="primary" size="large" onClick={handleCheck} disabled={selected === null}>
            Check answer
          </Button>
        )}
      </div>
    </div>
  );
}
