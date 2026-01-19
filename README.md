# Next.js 기반 대용량 리스트 가상화 및 무한스크롤 구현

대용량 데이터를 효율적으로 렌더링하기 위한 **가상화(Virtualization)** 기법과 **무한스크롤**을 직접 구현한 프로젝트입니다.

## 프로젝트 배경

이전 프로젝트에서 가상화를 도입하여 **Commit Phase 시간을 단축**한 경험이 있습니다. 대용량 리스트 처리 시 가상화가 얼마나 효과적인지 체감했던 경험이 인상 깊었고, 이를 계기로 가상화를 주제로 프로젝트를 구성하게 되었습니다.

그러던 중 한 가지 궁금증이 생겼습니다.

> **"Next.js 환경에서는 가상화를 어떻게 자연스럽게 구현할 수 있을까?"**

가상화는 브라우저의 **뷰포트 높이**를 우선적으로 알아야 동작합니다. 하지만 Next.js는 SSR(Server-Side Rendering)을 기본으로 하기 때문에 서버에서는 브라우저 정보를 알 수 없습니다. 이로 인해 **Hydration Mismatch** 문제가 발생할 수 있습니다.

이 프로젝트는 Next.js의 SSR 환경에서 **Hydration 이슈 없이 가상화를 자연스럽게 도입하는 방법**을 탐구하고 구현한 결과물입니다. 전자책/웹툰 플랫폼처럼 대용량 목록을 다루는 서비스에도 적용하면 효과적일 것이라 생각하여 유사한 도메인으로 구현했습니다.

## 기술적 의사결정

### 가상화 직접 구현 이유

`react-window`, `tanstack-virtualizer` 같은 검증된 라이브러리를 사용하면 빠르게 가상화를 적용할 수 있습니다. 하지만 라이브러리가 제공하는 전용 컴포넌트로 교체해야 하므로 기존 코드에 사이드 이펙트가 발생하고, 필요한 기능이 제공되지 않을 경우 커스터마이징이 어렵습니다. 또한 대부분 클라이언트 기반 React 라이브러리이기 때문에 Next.js SSR 환경에서 Hydration 이슈가 발생할 수 있습니다.

직접 구현함으로써 **기존 컴포넌트 구조를 유지**하면서, **SSR Hydration을 완전히 제어**할 수 있었습니다.

### Vanilla Extract 선택 이유

`styled-components`는 런타임 기반 CSS-in-JS로, 런타임 오버헤드와 FOUC(Flash of Unstyled Content) 현상이 발생할 수 있습니다. 또한 Next.js의 Server Component를 제대로 활용하기 어렵다고 판단했습니다.

SCSS도 고려했지만, 타입 안전성이 없어 오타나 잘못된 속성값을 컴파일 타임에 잡을 수 없고, `.scss` 파일을 별도로 관리해야 하므로 TypeScript와 언어가 분리되는 점이 아쉬웠습니다. 또한 사용하지 않는 스타일의 자동 제거(tree-shaking)가 어렵습니다.

Vanilla Extract는 **Zero-runtime**으로 빌드 시점에 CSS를 추출하면서도, **TypeScript로 스타일을 작성**할 수 있어 타입 안전성과 언어 통일성을 모두 확보할 수 있었습니다.

### TanStack Query 도입 이유

이 프로젝트의 핵심 목표는 **가상화와 SSR Hydration 처리**였습니다. 데이터 페칭까지 직접 구현하면 핵심 주제에 집중하기 어렵다고 판단하여, 검증된 라이브러리인 TanStack Query를 활용했습니다.

`useInfiniteQuery`로 무한스크롤을 구현하고, SSR에서 가져온 초기 데이터를 `initialData`로 전달하여 첫 렌더링 시 데이터를 즉시 표시했습니다. 또한 `staleTime`을 데이터 특성에 따라 다르게 적용하여, 기존 목록은 긴 캐시 시간을, 검색 결과는 짧은 캐시 시간을 설정해 네트워크 효율성과 데이터 신선도의 균형을 맞췄습니다.

### throttle 적용 이유

스크롤 이벤트는 초당 수십 회 이상 발생하므로, 매번 visible items를 계산하면 성능 저하가 발생합니다. `throttle`을 적용하면 일정 간격으로 실행을 보장하면서도, 스크롤 중에도 주기적으로 화면이 업데이트되어 부드러운 사용자 경험을 제공할 수 있습니다.

### debounce 적용 이유

검색 입력은 타이핑이 완료된 후 한 번만 API를 호출하면 됩니다. `debounce`를 적용하면 사용자가 입력을 멈춘 후에만 요청이 발생하여 불필요한 네트워크 요청을 방지하고, 서버 부하를 줄일 수 있습니다.

