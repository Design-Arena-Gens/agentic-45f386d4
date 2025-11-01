export const metadata = {
  title: 'Calculator',
  description: 'A modern calculator app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
