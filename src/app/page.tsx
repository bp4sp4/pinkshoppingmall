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
                  src="/products/trenzkcoat.png"
                  alt="베스트셀러 4"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">루즈핏 레더 트렌치 코트</h3>
                <div className="bestseller__price">150,000원</div>
                <button className="button button--primary timedeal__button">
                  구메하기
                </button>
              </div>
            </Link>
            <Link href="/product/4" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/products/twobuttonjaket.png"
                  alt="베스트셀러 4"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">투버튼 썸머 폴리 자켓</h3>
                <div className="bestseller__price">27,000원</div>
                <button className="button button--primary timedeal__button">
                  구메하기
                </button>
              </div>
            </Link>

            <Link href="/product/4" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/products/twobuttonneat.png"
                  alt="베스트셀러 4"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">니트 칼라 버튼 가디건</h3>
                <div className="bestseller__price">39,000원</div>
                <button className="button button--primary timedeal__button">
                  구메하기
                </button>
              </div>
            </Link>

            <Link href="/product/4" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/products/nashetopseat.png"
                  alt="베스트셀러 4"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">잇미샤 나시탑 세트 가디건</h3>
                <div className="bestseller__price">101,000원</div>
                <button className="button button--primary timedeal__button">
                  구메하기
                </button>
              </div>
            </Link>

            <Link href="/product/5" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/products/nobllea.png"
                  alt="베스트셀러 5"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">노벨라 슬림 라인 티</h3>
                <div className="bestseller__price">38,000원</div>
                <button className="button button--primary timedeal__button">
                  구메하기
                </button>
              </div>
            </Link>

            <Link href="/product/3" className="bestseller__card">
              <div className="bestseller__badge">BEST</div>
              <div className="bestseller__image-container">
                <img
                  src="/products/paddingjaket.png"
                  alt="베스트셀러 6"
                  className="bestseller__image"
                />
              </div>
              <div className="bestseller__content">
                <h3 className="bestseller__title">퀼팅 여성 경량 패딩 자켓</h3>
                <div className="bestseller__price">67,000원</div>
                <button className="button button--primary timedeal__button">
                  구메하기
                </button>
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
                  src="/products/nagrangt.png"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">롱슬리브 블랙</h3>
                <div className="product-card__price">28,000원</div>
              </div>
            </Link>

            <Link href="/product/5" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/products/uneckt.png"
                  alt="신상품 2"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">
                  베이직 텐셀 슬리브 티셔츠
                </h3>
                <div className="product-card__price">14,900원</div>
              </div>
            </Link>

            <Link href="/product/3" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/products/basictencel.png"
                  alt="신상품 3"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">
                  베이직 텐셀 슬리브 티셔츠
                </h3>
                <div className="product-card__price">24,000원</div>
              </div>
            </Link>

            <Link href="/product/2" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/products/puplespritet.png"
                  alt="신상품 4"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">
                  스트라이프 롱 슬리브 퍼플티
                </h3>
                <div className="product-card__price">48,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/products/grapyblous.png"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">
                  레글런 레이스 배색 루즈핏
                </h3>
                <div className="product-card__price">42,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/products/croshegadigun.png"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">체리 진주 가디건</h3>
                <div className="product-card__price">21,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/products/square.png"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">
                  여성 긴팔 스퀘어넥 쉬폰 상의
                </h3>
                <div className="product-card__price">19,000원</div>
              </div>
            </Link>

            <Link href="/product/4" className="product-card">
              <div className="product-card__image-container">
                <img
                  src="/products/blousstrap.png"
                  alt="신상품 1"
                  className="product-card__image"
                />
              </div>
              <div className="product-card__content">
                <h3 className="product-card__title">셔츠 롱 원피스</h3>
                <div className="product-card__price">34,000원</div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
