export function Checkbox({ checked, onChange, className = '' }) {
    return (
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`h-5 w-5 ${className}`}
      />
    );
  }