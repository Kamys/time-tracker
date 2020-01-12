import * as React from 'react'
import { useEffect, useState } from 'react'

import PageGroups from 'renderer/groups/page'
import PageActivity from 'renderer/activity/page'
import PageStatistics from 'renderer/statistics/page'
import Tabs from 'renderer/components/Tabs'
import FormGroupModal from 'renderer/groups/modals/FormGroup'
import { GlobalAction } from 'renderer/store/globalActions'
import { TypeTabs } from './constants'

const Application = () => {
  const [activeTabs, setActiveTabs] = useState<TypeTabs>(TypeTabs.Activities)

  useEffect(() => {
    GlobalAction.electron.loadingStore.REQUEST()
  }, [])

  const onSelectTab = (tab: TypeTabs) => () => {
    setActiveTabs(tab)
  }

  const tabs = [TypeTabs.Activities, TypeTabs.Groups, TypeTabs.Statistics]

  return (
    <div style={{ margin: 10, marginTop: 0 }}>
      <Tabs tabs={tabs} activeTabs={activeTabs} onSelectTab={onSelectTab} />
      {activeTabs === TypeTabs.Activities && <PageActivity />}
      {activeTabs === TypeTabs.Groups && <PageGroups />}
      {activeTabs === TypeTabs.Statistics && <PageStatistics />}
      <FormGroupModal />
    </div>
  )
}

export default Application
