import Image from 'next/image'

export function Portrait({ label = 'Portrait of Nassif Nassif' }: { label?: string }) {
  return (
    <Image
      src="/avatar.png"
      alt={label}
      width={500}
      height={500}
      sizes="(max-width: 860px) 76vw, 350px"
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        objectFit: 'cover',
        objectPosition: 'center top',
        filter: 'grayscale(100%) contrast(65%)',
        opacity: 0.62,
        mixBlendMode: 'multiply',
      }}
    />
  )
}
