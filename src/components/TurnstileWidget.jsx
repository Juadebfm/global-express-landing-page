import { useEffect, useRef, useCallback } from 'react'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY

function renderWidget(container, onToken) {
  if (!window.turnstile || !container) return undefined
  return window.turnstile.render(container, {
    sitekey: SITE_KEY,
    callback: onToken,
    'expired-callback': () => onToken(null),
    'error-callback': () => onToken(null),
    theme: 'auto',
  })
}

export function TurnstileWidget({ onToken, className = '' }) {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(undefined)

  const init = useCallback(() => {
    if (!SITE_KEY || !containerRef.current || widgetIdRef.current !== undefined) return
    widgetIdRef.current = renderWidget(containerRef.current, onToken)
  }, [onToken])

  useEffect(() => {
    if (!SITE_KEY) return
    if (window.turnstile) {
      init()
      return
    }
    const handler = () => init()
    window.addEventListener('turnstile:loaded', handler)
    return () => window.removeEventListener('turnstile:loaded', handler)
  }, [init])

  useEffect(() => {
    return () => {
      if (widgetIdRef.current !== undefined && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = undefined
      }
    }
  }, [])

  if (!SITE_KEY) return null
  return <div ref={containerRef} className={className} />
}
