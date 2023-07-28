import type { Maze } from './Maze'

class Cell {
  maze: Maze
  x: number
  y: number
  fog: boolean
  neighbours!: {
    [key: string]: Cell
  }

  constructor(x: number, y: number, maze: Maze) {
    this.maze = maze
    this.x = x
    this.y = y
    this.fog = false
    this.neighbours = {}
  }

  revealNeighbours() {
    for (const neighbour of Object.values(this.neighbours)) neighbour.reveal()
  }

  reveal() {
    this.fog = false
  }

  getAdjacents() {
    const adjacents: Cell[] = []

    ;[
      this.x !== 0 ? this.maze.getCell(this.x - 1, this.y) : null,
      this.y !== 0 ? this.maze.getCell(this.x, this.y - 1) : null,
      this.x < this.maze.columns - 1 ? this.maze.getCell(this.x + 1, this.y) : null,
      this.y < this.maze.rows - 1 ? this.maze.getCell(this.x, this.y + 1) : null
    ].forEach((n) => {
      if (n) adjacents.push(n)
    })

    return adjacents
  }
}

export { Cell }