## 핵심 기술 스택

| 분류                       | 기술                                     |
| -------------------------- | ---------------------------------------- |
| **Framework**              | Next.js 16 (App Router)                  |
| **Language**               | TypeScript                               |
| **상태관리 / 데이터 페칭** | TanStack React Query v5                  |
| **스타일링**               | Vanilla Extract (Zero-runtime CSS-in-JS) |
| **렌더링 전략**            | SSR + CSR Hydration                      |

## 디자인 패턴

### 1. Service Layer Pattern

API 로직을 서비스 레이어로 분리하여 Server Component와 API Route에서 재사용

```
src/services/webtoon.service.ts  # 비즈니스 로직
src/api/webtoon.ts               # API 호출 래퍼
```

### 2. Custom Hook Pattern

UI 로직을 재사용 가능한 훅으로 분리

| Hook                   | 역할                                       |
| ---------------------- | ------------------------------------------ |
| `useVirtualization`    | 가상 스크롤 (visible items 계산, throttle) |
| `useResponsiveColumns` | 반응형 그리드 열 수 계산                   |

### 3. Compound Component Pattern

관련 컴포넌트를 논리적으로 그룹화

```
src/app/_components/
├── card/
│   ├── Card.tsx
│   ├── CardSkeleton.tsx
│   └── index.ts
```

### 4. Container/Presenter 분리

- **page.tsx**: 데이터 페칭 (Server Component)
- **WebtoonList.tsx**: UI 렌더링 (Client Component)

## 라우팅 및 렌더링 전략

| 경로            | 렌더링 방식 | 설명                                                            |
| --------------- | ----------- | --------------------------------------------------------------- |
| `/`             | SSR         | 메인 페이지, 초기 데이터를 서버에서 가져와 `initialData`로 전달 |
| `/webtoon/[id]` | SSR         | 상세 페이지, 요청 시 서버에서 동적 생성                         |

상세 페이지는 초기에 SSG(`generateStaticParams`)로 구현했으나, 데이터가 2000개 이상으로 늘어나면 빌드 시간과 스토리지 용량이 급증하는 문제가 있어 **SSR로 변경**했습니다.

## 데이터 페칭 전략

별도의 백엔드 서버 없이 **Next.js API Route**와 **Mock 데이터**를 활용하여 실제 서버 환경과 유사한 구조를 구현했습니다.

```
[Server Component] → Service Layer → Mock JSON (SSR 초기 데이터)
[Client Component] → API Route → Service Layer → Mock JSON (무한스크롤)
```

Service Layer를 통해 데이터 접근 로직을 추상화했기 때문에, 실제 API로 교체할 때 Service Layer만 수정하면 됩니다.

## 주요 구현 사항

### 가상화 (Virtualization)

- 화면에 보이는 아이템만 DOM에 렌더링
- `ResizeObserver`로 컨테이너 높이 동적 감지
- `throttle` 적용으로 스크롤 이벤트 최적화
- 그리드 레이아웃 지원 (행 기반 계산)

### 무한스크롤 + 프리페칭

- `useInfiniteQuery`로 페이지네이션 관리
- 스크롤 임계점 도달 전 다음 페이지 프리페치
- SSR 초기 데이터와 클라이언트 캐시 동기화

### SSR Hydration 처리

- `useSyncExternalStore`로 hydration 상태 감지
- 서버/클라이언트 렌더링 불일치 방지

### 검색 / 필터 / 정렬

- `debounce` 적용 검색
- 장르 필터링
- 최신순 / 인기순 / 좋아요순 정렬

## 프로젝트 구조

```
src/
├── app/
│   ├── _components/      # 페이지 전용 컴포넌트
│   ├── api/              # API Routes
│   ├── webtoon/[id]/     # 상세 페이지 (Dynamic Route)
│   └── page.tsx          # 메인 페이지
├── components/           # 공용 컴포넌트
├── hooks/                # 커스텀 훅
├── services/             # 서비스 레이어
├── api/                  # API 클라이언트
├── types/                # 타입 정의
└── utils/                # 유틸리티 (throttle, debounce)
```

## 실행 방법

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev

# 프로덕션 빌드
yarn build && yarn start
```

## 성능 최적화 포인트

- **DOM 최소화**: 가상화로 visible items만 렌더링
- **메모이제이션**: `React.memo`, `useMemo`, `useCallback` 활용
- **이미지 최적화**: Next.js Image 컴포넌트 + priority 속성
- **번들 최적화**: Vanilla Extract (zero-runtime)
- **네트워크 최적화**: 프리페칭, React Query 캐싱
