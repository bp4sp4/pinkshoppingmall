"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles/login.css";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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

    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요.";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요.";
    } else if (formData.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상이어야 합니다.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호 확인을 입력해주세요.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "전화번호를 입력해주세요.";
    } else if (!/^\d{3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
      newErrors.phone =
        "유효한 전화번호 형식을 입력해주세요. (예: 010-1234-5678)";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "이용약관에 동의해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      // 회원가입 처리 로직 (실제로는 API 호출)
      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
      // 로그인 페이지로 리다이렉트 (실제 구현 시)
      // router.push('/login');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <section className="login-section">
      <div className="container">
        <div className="login-container">
          <div className="login-image">
            <div className="login-image__overlay">
              <h2 className="login-image__title">핑크숍 회원이 되어보세요</h2>
              <p className="login-image__text">
                회원가입 후 다양한 혜택과 서비스를 이용하실 수 있습니다
              </p>
            </div>
          </div>

          <div className="login-form-container">
            <div className="login-form-wrapper">
              <h1 className="login-form__title">회원가입</h1>

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
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="이메일을 입력하세요"
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
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="비밀번호를 입력하세요 (8자 이상)"
                    />
                    <button
                      type="button"
                      className="login-form__toggle-password"
                      onClick={togglePasswordVisibility}
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

                <div className="login-form__group">
                  <label
                    htmlFor="confirmPassword"
                    className="login-form__label"
                  >
                    비밀번호 확인
                  </label>
                  <div className="login-form__input-wrapper">
                    <i className="fas fa-lock login-form__icon"></i>
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      className="login-form__input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="비밀번호를 다시 입력하세요"
                    />
                    <button
                      type="button"
                      className="login-form__toggle-password"
                      onClick={toggleConfirmPasswordVisibility}
                    >
                      <i
                        className={`fas ${
                          confirmPasswordVisible ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                    {errors.confirmPassword && (
                      <p className="login-form__error">
                        {errors.confirmPassword}
                      </p>
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

                <div className="login-form__group login-form__group--checkbox">
                  <div className="login-form__checkbox-wrapper">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      className="login-form__checkbox"
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="login-form__checkbox-label"
                    >
                      <Link href="/terms" className="login-form__link">
                        이용약관
                      </Link>
                      에 동의합니다.
                    </label>
                  </div>
                  {errors.agreeTerms && (
                    <p className="login-form__error">{errors.agreeTerms}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="button button--primary login-form__submit"
                >
                  회원가입
                </button>
              </form>

              <div className="login-form__divider">
                <span className="login-form__divider-text">또는</span>
              </div>

              <div className="login-form__signup">
                <p className="login-form__signup-text">
                  이미 계정이 있으신가요?
                </p>
                <Link href="/login" className="login-form__signup-link">
                  로그인
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
