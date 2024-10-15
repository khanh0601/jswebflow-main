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
    function setup (){
      $('.home-conquer-faqs-title').on('click', function(){
        let index = $(this).index();
        if($(this).hasClass('active')){
          $('.home-conquer-faqs-title').removeClass('active');
          $('.home-conquer-faqs-content').slideUp();
        }
        else{
          $('.home-conquer-faqs-title').removeClass('active');
          $('.home-conquer-faqs-content').slideUp();
          $(this).addClass('active');
          $(this).find('.home-conquer-faqs-content').slideDown();
        }

      })
    }
  }
  homePartner();

  };
  const pageName = $(".main").attr("name-space");
  if (pageName) {
    SCRIPT[`${pageName}Script`]();
  }
};
window.onload = mainScript;