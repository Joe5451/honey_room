<template>
    <div>
        <Navbar />
        <main>
            <router-view></router-view>
        </main>
        <Footer />
    </div>
</template>

<script>
import Navbar from '../../components/front/Navbar'
import Footer from '../../components/front/Footer'

export default {
    components: {
        Navbar,
        Footer
    }
}
</script>