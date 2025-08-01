'use client';

import { BeatLoader } from 'react-spinners';

type Props = {
  size?: number;
};

const SimpleSpinner = ({ size = 15 }: Props) => {
  return <BeatLoader color="var(--primary)" size={size} />;
};

export default SimpleSpinner; 