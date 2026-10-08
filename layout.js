import "./globals.css";

export const metadata = {
  title: "Groq Chatbot",
  description: "An LLM chatbot built with Next.js and Groq, deployed on Vercel.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
