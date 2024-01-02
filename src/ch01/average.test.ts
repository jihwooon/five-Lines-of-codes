const average = (arr: number[]) => {
  return sum(arr) / size(arr); 
};

const sum = (arr: number[]) => {
  let accumulator = 0;
  for (let i = 0; i < arr.length; i++) {
    accumulator += arr[i];
  }
  return accumulator;
}

const size = (arr: number[]) => {
  return arr.length;
}

console.log(average([1, 2, 3, 4, 5])); // 결과값 : 3
