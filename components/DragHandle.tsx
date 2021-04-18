import React from 'react'
import { motion } from 'framer-motion'

interface DragHandleProps {
	pointDownwards?: boolean
	strokeColor?: string
	fillColor?: string
}

export function DragHandle({
	pointDownwards = false,
	strokeColor = '#805AD5',
	fillColor = '#4299E1'
}: DragHandleProps) {
	return (
		<motion.svg
			width='51'
			height='17'
			viewBox='0 0 51 17'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={{ rotate: pointDownwards ? '180deg' : '0deg' }}
		>
			<g id='DragUp-small'>
				<path
					id='Polygon 1'
					d='M25.5043 0.505527L31.1499 4.41694C31.2506 4.48671 31.2013 4.64469 31.0787 4.64469H19.7875C19.6649 4.64469 19.6156 4.48671 19.7163 4.41694L25.3619 0.505527C25.4047 0.475859 25.4615 0.475859 25.5043 0.505527Z'
					fill={fillColor}
					stroke={strokeColor}
					strokeWidth='0.75'
				/>
				<rect
					id='horizontal-top'
					y='7.09448'
					width='50.1968'
					height='0.669291'
					rx='0.334646'
					fill={strokeColor}
				/>
				<rect
					id='horizontal-bottom'
					y='16.3307'
					width='50.1968'
					height='0.669291'
					rx='0.334646'
					fill={strokeColor}
				/>
				<rect
					id='middle-1'
					x='1.53937'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 1.53937 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-2'
					x='4.48425'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 4.48425 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-3'
					x='7.42914'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 7.42914 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-4'
					x='10.374'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 10.374 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-5'
					x='13.3189'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 13.3189 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-6'
					x='16.2638'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 16.2638 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-7'
					x='19.2087'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 19.2087 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-8'
					x='22.1536'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 22.1536 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-9'
					x='25.0984'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 25.0984 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-10'
					x='28.0433'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 28.0433 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-11'
					x='30.9882'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 30.9882 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-12'
					x='33.933'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 33.933 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-13'
					x='36.8779'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 36.8779 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-14'
					x='39.8228'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 39.8228 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-15'
					x='42.7677'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 42.7677 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-16'
					x='45.7126'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 45.7126 13.3858)'
					fill={strokeColor}
				/>
				<rect
					id='middle-17'
					x='48.6575'
					y='13.3858'
					width='3.34646'
					height='0.669291'
					rx='0.334646'
					transform='rotate(-90 48.6575 13.3858)'
					fill={strokeColor}
				/>
			</g>
		</motion.svg>
	)
}
