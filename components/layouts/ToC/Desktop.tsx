import React, { useMemo } from 'react'
import { useTocHighlight } from 'utils/useTocHightlight'
import { Text, UnorderedList, Box, useColorModeValue } from '@chakra-ui/react'
import { MotionBox } from './utils'
import type { TocProps } from './types'
import { TocLink } from './Link'

export function TocDesktop({ elements = [], activeColor }: TocProps) {
  const elementIds = useMemo(() => elements.map((element) => element.id), [elements])
  const titleColor = useColorModeValue('gray.600', 'white')
  const { currentActiveIndex } = useTocHighlight({ elementIds })

  return (
    <MotionBox
      as='aside'
      pos='fixed'
      top={70}
      right={0}
      maxWidth={{ lg: '280px', '2xl': '300px' }}
      display={{ base: 'none', lg: 'flex' }}
      flexDir='column'
      p={6}
      pr={{ lg: 3, '2xl': 6 }}
      borderRadius={8}
    >
      <Text color={titleColor} fontSize='md' fontWeight='bold' style={{ textTransform: 'uppercase' }} mb={4}>
        On this page
      </Text>
      <Box as='nav' maxHeight='80vh' overflowY='scroll'>
        <UnorderedList listStyleType='none' ml={0} spacing='2'>
          {elements.map((element, index) => (
            <TocLink
              key={`${element.content}${element.id}${index}`}
              element={element}
              activeColor={activeColor}
              isActive={currentActiveIndex === index}
              isFirst={index === 0}
            />
          ))}
        </UnorderedList>
      </Box>
    </MotionBox>
  )
}
