export function CheckBoxGroup({ label, options, selected, onChange }) {
  const labelClass = "block mb-2 font-semibold text-neutral-800 dark:text-neutral-200";

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="flex flex-wrap gap-4">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="categorias"
              value={opt}
              checked={selected.includes(opt)}
              onChange={onChange}
              className="w-4 h-4 accent-indigo-600"
            />
            <span className="text-neutral-900 dark:text-neutral-100">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}