<template>
  <div class="ex2">
    <div>ex1 - logical regression </div>
    <div>3.1 - data scatter <button @click="showScatter">show</button> </div>
    <div id="scatterContainer" class="chartcontainer"></div>
    <div>3.2 - θ=[0,0,0],J(θ) = {{ output.cost }} <button @click="showCost">show</button> </div>
    <div>3.3 - data scatter <button @click="showScatterAndLine">show</button> </div>
    <div id="scatterAndLineContainer" class="chartcontainer"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { onMounted, onUnmounted } from "vue";
import * as tf from "@tensorflow/tfjs";
import MyCharts from '@/utils/myEcharts'
import Get from '@/utils/get'


export default defineComponent({
  name: 'ex1',

  setup() {
    let output = reactive({ cost: 0 });

    let data1: Array<Array<number>>;
    let data2: Array<Array<number>>;


    const showScatter = () => {
      var myCharts = new MyCharts('scatterContainer', 20, 100, 20, 100);
      let data = Get('ex2/data1_showData')
      const dataJson: Array<Array<number>> = JSON.parse(data);

      myCharts.writeScatter(dataJson.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(dataJson.filter(x => x[2] == 0).map(x => [x[0], x[1]]));
    }

    const showCost = () => {
      let data = Get('ex2/data1_costValue')
      output.cost = JSON.parse(data)[0]
    }


    const showScatterAndLine = () => {
      var myCharts = new MyCharts('scatterAndLineContainer', 0, 130, 0, 130);
      let data = Get('ex2/data1_showData')
      const dataJson: Array<Array<number>> = JSON.parse(data);
      myCharts.writeScatter(dataJson.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(dataJson.filter(x => x[2] == 0).map(x => [x[0], x[1]]));
      let thetaData  = Get('ex2/data1_gradientDescent')
      let theta  =JSON.parse(thetaData);
      myCharts.writeLine(-1 * theta[0] / theta[1], 0, 0, -1 * theta[0] / theta[2])
    }




    return {
      showScatter, showCost, output, showScatterAndLine
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
