import { useStore } from 'vuex'
import { toRefs } from 'vue'
// 购物车相关逻辑
export const useCommonCarEffect = () => {
    const store = useStore()
    // const { cartList } = toRefs(store.state)
    const cartList  = store.state.cartList
    const changeCarItemInfo = (shopId, productId, productInfo, num) => {
        store.commit('changeCarItemInfo', {
            shopId, productId, productInfo, num
        })
    }
    return { cartList, changeCarItemInfo }
}