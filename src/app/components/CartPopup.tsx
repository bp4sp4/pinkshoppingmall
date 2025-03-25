"use client";

import { useCart } from "../context/CartContext";
import { useEffect, useRef } from "react";

export default function CartPopup() {
  const { 
    cartItems, 
    isCartOpen, 
    closeCart, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity 
  } = useCart();
  
  const popupRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 팝업 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  // 총 금액 계산
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ""));
      return total + (price * item.quantity);
    }, 0);
  };

  if (!isCartOpen) return null;

  return (
    <div className="header-cart-popup-overlay">
      <div className="header-cart-popup" ref={popupRef}>
        <div className="header-cart-popup__header">
          <h3 className="header-cart-popup__title">장바구니</h3>
          <button className="header-cart-popup__close" onClick={closeCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="header-cart-popup__content">
          {cartItems.length === 0 ? (
            <div className="header-cart-popup__empty">
              <p>장바구니가 비어있습니다.</p>
            </div>
          ) : (
            <>
              <ul className="header-cart-popup__items">
                {cartItems.map((item) => (
                  <li key={item.id} className="header-cart-popup__item">
                    <div className="header-cart-popup__item-image-container">
                      <img src={item.image} alt={item.title} className="header-cart-popup__item-image" />
                    </div>
                    <div className="header-cart-popup__item-details">
                      <h4 className="header-cart-popup__item-title">{item.title}</h4>
                      <div className="header-cart-popup__item-price">{item.price}</div>
                      
                      <div className="header-cart-popup__item-actions">
                        <div className="header-cart-popup__quantity-control">
                          <button 
                            className="header-cart-popup__quantity-button"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="header-cart-popup__quantity">{item.quantity}</span>
                          <button 
                            className="header-cart-popup__quantity-button"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          className="header-cart-popup__remove-button"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="header-cart-popup__summary">
                <div className="header-cart-popup__total">
                  <span>총 금액:</span>
                  <span>{calculateTotal().toLocaleString()}원</span>
                </div>
              </div>
              
              <div className="header-cart-popup__footer">
                <button className="button button--primary header-cart-popup__checkout-button">
                  결제하기
                </button>
                <button className="button button--secondary header-cart-popup__continue-button" onClick={closeCart}>
                  쇼핑 계속하기
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
