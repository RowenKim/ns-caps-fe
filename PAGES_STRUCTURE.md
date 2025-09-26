# 누수케어 플랫폼 페이지 구조 및 URL 가이드

## 📋 전체 페이지 구조

### 🏠 메인/공통 페이지
| URL | 파일 경로 | 설명 | 상태 |
|-----|----------|------|------|
| `/` | `pages/index.vue` | 메인 랜딩 페이지 | ✅ 완료 |

### 🔐 인증 페이지
| URL | 파일 경로 | 설명 | 상태 |
|-----|----------|------|------|
| `/auth/login` | `pages/auth/login.vue` | 로그인 페이지 | ✅ 완료 |
| `/auth/register` | `pages/auth/register.vue` | 회원가입 페이지 | ✅ 완료 |

### 👤 고객 페이지
| URL | 파일 경로 | 설명 | 상태 |
|-----|----------|------|------|
| `/customer/dashboard` | `pages/customer/dashboard.vue` | 고객 대시보드 | ✅ 완료 |
| `/customer/request` | `pages/customer/request.vue` | 누수 신고 양식 | ✅ 완료 |
| `/customer/requests` | `pages/customer/requests.vue` | 내 요청 전체 목록 | ✅ 완료 |
| `/customer/request/[id]` | `pages/customer/request/[id].vue` | 요청 상세 페이지 | ✅ 완료 |
| `/customer/quotes` | `pages/customer/quotes.vue` | 견적 비교 페이지 | ✅ 완료 |

### 🔧 업자 페이지
| URL | 파일 경로 | 설명 | 상태 |
|-----|----------|------|------|
| `/contractor/dashboard` | `pages/contractor/dashboard.vue` | 업자 대시보드 | ✅ 완료 |
| `/contractor/requests` | `pages/contractor/requests.vue` | 신규 요청 목록 | ✅ 완료 |
| `/contractor/quotes` | `pages/contractor/quotes.vue` | 내 견적 관리 | ✅ 완료 |

### 👨‍💼 관리자 페이지
| URL | 파일 경로 | 설명 | 상태 |
|-----|----------|------|------|
| `/admin/dashboard` | `pages/admin/dashboard.vue` | 관리자 대시보드 | ⏳ 예정 |

---

## 🚀 주요 기능별 페이지 플로우

### 고객 사용자 플로우
```
1. 메인 페이지 (/) 
   ↓
2. 누수 신고 (/customer/request)
   ↓ 
3. 견적 비교 (/customer/quotes)
   ↓
4. 요청 상세 (/customer/request/[id])
   ↓
5. 대시보드 (/customer/dashboard)
```

### 업자 사용자 플로우
```
1. 메인 페이지 (/) 
   ↓
2. 업자 대시보드 (/contractor/dashboard)
   ↓
3. 신규 요청 확인 (/contractor/requests)
   ↓
4. 견적 제출 
   ↓
5. 견적 관리 (/contractor/quotes)
```

---

## 📱 페이지별 상세 정보

### 메인 페이지 (`/`)
- **목적**: 플랫폼 소개 및 빠른 네비게이션
- **주요 기능**:
  - 서비스 소개
  - 고객/업자 메뉴 분리
  - 주요 기능 링크
- **다음 단계**: 로그인 또는 회원가입

### 고객 대시보드 (`/customer/dashboard`)
- **목적**: 고객의 요청 현황 한눈에 보기
- **주요 기능**:
  - 요청 통계 (대기/진행/완료)
  - 최근 요청 목록 (최대 3개)
  - 진행 중인 작업 알림
  - 빠른 신고 버튼

### 누수 신고 (`/customer/request`)
- **목적**: 3단계 누수 신고 양식
- **단계별 구성**:
  1. 기본 정보 (위치, 증상, 긴급도)
  2. 주소 정보 (주소, 연락처, 방문시간)
  3. 사진 업로드 및 추가 정보
- **완료 후**: 견적 비교 페이지로 이동

### 견적 비교 (`/customer/quotes`)
- **목적**: 받은 견적들을 비교하고 선택
- **주요 기능**:
  - 견적 목록 및 비교
  - 업자 프로필 보기
  - 실시간 문의
  - 견적 선택 및 계약

### 업자 대시보드 (`/contractor/dashboard`)
- **목적**: 업자의 작업 현황 관리
- **주요 기능**:
  - 수익 통계 및 차트
  - 새로운 요청 알림
  - 진행 중인 작업 목록
  - 월별 수익 현황

