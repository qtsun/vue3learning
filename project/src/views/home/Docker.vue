<template>
    <div class="docker">
      <!-- BEM
      block__element--Modifier -->
      <div v-for="(item, index) in dockerList"
      :class="{'docker__item': true, 'docker__item--active':index===0}"
       :key="item.icon" class="docker__item">
       <router-link :to="item.to">
         <div class="iconfont" v-html="item.icon" />
         <div class="docker__title">{{item.text}}</div>
       </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: '&#xe9ce;', text: '首页', to: {name:'Home'} },
      { icon: '&#xe6e6;', text: '购物车', to: {name:'CartList'}  },
      { icon: '&#xe7c5;', text: '订单', to: {name:'Home'}  },
      { icon: '&#xe609;', text: '我的', to: {name:'Home'}  }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.docker {
  display: flex;
  box-sizing: border-box;
  position: absolute;
  padding: 0 .18rem;
  left:0;
  bottom:0;
  width: 100%;
  height: .49rem;
  border-top: .01rem solid $content-bgColor;
  &__item {
    flex:1;
    text-align: center;
    a {
        color: $content-fontcolor;
        text-decoration: none;
    }
    .iconfont {
      margin: .07rem 0 .02rem 0;
      font-size: .18rem;
    }
    &--active {
      a {
        color: #1FA4FC;
      }
    }
  }
  &__title {
      font-size: .2rem; //浏览器默认最小字体12px, 若直接写10px,展示的还是12px
      transform: scale(.5, .5); // 垂直和水平缩放 .5
      transform-origin: center top; //以center和顶部为中心
  }
}
</style>
