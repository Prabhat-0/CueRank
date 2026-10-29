import React from 'react'

const InputBox = ({
  label,
  id,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  error = '',
  className = '',
}) => {
  const inputId = id || name

  return (
    <div className="flex w-full flex-col gap-3.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium font-inter text-white/80">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`h-[50px] rounded-[10px] border bg-white/5 px-3.5 text-active outline-none placeholder:font-inter placeholder:text-sm placeholder:font-medium placeholder:text-inactive ${
          error ? 'border-red-500' : 'border-transparent focus:border-green'
        } ${className}`}
      />

      {error && (
        <p id={`${inputId}-error`} className="-mt-2 text-xs font-medium text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export default InputBox