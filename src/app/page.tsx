"use client";

import TimeDealSwiper from "./components/TimeDealSwiper";
import MainBannerSwiper from "./components/MainBannerSwiper";
import Link from "next/link";
import "./styles/card-styles.css";
import DummyProducts from "./components/DummyProducts";

export default function Home() {
  return (
    <main>
      {/* 테스트용 더미 상품 데이터 추가 */}
      <DummyProducts />

      {/* 메인 배너 */}
      <MainBannerSwiper />

      {/* 타임딜 섹션 */}
      <TimeDealSwiper />

      {/* 카테고리 섹션 */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">카테고리</h2>
          </div>

          <div className="category">
            <Link href="/category/clothing" className="category__item">
              <div className="category__icon">
                <img
                  src="/assets/icons/clothing.svg"
                  alt="의류"
                  className="category__icon-image"
                />
              </div>
              <span className="category__name">의류</span>
            </Link>

            <Link href="/category/accessories" className="category__item">
              <div className="category__icon">
                <img
                  src="/assets/icons/accessories.svg"
                  alt="액세서리"
                  className="category__icon-image"
                />
              </div>
              <span className="category__name">액세서리</span>
            </Link>

            <Link href="/category/beauty" className="category__item">
              <div className="category__icon">
                <img
                  src="/assets/icons/beauty.svg"
                  alt="뷰티"
                  className="category__icon-image"
                />
              </div>
              <span className="category__name">뷰티</span>
            </Link>

            <Link href="/category/living" className="category__item">
              <div className="category__icon">
                <img
                  src="/assets/icons/living.svg"
                  alt="리빙"
                  className="category__icon-image"
                />
              </div>
              <span className="category__name">리빙</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 베스트셀러 섹션 */}
      <section className="section section--light">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">베스트셀러</h2>
            <Link href="/best-sellers" className="section__link">
              전체보기
            </Link>
          </div>

          <div className="bestseller-grid">
            <Link href="/product/4" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/assets/bestseller/bestseller4.svg"
                  alt="베스트셀러 4"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">퍼프 슬리브 블라우스</h3>
                <div className="bestseller__price">42,000원</div>
              </div>
            </Link>
            <Link href="/product/4" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/assets/bestseller/bestseller4.svg"
                  alt="베스트셀러 4"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">퍼프 슬리브 블라우스</h3>
                <div className="bestseller__price">42,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/assets/bestseller/bestseller4.svg"
                  alt="베스트셀러 4"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">퍼프 슬리브 블라우스</h3>
                <div className="bestseller__price">42,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/assets/bestseller/bestseller4.svg"
                  alt="베스트셀러 4"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">퍼프 슬리브 블라우스</h3>
                <div className="bestseller__price">42,000원</div>
              </div>
            </Link>

            <Link href="/product/5" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/assets/bestseller/bestseller5.svg"
                  alt="베스트셀러 5"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">플리츠 미니 스커트</h3>
                <div className="bestseller__price">38,000원</div>
              </div>
            </Link>

            <Link href="/product/3" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/assets/bestseller/bestseller6.svg"
                  alt="베스트셀러 6"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">오버사이즈 니트</h3>
                <div className="bestseller__price">56,000원</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 신상품 섹션 */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <h2 className="section__title">신상품</h2>
            <Link href="/new-products" className="section__link">
              전체보기
            </Link>
          </div>

          <div className="new-products-grid">
            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/assets/product1.svg"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">퍼프 슬리브 블라우스</h3>
                <div className="product-card__price">42,000원</div>
              </div>
            </Link>

            <Link href="/product/5" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/assets/product2.svg"
                  alt="신상품 2"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">플리츠 미니 스커트</h3>
                <div className="product-card__price">38,000원</div>
              </div>
            </Link>

            <Link href="/product/3" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/assets/product3.svg"
                  alt="신상품 3"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">오버사이즈 니트</h3>
                <div className="product-card__price">56,000원</div>
              </div>
            </Link>

            <Link href="/product/2" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/assets/product4.svg"
                  alt="신상품 4"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">스트라이프 셔츠</h3>
                <div className="product-card__price">48,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/assets/product1.svg"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">퍼프 슬리브 블라우스</h3>
                <div className="product-card__price">42,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/assets/product1.svg"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">퍼프 슬리브 블라우스</h3>
                <div className="product-card__price">42,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/assets/product1.svg"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">퍼프 슬리브 블라우스</h3>
                <div className="product-card__price">42,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/assets/product1.svg"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">퍼프 슬리브 블라우스</h3>
                <div className="product-card__price">42,000원</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
