'use client'

import React, { useState, useRef, useEffect } from 'react'
import { FiChevronDown, FiCheck } from 'react-icons/fi'

const TableSelect = ({
  label = 'Table',
  name = 'table',
  value = '',
  onChange,
  tableCount = 12,
  placeholder = 'Select table',
  required = false,
  error = '',
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const options = Array.from({ length: tableCount }, (_, i) => ` ${i + 1}`)

  // Bahar click ya Escape par band
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-3.5" ref={ref}>
      {label && (
        <label className="font-inter text-sm font-medium text-white/80">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          name={name}
          onClick={() => setOpen((p) => !p)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={!!error}
          className={`flex h-[40px] sm:h-[50px] w-full items-center justify-between rounded-[10px] border bg-white/5 px-3.5 text-left outline-none ${
            error ? 'border-red-500' : open ? 'border-green' : 'border-transparent focus:border-green'
          }`}
        >
          <span className={value ? 'text-active' : 'font-inter text-sm font-medium text-inactive'}>
            {value || placeholder}
          </span>
          <FiChevronDown
            size={18}
            className={`text-white/70 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {/* 95% dark + blur: transparent glass jaisa look, par peeche ka kuch nahi dikhta */}
        <ul
          role="listbox"
          className={`snooker-scroll absolute left-0 top-full z-50 mt-2 max-h-60 w-full origin-top rounded-xl border border-[#1B2824B2] bg-[#0D1412]/95 p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-[transform,opacity] duration-200 ${
            open ? 'visible scale-100 opacity-100' : 'invisible pointer-events-none scale-95 opacity-0'
          }`}
        >
          {options.map((opt) => {
            const selected = value === opt
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange?.(name, opt)
                  setOpen(false)
                }}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3.5 py-1 sm:py-2.5 font-inter text-sm font-medium transition-colors ${
                  selected
                    ? 'bg-white/10 text-[#55E489]'
                    : 'text-active hover:bg-white/5 hover:text-white'
                }`}
              >
                {opt}
                {selected && <FiCheck size={16} />}
              </li>
            )
          })}
        </ul>
      </div>

      {error && <p className="-mt-2 text-[10px] sm:text-xs font-medium text-red-400">{error}</p>}
    </div>
  )
}

export default TableSelect