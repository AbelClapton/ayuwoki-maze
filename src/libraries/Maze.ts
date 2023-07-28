import { getRandomInt } from '@/utils'
import { Cell } from './Cell'
import type { Direction } from './Directions'

class Maze {
  rows: number
  columns: number
  cells: Cell[]
  visited: Cell[]

  constructor(rows: number, columns: number) {
    this.rows = rows
    this.columns = columns
    this.visited = []
    this.cells = []

    this.init()
  }

  init() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        this.cells[x + y * this.columns] = new Cell(x, y, this)
      }
    }

    this.processNode(this.cells[0])
    this.cells[0].reveal()
    this.cells[0].revealNeighbours()
  }

  getCell(x: number, y: number) {
    try {
      return this.cells[x + y * this.columns]
    } catch {
      return null
    }
  }

  processNode(current: Cell) {
    // mark the cell as visited
    this.visited.push(current)

    // while the current cell has any unvisited neighbour
    const neighbours = current.getAdjacents()
    while (neighbours.length > 0) {
      // choose one of the unvisited neighbours
      const next = this.selectRandomNeighbour(neighbours)
      if (!this.visited.includes(next)) {
        // remove the walls between the current and the chosen cell
        this.connectCells(current, next)

        // invoke the routine recursively for the chosen cell
        this.processNode(next)
      }
    }
  }

  connectCells(cellA: Cell, cellB: Cell) {
    let direction = this.getDirection(cellA, cellB)
    cellA.neighbours[direction] = cellB
    direction = this.getInverseDirection(direction)
    cellB.neighbours[direction] = cellA
  }

  getDirection(start: Cell, end: Cell): Direction {
    if (start.x > end.x) return 'left'
    if (start.x < end.x) return 'right'
    if (start.y > end.y) return 'up'
    return 'down'
  }

  getInverseDirection(direction: Direction): Direction {
    switch (direction) {
      case 'up':
        return 'down'
      case 'down':
        return 'up'
      case 'left':
        return 'right'
      case 'right':
        return 'left'
    }
  }

  selectRandomNeighbour(neighbours: Cell[]) {
    const roll = getRandomInt(0, neighbours.length)

    const neighbour = neighbours[roll]
    neighbours = neighbours.splice(roll, 1)
    return neighbour
  }
}

export { Maze }
