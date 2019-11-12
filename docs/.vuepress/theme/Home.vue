<template>
  <div class="container">
    <div class="home">
    <div class="hero">
      <img
        v-if="data.heroImage"
        :src="$withBase(data.heroImage)"
        alt="hero"
      >
      <h3>因无背后眼，只当耳旁风</h3>
      <!-- <h1>{{ data.heroText || $title || 'Hello' }}</h1> 
      
      <p class="description">
        {{ data.tagline || $description || 'Welcome to your VuePress site' }}
      </p> -->
      
      <!-- <P><NavLink :item="actionLink"/>我们</P> -->
      
       <p class="action"
          v-if="data.actionText && data.actionLink">
        <NavLink
          class="action-button"
          :item="actionLink"
        />

      </p>
    </div>

    <!-- <div
      class="features"
      v-if="data.features && data.features.length"
    >
      <div
        class="feature"
        v-for="(feature, index) in data.features"
        :key="index"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div> 
    </div> -->

    <Content custom/>

   
  </div>
   <!-- <div
      class="footer"
      v-if="data.footer"
    >
      {{ data.footer }}
    </div> -->
    <Footer></Footer>
  </div>
</template>

<script>
import NavLink from './NavLink.vue'
import Footer from './Footer.vue'

export default {
  components: { NavLink, Footer },

  computed: {
    data () {
      return this.$page.frontmatter
    },

    actionLink () {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      }
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.home
  padding $navbarHeight 2rem 0
  max-width 960px
  margin 0px auto
  .hero
    text-align center
    img
      // width 48px
      // height 48px
      max-width 100%
      max-height 280px
      display block
      margin 3.5rem auto 1.5rem
      border-radius 50%
      border 1px solid rgba($textColor, 0.1)
      box-shadow: 0 .25rem 1.2rem 0 hsla(0,0%,40%,.21)
    h3
      margin-top 2rem
      font-size 1rem
      color lighten($textColor, 5%)
    h1
      font-size 3rem
    h1, .description, .action
      margin 1.8rem auto
    .description
      max-width 35rem
      font-size 1.6rem
      line-height 1.3
      color lighten($textColor, 40%)
    .action-button
      display inline-block
      font-size 1.2rem
      color #fff
      background-color $accentColor
      padding 0.5rem 1.2rem
      border-radius 4px
      transition background-color .1s ease
      box-sizing border-box
      border-bottom 1px solid darken($accentColor, 10%)
      &:hover
        background-color lighten($accentColor, 10%)
  .features
    border-top 1px solid $borderColor
    padding 1.2rem 0
    margin-top 2.5rem
    display flex
    flex-wrap wrap
    align-items flex-start
    align-content stretch
    justify-content space-between
  .feature
    flex-grow 1
    flex-basis 30%
    max-width 30%
    h2
      font-size 1.4rem
      font-weight 500
      border-bottom none
      padding-bottom 0
      color lighten($textColor, 10%)
    p
      color lighten($textColor, 25%)

// .footer
//   padding 2.5rem
//   border-top 1px solid $borderColor
//   text-align center
//   color lighten($textColor, 25%)

@media (max-width: $MQMobile)
  .home
    .features
      flex-direction column
    .feature
      max-width 100%
      padding 0 2.5rem

@media (max-width: $MQMobileNarrow)
  .home
    padding-left 1.5rem
    padding-right 1.5rem
    .hero
      img
        max-height 210px
        margin 2rem auto 1.2rem
      h1
        font-size 2rem
      h1, .description, .action
        margin 1.2rem auto
      .description
        font-size 1.2rem
      .action-button
        font-size 1rem
        padding 0.6rem 1.2rem
    .feature
      h2
        font-size 1.25rem
</style>
