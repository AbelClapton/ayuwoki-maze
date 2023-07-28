export type Cell = {
  walls: {
    top: boolean
    right: boolean
    bottom: boolean
    left: boolean
  }
  fog: boolean
}
