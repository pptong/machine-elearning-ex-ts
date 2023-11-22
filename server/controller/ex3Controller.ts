import { Context } from "koa";
import { read as readMat } from '../untils/readMat'
import Jimp from "jimp";
import * as tf from "@tensorflow/tfjs-node";
import ex3Service from "../service/ex3Service";
import * as fs from "fs";
import { number } from "echarts";

class ex3Controller {


  async data1_showData(ctx: Context) {
    const reader = await fs.promises.readFile('./data/ex3data/ex3data1.mat')
    let mat = readMat(reader.buffer)
    let matData: any = mat.data;

    //随机选择100个图片
    let randMat: Array<Array<number>> = [];
    for (let i = 0; i < 100; i++) {
      randMat.push(matData.X[Math.floor(Math.random() * 5000)])
    }

    //每个图片为20*20,每行显示10个共100个
    let image = new Jimp(20 * 10, 20 * 10, 0xffffffff, (err, image) => { });
    for (let i = 0; i < randMat.length; i++) {
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 20; x++) {
          let idx = (20 * 10 * 20 * 4 * Math.floor(i / 10)) + ((i % 10) * 20 * 4) + (y * 20 * 10 * 4) + x * 4
          let min = Math.min(...randMat[i]);
          let max = Math.max(...randMat[i]);
          image.bitmap.data[idx] = (randMat[i][x * 20 + y] - min) / (max - min) * 128
          image.bitmap.data[idx + 1] = (randMat[i][x * 20 + y] - min) / (max - min) * 128
          image.bitmap.data[idx + 2] = (randMat[i][x * 20 + y] - min) / (max - min) * 128
          image.bitmap.data[idx + 3] = (randMat[i][x * 20 + y] - min) / (max - min) * 128
        }
      }
    }
    const data = await image.getBase64Async(Jimp.MIME_JPEG);
    ctx.body = data.toString()

  }


  async tran_getAccuracyRate(ctx: Context) {
    const reader = await fs.promises.readFile('./data/ex3data/ex3data1.mat')
    let mat = readMat(reader.buffer)
    let matData: any = mat.data;
    let x = tf.tensor(matData.X);
    let y = tf.tensor(matData.y).toInt();


    let thetaV: tf.Tensor<tf.Rank> = tf.zeros([(x.shape[1] || 1) + 1, 0]);
    const _ex3Service = new ex3Service();

    for (let number = 0; number < 10; number++) {
      //计算每个分类器的θ
      console.log(number);
      let theta = tf.zeros([(x.shape[1] || 1) + 1, 1]);
      let yi = y.equal(tf.fill([1, x.shape[0] || 1], number + 1)).toInt();
      theta = await _ex3Service.GradientDescent(x, 0.5, theta, yi.transpose(), 20000, 0)
      thetaV = tf.concat([thetaV, theta], 1)
    }


    let re = await _ex3Service.Hypothesis(x, thetaV);
    let max = re.argMax(0).add(1).equal(y.transpose()).toInt().sum().div(5000).dataSync();
    // max.print();
    // thetaV.print();

    ctx.body = max[0]


    // // 1 / ( 1 + e ^ (-θT*X) )
    // var Hypothesis = (x: tf.Tensor<tf.Rank>) => {
    //   return tf.tidy(() => {
    //     const X = tf.concat([tf.ones([1, x.shape[1] || 1]), x], 0);
    //     let data =
    //       tf.scalar(1).div(
    //         tf.scalar(1).add(
    //           tf.scalar(Math.E).pow(
    //             tf.scalar(-1).mul(
    //               theta.transpose().matMul(X)
    //             )
    //           )
    //         )
    //       );
    //     return data;
    //   });
    // }


    // //{Σ -yi*log(h(xi)) - (1-yi)*log(1-h(xi))} / m
    // var Loss = (x: tf.Tensor<tf.Rank>, y: tf.Tensor<tf.Rank>) => {



    //   theta.print
    //   return tf.tidy(() => {
    //     console.log(1)
    //     const h = Hypothesis(x);
    //     const yi = y.transpose();
    //     const data = y.transpose().mul(-1).mul(h.log()).sub(
    //       tf.scalar(1).sub(yi).mul(tf.scalar(1).sub(h).log())
    //     ).sum().div(x.shape[1] || 1).asScalar();


    //     return data;
    //   });
    // }



    // let thetaV: tf.Tensor<tf.Rank> = tf.zeros([(x.shape[0]) + 1, 0]);
    // const numIterations = 100;
    // const learningRate = 0.01;

    // for (let number = 0; number < 10; number++) {
    //   //var theta = tf.variable(tf.zeros([(x.shape[0]) + 1, 1]));
    //   var theta = tf.randomNormal([(x.shape[0]) + 1, 1]).variable();
    //   const optimizer = tf.train.sgd(learningRate);
    //   let yi = y.equal(tf.fill([1, x.shape[1] || 1], number + 1)).toInt();
    //   for (let iter = 0; iter < numIterations; iter++) {
    //     optimizer.minimize(() => {
    //       return Loss(x, yi);
    //     }, true);
    //   }


    //   thetaV = tf.concat([thetaV, theta], 1)
    // }

    // let data = Hypothesis(x);
    // let accuracy = data.argMax(0).add(1).equal(y.transpose()).toInt().sum().div(5000);
    // accuracy.print();

  }


  async getAccuracyRateByWeight(ctx: Context) {

    //读取Theta
    const reader = await fs.promises.readFile('./data/ex3data/ex3weights.mat')
    let mat = readMat(reader.buffer)

    let matData: any = mat.data;
    let theta1 = tf.tensor(matData.Theta1);
    let theta2 = tf.tensor(matData.Theta2);



    //读取特征量
    const reader1 = await fs.promises.readFile('./data/ex3data/ex3data1.mat')
    let mat1 = readMat(reader1.buffer)
    let matData1: any = mat1.data;
    let x = tf.tensor(matData1.X);
    let y = tf.tensor(matData1.y).toInt();



    //隐藏层
    //调用26个神经单元
    const _ex3Service = new ex3Service();
    const data = await _ex3Service.Hypothesis(x, theta1.transpose());

    console.log(`${data.shape[0]} x ${data.shape[1]}`)
    //输出层
    //将第一层的输出，作为输出层的输入
    //调用10个神经单元
    const inputData = await _ex3Service.Hypothesis(data.transpose(), theta2.transpose());



    //计算正确率
    //最终输出的值为5000*10的矩阵，每行为一个数从0到9的概率
    //获取每个数概率最大值+1，也就是实际的数字，得到5000*1的矩阵
    //是否与Y相等，相等的为1，想加后得到相等的数量
    //最终得到正确率
    let max = inputData.argMax(0).add(1).equal(y.transpose()).toInt().sum().div(5000);




    ctx.body = max.dataSync()[0];

  }
}







export default new ex3Controller();
