import { Context } from "koa";
import ex2Service from "../service/ex2Service";
import ReadData from "../untils/readData";
import * as tf from "@tensorflow/tfjs-node";
import Contour from "../untils/contour";

class ex2Controller {

  async data1_showData(ctx: Context) {
    const data = ReadData("./data/ex2data/ex2data1.txt");
    ctx.body = data;
  }


  async data2_showData(ctx: Context) {
    const data = ReadData("./data/ex2data/ex2data2.txt");
    ctx.body = data;
  }

  async data1_costValue(ctx: Context) {
    const _ex2Service = new ex2Service();
    const data = ReadData("./data/ex2data/ex2data1.txt");
    const theta = tf.zeros([3, 1]);
    const featureData = tf.tensor(data);
    const feature = featureData.slice([0, 0], [featureData.shape[0], (featureData.shape[1] || 1) - 1]);
    const y = featureData.slice([0, (featureData.shape[1] || 1) - 1], [featureData.shape[0], 1]);
    const cost = await _ex2Service.Cost(feature, theta, y);
    ctx.body = cost;
  }


  async data1_GradientDescent(ctx: Context) {
    const _ex2Service = new ex2Service();
    const data = ReadData("./data/ex2data/ex2data1.txt");
    const thInit = tf.zeros([3, 1]);
    const featureData = tf.tensor(data);
    const feature = featureData.slice([0, 0], [featureData.shape[0], (featureData.shape[1] || 1) - 1]);
    const y = featureData.slice([0, (featureData.shape[1] || 1) - 1], [featureData.shape[0], 1]);
    let theta = await _ex2Service.GradientDescent(feature, 0.01, thInit, y, 200000);
    ctx.body = theta.dataSync();
  }


  async data2_GradientDescent_Lambda1(ctx: Context) {
    console.log("data2_GradientDescent_Lambda1");
    const _ex2Service = new ex2Service();
    const data = ReadData("./data/ex2data/ex2data2.txt");
    const dataMap = await _ex2Service.MapFeature(data);
    const thInit = tf.zeros([28, 1]);
    const featureData = tf.tensor(data);
    const feature = tf.tensor(dataMap);
    const y = featureData.slice([0, (featureData.shape[1] || 1) - 1], [featureData.shape[0], 1]);
    let theta = await _ex2Service.GradientDescent(feature, 0.01, thInit, y, 50000, 1);
    //ctx.body = theta.dataSync();

    var dataFor: Array<Array<number>> = [];
    for (let x1 = -1.2; x1 <= 1.2; x1 += 0.01) {
      for (let x2 = -1.2; x2 <= 1.2; x2 += 0.01) {
        dataFor.push([x1, x2])
      }
    }


    const dataForMap = await _ex2Service.MapFeature(dataFor);
    const dataForH: any = (await _ex2Service.Polynomial(tf.tensor(dataForMap), theta)).dataSync();
    const returnData = Contour(dataForH, -0.01, 0.01, -1.2, 1.2, -1.2, 1.2, 0.01);
    console.log(dataForH);
    console.log(returnData)
    ctx.body = returnData

  }



  async data2_GradientDescent_Lambda0(ctx: Context) {
    console.log("data2_GradientDescent_Lambda0");
    const _ex2Service = new ex2Service();
    const data = ReadData("./data/ex2data/ex2data2.txt");
    const dataMap = await _ex2Service.MapFeature(data);
    const thInit = tf.zeros([28, 1]);
    const featureData = tf.tensor(data);
    const feature = tf.tensor(dataMap);
    const y = featureData.slice([0, (featureData.shape[1] || 1) - 1], [featureData.shape[0], 1]);
    let theta = await _ex2Service.GradientDescent(feature,10, thInit, y, 50000, 0);
    //ctx.body = theta.dataSync();

    var dataFor: Array<Array<number>> = [];
    for (let x1 = -1.2; x1 <= 1.2; x1 += 0.01) {
      for (let x2 = -1.2; x2 <= 1.2; x2 += 0.01) {
        dataFor.push([x1, x2])
      }
    }


    const dataForMap = await _ex2Service.MapFeature(dataFor);
    const dataForH: any = (await _ex2Service.Polynomial(tf.tensor(dataForMap), theta)).dataSync();
    const returnData = Contour(dataForH, -0.1, 0.1, -1.2, 1.2, -1.2, 1.2, 0.01);
    console.log(dataForH);
    console.log(returnData)
    ctx.body = returnData

  }




async data2_GradientDescent_Lambda100(ctx: Context) {
  const _ex2Service = new ex2Service();
  const data = ReadData("./data/ex2data/ex2data2.txt");
  const dataMap = await _ex2Service.MapFeature(data);
  const thInit = tf.zeros([28, 1]);
  const featureData = tf.tensor(data);
  const feature = tf.tensor(dataMap);
  const y = featureData.slice([0, (featureData.shape[1] || 1) - 1], [featureData.shape[0], 1]);
  let theta = await _ex2Service.GradientDescent(feature, 0.01, thInit, y, 10000, 100);
  //ctx.body = theta.dataSync();

  var dataFor: Array<Array<number>> = [];
  for (let x1 = -1.2; x1 <= 1.2; x1 += 0.01) {
    for (let x2 = -1.2; x2 <= 1.2; x2 += 0.01) {
      dataFor.push([x1, x2])
    }
  }


  const dataForMap = await _ex2Service.MapFeature(dataFor);
  const dataForH: any = (await _ex2Service.Polynomial(tf.tensor(dataForMap), theta)).dataSync();
  const returnData = Contour(dataForH, -0.0002, 0.0002, -1.2, 1.2, -1.2, 1.2, 0.01);
  console.log(dataForH);
  console.log(returnData)
  ctx.body = returnData

}
}




export default new ex2Controller();
