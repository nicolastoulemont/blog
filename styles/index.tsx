import {
	Accordion,
	Alert,
	AlertDialog,
	Avatar,
	AvatarGroup,
	Badge,
	Box,
	Breadcrumb,
	Button,
	ButtonGroup,
	Code,
	Checkbox,
	CheckboxGroup,
	CloseButton,
	Collapse,
	ControlBox,
	CircularProgress,
	Divider,
	Drawer,
	Editable,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	FormErrorMessage,
	Grid,
	Heading,
	Icon,
	IconButton,
	Input,
	InputAddon,
	InputGroup,
	Image,
	Kbd,
	Link,
	OrderedList,
	UnorderedList,
	List,
	ListItem,
	Stack,
	SimpleGrid,
	Menu,
	Modal,
	NumberInput,
	Portal,
	Popover,
	Progress,
	Radio,
	RadioGroup,
	Select,
	Skeleton,
	Slider,
	Spinner,
	Stat,
	Switch,
	Tabs,
	Tag,
	Text,
	Textarea,
	Tooltip,
	VisuallyHidden,
	useColorModeValue
} from '@chakra-ui/react'

export const MDXComponents = {
	h1: (props) => (
		<Heading as='h1' my={12} size='2xl' textAlign={{ base: 'center', sm: 'left' }} {...props} />
	),
	h2: (props) => (
		<Heading as='h2' my={8} size='xl' textAlign={{ base: 'center', sm: 'left' }} {...props} />
	),
	h3: (props) => <Heading as='h3' my={6} size='lg' {...props} />,
	h4: (props) => <Heading as='h4' size='md' {...props} />,
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
	li: (props) => <ListItem my={3} {...props} />,
	Accordion,
	Alert,
	AlertDialog,
	Avatar,
	AvatarGroup,
	Badge,
	Box,
	Breadcrumb,
	Button,
	ButtonGroup,
	Code,
	Checkbox,
	CheckboxGroup,
	CloseButton,
	Collapse,
	ControlBox,
	CircularProgress,
	Divider,
	Drawer,
	Editable,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	FormErrorMessage,
	Grid,
	Heading,
	Icon,
	IconButton,
	Input,
	InputAddon,
	InputGroup,
	Kbd,
	Link,
	List,
	Stack,
	SimpleGrid,
	Menu,
	Modal,
	NumberInput,
	Portal,
	Popover,
	Progress,
	Radio,
	RadioGroup,
	Select,
	Skeleton,
	Slider,
	Spinner,
	Stat,
	Switch,
	Tabs,
	Tag,
	Text,
	Textarea,
	Tooltip,
	VisuallyHidden
}
