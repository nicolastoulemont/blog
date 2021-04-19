import React, { useState, useRef, useEffect } from 'react'
import faker from 'faker'
import { Flex, Image, Heading, Text, Box, Button, chakra } from '@chakra-ui/react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useIntersection, useEvent } from 'react-use'
import { throttle } from 'throttle-debounce'
import { FiMap } from 'react-icons/fi'

const MotionBox = chakra(motion.div)

export const isServer = typeof window === 'undefined'

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
}

export function getPercentage(num: number, per: number) {
	return (num / 100) * per
}

const RANDOM_HOTEL_DESCRIPTIONS = [
	'Room in boutique hotel...',
	'Private Room in old town',
	'Private Room in down town',
	'Private Room in new town',
	'Hotel Room'
]

faker.seed(10)
const data = [...Array(30)].map(() => ({
	id: faker.datatype.uuid(),
	image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
		'women',
		'men'
	])}/${faker.datatype.number(60)}.jpg`,
	name: faker.name.findName(),
	rating: Number(Math.random() * 5).toFixed(2),
	numberOfRatings: getRandomIntInclusive(10, 80),
	city: faker.address.city(1),
	longitude: Number(faker.address.longitude(2.32, 2.37)),
	latitude: Number(faker.address.latitude(48.84, 48.89)),
	description: RANDOM_HOTEL_DESCRIPTIONS[getRandomIntInclusive(0, 4)],
	price: getRandomIntInclusive(60, 150)
}))

export function AirbnbMobile() {
	const [currentFocusId, setCurrentFocusId] = useState('')
	const [showMapShortCut, setShowMapShortCut] = useState(false)
	const [preventIntersectionEffect, setPreventIntersectionEffect] = useState(false)
	const [viewport, setViewport] = useState({
		latitude: 48.86,
		longitude: 2.3413,
		width: '100%',
		height: '812px',
		zoom: 12
	})
	const containerRef = useRef<HTMLDivElement>(null)
	const verticalContainerRef = useRef<HTMLDivElement>(null)
	const scrollRef = useRef<HTMLUListElement>(null)
	const hasInteracted = useRef<boolean>(false)

	const CONTAINER_WIDTH = containerRef.current
		? containerRef.current.getBoundingClientRect().width
		: undefined

	const CONTAINER_HEIGHT = containerRef.current
		? containerRef.current.getBoundingClientRect().height
		: undefined
	const MAX_BOTTOM_HEIGHT = 76
	const INITIAL_HEIGHT = containerRef.current ? getPercentage(CONTAINER_HEIGHT, 50) : undefined
	const EIGHTY_FIVE_PERCENT_BREAKPOINT = containerRef.current
		? getPercentage(CONTAINER_HEIGHT, 85)
		: undefined
	const TWENTY_FIVE_PERCENT_BREAKPOINT = containerRef.current
		? getPercentage(CONTAINER_HEIGHT, 25)
		: undefined

	function handleTransformY(y: number) {
		const CURRENT_HEIGHT = INITIAL_HEIGHT - y
		// Under 30% height breakpoint -> snap to bottom
		if (CURRENT_HEIGHT < TWENTY_FIVE_PERCENT_BREAKPOINT) {
			showMapShortCut && setShowMapShortCut(false)
			return `${MAX_BOTTOM_HEIGHT}px`
		}
		// Over 85% height breakpoint -> snap to top
		if (CURRENT_HEIGHT > EIGHTY_FIVE_PERCENT_BREAKPOINT) {
			return `${CONTAINER_HEIGHT}px`
		}
		// Else drag freely
		showMapShortCut && setShowMapShortCut(false)
		return `${CURRENT_HEIGHT}px`
	}

	// Handle drag actions
	const y = useMotionValue(0)
	const height = useTransform(y, handleTransformY)
	const [startOffset, setStartOffset] = React.useState(0)
	const heightAsNumber = Number(height.get().replace('px', ''))
	const isOpen = height.get() !== `${MAX_BOTTOM_HEIGHT}px`
	const isProfilesContainerFullSize = heightAsNumber >= CONTAINER_HEIGHT

	let prevScrollVal = useRef(
		containerRef && containerRef.current ? containerRef.current.scrollTop : 0
	).current

	function handleVerticalContainerScroll() {
		const st =
			(containerRef && containerRef.current && containerRef.current.scrollTop) ||
			this.scrollTop
		const isScrollingDown = st > prevScrollVal

		if (isScrollingDown) {
			!showMapShortCut && setShowMapShortCut(true)
			if (!isProfilesContainerFullSize) {
				const DIFF_BETWEEN_CURRENT_AND_TOP_HEIGHT = CONTAINER_HEIGHT - heightAsNumber
				y.set(-DIFF_BETWEEN_CURRENT_AND_TOP_HEIGHT)
			}
		}
		prevScrollVal = st <= 0 ? 0 : st
	}

	// useEvent(
	// 	'scroll',
	// 	throttle(500, true, handleVerticalContainerScroll),
	// 	document.getElementById('verticalContainer')
	// )
	// useEvent(
	// 	'mousewheel',
	// 	throttle(500, true, handleVerticalContainerScroll),
	// 	document.getElementById('verticalContainer')
	// )
	// useEvent(
	// 	'wheel',
	// 	throttle(500, true, handleVerticalContainerScroll),
	// 	document.getElementById('verticalContainer')
	// )
	// useEvent(
	// 	'touchstart',
	// 	throttle(500, true, handleVerticalContainerScroll),
	// 	document.getElementById('verticalContainer')
	// )

	function handleShowMapFromProfilesList() {
		// Reset scroll so that the next time verticalContainer is open,
		// the scroll position is correctly set to the top
		verticalContainerRef.current.scrollTop = 0
		setShowMapShortCut(false)
		// This will trigger the verticalContainer to snap to the bottom in the handleTransform fn
		y.set(CONTAINER_HEIGHT)
	}

	function handleGetElementIntoView(elementId) {
		// Prevent items between the current item in focus and the target to be shown as in focus
		// due to being visible during the scrolling effect
		setPreventIntersectionEffect(true)

		// If vertical container open, we force it to the bottom
		// This will trigger the verticalContainer to snap to the bottom in the handleTransform fn
		isOpen && y.set(CONTAINER_HEIGHT)

		// Update focusId and scroll to element
		setCurrentFocusId(elementId)
		document.getElementById(elementId).scrollIntoView()
	}

	// Horizontal scroll debounce fn to reset the preventInterSectionEffect state after the scroll end
	const setPreventIntersectionEffectToFalseRef = useRef(null)
	function resetScrollEffectAfterHorizontalScrolling() {
		// Init debounce
		if (!setPreventIntersectionEffectToFalseRef.current) {
			setPreventIntersectionEffectToFalseRef.current = window.setTimeout(
				() => preventIntersectionEffect && setPreventIntersectionEffect(false),
				50
			)
		}
		// Clear previous timeout
		window && window.clearTimeout(setPreventIntersectionEffectToFalseRef.current)
		// Add new one
		setPreventIntersectionEffectToFalseRef.current = window.setTimeout(
			() => preventIntersectionEffect && setPreventIntersectionEffect(false),
			50
		)
	}

	return (
		<>
			<style>
				{`.marker-focus {
                    z-index:1;
                 }`}
			</style>
			<Box
				height='812px'
				width='100%'
				borderRadius='25px'
				ref={containerRef}
				overflowX='hidden'
				boxSizing='border-box'
				pos='relative'
			>
				<Box width='100%' height='100%' zIndex={1}>
					<ReactMapGL
						{...viewport}
						mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}
						onViewportChange={(vp) => setViewport(vp)}
						mapStyle='mapbox://styles/mapbox/streets-v9'
					>
						{data.map((item) => (
							<Marker
								key={item.id}
								latitude={item.latitude}
								longitude={item.longitude}
								className={item.id === currentFocusId ? 'marker-focus' : ''}
							>
								<Button
									width='50px'
									height='35px'
									display='flex'
									alignItems='center'
									justifyContent='center'
									borderRadius='15px'
									bg={item.id === currentFocusId ? 'black' : 'white'}
									color={item.id === currentFocusId ? 'white' : 'black'}
									boxShadow='rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.18) 0px 1px 2px;'
									transition='all .2s ease-in-out'
									transform='translate(-50%, -50%)'
									role='group'
									onClick={() => handleGetElementIntoView(item.id)}
									_hover={{}}
								>
									{item.price} €
								</Button>
							</Marker>
						))}
					</ReactMapGL>
				</Box>

				<motion.ul
					id='horizontalContainer'
					ref={scrollRef}
					style={{
						overflowX: 'auto',
						display: 'flex',
						alignItems: 'flex-start',
						flexWrap: 'nowrap',
						position: 'absolute',
						left: '0',
						bottom: '0',
						width: '100%',
						height: '230px',
						zIndex: 3,
						WebkitOverflowScrolling: 'touch',
						scrollSnapType: 'x mandatory',
						overscrollBehaviorX: 'contain',
						scrollSnapAlign: 'center',
						boxSizing: 'unset'
					}}
					onScroll={resetScrollEffectAfterHorizontalScrolling}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, scrollBehavior: 'smooth' }}
				>
					<Box flex='0 0 5%' />
					{data.map((profile, index) => (
						<motion.li
							key={index}
							id={profile.id}
							style={{
								width: getPercentage(CONTAINER_WIDTH, 90),
								height: '230px',
								display: 'flex',
								alignItems: 'flex-start',
								justifyContent: 'center',
								flex: '0 0 auto',
								padding: '16px 8px',
								scrollSnapAlign: 'center',
								scrollSnapStop: 'always',
								borderRadius: '25px'
							}}
						>
							<ProfileCardMobileHorizontal
								profile={profile}
								currentFocusId={currentFocusId}
								setCurrentFocusId={setCurrentFocusId}
								preventIntersectionEffect={preventIntersectionEffect}
							/>
						</motion.li>
					))}
				</motion.ul>
				<MotionBox
					id='verticalContainer'
					ref={verticalContainerRef}
					pos='absolute'
					display='flex'
					flexDir='column'
					alignItems='center'
					justifyContent='flex-start'
					bottom='0'
					left='0'
					w='100%'
					overflowY='scroll'
					bg='white'
					pt={3}
					px={6}
					zIndex={3}
					boxShadow='rgba(0, 0, 0, 0.12) 0px -6px 16px'
					borderTopLeftRadius='25px'
					borderTopRightRadius='25px'
					tabIndex={0}
					role='button'
					_hover={{ cursor: 'grab' }}
					whileTap={{ cursor: 'grabbing' }}
					aria-describedby='Profile list'
					// drag='y'
					// onDrag={(_, info) => {
					// 	if (!hasInteracted.current) {
					// 		hasInteracted.current = true
					// 	}

					// 	y.set(startOffset + info.offset.y)
					// }}
					// onDragEnd={(_, info) => setStartOffset(startOffset + info.offset.y)}
					// dragConstraints={{ bottom: 0, top: 0 }}
					// dragElastic={false}
					// dragMomentum={false}
					style={{ height, transition: 'height 0.1s ease-in-out' }}
				>
					<MotionBox
						width='100%'
						display='flex'
						alignItems='center'
						justifyContent='center'
						flexDir='column'
						_hover={{ cursor: 'drag' }}
						mb={9}
						role='button'
						whileTap={{ cursor: 'grabbing' }}
						aria-describedby='Profile list'
						drag='y'
						onDrag={(_, info) => {
							if (!hasInteracted.current) {
								hasInteracted.current = true
							}

							y.set(startOffset + info.offset.y)
						}}
						onDragEnd={(_, info) => setStartOffset(startOffset + info.offset.y)}
						dragConstraints={{ bottom: 0, top: 0 }}
						dragElastic={false}
						dragMomentum={false}
					>
						<Box height='5px' width='50px' bgColor='gray.400' borderRadius='9999px' />
						<Flex width='100%' align='center' justify='space-between'>
							<Heading as='h3' size='sm' color='blackAlpha.800'>
								More than {data.length} results
							</Heading>
						</Flex>
					</MotionBox>

					{data.map((profile) => (
						<ProfileCardVertical key={`${profile.id}-vertical`} profile={profile} />
					))}
				</MotionBox>
				{showMapShortCut ? (
					<Flex
						display='flex'
						pos='absolute'
						bottom='30px'
						left='0'
						align='center'
						justify='center'
						width='100%'
						zIndex={4}
					>
						<Button
							leftIcon={<FiMap />}
							display='flex'
							backgroundColor='#2F3437'
							color='white'
							borderRadius='20px'
							fontWeight='normal'
							boxShadow='1px 2px 18px rgba(0,0,0,.1)'
							onClick={handleShowMapFromProfilesList}
							_hover={{}}
						>
							Map
						</Button>
					</Flex>
				) : null}
			</Box>
		</>
	)
}

export function ProfileCardVertical({ profile }) {
	return (
		<Box
			width='100%'
			height='auto'
			borderRadius='25px'
			bg='white'
			display='block'
			color='blackAlpha.800'
			my={3}
		>
			<Image
				src={profile.image}
				fallbackSrc={profile.image}
				borderRadius='25px'
				height='200px'
				width='100%'
				objectFit='cover'
				alt={`${profile.name} profile image'`}
			/>
			<Box width='100%' p={3}>
				<Flex
					fontSize='0.75rem'
					fontWeight={600}
					width='100%'
					align='center'
					justify='flex-start'
				>
					<Image
						src='/img/star.svg'
						fallbackSrc='/img/star.svg'
						width='14px'
						height='14px'
						mr={1}
						alt='ratings stars'
					/>
					{profile.rating}{' '}
					<Text ml={1} fontWeight={400} color='gray.500'>
						({profile.numberOfRatings})
					</Text>
				</Flex>

				<Heading size='md' fontWeight='500' my={1}>
					{profile.name}
				</Heading>

				<Text fontSize='0.9rem' color='gray.700'>
					{profile.description}
				</Text>
			</Box>
		</Box>
	)
}

