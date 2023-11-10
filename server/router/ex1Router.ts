import ex1Controller from "../controller/ex1Controller";
import { RouterItem } from "./appRouter";
export const ex1Routers: RouterItem[] = [
  {
    path: "/ex1/data1_showCost",
    method: "get",
    action: ex1Controller.data1_showCost,
  },
  {
    path: "/ex1/data1_showData",
    method: "get",
    action: ex1Controller.data1_showData,
  },
  {
    path: "/ex1/data1_showLearningCurve",
    method: "get",
    action: ex1Controller.data1_showLearningCurve,
  },
  {
    path: "/ex1/data1_showScatterAndLine",
    method: "get",
    action: ex1Controller.data1_showScatterAndLine,
  },
  {
    path: "/ex1/data2_showLearningCurveByEveryAlpha",
    method: "get",
    action: ex1Controller.data2_showLearningCurveByEveryAlpha,
  }
];
