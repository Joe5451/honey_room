<template>
    <div>
        <Navbar />
        <main>
            <!-- 如果 path 相同的組件，Vue Router不會注意到任何更改。使用以下 key 屬性，對路徑的任何更改都將觸發使用新數據重新加載組件。 -->
            <!-- 主要是為了 singleProduct page 能夠連到其它的 singleProduct page -->
            <!-- 這是最簡單的方式，還有其它的方式 -->
            <router-view :key="$route.fullPath" />
        </main>
        <ToolBar />
        <Footer class="mt-5" />
    </div>
</template>

<script>
import Navbar from '../../components/front/Navbar'
import Footer from '../../components/front/Footer'
import ToolBar from '../../components/front/ToolBar'

export default {
    components: {
        Navbar,
        Footer,
        ToolBar,
    }
}
</script>