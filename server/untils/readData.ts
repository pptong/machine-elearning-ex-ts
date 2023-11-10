import * as fs from "fs";

export default function ReadData(path: string): Array<Array<number>> {
  var rdata = Array<Array<number>>();
  let fileContent = fs.readFileSync(path, 'utf8');
  let tableData: Array<Array<number>> = fileContent.split("\n").map((x) => {
    const e = x.split(",");
    let arrayData: Array<number> = [];
    for (let i = 0; i < e.length; i++) {
      arrayData.push(Number(e[i]));
    }
    return arrayData;
  });
  return tableData;
}
