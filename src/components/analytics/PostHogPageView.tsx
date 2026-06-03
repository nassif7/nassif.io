'use client'

import { useEffect } from 'react'
import posthog from 'posthog-js'

interface Props {
  event: string
  properties?: Record<string, string | number | boolean | undefined>
}

export function PostHogPageView({ event, properties }: Props) {
  useEffect(() => {
    posthog.capture(event, properties)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}
