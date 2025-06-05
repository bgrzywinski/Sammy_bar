import './globals.css';
import './custom.css';

export const metadata = {
  title: 'Sammy - Wyszukiwarka streszczeń',
  description: 'Znajdź streszczenia i recenzje książek, filmów i artykułów',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className="bg-gray-50">
        {children}
      </body>
    </html>
  );
}
