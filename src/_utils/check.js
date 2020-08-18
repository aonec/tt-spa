export function check(regExp = "", str = "", flags = "gi") {
  const exp = new RegExp(regExp, flags)
  return exp.test(str)
}
