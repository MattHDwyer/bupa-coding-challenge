export function TypographyText({ children }: { children: React.ReactNode }) {
  return <p className="text-lg">{children}</p>
}

export function TypographyH1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold">{children}</h1>
}

export function TypographyH2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold">{children}</h2>
}

export function TypographyH3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold">{children}</h3>
}
