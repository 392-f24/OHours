export function CardContent({ children, className = '' }) {
    return (
      <div className={`p-4 ${className}`}>
        {children}
      </div>
    );
  }