import React, { ComponentProps, PropsWithChildren, useMemo } from 'react'
import { tv } from 'tailwind-variants'

const visuallyHiddenText = tv({
  base: 'shr-absolute -shr-top-px shr-left-0 shr-h-px shr-w-px shr-overflow-hidden shr-whitespace-nowrap shr-border-0 shr-p-0 [clip-path:inset(100%)] [clip:rect(0_0_0_0)]',
})

export const VisuallyHiddenText: React.FC<
  PropsWithChildren<
    {
      as?: string | React.ComponentType<any>
    } & ComponentProps<'span'>
  >
> = ({ as: Component = 'span', className, ...props }) => {
  const styles = useMemo(() => visuallyHiddenText({ className }), [className])

  return <Component {...props} className={styles} />
}
