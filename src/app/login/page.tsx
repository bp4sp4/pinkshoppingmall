"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/login.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    // 비밀번호 표시/숨김 토글 기능 추가
    const togglePasswordButton = document.querySelector(
      ".login-form__toggle-password"
    );
    if (togglePasswordButton) {
      togglePasswordButton.addEventListener("click", function () {
        setPasswordVisible(!passwordVisible);
      });
    }

    return () => {
      if (togglePasswordButton) {
        togglePasswordButton.removeEventListener("click", function () {
          setPasswordVisible(!passwordVisible);
        });
      }
    };
  }, [passwordVisible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // 에러 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // 로그인 처리 로직 (실제로는 API 호출)
      alert("로그인 성공! 홈페이지로 이동합니다.");
      // 홈페이지로 리다이렉트 (실제 구현 시)
      // router.push('/');
    }
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="login-container">
          <div className="login-image">
            <div className="login-image__overlay">
              <h2 className="login-image__title">
                핑크숍에 오신 것을 환영합니다
              </h2>
              <p className="login-image__text">
                화사한 봄을 위한 특별한 아이템을 만나보세요
              </p>
            </div>
          </div>
          <div className="login-form-container">
            <div className="login-form-wrapper">
              <h1 className="login-form__title">로그인</h1>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="login-form__group">
                  <label htmlFor="email" className="login-form__label">
                    이메일
                  </label>
                  <div className="login-form__input-wrapper">
                    <i className="fas fa-envelope login-form__icon"></i>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="login-form__input"
                      placeholder="이메일 주소를 입력하세요"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && (
                      <p className="login-form__error">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="login-form__group">
                  <label htmlFor="password" className="login-form__label">
                    비밀번호
                  </label>
                  <div className="login-form__input-wrapper">
                    <i className="fas fa-lock login-form__icon"></i>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="password"
                      name="password"
                      className="login-form__input"
                      placeholder="비밀번호를 입력하세요"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="login-form__toggle-password"
                    >
                      <i
                        className={`fas ${
                          passwordVisible ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                    {errors.password && (
                      <p className="login-form__error">{errors.password}</p>
                    )}
                  </div>
                </div>

                <div className="login-form__options">
                  <div className="login-form__remember">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      className="login-form__checkbox"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="login-form__checkbox-label"
                    >
                      로그인 상태 유지
                    </label>
                  </div>
                  <Link
                    href="/find-password"
                    className="login-form__forgot-password"
                  >
                    비밀번호 찾기
                  </Link>
                </div>

                <button
                  type="submit"
                  className="button button--primary login-form__submit"
                >
                  로그인
                </button>
              </form>

              <div className="login-form__divider">
                <span className="login-form__divider-text">또는</span>
              </div>

              <div className="login-form__social">
                <button className="login-form__social-button login-form__social-button--kakao">
                  <i className="fas fa-comment"></i>
                  카카오로 로그인
                </button>
                <button className="login-form__social-button login-form__social-button--naver">
                  <i className="fas fa-n"></i>
                  네이버로 로그인
                </button>
              </div>

              <div className="login-form__signup">
                <p className="login-form__signup-text">
                  아직 회원이 아니신가요?
                </p>
                <Link href="/register" className="login-form__signup-link">
                  회원가입
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
