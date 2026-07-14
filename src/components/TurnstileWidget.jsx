import { useEffect, useRef, useCallback } from 'react'

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY
const TURNSTILE_DEV_TOKEN = 'dev-bypass-token'
const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA'
const IS_DEV_BYPASS =
  !SITE_KEY || (import.meta.env.DEV && SITE_KEY === TURNSTILE_TEST_SITE_KEY)

function readWidgetToken(container, widgetId) {
  if (!window.turnstile) return null

  if (widgetId !== undefined && typeof window.turnstile.getResponse === 'function') {
    const response = window.turnstile.getResponse(widgetId)
    if (response) return response
  }

  return container?.querySelector('input[name="cf-turnstile-response"]')?.value || null
}

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
  const syncTimerRef = useRef(undefined)

  const clearSyncTimer = useCallback(() => {
    if (syncTimerRef.current !== undefined) {
      window.clearInterval(syncTimerRef.current)
      syncTimerRef.current = undefined
    }
  }, [])

  const syncToken = useCallback(() => {
    if (!containerRef.current) return
    const token = readWidgetToken(containerRef.current, widgetIdRef.current)
    if (token) {
      onToken(token)
      clearSyncTimer()
    }
  }, [clearSyncTimer, onToken])

  const init = useCallback(() => {
    if (!SITE_KEY || !containerRef.current || widgetIdRef.current !== undefined) return
    widgetIdRef.current = renderWidget(containerRef.current, onToken)
    syncToken()
    syncTimerRef.current = window.setInterval(syncToken, 500)
  }, [onToken, syncToken])

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
    if (!IS_DEV_BYPASS) return
    queueMicrotask(() => onToken(TURNSTILE_DEV_TOKEN))
  }, [onToken])

  useEffect(() => {
    return () => {
      clearSyncTimer()
      if (widgetIdRef.current !== undefined && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = undefined
      }
    }
  }, [clearSyncTimer])

  if (IS_DEV_BYPASS) {
    return (
      <p
        className={`text-xs text-[color:var(--text-muted)] ${className}`.trim()}
        data-testid="turnstile-dev-bypass"
      >
        Verification bypassed for local development.
      </p>
    )
  }

  return <div ref={containerRef} className={className} />
}
