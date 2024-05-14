export default function gaussian(mean: number, stdDev: number) {
  let u1 = Math.random();
  let u2 = Math.random();
  let randStdNormal =
    Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
  let randNormal = mean + stdDev * randStdNormal;
  return randNormal;
}
