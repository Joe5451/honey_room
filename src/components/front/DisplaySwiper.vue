
<template>
  <swiper class="swiper" :options="displaySwiper">
    <swiper-slide class="slide-1"></swiper-slide>
    <swiper-slide class="slide-2"></swiper-slide>
    <swiper-slide class="slide-3"></swiper-slide>
    <swiper-slide class="slide-4"></swiper-slide>
    <swiper-slide class="slide-5"></swiper-slide>
    <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
  </swiper>
</template>

<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'swiper-example-fade-effect',
    title: 'Fade effect',
    components: {
      Swiper,
      SwiperSlide
    },
    data() {
      return {
        displaySwiper: {
            allowTouchMove: true,
            loop: true,
            spaceBetween: 30,
            effect: 'fade',
            pagination: {
            el: '.swiper-pagination',
            clickable: true
            },
            autoplay: {
                delay: 2000,
                disableOnInteraction: false
            }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .swiper {
    height: 360px;
    border-radius: 8px;
    overflow: hidden; 

    .swiper-slide {
      background-position: center;
      background-size: cover;

      &.slide-1 {
        background-image:url('../../assets/image/banner1.jpg')
      }
      &.slide-2 {
        background-image:url('../../assets/image/banner2.jpg')
      }
      &.slide-3 {
        background-image:url('../../assets/image/banner3.jpg')
      }
      &.slide-4 {
        background-image:url('../../assets/image/banner1.jpg')
      }
      &.slide-5 {
        background-image:url('../../assets/image/banner2.jpg')
      }
    }
  }
</style>