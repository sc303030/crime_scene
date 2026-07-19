(function () {
    const characters = window.CRIME_SCENE_CHARACTERS || [];

    const axisPairs = {
        E: ["E", "I", "EI"],
        I: ["I", "E", "EI"],
        S: ["S", "N", "SN"],
        N: ["N", "S", "SN"],
        T: ["T", "F", "TF"],
        F: ["F", "T", "TF"],
        J: ["J", "P", "JP"],
        P: ["P", "J", "JP"],
    };

    const axisSigns = {
        E: 1,
        I: -1,
        N: 1,
        S: -1,
        T: 1,
        F: -1,
        J: 1,
        P: -1,
    };

    const tagAliases = {
        관계: ["관계", "사랑", "친구", "가족", "소속", "공동체", "돌봄"],
        전략: ["전략", "계획", "구조", "기획", "은폐", "조작", "위장", "장기"],
        규칙: ["규칙", "절차", "원칙", "시간", "관리", "책임", "검증"],
        현장: ["현장", "실용", "기술", "도구", "동선", "생존", "몸", "행동"],
        이미지: ["이미지", "평판", "체면", "인기", "명성", "무대", "스타"],
        권력: ["권력", "통제", "지휘", "리더십", "조직", "위계", "소유"],
        감정: ["감정", "상처", "불안", "억울", "원한", "헌신", "보호"],
        호기심: ["호기심", "질문", "관찰", "분석", "정보", "직관", "추리"],
        경쟁: ["경쟁", "승부", "승부욕", "성취", "야망", "성과"],
        예술: ["예술", "창작", "음악", "작품", "감각", "완성도"],
    };

    const questions = [
        {
            text: "사건 현장에 들어가면 먼저 사람들에게 말을 걸어 반응을 확인한다.",
            axis: "E",
            axisLabel: "E/I 에너지 방향",
            agreeTags: ["질문", "관계"],
            disagreeTags: ["관찰", "분석"],
        },
        {
            text: "중요한 단서는 대화보다 조용히 혼자 살펴볼 때 더 잘 보인다.",
            axis: "I",
            axisLabel: "E/I 에너지 방향",
            agreeTags: ["관찰", "분석"],
            disagreeTags: ["질문", "관계"],
        },
        {
            text: "의심받는 순간에도 내 논리를 공개적으로 정리하며 판을 뒤집는 편이다.",
            axis: "E",
            axisLabel: "E/I 에너지 방향",
            agreeTags: ["리더십", "압박"],
            disagreeTags: ["방어", "신중"],
        },
        {
            text: "혼란스러운 회의보다 짧은 일대일 심문에서 상대의 빈틈을 더 잘 찾는다.",
            axis: "I",
            axisLabel: "E/I 에너지 방향",
            agreeTags: ["관찰", "전략"],
            disagreeTags: ["관계", "설득"],
        },
        {
            text: "처음 만난 용의자들과도 빠르게 농담하거나 분위기를 풀 수 있다.",
            axis: "E",
            axisLabel: "E/I 에너지 방향",
            agreeTags: ["즉흥", "관계"],
            disagreeTags: ["거리감", "관찰"],
        },
        {
            text: "많은 사람이 동시에 말하면 피로해지고, 메모와 사진을 다시 보는 쪽이 편하다.",
            axis: "I",
            axisLabel: "E/I 에너지 방향",
            agreeTags: ["기록", "분석"],
            disagreeTags: ["토론", "압박"],
        },
        {
            text: "가설을 세울 때는 상징이나 관계의 패턴보다 눈앞의 물증을 먼저 믿는다.",
            axis: "S",
            axisLabel: "S/N 정보 수집",
            agreeTags: ["물증", "현장", "검증"],
            disagreeTags: ["직관", "구조"],
        },
        {
            text: "작은 단서 하나를 보면 그 뒤에 숨은 큰 이야기부터 상상한다.",
            axis: "N",
            axisLabel: "S/N 정보 수집",
            agreeTags: ["직관", "구조", "추리"],
            disagreeTags: ["물증", "절차"],
        },
        {
            text: "알리바이는 감보다 시간, 이동 경로, 접근 가능성으로 좁혀야 한다.",
            axis: "S",
            axisLabel: "S/N 정보 수집",
            agreeTags: ["절차", "검증", "현장"],
            disagreeTags: ["직관", "관계"],
        },
        {
            text: "사람의 말투와 관계 변화만 봐도 숨기는 동기를 어느 정도 감지한다.",
            axis: "N",
            axisLabel: "S/N 정보 수집",
            agreeTags: ["직관", "관계", "감정"],
            disagreeTags: ["물증", "거리감"],
        },
        {
            text: "사건을 풀 때는 가능성이 넓은 가설보다 지금 증명 가능한 사실을 선호한다.",
            axis: "S",
            axisLabel: "S/N 정보 수집",
            agreeTags: ["현실", "검증", "책임"],
            disagreeTags: ["상상", "가능성"],
        },
        {
            text: "단서가 부족해도 전체 구조가 보이면 과감하게 방향을 잡을 수 있다.",
            axis: "N",
            axisLabel: "S/N 정보 수집",
            agreeTags: ["전략", "직관", "리더십"],
            disagreeTags: ["신중", "절차"],
        },
        {
            text: "범인을 설득할 때 감정 호소보다 모순과 손익을 정확히 찌르는 편이다.",
            axis: "T",
            axisLabel: "T/F 판단 기준",
            agreeTags: ["논리", "압박", "분석"],
            disagreeTags: ["공감", "관계"],
        },
        {
            text: "누군가 거짓말을 해도 그 사람이 왜 그랬는지부터 이해하려고 한다.",
            axis: "F",
            axisLabel: "T/F 판단 기준",
            agreeTags: ["공감", "관계", "보호"],
            disagreeTags: ["논리", "검증"],
        },
        {
            text: "팀의 분위기가 상하더라도 결정적 증거가 있으면 바로 지적한다.",
            axis: "T",
            axisLabel: "T/F 판단 기준",
            agreeTags: ["직설", "검증", "책임"],
            disagreeTags: ["조율", "관계"],
        },
        {
            text: "사람이 극단적인 선택을 하는 이유에는 오래 쌓인 감정이 있다고 보는 편이다.",
            axis: "F",
            axisLabel: "T/F 판단 기준",
            agreeTags: ["감정", "원한", "관계"],
            disagreeTags: ["손익", "논리"],
        },
        {
            text: "위기 상황에서는 냉정하게 책임 소재를 가르는 것이 먼저다.",
            axis: "T",
            axisLabel: "T/F 판단 기준",
            agreeTags: ["책임", "원칙", "통제"],
            disagreeTags: ["공감", "보호"],
        },
        {
            text: "결과가 맞더라도 누군가를 몰아붙이는 방식이 지나치면 불편하다.",
            axis: "F",
            axisLabel: "T/F 판단 기준",
            agreeTags: ["공감", "조율", "관계"],
            disagreeTags: ["압박", "승부"],
        },
        {
            text: "조사할 때는 순서와 역할을 먼저 정해야 마음이 놓인다.",
            axis: "J",
            axisLabel: "J/P 생활 양식",
            agreeTags: ["계획", "규칙", "통제"],
            disagreeTags: ["즉흥", "현장"],
        },
        {
            text: "정해진 계획보다 현장에서 새 단서를 보고 바로 움직이는 쪽이 낫다.",
            axis: "P",
            axisLabel: "J/P 생활 양식",
            agreeTags: ["즉흥", "현장", "적응"],
            disagreeTags: ["계획", "절차"],
        },
        {
            text: "비밀을 숨겨야 한다면 표정 관리보다 흔적을 구조적으로 지우는 데 집중한다.",
            axis: "J",
            axisLabel: "J/P 생활 양식",
            agreeTags: ["전략", "은폐", "통제"],
            disagreeTags: ["즉흥", "연기"],
        },
        {
            text: "압박 질문이 들어오면 완벽한 답보다 그 순간의 순발력으로 빠져나간다.",
            axis: "P",
            axisLabel: "J/P 생활 양식",
            agreeTags: ["순발력", "즉흥", "방어"],
            disagreeTags: ["계획", "논리"],
        },
        {
            text: "나는 판을 지휘하는 대표나 감독 역할이 비교적 잘 맞는다.",
            axis: "J",
            axisLabel: "J/P 생활 양식",
            agreeTags: ["리더십", "권력", "통제"],
            disagreeTags: ["독립", "현장"],
        },
        {
            text: "정답을 찾는 과정에서는 우회로, 변칙 질문, 뜻밖의 행동도 필요하다.",
            axis: "P",
            axisLabel: "J/P 생활 양식",
            agreeTags: ["변칙", "질문", "호기심"],
            disagreeTags: ["규칙", "절차"],
        },
        {
            text: "명성이나 체면이 무너지면 사람은 예상보다 훨씬 위험해질 수 있다.",
            axis: "J",
            axisLabel: "보조 성향",
            agreeTags: ["이미지", "체면", "위기"],
            disagreeTags: ["자유", "즉흥"],
        },
        {
            text: "사랑, 충성, 소속감은 돈이나 지위보다 강한 동기가 될 때가 많다.",
            axis: "F",
            axisLabel: "보조 성향",
            agreeTags: ["사랑", "충성", "소속"],
            disagreeTags: ["돈", "권력"],
        },
        {
            text: "생존이 걸린 상황에서는 규칙보다 빠른 판단과 행동이 우선이다.",
            axis: "P",
            axisLabel: "보조 성향",
            agreeTags: ["생존", "현장", "위험감수"],
            disagreeTags: ["규칙", "책임"],
        },
        {
            text: "작품, 무대, 취향 같은 감각적 요소가 사람의 욕망을 크게 움직인다고 본다.",
            axis: "N",
            axisLabel: "보조 성향",
            agreeTags: ["예술", "이미지", "감각"],
            disagreeTags: ["현실", "절차"],
        },
    ];

    const scaleOptions = [
        { value: 5, label: "확실히 채택", marker: "A", tone: "agree", size: "xl" },
        { value: 4, label: "채택", marker: "B", tone: "agree", size: "md" },
        { value: 3, label: "보류", marker: "C", tone: "neutral", size: "sm" },
        { value: 2, label: "배제", marker: "D", tone: "disagree", size: "md" },
        { value: 1, label: "확실히 배제", marker: "E", tone: "disagree", size: "xl" },
    ];

    const els = {
        quizView: document.getElementById("quiz-view"),
        resultView: document.getElementById("result-view"),
        questionCount: document.getElementById("question-count"),
        progressLabel: document.getElementById("progress-label"),
        progressFill: document.getElementById("progress-fill"),
        axisLabel: document.getElementById("axis-label"),
        questionText: document.getElementById("question-text"),
        answerScale: document.getElementById("answer-scale"),
        prevButton: document.getElementById("prev-button"),
        nextButton: document.getElementById("next-button"),
        resultTitle: document.getElementById("result-title"),
        resultSubtitle: document.getElementById("result-subtitle"),
        resultMbti: document.getElementById("result-mbti"),
        resultConfidence: document.getElementById("result-confidence"),
        resultSeason: document.getElementById("result-season"),
        resultDescription: document.getElementById("result-description"),
        resultTags: document.getElementById("result-tags"),
        axisBars: document.getElementById("axis-bars"),
        relatedList: document.getElementById("related-list"),
        shareButton: document.getElementById("share-button"),
        copyButton: document.getElementById("copy-button"),
        restartButton: document.getElementById("restart-button"),
        shareStatus: document.getElementById("share-status"),
    };

    let currentIndex = 0;
    let answers = new Array(questions.length).fill(null);
    let latestResult = null;
    let autoAdvanceTimer = null;

    function opposite(letter) {
        return axisPairs[letter][1];
    }

    function axisKey(letter) {
        return axisPairs[letter][2];
    }

    function axisDisplay(key, score) {
        const labels = {
            EI: ["I", "E"],
            SN: ["S", "N"],
            TF: ["F", "T"],
            JP: ["P", "J"],
        };
        const [left, right] = labels[key];
        const maxScore = questions.filter((question) => axisKey(question.axis) === key).length * 2;
        const percent = Math.round(((score + maxScore) / (maxScore * 2)) * 100);
        return { left, right, percent: Math.max(0, Math.min(100, percent)) };
    }

    function normalizeText(value) {
        return String(value || "").replace(/\s+/g, "");
    }

    function addTags(tagScores, tags, amount) {
        tags.forEach((tag) => {
            tagScores[tag] = (tagScores[tag] || 0) + amount;
        });
    }

    function calculateProfile() {
        const axisScores = { EI: 0, SN: 0, TF: 0, JP: 0 };
        const tagScores = {};

        answers.forEach((answerValue, index) => {
            if (!answerValue) return;
            const question = questions[index];
            const centered = answerValue - 3;
            const key = axisKey(question.axis);

            axisScores[key] += centered * axisSigns[question.axis];

            if (centered > 0) {
                addTags(tagScores, question.agreeTags, centered);
            } else if (centered < 0) {
                addTags(tagScores, question.disagreeTags, Math.abs(centered));
            }
        });

        const mbti = [
            axisScores.EI >= 0 ? "E" : "I",
            axisScores.SN >= 0 ? "N" : "S",
            axisScores.TF >= 0 ? "T" : "F",
            axisScores.JP >= 0 ? "J" : "P",
        ].join("");

        return { axisScores, tagScores, mbti };
    }

    function affinity(character, tag) {
        const aliases = tagAliases[tag] || [tag];
        const haystack = normalizeText(
            [character.name, character.position, character.description, ...(character.tags || [])].join(" ")
        );
        let score = 0;

        aliases.forEach((alias) => {
            if (haystack.includes(normalizeText(alias))) score += 1;
        });

        if (haystack.includes(normalizeText(tag))) score += 1;
        return Math.min(score, 3);
    }

    function scoreCharacter(character, profile) {
        let score = 0;

        if (character.mbti && character.mbti !== "NONE") {
            for (let i = 0; i < 4; i += 1) {
                if (character.mbti[i] === profile.mbti[i]) score += 14;
            }
            if (character.mbti === profile.mbti) score += 18;
        }

        Object.entries(profile.tagScores).forEach(([tag, amount]) => {
            score += affinity(character, tag) * amount * 2.4;
        });

        if ((character.position || "").includes("피해자")) score -= 8;
        if (character.mbti === "NONE") score -= 14;

        return score;
    }

    function rankCharacters(profile) {
        return characters
            .map((character) => ({
                ...character,
                score: scoreCharacter(character, profile),
            }))
            .sort((a, b) => b.score - a.score);
    }

    function confidenceFromScores(top, second) {
        if (!top) return 0;
        const gap = second ? Math.max(0, top.score - second.score) : 16;
        const base = Math.min(96, Math.max(58, Math.round(62 + top.score / 3 + gap)));
        return base;
    }

    function clearAutoAdvance() {
        if (autoAdvanceTimer) {
            window.clearTimeout(autoAdvanceTimer);
            autoAdvanceTimer = null;
        }
    }

    function moveNext() {
        if (!answers[currentIndex]) return;
        if (currentIndex === questions.length - 1) {
            completeQuiz();
            return;
        }
        currentIndex += 1;
        renderQuestion();
    }

    function scheduleAutoAdvance() {
        clearAutoAdvance();
        autoAdvanceTimer = window.setTimeout(() => {
            autoAdvanceTimer = null;
            moveNext();
        }, 180);
    }

    function renderQuestion() {
        const question = questions[currentIndex];
        const answered = answers[currentIndex];
        const progress = Math.round((currentIndex / questions.length) * 100);

        els.questionCount.textContent = `${currentIndex + 1} / ${questions.length}`;
        els.progressLabel.textContent = `${progress}%`;
        els.progressFill.style.width = `${progress}%`;
        els.axisLabel.textContent = question.axisLabel;
        els.questionText.textContent = question.text;
        els.prevButton.disabled = currentIndex === 0;
        els.nextButton.disabled = !answered;
        els.nextButton.textContent = currentIndex === questions.length - 1 ? "결과 보기" : "다음";

        els.answerScale.innerHTML = "";
        scaleOptions.forEach((option) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = [
                "scale-option",
                `scale-option-${option.tone}`,
                `scale-option-${option.size}`,
                answered === option.value ? "is-selected" : "",
            ].filter(Boolean).join(" ");
            button.setAttribute("aria-label", option.label);
            button.title = option.label;
            button.innerHTML = `
                <span class="option-dot" aria-hidden="true">${option.marker}</span>
                <span class="option-label">${option.label}</span>
            `;
            button.addEventListener("click", () => {
                answers[currentIndex] = option.value;
                renderQuestion();
                scheduleAutoAdvance();
            });
            els.answerScale.appendChild(button);
        });
    }

    function renderAxisBars(profile) {
        const items = [
            ["EI", "접촉 방식"],
            ["SN", "단서 해석"],
            ["TF", "판단 근거"],
            ["JP", "수사 리듬"],
        ];

        els.axisBars.innerHTML = "";
        items.forEach(([key, label]) => {
            const axis = axisDisplay(key, profile.axisScores[key]);
            const row = document.createElement("div");
            row.className = "axis-bar";
            row.innerHTML = `
                <div class="axis-bar-label">
                    <span>${label}: ${axis.left}</span>
                    <span>${axis.right}</span>
                </div>
                <div class="axis-bar-track">
                    <div class="axis-bar-fill" style="width: ${axis.percent}%"></div>
                </div>
            `;
            els.axisBars.appendChild(row);
        });
    }

    function renderTags(character) {
        els.resultTags.innerHTML = "";
        (character.tags || []).slice(0, 6).forEach((tag) => {
            const item = document.createElement("span");
            item.textContent = tag;
            els.resultTags.appendChild(item);
        });
    }

    function renderRelated(related) {
        els.relatedList.innerHTML = "";
        related.forEach((character) => {
            const card = document.createElement("article");
            card.className = "related-card";
            card.innerHTML = `
                <strong>${character.name}</strong>
                <span>기록 S${character.season} · ${character.episode} · ${character.originalMbti}</span>
                <p>${character.description}</p>
            `;
            els.relatedList.appendChild(card);
        });
    }

    function showResult(result, profile, ranked) {
        latestResult = { result, profile, ranked };

        const confidence = confidenceFromScores(ranked[0], ranked[1]);
        els.quizView.hidden = true;
        els.resultView.hidden = false;
        els.resultTitle.textContent = result.name;
        els.resultSubtitle.textContent = `매칭 기록: S${result.season} · ${result.episode} · ${result.position}`;
        els.resultMbti.textContent = result.originalMbti;
        els.resultConfidence.textContent = `${confidence}%`;
        els.resultSeason.textContent = `S${result.season}`;
        els.resultDescription.textContent = result.description;

        renderTags(result);
        renderAxisBars(profile);
        renderRelated(ranked.slice(1, 3));

        const url = new URL(window.location.href);
        url.searchParams.set("result", result.id);
        window.history.replaceState(null, "", url);
    }

    function completeQuiz() {
        const profile = calculateProfile();
        const ranked = rankCharacters(profile);
        showResult(ranked[0], profile, ranked);
    }

    function showSharedResult(id) {
        const result = characters.find((character) => character.id === id);
        if (!result) return false;

        const profile = {
            mbti: result.mbti === "NONE" ? "----" : result.mbti,
            axisScores: {
                EI: result.mbti.includes("E") ? 8 : -8,
                SN: result.mbti.includes("N") ? 8 : -8,
                TF: result.mbti.includes("T") ? 8 : -8,
                JP: result.mbti.includes("J") ? 8 : -8,
            },
            tagScores: Object.fromEntries((result.tags || []).map((tag) => [tag, 2])),
        };
        const ranked = rankCharacters(profile).filter((character) => character.id !== result.id);
        showResult(result, profile, [result, ...ranked]);
        return true;
    }

    function currentShareUrl() {
        const url = new URL(window.location.href);
        if (latestResult) url.searchParams.set("result", latestResult.result.id);
        return url.toString();
    }

    async function copyShareLink() {
        const url = currentShareUrl();
        try {
            await navigator.clipboard.writeText(url);
            els.shareStatus.textContent = "사건 링크를 복사했습니다.";
        } catch (error) {
            els.shareStatus.textContent = url;
        }
    }

    async function shareResult() {
        const result = latestResult && latestResult.result;
        const url = currentShareUrl();
        const text = result
            ? `내 성향 파일은 크라임씬 ${result.name} 기록과 가장 가깝게 나왔어.`
            : "크라임씬 성향 감식 기록";

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "크라임씬 성향 감식 기록",
                    text,
                    url,
                });
                els.shareStatus.textContent = "리포트 공유 창을 열었습니다.";
                return;
            } catch (error) {
                if (error.name === "AbortError") return;
            }
        }

        await copyShareLink();
    }

    function restart() {
        clearAutoAdvance();
        answers = new Array(questions.length).fill(null);
        currentIndex = 0;
        latestResult = null;
        els.quizView.hidden = false;
        els.resultView.hidden = true;
        els.shareStatus.textContent = "";
        window.history.replaceState(null, "", window.location.pathname);
        renderQuestion();
    }

    els.prevButton.addEventListener("click", () => {
        clearAutoAdvance();
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderQuestion();
        }
    });

    els.nextButton.addEventListener("click", () => {
        clearAutoAdvance();
        moveNext();
    });

    els.shareButton.addEventListener("click", shareResult);
    els.copyButton.addEventListener("click", copyShareLink);
    els.restartButton.addEventListener("click", restart);

    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get("result");
    if (!sharedId || !showSharedResult(sharedId)) {
        renderQuestion();
    }
})();
