export function RegradeLogo({ size = 24 }: { size?: number }) {
  const h = Math.round(size * 0.75);
  return (
    <svg width={size} height={h} viewBox="0 0 16 12" aria-hidden="true">
      <rect x="4" y="2" width="7" height="1" fill="#1E4FFF" />
      <rect x="3" y="3" width="9" height="1" fill="#1E4FFF" />
      <rect x="2" y="4" width="11" height="1" fill="#1E4FFF" />
      <rect x="2" y="5" width="11" height="1" fill="#1E4FFF" />
      <rect x="3" y="6" width="9" height="1" fill="#7FA3FF" />
      <rect x="13" y="4" width="1" height="1" fill="#1E4FFF" />
      <rect x="14" y="3" width="1" height="1" fill="#1E4FFF" />
      <rect x="15" y="2" width="1" height="1" fill="#1E4FFF" />
      <rect x="14" y="5" width="1" height="1" fill="#1E4FFF" />
      <rect x="15" y="6" width="1" height="1" fill="#1E4FFF" />
      <rect x="6" y="1" width="1" height="1" fill="#7FA3FF" />
      <rect x="5" y="0" width="1" height="1" fill="#7FA3FF" />
      <rect x="7" y="0" width="1" height="1" fill="#7FA3FF" />
      <rect x="4" y="4" width="1" height="1" fill="#09090B" />
    </svg>
  );
}
