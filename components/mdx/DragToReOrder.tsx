/* 
Based on the code sandbox example :
https://codesandbox.io/s/framer-motion-2-drag-to-reorder-fc4rt
*/
import { Box, Heading, Text, Image, chakra, UnorderedList } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useMeasurePosition } from 'utils/useMeasurePosition'
import { findIndex, Position } from 'utils/usePositionReorder'
import move from 'array-move'

const MotionBox = chakra(motion.div)
const MotionListItem = chakra(motion.li)

export interface Todo {
	id: number
	position: number
	complete: boolean
	title: string
	description: string
	userAvatarUrl: string
}

const INITIAL_TODOS: Array<Todo> = [
	{
		id: 0,
		position: 0,
		complete: false,
		title: 'Faire le ménage',
		description: "Même si j'ai pas envie",
		userAvatarUrl: 'https://i.pravatar.cc/150?img=1'
	},
	{
		id: 1,
		position: 1,
		complete: false,
		title: 'Faire à manger',
		description: "J'ai faim",
		userAvatarUrl: 'https://i.pravatar.cc/150?img=2'
	},
	{
		id: 2,
		position: 2,
		complete: false,
		title: 'Aller courir',
		description: 'Sinon je vais grossir',
		userAvatarUrl: 'https://i.pravatar.cc/150?img=3'
	},
	{
		id: 3,
		position: 3,
		complete: false,
		title: 'Lancer une lessive',
		description: 'Pour avoir des affaires propres',
		userAvatarUrl: 'https://i.pravatar.cc/150?img=4'
	}
]

export function DragToReOrder() {
	const [todos, setTodos] = useState<Array<Todo>>(INITIAL_TODOS)

	const positions = useRef<Array<Position>>([]).current
	const setPositions = (i: number, offset: Position) => (positions[i] = offset)

	const moveItem = (i, dragOffset) => {
		const targetIndex = findIndex(i, dragOffset, positions)
		if (targetIndex !== i) setTodos(move(todos, i, targetIndex))
	}

	return (
		<Box
			as='main'
			width={{ base: '100%', md: '75%' }}
			mx='auto'
			boxSizing='border-box'
			p={{ base: 3, md: 6 }}
			my={6}
			borderRadius='10px'
			border='1px solid'
			borderColor='gray.100'
		>
			<UnorderedList
				ml={{ base: 6, md: 'auto' }}
				mr={{ base: 6, md: 'auto' }}
				maxW={{ base: '100%', md: '50%' }}
				listStyleType='none'
				py={3}
			>
				{todos?.map((todo, index) => (
					<TodoItem
						todo={todo}
						key={todo.id}
						index={index}
						setPositions={setPositions}
						moveItem={moveItem}
					/>
				))}
			</UnorderedList>
		</Box>
	)
}

const colorsReg = ['purple.300', 'red.300', 'cyan.300', 'yellow.300']

type TodoItemProps = {
	todo: Todo
	index: number
	setPositions: (i: number, offset: Position) => Position
	moveItem: (i: number, dragOffset: number) => void
}

const onTop = { zIndex: 3 }
const flat = {
	zIndex: 1,
	transition: { delay: 0.3 }
}

function TodoItem({ todo, index, setPositions, moveItem }: TodoItemProps) {
	const [isDragging, setIsDragging] = useState(false)
	const ref = useMeasurePosition((pos) => setPositions(index, pos))

	return (
		<MotionListItem p={0} initial={false} animate={isDragging ? onTop : flat}>
			<MotionBox
				layout
				p={3}
				my={2}
				ref={ref}
				display='flex'
				alignItems='flex-start'
				justifyContent='space-between'
				bgColor={colorsReg[todo.id]}
				borderRadius='10px'
				whileHover={{ scale: 1.03, cursor: 'grab' }}
				whileTap={{ scale: 1.12, cursor: 'grabbing' }}
				drag='y'
				onDragStart={() => setIsDragging(true)}
				onDragEnd={() => setIsDragging(false)}
				onViewportBoxUpdate={(_viewportBox, delta) => {
					console.log(_viewportBox)
					console.log(delta)
					isDragging && moveItem(index, delta.y.translate)
				}}
			>
				<Box>
					<Heading size='sm'>{todo.title}</Heading>
					<Text>{todo.description}</Text>
				</Box>
				<Image
					src={todo.userAvatarUrl}
					fallbackSrc={todo.userAvatarUrl}
					borderRadius='13px'
					width='60px'
				/>
			</MotionBox>
		</MotionListItem>
	)
}
