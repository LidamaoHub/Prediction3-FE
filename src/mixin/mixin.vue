<script>
import { mapState } from "vuex";
import pred_abi from "@/abi/pred_abi.json";

export default {
  computed: {
    ...mapState([
      "web3",
      "wallet_address",
      "badChainId",
      "predContract",
      "factoryContract",
    ]),
  },
  methods: {
    dealError(error) {
      let self = this;
      let m = error.error ? error.error.message : error.message;
      self.$notification.error({
        message: m,
      });
    },
    async getPredictionInfo(address) {
      let self = this;
      let contract = await new self.$ethers.Contract(
        address,
        pred_abi,
        self.web3
      );
      let predInfo = await contract.predictionInfo();
      let [
        publishState,
        voteState,
        sideAShares,
        sideBShares,
        CoinAddress,
        arbiter,
        sharePrice,
        fee,
        pred_intro_hash,
      ] = predInfo;
      return {
        publishState,
        voteState,
        sideAShares:parseInt(sideAShares),
        sideBShares:parseInt(sideBShares),
        CoinAddress,
        arbiter,
        sharePrice:parseInt(sharePrice),
        fee:parseInt(fee),
        pred_intro_hash,
        pred_address:address
      };
    },
  },
};
</script>
