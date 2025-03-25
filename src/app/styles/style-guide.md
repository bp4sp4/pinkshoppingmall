# 핑크숍 스타일 가이드

## 1. 컬러 팔레트

핑크숍의 브랜드 아이덴티티를 표현하는 컬러 팔레트입니다.

- **Main**: #FF6B9C (핑크) - 브랜드의 주요 색상으로 로고, 버튼, 강조 요소에 사용
- **Sub**: #FFF0F5 (연핑크 배경) - 배경색 및 섹션 구분에 사용
- **Text**: #111111 (다크 그레이) - 본문 텍스트 및 헤딩에 사용
- **Accent**: #FFD700 (골드 포인트 색) - 특별 프로모션, 할인 태그, 강조 요소에 사용
- **보조 색상**:
  - White (#FFFFFF): 배경, 텍스트 대비
  - Light Gray (#F5F5F5): 경계선, 구분선
  - Medium Gray (#DDDDDD): 비활성화 요소, 보조 텍스트

## 2. 타이포그래피

### 폰트 패밀리
- **헤딩**: Noto Sans KR Bold - 모든 제목 요소에 사용
- **본문**: Pretendard Regular - 모든 본문 텍스트에 사용

### 텍스트 스타일
BEM 방법론을 적용한 타이포그래피 클래스:

```css
.typography__heading--h1 {
  font-size: 2.5rem;
  line-height: 1.2;
}

.typography__heading--h2 {
  font-size: 2rem;
  line-height: 1.25;
}

.typography__heading--h3 {
  font-size: 1.75rem;
  line-height: 1.3;
}

.typography__heading--h4 {
  font-size: 1.5rem;
  line-height: 1.35;
}

.typography__heading--h5 {
  font-size: 1.25rem;
  line-height: 1.4;
}

.typography__heading--h6 {
  font-size: 1rem;
  line-height: 1.5;
}

.typography__text {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-text);
}
```

## 3. 버튼 스타일

핑크숍의 버튼은 두 가지 주요 스타일로 구성됩니다:

### Primary Button
- 핑크 배경 (#FF6B9C)
- 흰색 텍스트 (#FFFFFF)
- 둥근 모서리 (border-radius: 2rem)
- 호버 시 약간 더 진한 핑크 색상으로 변경

```css
.button {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-lg);
  font-family: var(--font-body);
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  border-radius: var(--border-radius-2xl);
}

.button--primary {
  background-color: var(--color-main);
  color: var(--color-white);
}

.button--primary:hover {
  background-color: #FF4F8B;
  box-shadow: var(--shadow-md);
}
```

### Secondary Button
- 투명 배경
- 핑크 테두리 (#FF6B9C)
- 핑크 텍스트 (#FF6B9C)
- 둥근 모서리 (border-radius: 2rem)
- 호버 시 연한 핑크 배경으로 변경

```css
.button--secondary {
  background-color: transparent;
  color: var(--color-main);
  border: 2px solid var(--color-main);
}

.button--secondary:hover {
  background-color: rgba(255, 107, 156, 0.1);
  box-shadow: var(--shadow-sm);
}
```

## 4. 간격 시스템

일관된 디자인을 위한 간격 변수:

```css
--spacing-xs: 0.25rem;  /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;   /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-xxl: 3rem;    /* 48px */
```

## 5. 그리드 시스템

반응형 레이아웃을 위한 그리드 시스템:

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.grid__column {
  padding: 0 15px;
  flex: 1;
}

.grid__column--full {
  flex: 0 0 100%;
}

.grid__column--half {
  flex: 0 0 50%;
}

.grid__column--third {
  flex: 0 0 33.333%;
}

.grid__column--quarter {
  flex: 0 0 25%;
}
```

## 6. 반응형 디자인

모바일 기기를 위한 미디어 쿼리:

```css
@media (max-width: 768px) {
  .grid {
    flex-direction: column;
  }
  
  .grid__column--half,
  .grid__column--third,
  .grid__column--quarter {
    flex: 0 0 100%;
  }
  
  .header__nav {
    display: none;
  }
  
  .typography__heading--h1 {
    font-size: 2rem;
  }
  
  .typography__heading--h2 {
    font-size: 1.75rem;
  }
  
  .typography__heading--h3 {
    font-size: 1.5rem;
  }
}
```

## 7. BEM 방법론 적용

핑크숍의 모든 CSS는 BEM(Block Element Modifier) 방법론을 따릅니다:

- **Block**: 독립적인 컴포넌트 (예: `.card`, `.button`, `.header`)
- **Element**: 블록의 일부분 (예: `.card__image`, `.header__nav`)
- **Modifier**: 블록이나 요소의 변형 (예: `.button--primary`, `.section--light`)

이 방법론은 코드의 가독성과 재사용성을 높이고, 스타일 충돌을 방지합니다.
