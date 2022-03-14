<template>
    <div class="content">   
        <div class="category">
            <div 
            :class="{'category__item': true, 'category__item--active': currentTab === item.tab}" 
            v-for="item in categories" 
            :key="item.name"
            @click="() => handleTabClick(item.tab)"
            >{{item.name}}</div>

        </div>
        <div class="product">
            <div 
                class="product__item"
                v-for="item in list"
                :key="item._id"
            >
                <img class="product__item__img" :src="item.imgUrl" >
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售 {{item.sales}}</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{item.price}}
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span @click="() => { changeCartItem(shopId, item._id, item, -1, shopName) }" class="product__number__minus">-</span>
                    {{getProductCarCount(shopId, item._id)}}
                    <!-- {{cartList?.[shopId]?.productList?.[item._id]?.count || 0}} -->
                    <span @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) }" class="product__number__plus">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request'
import { useCommonCarEffect } from "./commonCartEffect";
const categories = [
    {name: '全部商品',tab: 'all'},
    { name:'秒杀',tab: 'seckill'},
    {name:'新鲜水果',tab:'fruit'}
]
// 和 Tab 切换相关的逻辑
const useTabEffect = () => {
    const currentTab = ref(categories[0].tab)
    const  handleTabClick = (tab) => {
        currentTab.value = tab
    }
    return { currentTab, handleTabClick }
}
// 列表内容相关的逻辑
const useCurrentListEffect = (currentTab, shopId) => {
    
    const content = reactive({ list: []})
    const getContentData = async (tab) => {
        const result = await get(`/api/shop/${shopId}/products`,{tab:currentTab.value})
        if(result?.errno === 0 && result?.data?.length) {
            content.list = result.data
        }
    }
    watchEffect(() => {
        getContentData()
    })
    const { list } = toRefs(content)
    return { list }
}
// 购物车相关逻辑
const useCarEffect = () => {
    const store = useStore()
    const { cartList, changeCarItemInfo } = useCommonCarEffect()

    const changeShopName = (shopId, shopName) => {
        store.commit('changeShopName', {
            shopId, shopName
        })
    }
    const changeCartItem = (shopId, productId, item, num, shopName) => {
            changeCarItemInfo(shopId, productId, item, num)
            changeShopName(shopId, shopName)
    }
    const getProductCarCount = (shopId, productId) => {
        return cartList?.[shopId]?.productList?.[productId]?.count || 0
    }
    return { cartList, changeCartItem, getProductCarCount }

}

export default {
    name:"Content",
    props:['shopName'],
    setup() {
        const route = useRoute()
        const shopId = route.params.id
        const { currentTab, handleTabClick } = useTabEffect()
        const { list } = useCurrentListEffect(currentTab, shopId)

        const { changeCartItem, cartList, getProductCarCount } = useCarEffect()
        return { categories, currentTab, handleTabClick, 
        list, cartList, shopId, changeCartItem, getProductCarCount
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
.content {
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}
.category {
    overflow-y: scroll;
    height: 100%;
    width: .76rem;
    background: $search-bgColor;
    &__item {
        line-height: .4rem;
        text-align: center;
        font-size: 14px;
        color:$content-fontcolor;
        &--active {
            background: $bgColor;
        }
    }
}
.product {
    overflow-y: scroll;
    flex: 1;
    &__item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .0.1rem solid $content-bgColor;
        &__detail {
           overflow: hidden; 
        }
        &__img {
            width: .68rem;
            height: .68rem;
            margin-right: .16rem;
        }
        &__title {
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $content-fontcolor;
            @include ellipsis;
        }
        &__sales {
            margin: .06rem 0;
            line-height: .16rem;
            font-size: .12rem;
            color: $content-fontcolor;
        }
        &__price{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: $highlight-fontColor;
        }
        &__yen {
            font-size: .12rem;
        }
        &__origin {
            margin-left: .06rem;
            line-height: .2rem;
            font-size: .12rem;
            color: $content-fontcolor;
            text-decoration: line-through;
        }
        .product__number {
            position: absolute;
            right: .18rem;
            bottom: .12rem;
            &__minus, &__plus {
                display: inline-block;
                width: .2rem;
                height: .2rem;
                line-height: .16rem;
                border-radius: 50%;
                font-size: .2rem;
                text-align: center;
            }
            &__minus {
                border: .01rem solid $medium-fontColor;
                color: $medium-fontColor;
                margin-right: .05rem;
            }
            &__plus {
                background: $btn-bgColor;
                color: $bgColor;
                margin-left: .05rem;
            }
        }
    }
}
</style>