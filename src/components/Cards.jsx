export function Card({ children, className = "" }) {
  return (
    <div className={` overflow-y-auto bg-white shadow rounded ${className}`}>{children}</div>
  );
}