export function ProfileCardMobileHorizontal({
	profile,
	currentFocusId,
	setCurrentFocusId,
	preventIntersectionEffect
}) {
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		root: null,
		rootMargin: '0px',
		threshold: 1
	})

	useEffect(() => {
		const isVisible = intersection && intersection.intersectionRatio === 1
		if (!preventIntersectionEffect && isVisible && currentFocusId !== profile.id) {
			setCurrentFocusId(profile.id)
		}
	}, [intersection, preventIntersectionEffect, profile, currentFocusId])

	return (
		<Box
			ref={intersectionRef}
			width='100%'
			height='120px'
			borderRadius='25px'
			bg='white'
			boxShadow='rgba(0, 0, 0, 0.3) 0px 6px 16px'
			display='flex'
			alignItems='center'
			justifyContent='flex-start'
			color='blackAlpha.800'
		>
			<Image
				src={profile.image}
				fallbackSrc={profile.image}
				borderTopLeftRadius='25px'
				borderBottomLeftRadius='25px'
				height='100%'
				width='auto'
				objectFit='cover'
				alt={`${profile.name} profile image'`}
			/>
			<Box
				flex='1'
				height='100%'
				borderTopRightRadius='25px'
				borderBottomRightRadius='25px'
				display='flex'
				flexDir='column'
				alignItems='flex-start'
				justifyContent='space-evenly'
				p={3}
			>
				<Flex
					fontSize='0.75rem'
					fontWeight={600}
					width='100%'
					align='center'
					justify='flex-start'
				>
					<Image
						src='/img/star.svg'
						fallbackSrc='/img/star.svg'
						width='14px'
						height='14px'
						mr={1}
						alt='ratings stars'
					/>
					{profile.rating}{' '}
					<Text ml={1} fontWeight={400} color='gray.500'>
						({profile.numberOfRatings})
					</Text>
				</Flex>

				<Heading size='md' fontWeight='500'>
					{profile.name}
				</Heading>

				<Text fontSize='0.9rem' color='gray.700'>
					{profile.description}
				</Text>
			</Box>
		</Box>
	)
}
