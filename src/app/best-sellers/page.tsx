"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../styles/category.css";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState("전체");
  const [sortBy, setSortBy] = useState("최신순");

  // 상품 데이터
  const products = [
    {
      id: 1,
      title: "플라워 패턴 블라우스",
      category: "상의",
      originalPrice: "59,000원",
      price: "45,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.5,
      reviewCount: 32,
      isNew: false,
      isBest: false,
      isSale: false,
      rank: 1,
    },
    {
      id: 2,
      title: "미니멀 크로스백",
      category: "액세서리",
      originalPrice: "48,000원",
      price: "38,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.7,
      reviewCount: 45,
      isNew: false,
      isBest: false,

      rank: 2,
    },
    {
      id: 3,
      title: "와이드 데님 팬츠",
      category: "하의",
      originalPrice: "68,000원",
      price: "52,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.3,
      reviewCount: 28,
      isNew: false,
      isBest: false,

      rank: 3,
    },
    {
      id: 4,
      title: "퍼프 슬리브 블라우스",
      category: "상의",
      originalPrice: "52,000원",
      price: "42,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.6,
      reviewCount: 22,
      isNew: false,
      isBest: true,
      isSale: false,
    },
    {
      id: 5,
      title: "플라워 패턴 블라우스",
      category: "상의",
      originalPrice: "59,000원",
      price: "45,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.5,
      reviewCount: 32,
      isNew: false,
      isBest: true,
      isSale: false,
    },
    {
      id: 6,
      title: "미니멀 크로스백",
      category: "액세서리",
      originalPrice: "48,000원",
      price: "38,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.7,
      reviewCount: 45,
      isNew: false,
      isBest: true,
      isSale: false,
    },
    {
      id: 7,
      title: "와이드 데님 팬츠",
      category: "하의",
      originalPrice: "68,000원",
      price: "52,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.3,
      reviewCount: 28,
      isNew: false,
      isBest: true,
      isSale: false,
    },
    {
      id: 8,
      title: "퍼프 슬리브 블라우스",
      category: "상의",
      originalPrice: "52,000원",
      price: "42,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.6,
      reviewCount: 22,
      isNew: false,
      isBest: true,
      isSale: false,
    },
    {
      id: 9,
      title: "퍼프 슬리브 블라우스",
      category: "상의",
      originalPrice: "52,000원",
      price: "18,000원",
      image: "/assets/bestseller/bestseller4.svg",
      rating: 4.6,
      reviewCount: 22,
      isNew: false,
      isBest: true,
      isSale: false,
    },
  ];

  // 가격 필터링
  const filteredProducts = products.filter((product) => {
    const price = parseInt(product.price.replace(/[^0-9]/g, ""));

    if (priceFilter === "전체") return true;
    if (priceFilter === "~2만원") return price < 20000;
    if (priceFilter === "2만원~5만원") return price >= 20000 && price <= 50000;
    if (priceFilter === "5만원~") return price > 50000;
    return true;
  });

  // 페이지네이션
  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // 별점 렌더링 함수
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`star-${i}`}
          className="category-product__star category-product__star--filled"
        >
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span
          key="half-star"
          className="category-product__star category-product__star--half"
        >
          ★
        </span>
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`} className="category-product__star">
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="category-page">
      {/* 카테고리 배너 */}
      <div className="category-banner category-banner--clothing">
        <div className="container">
          <div className="category-banner__content">
            <h1 className="category-banner__title">베스트셀러</h1>
            <p className="category-banner__subtitle">
              핑크숍의 인기 상품들을 만나보세요
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* 서브 카테고리 네비게이션 */}
        <div className="subcategory-nav">
          <div className="subcategory-nav__container">
            <a
              href="#"
              className="subcategory-nav__item subcategory-nav__item--active"
            >
              전체
            </a>
            <a href="#" className="subcategory-nav__item">
              상의
            </a>
            <a href="#" className="subcategory-nav__item">
              하의
            </a>
            <a href="#" className="subcategory-nav__item">
              액세서리
            </a>
            <a href="#" className="subcategory-nav__item">
              뷰티
            </a>
          </div>
        </div>

        {/* 필터 섹션 */}
        <div className="filter">
          <div className="filter__container">
            <div className="filter__group">
              <label className="filter__label">정렬</label>
              <select
                className="filter__select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="최신순">최신순</option>
                <option value="인기순">인기순</option>
                <option value="낮은가격순">낮은가격순</option>
                <option value="높은가격순">높은가격순</option>
              </select>
            </div>
            <div className="filter__buttons">
              <button
                className={`filter__button ${
                  priceFilter === "전체" ? "filter__button--active" : ""
                }`}
                onClick={() => setPriceFilter("전체")}
              >
                전체
              </button>
              <button
                className={`filter__button ${
                  priceFilter === "~2만원" ? "filter__button--active" : ""
                }`}
                onClick={() => setPriceFilter("~2만원")}
              >
                ~2만원
              </button>
              <button
                className={`filter__button ${
                  priceFilter === "2만원~5만원" ? "filter__button--active" : ""
                }`}
                onClick={() => setPriceFilter("2만원~5만원")}
              >
                2만원~5만원
              </button>
              <button
                className={`filter__button ${
                  priceFilter === "5만원~" ? "filter__button--active" : ""
                }`}
                onClick={() => setPriceFilter("5만원~")}
              >
                5만원~
              </button>
            </div>
          </div>
        </div>

        {/* 상품 그리드 */}
        <div className="category-products">
          {currentProducts.map((product) => (
            <div key={product.id} className="category-product__item">
              <div className="category-product__card">
                {product.isNew && (
                  <span className="category-product__badge">NEW</span>
                )}
                {product.isBest && (
                  <span
                    className="category-product__badge"
                    style={{ backgroundColor: "#FFDE59", color: "#333" }}
                  >
                    BEST
                  </span>
                )}
                {product.isSale && (
                  <span
                    className="category-product__badge"
                    style={{ backgroundColor: "#FF6B6B" }}
                  >
                    SALE
                  </span>
                )}
                {product.rank && (
                  <span
                    className="category-product__badge"
                    style={{
                      backgroundColor:
                        product.rank === 1
                          ? "#FFD700"
                          : product.rank === 2
                          ? "#C0C0C0"
                          : product.rank === 3
                          ? "#CD7F32"
                          : "#FFDE59",
                      color: "#333",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    {product.rank}위
                  </span>
                )}
                <div className="category-product__image-container">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="category-product__image"
                  />
                  <div className="category-product__hover-actions">
                    <button className="category-product__action-button">
                      <i className="fas fa-heart"></i>
                    </button>
                    <button className="category-product__action-button">
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                    <Link
                      href={`/product/${product.id}`}
                      className="category-product__title-link"
                    >
                      <button className="category-product__action-button">
                        <i className="fas fa-search"></i>
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="category-product__content">
                  <div className="category-product__category">
                    {product.category}
                  </div>
                  <h3 className="category-product__title">{product.title}</h3>
                  <div className="category-product__price-container">
                    <span className="category-product__price-original">
                      {product.originalPrice}
                    </span>
                    <span className="category-product__price">
                      {product.price}
                    </span>
                  </div>
                  <div className="category-product__rating">
                    {renderStars(product.rating)}
                    <span className="category-product__review-count">
                      ({product.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 페이지네이션 */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination__item ${
                currentPage === page ? "pagination__item--active" : ""
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              className="pagination__item pagination__item--next"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
