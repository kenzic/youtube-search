import CssBaseline from "@mui/material/CssBaseline";

export const metadata = {
  title: "YouTube App",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
        />
        <CssBaseline />
      </head>
      <body>{children}</body>
    </html>
  );
}
