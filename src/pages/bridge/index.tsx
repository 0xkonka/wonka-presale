import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { Widget } from './components/Widget'
import { WidgetEvents } from './components/WidgetEvents'

export const LiFiWidgetNext = dynamic(
    () => import('./components/Widget').then((module) => module.Widget) as any,
    {
      ssr: false,
      loading: () => <>...</>,
    },
  );

const Bridge : NextPage = () => {
  return (
    <>
      <WidgetEvents />
      <LiFiWidgetNext />
    </>
  )
}

export default Bridge

