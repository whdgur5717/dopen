export interface IconButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
}
export const IconButton = ({ src, alt, onClick }: IconButtonProps) => (
  <button
    onClick={onClick}
    className="aspect-square w-6 shrink-0 object-contain"
    tabIndex={0}
  >
    <img loading="lazy" src={src} alt={alt} className="size-full" />
  </button>
);
