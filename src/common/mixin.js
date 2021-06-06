import {debounce} from 'common/utils'
import BackTop from 'components/content/backTop/BackTop'
import {POP, NEW, SELL} from "./const"

export const itemListenerMixin = {
  // components methods data 等都可以使用 mixin混入
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => newRefresh()
    this.$bus.$on("itemImageLoad", this.itemImgListener)
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTop(){
      this.$refs.scroll.scrollTo(0, 0, 200)
    }
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}