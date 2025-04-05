export default function CultureLayout({ children }) {
  return (
    <div className="px-4 py-6 bg-slate-100 min-h-screen">
      <div className="max-w-screen-md mx-auto">
        {children}
      </div>
    </div>
  );
}
