import Image from 'next/image'
import React, { FunctionComponent } from 'react'

interface IGalleryProps {
  title: string
  images: string[]
}

export const Gallery: FunctionComponent<IGalleryProps> = ({
  title,
  images,
}) => {
  return (
    <div
      className="flex flex-col w-full gap-4 "
      data-testid={`gallery-container-${title}`}
    >
      <h5 className="font-bold text-2xl" data-testid={`gallery-${title}`}>
        {title}
      </h5>
      <div className="overflow-hidden flex flex-row justify-center gap-20 w-full items-center mb-4">
        <div className="flex flex-row flex-wrap gap-12 w-full mb-8">
          {images.map(
            (item, index) =>
              (item.startsWith('https') || item.startsWith('/')) && (
                <div
                  data-testid={`image-${title}-index`}
                  key={index}
                  className="shadow-[4px_6px_12px_4px_rgba(0,_0,_0,_0.25)] overflow-hidden bg-white flex flex-col w-auto h-auto items-center py-1 px-1"
                >
                  <Image
                    className="object-cover  w-52 h-52"
                    src={item}
                    alt={`${title}-image-${index}`}
                    width={200}
                    height={200}
                  />
                </div>
              )
          )}
        </div>
      </div>
    </div>
  )
}
