<template>
    <div class="tool-bar position-fixed">
        <a href="#" class="top-btn rounded-circle">
            Top<i class="fas fa-chevron-up"></i>
        </a>
        <button class="shopping-btn rounded-circle border-light">
            <i class="fas fa-shopping-cart"></i>
        </button>
    </div>
</template>

<script>
export default {
    mounted () {
        const topBtn = document.querySelector('.top-btn');

        window.addEventListener('scroll', function() {
            if (window.scrollY > 600) {
                topBtn.classList.add('active');
            } else {
                topBtn.classList.remove('active');
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .tool-bar {
        bottom: 20px;
        right: 10px;
        z-index: 100;
        display: flex;
        flex-direction: column;

        .shopping-btn {
            width: 50px;
            height: 50px;
            margin-top: 20px;
            outline: none;
            background: #dc3545;
            box-shadow: 0 0 2px 2px rgba(0, 0, 0, .5);
            opacity: 0.7;
            transition: opacity 0.3s;

            &:hover {
                opacity: 0.9;
            }

            i {
                color: #fff;
                font-size: 24px;
            }
        }

        .top-btn {
            width: 50px;
            height: 50px;
            outline: none;
            background: transparent;
            background: rgba(255,255,255,.9);
            border: 3px solid #000;
            font-size: 12px;
            color: #000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transform: scale(0);
            opacity: 0.6;
            transition: all 0.3s;

            &:hover {
                opacity: 1;
            }

            &.active {
                transform: scale(1);
            }

            i {
                color: #000;
                font-size: 18px;
            }
        }
    }
</style>