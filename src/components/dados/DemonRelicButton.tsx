"use client";

/** Rosto placeholder — trocar por arte PNG/SVG depois, mesmo recorte circular. */
export function DemonFace({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={className}
      aria-hidden
    >
      <circle cx="40" cy="40" r="38" fill="#1a0808" />
      <path
        d="M18 28 L28 14 L40 22 L52 14 L62 28 L58 36 L40 32 L22 36 Z"
        fill="#3a0c0c"
      />
      <path d="M22 18 L16 6 L28 16 Z" fill="#6a1810" />
      <path d="M58 18 L64 6 L52 16 Z" fill="#6a1810" />
      <ellipse cx="28" cy="38" rx="7" ry="5" fill="#7a0000" />
      <ellipse cx="52" cy="38" rx="7" ry="5" fill="#7a0000" />
      <circle cx="28" cy="38" r="2.2" fill="#e8c547" />
      <circle cx="52" cy="38" r="2.2" fill="#e8c547" />
      <path
        d="M24 54 Q40 48 56 54 L54 62 Q40 70 26 62 Z"
        fill="#2a0a0a"
        stroke="#8b1e1e"
        strokeWidth="1.5"
      />
      <path
        d="M28 56 L30 61 L32 56 L34 61 L36 56 L38 62 L40 55 L42 62 L44 56 L46 61 L48 56 L50 61 L52 56"
        fill="none"
        stroke="#e6d3b0"
        strokeWidth="1.6"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

type RelicState = "idle" | "hot" | "spit";

type Props = {
  onSummon: () => void;
  disabled?: boolean;
  size?: "table" | "pocket";
  state?: RelicState;
  label?: string;
};

export default function DemonRelicButton({
  onSummon,
  disabled,
  size = "table",
  state = "idle",
  label = "Invocar dados",
}: Props) {
  const px = size === "pocket" ? 92 : 120;

  const spinClass =
    state === "spit" ? "is-spit" : state === "hot" ? "is-hot" : "";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onSummon}
      aria-label={label}
      style={{ width: px, height: px, touchAction: "manipulation" }}
      className="relative shrink-0 rounded-full disabled:opacity-50 select-none"
    >
      {/* Aro dourado */}
      <span
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 90deg, #6e5418, #e8c547, #8a6a20, #f0d78a, #6e5418)",
          boxShadow:
            "0 4px 14px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,240,180,0.5)",
        }}
      />
      {/* Cavidade */}
      <span
        className="absolute rounded-full"
        style={{
          inset: 8,
          background: "radial-gradient(circle at 40% 30%, #2a1210, #0a0606 70%)",
        }}
      />
      {/* Anel vermelho giratório */}
      <span
        className={`relic-spin ${spinClass} absolute`}
        style={{ inset: 10 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#7a1418"
            strokeWidth="7"
          />
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#b01c22"
            strokeWidth="3"
            strokeDasharray="18 10 6 12"
            strokeLinecap="butt"
          />
        </svg>
      </span>
      {/* Demônio */}
      <span
        className="absolute overflow-hidden rounded-full"
        style={{ inset: 22 }}
      >
        <DemonFace className="w-full h-full" />
      </span>
    </button>
  );
}
