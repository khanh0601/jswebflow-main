const mainScript = () => {
  const SCRIPT = {};
  const parseRem = (input) => {
    return (input / 10) * parseFloat($("html").css("font-size"));
  };
  function globalScript() {
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
    // let triggers = ScrollTrigger.getAll();
    // triggers.forEach(trigger => {
    //   trigger.kill();
    // });
  }
  class Loading {
    constructor() {
      this.tlLoading;
      this.isLoaded = sessionStorage.getItem("isLoaded") == 'true' ? true : false;
    }
    init() {
      let tl = new gsap.timeline({
        onStart: () => {

          gsap.to('.kv-header-wrap', { autoAlpha: 0, yPercent: -100 })
          lenis.stop();
          $(".loading-page").removeClass("loaded");
          setTimeout(function () {
            $('.main-wrap').removeClass('hide-def-div')
          }, 1000)
        },
        onComplete: () => {
          lenis.start();
          $(".loading-page").addClass("loaded");
          this.animHero();
        }
      });
      tl
        .fromTo('.loading-page .loading-page-inner', { autoAlpha: 0 }, { duration: 1, autoAlpha: 1, ease: "power1.out", })
        .to('.loading-page .loading-page-inner', { duration: 1, autoAlpha: 0, ease: "power1.out" })
    }
    animHero() {
      console.log('hero loaded')
      gsap.to('.kv-header-wrap', { autoAlpha: 1, yPercent: 0, duration: .6, ease: 'none' })
      if ($('[data-barba-namespace="home"]').length) {
        homeHero.play();
      } else if ($('[data-barba-namespace="contact"]').length) {
        contactHero.play()
      }
      else if ($('[data-barba-namespace="about"]').length) {
        aboutHero.play()
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
    console.log('khanh')
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
    }
    setup() {
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
      $('.course-price').on('change', function (e) {
        let checkedCount = $('.course-price:not(".course-checkbox-full"):checked').length;
        console.log(checkedCount)
        let price = 0;
        if (checkedCount > 0) {
          $('.course-price:checked').each((idx, item) => {
            price = price + parseInt($(item).attr('price'));
          })
        }
        $('.money-number').text(price);
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
      //   $('input[name="Course"]').on('click', function() {
      //     var selectedValue = $(this).val();
      //     var numberOnly = selectedValue.match(/\d+/)[0]; // Lấy phần số đầu tiên trong chuỗi
      //     $('.money-number').text(numberOnly);
      // })
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
      $('.course-checkbox-full').on('change', function () {
        if ($(this).is(':checked')) {
          $(this).closest('.contact-form-main-inner').find('.course-checkbox').prop('checked', false);
          $(this).closest('.contact-form-main-inner').find('.course-checkbox').prop('disabled', true);
          $(this).closest('.contact-form-main-inner').find('.contact-form-register-course-item').addClass('disable');
          $('.form-contact-success-title-one').hide();
          $('.form-contact-success-title-full').show()
        }
        else{
          $(this).closest('.contact-form-main-inner').find('.course-checkbox').prop('disabled', false);
          $(this).closest('.contact-form-main-inner').find('.contact-form-register-course-item').removeClass('disable');
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
        tlFadeItem
          .to($(item).find('.about-founder-main-item-img'), { autoAlpha: 1, y: 0, duration: .6 }, `${idx * .2}`)
          .to(titleItem.words, { autoAlpha: 1, yPercent: 0, stagger: .02, duration: .6 },)
          .to(subItem.words, { autoAlpha: 1, yPercent: 0, stagger: .015, duration: .4 }, '<=.2')
          .to($(item).find('.about-founder-main-item-social-inner'), { autoAlpha: 1, yPercent: 0, stagger: .05, duration: .5 }, '<=.2')
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
          start: 'top bottom',
          end: 'bottom top',
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
        // onStart: function () {
        //   $(".contact-form-box-submit .contact-form-box-submit-title").text(
        //     "Please wait..."
        //   );
        // },
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
      let swiperBlog;
      if(viewport.w < 767){
        // console.log('khanh')
        // $('.rs-blog-cms').addClass('swiper');
        // $('.rs-blog-list').addClass('swiper-wrapper');
        // $('.rs-blog-item').addClass('swiper-slide');
        // let swiperBlog = new Swiper('.rs-blog-cms', {
        //   slidesPerView: 1,
        //   spaceBetween: parseRem(20),
        // });
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
        }
        else{
          activeItem(category);
        }
        // $('.rs-blog-item').removeClass('swiper-slide');
        // $('.rs-blog-item.active').addClass('swiper-slide');
        if(viewport.w > 767){
          $('.rs-blog-item.active').eq(0).addClass('child11');

        }
// if (swiperBlog) {
//   swiperBlog.destroy(true, true);
//     }
//   $('.swiper-blog-wrapper').removeAttr('style')
//     console.log(swiperBlog)
//     // Khởi tạo lại Swiper
//     swiperBlog = new Swiper('.rs-blog-cms', {
//         slidesPerView: 1,
//         spaceBetween: parseRem(20),
//     });
//     console.log(swiperBlog)

      })
    }
  }
  let resourceBlog = new ResourceBlog();
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
        resourceCalendar.setup();
        resourceForm.setup();
        // cta.setup();
        resourceBlog.setup();
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
        },
      beforeLeave() {
        console.log('blog clean')
      }
    }
  }
  const VIEWS = Object.values(SCRIPTS);
  barba.init({
    prevent: ({ el }) => el.matches('form') || el.getAttribute('action') === '/resource',
    preventRunning: true,
    sync: true,
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
        console.log('after leave global');
       
      },
      beforeEnter(data) {
        lenis.start();
       
        console.log('before enter')
      },
      enter(data) {
    
        console.log('enter global')
      },
      afterEnter(data) {
        removeAllScrollTrigger();
        resetScroll();
        globalScript();
        console.log(data)
        if(data.next.namespace == 'contact' || data.next.namespace == 'resource ' || data.next.namespace == 'blog'){
          console.log('before enter contact')
          location.reload();
        }
          loading.init();
        // loading.init();
        footer.setTrigger();

        console.log('after enter global')
        // footerSocialMouse()
      },
    }],
    views: VIEWS
  })
};
window.onload = mainScript;
