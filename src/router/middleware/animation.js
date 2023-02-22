import Loader from "@/classes/loader";

export default (to, from) => {
  setTimeout(() => Loader.routeChange().set(false), 1000)
}
