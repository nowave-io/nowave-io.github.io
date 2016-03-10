(function ($, window, document, undefined) {

  'use strict';

  $(function () {

    var width = $(window).width();
    var height = $(window).height();
    var sm;
    if (width < 900 || height < 655 ) { sm = true;} else { sm = false; }

    // PLAY/PAUSE BG VIDEO
    $('#fullpage').fullpage({
        slidesNavigation: true,
        autoScrolling: !sm,
        afterLoad: function (anchor, index) {
          if (index === 1 && width > 640 ) {
            $('.video-bg').get(0).play();
          }
        },
        onLeave: function (index) {
          if (index === 1 && width > 640 ) {
            setTimeout(function(){
              $('.video-bg').get(0).pause();
            }, 500);
          }
        },
        onSlideLeave: function( anchorLink, index, slideIndex, direction, nextSlideIndex){
          var leavingSlide = $(this);
          $('.trailer').each(function(i, obj) {
            obj.pause();
          });
        }
      });


    // NAV SLIDES
    $('main .right-part ul li').click( function(){
      var idx = $(this).index();
      var sel = '.nav'+ (idx+2);
      $.fn.fullpage.moveTo(2, idx+1);
      $('.fp-slidesNav ul li a').removeAttr('data-active');
      $(sel).attr('data-active' , 'active');
    });

    $('.goto_bottom').click(function(){
      $.fn.fullpage.moveTo(2);
    });

    $('.move-up').click(function(){
      $.fn.fullpage.moveTo(1);
    });

    // VIDEO TRAILER CONTROLS
    $('.trailer').on({
      mouseenter: function () {
        $('.trailer').attr('controls','controls');
      },
      mouseleave: function () {
        $('.trailer').removeAttr('controls');
      }
    });

    // TRAILER PLAY/PAUSE
    $('.play-trailer').click(function() {
      $(this).fadeOut();
      var thisTrailer = $(this).next('video');
      thisTrailer.get(0).play();
      thisTrailer.css('z-index','1');
    });

    $('.trailer').bind('ended', function() {
      $('.play-trailer').fadeIn();
      $(this).css('z-index','-3');
      $(this).get(0).load();
    });

    $('a[href="#offer"]').click(function(event) {
      event.preventDefault();
      $('#offer').modal({
        fadeDuration: 250
      });
      $('#offer .info-text, #offer form').show();
      $('#offer p').html('Nowave explore des thématiques contemporaines à travers le regard de réalisateurs du monde entier.<br><br><span>Pour 12,99€ par mois, explorez tous les themas, et partagez un film par semaine avec la personne de votre choix pendant 24 heures.</span>').show();
      $('#offer input').val('');
    });

    // $('video').click(function() {
    //   if (this.paused === false) {
    //     this.pause();
    //   } else {
    //     this.play();
    //   }
    // });


    // EMAIL FORM
    $('#offer form').submit(function(event){
      event.preventDefault();
      $('#offer').removeClass('shake');
      var formId = event.target.id;
      var email = $('input', this).val();
      var emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(email=== '') {$('input', this).focus();}
      if(!emailReg.test($.trim(email)) && email !== '') {
        $('input', this).focus();
        $('#offer').addClass('shake');
      } else if (email !== '') {

        $('#offer').fadeOut();

        setTimeout(function() {
          $('#offer .info-text, #offer form').hide();
          $('#offer p').html('Merci de votre interêt pour NoWave !<br>Nous vous tiendrons informé prochainement du lancement du service.').fadeIn();
          $('#offer').fadeIn();
        }, 500);


      } else { $('input', this).focus(); }
    });

  });

})(jQuery, window, document);
