const minimum = (arr: number[][]) => {
  let result = Number.POSITIVE_INFINITY;
  for (let x = 0; x < arr.length; x++) {
    for (let y = 0; y < arr[x].length; y++) {
      result = min(result, arr, x, y);
    }

    return result;
  }
};
function min(result: number, arr: number[][], x: number, y: number){
  if (result > arr[x][y]) result=arr[x][y];
  return result;
}
console.log(minimum([[1, 2, 4], [1, 2, 3]])); // 결과값 : 1
