import { motion } from 'framer-motion'
import { chakra, useMultiStyleConfig } from '@chakra-ui/react'

export const MotionBox = chakra(motion.div)

export const spacing = {
	h1: 0,
	h2: 0,
	h3: 2,
	h4: 4
} as const

export const fontSize = {
	h1: 16,
	h2: 16,
	h3: 14,
	h4: 13
} as const

export const useActiveStyles = (activeColorScheme: string) => {
	const {
		container: { bg, color }
	} = useMultiStyleConfig('Tag', { colorScheme: activeColorScheme })
	return {
		bg,
		color
	}
}
