<template>
    <div class="v-modal" v-if='show'>

        <div class="shadow"></div>
        <div class="modal-body">
            <div class="title"></div>
            <div class="content"></div>
            <div class="bottom">
                <div class="btn gost">Back</div>
                <div class="btn">Confirm</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            show:false
        }
    },
    methods:{
        open(){
            let self = this
            self.$store.commit('setShowModal',{state:true})
        }
    },
    mounted(){
        let self = this
        // self.open()
    }
}
</script>
<style lang="less">
    .v-modal{
        position: absolute;
        top:0;bottom: 0;left:0;right: 0;

        .shadow{
        position: absolute;
        top:0;bottom: 0;left:0;right: 0;
            // background: rgba(255,255,255,.3);
            
            
        }
    }
</style>