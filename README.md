# QuickDev (QuickQuery Web)

**QuickDev**는 기존 C# WPF 애플리케이션인 QuickQuery를 **Next.js 14**, **Tailwind CSS**, **Shadcn/UI**를 사용하여 웹으로 포팅한 개발자 생산성 도구 모음입니다.

## 🚀 주요 기능

### 1. 📋 스마트 IN절 생성기 (Smart IN-Clause Generator)
- 엑셀 등에서 복사한 여러 줄의 값을 SQL `IN (...)` 절로 변환합니다.
- 구분자 선택 가능 (콤마 `,` 또는 파이프 `|`).
- **Oracle 모드**: 1000개가 넘는 값은 자동으로 분할하여 `OR column IN (...)` 형태로 생성합니다.

### 2. 📝 CRUD 생성기 (CRUD Generator)
- 테이블 명과 컬럼 목록만 입력하면 기본 쿼리문(`SELECT`, `INSERT`, `UPDATE`, `DELETE`)을 자동으로 생성해줍니다.
- **MSSQL** (`@param`) 및 **Oracle** (`:param`) 파라미터 스타일을 지원합니다.

### 3. 🔄 모델 매퍼 (Model Mapper)
- 데이터베이스 컬럼명(`snake_case`)을 C# 프로퍼티명(`PascalCase`)으로 변환합니다.
- 자동으로 `public type Name { get; set; }` 형태의 코드를 생성합니다.

### 4. 🔗 쿼리 인터폴레이터 (Query Interpolator)
- 로그에서 캡처한 파라미터화된 쿼리(`?`, `@p0`, `:1`)를 실제 값으로 치환해줍니다.
- DB 툴에서 바로 실행 가능한 형태로 만들어 디버깅을 돕습니다.

## 🛠️ 기술 스택
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS + Shadcn/UI
- **아이콘**: Lucide React
- **배포**: Vercel

## 📦 시작하기

로컬에서 실행하려면 다음 명령어를 사용하세요:

```bash
npm run dev
# 브라우저에서 http://localhost:3000 접속
```

## ☁️ 배포 (Vercel)

이 프로젝트는 **Vercel** 배포에 최적화되어 있습니다.
- **비용**: 개인 프로젝트(Hobby Plan)는 **무료**입니다.
- **HTTPS**: 무료 SSL 인증서가 자동 적용됩니다.

```bash
npx vercel
```

