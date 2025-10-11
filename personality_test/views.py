from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from .models import Character, Question, Answer, TestResult


def home(request):
    """메인 페이지 - 테스트 시작"""
    return render(request, "personality_test/home.html")


def test(request):
    """테스트 페이지 - 질문 표시"""
    # 세션 초기화
    if "answers" not in request.session:
        request.session["answers"] = {}

    questions = Question.objects.all().prefetch_related("answers")
    current_question_index = int(request.GET.get("q", 0))

    # 모든 질문을 완료한 경우
    if current_question_index >= questions.count():
        return redirect("personality_test:result")

    current_question = questions[current_question_index]
    progress = int((current_question_index / questions.count()) * 100)

    context = {
        "question": current_question,
        "current_index": current_question_index,
        "total_questions": questions.count(),
        "progress": progress,
    }

    return render(request, "personality_test/test.html", context)


def submit_answer(request):
    """답변 제출 처리"""
    if request.method == "POST":
        question_id = request.POST.get("question_id")
        answer_id = request.POST.get("answer_id")
        current_index = int(request.POST.get("current_index", 0))

        if "answers" not in request.session:
            request.session["answers"] = {}

        # 답변 저장
        request.session["answers"][question_id] = answer_id
        request.session.modified = True

        # 다음 질문으로
        next_index = current_index + 1
        return redirect(f"{reverse('personality_test:test')}?q={next_index}")

    return redirect("personality_test:test")


def result(request):
    """결과 페이지 - 캐릭터 판정"""
    if "answers" not in request.session or not request.session["answers"]:
        return redirect("personality_test:home")

    # 각 캐릭터별 점수 계산
    character_scores = {}

    for answer_id in request.session["answers"].values():
        try:
            answer = Answer.objects.select_related("character").get(id=answer_id)
            char_name = answer.character.name
            if char_name not in character_scores:
                character_scores[char_name] = {
                    "character": answer.character,
                    "score": 0,
                }
            character_scores[char_name]["score"] += answer.score
        except Answer.DoesNotExist:
            continue

    # 가장 높은 점수의 캐릭터 선택
    if character_scores:
        result_character = max(character_scores.values(), key=lambda x: x["score"])[
            "character"
        ]

        # 결과 저장
        TestResult.objects.create(character=result_character)

        # 세션 정리
        request.session["answers"] = {}
        request.session.modified = True

        context = {
            "character": result_character,
            "traits": result_character.get_traits_list(),
        }

        return render(request, "personality_test/result.html", context)

    return redirect("personality_test:home")


def restart(request):
    """테스트 재시작"""
    if "answers" in request.session:
        del request.session["answers"]
    return redirect("personality_test:home")
