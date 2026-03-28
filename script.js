
document.addEventListener('DOMContentLoaded', function() {
    const chatContainer = document.getElementById('chat-container');
    const messages = chatContainer.querySelectorAll('.hidden-message');

    const observerOptions = {
        root: null,
        threshold: 0.3 
    };

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
});

document.addEventListener("DOMContentLoaded", function() {
    const track = document.querySelector('.portfolio-track');
    const slides = document.querySelectorAll('.portfolio-slide');
    const nextBtn = document.querySelector('.portfolio-next-btn');
    const prevBtn = document.querySelector('.portfolio-prev-btn');
    const sliderWrapper = document.querySelector('.portfolio-slider-wrapper');

    let index = 0;
    let autoPlayInterval;
    const intervalTime = 10000; 

    // Функция обновления позиции слайдера
    function updateSlider() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    // Функция для перехода к следующему слайду
    function nextSlide() {
        index = (index + 1) % slides.length;
        updateSlider();
    }

    // Функция для перехода к предыдущему слайду
    function prevSlide() {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    }


    function startAutoPlay() {
        clearInterval(autoPlayInterval); 
        autoPlayInterval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    if (track && nextBtn && prevBtn) {
        // Ручное переключение
        nextBtn.addEventListener('click', () => {
            stopAutoPlay(); // Останавливаем авто, когда пользователь жмет кнопки
            nextSlide();
            startAutoPlay(); // Запускаем авто снова
        });

        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });

        // Пауза при наведении мыши
        if (sliderWrapper) {
            sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
            sliderWrapper.addEventListener('mouseleave', startAutoPlay);
        }

        // Запускаем автоплеи при загрузке
        startAutoPlay();
    }
});

const track = document.querySelector('.review-track');
const slides = document.querySelectorAll('.review-slide');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let index = 0;

function updateSlider() {
    track.style.transform = `translateX(-${index * 100}%)`;
}

if (nextBtn && prevBtn && track) {
    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    });
}
