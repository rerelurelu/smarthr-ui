import React, {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ForwardedRef,
  ReactNode,
  useMemo,
} from 'react'
import { tv } from 'tailwind-variants'

import { Variant } from './types'

type BaseProps = {
  size: 'default' | 's'
  square: boolean
  wide: boolean
  variant: Variant
  $loading?: boolean
  className: string
  children: ReactNode
}

type ButtonProps = BaseProps & {
  isAnchor?: never
  buttonRef?: ForwardedRef<HTMLButtonElement>
}
type AnchorProps = BaseProps & {
  isAnchor: true
  anchorRef?: ForwardedRef<HTMLAnchorElement>
}
type Props =
  | (ButtonProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonProps>)
  | (AnchorProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof AnchorProps>)

export function ButtonWrapper({
  variant,
  size,
  square,
  wide = false,
  $loading,
  className,
  ...props
}: Props) {
  const { buttonStyle, anchorStyle } = useMemo(() => {
    const { default: defaultButton, anchor } = button({
      variant,
      size,
      square,
      loading: $loading,
      wide,
    })

    return {
      buttonStyle: defaultButton({ className }),
      anchorStyle: anchor({ className }),
    }
  }, [$loading, className, size, square, variant, wide])

  if (props.isAnchor) {
    const { anchorRef, isAnchor: _, ...others } = props
    // eslint-disable-next-line smarthr/a11y-anchor-has-href-attribute, jsx-a11y/anchor-has-content
    return <a {...others} className={anchorStyle} ref={anchorRef} />
  } else {
    const { buttonRef, ...others } = props
    return <button {...others} className={buttonStyle} ref={buttonRef} />
  }
}

