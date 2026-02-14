const PREFIX = 'cube_timer_history_'

export function getTimerHistoryKey(email: string): string {
  return PREFIX + email.trim().toLowerCase()
}

export function loadTimerHistory(email: string): string[] {
  try {
    const raw = localStorage.getItem(getTimerHistoryKey(email))
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === 'string') : []
  } catch {
    return []
  }
}

export function saveTimerHistory(email: string, history: string[]) {
  localStorage.setItem(getTimerHistoryKey(email), JSON.stringify(history))
}

export function addTimeToHistory(email: string, time: string): string[] {
  const history = loadTimerHistory(email)
  const next = [time, ...history]
  saveTimerHistory(email, next)
  return next
}
