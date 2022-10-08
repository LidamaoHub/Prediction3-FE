<template>
  <div class="content">
    <div class="section-1">
      <div class="part-1">
        <img src="@/assets/images/index_img1.png" alt="">
      </div>
      <div class="part-2">
        <div class="welcome">Welcome to Prediction³</div>
        <div class="title">What is <span>Prediction³</span><label>?</label>
          <img src="@/assets/images/index_img3.png" alt="">
        </div>
        <div class="desc">Prediction3 is a social and fully decentralized "dispute resolution solution".</div>
        <div class="make-btn">
          <router-link :to="{ name: 'New' }">
            Make a Prediction!
          </router-link>
        </div>
      </div>
      <div class="part-3">
        <img src="@/assets/images/index_img2.png" alt="">
      </div>
    </div>
    <div class="section-2">
      <div class="main-content section-2-content">
        <div class="flex-center-sb">
          <div class="section-flex-l">
            <div class="process">PROCESS</div>
            <div class="section-title">Why use the Prediction³<span>?</span></div>
            <div class="section-desc">If you and your friends are in a dispute about whether future events will occur 🤼‍♂️ , <br /><span>Use Prediction3 immediately!</span></div>
          </div>
          <div class="section-flex-r">
            <img src="@/assets/images/index_img4.png" alt="">
          </div>
        </div>
        <div class="flex-start-sb">
          <div class="flex-1 flex-item">
            <div class="step-index">1</div>
            <img src="@/assets/images/index_img5.png" alt="">
            <div class="step-title">Find the <br /><span>arbitrator</span></div>
            <div class="step-desc">Find an impartial third party friend to act as an arbiter <span>(or do it yourself).</span></div>
          </div>
          <div class="flex-2 flex-item">
            <div class="step-index">2</div>
            <img src="@/assets/images/index_img6.png" alt="">
            <div class="step-title"><span>Description<br /></span>details</div>
            <div class="step-desc">Give as much detail as possible about the prediction. <span>(if something other than what is described occurs, let the arbiter gives the final verdict).</span></div>
          </div>
          <div class="flex-3 flex-item">
            <div class="step-index">3</div>
            <img src="@/assets/images/index_img7.png" alt="">
            <div class="step-title">Just <span> wait</span></div>
            <div class="step-desc">Waiting patiently for events to happen or for the agreed upon time to arrive.</div>
          </div>
          <div class="flex-4 flex-item">
            <div class="step-index">4</div>
            <div class="step-title">Publish<br /><span>results</span></div>
            <div class="step-desc">The arbiter releases the results, the arbiter takes the commission, and the winner takes the prize.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="less" scoped>
.content {
  .section-1 {
    width: 100%;
    height: 602px;
    display: flex;
    align-items: center;
    justify-content: center;
    .part-1 {
      width: 305px;
      height: auto;
      margin-bottom: -250px;
      img {
        width: 305px;
        height: auto;
      }
    }
    .part-2 {
      margin-left: -52px;
      .welcome {
        font-weight: 400;
        font-size: 16px;
        line-height: 14px;
        text-align: center;
        letter-spacing: 0.02em;
        color: #8796A3;
      }
      .title {
        font-weight: 800;
        font-size: 54px;
        line-height: 66px;
        text-align: center;
        color: #1E2022;
        margin-top: 18px;
        display: flex;
        align-items: center;
        position: relative;
        font-weight: 800;
        span {
          color: rgba(38, 54, 200, 1);
          margin-left: .25em;
        }
        label {
          margin-left: 9px;
          font-weight: 700;
          font-size: 61px;
          line-height: 74px;
          text-align: center;
          color: #1E2022;
        }
        img {
          position: absolute;
          width: 285px;
          height: auto;
          transform: rotate(-2.37deg);
          right: 52px;
          top: 33px;
          z-index: 0;
        }
      }
      .desc {
        width: 441px;
        font-weight: 400;
        font-size: 18px;
        line-height: 28px;
        text-align: center;
        letter-spacing: 0.02em;
        color: #1E2022;
        margin: auto;
        margin-top: 52px;
      }
      .make-btn {
        font-weight: 800;
        font-size: 18px;
        line-height: 22px;
        text-align: center;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 213px;
        height: 56px;
        background: #1E2022;
        border-radius: 6px;
        margin: auto;
        margin-top: 55px;
        a {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    .part-3 {
      margin-left: 10px;
      margin-top: 150px;
      img {
        width: 215px;
        height: auto;
      }
    }
  }
  .section-2 {
    background: #F8FAFC;
    // padding: 62px 16.6% 0;
    box-sizing: border-box;
    width: 100%;
    .section-2-content {
      padding: 62px 240px 170px;
      box-sizing: border-box;
      width: 100%;
      .section-flex-l {
        width: 546px;
        flex: 0 0 546px;
        .process {
          font-weight: 700;
          font-size: 16px;
          line-height: 14px;
          letter-spacing: 0.02em;
          color: #2636C8;
        }
        .section-title {
          font-weight: 800;
          font-size: 36px;
          line-height: 44px;
          color: #1E2022;
          margin-top: 18px;
          span {
            margin-left: 4px;
            font-weight: 700;
            font-size: 42px;
            line-height: 51px;
            color: #1E2022;
          }
        }
        .section-desc {
          margin-top: 14px;
          font-weight: 400;
          font-size: 14px;
          line-height: 26px;
          color: #1E2022;
          span {
            font-weight: 700;
          }
        }
      }
      .section-flex-r {
        img {
          width: 312.4px;
          height: auto;
          transform: rotate(9.99deg);
        }
      }
      .flex-start-sb {
        margin-top: 59px;
        .flex-item {
          width: 216px;
          flex: 0 0 216px;
          position: relative;
          .step-index {
            width: 54px;
            height: 54px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(38, 54, 200, .08);
            font-weight: 600;
            font-size: 32px;
            line-height: 39px;
            text-align: right;
            color: #2636C8;
            border-radius: 30px;
          }
          .step-title {
            font-weight: 400;
            font-size: 36px;
            line-height: 46px;
            color: #1E2022;
            width: 100%;
            span {
              font-weight: 700;
            }
          }
          .step-desc {
            margin-top: 24px;
            font-weight: 400;
            font-size: 18px;
            line-height: 30px;
            color: #1E2022;
            span {
              color: #A0A6AC;
            }
          }
          &.flex-1 {
            margin-top: 5px;
            img {
              position: absolute;
              right: -50px;
              width: 181px;
              height: auto;
              top: 0;
            }
            .step-index {
              transform: rotate(-15deg);
              margin-bottom: 32px;
            }
          }
          &.flex-2 {
            margin-top: 105px;
            img {
              position: absolute;
              left: 73px;
              width: 156px;
              height: auto;
              top: -51px;
            }
            .step-index {
              transform: rotate(-15deg);
              margin-bottom: 32px;
            }
          }
          &.flex-3 {
            margin-top: 24px;
            img {
              position: absolute;
              left: 73px;
              width: 163px;
              height: auto;
              top: 0px;
            }
            .step-index {
              margin-bottom: 32px;
            }
          }
          &.flex-4 {
            margin-top: 107px;
            .step-index {
              margin-bottom: 32px;
              transform: rotate(15deg);
            }
          }
        }
      }
    }
  }
}
.flex-center-sb {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.flex-start-sb {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
</style>