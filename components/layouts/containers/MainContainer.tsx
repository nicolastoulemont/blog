import React from 'react'
import { chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = chakra(motion.div)

const variants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 }
}

export function MainContainer({ children }) {
	return (
		<MotionBox
			as='main'
			width='100%'
			minHeight='100%'
			maxWidth='1000px'
			margin='0 auto'
			pb={8}
			boxSizing='border-box'
			px={{ base: 3, xl: 0 }}
			variants={variants}
			initial='hidden'
			animate='visible'
		>
			{children}
		</MotionBox>
	)
}
