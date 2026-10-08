import { useState } from "react";
import { validationQuestions } from "../data/anniversary";

export default function HeartGate({ onUnlock }) {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const verified = step === validationQuestions.length;
  const question = validationQuestions[step];

  function choose(choice) {
    if (choice.toLowerCase() === question.answer.toLowerCase()) {
      setError("");
      setStep((current) => current + 1);
      return;
    }

    setError(question.error);
  }

  return (
    <main className="gate-screen">
      <div className="gate-aurora gate-aurora-one" aria-hidden="true" />
      <div className="gate-aurora gate-aurora-two" aria-hidden="true" />
      <div className="floating-petals" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span key={index} style={{ "--petal": index }} />
        ))}
      </div>

      <section className="gate-card" aria-live="polite">
        <div className="gate-seal" aria-hidden="true">
          <span>G</span>
          <i>♥</i>
          <span>P</span>
        </div>

        {!verified ? (
          <>
            <p className="gate-overline">
              A private invitation · Just for Patricia
            </p>
            <p className="gate-step">
              Question {step + 1} of {validationQuestions.length}
            </p>
            <h1>A little question before we begin…</h1>
            <div className="question-wrap">
              <p className="question-eyebrow">{question.eyebrow}</p>
              <h2>{question.question}</h2>
              <p className="question-hint">{question.hint}</p>
              <div className="choice-grid">
                {question.choices.map((choice) => (
                  <button
                    type="button"
                    key={choice}
                    onClick={() => choose(choice)}
                  >
                    <span>{choice}</span>
                    <i aria-hidden="true">↗</i>
                  </button>
                ))}
              </div>
              {error && <p className="gate-error">{error}</p>}
            </div>
          </>
        ) : (
          <div className="verified-card">
            <p className="gate-overline">All four answers match</p>
            <span className="verified-heart" aria-hidden="true">
              ♥
            </span>
            <h1>Heartprint confirmed.</h1>
            <p>
              Welcome, Patricia. Something made with four years of memories, a
              ridiculous amount of love, and one very nervous heart is waiting
              for you.
            </p>
            <button type="button" className="unlock-button" onClick={onUnlock}>
              <span>Open our story</span>
              <i aria-hidden="true">♥</i>
            </button>
            <small>Turn your sound on for the full experience.</small>
          </div>
        )}

        <div
          className="gate-progress"
          aria-label={`Validation progress: ${step} of ${validationQuestions.length}`}
        >
          {validationQuestions.map((item, index) => (
            <span
              className={
                index < step ? "complete" : index === step ? "current" : ""
              }
              key={item.question}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
