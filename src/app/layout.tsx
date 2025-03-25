import type { Metadata } from "next";
import "./globals.css";
import "./styles/style-guide.css";
import "./styles/main.css";
import "./styles/header-cart-popup.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import CartPopup from "./components/CartPopup";

export const metadata: Metadata = {
  title: "핑크숍 - 화사한 봄을 위한 특별한 아이템",
  description: "화사한 봄을 위한 특별한 아이템을 만나보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
          <CartPopup />
        </CartProvider>
        <script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-bundle.min.js"></script>
      </body>
    </html>
  );
}
