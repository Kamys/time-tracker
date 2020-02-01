import * as React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import * as lodash from 'lodash'

import { IRootState } from 'common/types/domain'
import TableActivity from 'renderer/components/TableActivity'
import { GlobalAction } from 'renderer/store/globalActions'
import { getActivities } from '../selectors'

import './index.css'
import useInterval from 'renderer/activity/utils'

const mapStateToProps = (state: IRootState) => ({
  activities: getActivities(state),
})

type injectProps = ReturnType<typeof mapStateToProps>

interface IProps extends injectProps {}

const Activity = (props: IProps) => {
  const updateActivity = () => {
    GlobalAction.entries.loading.REQUEST({ entityName: 'activity' })
  }

  useEffect(() => {
    updateActivity()
  }, [])

  const { activities } = props

  return <TableActivity activities={activities} />
}

const areEqual = (prevProps: IProps, nextProps: IProps) =>
  lodash.isEqual(prevProps.activities, nextProps.activities)

export default connect<injectProps, IProps>(
  mapStateToProps,
  null,
)(React.memo(Activity, areEqual))
