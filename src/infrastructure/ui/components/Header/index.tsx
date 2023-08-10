import Image from 'next/image'
import React from 'react'
import { labels } from '~/shared/labels/labels'

export default function Header() {
  return (
    <div className="rounded-br-[20px] overflow-hidden bg-[#a9acb2] flex flex-row justify-center gap-4 w-full h-32 items-center">
      <Image
        alt="logo"
        width={50}
        height={50}
        src="/assets/icons/logo.png"
        className="w-16 shrink-0"
      />
      <div className="text-center text-xl font-['Inter'] font-medium  shrink-0 h-6">
        {labels.app_title}
      </div>
    </div>
  )
}
