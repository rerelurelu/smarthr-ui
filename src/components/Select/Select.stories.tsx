import { action } from '@storybook/addon-actions'
import { StoryFn } from '@storybook/react'
import React from 'react'
import styled from 'styled-components'

import { Stack } from '../Layout'

import { Select } from './Select'

export default {
  title: 'Forms（フォーム）/Select',
  component: Select,
}

const options = [
  { label: '高齢任意加入被保険者', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: '評価業務担当者', value: 'banana' },
  { label: '書類に記載する従業員・扶養家族', value: 'melon', disabled: true },
]

export const All: StoryFn = () => (
  <ListStack>
    <li>
      <TextStack>
        <span>標準</span>
        <Select name="default" options={options} />
      </TextStack>
    </li>
    <li>
      <TextStack>
        <span>サイズ小</span>
        <Select name="s" options={options} size="s" />
      </TextStack>
    </li>
    <li>
      <TextStack>
        <span>value 指定</span>
        <Select name="value" value="orange" options={options} />
      </TextStack>
    </li>
    <li>
      <TextStack>
        <span>エラー状態</span>
        <Select name="error" error options={options} />
      </TextStack>
    </li>
    <li>
      <TextStack>
        <span>disabled 状態</span>
        <Select name="disabled" disabled options={options} />
      </TextStack>
    </li>
    <li>
      <TextStack>
        <span>選択肢グループ要素の使用</span>
        <Select
          name="group"
          value="orange"
          options={[
            { label: 'Select fruit', value: '' },
            { label: 'Apple', value: 'apple' },
            {
              label: 'citrus',
              options: [
                { label: 'Orange', value: 'orange' },
                { label: 'Lemon', value: 'lemon' },
                { label: 'Grapefruit', value: 'grapefruit' },
              ],
            },
            { label: 'Banana', value: 'banana' },
            {
              label: 'Fruit vegetables',
              disabled: true,
              options: [
                { label: 'Strawberry', value: 'strawberry' },
                { label: 'Melon', value: 'melon' },
                { label: 'Water melon', value: 'water melon' },
              ],
            },
          ]}
        />
      </TextStack>
    </li>
    <li style={{ alignSelf: 'stretch' }}>
      <TextStack>
        <span>幅指定</span>
        <Select name="width" width="100%" options={options} />
      </TextStack>
    </li>
    <li>
      <TextStack>
        <span>空の選択肢を表示</span>
        <Select name="hasBlank" hasBlank options={options} />
      </TextStack>
    </li>
    <li>
      <TextStack>
        <span>空の選択肢を表示(文言も変更)</span>
        <Select
          name="hasBlank"
          hasBlank
          decorators={{ blankLabel: (txt) => `select.(${txt})` }}
          options={options}
        />
      </TextStack>
    </li>
    <li>
      <TextStack>
        <span>onChange</span>
        <Select
          name="onChange"
          onChange={action('onChange!!')}
          onChangeValue={action('onChangeValue')}
          options={[
            { label: 'apple', value: 'apple' },
            { label: 'orange', value: 'orange' },
            { label: 'banana', value: 'banana' },
            {
              label: 'Fruit vegetables',
              options: [
                { label: 'Strawberry', value: 'strawberry' },
                { label: 'Melon', value: 'melon' },
                { label: 'Water melon', value: 'water melon' },
              ],
            },
          ]}
        />
      </TextStack>
    </li>
  </ListStack>
)
All.storyName = 'all'

const ListStack = styled(Stack).attrs({ forwardedAs: 'ul', align: 'flex-start' })`
  list-style: none;
  padding: 0 24px;
`
const TextStack = styled(Stack).attrs({ forwardedAs: 'label', gap: 0.5 })``
