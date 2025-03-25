"use client";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__column footer__column--info">
            <h3 className="footer__title">핑크숍 소개</h3>
            <p className="footer__description">
              핑크숍은 트렌디한 패션 아이템을 합리적인 가격으로 제공하는 온라인 쇼핑몰입니다. 
              최신 트렌드를 반영한 다양한 상품들을 만나보세요.
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="footer__social-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="footer__social-link">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div className="footer__column">
            <h3 className="footer__title">고객 지원</h3>
            <a href="/contact" className="footer__link">
              고객센터
            </a>
            <a href="/faq" className="footer__link">
              자주 묻는 질문
            </a>
            <a href="/shipping" className="footer__link">
              배송 안내
            </a>
          </div>
          
          <div className="footer__column">
            <h3 className="footer__title">쇼핑 정보</h3>
            <a href="/privacy" className="footer__link">
              개인정보처리방침
            </a>
            <a href="/terms" className="footer__link">
              이용약관
            </a>
            <a href="/login" className="footer__link">
              로그인
            </a>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2025 핑크숍. All rights reserved.
          </p>
          <p className="footer__address">
            서울특별시 강남구 테헤란로 123 핑크빌딩 | 사업자등록번호: 123-45-67890
          </p>
        </div>
      </div>
    </footer>
  );
}
