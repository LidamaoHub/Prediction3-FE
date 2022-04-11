<template>
  <div>
    <div>
      <div>
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
import axois from "axios"
import axios from 'axios';
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
      async read(){
          let self = this

      },
    handleChange(e, fileList) {
      let self = this;
      console.log("change", e);
      console.log("file", e.file);
      this.fileList = [e.file];
      console.log("fileList", this.fileList);

      return false;
    },
    bef(a, b, c) {
      this.fileList = [a];
      console.log("before", a, b, c);
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
        console.log(this.fileList[0]);
        reader.readAsArrayBuffer(this.fileList[0]);
        reader.onloadend = () => {
          this.buffer = Buffer(reader.result);
          this.uploadToIPFS();
        };
      }
    },
    async uploadJson(){
        let self = this
        let ddl = parseInt(Date.now()/1000)
        let predInfo = {
            title:"Title of the prediction",
            description:"Description of the content of the prediction ",
            options:['ASide of the prediction',"BSide of the prediction"],
            deadline:ddl
        }
        let result = await self.ipfs.add(JSON.stringify(predInfo));
        console.log(result)
        let url = `https://ipfs.infura.io/ipfs/${result.path}`;
        console.log(url)

        let info = await axios.get(url)
        console.log(info)

    },
    async uploadToIPFS() {
    //   let result = await this.ipfs.add(this.buffer);
      let result = await this.ipfs.add(JSON.stringify({ldm:"handsome"}));
      console.log(result);
      this.src = `https://ipfs.infura.io/ipfs/${result.path}`;
      this.ipfsHash = `${result.path}`;
    },
  },
  beforeMount() {},
};
</script>
