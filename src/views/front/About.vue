<template>
    <div>
        <div class="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb border-bottom">
                    <li class="breadcrumb-item h6"><router-link to="/">首頁</router-link></li>
                    <li class="breadcrumb-item active h6" aria-current="page">關於我們</li>
                </ol>
            </nav>
        </div>
        <section class="l-section">
            <div class="container">
                <div class="row">
                    <div class="col-md-7">
                        <h2 class="l-section-title">關於哈妮屋</h2>
                        <p>
                            在這裡有美國大分量的紙杯蛋糕、德國濃郁鄉村氣息的櫻桃黑森林蛋糕或是義大利無人不知的提拉米蘇，以及精緻又複雜的法式甜點
                        </p>
                        <p>
                            我們將甜點與文化藝術品划上等號，讓你在每一個角落都能感受到五彩斑斕的甜點世界 
                        </p>
                        <p>
                            堅持手工製作，並採用健康、無添加的上等材料，新鮮製作甜點
                        </p>
                        <p>
                            醉心於研究各種甜品，並在其中加入浪漫動人的元素，琳琅滿目的甜品閃耀著精緻誘人的光彩，讓你不禁陶醉其中
                        </p>
                        <p>
                            找一個溫暖的下午，細細體會其中的美味，一起品嘗出這些甜點背後的文化與藝術，我們將帶給你視覺、味覺、嗅覺的極致體驗
                        </p>
                    </div>
                    <div class="col-md-5">
                        <div class="w-100 h-100">
                            <img src="../../assets/image/image10.jpg" alt="product" class="w-100 h-100 rounded" style="object-fit:cover">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="l-section secret">
            <h2 class="l-section-title">好吃的秘訣</h2>
            <div class="container">
                <div class="row">
                    <div class="col-md-4 secret-item mb-3 mb-md-0">
                        <h4><i class="fas fa-leaf"></i>新鮮自然</h4>
                        <p>我們本著用心、真心、良心的態度來製作出健康美味的甜點，替顧客挑選新鮮自然的原料，為你的健康做把關</p>
                    </div>
                    <div class="col-md-4 secret-item mb-3 mb-md-0">
                        <h4><i class="fas fa-scroll"></i>最佳配方</h4>
                        <p>經過多次嘗試，搭配出最好的配方，材料間完美平衡，並且兼顧品質、細緻、藝術為一體，將每個細節做到最好</p>
                    </div>
                    <div class="col-md-4 secret-item mb-3 mb-md-0">
                        <h4><i class="fas fa-bread-slice"></i>全新創造</h4>
                        <p>研究各種甜品，並在其中加入浪漫動人的元素，創造風格鮮明、讓人耳目一新，專屬於我們的精品甜點</p>
                    </div>
                </div>
            </div>
        </section>
        <hr />
        <section class="l-section about">
            <div class="px-0 px-sm-5">
                <div class="row no-gutters">
                    <div class="col-md-6 about-img">
                        <img src="../../assets/image/image14.jpg" alt="picture">
                    </div>
                    <div class="col-md-6 about-content my-5 my-md-0 px-5">
                        <span>
                            <i class="fas fa-coffee"></i>
                        </span>
                        <h4>享受美好下午茶時光</h4>
                        <p class="mt-3 text-secondary">繁忙的生活中，給自己紓壓的時間，在寧靜輕鬆的空間享受咖啡、甜點！</p>
                    </div>
                </div>
                <div class="row no-gutters">
                    <div class="col-md-6 about-img order-md-2">
                        <img src="../../assets/image/image15.jpg" alt="picture">
                    </div>
                    <div class="col-md-6 about-content my-5 my-md-0 px-5 order-md-1">
                        <span>
                            <i class="fas fa-cheese"></i>
                        </span>
                        <h4>探索甜點世界</h4>
                        <p class="mt-3 text-secondary">一起享受令人著迷的滋味，讓人愛不釋口的美味點心，愈吃愈上癮！</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>
@import "~bootstrap/scss/functions";
@import "../../assets/scss/helpers/_variables";

.about {
    .about-img {
        img {
            width: 100%;
            height: 100%;
            object-fit:cover;
        }
    }

    .about-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;

        span {
            display: block;
            border-radius: 50%;
            border: 3px solid $dark;
            padding: 1rem;
            margin: 0.5rem 0;
            i {
                font-size: 3rem;
            }
        }
    }
}

.secret {
    .secret-item {
        padding-left: 50px;
        position: relative;

        i {
            position: absolute;
            top: 0;
            left: 15px;
        }

        p {
            color: $secondary;
        }
    }
}
</style>