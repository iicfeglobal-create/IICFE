// Founders Lab progress store — persisted per browser in localStorage.
// Tracks activity completion, quiz results and integrity violations.

const STORE_KEY = 'fl_progress_v1'

const emptyState = () => ({
  activities: {}, // sessionId -> { done: true, completedAt }
  quizzes: {},    // sessionId -> { score, total, passedAt } | { terminated: true, reason, at }
  terminated: false, // global flag: caught cheating — lab access revoked
  terminatedReason: null,
})

let listeners = []

export function readProgress() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORE_KEY))
    return raw ? { ...emptyState(), ...raw } : emptyState()
  } catch {
    return emptyState()
  }
}

function writeProgress(state) {
  localStorage.setItem(STORE_KEY, JSON.stringify(state))
  listeners.forEach((fn) => fn(state))
}

export function subscribe(fn) {
  listeners.push(fn)
  return () => { listeners = listeners.filter((l) => l !== fn) }
}

export function markActivityDone(sessionId) {
  const state = readProgress()
  state.activities[sessionId] = { done: true, completedAt: Date.now() }
  writeProgress(state)
}

export function isActivityDone(sessionId) {
  return !!readProgress().activities[sessionId]?.done
}

export function recordQuizResult(sessionId, score, total) {
  const state = readProgress()
  // A terminated quiz can never be overwritten with a fresh result
  if (state.quizzes[sessionId]?.terminated) return
  state.quizzes[sessionId] = { score, total, passedAt: Date.now() }
  writeProgress(state)
}

export function terminateQuiz(sessionId, reason) {
  const state = readProgress()
  state.quizzes[sessionId] = { terminated: true, reason, at: Date.now() }
  state.terminated = true
  state.terminatedReason = reason
  writeProgress(state)
}

export function isTerminated() {
  return readProgress().terminated
}

export function getQuizResult(sessionId) {
  return readProgress().quizzes[sessionId] || null
}

export function isFullyComplete(sessionIds) {
  const state = readProgress()
  if (state.terminated) return false
  return sessionIds.every((id) => {
    const quiz = state.quizzes[id]
    return state.activities[id]?.done && quiz && !quiz.terminated && quiz.score >= Math.ceil(quiz.total * 0.7)
  })
}

// Demo-only helper: wipe all lab progress (exposed on the login screen so the
// demo account can be reset between walkthroughs).
export function resetDemoData() {
  localStorage.removeItem(STORE_KEY)
  listeners.forEach((fn) => fn(emptyState()))
}

// Demo-only override: lift a cheating termination without wiping progress.
// Clears the global flag and removes terminated quiz attempts so those
// quizzes can be retaken; completed activities and passed quizzes survive.
// In the public version this will be a coordinator-only backend action.
export function liftTermination() {
  const state = readProgress()
  state.terminated = false
  state.terminatedReason = null
  for (const id of Object.keys(state.quizzes)) {
    if (state.quizzes[id]?.terminated) delete state.quizzes[id]
  }
  writeProgress(state)
}
