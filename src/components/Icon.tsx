import Image from 'next/image';

export default function Icon({
  icon,
  size,
  marginTop,
}: {
  icon: string;
  size?: string;
  marginTop?: string;
}) {
  return (
    <Image
      alt=""
      src={`/icons/${icon}.svg`}
      width={size || '100%'}
      height={size || '100%'}
      style={{
        marginTop,
      }}
    />
  );
}
