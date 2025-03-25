"use client";

import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

// 더미 상품 데이터
const dummyProducts = [
  {
    id: 1,
    title: "퍼프 슬리브 블라우스",
    price: "42,000원",
    image: "/assets/product1.svg",
  },
  {
    id: 2,
    title: "플리츠 미니 스커트",
    price: "38,000원",
    image: "/assets/product2.svg",
  },
  {
    id: 3,
    title: "오버사이즈 니트",
    price: "56,000원",
    image: "/assets/product3.svg",
  },
];

// 테스트용 더미 상품 추가 컴포넌트
export default function DummyProducts() {
  const { addToCart } = useCart();
  const [loaded, setLoaded] = useState(false);

  // 컴포넌트 마운트 시 더미 상품 추가 (한 번만 실행)
  useEffect(() => {
    if (!loaded) {
      // 장바구니에 더미 상품 추가
      dummyProducts.forEach((product) => {
        addToCart(product);
      });
      setLoaded(true);
    }
  }, [addToCart, loaded]);

  return null; // 화면에 표시되지 않는 컴포넌트
}
