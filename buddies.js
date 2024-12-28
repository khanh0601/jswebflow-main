const mainScript = () => {
  const SCRIPT = {};
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  function countUpTo(maxNumber, item, duration) {
    var currentNumber = 0;
    let width = $(item).width();
    console.log(item);
    $(item).css('width', width);
    // Tạo hàm chạy liên tục với khoảng thời gian 100ms
    var intervalTime = duration / maxNumber;
    var interval = setInterval(function () {
      if (currentNumber <= maxNumber) {
        $(item).text(currentNumber);
        currentNumber++;
      } else {
        clearInterval(interval); // Dừng khi đạt tới số maxNumber
      }
    }, intervalTime); // Thời gian mỗi lần tăng (100ms ở đây)
  }
  function createMarqueeAnimation(innerClass, wrapClass) {
    const width = $(innerClass).width();
    const length = Math.floor($(window).width() / width) + 1;
  
    for (let i = 0; i < length; i++) {
      let $originalElement = $(innerClass).eq(0);
      let $clonedElement = $originalElement.clone();
      $(wrapClass).append($clonedElement);
    }
  
    // $(innerClass).addClass('anim');
  }
  function reinitializeWebflow() {
    console.log('reinitialize webflow');
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
}
  function globalScript() {
    // loadingPage();

    if ($(".hide-def-div").length > 0) {
      $(".hide-def-div").removeClass("hide-def-div");
    }
    const paginationDiv = document.createElement('div');
    paginationDiv.classList.add('swiper-pagination');
    const swiper = document.querySelector('.swiper.home-testi-cms');
    if (swiper) {
      swiper.appendChild(paginationDiv);
    }
    var swiperTesti = new Swiper(".home-testi-cms ", {
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
          else {
            $('.home-testi-main-control-prev').css('opacity', '1');
          }
          if (this.activeIndex == this.slides.length - 1) {
            $('.home-testi-main-control-next').css('opacity', '.3');
          }
          else {
            $('.home-testi-main-control-next').css('opacity', '1');
          }
        },
      },
    });
    $('.home-testi-main-control-prev').on('click', function () {
      swiperTesti.slidePrev();
    })
    $('.home-testi-main-control-next').on('click', function () {
      swiperTesti.slideNext();
    })
    const paginationDiv2 = document.createElement('div');
    paginationDiv2.classList.add('swiper-pagination');
    const swiper2 = document.querySelector('.swiper.home-blog-cms');
    if (swiper2) {
      swiper2.appendChild(paginationDiv2);
    }
    var swiperBlog = new Swiper(".home-blog-cms ", {
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
          else {
            $('.home-blog-main-control-prev').css('opacity', '1');
          }
          console.log(this.activeIndex)
          let lengthReal = this.slides.length - 4;
          if (viewport.w < 991 && viewport.w > 767) {
            lengthReal = this.slides.length - 2;
          }
          else if (viewport.w <= 767) {
            lengthReal = this.slides.length - 1;
          }
          if (this.activeIndex == lengthReal) {

            $('.home-blog-main-control-next').css('opacity', '.3');
          }
          else {
            $('.home-blog-main-control-next').css('opacity', '1');
          }
        },
      },
    });
    $('.home-blog-main-control-prev').on('click', function () {
      swiperBlog.slidePrev();
    })
    $('.home-blog-main-control-next').on('click', function () {
      swiperBlog.slideNext();
    })
  }

  function scrollTop() {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    } else {
      window.addEventListener('pageshow', function (event) {
        if (!event.persisted) {
          window.scrollTo(0, 0);
        }
      });
    }
    window.scrollTo(0, 0);
  }
  function resetScroll() {
    reinitializeWebflow();
    console.log(window.location)
    if (window.location.hash !== '') {
      console.log('has hash')
      if ($(window.location.hash).length >= 1) {
        console.log('dom hash')
        window.scrollTo(0, $(window.location.hash).offset().top)
        setTimeout(() => {
          window.scrollTo(0, $(window.location.hash).offset().top)
        }, 300);
      } else {
        scrollTop()
      }
    } else if (window.location.search !== '') {
      let searchObj = JSON.parse('{"' + decodeURI(location.search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
      console.log('has search')
      if (searchObj.sc) {
        if ($(`#${searchObj.sc}`).length >= 1) {
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
  function removeAllScrollTrigger() {
    let triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => {
      trigger.kill();
    });
  }
  class Loading {
    constructor() {
      this.tlLoading;
      this.isLoaded = sessionStorage.getItem("isLoaded") == 'true' ? true : false;
    }
    init() {
  let onLoadPage = sessionStorage.getItem('loading-page');
      let tl = new gsap.timeline({
        onStart: () => {
    $('.kv-header').removeClass('active');
          if(!onLoadPage){
            gsap.to('.kv-header-wrap', { autoAlpha: 0, yPercent: -100 })
            lenis.stop();
            $(".loading-page").removeClass("loaded");
            setTimeout(function () {
              $('.main-wrap').removeClass('hide-def-div')
            }, 1000)
          }
          else{
            $('.main-wrap').removeClass('hide-def-div')
          }
        },
        onComplete: () => {
          if(!onLoadPage){
            lenis.start();
          $(".loading-page").addClass("loaded");
          }
          this.animHero();
        }
      });
     if(!onLoadPage){
      tl
      .fromTo('.loading-page .loading-page-inner', { autoAlpha: 0 }, { duration: 1, autoAlpha: 1, ease: "power1.out", })
      .to('.loading-page .loading-page-inner', { duration: 1, autoAlpha: 0, ease: "power1.out" }) 
    }
    else{
      tl
      .to('.loading-page .loading-page-inner', { duration: 1, autoAlpha: 0, ease: "power1.out" }) 
    }
      sessionStorage.setItem('loading-page', 'true');
    }
    animHero() {
      console.log('hero loaded')
      gsap.to('.kv-header-wrap', { autoAlpha: 1, yPercent: 0, duration: .6, ease: 'none' })
      if ($('[data-barba-namespace="home"]').length) {
        homeHero.play();
      } else if ($('[data-barba-namespace="contact"]').length) {
        contactHero.play();
        contactPromo.play();
      }
      else if ($('[data-barba-namespace="about"]').length) {
        aboutHero.play()
      }
      else if ($('[data-barba-namespace="resource"]').length) {
        resourceHero.play()
      }
      else if ($('[data-barba-namespace="blog"]').length) {
        blogHero.play()
      }
      else if($('[data-barba-namespace="course"]').length){
        courseHero.play()
      }
      else if($('[data-barba-namespace="job-couching"]').length){
        jobHero.play()
      }
    }
  }
  let loading = new Loading()
  barba.use(barbaPrefetch);
  gsap.registerPlugin(ScrollTrigger);
  const lenis = new Lenis()
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.add((time) => {
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
      } else if (inst.direction <= -1) {
        $(".kv-header").removeClass("on-hide");
      }
      $(".kv-header").addClass("on-scroll");
    } else {
      $(".kv-header").removeClass("on-scroll");
      $(".kv-header").removeClass("on-hide");
    }
  });
  $('.home-header-toggle').on('click', function () {
    if (!$('.kv-header').hasClass('active')) {
      lenis.stop();
    }
    else {
      lenis.start();
    }
    $('.kv-header').toggleClass('active');

  })
   if( viewport.w <= 991){
  $('.header-menu-has-sub').on('click', function () {
    $(this).find('.header-menu-sub').slideToggle();
  })

   }
  class HomeHero {
    constructor() {
      this.tlFade
    }
    setup() {
      const title = new SplitType('.home-hero-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      const sub = new SplitType('.home-hero-sub', { types: 'lines words', lineClass: 'kv-line' })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      gsap.set('.home-hero-btn', { autoAlpha: 0, yPercent: 30 })
      this.tlFade = new gsap.timeline({
        paused: true,
        onComplete: () => {
          // title.revert();
          // sub.revert();
        }
      })
      this.tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .3 }, "<=.3")
        .to('.home-hero-btn', { autoAlpha: 1, yPercent: 0, duration: .4, clearProps: 'all' }, '<=.2')
      let tlBody = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-hero-body',
          start: 'top top+=55%',
          once: true
        }
      })
      gsap.set('.home-hero-body-bg', { autoAlpha: 0, y: 60 })
      gsap.set('.home-hero-body img', { autoAlpha: 0, scale: 0 })
      tlBody
        .to('.home-hero-body-bg', { autoAlpha: 1, y: 0, duration: .6, clearProps: 'all' })
        .to('.home-hero-body img', {
          autoAlpha: 1, scale: 1, transformOrigin: 'center', stagger: {
            amount: .4,
            from: 'random'
          }, duration: 1.8, clearProps: 'all', ease: 'expo.out'
        }, '<=.3')
    }
    play() {
      console.log('homeHerro play')
      this.tlFade.play();
    }
  }
  let homeHero = new HomeHero();
  class HomePartner {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
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
        if (idx % 2 == 0) {
          $(item).find(".home-partner-list").addClass("anim");
        }
        else {
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
  class HomeConquer {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
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

    setup() {
      const title = new SplitType('.home-conquer-title', { types: 'lines, words', lineClass: 'kv-line heading-line' })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-conquer-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        },
        onComplete: () => {
          // title.revert();
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
      let allItems = $('.home-conquer-faqs-item');
      let tlFadeItem = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-conquer-faqs-main',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      gsap.set('.home-conquer-faqs-img-list', { autoAlpha: 0, y: 50 })
      tlFadeItem
        .to('.home-conquer-faqs-img-list', { autoAlpha: 1, y: 0, duration: .5, clearProps: 'all' })
      allItems.each((idx, item) => {
        let titleItem = new SplitType($(item).find('.home-conquer-faqs-title-txt'), { types: 'lines, words', lineClass: 'kv-line' });
        gsap.set($(item).find('.div-line-wrap'), { scaleX: 0, transformOrigin: 'left' })
        gsap.set($(item).find('.home-conquer-faqs-title-ic'), { autoAlpha: 0, yPercent: 60 })
        gsap.set($(titleItem.words), { autoAlpha: 0, yPercent: 60 })
        tlFadeItem
          .to(titleItem.words, {
            autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6, onComplete: () => {
              // titleItem.revert();
            }
          }, idx == 0 ? '<=.2' : `<=${idx * .1}`)
          .to($(item).find('.div-line-wrap'), { scaleX: 1, duration: .8, clearProps: 'all' }, '<=0')
          .to($(item).find('.home-conquer-faqs-title-ic'), { autoAlpha: 1, yPercent: 0, duration: .3, clearProps: 'all' }, '<=.2')
        if (idx == 0) {
          let contentItem = new SplitType($(item).find('.home-conquer-faqs-content-txt'), { types: ' lines', lineClass: 'kv-line' });
          gsap.set(contentItem.lines, { autoAlpha: 0, yPercent: 80 })
          gsap.set('.home-conquer-faqs-content-img', { autoAlpha: 0, y: 40 })

          tlFadeItem
            .to('.home-conquer-faqs-content-img', { autoAlpha: 1, y: 0, duration: 1.2, clearProps: 'all' }, '<=.2')
            .to(contentItem.lines, {
              autoAlpha: 1, yPercent: 0, stagger: .2, duration: .8, onComplete: () => {
                // contentItem.revert();
              }
            }, '<=0')
        }

      })
      $('.home-conquer-faqs-title').on('click', function () {
        let index = $(this).closest('.home-conquer-faqs-item').index();
        console.log(index)
        $('.home-conquer-faqs-img-item').removeClass('active')
        $('.home-conquer-faqs-img-item').eq(index).addClass('active')
        if ($(this).closest('.home-conquer-faqs-item').hasClass('active')) {
          $('.home-conquer-faqs-item').removeClass('active');
          $('.home-conquer-faqs-content').slideUp();
        }
        else {
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
  class HomeTesti {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
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

    setup() {

      const title = new SplitType('.home-testi-title', { types: 'lines, words', lineClass: 'kv-line heading-line' });
      const sub = new SplitType('.home-testi-sub', { types: 'lines, words', lineClass: 'kv-line ' });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-testi-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        },
        onComplete: () => {
          // sub.revert();
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .3 }, "<=.3")
      let tlFadeItem = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-testi-main',
          start: 'top top+=70%',
          once: true,
        },
        onComplete: () => {
          // sub.revert();
        }
      })

      let allItems = $('.home-testi-item');
      allItems.each((idx, item) => {
        let content = new SplitType($(item).find('.home-testi-item-content-txt'), { types: 'lines, words', lineClass: 'kv-line ' });
        let name = new SplitType($(item).find('.home-testi-item-content-name'), { types: 'lines, words', lineClass: 'kv-line ' });
        let decs = new SplitType($(item).find('.home-testi-item-content-desc'), { types: 'lines, words', lineClass: 'kv-line ' });
        gsap.set(content.words, { autoAlpha: 0, yPercent: 80 })
        gsap.set(name.words, { autoAlpha: 0, yPercent: 80 })
        gsap.set(decs.words, { autoAlpha: 0, yPercent: 100 })
        gsap.set(item, { autoAlpha: 0, y: 60 })
        gsap.set($(item).find('.home-testi-item-content-ic'), { autoAlpha: 0, yPercent: 60 })
        if (idx < 2) {
          let tlFadeItemContent = new gsap.timeline({
            scrollTrigger: {
              trigger: $(item).find('.home-testi-item-content-txt'),
              start: $(window).width() > 767 ? "top top+=80%" : "top top+=25%",
              once: true,
            },
            onComplete: () => {
              // sub.revert();
            }
          })
          tlFadeItem
            .to(item, { autoAlpha: 1, y: 0, duration: .6, }, `${idx * .1}`)
            .to($(item).find('.home-testi-item-content-ic'), { autoAlpha: 1, yPercent: 0, duration: .6, clearProps: 'all' }, '<=0')
          tlFadeItemContent
            .to(content.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
            .to(name.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.4')
            .to(decs.words, {
              autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6, onComplete: () => {
                // content.revert();
                // name.revert();
                // decs.revert();
              }
            }, '<=.6',)
        }
      })
    }
  }
  let homeTesti = new HomeTesti();
  class HomeMap {
    constructor() {
      this.tlTrigger;
      this.tlFadeMap;
    }
    setTrigger() {
      console.log('setTriggerMap')
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-map',
          start: "top bottom+=50%",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup() {
      let title = new SplitType('.home-map-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      let sub = new SplitType('.home-map-sub', { types: 'lines words', lineClass: 'kv-line ' });
      gsap.set(title.words, { autoAlpha: true, yPercent: 60 });
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 });
      this.tlFadeMap = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-map-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      this.tlFadeMap
        .to(title.words, { autoAlpha: 1, yPercent: 0, duration: .6, stagger: .02 })
        .to(sub.words, { autoAlpha: 1, yPercent: 0, duration: .4, stagger: .015 }, '<=.2')
      let tlFadeImg = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-map-img',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFadeImg
        .from('.home-map-img', { autoAlpha: 0, y: 60, duration: .6 })
    }
  }
  let homeMap = new HomeMap();
  class HomeOpp {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
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
    setup() {
      
      const title = new SplitType('.home-oppo-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set('.home-oppo-tags-item', { autoAlpha: 0, yPercent: 80 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-oppo-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .8 })
        .to('.home-oppo-tags-item', { autoAlpha: 1, yPercent: 0, stagger: .08, duration: .4, clearProps: 'all' }, '<=.2')

      let allItems = $('.home-oppo-count-item');
      allItems.each((idx, item) => {
        const content = new SplitType($(item).find('.home-oppo-count-item-sub'), { types: 'lines words', lineClass: 'kv-line ' });
        gsap.set(content.words, { autoAlpha: 0, yPercent: 60 })
        gsap.set($(item).find('.home-oppo-count-item-title'), { autoAlpha: 0, yPercent: 60 })
        let tlItem = new gsap.timeline({
          scrollTrigger: {
            trigger: '.home-oppo-count-wrap',
            start: $(window).width() > 767 ? "top top+=75%" : "top top+=20%",
            once: true,
            onComplete: () => {
              // content.revert()
            }
          }
        })
        let number = parseInt($(item).find('.span-number-count').text());
        tlItem
          .to($(item).find('.home-oppo-count-item-title'), {
            autoAlpha: 1, yPercent: 0, duration: .6, onStart: () => {
              countUpTo(number, $(item).find('.span-number-count'), 1000);
            }
          })
          // .from('.home-oppo-count-item-title', {autoAlpha: 0, yPercent: 60, stagger: .02, duration: .6}, '<=.0')
          .to(content.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.2')

      })
    }

  }
  let homeOpp = new HomeOpp();

  class HomeBlog {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
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
    setup() {
      const title = new SplitType('.home-blog-title', { types: 'lines, words', lineClass: 'kv-line heading-line' });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-blog-title',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        },
        onComplete: () => {
          // sub.revert();
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
      let tlFadeItem = new gsap.timeline({
        scrollTrigger: {
          trigger: '.home-blog-post',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        },
        onComplete: () => {
          // sub.revert();
        }
      })
      let allItems = $('.home-blog-item');
      allItems.each((idx, item) => {
        let content = new SplitType($(item).find('.home-blog-item-title'), { types: 'lines, words', lineClass: 'kv-line ' });
        gsap.set(content.words, { autoAlpha: 0, yPercent: 60 })
        gsap.set($(item).find('.home-blog-item-thumb'), { autoAlpha: 0, y: 60 })
        gsap.set($(item).find('.home-blog-item-date-wrap'), { autoAlpha: 0, yPercent: 60 })
        if (idx <= 5) {
          tlFadeItem
            .to($(item).find('.home-blog-item-thumb'), { autoAlpha: 1, y: 0, duration: 1.2, clearProps: 'all' }, `${idx * .2}`)
            .to($(item).find('.home-blog-item-date-wrap'), { autoAlpha: 1, yPercent: 0, duration: .6, clearProps: 'all' }, '<=.6')
            .to(content.words, {
              autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4, onComplete: () => {
                // content.revert();
              }
            }, '<=.2')
        }
      })

    }
  }
  let homeBlog = new HomeBlog();
  class ContactHero {
    constructor() {
      this.tlFade;
      this.Promotion=[];
      this.persentPrice= 0;
      this.persentName= 'No Promotion';
    }
    setup() {
      $('.contact-promo-item-title-ic').on('click', function () {

        var textToCopy = $(this).parent().find('.contact-promo-item-title').text();
        console.log('textToCopy', $(this).parent().find('.dowload_hash'))
        let item = $(this).parent();
        var tempInput = $('<input>');
        $('body').append(tempInput);
        tempInput.val(textToCopy).select();
        document.execCommand('copy');
        tempInput.remove();
        item.find('.tooltip').text('Copied!')
        
        setTimeout(function () {
            item.find('.tooltip').text('Copy')
        }, 2000)
    });
      $('.contact-promo-item-promotion').each((idx, item) => {
        let promo = $(item).attr('data-promotion-price');
        let name = $(item).closest('.contact-promo-item').find('.contact-promo-item-title').attr('data-promotion-code').toUpperCase();
        this.Promotion.push({
          promo: promo,
          name: name
      });
      })
      console.log(this.Promotion);
      const title = new SplitType('.contact-hero-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      const sub = new SplitType('.contact-hero-sub', { types: 'lines words', lineClass: 'kv-line ' });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      gsap.set('.contact-form', { autoAlpha: 0, y: 100 })
      this.tlFade = new gsap.timeline({
        paused: true,
        onComplete: () => {
        }
      })
      this.tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.2')
        .to('.contact-form', { autoAlpha: 1, y: 0, duration: 1, clearProps: 'all' }, '<=.3')
        $('.form-contact-input-promo-submit').on('click',  () => {
          let code = $('.input-code').val().toUpperCase();
          console.log(this.Promotion)
          let foundItem = this.Promotion.find(item => item.name === code)
          if (foundItem) {
            this.persentPrice = parseInt( foundItem.promo);
            this.persentName = parseInt( foundItem.name);
            $('.contact-form-tranfer-promo-title').text(`${foundItem.name}  ${foundItem.promo}%`);
            $('.ma-giam-gia').val(`${foundItem.name}  ${foundItem.promo}%`);
            $('.promotion-number').text(parseInt($('.origin-number').text())*foundItem.promo/100);
          $('.final-number').text(parseInt($('.origin-number').text()) - parseInt($('.origin-number').text())*this.persentPrice/100);
            $('.final-price').val(parseInt($('.origin-number').text()) - parseInt($('.origin-number').text())*this.persentPrice/100)
          }
          console.log(code)
        })
      $('.course-price').on('change', () => {
        let checkedCount = $('.course-price:not(".course-checkbox-full"):checked').length;
        console.log(checkedCount)
        let price = 0;
        let name = 'No Course'
        if (checkedCount > 0) {
          $('.course-price:checked').each((idx, item) => {
            price = price + parseInt($(item).attr('price'));
            name = name + $(item).attr('data-name') + (idx === $('.course-price:checked').length - 1 ? '' : ', ')
          })
        }
        
        $('.money-number').text(price);
        $('.origin-number').text(price);
        console.log(this.persentPrice);
        $('.final-number').text(price - price*this.persentPrice/100);
        $('.final-price').val(price - price*this.persentPrice/100)

        $('.promotion-number').text(price*this.persentPrice/100);
        $('.contact-form-tranfer-origin-title').text(name);
        if (checkedCount === 3) {
          $('.course-notification-wrap').addClass('active');
        }
        else {
          $('.course-notification-wrap').removeClass('active');
        }
      })
      $('.course-checkbox').on('change', function (e) {
        let checkedCount = $('.course-checkbox:checked').length;
        if (checkedCount === 3) {
          $('.course-notification-wrap').addClass('active');
        }
      })
      $('.course-notification-ic-close').on('click', function () {
        $('.course-notification-wrap').removeClass('active');
      })
      let requetId;
      function checkSuccess() {
        if ($('.contact-form-main-inner').css('display') === 'none') {
          $('.form-contact-success').addClass('active');

        } else {
          // console.log("Phần tử đang hiển thị.");
        }
        requetId = requestAnimationFrame(checkSuccess)
      }
      requestAnimationFrame(checkSuccess);
      $('.form-success-close').on('click', function () {
        location.reload();
      })
      $('.course-checkbox-full').on('change',  (e) => {
        if ($(e.currentTarget).is(':checked')) {
          $(e.currentTarget).closest('.contact-form-main-inner').find('.course-checkbox').prop('checked', false);
          $(e.currentTarget).closest('.contact-form-main-inner').find('.course-checkbox').prop('disabled', true);
          $(e.currentTarget).closest('.contact-form-main-inner').find('.contact-form-register-course-item').addClass('disable');
          $('.form-contact-success-title-one').hide();
          $('.form-contact-success-title-full').show();
          $('.contact-form-tranfer-origin-title').text($(e.currentTarget).attr('data-name'));
          $('.money-number').text($(e.currentTarget).attr('price'));
          $('.origin-number').text($(e.currentTarget).attr('price'));
          let price = parseInt($(e.currentTarget).attr('price'));
          console.log(price);
          $('.final-number').text(price - price*this.persentPrice/100);
          $('.final-price').val(price - price*this.persentPrice/100)

        $('.promotion-number').text(price*this.persentPrice/100);
        }
        else{
          $('.contact-form-tranfer-origin-title').text('No Course');
          $(e.currentTarget).closest('.contact-form-main-inner').find('.course-checkbox').prop('disabled', false);
          $(e.currentTarget).closest('.contact-form-main-inner').find('.contact-form-register-course-item').removeClass('disable');
          $('.form-contact-success-title-full').hide();
          $('.form-contact-success-title-show').show()
        }
      })
      let animSuccess = new gsap.timeline({
        repeat: -1,
      })
      animSuccess
        .fromTo('.ic-eye2', { autoAlpha: 1 }, { autoAlpha: 1, duration: .8 })
        .fromTo('.ic-eye', { autoAlpha: 1 }, { autoAlpha: 1, duration: .8 }, "<=0")
        .fromTo('.ic-mouse', { 'strokeDasharray': '0px 60px' }, { 'strokeDasharray': '60px 60px', duration: 1, ease: 'power1.out' }, '<=.2')
        .fromTo('.ic-eye2', { autoAlpha: 0 }, { autoAlpha: 1, duration: .8 }, '<=.8')
        .fromTo('.ic-eye', { autoAlpha: 0 }, { autoAlpha: 1, duration: .8 }, '<=.2')
      $('.form-contact-success-ic').each((idx, item) => {
        let tlIc = gsap.timeline({
          repeat: -1,
        });
        tlIc.fromTo(
          item,
          { rotation: 0 },
          { rotation: 720, duration: 2, ease: 'power2.out' }
        );
        tlIc.fromTo(
          item,
          { rotation: 720 },
          { rotation: 0, duration: 2, ease: 'power2.out' }
        );
      });

    }
    play() {
      console.log('contact play')
      this.tlFade.play()
    }
  }
  let contactHero = new ContactHero();
  class ContactPromo{
    constructor() {
      this.tlTrigger,
      this.titleFade
    }
    setTrigger() {
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-promo',
          start: "top bottom+=50%",
          // end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
    setup() {
      const title = new SplitType('.contact-promo-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      gsap.set(title.words, {autoAlpha: 0 , yPercent: 60})
      gsap.set('.contact-promo-item', {autoAlpha: 0, y: 30});
      this.titleFade = new gsap.timeline({
        scrollTrigger: {
          paused: true,
          trigger: '.contact-promo-title',
          start: $(window).width() > 767 ? "top top+=45%" : "top top+=35%",
          once: true,
        }
      })
      this.titleFade
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .8})
        .to('.contact-promo-item', {autoAlpha: 1, y: 0, stagger: .02, duration: .8}, '<=.2')
      $('.contact-promo-item-promotion').each((idx, item) => {
        let promo = $(item).attr('data-promotion-price');
        let name = $(item).closest('.contact-promo-item').find('.contact-promo-item-title').attr('data-promotion-code');
     
        $(item).text(`${promo}%`)
      })
    }
    play(){
      this.titleFade.play()
    }
  }
  let contactPromo = new ContactPromo();
  class AboutHero {
    constructor() {
      this.tlFade;
    }
    setup() {
      const title = new SplitType('.about-hero-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      const sub = new SplitType('.about-hero-sub', { types: 'lines words', lineClass: 'kv-line ' });
      const label = new SplitType('.about-hero-label', { types: 'lines words', lineClass: 'kv-line ' });
      this.tlFade = new gsap.timeline({
        paused: true,
        onComplete: () => {
        }
      })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      gsap.set(label.words, { autoAlpha: 0, yPercent: 80 })
      this.tlFade
        .to(label.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 })
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .025, duration: .6 }, '<=.2')
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.1')
    }
    play() {
      console.log('about play')
      this.tlFade.play()
    }
  }
  let aboutHero = new AboutHero()
  class AboutDevelop {
    constructor() {
      this.tlTrigger
    }
    setTrigger() {
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-develop',
          start: "top bottom+=50%",
          // end: "bottom top",
          once: true,
          onEnter: () => {
            console.log('develop')
            this.setup();
          }
        },
      })
    }
    setup() {
      const title = new SplitType('.about-develop-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      const sub = new SplitType('.about-develop-sub', { types: 'lines words', lineClass: 'kv-line' })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-develop-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .3 }, "<=.2")
      let allItems = $('.about-develop-item');
      allItems.each((idx, item) => {
        let titleItem = new SplitType($(item).find('.about-develop-item-title'), { types: 'lines words', lineClass: 'kv-line' })
        let subItem = new SplitType($(item).find('.about-develop-item-sub'), { types: 'lines words', lineClass: 'kv-line' })
        gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
        gsap.set(subItem.words, { autoAlpha: 0, yPercent: 80 })
        gsap.set($(item).find('.about-develop-item-ic'), { autoAlpha: 0, y: 60 })
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
          }
        })
        tlFadeItem
          .to($(item).find('.about-develop-item-ic'), { autoAlpha: 1, y: 0, duration: .6 }, `<= ${idx * .2}`)
          .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<.2')
          .to(subItem.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .3 }, "<=.3")
      })
    }
  }
  let aboutDevelop = new AboutDevelop();
  class AboutFounder {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-founder',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
    setup() {
      let animSuccess = new gsap.timeline({
        repeat: -1,
      })
      animSuccess
        .fromTo('.eye-left', { autoAlpha: 0 }, { autoAlpha: 1, duration: .8 })
        .fromTo('.eye-right', { autoAlpha: 0 }, { autoAlpha: 1, duration: .8 }, "<=0")
        .fromTo('.mouse', { 'strokeDasharray': '0px 80px' }, { 'strokeDasharray': '50px 80px', duration: 1, ease: 'power1.out' }, '<=.2')
        .fromTo('.eye-right', { autoAlpha: 0 }, { autoAlpha: 1, duration: .8 }, '<=.8')
        .fromTo('.eye-left', { autoAlpha: 0 }, { autoAlpha: 1, duration: .8 }, '<=.2')
      const title = new SplitType('.about-founder-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      const sub = new SplitType('.about-founder-sub', { types: 'lines words', lineClass: 'kv-line' })
      const label = new SplitType('.about-founder-label', { types: 'lines words', lineClass: 'kv-line' })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      gsap.set(label.words, { autoAlpha: 0, yPercent: 80 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-founder-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFade
        .to(label.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 })
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .025, duration: .6 }, '<=.2')
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.1')
      let mainItems = $('.about-founder-main');
      mainItems.each((idx, item) => {
        let titleItem = new SplitType($(item).find('.about-founder-main-item-name'), { types: 'lines words', lineClass: 'kv-line' })
        let subItem = new SplitType($(item).find('.about-founder-main-item-sub'), { types: 'lines words', lineClass: 'kv-line' })
        let decItem = new SplitType($(item).find('.about-founder-main-item-ul li'), { types: 'lines words', lineClass: 'kv-line' })
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
          }
        })
        gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
        gsap.set(subItem.words, { autoAlpha: 0, yPercent: 80 })
        gsap.set($(item).find('.about-founder-main-item-img'), { autoAlpha: 0, y: 60 })
        gsap.set($(item).find('.about-founder-main-item-social-inner'), { autoAlpha: 0, yPercent: 80 })
        gsap.set(decItem.words, { autoAlpha: 0, yPercent: 80 })
        tlFadeItem
          .to($(item).find('.about-founder-main-item-img'), { autoAlpha: 1, y: 0, duration: .6 }, `${idx * .2}`)
          .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 },)
          .to(subItem.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
          .to($(item).find('.about-founder-main-item-social-inner'), { autoAlpha: 1, yPercent: 0, stagger: .05, duration: .5 }, '<=.2')
          .to(decItem.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .3 }, '<=.3')
      })
      let allTitleJourney = $('.about-journey-pa-title');
      allTitleJourney.each((idx, item) => {
        let titleItemJourney = new SplitType(item, { types: 'lines words', lineClass: 'kv-line' })
        gsap.set(titleItemJourney.words, { autoAlpha: 0, yPercent: 60 })
        gsap.set($(item).closest('.about-journey-item-inner-people').find('.about-journey-logo').find('.about-journey-logo-item'), { autoAlpha: 0, x: -20 })
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
          }
        })
        // console.log($(item).closest('.about-journey-pa-title-wap'))
        tlFadeItem
          .to($(item).closest('.about-journey-item-inner-people').find('.about-journey-logo').find('.about-journey-logo-item'), { x: 0, autoAlpha: 1, duration: .6, stagger: .2 })
          .to(titleItemJourney.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .6 }, '<=0')
      })
      let tlJourneyEnd = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-journey-item-content',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      let journeyEndSub = new SplitType($('.about-journey-item-content-sub'), { types: 'lines words', lineClass: 'kv-line' })
      gsap.set(journeyEndSub.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set('.about-journey-item-content-title-wrap', { autoAlpha: 0, yPercent: 60 })
      tlJourneyEnd
        .to('.about-journey-item-content-title-wrap', { autoAlpha: 1, yPercent: 0, duration: .6, clearProps: 'all' })
        .to(journeyEndSub.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4 }, '<=.3')
      let allItems = $('.about-journey-item-wrap')
    if(viewport.w > 767){
      allItems.each((idx, item) => {
        let tlFade = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top+=55% center',
            end: 'bottom+=45% center',
            scrub: true,
          }
        })
        tlFade.to(item, { autoAlpha: 0, scale: .9 })
      })
      $('.about-journey-item-line-label').each((idx, item) => {
        console.log($(item).height())
        let tlFadeLabel = new gsap.timeline({
          scrollTrigger: {
            trigger: $(item).closest('.about-journey-item-wrap'),
            start: 'top center',
            end: 'bottom+=45% center',
            scrub: true,
          }
        })
        tlFadeLabel.fromTo(item, { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1 })
      })
      $('.line-abl').each((idx, item) => {
        let tlFadeLine = new gsap.timeline({
          scrollTrigger: {
            trigger: $(item).closest('.about-journey-item-wrap'),
            start: 'top  center',
            end: 'bottom+=45% center',
            scrub: true,
          }
        })
        let height = $(item).find('svg').height();

        tlFadeLine.fromTo(item, { 'strokeDasharray': `0 ${height}` }, { 'strokeDasharray': `${height} ${height}` })
      })
      let tlFadeLineEnd = new gsap.timeline({
        scrollTrigger: {
          trigger: $(' .about-journey-item-wrap-end .about-journey-item'),
          start: 'top center',
          end: 'center center',
          scrub: true,
        }
      })
      tlFadeLineEnd
        .fromTo($('.about-journey-item-wrap-end .about-journey-item-time'), { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0 },)
        $('.line-abl-top').each((idx, item) => {
          console.log($(item).height())
          if ($(item).closest('.about-journey-item-wrap').length > 0) {
            let tlFadeLine = new gsap.timeline({
              scrollTrigger: {
                trigger: $(item).closest('.about-journey-item-wrap'),
                start: 'top-=50%  bottom',
                end: 'bottom+=35% bottom',
                scrub: true,
              },

            })
            let height = $(item).find('svg').height();

            tlFadeLine
              .fromTo(item, { 'strokeDasharray': `0 ${height * 2}` }, { 'strokeDasharray': `${height * 2} ${height * 2}` })
          }
          else {
            let tlFadeLine = new gsap.timeline({
              scrollTrigger: {
                trigger: $(item).closest('.about-journey-item-wrap-end'),
                start: 'top-=100%  bottom',
                end: 'bottom-=20% bottom',
                scrub: true,

              },

            })
            let height = $(item).find('svg').height();

            tlFadeLine.fromTo(item, { 'strokeDasharray': `0 ${height * 2}` }, { 'strokeDasharray': `${height * 2} ${height * 2}` })
          }
      })
    }
      
      $('.about-journey-item-year').each((idx, item) => {
        let tlFadeLine = new gsap.timeline({
          scrollTrigger: {
            trigger: $(item).closest('.about-journey-item-wrap'),
            start: 'top-=40%  center-=20%',
            end: 'bottom-=40% center-=20%',
            scrub: true,
          }
        })
        tlFadeLine
          .fromTo(item, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0 },)
      })
     
    }
  }
  let aboutFounder = new AboutFounder();
  class AboutMentor {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-mentor',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
    setup() {
      const title = new SplitType('.about-mentor-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      const sub = new SplitType('.about-mentor-sub', { types: 'lines words', lineClass: 'kv-line' })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-mentor-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .from('.about-mentor-title-wrap .line-staight', { autoAlpha: 0, scaleY: 0, transformOrigin: 'top', duration: .5 }, "<=0")
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .3 }, "<=.3")
      let allItems = $('.about-mentor-item');
      allItems.each((idx, item) => {
        let titleItem = new SplitType($(item).find('.about-mentor-item-name'), { types: 'lines words', lineClass: 'kv-line' })
        let subItem = new SplitType($(item).find('.about-mentor-item-postion'), { types: 'lines words', lineClass: 'kv-line' })
        gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
        gsap.set(subItem.words, { autoAlpha: 0, yPercent: 80 })
        gsap.set($(item).find('.about-mentor-item-img'), { autoAlpha: 0, y: 30 })
        gsap.set($(item).find('.about-mentor-item-ic'), { autoAlpha: 0, y: 10 })
        gsap.set($(item).find('.about-mentor-logo'), { autoAlpha: 0, y: 10 })
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
          }
        })
        tlFadeItem
          .to($(item).find('.about-mentor-item-img'), { autoAlpha: 1, y: 0, duration: .8 })
          .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.2')
          .to(subItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, "<=.3")
          .to($(item).find('.about-mentor-item-ic'), { autoAlpha: 1, y: 0, duration: .6 }, '<=.2')
          .to($(item).find('.about-mentor-logo'), { autoAlpha: 1, y: 0, duration: .6 }, '<=.2')
      })
    }
  }
  let aboutMentor = new AboutMentor()
  class AboutMember {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-member',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
    setup() {
      const title = new SplitType('.about-member-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      const sub = new SplitType('.about-member-sub', { types: 'lines words', lineClass: 'kv-line' })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      gsap.set('.about-member-title-wrap .line-staight', { autoAlpha: 0, scaleY: 0 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-member-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to('.about-member-title-wrap .line-staight', { autoAlpha: 1, scaleY: 1, transformOrigin: 'top', duration: .5 }, "<=0")
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .3 }, "<=.3")
      let allItems = $('.about-member-item');
      allItems.each((idx, item) => {
        let titleItem = new SplitType($(item).find('.about-member-item-name'), { types: 'lines words', lineClass: 'kv-line' })
        let subItem = new SplitType($(item).find('.about-member-item-position'), { types: 'lines words', lineClass: 'kv-line' })
        gsap.set(titleItem.words, { autoAlpha: 0, yPercent: 60 })
        gsap.set(subItem.words, { autoAlpha: 0, yPercent: 80 })
        gsap.set($(item).find('.about-member-item-img'), { autoAlpha: 0, y: 30 })
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
          }
        })
        tlFadeItem
          .to($(item).find('.about-member-item-img'), { autoAlpha: 1, y: 0, duration: .8 })
          .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, '<=.2')
          .to(subItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 }, "<=.2")
      })
    }
  }
  let aboutMember = new AboutMember()
  class AboutPartner {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-partner',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
    setup() {
      const title = new SplitType('.about-partner-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      gsap.set(title.words, {
        autoAlpha: 0, yPercent: 60
      })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-partner-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
      let tlFadeItem = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-partner-list',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      gsap.set('.about-partner-item', { autoAlpha: 0, y: 35 })
      tlFadeItem
        .to('.about-partner-item', { autoAlpha: 1, y: 0, stagger: .2, duration: .6 })

    }
  }
  let aboutPartner = new AboutPartner();
  class AboutJoin {
    constructor() {
      this.tlTrigger;
    }
    setTrigger() {
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-join',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
    setup() {
      const title = new SplitType('.about-join-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      const sub = new SplitType('.about-join-sub', { types: 'lines words', lineClass: 'kv-line' })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 })
      gsap.set('.about-join-btn-wrap .btn', { autoAlpha: 0, yPercent: 40 })
      gsap.set('.about-join-content-img', { autoAlpha: 0, y: 60 })
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.about-join-content',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to('.about-join-content-img', { autoAlpha: 1, y: 0, duration: .6 }, '<=0')
        .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .3 }, "<=.3")
        .to('.about-join-btn-wrap .btn', { autoAlpha: 1, yPercent: 0, stagger: .2, duration: .6 }, "<=.4")
    }
  }
  let aboutJoin = new AboutJoin();
  class Footer {
    constructor() {
      this.tlFade;
      this.tlTrigger;
    }
    setTrigger() {
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.kv-footer',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup() {
      this.tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.footer-menu',
          start: 'top top+=85%',
          once: true,
        }
      })
      this.tlFade
        .from('.footer-item-txt', { autoAlpha: 0, yPercent: 100, duration: 1, stagger: .04, clearProps: 'all' })
        .from('.footer-social', { autoAlpha: 0, yPercent: 60, duration: .6, stagger: .04, clearProps: 'all' }, '<=.5')
    }
  }
  let footer = new Footer();
  class CTA {
    constructor() {
      this.tlTrigger
    }
    setTrigger() {
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
    setup() {
      const title = new SplitType('.homt-cta-title', { types: 'lines, words', lineClass: 'kv-line ' });
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.homt-cta-title',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=50%",
          once: true,
        },
        onComplete: () => {
          // title.revert();
        }
      })
      tlFade
        .from(title.words, { autoAlpha: 0, yPercent: 60, stagger: .02, duration: .4 })
        .from('.home-cta-btn', { autoAlpha: 0, yPercent: 60, duration: .6, clearProps: 'all' }, '<=.4')

    }
  }
  class ResourceHero{
    constructor(){
      this.tlFade;
    }
    setup(){
      const titleHero = new SplitType('.rs-hero-title', { types: 'lines, words', lineClass: 'kv-line heading-line' });
      const titleForm = new SplitType('.rs-form-title', { types: 'lines, words', lineClass: 'kv-line heading-line' });
      const subForm = new SplitType('.rs-form-sub', { types: 'lines, words', lineClass: 'kv-line heading-line' });
      const label = new SplitType('.rs-hero-label', { types: 'lines, words', lineClass: 'kv-line ' });
      const sub = new SplitType('.rs-hero-sub', { types: 'lines, words', lineClass: 'kv-line ' });
      gsap.set(titleHero.words, { autoAlpha: 0, yPercent: 60 });
      gsap.set(titleForm.words, { autoAlpha: 0, yPercent: 60 });
      gsap.set(label.words, { autoAlpha: 0, yPercent: 80 });
      gsap.set(sub.words, { autoAlpha: 0, yPercent: 80 });
      gsap.set(subForm.words, { autoAlpha: 0, yPercent: 80 });
      gsap.set('.rs-form-register', { autoAlpha: 0, yPercent: 60 });
      this.tlFade = new gsap.timeline({
        scrollTrigger: {
          paused: true,
          trigger: '.rs-hero-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
          },
        });
        this.tlFade
              .to(label.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .6 })
              .to(titleHero.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .4 }, '<=.2')
              .to(sub.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
              .to(titleForm.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
              .to(subForm.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
              .to('.rs-form-register', { autoAlpha: 1, yPercent: 0, duration: .4, clearProps: 'all' }, '<=.2')
    }
    play(){
      this.tlFade.play();
    }
  }
  let resourceHero = new ResourceHero();
   class ResourceForm {
    constructor(){
      // this.tlTrigger;
    }
    setup(){
      const formSubmitEvent = (function () {
        const init = ({ onlyWorkOnThisFormName, onSuccess, onFail, onStart }) => {
          $(document).ajaxStart(function () {
            onStart?.();
          });
          $(document).ajaxComplete(function (event, xhr, settings) {
            if (settings.url.includes("https://webflow.com/api/v1/form/")) {
              const isSuccessful = xhr.status === 200;
              const isWorkOnAllForm = onlyWorkOnThisFormName == undefined;
              const isCorrectForm =
                !isWorkOnAllForm &&
                settings.data.includes(
                  getSanitizedFormName(onlyWorkOnThisFormName)
                );
  
              if (isWorkOnAllForm) {
                if (isSuccessful) {
                  onSuccess?.();
                } else {
                  onFail?.();
                }
              } else if (isCorrectForm) {
                if (isSuccessful) {
                  onSuccess?.();
                } else {
                  onFail?.();
                }
              }
            }
          });
        };
        function getSanitizedFormName(name) {
          return name.replaceAll(" ", "+");
        }
        return {
          init,
        };
      })();
      formSubmitEvent.init({
        onlyWorkOnThisFormName: "Email Form",
        onSuccess: () => {
          $('.rs-form-submit-inner').addClass('done')
          $(".rs-form-submit").val( "");
          $('.rs-form-input').val('');
          $('.rs-form-input').attr('placeholder', 'Cảm ơn bạn đã đăng ký! Stay tune!');
          $('.rs-form-input').addClass('done');
          $('.rs-form').addClass('done');

        },
        onFail: () => {
          console.log("fail");
        },
      });
    }
   }
   let resourceForm = new ResourceForm();
  class ResourceCalendar {
    constructor() {
    }
    setup() {
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.rs-event',
          start: viewport.w > 767 ? "top top+=65%" : "top top+=35%",
          end: "bottom top",
          once: true,
        }
      })
      const title = new SplitType('.rs-event-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 })
      gsap.set ('.rs-event-calendar-iframe', { autoAlpha: 0, y: 100 })
      gsap.set('.rs-event-calendar',  { autoAlpha: 0, y: 100 })
      tlFade
          .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
          .to('.rs-event-calendar', { autoAlpha: 1, y: 0, stagger: .02, duration: 1 }, '<=.2')
          .to('.rs-event-calendar-iframe', { autoAlpha: 1, y: 0, stagger: .02, duration: 1 }, '<=.0')
      let link_calendar = $('.rs-event-calendar-date').eq(0).attr('link');
      $('.iframe-luna').attr('src', link_calendar);
      $('<iframe>', {
        src: link_calendar,
        frameborder: '0',
        style: 'width: 100%',
        allowfullscreen: '',
        'aria-hidden': 'false',
        tabindex: '0',
        id: 'lu-ma-iframe' // Đặt ID cho iframe để dễ quản lý
    }).appendTo('.rs-event-calendar-iframe .embed-ic'); ;
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      const day = document.querySelector(".calendar-dates");
      const currdate = document
        .querySelector(".calendar-current-date");
      const prenexIcons = document
        .querySelectorAll(".calendar-navigation span");
       
      const months = [
        "01/",
        "02/",
        "03/",
        "04/",
        "05/",
        "06/",
        "07/",
        "08/",
        "09/",
        "10/",
        "11/",
        "12/"
      ];
      const manipulate = () => {
        let dayone = new Date(year, month, 1).getDay();
        let lastdate = new Date(year, month + 1, 0).getDate();
        let dayend = new Date(year, month, lastdate).getDay();
        let monthlastdate = new Date(year, month, 0).getDate();
        let lit = "";
      
        for (let i = dayone; i > 0; i--) {
          lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
        }
        for (let i = 1; i <= lastdate; i++) {
          let isToday = i === date.getDate() &&
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear()
                        ? "active"
                        : "";
      
          lit += `<li class="${isToday}" data-date="${i}.${month + 1}.${year.toString().slice(-2)}">${i}</li>`;
        }
        for (let i = dayend; i < 6; i++) {
          lit += `<li class="inactive">${i - dayend + 1}</li>`;
        }
        currdate.innerText = `${months[month]} ${year}`;
        day.innerHTML = lit;
      
        addEventDates(); // Gọi hàm để thêm class cho các ngày có sự kiện
      };
      
      // Hàm để thêm class .event-date cho các ngày có sự kiện
      const addEventDates = () => {
        let allEvents = $('.rs-event-calendar-date');
        
        allEvents.each((idx, item) => {
          let eventDate = $(item).attr('time');
          
          // Convert eventDate from "dd.mm.yy" to Date object
          let [day, month, year] = eventDate.split('.');
          let formattedDate = `${parseInt(day)}.${parseInt(month)}.${parseInt(year)}`;
          
          // Tìm các ngày trong lịch trùng với event date và thêm class .event-date
          $(`li[data-date="${formattedDate}"]`).addClass('event-date').attr('link', $(item).attr('link'));
        });
      };
    
      manipulate();
      prenexIcons.forEach(icon => {
        icon.addEventListener("click", () => {
          month = icon.id === "calendar-prev" ? month - 1 : month + 1;
          if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
          }
          else {
            date = new Date();
          }
          manipulate();
        });
      });
      $('.event-date').on('click', function() {
        $('#lu-ma-iframe').attr('src', $(this).attr('link'))
        console.log('khanh')
      })
    }
  }
  let resourceCalendar = new ResourceCalendar();
  class ResourceBlog {
    constructor (){
      this.tlTrigger;
    }
    setTrigger(){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger: {
          trigger: '.rs-blog',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        },
      })
    }
    setup() {
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.rs-blog-title',
          start : viewport.w>767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      const title = new SplitType('.rs-blog-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 });
      gsap.set('.rs-blog-cate-item', { autoAlpha: 0, x: 10 });
      tlFade
            .to(title.words, { autoAlpha: 1, yPercent: 0, duration: .6})
            .to('.rs-blog-cate-item', { autoAlpha: 1, x: 0,stagger: .1, duration: .4}, '<=.2')
      gsap.set('.rs-blog-item', { autoAlpha: 0, y: 50 });
      $('.rs-blog-item').each((idx, item) => {
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
          }
        })
        tlFadeItem
                .to(item, { autoAlpha: 1, y: 0, duration: 1 })
      })
      if(viewport.w < 767){
        $('.rs-blog-cate-cms').addClass('swiper');
        $('.rs-blog-cate-list').addClass('swiper-wrapper');
        $('.rs-blog-cate-item').addClass('swiper-slide');
        let swiperBlogCate = new Swiper('.rs-blog-cate-cms', {
          slidesPerView: 'auto',
          spaceBetween: parseRem(0),
        });
      }
      if(viewport.w>767){
      $('.rs-blog-item.active').eq(0).addClass('child11');

      }
      $('.rs-blog-cate-item').eq(0).addClass('active');
      function activeItem(category){
        $('.rs-blog-item').each((idx, item) => {
          console.log($(item).attr('category'));
          if($(item).attr('category') == category){
            $(item).addClass('active');
          }
          else {
            $(item).removeClass('active');
          }
        })
      }
      $('.rs-blog-cate-item').on('click', function () {
        $('.rs-blog-cate-item').removeClass('active');
        $(this).addClass('active');
        let category = $(this).find('.txt').text();
        console.log(category)
        let index = $(this).index();
        if(index == 0){
          $('.rs-blog-item').removeClass('active').addClass('active');
          $('.rs-blog-item.active').removeClass('child11');
          $('.rs-blog-item.active').eq(0).addClass('child11');

        }
        else{
          activeItem(category);
        }
        // $('.rs-blog-item').removeClass('swiper-slide');
        // $('.rs-blog-item.active').addClass('swiper-slide');
        if(viewport.w > 767){
          $('.rs-blog-item.active').eq(0).addClass('child11');

        }
      })
    }
  }
  let resourceBlog = new ResourceBlog();
  class ResourceLetter {
    constructor(){
      this.tlTrigger;
      this.tlFade;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.rs-newletter',
          start: "top bottom+=50%",
          end: "bottom+=50% top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
  setup(){
      let title = new SplitType('.rs-newletter-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      gsap.set(title.words, { autoAlpha: 0, yPercent: 60 });
     if(viewport.w > 767){
      gsap.set('.rs-newletter-item', { autoAlpha: 0, x: -30 });
     }
     else {
      gsap.set('.rs-newletter-item', { autoAlpha: 0, y: -30 });

     }
      gsap.set('.rs-newletter-btn', { autoAlpha: 0, y: 30 });
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger : '.rs-newletter-title-wrap',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFade
      .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
      .to('.rs-newletter-btn', { autoAlpha: 1, y: 0, duration: .6, clearProps: 'all' },'<=0')
      if(viewport.w > 767){
        tlFade
        .to('.rs-newletter-item', { autoAlpha: 1, x: 0, duration: .8, clearProps: 'all', stagger: .1 },'<=.4');
      }
      else {
        tlFade
        .to('.rs-newletter-item', { autoAlpha: 1, y: 0, duration: .8, clearProps: 'all', stagger: .1 },'<=.4');
      }
   }
  }
  let resourceLetter = new ResourceLetter()
  class ResourceJob{
    constructor(){
      this.tlTrigger;
      this.tlFade;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.rs-job',
          start: "top bottom+=50%",
          end: "bottom+=50% top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup(){
      let title = new SplitType('.rs-job-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set('.rs-job-item', {autoAlpha: 0, y: 30});
       let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.rs-job-title',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
          }
       })
       tlFade
        .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
        .to('.rs-job-item', { autoAlpha: 1, y: 0, stagger: .2, duration: .6 }, '<=.2')
    }
  }
  let resourceJob = new ResourceJob();
  class ResourceCta {
    constructor() {
      this.tlTrigger;
      this.tlFade;
      }
      setTrigger (){
        this.tlTrigger = new gsap.timeline({
          scrollTrigger : {
            trigger : '.rs-cta',
            start: "top bottom+=50%",
          end: "bottom+=50% top",
          once: true,
            onEnter: () => {
              this.setup();
            }
          }
        })
      }
      setup(){
        let title = new SplitType('.rs-cta-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
        gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
        gsap.set('.rs-cta-btn', {autoAlpha: 0, y: 40});
        let tlFade = new gsap.timeline({
          scrollTrigger: {
            trigger: '.rs-cta-title',
            start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
            }
            })
            tlFade
            .to(title.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 })
            .to('.rs-cta-btn', { autoAlpha: 1, y: 0, duration: .6, clearProps: 'all' },'<=0.3')
      }
  }
  let resourceCta = new ResourceCta();
  class BlogHero {
    constructor(){
      this.tlFade;
    }
    setup(){
      let title = new SplitType('.blog-hero-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set('.blog-hero-cate', {autoAlpha: 0, yPercent: 100});
      gsap.set('.blog-hero-direct .txt', {autoAlpha: 0, x: 20});
      gsap.set('.blog-hero-info', {autoAlpha: 0, x: 20});
      gsap.set('.blog-hero-img', {autoAlpha: 0, y: 40});
      this.tlFade = new gsap.timeline({
        scrollTrigger: {
          paused: true,
          trigger: '.blog-hero-title',
          start:  "top bottom+=50%",
          once: true,
        }
      })  
      this.tlFade
      .to('.blog-hero-direct .txt', { autoAlpha: 1, x: 0, duration: .6, stagger: .1})
      .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
      .to('.blog-hero-img', {autoAlpha: 1, y: 0, duration: .6}, '<=0')
      .to('.blog-hero-cate', {autoAlpha: 1, yPercent: 0, duration: .6}, '<=.2')
      .to('.blog-hero-info', {autoAlpha: 1, x: 0, duration: .6}, '<=.2')
    }
    play(){
      this.tlFade.play();
    }
  }
  let blogHero = new BlogHero();
  
  class BlogContent{
    constructor(){
      this.tlTrigger;
    }
    setup(){
      let tocHeadings = $('.blog-content-inner h3');

        let tocWrap = $('.blog-content-tab');
        if (tocHeadings.length <= 1) {
            tocWrap.parents('.blog-content-tab-wrap').remove();
        }
        tocWrap.html('');

        for (let i = 0; i < tocHeadings.length; i++) {
            tocHeadings.eq(i).attr('id', `toc-${i}`);
            let tocItem = $('<a></a>').addClass('blog-content-tab-item').attr('href', `#toc-${i}`);
            let tocName = $('<div></div>').addClass('txt txt-21 txt-med ').text(tocHeadings.eq(i).text());

            tocName.appendTo(tocItem)
            tocWrap.append(tocItem);
        }
        if(tocWrap.height() > $('.blog-content-tab').height()){
          $('.blog-content-tab-wrap').attr('data-lenis-prevent', true);
        }
        $('.blog-content-tab-item').each((idx, el) => {
            gsap.from(el, {
                autoAlpha: 0, yPercent: 70, duration: .8, stagger: 0.02, delay: idx * .05, clearProps: 'all', onComplete: () => {
                    if (idx == $('.blog-content-tab-item').length - 1) {
                        this.interact();
                    }
                }
            });
        })
        // gsap.from('.subs-content-inner', { autoAlpha: 0, y: 20, duration: .6 });
    }
    interact() {
      let tocHeadings = $('.blog-content-inner h3');

      lenis.on('scroll', function (e) {
          let currScroll = e.scroll;
          for (let i = 0; i < tocHeadings.length; i++) {
              let top = tocHeadings.eq(i).get(0).getBoundingClientRect().top;
            console.log(top)

              if (top > 0 && top < (viewport.h / 5)) {
                  $(`.blog-content-tab-item[href="#toc-${i}"]`).addClass('active');
                  $(`.blog-content-tab-item`).not(`[href="#toc-${i}"]`).removeClass('active');
              }
          }
      });

      $('.blog-content-tab-item').on('click', function (e) {
          e.preventDefault();
          let target = $(this).attr('href');

          lenis.scrollTo(target, {
              offset: -100,
          })

          history.replaceState({}, '', `${window.location.pathname + target}`);
          return false;
      })

      const currToc = window.location.hash;
      if ($(currToc).length) {
          setTimeout(() => {
              $(`.blog-content-tab-item[href='${currToc}']`).trigger('click');
          }, 10)
      }
      else {
          history.replaceState({}, '', window.location.pathname);
      }
  }
  }
  let blogContent = new BlogContent();
  class CourseHero{
    constructor() {
      this.tlTrigger;
      this.tlFade;
    }
    setup(){
      this.tlFade = new gsap.timeline({
        scrollTrigger: {
          paused: true,
        }
      })
      let title = new SplitType('.cs-hero-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      let label = new SplitType('.cs-hero-label', { types: 'lines words', lineClass: 'kv-line' });
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set(label.words, {autoAlpha: 0, yPercent: 100});
      gsap.set('.cs-hero-btn', {autoAlpha: 0, y: 30});
      this.tlFade 
            .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
            .to(label.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
            .to('.cs-hero-btn', {autoAlpha: 1, y: 0, stagger: .1, duration: .4}, '<=.4')
    }
    play(){
      this.tlFade.play();
    }
  }
  let courseHero = new CourseHero();
  class CourseResume{
    constructor(){
      this.tlTrigger;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.cs-resume',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,

          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup(){
      let title = new SplitType('.cs-resume-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      gsap.set(title.words, {autoAlpha: 0, yPercent: 80});
      gsap.set('.cs-resume-title-ic', {autoAlpha: 0});
      gsap.set('.cs-resume-title-ic-bot', {autoAlpha: 0});
      let tlFade = new gsap.timeline({ 
        scrollTrigger: {
          trigger: '.cs-resume',
          start: viewport.w > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
        })
        tlFade
          .to('.cs-resume-title-ic', {autoAlpha: 1})
          .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
          .to('.cs-resume-title-ic-bot', {autoAlpha: 1}, '<=.4')

    }
  }
  let courseResume = new CourseResume();
  class CourseLevel{
    constructor(){
      this.tlTrigger;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.cs-level',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup(){
      $('.cs-level-item').hover(
        function(){
          $(this).addClass('active');
        },
        function(){
          $(this).removeClass('active');
          }
      )
      let title = new SplitType('.cs-level-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      let sub = new SplitType('.cs-level-sub', { types: 'lines words', lineClass: 'kv-line' });
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.cs-level-title-wrap',
          start: viewport.w > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
          }
      })
      tlFade
      .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
      .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.4')
      let items = $('.cs-level-item');
      items.each(function(idx, item){
        let titleItem = new SplitType($(item).find('.cs-level-item-title'), { types: 'lines words', lineClass: 'kv-line' });
        let subItem = new SplitType($(item).find('.cs-level-item-sub'), { types: 'lines words', lineClass: 'kv-line' });
        gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60});
        gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80});
        gsap.set($(item).find('.cs-level-item-ic'), {autoAlpha: 0, y: 30});

        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: viewport.w > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
          }
        })
        tlFadeItem
        .to($(item).find('.cs-level-item-ic'), {autoAlpha: 1, y: 0, duration: .6})
        .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
        .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
      })
    }
  }
  let courseLevel = new CourseLevel();
  class CourseFouder{
    constructor(){
      this.tlTrigger;
      this.tlFade;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.cs-founder',
          start: "top bottom+=50%",
          end: "bottom+=50% top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup(){
      let title = new SplitType('.cs-founder-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      let sub = new SplitType('.cs-founder-sub', { types: 'lines words', lineClass: 'kv-line' });
      gsap.set (title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set (sub.words, {autoAlpha: 0, yPercent: 80});
      gsap.set('.cs-founder-title-btn-wrap', {autoAlpha: 0, y: 30});
      this.tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.cs-founder-title-wrap',
          start: "top top+=65%",
          once: true,
          }
          })
          this.tlFade
              .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
              .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
              .to('.cs-founder-title-btn-wrap', {autoAlpha: 1, y: 0, duration: .6}, '<=.2')
          let items = $('.cs-founder-item');
          console.log(items)
          items.each((idx, item) =>  {
            console.log(idx)
            let titleItem = new SplitType($(item).find('.cs-founder-item-title'), { types: 'lines words', lineClass: 'kv-line' });
            let subItem = new SplitType($(item).find('.cs-founder-item-sub'), { types: 'lines words', lineClass: 'kv-line' });
            $(item).find('.cs-founder-item-ul .about-founder-main-item-li').each((idx, li) => {
              console.log(li)
              let liTitle = new SplitType($(li), { types: 'lines words', lineClass: 'kv-line' });
              gsap.set(liTitle.words, {autoAlpha: 0, yPercent: 80});
            })
            gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80});
            // gsap.set($(item).find('.cs-founder-item-ul .about-founder-main-item-li .word'), {autoAlpha: 0, yPercent: 80});
            gsap.set ($(item).find('.cs-founder-item-ic'), {autoAlpha: 0, y: 30});
            gsap.set ($(item).find('.cs-founder-item-img'), {autoAlpha: 0});
           let tlFadeItem = new gsap.timeline({
              scrollTrigger: {
                trigger: item,
                start: viewport.w > 767 ? "top top+=65%" : "top top+=35%",
                once: true,
              }
            });
            tlFadeItem
            .to($(item).find('.cs-founder-item-img'), {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
            .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.4')
            .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
            .to($(item).find('.cs-founder-item-ic'), {autoAlpha: 1, y: 0, duration: .6}, '<=.2')
            .to($(item).find('.cs-founder-item-ul .about-founder-main-item-li .word'), {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
          });
    }
  }
  let courseFouder = new CourseFouder();
  class CourseProcess{
    constructor(){
      this.tlTrigger;
      this.tlFade;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.cs-process',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup(){
      let title  = new SplitType('.cs-process-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      this.tlFade = gsap.timeline({
        scrollTrigger: {
          trigger: '.cs-process-title',
          start: $(window).width() > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
          }
      })
      this.tlFade.to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
      $('.cs-process-content-item').each((idx, item) => {
        let itemTitle = new SplitType($(item).find('.cs-process-content-item-sub'), { types: 'lines words', lineClass: 'kv-line' });
        gsap.set(itemTitle.words, {autoAlpha: 0, yPercent: 100});
        gsap.set($(item).find('.cs-process-content-item-step-wrap'), {autoAlpha: 0});
        $(item).find('.txt-decoration').append('<div class="line"></div>')
        gsap.set($('.txt-decoration .line'), {width: 0});
      })
     let tlFadeProcess = gsap.timeline({
        scrollTrigger: {
          trigger: '.cs-process-main',
          start: $(window).width() > 767 ? "top top+=65%" :'top top+=35%',
          }
          })
        if(viewport.w > 767){
          tlFadeProcess.to('.cs-process-deco2', {xPercent: 100, duration: 4,  onUpdate: () => {
            let progress = tlFadeProcess.progress();
            if(progress > 0.07){
              fadeItem('.cs-process-content-item.item1')
            }
            if(progress > 0.16){
              fadeItem('.cs-process-content-item.item2')
            }
            if(progress > 0.35){
              fadeItem('.cs-process-content-item.item3')
            }
          }})
        }
        else{
          fadeItemMob('.cs-process-content-item')
        }
        function fadeItemMob(item) {
          let tlItem = new gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: "top top+=35%",
              once: true
              }
              })
          tlItem.to($(item).find('.cs-process-content-item-step-wrap'), {duration: viewport.w > 767 ? .3 : .6, autoAlpha: 1})
                  .to($(item).find('.cs-process-content-item-sub .word'), {duration: .4, autoAlpha: 1, stagger: .015, yPercent: 0}, '<=.2')
          if($(item).find('.txt-decoration .line').length > 0){
            tlItem
              .to($(item).find('.txt-decoration .line'), {width: '100%', duration: .5}, '>=.0');  
  
          }
  
        }
      function fadeItem(item) {
        let tlItem = new gsap.timeline({
          scrollTrigger: {
            once: true
            }
            })
        tlItem.to($(item).find('.cs-process-content-item-step-wrap'), {duration: .3, autoAlpha: 1})
                .to($(item).find('.cs-process-content-item-sub .word'), {duration: .4, autoAlpha: 1, stagger: .015, yPercent: 0}, '<=.2')
        if($(item).find('.txt-decoration .line').length > 0){
          tlItem
            .to($(item).find('.txt-decoration .line'), {width: '100%', duration: .5}, '>=.0');  

        }

      }
    }
  }
  let courseProcess = new CourseProcess();
  class CourseChoose  {
    constructor(){
      this.tlTrigger;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.cs-choose',
          start: "top bottom+=50%",
          end: "bottom top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup () {
      $('.cs-choose-content').eq(0).fadeIn();
      $('.cs-choose-tab').on('click', function() {
        let index = $(this).index();
        $('.cs-choose-tab').removeClass('active');
        $(this).addClass('active');
        $('.cs-choose-content').fadeOut();
        $('.cs-choose-content').eq(index).fadeIn(500);
      })
      let title = new SplitType('.cs-choose-title', {types: 'lines words', lineClass: 'kv-line heading-line'});
      let sub = new SplitType('.cs-choose-sub', {types: 'lines words', lineClass: 'kv-line'});
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
      gsap.set ('.cs-choose-tab', {autoAlpha: 0, x: -30});
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.cs-choose-title-wrap',
          start : viewport.w > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
        })
      tlFade 
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
        .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
        .to('.cs-choose-tab', {autoAlpha: 1, x: 0, stagger: .1, duration: .4}, '<=.2')
      let titlePice = new SplitType('.cs-choose-content:nth-child(1) .cs-choose-content-price-title', {types: 'lines words', lineClass: 'kv-line heading-line'});
      let labelPice = new SplitType('.cs-choose-content:nth-child(1) .cs-choose-content-price-label', {types: 'lines words', lineClass: 'kv-line '});
      let labelPicelab = new SplitType('.cs-choose-content:nth-child(1) .cs-choose-content-price-txt-label', {types: 'lines words', lineClass: 'kv-line '});
      gsap.set(titlePice.words, {autoAlpha: 0, yPercent: 60});
      gsap.set(labelPice.words, {autoAlpha: 0, yPercent: 80});
      gsap.set(labelPicelab.words, {autoAlpha: 0, yPercent: 80});
      gsap.set('.cs-choose-content:nth-child(1) .cs-choose-content-price-popular', {autoAlpha: 0});
      gsap.set('.cs-choose-content:nth-child(1) .cs-choose-content-price-main', {autoAlpha: 0});
      let tlPrice = new gsap.timeline({
        scrollTrigger: {
          trigger: '.cs-choose-content:nth-child(1) .cs-choose-content-price',
          start : viewport.w > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
          }
          })
          tlPrice
          .to(labelPice.words, {autoAlpha: 1 , yPercent: 0, stagger: .02, duration: .6})
          .to('.cs-choose-content:nth-child(1) .cs-choose-content-price-popular', {autoAlpha: 1, duration: .6},'<=.2')
          .to(titlePice.words, {autoAlpha: 1 , yPercent: 0, stagger: .02, duration: .6}, '<=.2')
          .to('.cs-choose-content:nth-child(1) .cs-choose-content-price-main', {autoAlpha: 1, duration: 1}, '<=.2')
          .to(labelPicelab.words, {autoAlpha: 1, yPercent: 1, stagger: .015, duration: .4}, '<=.2')
        let titleConfi = new SplitType('.cs-choose-content:nth-child(1) .cs-choose-content-confi-title', {types: 'lines words', lineClass: 'kv-line heading-line'});
        let subConfi = new SplitType('.cs-choose-content:nth-child(1) .cs-choose-content-confi-sub', {types: 'lines words', lineClass: 'kv-line'});
        gsap.set(titleConfi.words, {autoAlpha: 0, yPercent: 60});
        gsap.set(subConfi.words, {autoAlpha: 0, yPercent: 80});
        gsap.set('.cs-choose-content:nth-child(1) .cs-choose-content-confi-item', {autoAlpha: 0, y: 30});
        gsap.set('.cs-choose-content:nth-child(1) .cs-choose-content-confi-btn', {autoAlpha: 0, y: 30});
        gsap.set('.cs-choose-content:nth-child(1) .cs-choose-content-confi-img', {autoAlpha: 0, y: 30});
          let tlConfi = new gsap.timeline({
            scrollTrigger: {
              trigger: '.cs-choose-content:nth-child(1) .cs-choose-content-confi',
              start : viewport.w > 767 ? "top top+=65%" : "top top+=35%",
              once: true,
              }
          })
        tlConfi
              .to(titleConfi.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
              .to(subConfi.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
              .to('.cs-choose-content:nth-child(1) .cs-choose-content-confi-item', {autoAlpha: 1, y: 0, stagger: .1, duration: .6}, '<=.2')
              .to('.cs-choose-content:nth-child(1) .cs-choose-content-confi-btn', {autoAlpha: 1, y: 0, duration: .6}, '<=.2')
              .to('.cs-choose-content:nth-child(1) .cs-choose-content-confi-img', {autoAlpha: 1, y: 0, duration: .6}, '<=.0')
        let titleStudent  = new SplitType('.cs-choose-content:nth-child(1) .cs-choose-content-student-title', {type: 'lines, words', lineClass: 'kv-line heading-line'})
        $('.cs-choose-content:nth-child(1) .cs-choose-content-student-item-title').each((idx, item) => {
          let studentTitle = new SplitType(item, {types: 'lines words', lineClass: 'kv-line'});
          gsap.set(studentTitle.words, {autoAlpha: 0, yPercent: 100});
        })
        gsap.set('.cs-choose-content:nth-child(1) .cs-choose-content-student-item-ic', { autoAlpha: 0, yPercent: 60})
        gsap.set(titleStudent.words, {autoAlpha: 0, yPercent: 60});
        let tlStudent = new gsap.timeline({
          scrollTrigger: {
            trigger: '.cs-choose-content:nth-child(1) .cs-choose-content-student',
            start : viewport.w > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
            }
        })
        tlStudent
        .to(titleStudent.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
        .to('.cs-choose-content:nth-child(1) .cs-choose-content-student-item-ic', {autoAlpha: 1, yPercent: 0, duration: .6, stagger: .2, clearProps: 'all'},'<=.2')
        .to('.cs-choose-content:nth-child(1) .cs-choose-content-student-item-title .word', {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.0')
        let titleStudy = new SplitType('.cs-choose-content:nth-child(1) .cs-choose-content-study-title', {type: 'lines words', lineClass: 'kv-line heading-line'});
        let tlStudy = new gsap.timeline({
          scrollTrigger: {
            trigger: '.cs-choose-content:nth-child(1) .cs-choose-content-study',
            start : viewport.w > 767 ? "top top+=65%" : "top top+=35%",
            once: true,
          }
        })
        gsap.set(titleStudy.words, {autoAlpha: 0, yPercent: 60});
        tlStudy.to(titleStudy.words, {autoAlpha: 1, yPercent:0, stagger: 0.02, duration: .6});
        let studyItems = $('.cs-choose-content-study-item');
        studyItems.each((idx, item) => {
          let titleItem = new SplitType($(item).find('.cs-choose-content-study-item-title'), {types: 'lines words', lineClass: 'kv-line'});
          let labelItem = '';
          if($(item).find('.cs-choose-content-study-item-title').length > 0){
            labelItem = new SplitType($(item).find('.cs-choose-content-study-item-label'), {types: 'lines words', lineClass: 'kv-line'});
            gsap.set(labelItem.words, {autoAlpha: 0, yPercent: 80});
          }
          gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 80});
          $(item).find('.cs-choose-content-study-item-txt').each((idx, itemContent) => {
            let contentItem = new SplitType(itemContent, {types: 'lines words', lineClass: 'kv-line'});
            gsap.set(contentItem.words, {autoAlpha: 0, yPercent: 80});
          });
          let tlStudyItem = new gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start : viewport.w > 767 ? "top top+=75%" : "top top+=35%",
              once: true,
            }
          })
          if(labelItem != ''){
            tlStudyItem.to(labelItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6});
          }
          tlStudyItem
              .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6},'<=.2')
              .to($(item).find('.cs-choose-content-study-item-txt .word'), {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
        })

      }
  }
  let courseChoose = new CourseChoose();
  class CourseTime {
    constructor(){
      this.tlTrigger;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.cs-time',
          start: "top bottom+=50%",
          end: "bottom+=50% top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
    setup (){
      let title = new SplitType('.cs-time-title', { types: 'lines words', lineClass: 'kv-line heading-line' })
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set('.cs-time-title-btn', {autoAlpha: 0, yPercent: 30});
      let tlTitle = new gsap.timeline({
        scrollTrigger: {
          trigger: '.cs-time-title-wrap',
          start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
          once: true,
        }
      })
      tlTitle 
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
        .to('.cs-time-title-btn', {autoAlpha: 1 , yPercent: 0, stagger: .1, duration: .4}, '<=.2')
      let allItems = $('.cs-time-item')
      allItems.each((idx, item) => {
        let text = new SplitType($(item).find('.txt'), { types: 'lines words', lineClass: 'kv-line ' })
        let tlTitle = new gsap.timeline({ 
          scrollTrigger: { 
            trigger: item,
            start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
            once: true,
          }
        })
        gsap.set(text.words, {autoAlpha: 0, yPercent: 80})
        gsap.set($(item).find('.img-basic'), {autoAlpha: 0, y: 30})
        tlTitle
          .to(text.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
          .to($(item).find('.img-basic'), {autoAlpha: 1, y: 0, duration: .6}, '<=.0')
        $('.cs-time-item-btn').each((idx, item) => {
          let tlTitle = new gsap.timeline({
            scrollTrigger: {
              trigger: '.cs-time-item3',
              start: 'top+=20% center',
              end: 'bottom+=20% center',
              scrub: true,
              marker: true
            }
          })
        tlTitle.to(item, {rotate: 0, y: 0, x: 0})
        })
        gsap.to(".cs-time-item-img-ic", {
          rotation: "+=360",
          duration: 2,
          repeat: -1,
          ease: "linear"
        });
        gsap.to(".anim-fly", {
          y: -20,
          duration: 2, 
          repeat: -1,    // Lặp vô hạn
          yoyo: true,    // Di chuyển ngược lại khi kết thúc
          ease: "power1.inOut" // Hiệu ứng mượt mà khi di chuyển
        });
      })
    }
  }
  class CourseFaq {
    constructor() {
      this.tlTrigger;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.cs-faq',
          start: "top bottom+=50%",
          end: "bottom+=50% top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
      
    }
    setup (){
      let title = new SplitType('.cs-faq-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      let sub = new SplitType('.cs-faq-sub', { types: 'lines words', lineClass: 'kv-line' });
      $(' .cs-faq-sub .txt-decoration').append('<div class="line"></div>')
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
      gsap.set('.cs-faq-sub .line', {width: 0});
      gsap.set('.cs-faq-title-ic', {autoAlpha: 0, y: 30});
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.cs-faq-title-wrap',
          start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
          once: true,
        }
      })
      tlFade
        .to('.cs-faq-title-ic', {autoAlpha: 1, y: 0, stagger: .02, duration: .6})
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
        .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
        .to('.cs-faq-sub .line', {width: '100%', duration: .6}, '<=.2')
      $('.cs-faq-item').each((idx, item) => {
        let titleItem = new SplitType($(item).find('.cs-faq-item-title'), { types: 'lines words', lineClass: 'kv-line' });
        gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60});
        gsap.set($(item).find('.cs-faq-item-title-ic'), {autoAlpha: 0, y: 30});
        gsap.set($(item).find('.cs-faq-item-line'), { scaleX: 0, transformOrigin: 'left'});
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: viewport.w > 767 ? 'top top+=65%' : 'top top+=35%',
            once: true,
          }
          })
          tlFadeItem
                  .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
                  .to($(item).find('.cs-faq-item-title-ic'), {autoAlpha: 1, y: 0, duration: .6}, '<=.2')
                  .to($(item).find('.cs-faq-item-line'), {scaleX: 1, duration: .6}, '<=.2')

      })
      $('.cs-faq-item').removeClass('active');
      console.log('2384798')
      $('.cs-faq-item-title-wrap').on('click', function() {
        $(this).closest('.cs-faq-item').toggleClass('active');
        $(this).closest('.cs-faq-item').find('.cs-faq-item-content').slideToggle(300);
        })
    }
  }
  let courseFaq = new CourseFaq();
  let courseTime = new CourseTime();
  class JobHero {
    constructor() {
      this.tlFade;
    }
    setup() {
      const width = $(".job-marquee-inner").width();
      const length = Math.floor($(window).width() / width) + 1;
        for (var i = 0; i < length; i++) {
          let $originalListBrand = $(".job-marquee-inner").eq(0);
          let $clonedListBrand = $originalListBrand.clone();
          $(".job-marquee-wrap").append($clonedListBrand);
        }
        createMarqueeAnimation(".job-marquee-inner", ".job-marquee-wrap")
        $(".job-marquee-inner").addClass('anim');
        $(".job-marquee-inner").addClass('anim');
        let label = new SplitType('.job-hero-label', { types: 'lines words', lineClass: 'kv-line' });
        let title = new SplitType('.job-hero-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
        let sub = new SplitType('.job-hero-sub', { types: 'lines words', lineClass: 'kv-line' });
        gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
        gsap.set(label.words, {autoAlpha: 0, yPercent: 80});
        gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
        gsap.set('.job-hero-btn', {autoAlpha: 0, y: 20})
        this.tlFade = new gsap.timeline({
          scrollTrigger: {
            once: true,
          },
         paused: true,
        })
        this.tlFade
          .to(label.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
          .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
          .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
          .to('.job-hero-btn', {autoAlpha: 1, y: 0, duration: .4, clearProps: 'all'}, '<=.7')
    }
    play(){
      this.tlFade.play();
    }
  }
  let jobHero = new JobHero();
  class JobReason {
    constructor() {
      this.tlTrigger;
    }
    setTrigger (){
      this.tlTrigger = new gsap.timeline({
        scrollTrigger : {
          trigger : '.job-reason',
          start: "top bottom+=70%",
          end: "bottom+=50% top",
          once: true,
          onEnter: () => {
            this.setup();
          }
        }
      })
    }
  setup(){
      $('.job-reason-main').addClass('swiper');
      $('.job-reason-list').addClass('swiper-wrapper');
      $('.job-reason-item').addClass('swiper-slide');
      let swiper = new Swiper('.job-reason-main', {
        slidesPerView:viewport.w > 767 ? 3 : 1,
        spaceBetween: parseRem(24),
        initialSlide: viewport.w > 767 ? 1: 0, 
        navigation: {
          nextEl: '.job-reason-control-ic-next',
          prevEl: '.job-reason-control-ic-prev',
        },
      });
      let title = new SplitType('.job-reason-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      let sub = new SplitType('.job-reason-sub', { types: 'lines words', lineClass: 'kv-line' });
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.job-reason-title-wrap',
          start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
          once: true,
        },
      })
      tlFade
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
        .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
        let tlFadeItem = new gsap.timeline({
          scrollTrigger: {
            trigger: '.job-reason-main',
            start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
            once: true,
          },
        })
        setTimeout(function () {
          $('.job-reason-item').each((idx, item) => {
            gsap.set($(item).find('.job-reason-item-img'), {autoAlpha: 0, clipPath: 'inset(0 0 100% 100%)'});
            let titleItem = new SplitType($(item).find('.job-reason-item-title'), { types: 'lines words', lineClass: 'kv-line heading-line' });
            let subItem = new SplitType($(item).find('.job-reason-item-sub'), { types: 'lines words', lineClass: 'kv-line' });
            gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80});
            tlFadeItem
              .to($(item).find('.job-reason-item-img'), {autoAlpha: 1,clipPath: 'inset(0 0 0% 0%)', duration: 1, clearProps: 'all'}, '<=0')
              .to(titleItem.words, {autoAlpha: 1,yPercent: 0, duration: .6, stagger: .02}, '<=.3')
              .to(subItem.words, {autoAlpha: 1,yPercent: 0, duration: .4, stagger: .015}, '<=.3')
          })
      ScrollTrigger.refresh();

        },2000)
  }
}
let jobReason = new JobReason();
class JobWhy {
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-why',
        start: "top bottom+=50%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
    })
  }
