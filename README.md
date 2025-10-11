# 🔍 크라임씬 성격 테스트

Django와 Bootstrap을 사용한 MBTI 스타일의 성격 테스트 웹 애플리케이션입니다.

## 프로젝트 설명

크라임씬(예능 프로그램)에 나오는 인물들의 성격 유형을 바탕으로 사용자의 성격을 분석하는 테스트입니다.
8개의 질문에 답하면 4가지 캐릭터 유형 중 하나로 결과가 나옵니다.

## 캐릭터 유형

1. **냉철한 분석가** - 논리적이고 객관적인 판단
2. **열정적인 수사관** - 직관력과 행동력이 뛰어남
3. **신중한 전략가** - 계획적이고 체계적인 접근
4. **따뜻한 공감자** - 높은 공감 능력과 심리 파악

## 기술 스택

- **Backend**: Django 5.0
- **Frontend**: Bootstrap 5 (django-bootstrap5)
- **Database**: SQLite3
- **Language**: Python 3.13

## 설치 및 실행

### 1. 가상환경 활성화
```bash
source venv/bin/activate
```

### 2. 패키지 설치 (이미 완료됨)
```bash
pip install -r requirements.txt
```

### 3. 데이터베이스 마이그레이션 (이미 완료됨)
```bash
python manage.py migrate
```

### 4. 더미 데이터 로드 (이미 완료됨)
```bash
python manage.py load_dummy_data
```

### 5. 서버 실행
```bash
python manage.py runserver
```

### 6. 브라우저에서 접속
- **메인 페이지**: http://127.0.0.1:8000/
- **관리자 페이지**: http://127.0.0.1:8000/admin/
  - Username: `admin`
  - Password: `admin`

## 프로젝트 구조

```
crime_scene/
├── crime_scene_project/      # Django 프로젝트 설정
│   ├── settings.py
│   ├── urls.py
│   └── ...
├── personality_test/          # 메인 앱
│   ├── models.py             # 데이터 모델 (Character, Question, Answer, TestResult)
│   ├── views.py              # 뷰 로직
│   ├── urls.py               # URL 라우팅
│   ├── admin.py              # 관리자 설정
│   ├── templates/            # HTML 템플릿
│   │   └── personality_test/
│   │       ├── base.html
│   │       ├── home.html
│   │       ├── test.html
│   │       └── result.html
│   └── management/           # 커스텀 명령어
│       └── commands/
│           └── load_dummy_data.py
├── static/                   # 정적 파일
├── media/                    # 업로드 파일
└── requirements.txt          # 패키지 목록
```

## 주요 기능

### 1. 메인 페이지
- 테스트 소개 및 시작 버튼

### 2. 질문 페이지
- 진행률 표시
- 8개의 질문에 대한 객관식 답변
- 답변 선택 시 자동으로 다음 질문으로 이동

### 3. 결과 페이지
- 사용자의 성격 유형 표시
- 캐릭터 설명 및 주요 특징
- 다시 테스트하기 기능

### 4. 관리자 페이지
- 캐릭터, 질문, 답변 관리
- 테스트 결과 통계 확인

## 데이터베이스 모델

### Character (캐릭터)
- 이름, 설명, 이미지, 성격 특징

### Question (질문)
- 질문 내용, 순서

### Answer (답변)
- 질문, 답변 내용, 연관 캐릭터, 점수

### TestResult (테스트 결과)
- 결과 캐릭터, 생성 시간

## 커스터마이징

### 새로운 질문 추가
관리자 페이지에서 질문과 답변을 추가할 수 있습니다.

### 새로운 캐릭터 추가
관리자 페이지에서 캐릭터를 추가하고, 각 답변에 새로운 캐릭터를 연결할 수 있습니다.

### 디자인 수정
`templates/personality_test/base.html`의 스타일을 수정하여 디자인을 변경할 수 있습니다.

## 개발자 정보

Django와 Bootstrap을 활용한 성격 테스트 애플리케이션입니다.

## 라이센스

이 프로젝트는 교육 및 테스트 목적으로 제작되었습니다.

