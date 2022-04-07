<script>
import { mapState } from "vuex";

export default {
    computed: {
    ...mapState(["web3", "wallet_address", "badChainId"]),
  },
  methods:{
    dealError(error){
      let self = this
      let m = error.error ? error.error.message : error.message;
          self.$notification.error({
            message: m,
          });
    }
  }
}
</script>