setup(){
  $('.job-why-company').each(function () {
    const $scrollContainer = $(this); // Lấy từng hộp job-why-company
    const $scrollContent = $scrollContainer.find('.job-why-company-list');
    const $clone = $scrollContent.clone();
    for (let i = 0; i < 8; i++) {
      const $clone = $scrollContent.clone(); // Tạo bản clone mới trong mỗi lần lặp
      $scrollContainer.append($clone);
    }
  });
  $('.job-why-btn').on('click', function () {
    $(this).addClass('disable')
    $('.job-why-company').each(function () {
      const $scrollContainer = $(this); // Lấy từng hộp job-why-company
      const $scrollContent = $scrollContainer.find('.job-why-company-list');
      const contentHeight = $scrollContainer.height() - $scrollContent.height(); // Calculate the height difference
      // Start scrolling animation
      const scrollAnimation = gsap.to($scrollContent, {
        y: `-${contentHeight}px`, // Scroll up to the end of the content
        duration: 3, // Adjust duration as needed
        ease: "none",
        repeat: -1,
      });
  
      // Stop the animation and align to a random position
      setTimeout(() => {
        scrollAnimation.kill(); // Stop the animation
        const $items = $scrollContent.find('.job-why-company-item'); // All items in the list
        const randomIndex = Math.floor(Math.random() * $items.length); // Random index
        console.log(randomIndex)
        const $randomItem = $items.eq(randomIndex); // Random item
        const randomPosition = $randomItem.position().top ;
  
        gsap.to($scrollContent, {
          y: `-${randomPosition}px`, // Align to the random item's position
          duration: 1,
          ease: "power2.out",
        });
      }, 3000); // Adjust timing to stop
    });
  });
  createMarqueeAnimation(".job-why-logo-list", ".job-why-logo-inner")
  $(".job-why-logo-list").addClass('anim');
  $('.job-why-offer-main').each((idx, item) =>{
    console.log(idx)
    createMarqueeAnimation($(item).find('.job-why-offer-list'), $(item))
    $(item).find('.job-why-offer-list').addClass('anim');
  })
  let title = new SplitType('.job-why-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
  gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
  gsap.set('.job-why-inner', {autoAlpha: 0, y: 40});
  gsap.set('.job-why-btn', {autoAlpha: 0, y: 30});
  let tlFade = new gsap.timeline({
    scrollTrigger: {
      trigger: '.job-why-title-wrap',
      start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
      once: true,
    },
  })
  let tlFadeItem = new gsap.timeline({
    scrollTrigger: {
      trigger: '.job-why-title-wrap',
      start: viewport.w > 767 ? "top top+=70%" : "top top+=45%",
      once: true,
    },
  })
  tlFade
    .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
  tlFadeItem
  .to('.job-why-inner', {autoAlpha: 1, y: 0, duration: 2, clearProps: 'all'})
  .to('.job-why-btn', {autoAlpha: 1, y: 0, duration: .6, clearProps: 'all'},'<=.6')
 let  tlFadeLogo = new gsap.timeline({
    scrollTrigger: {
      trigger: '.job-why-logo',
      start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
      once: true,
    },
  })
  let titleLogo = new SplitType('.job-why-logo-title', { types: 'lines words', lineClass: 'kv-line' });
  gsap.set(titleLogo.words, {autoAlpha: 0, yPercent: 60});
  gsap.set('.job-why-logo-inner', {autoAlpha: 0, y: 30});
  tlFadeLogo
  .to(titleLogo.words, {autoAlpha: 1, yPercent: 0, stagger: .03, duration: .6})
  .to('.job-why-logo-inner', {autoAlpha: 1, y: 0, duration: 1.2, clearProps: 'all'}, '<=.2')
  let  tlFadeOffer = new gsap.timeline({
    scrollTrigger: {
      trigger: '.job-why-offer',
      start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
      once: true,
    },
  })
  let titleOffer = new SplitType('.job-why-offer-title', { types: 'lines words', lineClass: 'kv-line' });
  gsap.set(titleOffer.words, {autoAlpha: 0, yPercent: 60});
  gsap.set('.job-why-offer-main', {autoAlpha: 0, y: 30});
  tlFadeOffer
  .to(titleOffer.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
  .to('.job-why-offer-main', {autoAlpha: 1, y: 0, duration: .6,stagger: .2, clearProps: 'all'}, '<=.2')
}
}
let jobWhy = new JobWhy()
class JobProud{
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-proud',
        start: "top bottom+=50%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
      });
    }
    setup(){
      let title = new SplitType('.job-proud-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
      let sub = new SplitType('.job-proud-label', { types: 'lines words', lineClass: 'kv-line' });
      gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
      gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
      let tlFade = new gsap.timeline({
        scrollTrigger: {
          trigger: '.job-proud-title-wrap',
          start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
          once: true,
        },
      })
      tlFade
      .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4})
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
     
      
      let titleMain = new SplitType(".job-proud-main-title", { types: 'lines words', lineClass: 'kv-line heading-line' });
      let subMain = new SplitType(".job-proud-main-sub", { types: 'lines words', lineClass: 'kv-line heading-line' });
      gsap.set(titleMain.words, {autoAlpha: 0, yPercent: 60});
      gsap.set(subMain.words, {autoAlpha: 0, yPercent: 80});
      gsap.set('.job-proud-main-content-item-ab', {autoAlpha: 0})
      gsap.set('.job-proud-main-process', {x:viewport.w> 767?  -parseRem(200): -parseRem(144)})
      gsap.set('.job-proud-main-content', {autoAlpha: 0, y: 10})
      let tlFadeMain = new gsap.timeline({
        scrollTrigger: {
          trigger: '.job-proud-main',
          start: viewport.w > 767 ? "top top+=65%" : "top top+=35%",
          once: true,
        }
      })
      tlFadeMain 
        .to('.job-proud-main-content', {autoAlpha: 1, y: 0, duration: .6})
        .to('.job-proud-main-process', {x: 0, duration: 1.2, onComplete: () => {
          $('.job-proud-main-content-item.will-active').addClass('active');
          gsap.to('.job-proud-main-content-item-ab', {autoAlpha: 1, duration: .6})
        }}, '<=.3')
        .to(titleMain.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=0')
        .to(subMain.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
        $('.job-proud-item').each((idx, item) => {
        let titleItem = new SplitType($(item).find('.job-proud-item-txt'), { types: 'lines words', lineClass: 'kv-line' });
        gsap.set($(item), {autoAlpha: 0, y: 20})
        gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 80})
        gsap.set($(item).find('.job-svg-process-bg'), {strokeDasharray: '0, 1', autoAlpha: 0})
        let number =parseInt($(item).find('.process-number').text());
        let numberPercent = number / 100;
        $(item).find('.process-number').text('0')

        let tlItem = gsap.timeline({
          scrollTrigger: {
            trigger: $(item),
            start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
            once: true,
          }
        })
        tlItem
        .to($(item), {autoAlpha: 1, y: 0, duration: .4})
          .to($(item).find('.job-svg-process-bg'), {strokeDasharray: `${numberPercent}, 1`, duration: 1.5, ease: 'power1.inOut', onEnter: ()=>{
            gsap.to($(item).find('.job-svg-process-bg'),{autoAlpha: 1})
            countUpTo(number, $(item).find('.process-number'), 1500);
          }}, '<=.2')
          .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.4')
      })
    }
}
let jobProud = new JobProud();
class JobProcess {
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-process',
        start: "top bottom+=50%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
    })
  }
