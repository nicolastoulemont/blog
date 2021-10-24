import React, { ReactNode } from 'react'
import { Flex, Icon, useMultiStyleConfig, TagProps } from '@chakra-ui/react'
import * as FiIcons from 'react-icons/fi'

const useVariants = (activeColorScheme: TagProps['colorScheme']) => {
	const {
		container: { bg, color }
	} = useMultiStyleConfig('Tag', { colorScheme: activeColorScheme })
	return {
		bg,
		color
	}
}

interface CalloutProps {
	children: ReactNode
	icon?: keyof typeof FiIcons
	variant?: TagProps['colorScheme']
}

export function Callout({ children, variant = 'blue', icon }: CalloutProps) {
	const { bg, color } = useVariants(variant)

	const iconComponent = FiIcons[icon as any]

	return (
		<Flex
			// @ts-expect-error
			bgColor={bg}
			// @ts-expect-error
			color={color}
			p={{ base: 3, sm: 6 }}
			borderRadius='xl'
			my={3}
			flexDir={{ base: 'column', sm: 'row' }}
			alignItems={{ base: 'center', sm: 'flex-start' }}
			justifyContent={{ base: 'center', sm: 'flex-start' }}
			textAlign={{ base: 'center', sm: 'left' }}
		>
			{iconComponent && (
				<Icon
					mr={{ base: 0, sm: 3 }}
					mb={{ base: 3, sm: 0 }}
					mt={{ base: 0, sm: 1 }}
					w={6}
					h={6}
					// @ts-expect-error
					color={color}
					as={iconComponent}
				/>
			)}

			{children}
		</Flex>
	)
}
