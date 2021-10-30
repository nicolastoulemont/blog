import React from 'react'
import { chakra } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = chakra(motion.div)

const variants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 }
}

export function PostContainer({ children }) {
	return (
		<MotionBox
			as='article'
			width='100%'
			minHeight='100%'
			maxWidth={{ base: '100%', lg: 'calc(100% - 300px)', '2xl': '1000px' }}
			margin={{ base: '0 auto', lg: '10', '2xl': '0 auto' }}
			pb={8}
			boxSizing='border-box'
			px={{ base: 3, '2xl': 0 }}
			variants={variants}
			initial='hidden'
			animate='visible'
		>
			{children}
		</MotionBox>
	)
}
