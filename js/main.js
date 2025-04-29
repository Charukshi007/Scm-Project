(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 25,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });
    
})(jQuery);

document.addEventListener("DOMContentLoaded", () => {
    const roomBookingForm = document.getElementById('room-booking-form');
    if (roomBookingForm) {
        roomBookingForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            const data = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                checkIn: document.getElementById('checkin').value,
                checkOut: document.getElementById('checkout').value,
                adults: document.getElementById('select1').value,
                children: document.getElementById('select2').value,
                room: document.getElementById('select3').value,
                request: document.getElementById('message').value
            };

            // Validation for empty fields
            if (!data.name || !data.email || !data.checkIn || !data.checkOut || !data.adults || !data.children || !data.room) {
                alert("Please fill out all required fields.");
                return;
            }

            try {
                const response = await fetch('/book-room', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                const result = await response.json();

                if (response.ok) {
                    alert(result.message); // ✅ Booking received successfully!
                    roomBookingForm.reset(); // Optional: clear form after submission
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Booking submission failed:', error);
                alert('❌ Failed to submit booking. Please try again.');
            }
        });
    }
});


//service page newsletter email submission
document.addEventListener('DOMContentLoaded', function () {
    const submitBtn = document.getElementById('newsletterSubmit');
    const emailInput = document.getElementById('newsletterEmail');
    const message = document.getElementById('newsletterMsg');
  
    submitBtn.addEventListener('click', function () {
      const email = emailInput.value.trim();
  
      if (email && email.includes('@')) {
        localStorage.setItem('newsletterEmail', email);
        message.textContent = 'Thank you for subscribing!';
        message.style.color = 'green';
        emailInput.value = ''; // Clear input
      } else {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = 'red';
      }
    });
  });
//  service page newsletter js ends here


  