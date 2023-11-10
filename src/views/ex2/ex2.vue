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
import { J, H, computeCost } from './ex2'


export default defineComponent({
  name: 'ex1',

  setup() {
    let output = reactive({ cost: 0 });

    let data1: Array<Array<number>>;
    let data2: Array<Array<number>>;


    const showScatter = () => {
      var myCharts = new MyCharts('scatterContainer', 20, 100, 20, 100);
      myCharts.writeScatter(data1.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(data1.filter(x => x[2] == 0).map(x => [x[0], x[1]]));
    }

    const showCost = () => {
      const theta = tf.zeros([3, 1]);
      const featureData = tf.tensor(data1);
      const feature = featureData.slice([0, 0], [featureData.shape[0], (featureData.shape[1] || 1) - 1]);
      const y = featureData.slice([0, (featureData.shape[1] || 1) - 1], [featureData.shape[0], 1]);
      const cost = J(feature, theta, y);
      output.cost = Number(cost);
    }


    const showScatterAndLine = () => {

      // 显示点阵
      var myCharts = new MyCharts('scatterAndLineContainer', 0, 100, 0, 100);
      myCharts.writeScatter(data1.filter(x => x[2] == 1).map(x => [x[0], x[1]]));
      myCharts.writeScatter(data1.filter(x => x[2] == 0).map(x => [x[0], x[1]]));
      // 显示边界
      const thInit = tf.zeros([3, 1]);
      const featureData = tf.tensor(data1);
      const feature = featureData.slice([0, 0], [featureData.shape[0], (featureData.shape[1] || 1) - 1]);
      const y = featureData.slice([0, (featureData.shape[1] || 1) - 1], [featureData.shape[0], 1]);
      let theta = computeCost(feature, 0.01, thInit, y, 200000);

      // θ0+θ1x1+θ2x2=0 
      // => x1= -θ0/θ1 |x2 = 0
      // => x2= -θ0/θ2 |x1 = 0
      theta.print()
      alert(-1 * theta.dataSync()[0] / theta.dataSync()[1])
      alert(-1 * theta.dataSync()[0] / theta.dataSync()[2])
      myCharts.writeLine(-1 * theta.dataSync()[0] / theta.dataSync()[1], 0, 0, -1 * theta.dataSync()[0] / theta.dataSync()[2])
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
