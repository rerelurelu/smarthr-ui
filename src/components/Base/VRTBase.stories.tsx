import { StoryFn } from '@storybook/react'
import * as React from 'react'
import styled from 'styled-components'

import { InformationPanel } from '../InformationPanel'

import { Base } from './Base'
import { BaseStory, DialogBaseStory } from './Base.stories'

export default {
  title: 'Data Display（データ表示）/Base',
  component: Base,
  parameters: {
    withTheming: true,
  },
}

export const VRTBaseNarrow: StoryFn = () => (
  <>
    <VRTInformationPanel title="VRT 用の Story です" togglable={false}>
      画面幅が狭い状態で表示されます
    </VRTInformationPanel>
    <BaseStory />
  </>
)
VRTBaseNarrow.parameters = {
  viewport: {
    defaultViewport: 'vrtMobile',
  },
  chromatic: {
    modes: {
      vrtMobile: { viewport: 'vrtMobile' },
    },
  },
}
export const VRTDialogBaseNarrow: StoryFn = () => (
  <>
    <VRTInformationPanel title="VRT 用の Story です" togglable={false}>
      画面幅が狭い状態で表示されます
    </VRTInformationPanel>
    <DialogBaseStory />
  </>
)
VRTDialogBaseNarrow.storyName = 'VRTDialogBaseNarrow（非推奨）'
VRTDialogBaseNarrow.parameters = {
  viewport: {
    defaultViewport: 'vrtMobile',
  },
  chromatic: {
    modes: {
      vrtMobile: { viewport: 'vrtMobile' },
    },
  },
}

export const VRTBaseForcedColors: StoryFn = () => (
  <>
    <VRTInformationPanel title="VRT 用の Story です" togglable={false}>
      Chromatic 上では強制カラーモードで表示されます
    </VRTInformationPanel>
    <BaseStory />
  </>
)
VRTBaseForcedColors.parameters = {
  chromatic: { forcedColors: 'active' },
}

export const VRTDialogBaseForcedColors: StoryFn = () => (
  <>
    <VRTInformationPanel title="VRT 用の Story です" togglable={false}>
      Chromatic 上では強制カラーモードで表示されます
    </VRTInformationPanel>
    <DialogBaseStory />
  </>
)
VRTDialogBaseForcedColors.storyName = 'VRTDialogBaseForcedColors（非推奨）'
VRTDialogBaseForcedColors.parameters = {
  chromatic: { forcedColors: 'active' },
}

const VRTInformationPanel = styled(InformationPanel)`
  margin-bottom: 24px;
`
