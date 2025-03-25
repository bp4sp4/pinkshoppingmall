"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles/login.css";

export default function FindId() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [foundId, setFoundId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요.";
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone =
        "유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // 아이디 찾기 로직 (실제로는 API 호출)
      // 여기서는 예시로 가상의 아이디를 보여줌
      setFoundId(
        "user" +
          formData.phone.replace(/-/g, "").substring(0, 4) +
          "@example.com"
      );
    }
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="login-container">
          <div className="login-image">
            <img
              src="/assets/bestseller/bestseller3.svg"
              alt="아이디 찾기 이미지"
              className="login-image__img"
            />
            <div className="login-image__overlay">
              <h2 className="login-image__title">아이디를 잊으셨나요?</h2>
              <p className="login-image__text">
                회원정보를 입력하시면 가입하신 아이디를 알려드립니다
              </p>
            </div>
          </div>

          <div className="login-form-container">
            <div className="login-form-wrapper">
              <h1 className="login-form__title">아이디 찾기</h1>

              {foundId ? (
                <div className="login-form__result">
                  <p className="login-form__result-message">
                    회원님의 아이디를 찾았습니다.
                  </p>
                  <div className="login-form__result-id">{foundId}</div>
                  <div className="login-form__result-actions">
                    <Link
                      href="/login"
                      className="button button--primary login-form__submit"
                    >
                      로그인하기
                    </Link>
                    <Link
                      href="/find-password"
                      className="button button--secondary login-form__submit"
                    >
                      비밀번호 찾기
                    </Link>
                  </div>
                </div>
              ) : (
                <form className="login-form" onSubmit={handleSubmit}>
                  <div className="login-form__group">
                    <label htmlFor="name" className="login-form__label">
                      이름
                    </label>
                    <div className="login-form__input-wrapper">
                      <i className="fas fa-user login-form__icon"></i>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="login-form__input"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="이름을 입력하세요"
                      />
                      {errors.name && (
                        <p className="login-form__error">{errors.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="login-form__group">
                    <label htmlFor="phone" className="login-form__label">
                      전화번호
                    </label>
                    <div className="login-form__input-wrapper">
                      <i className="fas fa-phone login-form__icon"></i>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="login-form__input"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                      />
                      {errors.phone && (
                        <p className="login-form__error">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="button button--primary login-form__submit"
                  >
                    아이디 찾기
                  </button>
                </form>
              )}

              <div className="login-form__divider">
                <span className="login-form__divider-text">또는</span>
              </div>

              <div className="login-form__signup">
                <Link href="/login" className="login-form__signup-link">
                  로그인
                </Link>
                <span className="login-form__signup-separator">/</span>
                <Link href="/register" className="login-form__signup-link">
                  회원가입
                </Link>
                <span className="login-form__signup-separator">/</span>
                <Link href="/find-password" className="login-form__signup-link">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
