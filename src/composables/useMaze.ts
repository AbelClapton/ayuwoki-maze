import { ref, type Ref } from 'vue'
import { type Cell } from '@/types/Cell'

const cells: Cell[] = []

const init = (rows: number, cols: number) => {
  const cells: Cell[] = []

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      cells[x + y * cols] = (x, y, cells)
    }
  }
}

const posToIndex = (x: number, y: number, cols: number) => {
  return cells[x + y * cols]
}

const useMaze = (rows: number, cols: number) => {
  const cells = mapMaze(new Maze(rows, cols))

  const cells = ref(generateCells(cols, rows))

  return { cells }
}

export { useMaze }
