import { Link, ListItem, useColorModeValue } from '@chakra-ui/react'
import { TocLinkProps } from './types'
import { useActiveStyles, spacing, fontSize } from './utils'
import NextLink from 'next/link'

export function TocLink({ element, activeColor, isActive, isFirst, onClose = () => {} }: TocLinkProps) {
  const defaultColor = useColorModeValue('gray.700', 'white')
  const { bg, color } = useActiveStyles(activeColor)

  return (
    <ListItem ml={spacing[element.type]} display='flex'>
      <NextLink href={`#${element.id}`}>
        <Link
          as='a'
          fontSize={fontSize[element.type]}
          fontWeight='medium'
          // @ts-expect-error
          color={isActive ? color : defaultColor}
          // @ts-expect-error
          bgColor={isActive ? bg : undefined}
          borderRadius='md'
          p={2}
          width='100%'
          transition='background-color 0.2s ease-in-out'
          _hover={{ bg, color }}
          onClick={onClose}
        >
          {isFirst ? 'Intro' : element.content}
        </Link>
      </NextLink>
    </ListItem>
  )
}
