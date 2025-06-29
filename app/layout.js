import "./globals.css";

export const metadata = {
  title: "Respiratory Rate Monitor",
  description: "A tool for monitoring patient respirations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900 text-slate-200 font-sans selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