const button = tv({
  slots: {
    default: [
      'disabled:shr-cursor-not-allowed',
      /* alpha color を使用しているので、背景色と干渉させない */
      'disabled:shr-bg-clip-padding',
      '[&_.smarthr-ui-Icon]:forced-colors:disabled:shr-fill-[GrayText]',
    ],
    anchor: [
      'shr-no-underline',
      '[&:not([href])]:shr-cursor-not-allowed',
      /* alpha color を使用しているので、背景色と干渉させない */
      '[&:not([href])]:shr-bg-clip-padding',
      '[&_.smarthr-ui-Icon]:forced-colors:shr-fill-[LinkText]',
      '[&:not([href])_.smarthr-ui-Icon]:forced-colors:shr-fill-[CanvasText]',
    ],
  },
  variants: {
    variant: {
      primary: {},
      secondary: {},
      danger: {},
      skeleton: {},
      text: {},
    },
    size: {
      default: {},
      s: {},
    },
    square: {
      true: {},
    },
    loading: {
      true: {},
    },
    wide: {
      true: {},
    },
  },
  compoundSlots: [
    {
      slots: ['default', 'anchor'],
      className: [
        'shr-box-border',
        'shr-cursor-pointer',
        'shr-inline-flex',
        'shr-justify-center',
        'shr-items-center',
        'shr-gap-0.5',
        'shr-text-center',
        'shr-whitespace-nowrap',
        'shr-rounded-m',
        /* ボタンの高さを合わせるために指定 */
        'shr-border',
        'shr-border-solid',
        'shr-font-inherit',
        'shr-font-bold',
        'shr-leading-none',
        'focus-visible:shr-focus-indicator',
        'contrast-more:shr-border-high-contrast',
        /* baseline より下の leading などの余白を埋める */
        '[&_.smarthr-ui-Icon]:shr-block',
        /** selector list は使えない
         * via https://github.com/tailwindlabs/tailwindcss/issues/10576#issuecomment-1440703413
         */
        '[&_svg]:shr-block',
      ],
    },
    {
      slots: ['default', 'anchor'],
      size: 's',
      className: [
        'shr-p-0.5',
        'shr-text-sm',
        /* ボタンラベルの line-height を 0 にしたため、高さを担保する */
        'shr-min-h-[calc(theme(fontSize.sm)+theme(spacing.1)+theme(borderWidth.2))]',
      ],
    },
    {
      slots: ['default', 'anchor'],
      size: 'default',
      className: ['shr-text-base'],
    },
    {
      slots: ['default', 'anchor'],
      size: 'default',
      square: false,
      className: 'shr-px-1 shr-py-0.75',
    },
    {
      slots: ['default', 'anchor'],
      size: 'default',
      square: true,
      className: 'shr-p-0.75',
    },
    {
      slots: ['default', 'anchor'],
      loading: true,
      className: 'shr-flex-row-reverse',
    },
    {
      slots: ['default', 'anchor'],
      wide: true,
      className: 'shr-w-full',
    },
    {
      slots: ['default', 'anchor'],
      variant: 'primary',
      className: [
        'shr-border-main',
        'shr-bg-main',
        'shr-text-white',
        'focus-visible:shr-border-main-darken',
        'focus-visible:shr-bg-main-darken',
        'hover:shr-border-main-darken',
        'hover:shr-bg-main-darken',
      ],
    },
    {
      slots: ['default'],
      variant: 'primary',
      className: [
        'disabled:shr-border-main/50',
        'disabled:shr-bg-main/50',
        'disabled:shr-text-white/50',
      ],
    },
    {
      slots: ['anchor'],
      variant: 'primary',
      className: [
        '[&:not([href])]:shr-border-main/50',
        '[&:not([href])]:shr-bg-main/50',
        '[&:not([href])]:shr-text-white/50',
      ],
    },
    {
      slots: ['default', 'anchor'],
      variant: 'secondary',
      className: [
        'shr-border-default',
        'shr-bg-white',
        'shr-text-black',
        'focus-visible:shr-border-darken',
        'focus-visible:shr-bg-white-darken',
        'focus-visible:constrast-more:shr-border-high-contrast',
        'hover:shr-border-darken',
        'hover:shr-bg-white-darken',
        'hover:constrast-more:shr-border-high-contrast',
      ],
    },
    {
      slots: ['default'],
      variant: 'secondary',
      className: [
        'disabled:shr-border-disabled',
        'disabled:shr-bg-white-darken',
        'disabled:shr-text-disabled',
      ],
    },
    {
      slots: ['anchor'],
      variant: 'secondary',
      className: [
        '[&:not([href])]:shr-border-disabled',
        '[&:not([href])]:shr-bg-white-darken',
        '[&:not([href])]:shr-text-disabled',
      ],
    },
    {
      slots: ['default', 'anchor'],
      variant: 'danger',
      className: [
        'shr-border-danger',
        'shr-bg-danger',
        'shr-text-white',
        'focus-visible:shr-border-danger-darken',
        'focus-visible:shr-bg-danger-darken',
        'hover:shr-border-danger-darken',
        'hover:shr-bg-danger-darken',
      ],
    },
    {
      slots: ['default'],
      variant: 'danger',
      className: [
        'disabled:shr-border-danger/50',
        'disabled:shr-bg-danger/50',
        'disabled:shr-text-white/50',
      ],
    },
    {
      slots: ['anchor'],
      variant: 'danger',
      className: [
        '[&:not([href])]:shr-border-danger/50',
        '[&:not([href])]:shr-bg-danger/50',
        '[&:not([href])]:shr-text-white/50',
      ],
    },
    {
      slots: ['default', 'anchor'],
      variant: 'skeleton',
      className: [
        'shr-border-white',
        'shr-bg-transparent',
        'shr-text-white',
        'focus-visible:shr-border-white-darken',
        'focus-visible:shr-bg-overlay',
        'focus-visible:shr-text-white-darken',
        'hover:shr-border-white-darken',
        'hover:shr-bg-overlay',
        'hover:shr-text-white-darken',
      ],
    },
    {
      slots: ['default'],
      variant: 'skeleton',
      className: [
        'disabled:shr-border-white/50',
        'disabled:shr-bg-transparent',
        'disabled:shr-text-white/50',
      ],
    },
    {
      slots: ['anchor'],
      variant: 'skeleton',
      className: [
        '[&:not([href])]:shr-border-white/50',
        '[&:not([href])]:shr-bg-transparent',
        '[&:not([href])]:shr-text-white/50',
      ],
    },
    {
      slots: ['default', 'anchor'],
      variant: 'text',
      className: [
        'shr-border-transparent',
        'shr-bg-transparent',
        'shr-text-black',
        'focus-visible:shr-bg-white-darken',
        'hover:shr-bg-white-darken',
      ],
    },
    {
      slots: ['default'],
      variant: 'text',
      className: [
        'disabled:shr-border-transparent',
        'disabled:shr-bg-transparent',
        'disabled:shr-text-disabled',
      ],
    },
    {
      slots: ['anchor'],
      variant: 'text',
      className: [
        '[&:not([href])]:shr-border-transparent',
        '[&:not([href])]:shr-bg-transparent',
        '[&:not([href])]:shr-text-disabled',
      ],
    },
  ],
})
