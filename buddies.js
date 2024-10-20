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
      const paginationDiv2 = document.createElement('div');
      paginationDiv2.classList.add('swiper-pagination');
      const swiper2 = document.querySelector('.swiper.home-blog-cms');
      if (swiper2) {
        swiper2.appendChild(paginationDiv2);
      }
        var swiperTesti = new  Swiper(".home-blog-cms ", {
          slidesPerView: 1,
          spaceBetween: parseRem(16),
          pagination: {
            el: ".swiper-pagination",
            // able click
            clickable: true
          },
          breakpoints: {
            768: {
              spaceBetween: parseRem(20),
              slidesPerView: 2,
            },
            991: {
              spaceBetween: parseRem(28),
              slidesPerView: 4,
            },
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
              let lengthReal = this.slides.length - 4;
              if(viewport.w <991 && viewport.w > 767){
                lengthReal = this.slides.length - 2;
              }
              else if( viewport.w <=767){
                lengthReal = this.slides.length - 1;
              }
              if (this.activeIndex == lengthReal) {
  
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
        gsap.to('.kv-header-wrap', {autoAlpha: 0,yPercent: -100})
          lenis.stop();
          $(".loading-page").removeClass("loaded");
          setTimeout(function(){
            $('.main-wrap').removeClass('hide-def-div')
          },1000)
        },
        onComplete: () =>{
          lenis.start();
          $(".loading-page").addClass("loaded");
          this.animHero();
        }
      });
      tl  
      .from('.loading-page .loading-page-inner', {duration: 1,autoAlpha: 0,ease: "power1.out",})
      .to('.loading-page .loading-page-inner', {duration: 1,autoAlpha: 0,ease: "power1.out",})
    }
    animHero(){
        console.log('hero loaded')
        // $('.kv-header-wrap').removeClass('hide-def-div')
        gsap.to('.kv-header-wrap', {autoAlpha: 1,yPercent: 0, duration: .6, ease: 'none'})
        if ($('[data-barba-namespace="home"]').length) {
            homeHero.play();
        } else if ($('[data-barba-namespace="about"]').length) {
            aboutHero.play()
        }
    }
}
let loading = new Loading()
barba.use(barbaPrefetch);
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis()
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
  })
  const viewport = {
    w: window.innerWidth,
    h: window.innerHeight
}
  // requestAnimationFrame(raf);
  
  lenis.on("scroll", function (inst) {
    if (inst.scroll > $(".kv-header").height() * 0.75) {
      // console.log(inst.direction)
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
   $('.home-header-toggle').on('click',function(){
    $('.kv-header').toggleClass('active');
    
   })
   class HomeHero {
      constructor() {
        this.tlFade
      }
      setup(){
        const title = new SplitType('.home-hero-title', {types: 'lines words', lineClass: 'kv-line heading-line'})
        const sub = new SplitType('.home-hero-sub', {types: 'lines words', lineClass: 'kv-line'})
        this.tlFade = new gsap.timeline({
          paused: true,
          onComplete : () => {
            // title.revert();
            sub.revert();
          }
        })
        this.tlFade
            .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6})
            .from(sub.words, {autoAlpha: 0, yPercent: 80, stagger: .015, duration: .3},"<=.3")
            .from('.home-hero-btn', {autoAlpha: 0, yPercent: 30, duration: .4, clearProps: 'all'}, '<=.2')
       let tlBody  = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-hero-body',
          start: 'top top+=55%',
          once: true
        }
       })
       tlBody
        .from('.home-hero-body-bg', {autoAlpha: 0,y: 60, duration: .6, clearProps: 'all'})
        .from('.home-hero-body img', {autoAlpha: 0,scale: 0,transformOrigin: 'center',stagger: {
          amount: .4,
          from: 'random'
      }, duration: 1.8, clearProps: 'all', ease: 'expo.out'},'<=.3')
      }
      play(){
        this.tlFade.play();
      }
   }
   let homeHero = new HomeHero();
    class HomePartner{
      constructor() {
        this.tlTrigger;
      }
      setTrigger(){
        this.tlTrigger = new gsap.timeline({
          scrollTrigger: {
            trigger: '.home-partner',
            start: "top bottom+=50%",
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
              x: -parseRem(20),
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
        const title = new SplitType('.home-conquer-title', {types: 'lines, words', lineClass: 'kv-line heading-line'})
        let tlFade = new gsap.timeline({
          scrollTrigger : {
            trigger: '.home-conquer-title-wrap',
            start : 'top top+=65%',
            once: true,
          },
          onComplete : () => {
            // title.revert();
          }
        })
        tlFade
          .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6})
        let allItems = $('.home-conquer-faqs-item');
        let tlFadeItem = new gsap.timeline({
          scrollTrigger : {
            trigger: '.home-conquer-faqs-main',
            start : 'top top+=65%',
            once: true,
          }
        })
        tlFadeItem
          .from('.home-conquer-faqs-img-list', {autoAlpha: 0, y: 50, duration: .5, clearProps: 'all'})
        allItems.each((idx, item) => {
          let titleItem = new SplitType($(item).find('.home-conquer-faqs-title-txt'), {types: 'lines, words', lineClass: 'kv-line'});
         tlFadeItem
            .from(titleItem.words, {autoAlpha: 0, yPercent: 100, stagger: .02, duration: .6, onComplete: () => {
              titleItem.revert();
            }},idx==0?'<=.2':`<=${idx*.1}`)
            .from($(item).find('.div-line-wrap'), { scaleX: 0, transformOrigin: 'left', duration: .8, clearProps: 'all'}, '<=0')
            .from($(item).find('.home-conquer-faqs-title-ic'), {autoAlpha: 0, yPercent: 80, duration: .3, clearProps: 'all'}, '<=.2')
            if (idx == 0 ){
              let contentItem =  new SplitType($(item).find('.home-conquer-faqs-content-txt'), {types: 'lines, words', lineClass: 'kv-line'}); 
              tlFadeItem
              .from(contentItem.words, {autoAlpha: 0, yPercent: 60, stagger: .015, duration: .3, onComplete: () => {
                contentItem.revert();
              }},'<=.2')
            }
           
        })
        $('.home-conquer-faqs-title').on('click', function(){
          let index = $(this).closest('.home-conquer-faqs-item').index();
          console.log(index)
          $('.home-conquer-faqs-img-item').removeClass('active')
          $('.home-conquer-faqs-img-item').eq(index).addClass('active')
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
        $('.home-conquer-faqs-img-item').removeClass('active')
        $('.home-conquer-faqs-img-item').eq(0).addClass('active')

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
   
    const title = new SplitType('.home-testi-title', {types: 'lines, words', lineClass: 'kv-line heading-line'});
    const sub = new SplitType('.home-testi-sub', {types: 'lines, words', lineClass: 'kv-line '});
    let tlFade = new gsap.timeline({
      scrollTrigger : {
        trigger: '.home-testi-title-wrap',
        start : 'top top+=65%',
        once: true,
      },
      onComplete: () => {
        sub.revert();
      }
    })
    tlFade
          .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6})
          .from(sub.words, {autoAlpha: 0, yPercent: 80, stagger: .015, duration: .3},"<=.3")
    let tlFadeItem = new gsap.timeline({
      scrollTrigger : {
        trigger: '.home-testi-main',
        start : 'top top+=70%',
        once: true,
      },
      onComplete: () => {
        // sub.revert();
      }
    })
    let allItems = $('.home-testi-item');
    allItems.each((idx, item) => {
      let content = new SplitType($(item).find('.home-testi-item-content-txt'), {types: 'lines, words', lineClass: 'kv-line '});
      let name = new SplitType($(item).find('.home-testi-item-content-name'), {types: 'lines, words', lineClass: 'kv-line '});
      let decs = new SplitType($(item).find('.home-testi-item-content-desc'), {types: 'lines, words', lineClass: 'kv-line '});
     if(idx<2){
      tlFadeItem
      .from(item, {autoAlpha: 0, y: 60, duration: .6,  },  `${idx*.1}`)
      .from($(item).find('.home-testi-item-content-ic'), {autoAlpha: 0, yPercent: 60, duration: .6, clearProps: 'all'}, '<=0')
      .from(content.words, {autoAlpha: 0, yPercent: 60, stagger: .015, duration: .4}, '<=.2')
      .from(name.words, {autoAlpha: 0, yPercent: 80, stagger: .02, duration: .6}, '<=.2')
      .from(decs.words, {autoAlpha: 0, yPercent: 100, stagger: .02, duration: .6,  onComplete: ()=>{
        content.revert();
        name.revert();
        decs.revert();
      }}, '<=.2',)
     }
    })
    }
  }
  let homeTesti = new HomeTesti();
  class HomeOpp{
    constructor(){
      this.tlTrigger;
    }
    setTrigger(){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-oppo',
          start: "top bottom+=50%",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
    setup(){
      function countUpTo(maxNumber, item) {
        var currentNumber = 0;
        let width = $(item).width();
        console.log(item);
        $(item).css('width', width);
        // Tạo hàm chạy liên tục với khoảng thời gian 100ms
        var interval = setInterval(function() {
            if (currentNumber <= maxNumber) {
                $(item).text(currentNumber);
                currentNumber++;
            } else {
                clearInterval(interval); // Dừng khi đạt tới số maxNumber
            }
        }, 30); // Thời gian mỗi lần tăng (100ms ở đây)
    }
      const title = new SplitType('.home-oppo-title', {types: 'lines words', lineClass: 'kv-line heading-line'});
      let tlFade = new gsap.timeline({
        scrollTrigger : {
          trigger: '.home-oppo-title-wrap',
          start : 'top top+=65%',
          once: true,
        }
      })
      tlFade
        .from(title.words,{autoAlpha: 0, yPercent: 60, stagger: .02, duration: .8})
        .from('.home-oppo-tags-item', {autoAlpha: 0, yPercent: 80, stagger: .1, duration: .4, clearProps: 'all'}, '<=.2')
      
      let allItems = $('.home-oppo-count-item');
      allItems.each((idx, item) => {
      const content = new SplitType('.home-oppo-count-item-sub', {types: 'lines words', lineClass: 'kv-line '});
        let tlItem = new gsap.timeline({
          scrollTrigger : {
            trigger: '.home-oppo-count-wrap',
            start : 'top top+=75%',
            once: true,
            onComplete: () => {
              content.revert()
            }
          }
        })
        let number = parseInt($(item).find('.span-number-count').text());
        tlItem
          .from($(item).find('.home-oppo-count-item-title'), {autoAlpha: 0, yPercent: 60, duration: .6, onStart: () => {
            countUpTo(number, $(item).find('.span-number-count'));
          }})
          // .from('.home-oppo-count-item-title', {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6}, '<=.0')
          .from(content.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6}, '<=.2')
         
      })
    }
   
  }
  let homeOpp = new HomeOpp();
  
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
    const title = new SplitType('.home-blog-title', {types: 'lines, words', lineClass: 'kv-line heading-line'});
    let tlFade = new gsap.timeline({
      scrollTrigger : {
        trigger: '.home-blog-title',
        start : 'top top+=65%',
        once: true,
      },
      onComplete: () => {
        // sub.revert();
      }
    })
    tlFade
          .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6})
    let tlFadeItem = new gsap.timeline({
      scrollTrigger : {
        trigger: '.home-blog-post',
        start : 'top top+=65%',
        once: true,
      },
      onComplete: () => {
        // sub.revert();
      }
    })
      let allItems = $('.home-blog-item');
      allItems.each((idx, item) => {
        let content = new SplitType($(item).find('.home-blog-item-title'), {types: 'lines, words', lineClass: 'kv-line '});
        if(idx<=5){
        tlFadeItem
        .from($(item).find('.home-blog-item-thumb'), {autoAlpha: 0, y: 60, duration: .6, clearProps: 'all' },  `${idx*.2}`)
        .from($(item).find('.home-blog-item-date-wrap'), {autoAlpha: 0, yPercent: 60, duration: .6, clearProps: 'all'}, '<=.2')
        .from(content.words, {autoAlpha: 0, yPercent: 60, stagger: .015, duration: .4, onComplete: () => {
          content.revert();
        }}, '<=.2')
        }
      })
  
    }
  }
let homeBlog = new HomeBlog();
class CTA {
  constructor(){
    this.tlTrigger
  }
  setTrigger(){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger: {
        trigger: '.home-cta',
        start: "top bottom+=200%",
        once: true,
        onEnter: () => {
          this.setup();
          console.log('cta')
        }
      },
    })
  }
  setup(){
    const title = new SplitType('.homt-cta-title', {types: 'lines, words', lineClass: 'kv-line '});
    let tlFade = new gsap.timeline({
      scrollTrigger : {
        trigger: '.homt-cta-title',
        start : 'top top+=65%',
        once: true,
      },
      onComplete: () => {
        title.revert();
      }
    })
    tlFade
    .from(title.words, {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4})
    .from('.home-cta-btn', {autoAlpha: 0, yPercent: 60, duration: .6, clearProps: 'all'},'<=.4')
          
  }
}
let cta = new CTA()
  const SCRIPTS = {
    home: {
        namespace: 'home',
        afterEnter() {
            console.log('home afterEnter');
            homeHero.setup();
            homePartner.setTrigger();
            homeOpp.setTrigger();
            homeTesti.setTrigger();
            homeConquer.setTrigger();
            homeBlog.setTrigger();
          cta.setTrigger();

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