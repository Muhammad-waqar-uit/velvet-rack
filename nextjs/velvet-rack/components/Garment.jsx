// Hand-drawn SVG garments. All colour comes from the `color` prop.
function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255);
  return `rgb(${r},${g},${b})`;
}

function Text({ txt, sub, light }) {
  if (!txt) return null;
  const fill = light ? "#1b1b1b" : "#efe6d0";
  return (
    <g fill={fill} textAnchor="middle">
      <text x="100" y="118" fontFamily="'Playfair Display', Georgia, serif" fontWeight="800" fontSize={txt.length > 5 ? 26 : 30} letterSpacing="1">{txt}</text>
      {sub && <text x="100" y="136" fontFamily="Georgia, serif" fontSize="9" letterSpacing="2">{sub}</text>}
    </g>
  );
}

export default function Garment({ product, side = "front" }) {
  const { kind, color, front, back, tag, trim } = product;
  const dark = shade(color, -28);
  const light = shade(color, 22);
  const isLight = parseInt(color.slice(1), 16) > 0xb0b0b0;
  const label = side === "front" ? front : back;
  const sub = side === "front" ? tag : null;
  const id = `g-${product.id}-${side}`;

  const defs = (
    <defs>
      <linearGradient id={id} x1="0" x2="1">
        <stop offset="0" stopColor={dark} />
        <stop offset=".35" stopColor={light} />
        <stop offset=".7" stopColor={color} />
        <stop offset="1" stopColor={dark} />
      </linearGradient>
    </defs>
  );

  if (kind === "tee") {
    return (
      <svg viewBox="0 0 200 240" className="garment" aria-label={product.name}>
        {defs}
        <path d="M70 18 L30 38 L6 84 L36 98 L50 76 L50 212 Q100 224 150 212 L150 76 L164 98 L194 84 L170 38 L130 18 Q100 40 70 18Z" fill={`url(#${id})`} />
        <path d="M70 18 Q100 40 130 18 Q100 56 70 18Z" fill={trim || dark} />
        <Text txt={label} sub={side === "front" ? "EST. 2024" : null} light={isLight} />
      </svg>
    );
  }

  if (kind === "blazer") {
    return (
      <svg viewBox="0 0 200 240" className="garment" aria-label={product.name}>
        {defs}
        <path d="M72 16 L28 36 L12 190 L44 196 L52 90 L52 214 L148 214 L148 90 L156 196 L188 190 L172 36 L128 16 L100 60Z" fill={`url(#${id})`} />
        <path d="M72 16 L100 130 L128 16 L100 60Z" fill={dark} />
        <path d="M100 130 L100 214" stroke={dark} strokeWidth="2" />
        <circle cx="96" cy="160" r="2.5" fill={light} /><circle cx="96" cy="184" r="2.5" fill={light} />
      </svg>
    );
  }

  if (kind === "crew") {
    return (
      <svg viewBox="0 0 200 240" className="garment" aria-label={product.name}>
        {defs}
        <path d="M72 18 L30 36 L14 196 L44 200 L50 84 L50 214 Q100 226 150 214 L150 84 L156 200 L186 196 L170 36 L128 18 Q100 44 72 18Z" fill={`url(#${id})`} />
        <path d="M72 18 Q100 48 128 18 Q100 62 72 18Z" fill={dark} />
        <rect x="50" y="204" width="100" height="12" rx="4" fill={dark} opacity=".5" />
        <Text txt={label} light={isLight} />
      </svg>
    );
  }

  // hoodie
  return (
    <svg viewBox="0 0 200 260" className="garment" aria-label={product.name}>
      {defs}
      <path d="M60 30 Q100 -2 140 30 L172 46 L190 206 L158 210 L152 98 L152 232 Q100 244 48 232 L48 98 L42 210 L10 206 L28 46Z" fill={`url(#${id})`} />
      <path d="M62 30 Q100 -6 138 30 Q132 70 100 78 Q68 70 62 30Z" fill={dark} />
      <path d="M78 36 Q100 14 122 36 Q116 62 100 66 Q84 62 78 36Z" fill={shade(color, -50)} />
      <path d="M92 70 L90 108 M108 70 L110 108" stroke={light} strokeWidth="2.5" strokeLinecap="round" />
      {side === "front" && <path d="M62 170 L72 150 H128 L138 170 V200 H62Z" fill={dark} opacity=".55" />}
      <Text txt={label} sub={sub} light={isLight} />
      <rect x="48" y="222" width="104" height="12" rx="4" fill={dark} opacity=".5" />
    </svg>
  );
}
