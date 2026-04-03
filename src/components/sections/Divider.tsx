'use client'

import { useState, useEffect } from 'react'
import styles from './Divider.module.css'

function DividerA() {
  return (
    <path
      d="M 0,3 C 100,2 250,4 400,3 C 500,2 560,3 600,3 C 560,7 500,8 400,8 C 250,9 100,7 0,8 Z"
      fill="url(#dg)"
    />
  )
}

function DividerB() {
  // more curved — dips in the middle
  return (
    <path
      d="M 0,4 C 80,1 180,5 300,2 C 420,0 520,4 600,3 C 520,7 420,9 300,7 C 180,10 80,6 0,8 Z"
      fill="url(#dg)"
    />
  )
}

function DividerC() {
  // thinner, tighter taper, slight upward angle
  return (
    <path
      d="M 0,5 C 120,4 260,5 380,4 C 480,3 550,4 600,2 C 550,4 480,5 380,6 C 260,7 120,6 0,7 Z"
      fill="url(#dg)"
    />
  )
}

const VARIANTS = [DividerA, DividerB, DividerC]

export function Divider() {
  const [variant, setVariant] = useState(0)

  useEffect(() => {
    setVariant(Math.floor(Math.random() * VARIANTS.length))
  }, [])

  const Shape = VARIANTS[variant]

  return (
    <div className={styles.wrapper}>
      <svg viewBox="0 0 600 12" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="dg" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.9"/>
            <stop offset="75%"  stopColor="var(--accent)" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <Shape />
      </svg>
    </div>
  )
}
