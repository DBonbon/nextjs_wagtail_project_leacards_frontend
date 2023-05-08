import React from "react";
import Image from 'next/image'

function BaseImage({ img, className = "" }) {
  return (
    <div className={`${className}`}>
      {/* eslint-disable-next-line */}
      <Image
        src={img.fullUrl}
        alt={img.alt}
        height={img.height}
        width={img.width}
      />
    </div>
  );
}

export { BaseImage };
