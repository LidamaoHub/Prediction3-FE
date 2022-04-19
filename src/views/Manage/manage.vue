<template>
    <div class="manage">
        <input type="number" v-model="predId">
        <button @click="show">show</button>
    </div>
</template>
<script>
import mixin from "@/mixin/mixin"
export default {
    mixins:[mixin],
    data(){return {
        predId:null
    }},
    methods:{
        async show(){
            let self = this
            let i = parseInt(self.predId)
            console.log(i)
            console.log( self.factoryContract)
            await self.factoryContract.setShowType(i,true)
            console.log(`${self.predId} Done`)
        }
    }

}
</script>