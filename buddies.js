console.log('khanh')
const mainScript = () => {
  const SCRIPT = {};
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  let lenis = new Lenis({});
  gsap.registerPlugin(ScrollTrigger);
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight
}
  requestAnimationFrame(raf)
   $('.header-ham').on('click',function(){
    $('.header-menu-wrap').toggleClass('active');
    $(this).find('.ic').removeClass('active');
    if($('.header-menu-wrap').hasClass('active')){
      $(this).find('.ic-ham-close').addClass('active');
    }
    else{
      $(this).find('.ic-ham-open').addClass('active');
    }
   })
  SCRIPT.homeScript = () => {
    console.log('khanh123')
    function homePartner(){
      
      if($(window).width()>991){
       
      let tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-partner',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        }
      })
      
      }
      else{
            setup();
      }
      function setup() {
        let allCms = $('.home-partner-cms');
        allCms.each((idx, item) => {
          let $originalListBrand = $(item).find(".home-partner-list");
          let $clonedListBrand = $originalListBrand.clone();
          $(item).append($clonedListBrand);
          if (idx %2 ==0){
            $(item).find(".home-partner-list").addClass("anim");
          }
          else{
            $(item).find(".home-partner-list").addClass("anim-revert");
          }
        })
        $(".home-partner-cms").each((idx, item) => {
          $(item).on("pointerenter", function (e) {
            gsap.to($(item), {
              x: -parseRem(30),
              duration: 1.2,
              ease: "power1.out",
            });
          });
          $(item).on("pointerleave", function (e) {
            gsap.to($(item), {
              x: 0,
              duration: 1.2,
              ease: "none",
            });
          });
        })
        
      }
    }
  function homeConquer(){
    
    if( viewport.w > 991){
      let tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-conquer',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        }
      })
    }
    else{
      setup();
    }
    function setup (){
      
      $('.home-conquer-faqs-title').on('click', function(){
        let index = $(this).index();
        console.log(index)
        if($(this).closest('.home-conquer-faqs-item').hasClass('active')){
          $('.home-conquer-faqs-item').removeClass('active');
          $('.home-conquer-faqs-content').slideUp();
        }
        else{
          $('.home-conquer-faqs-item').removeClass('active');
          $('.home-conquer-faqs-content').slideUp();
          $(this).closest('.home-conquer-faqs-item').addClass('active');
          console.log($(this).closest('.home-conquer-faqs-item').find('.home-conquer-faqs-content'))
          $(this).closest('.home-conquer-faqs-item').find('.home-conquer-faqs-content').slideDown();
        }

      })
    }
    $('.home-conquer-faqs-item').eq(0).addClass('active');
    $('.home-conquer-faqs-content').eq(0).slideDown();
  }
  function homeTesti(){
    
    if( viewport.w > 991){
      let tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-testi',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            setup();
          },
        }
      })
    }
    else{
      setup();
    }
    function setup (){
      const paginationDiv = document.createElement('div');
  paginationDiv.classList.add('swiper-pagination');
  const swiper = document.querySelector('.swiper.home-testi-cms');
  if (swiper) {
    swiper.appendChild(paginationDiv);
  }
     var swiperTesti = new  Swiper(".home-testi-cms ", {
      slidesPerView: 1,
      spaceBetween: 28,
      pagination: {
        el: ".swiper-pagination",
        // able click
        clickable: true
      },
      on: {
        init: function () {
          if (this.activeIndex == 0) {
            $('.home-testi-main-control-prev').css('opacity', '.3');
          }
        },
        slideChange: function () {
          if (this.activeIndex == 0) {
            $('.home-testi-main-control-prev').css('opacity', '.3');
          }
          else{
            $('.home-testi-main-control-prev').css('opacity', '1');
          }
          if (this.activeIndex == this.slides.length - 1) {
            $('.home-testi-main-control-next').css('opacity', '.3');
          }
          else{
            $('.home-testi-main-control-next').css('opacity', '1');
          }
        },
      },
    });
    $('.home-testi-main-control-prev').on('click', function(){
      swiperTesti.slidePrev();
    })
    $('.home-testi-main-control-next').on('click', function(){
      swiperTesti.slideNext();
    })
    }
  }
homePartner();
homeConquer();
homeTesti();
  };
  const pageName = $(".main").attr("name-space");
  if (pageName) {
    SCRIPT[`${pageName}Script`]();
  }
};
window.onload = mainScript;