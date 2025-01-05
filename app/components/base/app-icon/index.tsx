import type { FC } from 'react'
import classNames from 'classnames'
import style from './style.module.css'
import { APP_INFO } from '@/config'

export type AppIconProps = {
  size?: 'xs' | 'tiny' | 'small' | 'medium' | 'large'
  rounded?: boolean
  icon?: string
  background?: string
  className?: string
}

export const Icon = ({ src }: { src: string }) => {
  if (src) {
    return (
      <img src={src} alt="App Icon" />
    );
  }
  return (
    <span role="img" aria-label="default icon">🤖</span>
  );
}

const AppIcon: FC<AppIconProps> = ({
  size = 'medium',
  rounded = false,
  background,
  className,
}) => {
  return (
    <span
      className={classNames(
        style.appIcon,
        size !== 'medium' && style[size],
        rounded && style.rounded,
        className ?? '',
      )}
      style={{
        background,
      }}
    >
      <Icon src={APP_INFO.app_icon || ''} ></Icon>
    </span>
  )
}

export default AppIcon
