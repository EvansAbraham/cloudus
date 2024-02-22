import Header from '@/components/shared/Header'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header/>
      <body>{children}</body>
    </html>
  );
}
