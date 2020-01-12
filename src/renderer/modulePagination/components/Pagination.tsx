import * as React from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { range } from 'lodash'

interface IProps {
  onBack: () => void
  onNext: () => void
  onSelectPage: (pageIndex: number) => void
  countPage: number
  currentPage: number
}

const Pagination = (props: IProps) => {
  const { onBack, onNext, onSelectPage, countPage, currentPage } = props

  return (
    <Menu floated='right' pagination>
      <Menu.Item as='a' icon onClick={onBack}>
        <Icon name='chevron left' />
      </Menu.Item>
      {range(1, countPage + 1).map(pageIndex => (
        <Menu.Item
          active={pageIndex === currentPage}
          onClick={() => onSelectPage(pageIndex)}
          key={pageIndex}
          as='a'
        >
          {pageIndex}
        </Menu.Item>
      ))}
      <Menu.Item as='a' icon onClick={onNext}>
        <Icon name='chevron right' />
      </Menu.Item>
    </Menu>
  )
}

export default Pagination
