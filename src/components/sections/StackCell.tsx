'use client'

import { useState } from 'react'
import styles from './Stack.module.css'

function CircleA() {
  return (
    <svg viewBox="0 0 100 70" className={styles.mark} fill="none">
      <path
        d="M 50,7 C 74,5 94,18 94,35 C 94,53 75,65 50,66 C 25,67 6,54 6,37 C 6,19 27,8 50,7"
        stroke="var(--accent)" strokeWidth="4" strokeLinecap="round"
      />
    </svg>
  )
}

function CircleB() {
  // double circle — two overlapping strokes slightly offset, like the reference image
  return (
    <svg viewBox="0 0 100 70" className={styles.mark} fill="none">
      <path
        d="M 50,8 C 75,6 95,19 95,36 C 95,54 76,66 50,67 C 24,68 5,55 5,38 C 5,20 26,9 50,8"
        stroke="var(--accent)" strokeWidth="3.5" strokeLinecap="round"
      />
      <path
        d="M 52,10 C 77,9 96,21 95,37 C 94,54 74,65 49,66 C 24,67 6,55 7,39"
        stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.5"
      />
    </svg>
  )
}

function CircleC() {
  // loose, slightly tilted oval — drawn quickly
  return (
    <svg viewBox="0 0 100 70" className={styles.mark} fill="none">
      <path
        d="M 54,5 C 80,2 98,16 97,34 C 96,54 76,68 48,68 C 20,68 3,55 4,36 C 5,16 28,8 54,5"
        stroke="var(--accent)" strokeWidth="4.5" strokeLinecap="round"
      />
    </svg>
  )
}

const CIRCLES = [CircleA, CircleB, CircleC]

interface StackCellProps {
  children?: React.ReactNode
  daily?: boolean
}

export function StackCell({ children, daily }: StackCellProps) {
  const [variant, setVariant] = useState(0)

  const handleMouseEnter = () => {
    setVariant(Math.floor(Math.random() * CIRCLES.length))
  }

  const Circle = CIRCLES[variant]

  return (
    <div className={styles.cell} onMouseEnter={handleMouseEnter}>
      <Circle />
      {daily && <span className={styles.dailyDot} />}
      <span className={styles.cellLabel}>{children}</span>
    </div>
  )
}
