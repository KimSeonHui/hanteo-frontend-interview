# 한터글로벌 프론트엔드 인터뷰 프로젝트

## 구현 기능

### 핵심 기능
- 좌우 슬라이드를 통한 카테고리 네비게이션
- 무한 루프 슬라이드형 배너 (Swiper.js 활용)
- 선택한 카테고리별 리스트 형식의 컨텐츠 표시
- 컨텐츠 영역 무한 스크롤 구현

### 성능 최적화
- 카테고리별 컨텐츠 데이터 로딩 시 스켈레톤 UI 적용
- React Query를 활용한 데이터 캐싱 및 상태 관리
- WebP 이미지 포맷을 활용한 이미지 최적화

## 기술 스택
- React
- TypeScript
- Styled Components
- React Query

## 프로젝트 구조
```
src/
├── api/          # API 통신 관련 함수
├── pages/        # 페이지 컴포넌트
├── styles/       # 전역 스타일
└── type/         # TypeScript 타입 정의
```
