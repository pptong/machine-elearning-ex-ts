import ex1Controller from "../controller/ex1Controller";
import { RouterItem } from "./appRouter";
export const ex1Routers: RouterItem[] = [
  {
    path: "/ex1/data1_showCost",
    method: "post",
    action: ex1Controller.data1_showCost,
  },
  {
    path: "/ex1/data1_showData",
    method: "post",
    action: ex1Controller.data1_showData,
  },
  {
    path: "/ex1/data1_showLearningCurve",
    method: "post",
    action: ex1Controller.data1_showLearningCurve,
  },
  {
    path: "/ex1/data1_showScatterAndLine",
    method: "post",
    action: ex1Controller.data1_showScatterAndLine,
  },
  {
    path: "/ex1/data2_showLearningCurveByEveryAlpha",
    method: "post",
    action: ex1Controller.data2_showLearningCurveByEveryAlpha,
  }
];
