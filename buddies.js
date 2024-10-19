console.log('khanh')
const mainScript = () => {
  const SCRIPT = {};
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  function globalScript(){
    // loadingPage();

    // if ($(".hide-def-div").length > 0) {
    //   $(".hide-def-div").removeClass("hide-def-div");
    // }
  }
  function scrollTop() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    } else {
        window.addEventListener('pageshow', function(event) {
            if (!event.persisted) {
                window.scrollTo(0, 0);
            }
        });
    }
    window.scrollTo(0, 0);
}
 function scrollTop() {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        } else {
            window.addEventListener('pageshow', function(event) {
                if (!event.persisted) {
                    window.scrollTo(0, 0);
                }
            });
        }
        window.scrollTo(0, 0);
    }
  function resetScroll() {
    if (window.location.hash !== '') {
        console.log('has hash')
        if ($(window.location.hash).length >=1) {
            console.log('dom hash')
            window.scrollTo(0, $(window.location.hash).offset().top)
            setTimeout(() => {
                window.scrollTo(0, $(window.location.hash).offset().top)
            }, 300);
        } else {
            scrollTop()
        }
    } else if (window.location.search !== '') {
        let searchObj = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        console.log('has search')
        if (searchObj.sc) {
            if ($(`#${searchObj.sc}`).length >=1) {
                console.log('dom search')
                window.scrollTo(0, $(`#${searchObj.sc}`).offset().top)
                setTimeout(() => {
                    window.scrollTo(0, $(`#${searchObj.sc}`).offset().top)
                }, 300);
            } else {
                scrollTop()
            }
        }
    } else {
        scrollTop()
    }
}
  class Loading {
    constructor() {
        this.tlLoading;
        this.isLoaded = sessionStorage.getItem("isLoaded") == 'true' ? true : false;
    }
    init() {
      let tl = new gsap.timeline({
        onStart : () => {
          lenis.stop();
          $(".loading-page").removeClass("loaded");
          setTimeout(function(){
            $('.main-wrap').removeClass('hide-def-div')
          },1000)
        },
        onComplete: () =>{
          lenis.start();
          $(".loading-page").addClass("loaded");
        }
      });
      tl  
      .from('.loading-page .loading-page-inner', {duration: 1,autoAlpha: 0,ease: "power1.out",})
      .to('.loading-page .loading-page-inner', {duration: 1,autoAlpha: 0,ease: "power1.out",})
    }
    animHero(){
        console.log('hero loaded')
        // if ($('[data-barba-namespace="home"]').length) {
        //     homeHeroCanvas.init();
        //     homeHero.play();
        // } else if ($('[data-barba-namespace="about"]').length) {
        //     aboutHero.play()
        // }
    }
}
let loading = new Loading()
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
  requestAnimationFrame(raf);
  
  lenis.on("scroll", function (inst) {
    if (inst.scroll > $(".kv-header").height() * 0.75) {
      console.log(inst.direction)
      if (inst.direction >= 1) {
        $(".kv-header").addClass("on-hide");
      } else if(inst.direction<=-1 ) {
        $(".kv-header").removeClass("on-hide");
      }
      $(".kv-header").addClass("on-scroll");
    } else {
      $(".kv-header").removeClass("on-scroll");
      $(".kv-header").removeClass("on-hide");
    }
  });
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
    class HomePartner{
      constructor() {
        this.tlTrigger;
      }
      setTrigger(){
        this.tlTrigger = new gsap.timeline({
          scrollTrigger: {
            trigger: '.home-partner',
            start: "top bottom+=100%",
            end: "bottom top",
            once: true,
            onEnter: () => {
              console.log('onEnter');
              this.setup();
            },
          }
        })
      }
      setup() {
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
  let homePartner = new HomePartner();
  class HomeConquer{
    constructor(){
      this.tlTrigger;
    }
    setTrigger(){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-conquer',
          start: "top bottom+=50%",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
   
     setup (){
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
    $('.home-conquer-faqs-item').eq(0).addClass('active');
    $('.home-conquer-faqs-content').eq(0).slideDown();
  }
  }
  let homeConquer = new HomeConquer();
  class HomeTesti{
    constructor(){
      this.tlTrigger;
    }
    setTrigger(){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-testi',
          start: "top bottom+=50%",
          once: true,
          onEnter: () => {
            console.log('update')
            this.setup();
          }
        },
        
      })
    }
    
   setup (){
      const paginationDiv = document.createElement('div');
      paginationDiv.classList.add('swiper-pagination');
      const swiper = document.querySelector('.swiper.home-testi-cms');
      if (swiper) {
        swiper.appendChild(paginationDiv);
      }
        var swiperTesti = new  Swiper(".home-testi-cms ", {
          slidesPerView: 1,
          spaceBetween: parseRem(28),
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
  let homeTesti = new HomeTesti();
   class HomeBlog{
    constructor () {
      this.tlTrigger;
    }
    setTrigger(){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-conquer',
          start: "top bottom+=50%",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
  setup (){
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('swiper-pagination');
    const swiper = document.querySelector('.swiper.home-blog-cms');
    if (swiper) {
      swiper.appendChild(paginationDiv);
    }
      var swiperTesti = new  Swiper(".home-blog-cms ", {
        slidesPerView: 4,
        spaceBetween: parseRem(28),
        pagination: {
          el: ".swiper-pagination",
          // able click
          clickable: true
        },
        on: {
          init: function () {
            if (this.activeIndex == 0) {
              $('.home-blog-main-control-prev').css('opacity', '.3');
            }
          },
          slideChange: function () {
            if (this.activeIndex == 0) {
              $('.home-blog-main-control-prev').css('opacity', '.3');
            }
            else{
              $('.home-blog-main-control-prev').css('opacity', '1');
            }
            console.log(this.activeIndex)
            if (this.activeIndex == this.slides.length - 4) {

              $('.home-blog-main-control-next').css('opacity', '.3');
            }
            else{
              $('.home-blog-main-control-next').css('opacity', '1');
            }
          },
        },
      });
      $('.home-blog-main-control-prev').on('click', function(){
        swiperTesti.slidePrev();
      })
      $('.home-blog-main-control-next').on('click', function(){
        swiperTesti.slideNext();
      })
    }
  }
let homeBlog = new HomeBlog();
  const SCRIPTS = {
    home: {
        namespace: 'home',
        afterEnter() {
            console.log('home afterEnter');
            // homeHero.setup();
            homePartner.setTrigger();
            homeTesti.setTrigger();
            homeConquer.setTrigger();
            homeBlog.setTrigger();
        },
        beforeLeave() {
            console.log('home clean')
        }
    },
}
const VIEWS = Object.values(SCRIPTS);
barba.init({
  preventRunning: true,
  sync: true,
  debug: true,
  transitions: [{
      name: 'default-transition',
      sync: true,
      once(data) {
        resetScroll();
          globalScript();
          loading.init();
      },
      beforeLeave({current}) {
          lenis.stop()
      },
      async leave(data) {
          // footer.destroy();
          // // console.log('leave global')
          // await pageTrans.leaveAnim(data).then(() => {
          //     console.log('trans enter')
          //     pageTrans.enterAnim(data)
          // })
      },
      afterLeave(data) {
          console.log('after leave global')
      },
      beforeEnter(data){
          lenis.start();
          console.log('before enter')
      },
      enter(data) {
          
          console.log('enter global')
      },
      afterEnter(data) {
          // Trans

          console.log('after enter global')
          // footerSocialMouse()
      },
  }],
  views: VIEWS
})
};
window.onload = mainScript;