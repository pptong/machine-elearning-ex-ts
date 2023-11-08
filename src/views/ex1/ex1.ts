import * as tf from "@tensorflow/tfjs";

//代价函数
//j(θ0,θ1)=(1/2m)*[Σ(i=0 to m)(h(i)-yi)^2]
export function J(feature: tf.Tensor<tf.Rank>, theta: tf.Tensor<tf.Rank>) {
  // 特征函数第一列补1
  const one = tf.ones([feature.shape[0], 1]);
  const X = tf.concat([one, feature], 1);

  // 参数θ 最后补-1
  const ones = tf.fill([1, 1], -1);
  const onesTheta = theta.concat(ones);
  const sumData = X.matMul(onesTheta).pow(2).sum();
  return sumData.div(2).div(feature.shape[0]).dataSync();
}



// θj梯度函数
export function T(
  feature: tf.Tensor<tf.Rank>,
  theta: tf.Tensor<tf.Rank>,
  alpha: number
) {
  const one = tf.ones([feature.shape[0], 1]);
  const featureData = tf.concat([one, feature], 1);
  const ones = tf.fill([1, 1], -1);
  const onesTheta = theta.concat(ones);
  const X = featureData.slice([0, 0], [featureData.shape[0], (featureData.shape[1] || 1) - 1]);
  const sumValue = featureData.matMul(onesTheta).mul(X).sum(0, true).transpose();
  const data = theta.sub(sumValue.mul(alpha).div(featureData.shape[0]));
  return data;
}

// h(x) = sum ( X * θ )
export function H(feature: tf.Tensor<tf.Rank>, theta: tf.Tensor<tf.Rank>) {
  const ones = tf.ones([feature.shape[0], 1]);
  const data = tf.concat([ones, feature], 1);
  const hData = data.matMul(theta);
  return hData.dataSync();
}

//学习速率曲线
export function learningCurve(
  feature: tf.Tensor<tf.Rank>,
  alpha: number,
  theta: tf.Tensor<tf.Rank>,
  iterations: number
) {
  console.log(alpha);

  const elearningData: Array<any> = [];
  let i = 0;
  for (let i = 0; i < iterations; i++) {
    elearningData.push({ x: i, value: J(feature, theta) });
    theta = T(feature, theta, alpha);
  }
  return elearningData;
}

//梯度算法
export function computeCost(
  feature: tf.Tensor<tf.Rank>,
  alpha: number,
  theta: tf.Tensor<tf.Rank>,
  iterations: number
) {

  let i = 0;
  for (let i = 0; i < iterations; i++) {
    theta = T(feature, theta, alpha)
  }

  return theta;
}
