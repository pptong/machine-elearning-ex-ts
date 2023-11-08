<template>
  <div class="ex1">
    <div>ex1 - logical regression </div>
    <div>3.1 - data scatter <button @click="showScatter">show</button> </div>
    <div id="scatterContainer" class="chartcontainer"></div>
    <div>2.2 - J(θ0=0,θ1=0) = {{ output.cost }} <button @click="showCost">show</button> </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { onMounted, onUnmounted } from "vue";
import * as tf from "@tensorflow/tfjs";
import { ReadData } from '@/utils/readData'
import MyCharts from '@/utils/myEcharts'
import { J, H } from './ex2'


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
      alert(cost)

      output.cost = cost;
    }



    onMounted(() => {
      data1 = ReadData('ex2data/ex2data1.txt');
      data2 = ReadData('ex2data/ex2data2.txt');

    });

    return {
      showScatter, showCost, output
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
