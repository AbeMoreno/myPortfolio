$(document).ready(function(){
  $('.parallax').parallax();
  // Add smooth scrolling to all links
  $('a[href^="#"]').on('click', function (e) {
         e.preventDefault();

         var target = this.hash,
             $target = $(target);

         $('html, body').stop().animate({
             'scrollTop': $target.offset().top - 56
         }, 900, 'swing', function () {
            // window.location.hash = target;
         });
     });
    
  $(".list-item").on({
    mouseenter: function(){
      $(this).addClass("animated");
      $(this).addClass("pulse");
    },
    mouseleave: function(){
      $(this).removeClass("animate");
      $(this).removeClass("pulse");
    }
  });
  
  $(".hover-div").on("click", function(){
    $(this).addClass("active");
  });
     
});