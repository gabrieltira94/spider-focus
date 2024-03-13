export const getMotivationalPomodoro = () => {
  const random = Math.random() * pomodoroMessages.length;
  const integer = Math.round(random);

  return pomodoroMessages[integer];
};

export const getMotivationalShortBreak = () => {
  const random = Math.random() * shortBreakMessages.length;
  const integer = Math.round(random);

  return shortBreakMessages[integer];
};

const pomodoroMessages = [
  "Stay determined, success is a series of small efforts.",
  "One step at a time; you're closer to your goal with every Pomodoro.",
  "You're making progress, keep going!",
  "Focus now, celebrate later.",
  "Small actions lead to big results.",
  "You're doing great, keep up the good work!",
  "Don't stop when you're tired, stop when you're done.",
  "Hard work beats talent when talent doesn't work hard.",
  "Stay committed to your goals, one Pomodoro at a time.",
  "Stay in your zone and watch your dreams come true.",
  "The only way to finish is to start; you're on the right path.",
  "You've got this; keep pushing through!",
  "Focus on the task at hand and see it through to success.",
  "Each Pomodoro is a step toward your ambitions.",
  "Stay dedicated, and you'll achieve greatness.",
  "Stay disciplined, and the results will amaze you.",
  "Concentrate now, and soon you'll celebrate.",
  "You're creating your future with every minute you invest.",
  "Work hard in silence; success will be your noise.",
  "Stay relentless in your pursuit of dreams.",
];

const shortBreakMessages = [
  'Stretch and relax your body.',
  'Take a short walk around your workspace.',
  'Practice deep breathing or a quick mindfulness exercise.',
  'Drink a glass of water.',
  'Snack on a healthy treat.',
  'Review and organize your to-do list.',
  'Check your emails or messages quickly.',
  'Do a set of quick exercises (e.g., push-ups, squats).',
  'Listen to a short, calming music track.',
  'Read an inspirational quote or mantra.',
  'Write down a short gratitude list.',
  'Visualize your goals or a peaceful place.',
  'Call or text a friend for a quick chat.',
  'Solve a quick brain teaser or puzzle.',
  'Do a one-minute meditation.',
  'Plan your next Pomodoro session.',
  'Check your social media or favorite website.',
  'Tidy up your workspace.',
  'Rehydrate with a cup of herbal tea.',
  'Enjoy a few moments of silence and stillness.',
];

export const Tooltips = {
  SettingsModal: {
    LongBreakInterval: 'How many pomodoros does it take until you take a Long Break?',
    AutoPlay: 'Automatically starts the round when the previous one finishes'
  },
  Timer: {
    Counter: 'Press it to reset the counter'
  }
};
