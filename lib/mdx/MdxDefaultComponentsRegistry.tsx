import { PostIntro } from 'components'
import { generateHeadingId } from 'utils/headingId'
import {
	Heading,
	Image,
	Link,
	OrderedList,
	UnorderedList,
	ListItem,
	Text,
	useColorModeValue
} from '@chakra-ui/react'

export const mdxDefaultComponentsRegistry = {
	PostIntro,
	h1: (props) => (
		<Heading id={generateHeadingId(props.children)} as='h1' my={12} size='2xl' {...props} />
	),
	h2: (props) => (
		<Heading id={generateHeadingId(props.children)} as='h2' my={8} size='xl' {...props} />
	),
	h3: (props) => (
		<Heading id={generateHeadingId(props.children)} as='h3' my={6} size='lg' {...props} />
	),
	h4: (props) => <Heading id={generateHeadingId(props.children)} as='h4' size='md' {...props} />,
	p: (props) => <Text as='p' my={{ base: 6, md: 3 }} {...props} />,
	a: (props) => {
		const color = useColorModeValue('blue.500', 'cyan.400')
		return (
			<Link
				as='a'
				color={color}
				fontWeight={600}
				textDecoration='underline'
				{...props}
				isExternal={true}
			/>
		)
	},
	img: (props) => (
		<Image
			rounded='md'
			margin='0 auto'
			my={3}
			{...props}
			src={props.src}
			fallbackSrc={props.src}
		/>
	),
	ol: (props) => (
		<OrderedList px={2} {...props}>
			{props.children}
		</OrderedList>
	),
	ul: (props) => (
		<UnorderedList px={2} {...props}>
			{props.children}
		</UnorderedList>
	),
	li: (props) => <ListItem my={3} {...props} />
}
