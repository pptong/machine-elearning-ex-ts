import { Context } from "koa";
import ex2Service from "../service/ex2Service";
import ReadData from "../untils/readData";
import * as tf from "@tensorflow/tfjs";

class ex2Controller {


  async data1_costValue(ctx: Context) {
    const _ex2Service = new ex2Service();
    const data = ReadData("./data/ex2data/ex2data1.txt");
    const theta = tf.zeros([3, 1]);
    const featureData = tf.tensor(data);
    const feature = featureData.slice([0, 0], [featureData.shape[0], (featureData.shape[1] || 1) - 1]);
    const y = featureData.slice([0, (featureData.shape[1] || 1) - 1], [featureData.shape[0], 1]);
    const cost = await _ex2Service.Cost(feature, theta, y);
    console.log(cost)
    ctx.body = cost;
  }


  async data1_GradientDescent(ctx: Context) {
    const _ex2Service = new ex2Service();
    const data = ReadData("./data/ex2data/ex2data1.txt");
    const thInit = tf.zeros([3, 1]);
    const featureData = tf.tensor(data);
    const feature = featureData.slice([0, 0],[featureData.shape[0], (featureData.shape[1] || 1) - 1]);
    const y = featureData.slice([0, (featureData.shape[1] || 1) - 1],[featureData.shape[0], 1]);
    let theta = await _ex2Service.GradientDescent(feature,0.01,thInit,y,200000);
    theta.print();
    ctx.body = theta.dataSync();
  }
}
export default new ex2Controller();
