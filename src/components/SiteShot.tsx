// Miniatura viva de um site entregue: foto + headline real + CTA.
// Texto é HTML de verdade (nunca corta), dentro da proporção 21/10 dos frames.
interface SiteShotProps {
  photo: string;
  kicker: string;
  title: string;
  highlight: string;
  cta: string;
  base: string;
  accent: string;
}

export default function SiteShot({ photo, kicker, title, highlight, cta, base, accent }: SiteShotProps) {
  return (
    <div className="relative h-full w-full overflow-hidden" style={{ backgroundColor: base }}>
      <img
        src={photo}
        alt=""
        loading="lazy"
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        className="absolute right-0 top-0 h-full w-[46%] object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(100deg, ${base} 42%, ${base}e6 58%, transparent 80%)` }}
      />
      <div className="relative flex h-full flex-col justify-center gap-1.5 p-4 pr-[48%]">
        <span
          className="inline-block self-start rounded-full border px-2 py-0.5 text-[7px] font-bold uppercase tracking-[1.5px]"
          style={{ color: accent, borderColor: `${accent}66` }}
        >
          {kicker}
        </span>
        <p className="font-bold leading-[1.1] text-white text-[15px]">
          {title} <em style={{ color: accent }}>{highlight}</em>
        </p>
        <span className="text-[8px] tracking-[2px]" style={{ color: accent }}>
          ★★★★★
        </span>
        <span
          className="inline-block self-start rounded-full px-2.5 py-1 text-[9px] font-bold"
          style={{ backgroundColor: accent, color: base }}
        >
          {cta}
        </span>
      </div>
    </div>
  );
}
