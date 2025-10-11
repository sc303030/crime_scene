from django.db import models


class Character(models.Model):
    """크라임씬 캐릭터/인물"""

    name = models.CharField(max_length=100, verbose_name="캐릭터 이름")
    description = models.TextField(verbose_name="캐릭터 설명")
    image = models.ImageField(
        upload_to="characters/", verbose_name="캐릭터 이미지", null=True, blank=True
    )
    traits = models.TextField(
        verbose_name="성격 특징", help_text="여러 특징을 줄바꿈으로 구분"
    )

    class Meta:
        verbose_name = "캐릭터"
        verbose_name_plural = "캐릭터들"

    def __str__(self):
        return self.name

    def get_traits_list(self):
        """성격 특징을 리스트로 반환"""
        return [trait.strip() for trait in self.traits.split("\n") if trait.strip()]


class Question(models.Model):
    """성격 테스트 질문"""

    text = models.TextField(verbose_name="질문 내용")
    order = models.IntegerField(default=0, verbose_name="순서")

    class Meta:
        verbose_name = "질문"
        verbose_name_plural = "질문들"
        ordering = ["order"]

    def __str__(self):
        return f"{self.order}. {self.text[:50]}"


class Answer(models.Model):
    """질문에 대한 답변 선택지"""

    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers", verbose_name="질문"
    )
    text = models.CharField(max_length=300, verbose_name="답변 내용")
    character = models.ForeignKey(
        Character,
        on_delete=models.CASCADE,
        related_name="answers",
        verbose_name="연관 캐릭터",
    )
    score = models.IntegerField(default=1, verbose_name="점수")

    class Meta:
        verbose_name = "답변"
        verbose_name_plural = "답변들"

    def __str__(self):
        return f"{self.question.order}번 - {self.text[:30]} ({self.character.name})"


class TestResult(models.Model):
    """테스트 결과 저장"""

    character = models.ForeignKey(
        Character, on_delete=models.CASCADE, verbose_name="결과 캐릭터"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="생성 시간")

    class Meta:
        verbose_name = "테스트 결과"
        verbose_name_plural = "테스트 결과들"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.character.name} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
