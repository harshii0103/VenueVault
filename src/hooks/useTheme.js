import { useEffect, useState } from 'react'

const KEY = 'vv_theme'

// Remembers the choice; first visit follows the device's light/dark setting.
export function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY)
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch { return false }
  })
  useEffect(() => { try { localStorage.setItem(KEY, dark ? 'dark' : 'light') } catch { /* ignore */ } }, [dark])
  return [dark, setDark]
}
