import type { ComponentMeta } from '@storybook/react'

import * as Accordion from './Accordion'

const metas: ComponentMeta<typeof Accordion.Root> = {
  title: 'Accordion',
  component: Accordion.Root,
}

export default metas

export const Default = () => {
  return (
    <Accordion.Root className="w-[600px]">
      <Accordion.Header className="text-lg font-medium text-slate-800 dark:text-white">
        Other posts that might interest you
        <Accordion.Icon />
      </Accordion.Header>
      <Accordion.Panel>
        <ul>
          <li className="border-b border-gray-200 p-4">
            <div className="flex w-full items-start justify-between">
              <div className="block space-y-1">
                <h4 className="text-md font-medium text-slate-800 dark:text-white">
                  How to build a Datepicker
                </h4>
                <p className="text-sm text-slate-800 dark:text-white">
                  Building a nice datepicker with animations and gesture support
                </p>
              </div>
              <div className="block h-auto rounded-2xl bg-red-200 px-2 py-1 text-sm text-red-900 hover:bg-red-200 hover:text-red-900 dark:bg-red-200/20 dark:text-red-200 dark:hover:bg-red-200/20 dark:hover:text-red-200">
                React
              </div>
            </div>
          </li>
          <li className="border-b border-gray-200 p-4">
            <div className="flex w-full items-start justify-between">
              <div className="block space-y-1">
                <h4 className="text-md font-medium text-slate-800 dark:text-white">
                  The rise of multiframeworks paradigm in the frontend oss
                </h4>
                <p className="text-sm text-slate-800 dark:text-white">
                  Looking at the rising trend of library developed with support to many UI
                  frameworks.
                </p>
              </div>
              <div className="block h-auto rounded-2xl bg-green-200 px-2 py-1 text-sm text-green-900 hover:bg-green-200 hover:text-green-900 dark:bg-green-200/20 dark:text-green-200 dark:hover:bg-green-200/20 dark:hover:text-green-200">
                General
              </div>
            </div>
          </li>
          <li className="border-b border-gray-200 p-4">
            <div className="flex w-full items-start justify-between">
              <div className="block space-y-1">
                <h4 className="text-md font-medium text-slate-800 dark:text-white">
                  GraphQL Typeguards
                </h4>
                <p className="text-sm text-slate-800 dark:text-white">
                  Exploring a few helpful graphql focus typeguards such as isType,
                  isEither, isNot, isTypeInTuple
                </p>
              </div>
              <div className="block h-auto rounded-2xl bg-pink-200 px-2 py-1 text-sm text-pink-900 hover:bg-pink-200 hover:text-pink-900 dark:bg-pink-200/20 dark:text-pink-200 dark:hover:bg-pink-200/20 dark:hover:text-pink-200">
                GraphQL
              </div>
            </div>
          </li>
        </ul>
      </Accordion.Panel>
    </Accordion.Root>
  )
}
