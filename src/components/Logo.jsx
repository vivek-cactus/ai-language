export default function Logo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#161b22"/>
      <text x="12" y="34" fontFamily="monospace" fontSize="16" fill="#58a6ff" fontWeight="bold">ABC</text>
      <path d="M14 44 L66 44" stroke="#30363d" strokeWidth="1.5" strokeDasharray="4 3"/>
      <text x="12" y="62" fontFamily="monospace" fontSize="16" fill="#ffa657" fontWeight="bold">A3C</text>
      <path d="M54 28 L66 40 L54 52" stroke="#58a6ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
