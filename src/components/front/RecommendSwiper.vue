<template>
    <div class="container-fluid">
        <div class="recommendSwiper-container">
            <div class="swiper-container">
                <swiper class="swiper" :options="swiperOption_recommend">
                    <swiper-slide v-for="product in products" :key="product.productId">
                        <ProductCard class="productCard" :product="product" />
                    </swiper-slide>
                    
                    <div class="swiper-pagination" slot="pagination"></div>
                    
                </swiper>
            </div>
            <div class="recommendSwiper-button fas fa-chevron-circle-left" slot="button-prev"></div>
            <div class="recommendSwiper-button fas fa-chevron-circle-right" slot="button-next"></div>
        </div>
    </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import ProductCard from './ProductCard'

  export default {
    name: 'swiper-example-loop-group',
    title: 'Loop mode with multiple slides per group',
    components: {
      Swiper,
      SwiperSlide,
      ProductCard
    },
    props: ['products'],
    data() {
      return {
        swiperOption_recommend: {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 4,
          loop: false,
          loopFillGroupWithBlank: false,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.recommendSwiper-button.fa-chevron-circle-right',
            prevEl: '.recommendSwiper-button.fa-chevron-circle-left'
          },
          autoplay: {
              delay: 3500,
              disableOnInteraction: false
          },
          breakpoints: { 
                0: {  //當螢幕寬度大於等於320
                    slidesPerView: 1,
                    slidesPerGroup: 1,
                    spaceBetween: 10
                },
                768: {  //當螢幕寬度大於等於768 
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    spaceBetween: 20
                },
                992: {  //當螢幕寬度大於等於992
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30
                },
                1200: {  //當螢幕寬度大於等於1200
                    slidesPerView: 4,
                    slidesPerGroup: 4,
                    spaceBetween: 30
                }
            }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.recommendSwiper-container {
    position: relative;
    .swiper-container {
        --swiper-pagination-color: #29dce8;
        margin-right: 40px;
        margin-left: 40px;

        @media (max-width: 768px) {
            & {
                margin: auto;
            }
        }
        .swiper {
            z-index: 1;
            .productCard {
                margin-bottom: 50px;
            }
        }
    }

    .recommendSwiper-button.fa-chevron-circle-left,
    .recommendSwiper-button.fa-chevron-circle-right {
        position: absolute;
        font-size: 40px;
        color: rgba(0,0,0,.5);
        opacity: 0.3;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 10;
        outline: none;
        
        &:after {
            content: '';
        }

        &:hover {
            opacity: 1;
        }

        @media (max-width: 768px) {
            & {
                display: none;
            }
        }
    }

    .recommendSwiper-button.fa-chevron-circle-right {
        right: 10px;
    }

    .recommendSwiper-button.fa-chevron-circle-left {
        left: 10px;
    }
}
</style>