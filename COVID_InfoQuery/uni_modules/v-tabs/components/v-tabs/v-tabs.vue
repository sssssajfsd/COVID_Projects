<template>
  <view :id="elId" class="v-tabs">
    <scroll-view
      id="scrollContainer"
      :scroll-x="scroll"
      :scroll-left="scroll ? scrollLeft : 0"
      :scroll-with-animation="scroll"
      :style="{ position: fixed ? 'fixed' : 'relative', zIndex: 1993 }"
    >
      <view
        class="v-tabs__container"
        :style="{
          display: scroll ? 'inline-flex' : 'flex',
          whiteSpace: scroll ? 'nowrap' : 'normal',
          background: bgColor,
          height,
          padding
        }"
      >
        <view
          :class="['v-tabs__container-item', { disabled: !!v.disabled }]"
          v-for="(v, i) in tabs"
          :key="i"
          :style="{
            color: current == i ? activeColor : color,
            fontSize: current == i ? fontSize : fontSize,
            fontWeight: bold && current == i ? 'bold' : '',
            justifyContent: !scroll ? 'center' : '',
            flex: scroll ? '' : 1,
            padding: paddingItem
          }"
          @click="change(i)"
        >
          {{ field ? v[field] : v }}
        </view>
        <view
          v-if="!pills"
          :class="['v-tabs__container-line', { animation: lineAnimation }]"
          :style="{
            background: lineColor,
            width: lineWidth + 'px',
            height: lineHeight,
            borderRadius: lineRadius,
            left: lineLeft + 'px',
            transform: `translateX(-${lineWidth / 2}px)`
          }"
        ></view>
        <view
          v-else
          :class="['v-tabs__container-pills', { animation: lineAnimation }]"
          :style="{
            background: pillsColor,
            borderRadius: pillsBorderRadius,
            left: pillsLeft + 'px',
            width: currentWidth + 'px',
            height
          }"
        ></view>
      </view>
    </scroll-view>
    <view
      class="v-tabs__placeholder"
      :style="{
        height: fixed ? height : '0',
        padding
      }"
    ></view>
  </view>
</template>

<script>
/**
 * v-tabs
 * @property {Number} value ???????????????
 * @property {Array} tabs tabs ??????
 * @property {String} bgColor = '#fff' ????????????
 * @property {String} color = '#333' ????????????
 * @property {String} activeColor = '#2979ff' ??????????????????
 * @property {String} fontSize = '28rpx' ??????????????????
 * @property {String} activeFontSize = '28rpx' ??????????????????
 * @property {Boolean} bold = [true | false] ????????????????????????
 * @property {Boolean} scroll = [true | false] ????????????
 * @property {String} height = '60rpx' tab ?????????
 * @property {String} lineHeight = '10rpx' ??????????????????
 * @property {String} lineColor = '#2979ff' ??????????????????
 * @property {Number} lineScale = 0.5 ??????????????????????????????
 * @property {String} lineRadius = '10rpx' ???????????????
 * @property {Boolean} pills = [true | false] ??????????????????
 * @property {String} pillsColor = '#2979ff' ???????????????
 * @property {String} pillsBorderRadius = '10rpx' ??????????????????
 * @property {String} field ?????????????????????????????????
 * @property {Boolean} fixed = [true | false] ????????????
 * @property {String} paddingItem = '0 22rpx' ???????????????
 * @property {Boolean} lineAnimation = [true | false] ????????????????????????
 *
 * @event {Function(current)} change ??????????????????
 */
