let args = process.argv;
args.shift();
args.shift();
sum = 0;
args.forEach(num => {
    sum += Number(num);
});
console.log(sum);