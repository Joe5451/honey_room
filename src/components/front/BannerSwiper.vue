<template>
    <div class="swiper-container">
        <swiper class="swiper" :options="swiperOption_banner">
            <swiper-slide>
                <div class="swiper-wrapper position-relative w-100 h-100">
                    <img class="swiper-img d-block position-absolute w-100 h-100" src="../../assets/image/banner1.jpg" >
                    <div class="swiper-content-container w-100">
                      <div class="swiper-content">
                        <h3>Honey Room</h3>
                        <p>各式甜點應有盡有，歡迎您光臨</p>
                      </div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-wrapper position-relative w-100 h-100">
                    <img class="swiper-img d-block position-absolute w-100 h-100" src="../../assets/image/banner2.jpg" >
                    <div class="swiper-content-container w-100">
                      <div class="swiper-content">
                        <h3>幸福情人節</h3>
                        <p>精選情人節甜點，等你來挑</p>
                      </div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-wrapper position-relative w-100 h-100">
                    <img class="swiper-img d-block position-absolute w-100 h-100" src="../../assets/image/banner3.jpg" >
                    <div class="swiper-content-container w-100">
                      <div class="swiper-content">
                        <h3>經典甜點</h3>
                        <p>好吃順口、甜而不膩、重現經典</p>
                      </div>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="bannerSwiperButton fas fa-chevron-circle-left" slot="button-prev"></div>
            <div class="bannerSwiperButton fas fa-chevron-circle-right" slot="button-next"></div>
        </swiper>
    </div> 
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
    import 'swiper/css/swiper.css';
    
    export default {
        name: 'swiper-example-loop',
        title: 'Loop mode / Infinite loop',
        components: {
          Swiper,
          SwiperSlide
        },
        data() {
          return {
            swiperOption_banner: {
              allowTouchMove: true,
              slidesPerView: 1,
              spaceBetween: 0,
              loop: true,
              autoplay: {
                delay: 2500,
                disableOnInteraction: false
              },
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
              navigation: {
                nextEl: '.bannerSwiperButton.fa-chevron-circle-right',
                prevEl: '.bannerSwiperButton.fa-chevron-circle-left'
              }
            }
          }
        }
    }
</script>

<style lang="scss" scoped>
.swiper-container {
  height: 510px;
  --swiper-navigation-color: rgba(0,0,0,.5);/* 設置按鈕顏色 */
  --swiper-navigation-size: 40px;/* 設置按鈕大小 */
  --swiper-pagination-color: #fff; /* 設置分頁按鈕顏色 */

  .bannerSwiperButton.fa-chevron-circle-left, .bannerSwiperButton.fa-chevron-circle-right {
    visibility: hidden;
    font-size: 40px;
    opacity: 0.3;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;

    &:hover {
      opacity: 0.7;
    }

    &:focus {
      outline: none;
    }

    &::after {
      content: '';
    }
  }

  .bannerSwiperButton.fa-chevron-circle-left {
    left: 10px;
    @media (max-width: 575.98px) {
      left: 3px;
    }
  }

  .bannerSwiperButton.fa-chevron-circle-right {
    right: 10px;
    @media (max-width: 575.98px) {
      right: 3px;
    }
  }
  
  &:hover {
    .bannerSwiperButton.fa-chevron-circle-left, .bannerSwiperButton.fa-chevron-circle-right {
      visibility: visible;
    }
  }
  .swiper {
    .swiper-wrapper {
      img {
        object-fit: cover;
        z-index: -1;
      }

      .swiper-content-container {
        background: linear-gradient(160deg, transparent 70%, rgba(230, 223, 215, 0.9) 30%);
        width: 100%;
        height: 100%;

        @media (max-width: 768px) {
          background: rgba(230, 223, 215, 0.9);
          height: auto;
          position: absolute;
          bottom: 0;
        }

        .swiper-content {
          position: absolute;
          bottom: 0;
          right: 0;
          margin-bottom: 50px;
          margin-right: 130px;
          @media (max-width: 768px) {
            text-align: center;
            margin: 0;
            padding: 2rem 0;
            position: static;
          }
        }
      }
    }
  }
}
</style>