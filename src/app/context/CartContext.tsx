"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// 장바구니 아이템 타입 정의
export interface CartItem {
  id: number;
  title: string;
  price: string;
  image: string;
  quantity: number;
}

// 장바구니 컨텍스트 타입 정의
interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  cartCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
}

// 장바구니 컨텍스트 생성
const CartContext = createContext<CartContextType | undefined>(undefined);

// 장바구니 컨텍스트 프로바이더 컴포넌트
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // 로컬 스토리지에서 장바구니 데이터 불러오기
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // 장바구니 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    // 장바구니 아이템 개수 계산
    const count = cartItems.reduce((total, item) => total + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  // 장바구니에 아이템 추가
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prevItems) => {
      // 이미 장바구니에 있는 아이템인지 확인
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // 이미 있는 아이템이면 수량만 증가
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        // 새 아이템이면 추가
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });

    // 아이템 추가 시 장바구니 팝업 열기
    // setIsCartOpen(true);
  };

  // 장바구니에서 아이템 제거
  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // 아이템 수량 증가
  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // 아이템 수량 감소
  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // 장바구니 팝업 토글
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // 장바구니 팝업 닫기
  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartCount,
        isCartOpen,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 장바구니 컨텍스트 사용을 위한 훅
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
