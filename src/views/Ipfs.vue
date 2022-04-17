<template>
  <div>
    <div>
      <div>
        <div class="body">
          <div class="btn" tabindex="1">
            <div class="btn-body">1</div>
            <div class="ball"></div>
          </div>
          <div class="btn" tabindex="2">
            <div class="btn-body">2</div>
            <div class="ball"></div>
          </div>
          <div class="btn" tabindex="3">
            <div class="btn-body">3</div>
            <div class="ball"></div>
          </div>
        </div>
        <div class="btn-group">
          <div class="btn" tabindex="4">
            <div class="dot-cover"><div class="dot"></div></div>
            <div class="text">knock knock!</div>
          </div>
        </div>

        <div class="img-wrapper">
          <img class="img-panel" :src="src" />
          <div class="txt-title">{{ ipfsHash }}</div>

          <a-upload
            :file-list="fileList"
            @change="handleChange"
            :before-upload="bef"
          >
            <a-button> Select File </a-button>
          </a-upload>
          <button slot="trigger" size="small" type="primary">选取文件</button>
          <button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="uploadImage"
          >
            上传到服务器
          </button>
          <button @click="uploadJson">上传json到ipfs</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { create } from "ipfs-http-client";
import axois from "axios";
import axios from "axios";
export default {
  name: "",
  props: {
    msg: String,
  },
  data() {
    const ipfs = create("https://ipfs.infura.io:5001");

    return {
      file: null,
      src: "",
      fileList: [],
      ipfs: ipfs,
      buffer: null,
      ipfsHash: "",
    };
  },
  computed: {},
  methods: {
    async read() {
      let self = this;
    },
    handleChange(e, fileList) {
      let self = this;
      this.fileList = [e.file];

      return false;
    },
    bef(a, b, c) {
      this.fileList = [a];
      return false;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    uploadImage() {
      if (this.fileList.length < 1) {
        this.$message.warning("请选择需要上传的文件");
      } else {
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(this.fileList[0]);
        reader.onloadend = () => {
          this.buffer = Buffer(reader.result);
          this.uploadToIPFS();
        };
      }
    },
    async uploadJson() {
      let self = this;
      let ddl = parseInt(Date.now() / 1000);
      let predInfo = {
        title: "Title of the prediction",
        description: "Description of the content of the prediction ",
        options: ["ASide of the prediction", "BSide of the prediction"],
        deadline: ddl,
      };
      let result = await self.ipfs.add(JSON.stringify(predInfo));
      let url = `https://ipfs.infura.io/ipfs/${result.path}`;

      let info = await axios.get(url);
    },
    async uploadToIPFS() {
      //   let result = await this.ipfs.add(this.buffer);
      let result = await this.ipfs.add(JSON.stringify({ ldm: "handsome" }));
      this.src = `https://ipfs.infura.io/ipfs/${result.path}`;
      this.ipfsHash = `${result.path}`;
    },
  },
  beforeMount() {},
};
</script>
<style lang="less">
.btn-group {
  display: flex;
  align-content: center;
  justify-content: center;
  margin-top: 20px;
  .btn {
      outline: unset;
    font-weight: bold;
    background-color: #467fcf;
    padding: 0px 10px;
    color: white;
    display: flex;
    padding-left: 5px;
    height: 30px;
    align-items: center;
    cursor: pointer;
    border-radius: 15px;
      transition: background-color 0.1s;

    .text {
    }
    .dot-cover {
      border:1px solid white;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      border-radius: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0px;
      transition: border-width .1s linear;
      .dot {
        font-size: 0px;
        width: 5px;
        height: 5px;
        background-color: white;
        border-radius: 50%;
      transition: all 0.1s;

      }
    }
    &:hover {
        background-color: #45AAF2;
      .dot-cover {
      border-width:3px ;


      }
      .dot{
        animation: knockone .4s ;
        animation-fill-mode: forwards;

      }
    }
    &:focus{
        background-color: #467fcf;
        .dot-cover {
    //   border:3px solid white;


      }
      .dot{
          animation: knock .5s ;
        animation-fill-mode: forwards;

      }
    }
  }
}
.body {
  display: flex;
  width: 300px;
  margin: 0px auto;
  margin-top: 100px;
  justify-content: space-between;

  .btn {
    padding: 0px 5px;
    margin-right: 10px;
    font-weight: bold;
    cursor: pointer;
    position: relative;
    width: 100px;
    text-align: center;
    // overflow: hidden;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    outline: none;
    .btn-body {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      // background-color: black;
    }
    .ball {
      font-size: 0px;
      width: 8px;
      height: 8px;
      background-color: transparent;
      display: block;
      position: absolute;
      left: 50%;
      margin-left: -4px;
      border-radius: 50%;
      transition: top 0.2s ease-out;
      z-index: -1;
    }
    &:hover {
      .ball {
        animation: ballup 0.3s 1;
        animation-fill-mode: forwards;
      }
    }
    &:focus {
      .ball {
        animation: balldown 0.3s;
        animation-fill-mode: forwards;
      }
      .btn-body {
        color: white;
      }
    }
  }
}

@keyframes ballup {
  0% {
    top: 0px;
    background-color: transparent;
  }
  100% {
    top: -15px;
    background-color: #1684fc;
  }
}
@keyframes balldown {
  0% {
    top: -10px;
    background-color: #1684fc;
  }

  100% {
    top: 0px;
    left: 0px;
    width: 100px;
    height: 30px;
    border-radius: 15px;
    background-color: #1684fc;
  }
}
@keyframes knockone {
     0% {
    width:5px;
          height:5px;
          background-color: #F0C410;
  }
  100%{width:12px;
          height:12px;
          background-color: #F0C410;}
}
@keyframes knock {
  0% {
    width:5px;
          height:5px;
          background-color: #F0C410;
  }
  25%{width:12px;
          height:12px;
          background-color: #F0C410;}
  50%{
      width:5px;
          height:5px;
          background-color: #F0C410;
  }

  100% {
    width:12px;
          height:12px;
          background-color: #F0C410;
  }
}
</style>
