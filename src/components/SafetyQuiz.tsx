import React, { useState } from 'react';
import { SAFETY_QUIZ_QUESTIONS } from '../data/quizData.ts';
import { ShieldCheck, CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, AlertTriangle } from 'lucide-react';

export const SafetyQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionId: number; selectedIndex: number; isCorrect: boolean }[]>([]);

  const currentQ = SAFETY_QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    const isCorrect = selectedOption === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setUserAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        selectedIndex: selectedOption,
        isCorrect,
      },
    ]);

    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SAFETY_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setUserAnswers([]);
  };

  const getScoreFeedback = () => {
    if (score === 5) {
      return {
        title: "A'lo darajadagi mutaxassis!",
        desc: "Siz avtokran xavfsizligi va qurilish maydonidagi me'yorlarni mukammal bilasiz.",
        badgeColor: "text-emerald-500",
      };
    } else if (score >= 3) {
      return {
        title: "Yaxshi bilim darajasi!",
        desc: "Asosiy qoidalardan xabardorsiz, biroq ayrim texnik nuanslarni yana bir bor takrorlash foydali bo'ladi.",
        badgeColor: "text-[#FFB800]",
      };
    } else {
      return {
        title: "Ko'proq o'rganish lozim",
        desc: "Avtokranlar bilan ishlashda xavfsizlik birinchi o'rinda turadi. Savollar javoblarini qayta ko'rib chiqing.",
        badgeColor: "text-amber-500",
      };
    }
  };

  return (
    <section id="xavfsizlik" className="py-16 lg:py-24 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-black/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#FFB800] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#FFB800]" />
            <span>Xavfsizlik Va Bilim</span>
            <span className="text-neutral-400">·</span>
            <span>Interaktiv Test</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight text-neutral-900 dark:text-white">
            XAVFSIZLIK VA BILIM TESTI
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl mx-auto">
            Avtokranlarni xavfsiz boshqarish va qurilish maydonchasidagi ehtiyot choralari bo‘yicha 5 ta test savoliga javob bering.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white dark:bg-[#15191E] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-lg">
          
          {!quizFinished ? (
            <div>
              {/* Progress and Question Counter */}
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-4 font-heading">
                <span>Savol {currentQuestionIndex + 1} / {SAFETY_QUIZ_QUESTIONS.length}</span>
                <span className="text-[#FFB800]">Joriy ball: {score}</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-[#FFB800] transition-all duration-300"
                  style={{
                    width: `${((currentQuestionIndex + (isAnswerSubmitted ? 1 : 0)) / SAFETY_QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-6 leading-snug">
                {currentQ.question}
              </h3>

              {/* Options List */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let optionStyles = 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 hover:border-neutral-400 dark:hover:border-neutral-600';

                  if (isSelected && !isAnswerSubmitted) {
                    optionStyles = 'border-[#FFB800] bg-amber-500/10 text-neutral-900 dark:text-white font-semibold ring-1 ring-[#FFB800]';
                  }

                  if (isAnswerSubmitted) {
                    if (isCorrect) {
                      optionStyles = 'border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'border-rose-500 bg-rose-500/10 text-rose-900 dark:text-rose-200 font-semibold ring-1 ring-rose-500';
                    } else {
                      optionStyles = 'border-neutral-200 dark:border-neutral-800 opacity-50 bg-neutral-50 dark:bg-neutral-900/40 text-neutral-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3.5 text-sm cursor-pointer ${optionStyles}`}
                    >
                      <span className="w-6 h-6 rounded-md bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-neutral-700 dark:text-neutral-300">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{option}</span>

                      {isAnswerSubmitted && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {isAnswerSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert when answered */}
              {isAnswerSubmitted && (
                <div
                  className={`p-4 rounded-xl mb-6 text-sm flex items-start gap-3 ${
                    selectedOption === currentQ.correctIndex
                      ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-500/10 border border-rose-500/30 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  {selectedOption === currentQ.correctIndex ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold block mb-1">
                      {selectedOption === currentQ.correctIndex ? 'To‘g‘ri javob!' : 'Noto‘g‘ri javob!'}
                    </span>
                    <p className="text-xs leading-relaxed opacity-90">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              )}

              {/* Quiz Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={handleSubmitAnswer}
                    className="px-6 py-2.5 rounded-lg bg-[#FFB800] disabled:bg-neutral-300 dark:disabled:bg-neutral-800 text-black disabled:text-neutral-500 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
                  >
                    Javobni tekshirish
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 rounded-lg bg-[#FFB800] hover:bg-[#e5a600] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <span>{currentQuestionIndex < SAFETY_QUIZ_QUESTIONS.length - 1 ? 'Keyingi savol' : 'Natijani ko‘rish'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-[#FFB800]">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFB800] font-heading block">
                  Sinov Yakunlandi
                </span>
                <h3 className="text-3xl font-black font-heading text-neutral-900 dark:text-white mt-1">
                  Sizning Natijangiz: <span className="text-[#FFB800]">{score}</span> / {SAFETY_QUIZ_QUESTIONS.length}
                </h3>
                <p className={`text-base font-bold mt-2 ${getScoreFeedback().badgeColor}`}>
                  {getScoreFeedback().title}
                </p>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-md mx-auto">
                  {getScoreFeedback().desc}
                </p>
              </div>

              {/* Restart Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={handleRestartQuiz}
                  className="px-8 py-3 rounded-lg bg-[#FFB800] hover:bg-[#e5a600] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta boshlash</span>
                </button>
              </div>
            </div>
          )}

          {/* Educational notice disclaimer */}
          <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-[#FFB800] shrink-0" />
            <span>
              Mazkur test ta’limiy va xabardorlik maqsadida tuzilgan bo‘lib, davlat texnika nazorati yoki rasmiy kran boshqaruv sertifikatlarini almashtirmaydi.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
