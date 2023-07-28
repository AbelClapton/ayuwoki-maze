import type { Maze } from '@/libraries/Maze'
import type { Position, Direction } from '@/types'
import { onKeyStroke } from '@vueuse/core'
import { ref, type Ref } from 'vue'

const usePlayer = (start: Position, maze: Ref<Maze>) => {
  const player = ref(start)

  const canMove = (direction: string) => {
    const cell = maze.value.getCell(player.value.x, player.value.y)
    return !!cell?.neighbours[direction]
  }

  const move = (direction: string) => {
    if (!canMove(direction)) return

    if (direction === 'up') player.value.y -= 1
    if (direction === 'down') player.value.y += 1
    if (direction === 'left') player.value.x -= 1
    if (direction === 'right') player.value.x += 1

    maze.value.getCell(player.value.x, player.value.y)?.revealNeighbours()
  }

  const inputs = {
    up: ['w', 'W', 'ArrowUp'],
    down: ['s', 'S', 'ArrowDown'],
    left: ['a', 'A', 'ArrowLeft'],
    right: ['d', 'D', 'ArrowRight']
  }

  for (const [action, input] of Object.entries(inputs)) {
    onKeyStroke(input, () => {
      move(action)
    })
  }

  return { player }
}

export { usePlayer }
