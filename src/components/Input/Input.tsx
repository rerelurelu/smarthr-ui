import React, {
  ComponentPropsWithRef,
  FocusEvent,
  ReactNode,
  WheelEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react'
import { tv } from 'tailwind-variants'

import { useTheme } from '../../hooks/useTailwindTheme'

type Props = {
  /** input 要素の `type` 値 */
  type?: HTMLInputElement['type']
  /** フォームにエラーがあるかどうか */
  error?: boolean
  /** コンポーネントの幅 */
  width?: number | string
  /** オートフォーカスを行うかどうか */
  autoFocus?: boolean
  /** コンポーネント内の先頭に表示する内容 */
  prefix?: ReactNode
  /** コンポーネント内の末尾に表示する内容 */
  suffix?: ReactNode
  /** 背景色。readOnly を下地の上に載せる場合に使う */
  bgColor?: keyof typeof bgColors
  /**
   * @deprecated placeholder属性は非推奨です。別途ヒント用要素を設置するか、それらの領域を確保出来ない場合はTooltipコンポーネントの利用を検討してください。
   */
  placeholder?: string
}
type ElementProps = Omit<ComponentPropsWithRef<'input'>, keyof Props>

const bgColors = {
  BACKGRUOND: 'background',
  COLUMN: 'column',
  BASE_GREY: 'base-grey',
  OVER_BACKGROUND: 'over-background',
  HEAD: 'head',
  BORDER: 'border',
  ACTION_BACKGROUND: 'action-background',
} as const

const wrapper = tv({
  base: [
    'smarthr-ui-Input',
    'shr-box-border shr-inline-flex shr-cursor-text shr-items-center shr-gap-0.5 shr-rounded-m shr-border shr-border-solid shr-border-default shr-bg-white shr-px-0.5',
    'contrast-more:shr-border-high-contrast',
    'focus-within:shr-focus-indicator',
  ],
  variants: {
    disabled: {
      true: 'shr-pointer-events-none shr-bg-white-darken [&&&]:shr-border-default/50',
    },
    error: {
      true: '[&]:shr-border-danger',
    },
    readOnly: {
      true: '[&&&]:shr-border-[theme(backgroundColor.background)] [&&&]:shr-bg-background',
    },
  },
})
const inner = tv({
  slots: {
    input: [
      'smarthr-ui-Input-input',
      'shr-inline-block shr-w-full shr-grow shr-border-none shr-bg-transparent shr-py-0.75 shr-text-base shr-leading-none shr-text-black shr-outline-none shr-outline-0',
      'placeholder:shr-text-grey',
      'disabled:shr-text-disabled disabled:shr-opacity-100',
      'shr-h-[theme(fontSize.base)]',
    ],
    affix: 'shr-flex shr-shrink-0 shr-items-center shr-text-grey',
  },
})

export const Input = forwardRef<HTMLInputElement, Props & ElementProps>(
  (
    {
      onFocus,
      onBlur,
      autoFocus,
      prefix,
      suffix,
      className,
      width,
      disabled,
      error,
      readOnly,
      bgColor,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLInputElement>(null)

    useImperativeHandle<HTMLInputElement | null, HTMLInputElement | null>(
      ref,
      () => innerRef.current,
    )

    const handleFocus = useMemo(() => {
      if (!onFocus) {
        return undefined
      }

      return (e: FocusEvent<HTMLInputElement>) => onFocus(e)
    }, [onFocus])

    const handleBlur = useMemo(() => {
      if (!onBlur) {
        return undefined
      }

      return (e: FocusEvent<HTMLInputElement>) => onBlur(e)
    }, [onBlur])

    const handleWheel = useMemo(
      () => (props.type === 'number' ? disableWheel : undefined),
      [props.type],
    )

    useEffect(() => {
      if (autoFocus && innerRef.current) {
        innerRef.current.focus()
      }
    }, [autoFocus])

    const { backgroundColor } = useTheme()

    const wrapperStyleProps = useMemo(() => {
      const wrapperStyle = wrapper({ disabled, error, readOnly, className })
      const color = bgColor
        ? backgroundColor[bgColors[bgColor] as keyof typeof backgroundColor]
        : undefined
      return {
        className: wrapperStyle,
        style: {
          borderColor: color,
          backgroundColor: color,
          width: typeof width === 'number' ? `${width}px` : width,
        },
      }
    }, [backgroundColor, bgColor, className, disabled, error, readOnly, width])
    const { input, affix } = inner()

    return (
      <span {...wrapperStyleProps} onClick={() => innerRef.current?.focus()} role="presentation">
        {prefix && (
          <span className={affix({ className: 'smarthr-ui-Input-prefix' })}>{prefix}</span>
        )}
        {/* eslint-disable-next-line smarthr/a11y-input-has-name-attribute */}
        <input
          {...props}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onWheel={handleWheel}
          disabled={disabled}
          readOnly={readOnly}
          ref={innerRef}
          aria-invalid={error || undefined}
          className={input()}
        />
        {suffix && (
          <span className={affix({ className: 'smarthr-ui-Input-suffix' })}>{suffix}</span>
        )}
      </span>
    )
  },
)

const disableWheel = (e: WheelEvent) => {
  // wheel イベントに preventDefault はないため
  e.target && (e.target as HTMLInputElement).blur()
}