setup(){
$('.job-process-content').hide();
$('.job-process-content').eq(0).fadeIn();
$('.job-process-tab').on('click', function() {
  let index = $(this).index()
  $('.job-process-content').hide();
  $('.job-process-content').eq(index).fadeIn(1000);
  $('.job-process-tab').removeClass('active');
  $(this).addClass('active');
  console.log('khanh');
  })
  let title = new SplitType('.job-process-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
  let sub = new SplitType('.job-process-sub', { types: 'lines words', lineClass: 'kv-line' });
  gsap.set(title.words, {autoAlpha: 0, yPercent: 60});
  gsap.set(sub.words, {autoAlpha: 0, yPercent: 80});
  let tlFade = new gsap.timeline({
    scrollTrigger: {
      trigger: '.job-process-title-wrap',
      start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
      once: true,
    },
  })
  tlFade
  .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, )
  .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4},'<=.2')

  let tlFadeTab = new gsap.timeline({
    scrollTrigger: {
      trigger: '.job-process-tab-wrap',
      start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
      once: true,
    },
  })
  gsap.set('.job-process-tab', {autoAlpha: 0, x: -15})
  gsap.set('.job-process-content:nth-child(1) .job-process-content-item', {autoAlpha: 0, y: 20})
  tlFadeTab
    .to('.job-process-tab', {autoAlpha: 1, x: 0, stagger: .02, duration: .8})
    .to('.job-process-content:nth-child(1) .job-process-content-item', {autoAlpha: 1, y: 0, stagger: .1, duration: 1}, '<=.4')
}
}
let jobProcess = new JobProcess();
class JobResource {
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-process',
        start: "top bottom+=50%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
    })
  }
  setup(){
    let title = new SplitType('.job-resource-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
    gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
    let tlFade = new gsap.timeline({
      scrollTrigger: {
        trigger: '.job-resource-title-wrap',
        start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
        once: true,
        },
        })
    tlFade
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
    $('.job-resource-item').each((idx, item) => {
      let itemTitle =new SplitType($(item).find('.job-resource-item-txt'), { types: 'lines words', lineClass: 'kv-line' });
      let borderRadius = $(item).find('.job-resource-item-img').css('border-radius');
      gsap.set($(item).find('.job-resource-item-img'), {autoAlpha: 0, clipPath: `inset(0 0 100% 100% round ${borderRadius})`});
      gsap.set(itemTitle.words, {autoAlpha: 0, yPercent: 80});
      let tlFadeItem = new gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
          once: true,
          },
          })
          tlFadeItem
          .to($(item).find('.job-resource-item-img'), {autoAlpha: 1, clipPath: `inset(0 0 0% 0% round ${borderRadius})`, duration: 1, clearProps: 'all'})
          .to(itemTitle.words, {autoAlpha: 1, yPercent: 0, duration : .5, stagger: .02},'<=.2')
        })
  }
}
let jobResource = new JobResource();
class JobTesti {
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-detail',
        start: "top bottom+=100%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
    })
  }
