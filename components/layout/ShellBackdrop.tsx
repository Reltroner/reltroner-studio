export default function ShellBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--rs-page-background)]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen"
        style={{ backgroundImage: 'url(/images/background.webp)' }}
      />
      <div
        className="absolute inset-0 opacity-90"
        style={{ backgroundImage: 'var(--rs-page-atmosphere)' }}
      />
      <div
        className="absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full"
        style={{
          background: 'var(--rs-aurora-gradient)',
          filter: 'blur(var(--rs-blur-atmosphere))',
          opacity: 'var(--rs-aurora-opacity)',
        }}
      />
      <div
        className="absolute -right-24 top-40 h-80 w-80 rounded-full"
        style={{
          background: 'var(--rs-aurora-accent)',
          filter: 'blur(calc(var(--rs-blur-atmosphere) * 0.75))',
          opacity: 'calc(var(--rs-aurora-opacity) * 0.72)',
        }}
      />
      <div className="shell-noise absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[var(--rs-page-background)] via-transparent to-transparent" />
    </div>
  );
}
