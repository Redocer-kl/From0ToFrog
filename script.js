document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. АНИМАЦИЯ ЧАТА (Intersection Observer)
    // ==========================================
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
        const messages = chatContainer.querySelectorAll('.hidden-message');
        const observerOptions = { root: null, threshold: 0.3 };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    messages.forEach((msg, index) => {
                        setTimeout(() => {
                            msg.classList.add('visible');
                        }, index * 1500);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(chatContainer);
    }

    // ==========================================
    // 2. СЛАЙДЕР ПОРТФОЛИО
    // ==========================================
    const portfolioTrack = document.querySelector('.portfolio-track');
    const portfolioSlides = document.querySelectorAll('.portfolio-slide');
    const portfolioNextBtn = document.querySelector('.portfolio-next-btn');
    const portfolioPrevBtn = document.querySelector('.portfolio-prev-btn');
    const portfolioSliderWrapper = document.querySelector('.portfolio-slider-wrapper');

    if (portfolioTrack && portfolioNextBtn && portfolioPrevBtn) {
        let portfolioIndex = 0;
        let portfolioAutoPlayInterval;
        const intervalTime = 10000;

        function updatePortfolioSlider() {
            portfolioTrack.style.transform = `translateX(-${portfolioIndex * 100}%)`;
        }

        function nextPortfolioSlide() {
            portfolioIndex = (portfolioIndex + 1) % portfolioSlides.length;
            updatePortfolioSlider();
        }

        function prevPortfolioSlide() {
            portfolioIndex = (portfolioIndex - 1 + portfolioSlides.length) % portfolioSlides.length;
            updatePortfolioSlider();
        }

        function startPortfolioAutoPlay() {
            clearInterval(portfolioAutoPlayInterval);
            portfolioAutoPlayInterval = setInterval(nextPortfolioSlide, intervalTime);
        }

        function stopPortfolioAutoPlay() {
            clearInterval(portfolioAutoPlayInterval);
        }

        portfolioNextBtn.addEventListener('click', () => {
            stopPortfolioAutoPlay();
            nextPortfolioSlide();
            startPortfolioAutoPlay();
        });

        portfolioPrevBtn.addEventListener('click', () => {
            stopPortfolioAutoPlay();
            prevPortfolioSlide();
            startPortfolioAutoPlay();
        });

        if (portfolioSliderWrapper) {
            portfolioSliderWrapper.addEventListener('mouseenter', stopPortfolioAutoPlay);
            portfolioSliderWrapper.addEventListener('mouseleave', startPortfolioAutoPlay);
        }

        startPortfolioAutoPlay();
    }

    // ==========================================
    // 3. СЛАЙДЕР ОТЗЫВОВ (Исправленный)
    // ==========================================
    const reviewTrack = document.querySelector('.review-track');
    const reviewSlides = document.querySelectorAll('.review-slide');
    const reviewNextBtn = document.querySelector('.review-next-btn'); // Новые классы
    const reviewPrevBtn = document.querySelector('.review-prev-btn'); // Новые классы

    if (reviewTrack && reviewNextBtn && reviewPrevBtn) {
        let reviewIndex = 0;

        function updateReviewSlider() {
            reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;
        }

        reviewNextBtn.addEventListener('click', () => {
            reviewIndex = (reviewIndex + 1) % reviewSlides.length;
            updateReviewSlider();
        });

        reviewPrevBtn.addEventListener('click', () => {
            reviewIndex = (reviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
            updateReviewSlider();
        });
    }

    // ==========================================
    // 4. ЛОГИКА КВИЗА
    // ==========================================
    const quizData = [
        {
            question: "Чем ты больше всего любишь заниматься в свободное время?",
            answers: [
                { text: "Играть в крутые 3D-игры (Roblox, Minecraft)", points: { junior: 0, middle: 2, senior: 0 } },
                { text: "Смотреть YouTube/TikTok и играть в простые игры", points: { junior: 2, middle: 0, senior: 0 } },
                { text: "Зависать в интернете, смотреть как работают сайты", points: { junior: 0, middle: 0, senior: 2 } },
                { text: "Пытаюсь понять, как заработать деньги в IT", points: { junior: 0, middle: 0, senior: 3 } }
            ]
        },
        {
            question: "Если бы ты создавал свой проект, что бы это было?",
            answers: [
                { text: "Мощный сайт или приложение с нейросетями", points: { junior: 0, middle: 0, senior: 2 } },
                { text: "Своя собственная игра с открытым миром", points: { junior: 0, middle: 2, senior: 0 } },
                { text: "Веселый мультик или мини-игра для друзей", points: { junior: 2, middle: 0, senior: 0 } },
                { text: "Секретный сервер для хакеров", points: { junior: 0, middle: 1, senior: 2 } }
            ]
        },
        {
            question: "Какая суперспособность в программировании тебе нужна?",
            answers: [
                { text: "Оживлять персонажей из кубиков и блоков", points: { junior: 2, middle: 1, senior: 0 } },
                { text: "Понимать сложный код и писать серьезные программы", points: { junior: 0, middle: 0, senior: 2 } },
                { text: "Создавать целые миры и писать для них сценарии", points: { junior: 0, middle: 2, senior: 0 } },
                { text: "Быстро и весело собирать проекты как из Лего", points: { junior: 2, middle: 0, senior: 0 } }
            ]
        },
        {
            question: "Представь, что в твоей программе или игре случился баг (ошибка). Твои действия?",
            answers: [
                { text: "Попробую изменить правила игры и скажу, что это не баг, а фича!", points: { junior: 0, middle: 2, senior: 0 } },
                { text: "Буду копаться в коде и искать запятую, пока всё не заработает", points: { junior: 0, middle: 0, senior: 2 } },
                { text: "Позову кого-нибудь на помощь или попробую переделать заново", points: { junior: 2, middle: 0, senior: 0 } },
                { text: "Спрошу у Гугла или нейросети, они точно знают решение", points: { junior: 0, middle: 1, senior: 1 } }
            ]
        },
        {
            question: "Если бы ты мог заглянуть внутрь компьютера, что бы тебя больше всего заинтересовало?",
            answers: [
                { text: "Как картинки и звуки превращаются в весёлую игру", points: { junior: 2, middle: 0, senior: 0 } },
                { text: "Как работают 3D-модели, физика и гравитация объектов", points: { junior: 0, middle: 2, senior: 0 } },
                { text: "Как миллионы строчек кода и данных летают по серверам", points: { junior: 0, middle: 0, senior: 2 } }
            ]
        },
        {
            question: "🐸 Минутка фантазии: ты строишь цифровое болото для лягушек. Какую фичу добавишь первой?",
            answers: [
                { text: "Яркие скины для лягушек и забавную музыку на фоне", points: { junior: 2, middle: 0, senior: 0 } },
                { text: "Редактор уровней, чтобы игроки сами строили препятствия", points: { junior: 0, middle: 2, senior: 0 } },
                { text: "Базу данных всех головастиков и автовыдачу мух", points: { junior: 0, middle: 0, senior: 2 } },
                { text: "Мультиплеер, чтобы прыгать по кувшинкам вместе с друзьями", points: { junior: 1, middle: 1, senior: 0 } }
            ]
        }
    ];

    const resultsData = {
        junior: {
            title: "Ты — FROG SCOUT! 🐸🎒",
            text: "Твой путь только начинается, юный первооткрыватель! Тебе идеально подойдет курс по Компьютерной грамотности и создание первых игр на Scratch. Будет весело, легко и очень увлекательно!",
            img: "static/Junior.png",
            colorClass: "color-junior"
        },
        middle: {
            title: "Ты — GAME MASTER! 🐸🎮",
            text: "Ты рожден для геймдева и создания собственных вселенных! Твой выбор — миры в Roblox и серьезная разработка на Unity. Пора переходить от игр к их созданию и выпускать свои хиты!",
            img: "static/Middle.png",
            colorClass: "color-middle"
        },
        senior: {
            title: "Ты — CODE ARCHITECT! 🐸🏗️",
            text: "Ты мыслишь масштабно, как настоящий проектировщик систем. Тебя ждут серьезные проекты, создание сайтов с нуля, Python и реальная магия бэкенда. Время строить сложные цифровые миры!",
            img: "static/Senior.png",
            colorClass: "color-senior"
        }
    };

    let currentQuestionIndex = 0;
    let userScores = { junior: 0, middle: 0, senior: 0 };

    const questionEl = document.getElementById("quiz-question");
    const answersEl = document.getElementById("quiz-answers");
    const stepEl = document.getElementById("quiz-step");
    const quizContainer = document.getElementById("quiz-container");
    const resultContainer = document.getElementById("quiz-result");

    function startQuiz() {
        currentQuestionIndex = 0;
        userScores = { junior: 0, middle: 0, senior: 0 };
        if (quizContainer) quizContainer.classList.remove("d-none");
        if (resultContainer) resultContainer.classList.add("d-none");
        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        if (stepEl) stepEl.innerText = `Вопрос ${currentQuestionIndex + 1} / ${quizData.length}`;
        if (questionEl) questionEl.innerText = currentQuestion.question;

        if (answersEl) {
            answersEl.innerHTML = "";
            currentQuestion.answers.forEach(answer => {
                const button = document.createElement("button");
                button.innerText = answer.text;
                button.classList.add("btn", "quiz-btn-answer");
                button.onclick = () => selectAnswer(answer.points);
                answersEl.appendChild(button);
            });
        }
    }

    function selectAnswer(points) {
        userScores.junior += points.junior;
        userScores.middle += points.middle;
        userScores.senior += points.senior;

        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        if (quizContainer) quizContainer.classList.add("d-none");
        if (resultContainer) resultContainer.classList.remove("d-none");

        let maxScore = 0;
        let winningLevel = "junior";

        for (const [level, score] of Object.entries(userScores)) {
            if (score > maxScore) {
                maxScore = score;
                winningLevel = level;
            }
        }

        const result = resultsData[winningLevel];

        const resultImg = document.getElementById("result-img");
        if (resultImg) resultImg.src = result.img;

        const titleEl = document.getElementById("result-title");
        if (titleEl) {
            titleEl.innerText = result.title;
            titleEl.className = `fw-bold mb-2 ${result.colorClass}`;
        }

        const textEl = document.getElementById("result-text");
        if (textEl) textEl.innerText = result.text;
    }

    const quizModalEl = document.getElementById('frogQuizModal');
    if (quizModalEl) {
        quizModalEl.addEventListener('show.bs.modal', startQuiz);
    }

    const retryBtn = document.getElementById('quiz-retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', startQuiz);
    }

    // ==========================================
    // 5. НАВИГАЦИЯ И ДР. МЕЛОЧИ
    // ==========================================
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbar = document.querySelector('.navbar-collapse');
            const bsCollapse = bootstrap.Collapse.getInstance(navbar);
            if (bsCollapse) bsCollapse.hide();
        });
    });

    // 6. Глаза
    const pupilLeft = document.querySelector('.pupil-left');
    const pupilRight = document.querySelector('.pupil-right');

    let lastClientX = null;
    let lastClientY = null;
    let rafId = null;

    const movePupil = (pupil, clientX, clientY) => {
        if (!pupil) return;

        const eye = pupil.parentElement;
        if (!eye) return;

        const rect = eye.getBoundingClientRect();

        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const angle = Math.atan2(
            clientY - eyeCenterY, 
            clientX - eyeCenterX
        );

        const eyeRadiusX = rect.width / 2;
        const eyeRadiusY = rect.height / 2;
        const pupilRadiusX = pupil.offsetWidth / 2;
        const pupilRadiusY = pupil.offsetHeight / 2;

        const maxRadiusX = eyeRadiusX - pupilRadiusX;
        const maxRadiusY = eyeRadiusY - pupilRadiusY;

        const distance = Math.hypot(clientX - eyeCenterX, clientY - eyeCenterY);
        const maxDistance = Math.hypot(window.innerWidth, window.innerHeight);
        const intensity = Math.min(1, (distance / maxDistance) * 3);

        const moveX = maxRadiusX * intensity;
        const moveY = maxRadiusY * intensity;

        const pupilX = Math.cos(angle) * moveX;
        const pupilY = Math.sin(angle) * moveY;

        pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    };

    const updateEyes = () => {
        if (lastClientX === null || lastClientY === null) return;

        movePupil(pupilLeft, lastClientX, lastClientY);
        movePupil(pupilRight, lastClientX, lastClientY);
    };

    const scheduleUpdate = () => {
        if (rafId) return;

        rafId = requestAnimationFrame(() => {
            rafId = null;
            updateEyes();
        });
    };

    const handleMovement = (e) => {
        let clientX, clientY;

        if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        lastClientX = clientX;
        lastClientY = clientY;

        updateEyes();
    };

    document.addEventListener('mousemove', handleMovement);
    document.addEventListener('touchmove', handleMovement, { passive: true });

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    window.addEventListener('mouseleave', () => {
        lastClientX = null;
        lastClientY = null;
    });
    // 7. Партиклы

    // === НОВЫЙ КОД ДЛЯ ПАРТИКЛОВ ===

    const heroSection = document.getElementById('hero');
    const frogWrapper = heroSection.querySelector('.frog-wrapper');
    const buttons = heroSection.querySelectorAll('.btn');

    // Список символов для партиклов
    const particleSymbols = ['{ }', '</>', '< >', '0101', 'if()', '=>'];

    // Функция создания одного партикла
    const createParticle = (originElement) => {
        if (!originElement) return;

        // 1. Создаем элемент span
        const particle = document.createElement('span');
        particle.className = 'frog-particle';

        // 2. Выбираем случайный символ
        const randomSymbol = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        particle.textContent = randomSymbol;

        // 3. Рассчитываем случайный разлет (направление и дистанцию)
        // Используем CSS переменные для анимации
        const angle = Math.random() * Math.PI * 2; // Случайный угол
        const distance = 200 + Math.random() * 120; // Дистанция разлета (от 80 до 150px)

        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const tr = (Math.random() - 0.5) * 180; // Случайный поворот (от -90 до 90 градусов)

        // Записываем переменные в стайл элемента
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--tr', `${tr}deg`);

        // Позиционируем в центре обертки
        particle.style.top = '50%';
        particle.style.left = '50%';

        // 4. Добавляем партикл в DOM
        originElement.appendChild(particle);

        // 5. Автоматически удаляем элемент после завершения анимации (1с),
        // чтобы не засорять память
        setTimeout(() => {
            particle.remove();
        }, 1000);
    };

    // Функция создания "всплеска" партиклов
    const spawnParticleBurst = (originElement, count) => {
        for (let i = 0; i < count; i++) {
            // Создаем партикл с небольшой задержкой, чтобы они не вылетали одновременно
            setTimeout(() => createParticle(originElement), i * 30);
        }
    };


    // --- Настройка триггеров ---

    if (frogWrapper) {
        // ТРИГГЕР 1: Клик мышкой по всей секции Hero
        heroSection.addEventListener('click', (e) => {
            // Если мы кликнули по кнопке, всплеск не создаем (у кнопок свой триггер)
            if (e.target.classList.contains('btn')) return;

            spawnParticleBurst(frogWrapper, 15); // Большой всплеск (15 партиклов)
        });

        // ТРИГГЕР 2: Наводка на любую кнопку в секции
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                // Создаем небольшой постоянный эффект, пока мышь над кнопкой,
                // или один быстрый всплеск. Давай сделаем один всплеск.
                spawnParticleBurst(frogWrapper, 6); // Маленький всплеск (6 партиклов)
            });
        });


    }
    // 8 - печатание
    const frogImg = document.querySelector('.coding-frog-visual');
    const normalSrc = 'static/Normal_no_pupils.png';
    const typingSrc = 'static/Typing.png';

    function showTypingFrog() {
        frogImg.src = typingSrc;

        setTimeout(() => {
            frogImg.src = normalSrc;
        }, 150);
    }

    // Клавиатура
    window.addEventListener('keydown', (e) => {
        if (e.repeat) return;
        showTypingFrog();
    });

    // Мышь + палец
    frogWrapper.addEventListener('pointerdown', () => {
        showTypingFrog();
    });
});

// Функция для перехода к контактам после квиза (вынесена за DOMContentLoaded, так как может вызываться из inline-onclick)
function handleQuizSelection() {
    const modalEl = document.getElementById('frogQuizModal');
    const modal = bootstrap.Modal.getInstance(modalEl);

    if (modal) modal.hide();

    setTimeout(() => {
        const contactSection = document.querySelector('#contacts');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            history.pushState(null, null, '#contacts');
        }
    }, 350);
}