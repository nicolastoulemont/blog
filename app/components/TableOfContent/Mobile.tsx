import React, { useMemo } from "react"
import { useTableOfContent } from "./useTableOfContent"
import type { TableOfContentProps } from "./types"
import { TocLink } from "./Link"
import { FiMenu } from "react-icons/fi"
import {
  UnorderedList,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react"

export function MobileTableOfContent({ elements, activeColor }: TableOfContentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const elementIds = useMemo(() => elements.map((element) => element.id), [elements])
  const { currentActiveIndex } = useTableOfContent({ elementIds })

  return (
    <>
      <IconButton
        colorScheme={activeColor}
        icon={<FiMenu />}
        aria-label="Page navigation"
        pos="fixed"
        bottom={70}
        right="15px"
        display={{ base: "flex", lg: "none" }}
        rounded="3xl"
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose} placement="bottom">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader mb={3} />
          <DrawerBody as="nav">
            <UnorderedList pb={6} ml={0}>
              {elements.map((element, index) => (
                <TocLink
                  key={`${element.content}${element.id}${index}`}
                  element={element}
                  activeColor={activeColor}
                  isActive={currentActiveIndex === index}
                  isFirst={index === 0}
                  onClose={onClose}
                />
              ))}
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}
