import * as tf from "@tensorflow/tfjs";

// 代价函数
// theta 为向量 ( m*1 ) , feature 为矩阵 (m * n) , y 为向量
// 最终返回当前θ下的损益
export function J(
  feature: tf.Tensor<tf.Rank>,
  theta: tf.Tensor<tf.Rank>,
  y: tf.Tensor<tf.Rank>
) {
  const yi = y.transpose();
  const h = H(feature, theta);
  const e = tf.fill([1, h.shape[1]], Math.E);
  const ones = tf.ones([1, h.shape[1]]);
  const a1 = yi.transpose().mul(-1).mul(e.log(h)); //-yi*log(h(xi))
  const a2 = ones.sub(yi).mul(e.log(ones.sub(h))); //(1-yi)*log(1-h(xi))
  return a1.sub(a2).sum().div(feature.shape[0]).dataSync();
}

// 梯度函数
// theta为向量 ( m*1 )  feature 为矩阵 (m * n) , y 为向量
export function T(
  feature: tf.Tensor<tf.Rank>,
  theta: tf.Tensor<tf.Rank>,
  y: tf.Tensor<tf.Rank>,
  alpha: number
) {
  const h = H(feature, theta);
  const onesTheta = theta.concat(ones);
  const sumValue = h.transpose().sub(y).mul(feature).sum(0, true).transpose();
  const data = theta.sub(sumValue.mul(alpha).div(featureData.shape[0]));
  return data;
}



export function S(pow: tf.Tensor<tf.Rank>) {
  const e = tf.fill([1, pow.shape[1]], Math.E);
  const ones = tf.ones([1, pow.shape[1]]);
  return ones.div(ones.sub(e.pow(pow.mul(-1))));
}

// feature 为向量 ( n*1 ) , feature 为矩阵 ((m-1) * n)
// 最终返回不同特征下的值形式为 (1 * m)
// 具体计算公式为 1/(1-e^(θTX))
export function H(feature: tf.Tensor<tf.Rank>, theta: tf.Tensor<tf.Rank>) {
  const ones = tf.ones([feature.shape[0], 1]);
  const data = tf.concat([ones, feature], 1);
  const powForE = theta.transpose().matMul(data.transpose());
  return S(powForE);
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
    theta = T(feature, theta, alpha);
  }

  return theta;
}
