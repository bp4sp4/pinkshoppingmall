"use client";
import { useState, useEffect } from "react";

// 시즌별/트렌드 추천 상품 인터페이스
interface TrendProduct {
  id: string;
  title: string;
  image: string;
  price: string;
  category: string;
  badge?: string; // 'NEW', 'HOT', 'SALE' 등의 배지
  discount?: string; // 할인율 (예: '20%')
}

// 시즌 정보 인터페이스
interface SeasonInfo {
  months: any;
  id: string;
  name: string;
  description: string;
  image: string;
  theme: string; // CSS 테마 색상
}

export default function SeasonalTrendSection() {
  // 상태 관리
  const [currentSeason, setCurrentSeason] = useState<SeasonInfo | null>(null);
  const [trendProducts, setTrendProducts] = useState<TrendProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("season"); // 'season' 또는 'trend'
  const [showProducts, setShowProducts] = useState(false);

  // 컴포넌트 마운트 시 시즌 정보 및 트렌드 상품 로드
  useEffect(() => {
    // 현재 시즌 결정 (월별)
    const determineCurrentSeason = () => {
      const now = new Date();
      const month = now.getMonth() + 1; // 0-11에서 1-12로 변환

      // 계절별 시즌 정보
      const seasons = [
        {
          id: "spring",
          name: "봄 시즌",
          description: "가벼운 옷차림으로 산뜻하게 시작하는 봄",
          image: "/seasons/spring.jpg",
          theme: "#f8b195",
          months: [3, 4, 5],
        },
        {
          id: "summer",
          name: "여름 컬렉션",
          description: "시원하고 스타일리시한 여름 아이템",
          image: "/seasons/summer.jpg",
          theme: "#5fb3b3",
          months: [6, 7, 8],
        },
        {
          id: "fall",
          name: "가을 스타일",
          description: "차분하고 따뜻한 가을 패션",
          image: "/seasons/fall.jpg",
          theme: "#d68060",
          months: [9, 10, 11],
        },
        {
          id: "winter",
          name: "겨울 특별전",
          description: "포근하고 세련된 겨울 아이템",
          image: "/seasons/winter.jpg",
          theme: "#546a7b",
          months: [12, 1, 2],
        },
      ];

      // 현재 월에 해당하는 시즌 찾기
      const currentSeason =
        seasons.find((season) => season.months.includes(month)) || seasons[0];
      return currentSeason;
    };

    // 시즌 정보 로드
    const loadSeasonInfo = () => {
      setIsLoading(true);

      // 현재 시즌 결정
      const season = determineCurrentSeason();
      setCurrentSeason(season);

      // 시즌별 추천 상품 로드 (실제로는 API 호출)
      // 여기서는 더미 데이터 사용
      setTimeout(() => {
        const seasonalProducts: TrendProduct[] = [
          {
            id: "s1",
            title: "시즌 특별 블라우스",
            image: "/products/seasonal1.jpg",
            price: "39,000원",
            category: "clothing",
            badge: "NEW",
          },
          {
            id: "s2",
            title: "시그니처 시즌 원피스",
            image: "/products/seasonal2.jpg",
            price: "58,000원",
            category: "clothing",
            badge: "HOT",
          },
          {
            id: "s3",
            title: "시즌 컬러 니트",
            image: "/products/seasonal3.jpg",
            price: "42,000원",
            category: "clothing",
            discount: "15%",
          },
          {
            id: "s4",
            title: "시즌 패턴 스커트",
            image: "/products/seasonal4.jpg",
            price: "36,000원",
            category: "clothing",
          },
        ];

        const trendingProducts: TrendProduct[] = [
          {
            id: "t1",
            title: "트렌디 오버사이즈 셔츠",
            image: "/products/trend1.jpg",
            price: "45,000원",
            category: "clothing",
            badge: "TREND",
          },
          {
            id: "t2",
            title: "인기 크롭 자켓",
            image: "/products/trend2.jpg",
            price: "68,000원",
            category: "clothing",
            badge: "HOT",
          },
          {
            id: "t3",
            title: "트렌드 와이드 팬츠",
            image: "/products/trend3.jpg",
            price: "52,000원",
            category: "clothing",
          },
          {
            id: "t4",
            title: "스트릿 스타일 후드",
            image: "/products/trend4.jpg",
            price: "49,000원",
            category: "clothing",
            discount: "20%",
          },
        ];

        // 활성 탭에 따라 상품 설정
        setTrendProducts(
          activeTab === "season" ? seasonalProducts : trendingProducts
        );
        setIsLoading(false);

        // 애니메이션 효과를 위한 지연
        setTimeout(() => {
          setShowProducts(true);
        }, 300);
      }, 1000);
    };

    loadSeasonInfo();
  }, [activeTab]);

  // 탭 변경 처리
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    setShowProducts(false);
    setTimeout(() => {
      setActiveTab(tab);
      setIsLoading(true);
    }, 300);
  };

  // 현재 날짜 기반 특별 이벤트 체크
  const getSpecialEvent = () => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // 특별 이벤트 날짜 (예시)
    const specialEvents = [
      { month: 1, day: 1, name: "새해 특별전" },
      { month: 2, day: 14, name: "발렌타인 컬렉션" },
      { month: 3, day: 8, name: "봄맞이 특가" },
      { month: 5, day: 5, name: "어린이날 특집" },
      { month: 5, day: 8, name: "어버이날 선물전" },
      { month: 12, day: 25, name: "크리스마스 특별전" },
    ];

    // 오늘 날짜에 해당하는 특별 이벤트 찾기
    const todayEvent = specialEvents.find(
      (event) => event.month === month && event.day === day
    );

    // 이벤트가 없으면 시즌 기반 이벤트 제안
    if (!todayEvent && currentSeason) {
      if (month === currentSeason.months[0]) {
        return `${currentSeason.name} 신상품 입고!`;
      } else if (
        month === currentSeason.months[currentSeason.months.length - 1]
      ) {
        return `${currentSeason.name} 마지막 찬스!`;
      }
    }

    return todayEvent ? todayEvent.name : null;
  };

  // 동적 스타일 계산
  const getSectionStyle = () => {
    if (!currentSeason) return {};

    return {
      "--theme-color": currentSeason.theme,
      "--theme-color-light": `${currentSeason.theme}33`, // 알파값 추가
    } as React.CSSProperties;
  };

  return (
    <section className="seasonal-trend-section" style={getSectionStyle()}>
      {/* 시즌 헤더 */}
      <div className="container">
        {currentSeason && (
          <div
            className="seasonal-header"
            style={{ backgroundImage: `url(${currentSeason.image})` }}
          >
            <div className="seasonal-header__content">
              <h2 className="seasonal-header__title">{currentSeason.name}</h2>
              <p className="seasonal-header__description">
                {currentSeason.description}
              </p>

              {/* 특별 이벤트 배지 */}
              {getSpecialEvent() && (
                <div className="seasonal-header__event-badge">
                  {getSpecialEvent()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 탭 네비게이션 */}
        <div className="seasonal-tabs">
          <button
            className={`seasonal-tabs__button ${
              activeTab === "season" ? "seasonal-tabs__button--active" : ""
            }`}
            onClick={() => handleTabChange("season")}
          >
            시즌 추천
          </button>
          <button
            className={`seasonal-tabs__button ${
              activeTab === "trend" ? "seasonal-tabs__button--active" : ""
            }`}
            onClick={() => handleTabChange("trend")}
          >
            트렌드 아이템
          </button>
        </div>

        {/* 상품 그리드 */}
        <div className="seasonal-products">
          {isLoading ? (
            <div className="seasonal-loading">
              <div className="seasonal-loading__spinner"></div>
              <p>추천 상품을 불러오는 중...</p>
            </div>
          ) : (
            <div
              className={`seasonal-grid ${
                showProducts ? "seasonal-grid--visible" : ""
              }`}
            >
              {trendProducts.map((product) => (
                <div key={product.id} className="seasonal-product-card">
                  {/* 배지 표시 */}
                  {product.badge && (
                    <span
                      className={`seasonal-product-card__badge seasonal-product-card__badge--${product.badge.toLowerCase()}`}
                    >
                      {product.badge}
                    </span>
                  )}

                  {/* 할인율 표시 */}
                  {product.discount && (
                    <span className="seasonal-product-card__discount">
                      {product.discount}
                    </span>
                  )}

                  <div className="seasonal-product-card__image-container">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="seasonal-product-card__image"
                    />
                  </div>
                  <div className="seasonal-product-card__content">
                    <h3 className="seasonal-product-card__title">
                      {product.title}
                    </h3>
                    <p className="seasonal-product-card__price">
                      {product.price}
                    </p>
                  </div>
                  <button className="seasonal-product-card__button">
                    장바구니에 담기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 시즌 푸터 - 더 많은 상품 보기 */}
        <div className="seasonal-footer">
          <button className="seasonal-footer__button">
            {activeTab === "season" ? "시즌 상품 더보기" : "트렌드 상품 더보기"}
          </button>
        </div>
      </div>
    </section>
  );
}