### 신규 요청 목록 (`/contractor/requests`)
- **목적**: 새로운 누수 신고 요청 확인 및 견적 제출
- **주요 기능**:
  - 필터링 (긴급도, 위치, 거리)
  - 요청 상세 정보 확인
  - 견적 제출
  - 경쟁 상황 파악

### 견적 관리 (`/contractor/quotes`)
- **목적**: 제출한 견적들의 상태 관리
- **주요 기능**:
  - 견적 상태별 필터링
  - 경쟁 견적 정보
  - 견적 수정/철회
  - 고객 피드백 확인

---

## 🎨 디자인 시스템

### CSS 프레임워크
- **Tailwind CSS**: 유틸리티 클래스 기반 스타일링
- **커스텀 컴포넌트**: `assets/css/main.css`에 정의

### 주요 컴포넌트 클래스
```css
.btn              /* 기본 버튼 */
.btn-primary      /* 주요 액션 버튼 */
.btn-secondary    /* 보조 버튼 */
.btn-success      /* 성공/완료 버튼 */
.btn-warning      /* 경고 버튼 */
.btn-danger       /* 위험/삭제 버튼 */

.card             /* 카드 컨테이너 */
.card-header      /* 카드 헤더 */
.card-body        /* 카드 본문 */

.input            /* 입력 필드 */
.badge            /* 상태 배지 */
.upload-zone      /* 파일 업로드 영역 */
```

### 색상 테마
```css
--primary-blue: #1e40af     /* 주요 파란색 */
--success-green: #10b981    /* 성공 초록색 */
--warning-orange: #f59e0b   /* 경고 주황색 */
--danger-red: #ef4444       /* 위험 빨간색 */
```

---

## 🔧 추가 개발 필요 페이지

### 미구현 페이지 (우선순위 높음)
1. **채팅 페이지**
   - `/customer/chat/[id]` - 고객용 실시간 채팅
   - `/contractor/chat/[id]` - 업자용 실시간 채팅

2. **동적 상세 페이지**
   - `/contractor/request/[id]` - 업자용 요청 상세
   - `/contractor/request/[id]/quote` - 견적 제출 양식

3. **관리자 페이지**
   - `/admin/dashboard` - 관리자 대시보드
   - `/admin/users` - 사용자 관리
   - `/admin/reports` - 신고 관리

### 미구현 페이지 (우선순위 중간)
1. **프로필 페이지**
   - `/customer/profile` - 고객 프로필 관리
   - `/contractor/profile` - 업자 프로필 관리

2. **결제 페이지**
   - `/customer/payment/[id]` - 결제 페이지
   - `/customer/payment/success` - 결제 완료

3. **리뷰 페이지**
   - `/customer/reviews` - 내가 쓴 리뷰
   - `/contractor/reviews` - 받은 리뷰

---

## ⚡ 성능 최적화 요소

### 이미지 최적화
- 누수 사진 업로드 시 WebP 변환
- 이미지 리사이징 및 압축
- 지연 로딩 (Lazy Loading)

### 코드 분할
- 페이지별 코드 스플리팅
- 컴포넌트 단위 지연 로딩
- 라이브러리 청크 분리

### SEO 최적화
- 각 페이지별 메타 태그 설정
- 구조화된 데이터 (JSON-LD)
- 사이트맵 자동 생성

---

## 🔒 보안 고려사항

### 인증 미들웨어
- 로그인 필수 페이지 보호
- 역할 기반 접근 제어 (RBAC)
- JWT 토큰 관리

### 데이터 보호
- 개인정보 암호화
- 파일 업로드 검증
- XSS/CSRF 방어

---

## 📱 모바일 최적화

### 반응형 디자인
- 모든 페이지 모바일 퍼스트
- 터치 친화적 UI 요소
- 적절한 폰트 크기 및 간격

### PWA 기능
- 오프라인 지원 (예정)
- 푸시 알림 (예정)
- 홈 스크린 추가 (예정)

---

## 🚀 배포 및 운영

### 환경 설정
- 개발환경: `npm run dev`
- 프로덕션 빌드: `npm run build`
- 프리뷰: `npm run preview`

### 모니터링
- 페이지 로딩 성능
- 에러 추적
- 사용자 행동 분석

---

*최종 업데이트: 2024년 1월 15일*
*문서 버전: v1.0*
