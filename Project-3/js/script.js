$(document).ready(function() {
    let currentSlide = 0;
    const totalSlides = $('.slide').length;
    const slideWidth = 100;
    let autoplay;

    function goToSlide(slideIndex) {
        if (slideIndex < 0) {
            currentSlide = totalSlides - 1;
        } else if (slideIndex >= totalSlides) {
            currentSlide = 0;
        } else {
            currentSlide = slideIndex;
        }

        const offset = -(currentSlide * slideWidth);
        $('.carousel-slides').css('transform', `translateX(${offset}%)`);

        $('.indicator').removeClass('active');
        $(`.indicator[data-slide="${currentSlide}"]`).addClass('active');
    }

    function startAutoplay() {
        autoplay = setInterval(function() {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplay);
    }

    startAutoplay();

    $('.carousel-container').hover(
        function() {
            stopAutoplay();
        },
        function() {
            startAutoplay();
        }
    );

    $('.indicator').click(function() {
        const slideIndex = parseInt($(this).data('slide'));
        goToSlide(slideIndex);
        stopAutoplay();
        startAutoplay();
    });

    $('.slide').click(function() {
        const link = $(this).data('link');
        window.location.href = link;
    });
});
```