export default {
  props: {
    value: {
      type: Number,
      default: 0
    },
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    padding: {
      type: String,
      default: '0'
    },
    color: {
      type: String,
      default: '#333'
    },
    activeColor: {
      type: String,
      default: '#2979ff'
    },
    fontSize: {
      type: String,
      default: '28rpx'
    },
    activeFontSize: {
      type: String,
      default: '32rpx'
    },
    bold: {
      type: Boolean,
      default: true
    },
    scroll: {
      type: Boolean,
      default: true
    },
    height: {
      type: String,
      default: '70rpx'
    },
    lineColor: {
      type: String,
      default: '#2979ff'
    },
    lineHeight: {
      type: String,
      default: '10rpx'
    },
    lineScale: {
      type: Number,
      default: 0.5
    },
    lineRadius: {
      type: String,
      default: '10rpx'
    },
    pills: {
      type: Boolean,
      default: false
    },
    pillsColor: {
      type: String,
      default: '#2979ff'
    },
    pillsBorderRadius: {
      type: String,
      default: '10rpx'
    },
    field: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: false
    },
    paddingItem: {
      type: String,
      default: '0 22rpx'
    },
    lineAnimation: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      elId: '',
      lineWidth: 30,
      currentWidth: 0, // ?????????????????????
      lineLeft: 0, // ???????????????????????????
      pillsLeft: 0, // ???????????????????????????
      scrollLeft: 0, // ?????????????????????
      containerWidth: 0, // ???????????????
      current: 0 // ???????????????
    }
  },
  watch: {
    value (newVal) {
      this.current = newVal
      this.$nextTick(() => {
        this.getTabItemWidth()
      })
    },
    current (newVal) {
      this.$emit('input', newVal)
    },
    tabs (newVal) {
      this.$nextTick(() => {
        this.getTabItemWidth()
      })
    }
  },
  methods: {
    // ?????????????????????
    randomString (len) {
      len = len || 32
      let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****????????????????????????????????????oOLl,9gq,Vv,Uu,I1****/
      let maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      return pwd
    },
    // ????????????
    change (index) {
      const isDisabled = !!this.tabs[index].disabled
      if (this.current !== index && !isDisabled) {
        this.current = index

        this.$emit('change', index)
      }
    },
    // ?????????????????????
    getTabItemWidth () {
      let query = uni
        .createSelectorQuery()
        // #ifndef MP-ALIPAY
        .in(this)
      // #endif
      // ?????????????????????
      query
        .select(`#scrollContainer`)
        .boundingClientRect((data) => {
          if (!this.containerWidth && data) {
            this.containerWidth = data.width
          }
        })
        .exec()
      // ??????????????? tab-item ?????????
      query
        .selectAll('.v-tabs__container-item')
        .boundingClientRect((data) => {
          if (!data) {
            return
          }
          let lineLeft = 0
          let currentWidth = 0
          if (data) {
            for (let i = 0; i < data.length; i++) {
              if (i < this.current) {
                lineLeft += data[i].width
              } else if (i == this.current) {
                currentWidth = data[i].width
              } else {
                break
              }
            }
          }
          // ?????????????????????
          this.currentWidth = currentWidth
          // ????????????????????????
          this.lineWidth = currentWidth * this.lineScale * 1
          // ????????????????????????
          this.lineLeft = lineLeft + currentWidth / 2
          // ???????????????????????????
          this.pillsLeft = lineLeft
          // ????????????????????????????????????
          if (this.scroll) {
            this.scrollLeft = this.lineLeft - this.containerWidth / 2
          }
        })
        .exec()
    }
  },
  mounted () {
    this.elId = 'xfjpeter_' + this.randomString()
    this.current = this.value
    this.$nextTick(() => {
      this.getTabItemWidth()
    })
  }
}
</script>

<style lang="scss" scoped>
.v-tabs {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  &__container {
    min-width: 100%;
    position: relative;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;

    &-item {
      display: flex;
      align-items: center;
      height: 100%;
      position: relative;
      z-index: 10;
      // padding: 0 11px;
      transition: all 0.3s;
      white-space: nowrap;
      &.disabled {
        opacity: 0.5;
        color: #999;
      }
    }

    &-line {
      position: absolute;
      bottom: 0;
    }

    &-pills {
      position: absolute;
      z-index: 9;
    }
    &-line,
    &-pills {
      &.animation {
        transition: all 0.3s linear;
      }
    }
  }
}
</style>
