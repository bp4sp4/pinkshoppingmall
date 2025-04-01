"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "../../styles/product-detail.css";

// 상품 데이터 인터페이스
interface ProductData {
  id: string;
  title: string;
  category: string;
  description: string;
  originalPrice: string;
  price: string;
  discount: string;
  images: string[];
  rating: number;
  reviewCount: number;
  sku: string;
  tags: string[];
  shipping: string;
  features?: string[];
  specifications?: { [key: string]: string };
}

// 상품 데이터 목록 (실제로는 API에서 가져올 데이터)
const productsData: { [key: string]: ProductData } = {
  "1": {
    id: "1",
    title: "플라워 패턴 블라우스",
    category: "clothing",
    description:
      "화사한 플라워 패턴이 돋보이는 블라우스입니다. 가볍고 시원한 소재로 제작되어 봄, 여름 시즌에 착용하기 좋습니다. 다양한 하의와 매치하여 스타일링하기 쉽습니다.",
    originalPrice: "59,000원",
    price: "45,000원",
    discount: "24% OFF",
    images: [
      "/products/flower-pattern.png",
      "/assets/bestseller2.svg",
      "/assets/bestseller3.svg",
      "/assets/bestseller/bestseller4.svg",
    ],
    rating: 4.5,
    reviewCount: 32,
    sku: "BL-2025-001",
    tags: ["플라워", "봄", "여름", "신상품"],
    shipping: "무료배송 (3일 이내 출고)",
    features: [
      "100% 폴리에스터 소재",
      "부드럽고 가벼운 착용감",
      "화사한 플라워 패턴",
      "여유있는 실루엣",
      "다양한 하의와 매치 가능",
    ],
    specifications: {
      소재: "폴리에스터 100%",
      색상: "화이트, 핑크, 블루",
      제조국: "한국",
      세탁방법: "드라이클리닝 권장",
      제조사: "핑크숍 어패럴",
    },
  },
  "2": {
    id: "2",
    title: "미니멀 크로스백",
    category: "accessories",
    description:
      "심플한 디자인의 미니멀 크로스백입니다. 실용적인 수납공간과 가벼운 무게로 데일리 아이템으로 활용하기 좋습니다. 다양한 스타일에 매치하기 쉬운 베이직한 디자인입니다.",
    originalPrice: "48,000원",
    price: "38,000원",
    discount: "21% OFF",
    images: [
      "/products/crossbag.png",
      "/assets/bestseller3.svg",
      "/assets/bestseller/bestseller4.svg",
      "/assets/bestseller/bestseller5.svg",
    ],
    rating: 4.7,
    reviewCount: 45,
    sku: "AC-2025-002",
    tags: ["미니멀", "크로스백", "데일리", "베스트"],
    shipping: "무료배송 (2일 이내 출고)",
    features: [
      "고급 합성 가죽 소재",
      "실용적인 수납공간",
      "조절 가능한 스트랩",
      "미니멀한 디자인",
      "다양한 스타일 매치 가능",
    ],
    specifications: {
      소재: "합성 가죽",
      색상: "블랙, 베이지, 브라운",
      크기: "20 x 15 x 7 cm",
      무게: "350g",
      제조국: "한국",
    },
  },
  "3": {
    id: "3",
    title: "와이드 데님 팬츠",
    category: "clothing",
    description:
      "편안한 착용감의 와이드 데님 팬츠입니다. 트렌디한 와이드 핏으로 다리가 길어 보이는 효과가 있습니다. 다양한 상의와 매치하여 캐주얼하게 스타일링할 수 있습니다.",
    originalPrice: "68,000원",
    price: "52,000원",
    discount: "24% OFF",
    images: [
      "/products/witepants.png",
      "/assets/bestseller/bestseller4.svg",
      "/assets/bestseller/bestseller5.svg",
      "/assets/bestseller/bestseller6.svg",
    ],
    rating: 4.3,
    reviewCount: 28,
    sku: "PT-2025-003",
    tags: ["데님", "와이드", "캐주얼", "베스트"],
    shipping: "무료배송 (3일 이내 출고)",
    features: [
      "고품질 데님 소재",
      "편안한 와이드 핏",
      "하이웨이스트 디자인",
      "다리가 길어 보이는 효과",
      "다양한 상의와 매치 가능",
    ],
    specifications: {
      소재: "면 98%, 스판덱스 2%",
      색상: "중청, 연청, 진청",
      제조국: "한국",
      세탁방법: "단독 세탁 권장",
      제조사: "핑크숍 어패럴",
    },
  },
  "4": {
    id: "4",
    title: "퍼프 슬리브 블라우스",
    category: "clothing",
    description:
      "여성스러운 퍼프 슬리브 디자인의 블라우스입니다. 부드러운 소재로 착용감이 좋으며, 다양한 하의와 매치하기 좋습니다. 오피스룩부터 데일리룩까지 활용도가 높은 아이템입니다.",
    originalPrice: "52,000원",
    price: "42,000원",
    discount: "19% OFF",
    images: [
      "/products/sleveblous.png",
      "/assets/bestseller1.svg",
      "/assets/bestseller2.svg",
      "/assets/bestseller3.svg",
    ],
    rating: 4.6,
    reviewCount: 22,
    sku: "BL-2025-004",
    tags: ["블라우스", "퍼프슬리브", "오피스룩", "신상품"],
    shipping: "무료배송 (2일 이내 출고)",
    features: [
      "부드러운 면 혼방 소재",
      "여성스러운 퍼프 슬리브",
      "세미 크롭 기장",
      "오피스룩, 데일리룩 활용 가능",
      "다양한 하의와 매치 가능",
    ],
    specifications: {
      소재: "면 80%, 폴리에스터 20%",
      색상: "화이트, 베이지, 블랙",
      제조국: "한국",
      세탁방법: "손세탁 권장",
      제조사: "핑크숍 어패럴",
    },
  },
  "5": {
    id: "5",
    title: "플리츠 미니 스커트",
    category: "clothing",
    description:
      "여성스러운 플리츠 디자인의 미니 스커트입니다. 가벼운 소재로 활동성이 좋으며, 다양한 상의와 매치하기 좋습니다. 봄, 여름 시즌에 착용하기 좋은 아이템입니다.",
    originalPrice: "46,000원",
    price: "38,000원",
    discount: "17% OFF",
    images: [
      "/products/miniscart.png",
      "/assets/bestseller2.svg",
      "/assets/bestseller3.svg",
      "/assets/bestseller/bestseller4.svg",
    ],
    rating: 4.4,
    reviewCount: 18,
    sku: "SK-2025-005",
    tags: ["스커트", "플리츠", "미니", "신상품"],
    shipping: "무료배송 (3일 이내 출고)",
    features: [
      "가벼운 폴리에스터 소재",
      "여성스러운 플리츠 디자인",
      "미니 기장",
      "편안한 신축성",
      "다양한 상의와 매치 가능",
    ],
    specifications: {
      소재: "폴리에스터 95%, 스판덱스 5%",
      색상: "블랙, 베이지, 핑크",
      제조국: "한국",
      세탁방법: "손세탁 권장",
      제조사: "핑크숍 어패럴",
    },
  },
  "6": {
    id: "6",
    title: "스트라이프 니트 풀오버",
    category: "clothing",
    description:
      "심플한 스트라이프 패턴의 니트 풀오버입니다. 부드러운 소재로 착용감이 우수하며, 데일리룩으로 활용하기 좋습니다. 다양한 하의와 매치하여 캐주얼하거나 세련된 스타일링이 가능합니다.",
    originalPrice: "62,000원",
    price: "48,000원",
    discount: "23% OFF",
    images: [
      "/products/stripe-knit.png",
      "/assets/bestseller3.svg",
      "/assets/bestseller/bestseller4.svg",
      "/assets/bestseller/bestseller5.svg",
    ],
    rating: 4.5,
    reviewCount: 30,
    sku: "KN-2025-006",
    tags: ["니트", "스트라이프", "데일리", "캐주얼"],
    shipping: "무료배송 (2일 이내 출고)",
    features: [
      "부드러운 아크릴 혼방 소재",
      "심플한 스트라이프 디자인",
      "편안한 오버핏 실루엣",
      "다양한 하의와 매치 가능",
      "데일리룩으로 활용도 높음",
    ],
    specifications: {
      소재: "아크릴 70%, 폴리에스터 30%",
      색상: "네이비, 그레이, 베이지",
      제조국: "한국",
      세탁방법: "손세탁 또는 드라이클리닝 권장",
      제조사: "핑크숍 어패럴",
    },
  },

  "7": {
    id: "7",
    title: "파스텔 플라워 원피스",
    category: "clothing",
    description:
      "봄 시즌에 어울리는 파스텔 톤의 플라워 패턴 원피스입니다. 가벼운 폴리에스터 소재로 제작되어 착용감이 우수하며, 여성스러운 실루엣을 연출할 수 있습니다.",
    originalPrice: "72,000원",
    price: "58,000원",
    discount: "19% OFF",
    images: [
      "/products/pastel-flower-dress.png",
      "/assets/spring1.svg",
      "/assets/spring2.svg",
      "/assets/spring3.svg",
    ],
    rating: 4.7,
    reviewCount: 35,
    sku: "OP-2025-006",
    tags: ["봄", "플라워", "원피스", "신상품"],
    shipping: "무료배송 (2일 이내 출고)",
    features: [
      "파스텔 플라워 패턴",
      "가벼운 폴리에스터 소재",
      "여성스러운 A라인 실루엣",
      "하이웨이스트 디자인",
      "봄 시즌 필수 아이템",
    ],
    specifications: {
      소재: "폴리에스터 100%",
      색상: "핑크, 라벤더, 민트",
      제조국: "한국",
      세탁방법: "드라이클리닝 권장",
      제조사: "핑크숍 어패럴",
    },
  },

  "8": {
    id: "8",
    title: "봄 시즌 린넨 자켓",
    category: "clothing",
    description:
      "봄철 가볍게 걸칠 수 있는 린넨 자켓입니다. 통기성이 뛰어난 린넨 소재로 제작되어 쾌적하게 착용할 수 있으며, 다양한 스타일링이 가능합니다.",
    originalPrice: "85,000원",
    price: "68,000원",
    discount: "20% OFF",
    images: [
      "/products/linen-jacket.png",
      "/assets/spring3.svg",
      "/assets/spring4.svg",
      "/assets/spring5.svg",
    ],
    rating: 4.5,
    reviewCount: 28,
    sku: "JK-2025-008",
    tags: ["봄", "린넨", "자켓", "데일리"],
    shipping: "무료배송 (3일 이내 출고)",
    features: [
      "통기성 린넨 소재",
      "심플하고 모던한 디자인",
      "레귤러 핏 실루엣",
      "봄철 필수 아이템",
      "다양한 하의와 매치 가능",
    ],
    specifications: {
      소재: "린넨 95%, 스판덱스 5%",
      색상: "베이지, 라이트그레이, 민트",
      제조국: "한국",
      세탁방법: "드라이클리닝 권장",
      제조사: "핑크숍 어패럴",
    },
  },
  "9": {
    id: "9",
    title: "봄맞이 캔버스 백",
    category: "accessories",
    description:
      "봄 시즌에 어울리는 화사한 캔버스 백입니다. 넉넉한 수납공간과 튼튼한 소재로 제작되어 데일리백으로 사용하기 좋습니다. 플라워 패턴 디테일로 포인트를 더했습니다.",
    originalPrice: "42,000원",
    price: "35,000원",
    discount: "17% OFF",
    images: [
      "/products/canvas-bag.png",
      "/assets/spring4.svg",
      "/assets/spring5.svg",
      "/assets/spring6.svg",
    ],
    rating: 4.4,
    reviewCount: 22,
    sku: "AC-2025-009",
    tags: ["봄", "캔버스", "백", "데일리"],
    shipping: "무료배송 (2일 이내 출고)",
    features: [
      "화사한 플라워 패턴",
      "튼튼한 캔버스 소재",
      "넉넉한 수납공간",
      "봄 시즌 포인트 아이템",
      "데일리백으로 활용도 높음",
    ],
    specifications: {
      소재: "면 100%",
      색상: "화이트, 핑크, 라벤더",
      크기: "30 x 25 x 15 cm",
      무게: "300g",
      제조국: "한국",
    },
  },
};

