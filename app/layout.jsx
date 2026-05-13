import "./globals.css";

export const metadata = {
  title: "Vault Blox | Robux com bônus",
  description: "Página de vendas demonstrativa para pacotes de Robux com visual limpo.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
