from django.contrib import admin
from .models import Character, Question, Answer, TestResult


@admin.register(Character)
class CharacterAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    search_fields = ["name"]


class AnswerInline(admin.TabularInline):
    model = Answer
    extra = 4


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ["order", "text"]
    list_editable = ["text"]
    ordering = ["order"]
    inlines = [AnswerInline]


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ["question", "text", "character", "score"]
    list_filter = ["character", "question"]


@admin.register(TestResult)
class TestResultAdmin(admin.ModelAdmin):
    list_display = ["character", "created_at"]
    list_filter = ["character", "created_at"]
    date_hierarchy = "created_at"
