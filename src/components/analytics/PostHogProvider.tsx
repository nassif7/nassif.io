'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN!, {
      api_host: 'https://eu.i.posthog.com',
      ui_host: 'https://eu.posthog.com',
      persistence: 'memory',         // no cookies, no localStorage
      autocapture: false,             // no automatic click/input tracking
      capture_pageview: false,        // we fire pageviews manually via PostHogPageView
      capture_pageleave: false,
      disable_session_recording: true,
      person_profiles: 'never',       // no user profiles / personal data
    })
  }, [])

  return <>{children}</>
}
