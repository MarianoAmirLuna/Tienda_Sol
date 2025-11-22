export function TextArea({ label, name, value, onChange, rows = 4, placeholder }) {
  const inputClass =
    "w-full p-3 border rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
  const labelClass = "block mb-2 font-semibold text-neutral-800 dark:text-neutral-200";

  return (
    <div>
      <label htmlFor={name} className={labelClass}>{label}</label>
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}
