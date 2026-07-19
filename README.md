# 크라임씬 인물 매칭 테스트

크라임씬 시즌 1-3 인물 분석 데이터를 바탕으로 사용자의 성향을 가장 가까운 등장인물과 매칭하는 정적 웹 테스트입니다.

## 현재 방식

- 백엔드 저장 없음: 질문, 채점, 결과, 공유 링크 생성은 모두 브라우저 JavaScript에서 처리합니다.
- 후보 데이터: `season1.md`, `season2.md`, `season3.md`의 등장인물 표를 파싱해 만든 정적 데이터 199개를 사용합니다.
- 결과: 1순위 인물, 일치율, 성향 코드, 주요 태그, 보조 후보 2명을 보여줍니다.
- 공유: `?result=...` 쿼리스트링으로 결과 링크를 공유합니다.

## 주요 파일

```text
index.html
test.html

static/
  app.css
  app.js
  character-data.js

season1.md
season2.md
season3.md
```

## 실행

```bash
python3 -m http.server 8000
```

브라우저에서 접속:

```text
http://127.0.0.1:8000/
```

파일을 직접 열어도 동작합니다.

## 검증

```bash
node --check static/app.js
```

## GitHub Pages 배포

이 저장소는 `.github/workflows/pages.yml`로 GitHub Pages 배포를 처리합니다.

- 모든 push와 pull request에서 정적 파일 검사를 실행합니다.
- pull request에서는 배포하지 않고 검사만 실행합니다.
- 기본 브랜치에 push되면 GitHub Pages artifact를 만들고 배포합니다.

GitHub 저장소에서는 `Settings > Pages > Build and deployment > Source`를 `GitHub Actions`로 설정하면 됩니다.
