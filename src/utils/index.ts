import path from "path"
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

export const toTitleCase = (str: string) =>
  str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })

export const getMonthName = (date: string | Date) => MONTHS[new Date(date).getMonth()]

export const getSlugFromPathname = (pathname: string) => path.basename(pathname, path.extname(pathname))

export const compareDateForSort = <T extends { data: { date: string } }>(a: T, b: T) => {
  return +new Date(b.data.date) - +new Date(a.data.date)
}