setup(){
  if(viewport.w < 767){
    $('.job-testi-list-wrap').each((idx, item) => {
      const $item = $(item);
    
      // Add Swiper classes if not already added
      if (!$item.hasClass('swiper-initialized')) {
        $item.addClass('swiper swiper-initialized');
        $item.find('.job-testi-list').addClass('swiper-wrapper');
        $item.find('.job-testi-item').addClass('swiper-slide');
    
        // Initialize Swiper
        new Swiper($item[0], {
          slidesPerView: 'auto',
          spaceBetween: parseRem(20),
          loop: true,
          speed: 4000, 
          autoplay: {
            delay: 0,
            reverseDirection: idx % 2 === 1,
          },
        });
      }
    });
    
  }
  $('.job-testi-more-link').on('click', function(e) {
    e.preventDefault();
    $('.job-testi-more').addClass('hidden');
    $('.job-testi-item.hidden').removeClass('hidden');
    setTimeout(function(){
      ScrollTrigger.refresh();
  }, 1000)
  });
  setTimeout(function(){
    ScrollTrigger.refresh();
}, 1000)
let title = new SplitType('.job-testi-title', { types: 'lines words', lineClass: 'kv-line heading-line' });
gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
gsap.set('.job-testi-title-ic', {autoAlpha: 0})
let tlFade = new gsap.timeline({
  scrollTrigger: {
    trigger: '.job-testi-title-wrap',
    start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
    once: true,
    },
    })
tlFade
    .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
    .to('.job-testi-title-ic', {autoAlpha: 1, duration: .6},'<=.5')
$('.job-testi-item:not(.hidden)').each((idx, item) => {
  let title = new SplitType($(item).find('.job-testi-item-content'), { types: 'lines words', lineClass: 'kv-line ' });
  gsap.set(title.words, {autoAlpha: 0, yPercent: 80})
  gsap.set($(item).find('.job-testi-item-avt'), {autoAlpha: 0, clipPath: 'circle(20% at 50% 50%)'});
  gsap.set($(item).find('.job-testi-item-info-inner'), {autoAlpha: 0, y: 20});
  let tlFadeItem = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
      once: true,
      },
  })
  tlFadeItem
    .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
    .to($(item).find('.job-testi-item-avt'), {autoAlpha: 1, clipPath: 'circle(50% at 50% 50%)', duration: .6}, '>=-.2')
    .to($(item).find('.job-testi-item-info-inner'), {autoAlpha: 1, y: 0, duration: .6}, '<=0')
})
}
}
let jobTesti = new JobTesti();
class JobStep{
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-testi',
        start: "top bottom+=100%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
    })
  }
  setup(){
    let title = new SplitType($('.job-step-title'), { types: 'lines words', lineClass: 'kv-line heading-line' });
    gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
    let tlFade = new gsap.timeline({
      scrollTrigger: {
        trigger: '.job-step-title-wrap',
        start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
        once: true,
        },
        })
    tlFade
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
    $('.job-step-item').each((idx, item) => {
      gsap.set($(item).find('.job-step-item-ic'), {autoAlpha: 0, y: 20})
      let titleItem = new SplitType($(item).find('.job-step-item-title'), { types: 'lines words', lineClass: 'kv-line' });
      gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 80})
      gsap.set($('.job-step-item-ar').eq(idx), {autoAlpha: 0, yPercent:30})
      let tlFadeItem = new gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
          once: true,
          },
          })
          tlFadeItem
          .to($(item).find('.job-step-item-ic'), {autoAlpha: 1, y: 0, duration: .6})
          .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.2')
          .to($('.job-step-item-ar').eq(idx), {autoAlpha: 1, yPercent: 0, duration: .6}, '<=.2')
      })
  }
}
let jobStep = new JobStep();
class JobCta {
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-step',
        start: "top bottom+=100%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
    })
  }
  setup() {

    let title = new SplitType($('.job-sign-title'), { types: 'lines words', lineClass: 'kv-line heading-line' });
    let sub = new SplitType($('.job-sign-sub'), { types: 'lines words', lineClass: 'kv-line heading-line' });
    $(' .job-sign-sub-link.txt-decoration').append('<div class="line"></div>')
    gsap.set('.job-sign-sub-link.txt-decoration .line', {scaleX: 0, transformOrigin: 'left'})
    gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
    gsap.set(sub.words, {autoAlpha: 0, yPercent: 80})
    gsap.set('.job-sign-link', {autoAlpha: 0, y: 30})
    let tlFade = new gsap.timeline({
      scrollTrigger: {
        trigger: '.job-sign-inner',
        start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
        once: true,
        },
        })
    tlFade
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
        .to('.job-sign-link', {autoAlpha: 1, y: 0, duration: .6, clearProps: 'all'}, '<=.2')
        .to(sub.words, {autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4}, '<=.2')
        .to('.job-sign-sub-link.txt-decoration .line', {scaleX: 1, duration: .6}, '<=.4')
  }
}
let jobCta = new JobCta();
class JobPrice{
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-resource',
        start: "top bottom+=100%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
    })
  }
  setup () {
    let title = new SplitType('.job-price-title', { types: 'lines words', lineClass: 'kv-line' });
    let desc = new SplitType('.job-price-desc', { types: 'lines words', lineClass: 'kv-line' });
    let sub = $('.job-price-sub')
    gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
    gsap.set(sub, {autoAlpha: 0, yPercent: 80})
    gsap.set(desc.words, {autoAlpha: 0, yPercent: 80})
    gsap.set('.job-price-img-note', {autoAlpha: 0, y: 20})
    let tlFade = new gsap.timeline({
      scrollTrigger: {
        trigger: '.job-price-content',
        start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
        once: true,
        },
        })
    tlFade
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
        .to(sub, {autoAlpha: 1, yPercent: 0, duration: .8},'<=.2')
        .to(desc.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .5},'<=.3')
    let borderRadius = $('.job-price-img-item').css('border-radius');
    gsap.set('.job-price-img-inner .img-basic',{autoAlpha: 0})
    gsap.set('.job-price-img-item', {autoAlpha: 0 , clipPath: `inset(100% 0% 0% 0% round ${borderRadius})`})
    let tlFadeImg = new gsap.timeline({
      scrollTrigger: {
        trigger: '.job-price-img-inner',
        start: viewport.w > 767 ? 'top top+=60%' : 'top top+=35%',
        once: true
      }
    })
    tlFadeImg.to('.job-price-img-inner .img-basic', {autoAlpha: 1, duration: 1.6})
                    .to('.job-price-img-item', {autoAlpha: 1, clipPath : `inset(0% 0% 0% 0% round ${borderRadius})`, duration: 1.2, stagger: .2}, '<=.6')
                    .to('.job-price-img-note', {autoAlpha: 1, y: 0, duration: .6},'<=.6')
  }
}
class JobDetail {
  constructor() {
    this.tlTrigger;
  }
  setTrigger (){
    this.tlTrigger = new gsap.timeline({
      scrollTrigger : {
        trigger : '.job-price',
        start: "top bottom+=100%",
        end: "bottom+=50% top",
        once: true,
        onEnter: () => {
          this.setup();
        }
      }
    })
  }
  setup () {
    let title = new SplitType('.job-detail-main-txt', { types: 'lines words', lineClass: 'kv-line' });
    gsap.set(title.words, {autoAlpha: 0, yPercent: 60})
    gsap.set('.job-detail-btn', {autoAlpha: 0, y: 20})
    gsap.set('.job-detail-main-inner-ic', {autoAlpha: 0})
    let tlFade = new gsap.timeline({
      scrollTrigger: {
        trigger: '.job-detail-main',
        start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
        once: true,
        },
        })
    tlFade
        .to(title.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6})
        .to('.job-detail-main-inner-ic', {autoAlpha: 1, duration: .6, yPercent: 0, stagger: .02})
        .to('.job-detail-btn', {autoAlpha: 1, y:0,  duration: .6},'<=0')
    $('.job-detail-list').each((idx, item) => {
      let tlFadeList = new gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: viewport.w > 767 ? "top top+=65%" : "top top+=45%",
          once: true,
          },
          })
          
          $(item).find('.job-detail-item').each((idx, itemInner) => {
            let titleItem = new SplitType($(itemInner).find('.job-detail-item-title'), { types: 'lines words', lineClass: 'kv-line' });
            let subItem = new SplitType($(itemInner).find('.job-detail-item-sub'), { types: 'lines words', lineClass: 'kv-line' });
            gsap.set(titleItem.words, {autoAlpha: 0, yPercent: 60});
            gsap.set(subItem.words, {autoAlpha: 0, yPercent: 80});
            gsap.set($(itemInner).find('.job-detail-item-ic'), {autoAlpha: 0, y: 20})
            tlFadeList
               .to($(itemInner).find('.job-detail-item-ic'), {autoAlpha: 1, y: 0, duration: .6},'<=.2')
              .to(titleItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6},'<=0')
              .to(subItem.words, {autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6}, '<=.3')
      
          })
    })
  }
}
let jobDetail = new JobDetail();
let jobPrice = new JobPrice();
  let cta = new CTA()
  const SCRIPTS = {
    home: {
      namespace: 'home',
      afterEnter() {
        console.log('home afterEnter');
        homeHero.setup();
        if (viewport.w > 991) {
          homePartner.setTrigger();
          homeOpp.setTrigger();
          homeTesti.setTrigger();
          homeConquer.setTrigger();
          homeBlog.setTrigger();
          cta.setTrigger();
          homeMap.setTrigger();
        }
        else {
          homePartner.setup();
          homeOpp.setup();
          homeTesti.setup();
          homeMap.setup();
          homeConquer.setup();
          homeBlog.setup();
          cta.setup();
        }

      },
      beforeLeave() {
        console.log('home clean')
      }
    },
    contact: {
      namespace: 'contact',
      afterEnter() {
        console.log('contact afterEnter');
        contactHero.setup();
        if(viewport.w > 767){
          contactPromo.setTrigger();
        }
        else{
          contactPromo.setup();
        }
        // cta.setup();

      },
      beforeLeave() {
        console.log('contact clean')
      }
    },
    resource: {
      namespace: 'resource',
      afterEnter() {
        console.log('resource afterEnter');
        if(viewport.w > 991){
          resourceHero.setup();
        resourceCalendar.setup();
        resourceForm.setup();
        resourceLetter.setTrigger();
        resourceBlog.setup();
        resourceJob.setTrigger();
        resourceCta.setTrigger();
        }
        else{
          resourceHero.setup();
        resourceCalendar.setup();
        resourceForm.setup();
        resourceLetter.setup();
        resourceBlog.setup();
        resourceJob.setup();
        resourceCta.setup();
        }
      },
      beforeLeave() {
        console.log('contact clean')
      }
    },
    about: {
      namespace: 'about',
      afterEnter() {
        if (viewport.w > 991) {
          console.log('about afterEnter');
          aboutHero.setup();
          aboutDevelop.setTrigger();
          aboutMentor.setTrigger();
          aboutMember.setTrigger();
          aboutPartner.setTrigger();
          aboutJoin.setTrigger();
          aboutFounder.setTrigger();
          cta.setTrigger();
        }
        else {
          aboutHero.setup();
          aboutDevelop.setup();
          aboutMentor.setup();
          aboutMember.setup();
          aboutPartner.setup();
          aboutJoin.setup();
          aboutFounder.setup();
          cta.setup();
        }
      },
      beforeLeave() {
        console.log('about clean')
      }
    },
    blog: {
      namespace: 'blog',
      afterEnter() {
        console.log('blog afterEnter');
        blogContent.setup();
        resourceForm.setup();
        blogHero.setup();
        },
      beforeLeave() {
        console.log('blog clean')
      }
    },
    course: {
      namespace: 'course',
      afterEnter() {
        if(viewport.w > 767){
          courseFaq.setTrigger();
          courseFouder.setTrigger();
          courseProcess.setTrigger();
          courseChoose.setTrigger();
          courseResume.setTrigger();
          courseLevel.setTrigger();
          courseTime.setTrigger();
        }
        else {
          courseFaq.setup();
          courseFouder.setup();
          courseLevel.setup();
          courseResume.setup();
          courseProcess.setup();
          courseChoose.setup();
          courseTime.setup();
        }
        courseHero.setup();
        },
      beforeLeave() {
      }
    },
    job: {
      namespace: 'job-couching',
      afterEnter() {
        console.log('jouCourse afterEnter');
        jobHero.setup();
        if( viewport.w > 991){
          courseFaq.setTrigger();
          jobReason.setTrigger();
          jobWhy.setTrigger();
          jobProcess.setTrigger();
          jobProud.setTrigger();
          jobTesti.setTrigger();
          jobPrice.setTrigger();
          jobResource.setTrigger();
          jobDetail.setTrigger();
          jobStep.setTrigger();
          jobCta.setTrigger();
        }
        else{
          courseFaq.setup();
          jobReason.setup();
          jobWhy.setup();
          jobProcess.setup();
          jobProud.setup();
          jobTesti.setup();
          jobPrice.setup();
          jobResource.setup();
          jobDetail.setup();
          jobStep.setup();
          jobCta.setup();
        }
      }
    }
  }
  const VIEWS = Object.values(SCRIPTS);
  barba.init({
    // prevent: ({ el }) => el.matches('form') || el.getAttribute('action') === '/resource',
    preventRunning: true,
    timeout: 5000,
    // sync: true,
    debug: true,
    transitions: [{
      name: 'default-transition',
      sync: true,
      once(data) {
        removeAllScrollTrigger();
        resetScroll();
        globalScript();
        loading.init();
        footer.setTrigger();
      },
      beforeLeave({ current }) {
        lenis.stop();
      },
      async leave(data) {
      },
      afterLeave(data) {
      },
      beforeEnter(data) {
        removeAllScrollTrigger();
        lenis.start();
      },
      enter(data) {
      },
      afterEnter(data) {
        resetScroll();
        globalScript();
        console.log(data.next.namespace)
        // if(data.next.namespace == 'contact' || data.next.namespace == 'resource' || data.next.namespace == 'blog'){
        //   console.log('before enter contact')
        //   location.reload();
        // }
          loading.init();
        footer.setTrigger();
      },
    }],
    views: VIEWS
  })
};
window.onload = mainScript;
