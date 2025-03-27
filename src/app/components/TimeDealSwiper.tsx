"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TimeDealItem {
  id: number;
  image: string;
  title: string;
  originalPrice: string;
  discountPrice: string;
  remainingTime: string; // 초기 시간 형식 (HH:MM:SS)
}

// 시간 문자열을 초로 변환하는 함수
const timeStringToSeconds = (timeString: string) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

// 초를 시간 문자열로 변환하는 함수
const secondsToTimeString = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const timeDealItems: TimeDealItem[] = [
  {
    id: 1,
    image: "/products/swatzipup.png",
    title: "스웻 후드 집업",
    originalPrice: "45,000원",
    discountPrice: "29,000원",
    remainingTime: "02:45:10",
  },
  {
    id: 2,
    image: "/products/blous.png",
    title: "실크 블라우스",
    originalPrice: "65,000원",
    discountPrice: "42,000원",
    remainingTime: "08:12:33",
  },
  {
    id: 3,
    image: "/products/cashneat.png",
    title: "캐시미어 니트",
    originalPrice: "78,000원",
    discountPrice: "49,000원",
    remainingTime: "03:59:59",
  },
  {
    id: 4,
    image: "/products/denypants.png",
    title: "데님 와이드 팬츠",
    originalPrice: "68,000원",
    discountPrice: "45,000원",
    remainingTime: "01:30:22",
  },
  {
    id: 5,
    image: "/products/croshegadigun.png",
    title: "크로셰 니트 가디건",
    originalPrice: "72,000원",
    discountPrice: "48,000원",
    remainingTime: "04:15:30",
  },

  {
    id: 6,
    image: "/products/flowerchunjakey.png",
    title: "크로셰 니트 가디건",
    originalPrice: "100,000원",
    discountPrice: "69,000원",
    remainingTime: "04:15:30",
  },
];

export default function TimeDealSwiper() {
  // 각 타임딜 아이템의 남은 시간을 초 단위로 관리하는 상태
  const [remainingSeconds, setRemainingSeconds] = useState(
    timeDealItems.map((item) => timeStringToSeconds(item.remainingTime))
  );

  // 타이머 효과
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prevSeconds) =>
        prevSeconds.map((seconds) => (seconds > 0 ? seconds - 1 : 0))
      );
    }, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section section--light">
      <div className="container">
        <div className="section__header">
          <div className="section__title-container">
            <h2 className="section__title">오늘의 타임딜</h2>
            <div className="timedeal-swiper__navigation">
              <div className="swiper-button-prev timedeal-swiper__button-prev"></div>
              <div className="swiper-button-next timedeal-swiper__button-next"></div>
            </div>
          </div>
          <Link href="/time-deals" className="section__link">
            전체보기
          </Link>
        </div>

        <div className="timedeal-swiper">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".timedeal-swiper__button-next",
              prevEl: ".timedeal-swiper__button-prev",
            }}
            pagination={{
              el: ".timedeal-swiper__pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {timeDealItems.map((item, index) => (
              <SwiperSlide key={item.id}>
                <Link href={`/product/${item.id}`} className="timedeal__link">
                  <div className="timedeal__card">
                    <div className="timedeal__badge">TIME DEAL</div>
                    <div className="timedeal__image-container">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="timedeal__image"
                      />
                    </div>
                    <div className="timedeal__content">
                      <div className="timedeal__timer">
                        <span className="timedeal__timer-text">남은 시간:</span>
                        <span
                          className={`timedeal__timer-value ${
                            remainingSeconds[index] < 3600
                              ? "timedeal__timer-value--urgent"
                              : ""
                          }`}
                        >
                          {secondsToTimeString(remainingSeconds[index])}
                        </span>
                      </div>
                      <h3 className="timedeal__title">{item.title}</h3>
                      <div className="timedeal__price">
                        <span className="timedeal__price-original">
                          {item.originalPrice}
                        </span>
                        <span className="timedeal__price-discount">
                          {item.discountPrice}
                        </span>
                      </div>
                      <button
                        className="button button--primary timedeal__button"
                        onClick={(e) => {
                          e.preventDefault(); // 버튼 클릭 시 링크 이벤트 방지
                          // 여기에 장바구니 추가 등의 기능을 구현할 수 있습니다
                        }}
                        disabled={remainingSeconds[index] <= 0}
                      >
                        {remainingSeconds[index] > 0 ? "구매하기" : "종료됨"}
                      </button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="swiper-pagination timedeal-swiper__pagination"></div>
        </div>
      </div>
    </section>
  );
}
