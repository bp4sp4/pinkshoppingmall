'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface BannerItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundColor: string;
}

const bannerItems: BannerItem[] = [
  {
    id: 1,
    image: '/assets/main-banner.svg',
    title: '봄 신상 컬렉션',
    subtitle: '화사한 봄을 위한 특별한 아이템을 만나보세요',
    buttonText: '지금 쇼핑하기',
    buttonLink: '/new-products',
    backgroundColor: '#FFF5F7'
  },
  {
    id: 2,
    image: '/assets/bestseller/bestseller1.svg',
    title: '베스트셀러 모음',
    subtitle: '가장 인기있는 제품들을 한 곳에서 만나보세요',
    buttonText: '베스트 보기',
    buttonLink: '/best-sellers',
    backgroundColor: '#F5F8FF'
  },
  {
    id: 3,
    image: '/assets/timedeal/timedeal1.svg',
    title: '특별 할인 이벤트',
    subtitle: '한정 시간 특가! 놓치지 마세요',
    buttonText: '할인 상품 보기',
    buttonLink: '/time-deals',
    backgroundColor: '#F5FFF7'
  }
];

export default function MainBannerSwiper() {
  return (
    <section className="banner">
      <div className="container">
        <div className="main-banner-swiper">
          <div className="main-banner-swiper__navigation">
            <div className="swiper-button-prev main-banner-swiper__button-prev"></div>
            <div className="swiper-button-next main-banner-swiper__button-next"></div>
          </div>
          
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: '.main-banner-swiper__button-next',
              prevEl: '.main-banner-swiper__button-prev',
            }}
            pagination={{
              el: '.main-banner-swiper__pagination',
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
          >
            {bannerItems.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="banner__card" style={{ backgroundColor: item.backgroundColor }}>
                  <div className="banner__image-container">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="banner__image"
                    />
                  </div>
                  <div className="banner__content">
                    <h1 className="banner__title">{item.title}</h1>
                    <p className="banner__subtitle">{item.subtitle}</p>
                    <Link
                      href={item.buttonLink}
                      className="button button--primary banner__button"
                    >
                      {item.buttonText}
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="swiper-pagination main-banner-swiper__pagination"></div>
        </div>
      </div>
    </section>
  );
}
