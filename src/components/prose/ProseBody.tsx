import styles from './ProseBody.module.css'

interface ProseBodyProps {
  children: React.ReactNode
  fontSize?: string
}

export function ProseBody({ children, fontSize }: ProseBodyProps) {
  return (
    <div className={styles.body} style={fontSize ? { fontSize } : undefined}>
      {children}
    </div>
  )
}
