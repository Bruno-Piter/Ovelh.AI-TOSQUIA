export function CircuitBg() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      aria-hidden
    >
      <defs>
        <pattern
          id="grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <circle cx="8%" cy="12%" r="3" fill="#3b82f6" />
      <circle cx="92%" cy="88%" r="3" fill="#22c55e" />
      <path
        d="M 80 40 H 200 V 120 H 320"
        fill="none"
        stroke="#00d4ff"
        strokeWidth="1"
      />
      <path
        d="M 90% 20% H 70% V 35%"
        fill="none"
        stroke="#39ff14"
        strokeWidth="1"
      />
    </svg>
  );
}
