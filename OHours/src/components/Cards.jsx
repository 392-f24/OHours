export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow rounded ${className}`}>{children}</div>
  );
}
