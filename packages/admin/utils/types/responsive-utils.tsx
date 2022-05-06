
export const isXXSmallUp = (size: string) => size !== 'xxsmall';
export const isXSmallUp = (size: string) => !['xxsmall' , 'xsmall'].includes(size);
export const isSmallUp = (size: string) => !['xxsmall' , 'xsmall','small'].includes(size);
export const isMediumUp = (size: string) => ['large' , 'xlarge' , 'full'].includes(size);
export const isLargeUp = (size: string) => ['xlarge','full'].includes(size);

export const isXSmallDown = (size: string) => size === 'xxsmall';
export const isSmallDown = (size: string) => ['xxsmall' , 'xsmall',].includes(size);
export const isMediumDown = (size: string) => !['large' , 'xlarge' , 'full'].includes(size);
export const isLargeDown = (size: string) => !['xlarge','full'].includes(size);
export const isFullDown = (size: string) => size !== 'full';
