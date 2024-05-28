# Coin Market

Coin Market은 다양한 코인 데이터를 확인할 수 있는 웹 애플리케이션입니다. 이 애플리케이션은 사용자에게 최신 코인 가격, 변동성 등을 제공하여 효율적인 코인 투자 결정을 지원합니다.

## 개요

Coin Market은 다음과 같은 기능을 제공합니다:

- 코인 가격 조회
- 코인 상세 데이터 조회
- 코인 <-> 원화 가격계산 (KRW, USD만 지원하며 환율은 $1 - 1,300원으로 책정되었습니다.)
- 북마크

## 사용 라이브러리

- **React**: 사용자 인터페이스를 구축하기 위한 라이브러리로, 컴포넌트 기반 아키텍처를 통해 재사용성과 유지보수성을 높입니다.
- **Axios**: HTTP 요청을 처리하기 위해 사용됩니다. RESTful API와 통신하여 실시간 데이터를 가져옵니다.
- **TypeScript**: 코드의 안전성과 유지보수성을 높이기 위해 사용됩니다. 정적 타입 체크를 통해 잠재적인 오류를 사전에 방지합니다.
- **Tailwind CSS**: 빠르고 효율적인 스타일링을 위해 사용됩니다. 유틸리티 클래스 기반 접근법을 통해 CSS 작성의 번거로움을 줄이고, 일관된 디자인을 유지할 수 있습니다.
- **Geist-UI**: 사용자 인터페이스 컴포넌트를 제공하는 디자인 시스템입니다. 아이콘 및 간단한 로딩 컴포넌트 사용을 위해 사용되었습니다.

## 폴더 구조

├── public/
│ └── fonts
├── src/
│ ├── components/
│ │ ├── btc-price-calculator.tsx
│ │ ├── footer.tsx
│ │ ├── market-table.tsx
│ │ └── header.tsx
│ ├── layouts/
│ │ └── main-layout.tsx
│ ├── pages/
│ │ ├── error-page.tsx
│ │ ├── bookmark-page.tsx
│ │ ├── market-page.tsx
│ │ └── market-detail-page.tsx
│ ├── services/
│ │ ├── api.tsx
│ │ └── axios.tsx
│ ├── App.tsx
│ ├── main.tsx
│ └── index.html
├── package.json
├── tsconfig.json
└── README.md

## 실행 방법

1. **레포지토리 클론**

   ```bash
   git clone https://github.com/kysclient/coin-market.git
   cd coin-market
   ```

2. **필요한 패키지 설치**

   ```bash
   yarn install
   ```

3. **애플리케이션 실행**

   ```bash
  yarn start
   or
  yarn dev
  or
  yarn vite

   ```

4. **웹 브라우저에서 확인**
   ```text
   http://localhost:5173
   ```

이제 Coin Market이 로컬 서버에서 실행됩니다. 브라우저를 통해 코인 데이터를 확인할 수 있습니다.
