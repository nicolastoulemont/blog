import React, { useState } from 'react'
import type { TocProps } from './types'
import { spacing, fontSize } from './utils'
import { motion } from 'framer-motion'
import NextLink from 'next/link'
import { FiMenu } from 'react-icons/fi'
import {
  chakra,
  useColorModeValue,
  Link,
  Text,
  UnorderedList,
  ListItem,
  Box,
  useMultiStyleConfig,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
const MotionBox = chakra(motion.div)

export function TocMobile({ elements, activeColor }: TocProps) {
  const [showNav, setShowNav] = useState(false)
  const titleColor = useColorModeValue('gray.600', 'white')
  const linkColor = useColorModeValue('gray.700', 'white')
  const {
    container: { bg, color },
  } = useMultiStyleConfig('Tag', { colorScheme: activeColor })

  if (!showNav) {
    return (
      <IconButton
        colorScheme={activeColor}
        icon={<FiMenu />}
        aria-label='Page navigation'
        pos='fixed'
        bottom={70}
        right='15px'
        display={{ base: 'flex', lg: 'none' }}
        rounded='3xl'
        onC
      />
    )
  }

  return (
    <MotionBox
      as='aside'
      pos='fixed'
      top={70}
      right={0}
      maxWidth='290px'
      display={{ base: 'flex', lg: 'none' }}
      flexDir='column'
      p={6}
      borderRadius={8}
    >
      <Text color={titleColor} fontSize='md' fontWeight='bold' style={{ textTransform: 'uppercase' }} mb={4}>
        On this page
      </Text>
      <Box as='nav'>
        <UnorderedList listStyleType='none' ml={0} spacing='2'>
          {elements.map((header, index) => (
            <ListItem key={header.id} ml={spacing[header.type]} display='flex'>
              <NextLink href={`#${header.id}`}>
                <Link
                  as='a'
                  fontSize={fontSize[header.type]}
                  fontWeight='medium'
                  color={linkColor}
                  borderRadius='md'
                  p={2}
                  width='100%'
                  transition='background-color 0.2s ease-in-out'
                  _hover={{
                    bgColor: bg,
                    color,
                  }}
                >
                  {index === 0 ? 'Intro' : header.content}
                </Link>
              </NextLink>
            </ListItem>
          ))}
        </UnorderedList>
      </Box>
    </MotionBox>
  )
}