// 관련 상품 데이터
const relatedProducts = [
  {
    id: "2",
    title: "심플 셔츠 스커트",
    category: "하의",
    price: "42,000원",
    image: "/assets/product2.svg",
    rating: 4.7,
    reviewCount: 18,
  },
  {
    id: "3",
    title: "퍼프 대칭형 블라우스",
    category: "상의",
    price: "42,000원",
    image: "/assets/product1.svg",
    rating: 4.5,
    reviewCount: 15,
  },
  {
    id: "4",
    title: "케시미어 니트 가디건",
    category: "아우터",
    price: "68,000원",
    image: "/assets/product3.svg",
    rating: 4.8,
    reviewCount: 27,
  },
  {
    id: "5",
    title: "크리스탈 목걸이",
    category: "액세서리",
    price: "35,000원",
    image: "/assets/product4.svg",
    rating: 4.6,
    reviewCount: 23,
  },
];

// 클라이언트 컴포넌트에서는 useParams 훅을 사용하여 params에 접근
export default function ProductDetail() {
  // useParams 훅을 사용하여 URL 파라미터에 접근
  const params = useParams();
  const productId = params?.id as string;

  const [product, setProduct] = useState<ProductData | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("description");
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number>(1);

  useEffect(() => {
    // 실제 환경에서는 API 호출로 대체
    if (productId) {
      const productData = productsData[productId];
      if (productData) {
        setProduct(productData);
        setMainImage(productData.images[0]);
      }
    }
  }, [productId]);

  if (!product) {
    return <div className="container">상품을 찾을 수 없습니다.</div>;
  }

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
  };

  const handleSizeSelect = (index: number) => {
    setSelectedSize(index);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span
          key={`star-${i}`}
          className="product-detail__star product-detail__star--filled"
        >
          ★
        </span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span
          key="half-star"
          className="product-detail__star product-detail__star--half"
        >
          ★
        </span>
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <span key={`empty-star-${i}`} className="product-detail__star">
          ★
        </span>
      );
    }

    return stars;
  };

  const colorOptions = [
    { color: "#FFFFFF", name: "화이트" },
    { color: "#FFD1DC", name: "핑크" },
    { color: "#ADD8E6", name: "블루" },
  ];

  const sizeOptions = ["S", "M", "L", "XL"];

  return (
    <section className="section product-detail">
      <div className="container">
        {/* 상품 경로 */}
        <div className="product-detail__breadcrumb">
          <Link href="/" className="product-detail__breadcrumb-link">
            홈
          </Link>
          <span className="product-detail__breadcrumb-separator">/</span>
          <Link
            href={`/category/${product.category.toLowerCase()}`}
            className="product-detail__breadcrumb-link"
          >
            {product.category}
          </Link>
          <span className="product-detail__breadcrumb-separator">/</span>
          <span className="product-detail__breadcrumb-current">
            {product.title}
          </span>
        </div>

        <div className="product-detail__container">
          {/* 상품 이미지 갤러리 */}
          <div className="product-detail__gallery">
            <div className="product-detail__main-image-container">
              <img
                src={mainImage}
                alt={product.title}
                className="product-detail__main-image"
                id="main-product-image"
              />
              <div className="product-detail__zoom-icon">
                <i className="fas fa-search-plus"></i>
              </div>
            </div>
            <div className="product-detail__thumbnails">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`product-detail__thumbnail-item ${
                    mainImage === image
                      ? "product-detail__thumbnail-item--active"
                      : ""
                  }`}
                  onClick={() => handleThumbnailClick(image)}
                >
                  <img
                    src={image}
                    alt={`썸네일 ${index + 1}`}
                    className="product-detail__thumbnail"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 상품 정보 */}
          <div className="product-detail__info">
            <div className="product-detail__header">
              <h1 className="product-detail__title">{product.title}</h1>
              <div className="product-detail__rating">
                <div className="product-detail__stars">
                  {renderStars(product.rating)}
                </div>
                <span className="product-detail__review-count">
                  ({product.reviewCount} 리뷰)
                </span>
              </div>
            </div>

            <div className="product-detail__price-container">
              <span className="product-detail__original-price">
                {product.originalPrice}
              </span>
              <span className="product-detail__price">{product.price}</span>
              <span className="product-detail__discount-badge">
                {product.discount}
              </span>
            </div>

            <div className="product-detail__description">
              <p>{product.description}</p>
            </div>

            <div className="product-detail__options">
              <div className="product-detail__option">
                <label className="product-detail__option-label">색상</label>
                <div className="product-detail__color-options">
                  {colorOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`product-detail__color-option ${
                        selectedColor === index
                          ? "product-detail__color-option--selected"
                          : ""
                      }`}
                      style={{ backgroundColor: option.color }}
                      onClick={() => handleColorSelect(index)}
                      title={option.name}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="product-detail__option">
                <label className="product-detail__option-label">사이즈</label>
                <div className="product-detail__size-options">
                  {sizeOptions.map((size, index) => (
                    <div
                      key={index}
                      className={`product-detail__size-option ${
                        selectedSize === index
                          ? "product-detail__size-option--selected"
                          : ""
                      }`}
                      onClick={() => handleSizeSelect(index)}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>

              <div className="product-detail__option">
                <label className="product-detail__option-label">수량</label>
                <div className="product-detail__quantity">
                  <button
                    className="product-detail__quantity-btn product-detail__quantity-btn--minus"
                    onClick={() => handleQuantityChange(quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    className="product-detail__quantity-input"
                    onChange={(e) =>
                      handleQuantityChange(parseInt(e.target.value) || 1)
                    }
                  />
                  <button
                    className="product-detail__quantity-btn product-detail__quantity-btn--plus"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="product-detail__actions">
              <button className="button button--primary product-detail__button">
                <i className="fas fa-shopping-cart"></i> 장바구니에 추가
              </button>
              <button className="button button--secondary product-detail__button">
                <i className="fas fa-heart"></i> 위시리스트에 추가
              </button>
            </div>

            <div className="product-detail__meta">
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">SKU:</span>
                <span className="product-detail__meta-value">
                  {product.sku}
                </span>
              </div>
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">카테고리:</span>
                <span className="product-detail__meta-value">
                  {product.category}
                </span>
              </div>
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">배송:</span>
                <span className="product-detail__meta-value">
                  {product.shipping}
                </span>
              </div>
              <div className="product-detail__meta-item">
                <span className="product-detail__meta-label">태그:</span>
                <div className="product-detail__tags">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="product-detail__tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 상품 탭 */}
        <div className="product-detail__tabs">
          <div className="product-detail__tab-buttons">
            <div
              className={`product-detail__tab-button ${
                activeTab === "description"
                  ? "product-detail__tab-button--active"
                  : ""
              }`}
              onClick={() => handleTabChange("description")}
            >
              상품 설명
            </div>
            <div
              className={`product-detail__tab-button ${
                activeTab === "specifications"
                  ? "product-detail__tab-button--active"
                  : ""
              }`}
              onClick={() => handleTabChange("specifications")}
            >
              상세 정보
            </div>
            <div
              className={`product-detail__tab-button ${
                activeTab === "reviews"
                  ? "product-detail__tab-button--active"
                  : ""
              }`}
              onClick={() => handleTabChange("reviews")}
            >
              리뷰 ({product.reviewCount})
            </div>
            <div
              className={`product-detail__tab-button ${
                activeTab === "shipping"
                  ? "product-detail__tab-button--active"
                  : ""
              }`}
              onClick={() => handleTabChange("shipping")}
            >
              배송 및 교환
            </div>
          </div>

          <div
            className={`product-detail__tab-content ${
              activeTab === "description"
                ? "product-detail__tab-content--active"
                : ""
            }`}
          >
            <p>{product.description}</p>
            <h4>상품 특징</h4>
            <ul>
              {product.features?.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div
            className={`product-detail__tab-content ${
              activeTab === "specifications"
                ? "product-detail__tab-content--active"
                : ""
            }`}
          >
            <h4>상품 스펙</h4>
            <ul>
              {product.specifications &&
                Object.entries(product.specifications).map(
                  ([key, value], index) => (
                    <li key={index}>
                      <strong>{key}:</strong> {value}
                    </li>
                  )
                )}
            </ul>
          </div>

          <div
            className={`product-detail__tab-content ${
              activeTab === "reviews"
                ? "product-detail__tab-content--active"
                : ""
            }`}
          >
            <p>이 상품에 대한 {product.reviewCount}개의 리뷰가 있습니다.</p>
            <p>평균 평점: {product.rating}/5</p>
            <p>리뷰 내용은 준비 중입니다.</p>
          </div>

          <div
            className={`product-detail__tab-content ${
              activeTab === "shipping"
                ? "product-detail__tab-content--active"
                : ""
            }`}
          >
            <h4>배송 정보</h4>
            <p>- 배송 방법: 택배</p>
            <p>- 배송 지역: 전국</p>
            <p>- 배송 비용: 무료</p>
            <p>- 배송 기간: 결제 완료 후 2-3일 이내 출고</p>

            <h4>교환 및 반품 정보</h4>
            <p>- 교환/반품 신청 기간: 상품 수령 후 7일 이내</p>
            <p>- 교환/반품 배송비: 단순 변심의 경우 고객 부담</p>
            <p>
              - 교환/반품 불가 사유: 고객의 책임 있는 사유로 상품이 훼손된 경우,
              상품 수령 후 7일이 경과한 경우
            </p>
          </div>
        </div>

        {/* 관련 상품 */}
        <div className="product-detail__related">
          <h2 className="product-detail__related-title">관련 상품</h2>
          <div className="product-detail__related-products">
            {relatedProducts.map((relatedProduct, index) => (
              <div key={index} className="product-detail__related-product">
                <Link
                  href={`/product/${relatedProduct.id}`}
                  className="product-detail__related-product-link"
                >
                  <div className="product-detail__related-product-image-container">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="product-detail__related-product-image"
                    />
                  </div>
                  <h3 className="product-detail__related-product-title">
                    {relatedProduct.title}
                  </h3>
                  <div className="product-detail__related-product-category">
                    {relatedProduct.category}
                  </div>
                  <div className="product-detail__related-product-price">
                    {relatedProduct.price}
                  </div>
                  <div className="product-detail__related-product-rating">
                    {renderStars(relatedProduct.rating)}
                    <span className="product-detail__related-product-review-count">
                      ({relatedProduct.reviewCount})
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
