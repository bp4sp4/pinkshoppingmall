"use client";
import { useState, useEffect } from "react";

// 개인화 추천 시스템 인터페이스
interface RecommendedProduct {
  id: string;
  title: string;
  image: string;
  price: string;
  category: string;
}

// 사용자 활동 기록 인터페이스
interface UserActivity {
  viewedProducts: string[];
  searchTerms: string[];
  categories: { [key: string]: number };
  lastVisit: Date | null;
}

export default function PersonalizationSystem() {
  // 사용자 활동 상태 관리
  const [userActivity, setUserActivity] = useState<UserActivity>({
    viewedProducts: [],
    searchTerms: [],
    categories: {},
    lastVisit: null,
  });

  // 추천 상품 상태 관리
  const [recommendedProducts, setRecommendedProducts] = useState<
    RecommendedProduct[]
  >([]);

  // 로딩 및 애니메이션 상태
  const [isLoading, setIsLoading] = useState(true);
  const [showRecommendations, setShowRecommendations] = useState(false);

  // 컴포넌트 마운트 시 사용자 활동 데이터 로드
  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 체크
    if (typeof window === "undefined") return;

    // 로컬 스토리지에서 사용자 활동 데이터 로드
    const loadUserActivity = () => {
      try {
        const savedActivity = localStorage.getItem("userActivity");
        let parsedActivity = null;

        if (savedActivity) {
          parsedActivity = JSON.parse(savedActivity);
          // 날짜 문자열을 Date 객체로 변환
          if (parsedActivity.lastVisit) {
            parsedActivity.lastVisit = new Date(parsedActivity.lastVisit);
          }

          // 필수 속성이 없는 경우 기본값 설정
          if (!parsedActivity.viewedProducts)
            parsedActivity.viewedProducts = [];
          if (!parsedActivity.searchTerms) parsedActivity.searchTerms = [];
          if (!parsedActivity.categories) parsedActivity.categories = {};

          setUserActivity(parsedActivity);
        }

        // 현재 방문 시간 기록
        const updatedActivity = {
          ...(parsedActivity || userActivity),
          lastVisit: new Date(),
        };
        localStorage.setItem("userActivity", JSON.stringify(updatedActivity));
        setUserActivity(updatedActivity);
      } catch (error) {
        console.error("Error loading user activity:", error);
        // 오류 발생 시 기본 상태 유지
      }
    };

    loadUserActivity();
    generateRecommendations();
  }, []);

  // 사용자 활동 기반 추천 상품 생성
  const generateRecommendations = () => {
    setIsLoading(true);

    // 실제 구현에서는 API 호출을 통해 추천 상품을 가져올 수 있음
    // 여기서는 더미 데이터로 대체
    setTimeout(() => {
      const dummyRecommendations: RecommendedProduct[] = [
        {
          id: "1",
          title: "베이직 텐셀 슬리브 티셔츠",
          image: "/products/basictencel.png",
          price: "24,000원",
          category: "clothing",
        },
        {
          id: "2",
          title: "스트라이프 롱 슬리브 퍼플티",
          image: "/products/puplespritet.png",
          price: "48,000원",
          category: "clothing",
        },
        {
          id: "3",
          title: "롱슬리브 블랙",
          image: "/products/nagrangt.png",
          price: "28,000원",
          category: "clothing",
        },
        {
          id: "4",
          title: "체리 진주 가디건",
          image: "/products/croshegadigun.png",
          price: "21,000원",
          category: "clothing",
        },
      ];

      setRecommendedProducts(dummyRecommendations);
      setIsLoading(false);

      // 애니메이션 효과를 위해 약간의 지연 후 표시
      setTimeout(() => {
        setShowRecommendations(true);
      }, 300);
    }, 1000);
  };

  // 제품 조회 기록
  const trackProductView = (productId: string, category: string) => {
    const updatedActivity = { ...userActivity };

    // 최근 본 상품 목록 업데이트 (최대 10개 유지)
    if (!updatedActivity.viewedProducts.includes(productId)) {
      updatedActivity.viewedProducts = [
        productId,
        ...updatedActivity.viewedProducts.slice(0, 9),
      ];
    }

    // 카테고리 관심도 업데이트
    updatedActivity.categories[category] =
      (updatedActivity.categories[category] || 0) + 1;

    // 로컬 스토리지에 저장
    localStorage.setItem("userActivity", JSON.stringify(updatedActivity));
    setUserActivity(updatedActivity);
  };

  // 검색어 기록
  const trackSearchTerm = (term: string) => {
    const updatedActivity = { ...userActivity };

    // 최근 검색어 목록 업데이트 (최대 10개 유지)
    if (!updatedActivity.searchTerms.includes(term)) {
      updatedActivity.searchTerms = [
        term,
        ...updatedActivity.searchTerms.slice(0, 9),
      ];
    }

    // 로컬 스토리지에 저장
    localStorage.setItem("userActivity", JSON.stringify(updatedActivity));
    setUserActivity(updatedActivity);
  };

  // 환영 메시지 생성 (시간대 및 재방문 여부에 따라 다른 메시지)
  const getWelcomeMessage = () => {
    const now = new Date();
    const hour = now.getHours();
    const isReturningUser = userActivity.lastVisit !== null;

    let timeGreeting = "";
    if (hour >= 5 && hour < 12) {
      timeGreeting = "좋은 아침이에요";
    } else if (hour >= 12 && hour < 18) {
      timeGreeting = "좋은 오후예요";
    } else {
      timeGreeting = "좋은 저녁이에요";
    }

    if (isReturningUser) {
      const lastVisit = userActivity.lastVisit as Date;
      const daysSinceLastVisit = Math.floor(
        (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceLastVisit === 0) {
        return `다시 찾아주셔서 감사합니다! ${timeGreeting}!`;
      } else if (daysSinceLastVisit === 1) {
        return `어제 방문 이후 새로운 상품이 추가되었어요. ${timeGreeting}!`;
      } else {
        return `${daysSinceLastVisit}일 만이네요! 돌아오신 것을 환영합니다. ${timeGreeting}!`;
      }
    } else {
      return `핑크숍에 오신 것을 환영합니다! ${timeGreeting}!`;
    }
  };

  // 안전하게 배열 길이 확인
  const safeArrayLength = (arr: any[] | undefined | null) => {
    return arr && Array.isArray(arr) ? arr.length : 0;
  };

  return (
    <div className="personalization-container">
      {/* 개인화된 환영 메시지 */}
      <div className="welcome-banner">
        <h2 className="welcome-banner__title">{getWelcomeMessage()}</h2>
        <p className="welcome-banner__subtitle">
          {safeArrayLength(userActivity?.viewedProducts) > 0
            ? "회원님의 취향에 맞는 상품을 준비했어요."
            : "다양한 상품을 둘러보세요."}
        </p>
      </div>

      {/* 개인화된 상품 추천 섹션 */}
      <div className="personalized-recommendations">
        <h3 className="personalized-recommendations__title">
          <span className="personalized-recommendations__icon">✨</span>
          회원님을 위한 추천 상품
        </h3>

        {isLoading ? (
          <div className="recommendations-loading">
            <div className="recommendations-loading__spinner"></div>
            <p>맞춤 상품을 불러오는 중...</p>
          </div>
        ) : (
          <div
            className={`recommendations-grid ${
              showRecommendations ? "recommendations-grid--visible" : ""
            }`}
          >
            {recommendedProducts &&
              recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="recommendation-card"
                  onClick={() => trackProductView(product.id, product.category)}
                >
                  <div className="recommendation-card__image-container">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="recommendation-card__image"
                    />
                  </div>
                  <div className="recommendation-card__content">
                    <h4 className="recommendation-card__title">
                      {product.title}
                    </h4>
                    <p className="recommendation-card__price">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* 최근 본 상품 섹션 */}
      {safeArrayLength(userActivity?.viewedProducts) > 0 && (
        <div className="recently-viewed">
          <h3 className="recently-viewed__title">
            <span className="recently-viewed__icon">👁️</span>
            최근 본 상품
          </h3>
          <div className="recently-viewed__list">
            {/* 실제 구현에서는 API를 통해 상품 정보를 가져와야 함 */}
            {/* 여기서는 더미 데이터로 대체 */}
            {recommendedProducts &&
              recommendedProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="recently-viewed__item"
                  onClick={() => trackProductView(product.id, product.category)}
                >
                  <div className="recently-viewed__image-container">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="recently-viewed__image"
                    />
                  </div>
                  <div className="recently-viewed__content">
                    <h4 className="recently-viewed__item-title">
                      {product.title}
                    </h4>
                    <p className="recently-viewed__item-price">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 검색 기록 기반 추천 검색어 */}
      {safeArrayLength(userActivity?.searchTerms) > 0 && (
        <div className="search-suggestions">
          <h3 className="search-suggestions__title">
            <span className="search-suggestions__icon">🔍</span>
            추천 검색어
          </h3>
          <div className="search-suggestions__list">
            {userActivity.searchTerms.slice(0, 5).map((term, index) => (
              <button
                key={index}
                className="search-suggestions__item"
                onClick={() => trackSearchTerm(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
