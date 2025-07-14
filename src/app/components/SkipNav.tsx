// components/SkipNav.tsx
export default function SkipNav() {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-orange-500 focus:text-white focus:rounded-lg focus:z-50 focus:font-bold"
    >
      Skip to content
    </a>
  );
}