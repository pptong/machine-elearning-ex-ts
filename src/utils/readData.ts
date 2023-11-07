import Open from "@/utils/open";

export function ReadData(path: string): Array<Array<number>> {
  let dataStr = Open(path);
  let data: Array<Array<number>> = dataStr.split("\r\n").map((x) => {
    const e = x.split(",");
    let arrayData: Array<number> = [];
    for (let i = 0; i < e.length; i++) {
      arrayData.push(Number(e[i]));
    }
    return arrayData;
  });

  return data;
}
