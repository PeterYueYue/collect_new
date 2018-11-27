<template>
  <div>
    <ul class="content">
      <li
        @touchstart=toDteailsStart
        @touchmove=toDteailsMove
        @touchend=toDteails(item)
        v-for=" item in list"
        :key="item.id"
        class="item clearfix">
        <img class="imageOfGgift fl" :src=item.img alt="">
        <div class="giftInfo fl">
          <div class="he3">{{item.brand}}</div>
          <div class="discountTicket"><span v-if="$route.params.id == 'dic'">券</span>{{item.name}}</div>
          <div class="expend">
            <span class="number">{{item.bindingPoint}}</span>
            <span>kg能量</span>
            <span class="statistics">{{item.bindingQuantity}}人兑换</span>
          </div>
        </div>

      </li>

    </ul>
  </div>
</template>

<script>
  export default {

    props: ['list', 'isActive', 'memberAddress'],
    data() {
      return {
        justTouch: 'true',
      }
    },
    methods: {
      // touchstart
      toDteailsStart(e) {
        this.justTouch = 'true';
        let target = {
          startY: e.changedTouches[0].pageY,
          startX: e.changedTouches[0].pageX,
        }
        return target;
      },
      // touchmove
      toDteailsMove(e) {
        let moveEndX = e.changedTouches[0].pageX;
        let moveEndY = e.changedTouches[0].pageY;
        let X = moveEndX - this.toDteailsStart.startX;
        let Y = moveEndY - this.toDteailsStart.startY;
        if (Math.abs(X) > Math.abs(Y) && X > 0) {
          this.justTouch = 'true';
        }
        else if (Math.abs(X) > Math.abs(Y) && X < 0) {
          this.justTouch = 'true';
        }
        else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
          this.justTouch = 'true'
        }
        else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
          this.justTouch = 'true'
        }
        else {
          this.justTouch = 'false'
        }
      },
      // touchend
      toDteails(item) {
        if (this.justTouch == 'true') {
          switch (this.isActive) {

            case 'dic':
              this.$router.push({path: '/ticketdetails', query: {item: JSON.stringify(item)}});
              break;
            case 'goods':
              this.$router.push(
                {
                  path: '/goodsTicket',
                  query: {
                    item: JSON.stringify(item),
                    memberAddress: JSON.stringify(this.memberAddress)
                  }
                });
              break;
          }

        }
      }
    }

  }
</script>

