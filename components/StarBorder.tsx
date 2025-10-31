'use client';

import React, { useId } from 'react';

interface StarBorderProps {
  as?: React.ElementType;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
  [key: string]: any;
}

const StarBorder = ({
  as: Component = 'div',
  className = '',
  color = '#10b981',
  speed = '6s',
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps) => {
  const id = useId().replace(/:/g, '');

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes star-movement-bottom-${id} {
            0% {
              transform: translate(0%, 0%);
              opacity: 1;
            }
            100% {
              transform: translate(-100%, 0%);
              opacity: 0;
            }
          }

          @keyframes star-movement-top-${id} {
            0% {
              transform: translate(0%, 0%);
              opacity: 1;
            }
            100% {
              transform: translate(100%, 0%);
              opacity: 0;
            }
          }

          .star-bottom-${id} {
            animation: star-movement-bottom-${id} ${speed} linear infinite alternate;
          }

          .star-top-${id} {
            animation: star-movement-top-${id} ${speed} linear infinite alternate;
          }
        `
      }} />

      <Component
        className={`relative inline-block overflow-hidden rounded-[20px] ${className}`}
        style={{
          padding: `${thickness}px`,
          ...style
        }}
        {...rest}
      >
        {/* Bottom star animation */}
        <div
          className={`absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full z-0 star-bottom-${id}`}
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`
          }}
        ></div>

        {/* Top star animation */}
        <div
          className={`absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full z-0 star-top-${id}`}
          style={{
            background: `radial-gradient(circle, ${color}, transparent 10%)`
          }}
        ></div>

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </Component>
    </>
  );
};

export default StarBorder;
