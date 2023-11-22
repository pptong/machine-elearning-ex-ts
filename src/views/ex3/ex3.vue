<template>
  <div class="ex2">
    <div>ex1 - logical regression </div>
    <div>1.1 - data scatter <button @click="showScatter">show</button> </div>
    <div> <img :src="imageBase64.value" /></div>
    <div>1.2 - accuracy rate = {{ output.data1 }}<button @click="tran_getAccuracyRate">show</button> </div>
    <div>2.1 - accuracy rate = {{ output.data2 }}<button @click="getAccuracyRateByWeight">show</button> </div>


  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { onMounted, onUnmounted } from "vue";
import MyCharts from '@/utils/myEcharts'
import Get from '@/utils/get'


export default defineComponent({
  name: 'ex1',

  setup() {
    let imageBase64 = reactive({ value: '', });
    let output = reactive({ data1: '0', data2: '0' });

    let data1: Array<Array<number>>;
    let data2: Array<Array<number>>;


    const showScatter = () => {
      let data = Get('ex3/data1_showData')
      imageBase64.value = data.toString()

    }

    const tran_getAccuracyRate = () => {
      let data = Get('ex3/tran_getAccuracyRate')
      output.data1 = data.toString();

    }

    const getAccuracyRateByWeight = () => {
      let data = Get('ex3/getAccuracyRateByWeight')
      output.data2 = data.toString();

    }



    return {
      showScatter, imageBase64, tran_getAccuracyRate, getAccuracyRateByWeight, output
    }

  }
})


</script>


<style lang="scss" scoped>
.chartcontainer {
  width: 800px;
  height: 600px;
}
</style>
