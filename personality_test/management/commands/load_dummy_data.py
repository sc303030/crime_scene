from django.core.management.base import BaseCommand
from personality_test.models import Character, Question, Answer


class Command(BaseCommand):
    help = "크라임씬 성격 테스트 더미 데이터 로드"

    def handle(self, *args, **kwargs):
        # 기존 데이터 삭제
        Character.objects.all().delete()
        Question.objects.all().delete()

        self.stdout.write("기존 데이터 삭제 완료")

        # 캐릭터 생성
        characters = [
            {
                "name": "냉철한 분석가",
                "description": "당신은 논리적이고 이성적인 판단을 중요시하는 사람입니다. 감정보다는 사실과 증거를 바탕으로 상황을 파악하며, 사건의 진상을 밝히는 데 탁월한 능력을 보입니다.",
                "traits": "논리적 사고\n객관적 판단\n섬세한 관찰력\n침착한 성격\n분석적 접근",
            },
            {
                "name": "열정적인 수사관",
                "description": "당신은 직관력이 뛰어나고 행동력이 강한 사람입니다. 사건 해결에 대한 열정이 넘치며, 때로는 과감한 추리와 행동으로 진실에 다가갑니다.",
                "traits": "강한 직관력\n적극적인 태도\n뛰어난 순발력\n열정적인 성격\n과감한 결단력",
            },
            {
                "name": "신중한 전략가",
                "description": "당신은 모든 가능성을 고려하고 신중하게 판단하는 사람입니다. 한 발 물러서서 전체 상황을 파악하고, 치밀한 계획으로 사건을 해결합니다.",
                "traits": "신중한 판단\n전략적 사고\n주의 깊은 관찰\n계획적인 접근\n체계적 분석",
            },
            {
                "name": "따뜻한 공감자",
                "description": "당신은 사람들의 감정을 잘 이해하고 공감하는 능력이 뛰어난 사람입니다. 사건 속 인물들의 심리를 파악하여 진실을 찾아냅니다.",
                "traits": "높은 공감 능력\n뛰어난 심리 파악\n따뜻한 성격\n대인관계 중시\n섬세한 관찰",
            },
        ]

        created_characters = []
        for char_data in characters:
            character = Character.objects.create(**char_data)
            created_characters.append(character)
            self.stdout.write(f"캐릭터 생성: {character.name}")

        # 질문 및 답변 생성
        questions_data = [
            {
                "text": "친구가 갑자기 사라졌다는 연락을 받았습니다. 어떻게 하시겠습니까?",
                "answers": [
                    {
                        "text": "먼저 친구의 평소 행동 패턴과 마지막 통화 내용을 떠올려본다",
                        "character_idx": 0,
                        "score": 3,
                    },
                    {
                        "text": "바로 친구가 자주 가는 장소들을 찾아다닌다",
                        "character_idx": 1,
                        "score": 3,
                    },
                    {
                        "text": "친구와 가까운 사람들에게 연락해서 정보를 수집한다",
                        "character_idx": 2,
                        "score": 3,
                    },
                    {
                        "text": "친구의 최근 감정 상태를 생각하며 어디로 갔을지 추측한다",
                        "character_idx": 3,
                        "score": 3,
                    },
                ],
            },
            {
                "text": "사건 현장에서 이상한 물건을 발견했습니다. 어떻게 하시겠습니까?",
                "answers": [
                    {
                        "text": "물건의 위치, 상태, 주변 환경을 꼼꼼히 기록한다",
                        "character_idx": 0,
                        "score": 3,
                    },
                    {
                        "text": "직감적으로 이 물건이 중요한 단서라고 생각하고 관련성을 찾는다",
                        "character_idx": 1,
                        "score": 3,
                    },
                    {
                        "text": "다른 증거들과 비교하며 이 물건의 의미를 분석한다",
                        "character_idx": 2,
                        "score": 3,
                    },
                    {
                        "text": "이 물건의 주인이 어떤 심정이었을지 상상해본다",
                        "character_idx": 3,
                        "score": 3,
                    },
                ],
            },
            {
                "text": "용의자의 진술이 모순되는 부분이 있습니다. 어떻게 하시겠습니까?",
                "answers": [
                    {
                        "text": "진술의 시간대와 장소를 정리해서 논리적 모순을 찾는다",
                        "character_idx": 0,
                        "score": 3,
                    },
                    {
                        "text": "직접적으로 모순점을 지적하며 진실을 밝혀낸다",
                        "character_idx": 1,
                        "score": 3,
                    },
                    {
                        "text": "일단 모든 진술을 듣고 전체적인 맥락에서 모순을 파악한다",
                        "character_idx": 2,
                        "score": 3,
                    },
                    {
                        "text": "용의자가 왜 거짓말을 할 수밖에 없었는지 이유를 생각한다",
                        "character_idx": 3,
                        "score": 3,
                    },
                ],
            },
            {
                "text": "사건 해결의 실마리가 보이지 않습니다. 어떻게 하시겠습니까?",
                "answers": [
                    {
                        "text": "처음부터 다시 증거들을 검토하며 놓친 부분을 찾는다",
                        "character_idx": 0,
                        "score": 3,
                    },
                    {
                        "text": "새로운 시각으로 사건을 바라보며 과감한 가설을 세운다",
                        "character_idx": 1,
                        "score": 3,
                    },
                    {
                        "text": "전체 사건을 재구성하며 빠진 퍼즐 조각이 무엇인지 찾는다",
                        "character_idx": 2,
                        "score": 3,
                    },
                    {
                        "text": "사건 관련자들의 관계와 감정선을 다시 살펴본다",
                        "character_idx": 3,
                        "score": 3,
                    },
                ],
            },
            {
                "text": "두 명의 목격자가 서로 다른 증언을 합니다. 어떻게 하시겠습니까?",
                "answers": [
                    {
                        "text": "각 증언의 구체적인 내용을 비교 분석한다",
                        "character_idx": 0,
                        "score": 3,
                    },
                    {
                        "text": "직감적으로 더 신빙성 있어 보이는 증언을 선택한다",
                        "character_idx": 1,
                        "score": 3,
                    },
                    {
                        "text": "다른 증거들과 대조하며 어느 증언이 사실에 가까운지 판단한다",
                        "character_idx": 2,
                        "score": 3,
                    },
                    {
                        "text": "각 목격자의 입장에서 왜 그렇게 기억할 수 있는지 생각한다",
                        "character_idx": 3,
                        "score": 3,
                    },
                ],
            },
            {
                "text": "범인을 거의 특정했지만 결정적 증거가 부족합니다. 어떻게 하시겠습니까?",
                "answers": [
                    {
                        "text": "현재까지의 증거를 체계적으로 정리해 논리적으로 설득한다",
                        "character_idx": 0,
                        "score": 3,
                    },
                    {
                        "text": "과감하게 범인을 압박하며 자백을 유도한다",
                        "character_idx": 1,
                        "score": 3,
                    },
                    {
                        "text": "다각도로 사건을 재검토하며 놓친 증거를 찾는다",
                        "character_idx": 2,
                        "score": 3,
                    },
                    {
                        "text": "범인의 심리를 파고들어 진실을 말하도록 유도한다",
                        "character_idx": 3,
                        "score": 3,
                    },
                ],
            },
            {
                "text": "사건 해결 후 동료들과 회식을 합니다. 주로 어떤 이야기를 하시나요?",
                "answers": [
                    {
                        "text": "사건의 증거들을 어떻게 분석했는지 논리적으로 설명한다",
                        "character_idx": 0,
                        "score": 3,
                    },
                    {
                        "text": "사건 해결 과정의 흥미진진한 순간들을 이야기한다",
                        "character_idx": 1,
                        "score": 3,
                    },
                    {
                        "text": "전체적인 수사 전략이 어떻게 성공했는지 공유한다",
                        "character_idx": 2,
                        "score": 3,
                    },
                    {
                        "text": "사건 관련자들의 이야기를 들으며 느낀 점을 나눈다",
                        "character_idx": 3,
                        "score": 3,
                    },
                ],
            },
            {
                "text": "새로운 사건을 맡게 되었습니다. 첫 번째로 하는 일은?",
                "answers": [
                    {
                        "text": "사건 파일을 면밀히 검토하고 데이터를 분석한다",
                        "character_idx": 0,
                        "score": 3,
                    },
                    {
                        "text": "바로 현장으로 가서 직접 상황을 파악한다",
                        "character_idx": 1,
                        "score": 3,
                    },
                    {
                        "text": "수사 계획을 세우고 우선순위를 정한다",
                        "character_idx": 2,
                        "score": 3,
                    },
                    {
                        "text": "관련자들을 만나 이야기를 들으며 관계를 파악한다",
                        "character_idx": 3,
                        "score": 3,
                    },
                ],
            },
        ]

        for idx, q_data in enumerate(questions_data):
            question = Question.objects.create(text=q_data["text"], order=idx)
            self.stdout.write(f"질문 생성: {question.text[:30]}...")

            for a_data in q_data["answers"]:
                Answer.objects.create(
                    question=question,
                    text=a_data["text"],
                    character=created_characters[a_data["character_idx"]],
                    score=a_data["score"],
                )

        self.stdout.write(self.style.SUCCESS("✅ 더미 데이터 로드 완료!"))
        self.stdout.write(f"캐릭터: {Character.objects.count()}개")
        self.stdout.write(f"질문: {Question.objects.count()}개")
        self.stdout.write(f"답변: {Answer.objects.count()}개")
