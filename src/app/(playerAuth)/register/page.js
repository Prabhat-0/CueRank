'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import RegisterBgIm from '../../../../public/registerBgImg.png'
import InputBox from '@/components/InputBox'
import Paragraph from '@/components/Paragraph'
import { Tick } from '@/svg'
import { FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi'
import Link from 'next/link'

const list = [
  "Your own club page at yourclub.cuerank.in",
  "Collect tournament entry fees online",
  "Fixtures and brackets generated for you",
  "Club rankings updated after every result",
]

// ---------- Validation ----------
const FIELD_ORDER = [
  'firstName', 'lastName', 'mobileNO', 'email', 'city', 'state',
  'fullAddress', 'gender', 'password', 'confirmPassword',
]

const validate = (form, confirmPassword,agree) => {
  const errors = {}
  const nameRegex = /^[A-Za-z][A-Za-z\s.'-]*$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const mobileRegex = /^[6-9]\d{9}$/

  // First name
  if (!form.firstName.trim()) errors.firstName = 'First name is required'
  else if (form.firstName.trim().length < 2) errors.firstName = 'First name must be at least 2 characters'
  else if (!nameRegex.test(form.firstName.trim())) errors.firstName = 'First name can only contain letters'

  // Last name
  if (!form.lastName.trim()) errors.lastName = 'Last name is required'
  else if (!nameRegex.test(form.lastName.trim())) errors.lastName = 'Last name can only contain letters'

  // Mobile
  if (!form.mobileNO.trim()) errors.mobileNO = 'Mobile number is required'
  else if (!mobileRegex.test(form.mobileNO.trim()))
    errors.mobileNO = 'Enter a valid 10-digit mobile number starting with 6-9'

  // Email
  if (!form.email.trim()) errors.email = 'Email is required'
  else if (!emailRegex.test(form.email.trim())) errors.email = 'Enter a valid email address'

  // City / State
  if (!form.city.trim()) errors.city = 'City is required'
  if (!form.state.trim()) errors.state = 'State is required'

  // Address
  if (!form.fullAddress.trim()) errors.fullAddress = 'Full address is required'
  else if (form.fullAddress.trim().length < 10)
    errors.fullAddress = 'Please enter a more complete address (at least 10 characters)'

  // Gender
  if (!form.gender) errors.gender = 'Please select a gender'

  // Password
  if (!form.password) errors.password = 'Password is required'
  else if (form.password.length < 8) errors.password = 'Password must be at least 8 characters'
  else if (!/[A-Z]/.test(form.password)) errors.password = 'Password needs at least one uppercase letter'
  else if (!/[a-z]/.test(form.password)) errors.password = 'Password needs at least one lowercase letter'
  else if (!/\d/.test(form.password)) errors.password = 'Password needs at least one number'

  // Confirm password
  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password'
  else if (form.password !== confirmPassword) errors.confirmPassword = 'Passwords do not match'
  if (!agree) errors.terms = 'Please accept the terms and conditions'

  return errors
}

// ---------- Custom dropdown ----------
const SelectBox = ({ label, name, value, options = [], onChange, required = false, error = '' }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-3.5" ref={ref}>
      {label && (
        <label className="text-sm font-medium font-inter text-white/80">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          name={name}
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-invalid={!!error}
          className={`flex h-[40px] sm:h-[50px] w-full items-center justify-between rounded-[10px] border bg-white/5 px-3.5 text-left text-active outline-none ${error ? 'border-red-500' : 'border-transparent focus:border-green'
            }`}
        >
          <span>{value}</span>
          <FiChevronDown
            size={18}
            className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <ul
            role="listbox"
            className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-[#1B2824B2] bg-[#0D1412] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
          >
            {options.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                onClick={() => {
                  onChange(name, opt)
                  setOpen(false)
                }}
                className={`cursor-pointer px-3.5 py-2.5 text-active transition-colors hover:bg-white/10 ${value === opt ? 'bg-white/10 text-[#DBC28B]' : ''
                  }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="-mt-2 text-xs font-medium text-red-400">{error}</p>}
    </div>
  )
}

// ---------- Page ----------
const Signup = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    mobileNO: '',
    email: '',
    city: '',
    state: '',
    fullAddress: '',
    password: '',
    gender: 'Male',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [agree, setAgree] = useState(false)

  const clearError = (key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    clearError(name)
    if (name === 'password') clearError('confirmPassword')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newErrors = validate(form, confirmPassword,agree)
    setErrors(newErrors)

    const firstErrorKey = FIELD_ORDER.find((key) => newErrors[key])
    if (firstErrorKey) {
      document.querySelector(`[name="${firstErrorKey}"]`)?.focus()
      return
    }

    // All good: send to your API here
    console.log(form)
  }

  return (
    <div className="relative isolate w-full min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src={RegisterBgIm}
          alt="Background Image"
          fill
          priority
          className="object-cover object-center scale-125 lg:scale-100"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] px-5 pt-32 pb-16 sm:gap-8 sm:px-8 sm:pt-40 sm:pb-20 lg:pt-52 lg:pb-28 xl:gap-[51px] xl:px-0">
        {/* Text container: lg ke neeche hidden */}
        <div className="hidden lg:flex flex-col gap-12.5">
          <p className="font-inter text-sm font-medium leading-none uppercase tracking-[0.5em] text-[#DBC28B] sm:text-base xl:text-lg">
            For snooker players
          </p>

          <h1 className="font-barlow text-4xl font-semibold uppercase leading-[110px] tracking-[-0.007em] text-active sm:text-5xl md:text-7xl xl:text-[90px]">
            <span className="block">Your Game</span>
            <span className="block text-gold">Your Legacy</span>
          </h1>

          <Paragraph
            text="Join a growing community of players, compete in tournaments, and make every frame count."
            textSize="text-sm md:text-base leading-[1.65] sm:text-lg xl:text-[22px] w-auto max-w-[449px]"
          />

          <ul>
            {list.map((li) => (
              <li
                key={li}
                className="flex items-center gap-3 whitespace-nowrap font-inter font-medium text-xl leading-[180%] text-active"
              >
                <Tick /> {li}
              </li>
            ))}
          </ul>
        </div>

        {/* noValidate turns off the browser's default popups so our messages show instead */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex w-full min-w-0 flex-col gap-2 sm:gap-5 flex-1 bg-[#10171566] border border-[#1B2824B2] p-5 sm:p-8 lg:p-10 backdrop-blur-[14px] rounded-[24px] sm:rounded-[32px] lg:rounded-[40px]"
        >
          <div className="font-barlow font-semibold text-2xl sm:text-3xl leading-[98%] tracking-tight text-active">
            Player Details
          </div>
            
          <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row sm:items-start">
            <InputBox
              label="First Name"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
              required
            />
            <InputBox
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
              required
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row sm:items-start">
            <InputBox
              label="Mobile Number"
              name="mobileNO"
              type="tel"
              placeholder="Number"
              value={form.mobileNO}
              onChange={handleChange}
              error={errors.mobileNO}
              required
            />
            <InputBox
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-5 sm:flex-row sm:items-start">
            <InputBox
              label="City"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              error={errors.city}
              required
            />
            <InputBox
              label="State"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              error={errors.state}
              required
            />
          </div>

          <InputBox
            label="Full Address"
            name="fullAddress"
            placeholder="Street, area, PIN"
            value={form.fullAddress}
            onChange={handleChange}
            error={errors.fullAddress}
            required
          />

          <SelectBox
            label="Gender"
            name="gender"
            value={form.gender}
            options={['Male', 'Female', 'Others']}
            onChange={(name, val) => {
              setForm((prev) => ({ ...prev, [name]: val }))
              clearError(name)
            }}
            error={errors.gender}
            required
          />

          {/* ---------- Password ---------- */}
          <div className="flex w-full min-w-0 flex-col gap-2 md:gap-3.5">
            <label htmlFor="password" className="text-sm font-medium font-inter text-white/80">
              Password
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                aria-invalid={!!errors.password}
                className={`h-[40px] sm:h-[50px] w-full rounded-[10px] border bg-white/5 px-3.5 pr-12 text-active outline-none placeholder:font-inter placeholder:text-sm placeholder:font-medium placeholder:text-inactive ${errors.password ? 'border-red-500' : 'border-transparent focus:border-green'
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>

            {errors.password && (
              <p className="-mt-2 text-xs font-medium text-red-400">{errors.password}</p>
            )}
          </div>

          {/* ---------- Confirm Password ---------- */}
          <div className="flex w-full min-w-0 flex-col gap-2 sm:gap-3.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium font-inter text-white/80">
              Confirm Password
              <span className="ml-1 text-red-500">*</span>
            </label>

            <div className="relative w-full">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  clearError('confirmPassword')
                }}
                aria-invalid={!!errors.confirmPassword}
                className={`h-[40px] sm:h-[50px] w-full rounded-[10px] border bg-white/5 px-3.5 pr-12 text-active outline-none placeholder:font-inter placeholder:text-sm placeholder:font-medium placeholder:text-inactive ${errors.confirmPassword ? 'border-red-500' : 'border-transparent focus:border-green'
                  }`}
              />
             
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="-mt-2 text-xs font-medium text-red-400">{errors.confirmPassword}</p>
            )}
          </div>
           <div className="flex w-full flex-col gap-2 ">
  <label
    htmlFor="terms"
    className="flex cursor-pointer items-start gap-3 select-none"
  >
    {/* Asli checkbox, screen reader aur keyboard ke liye */}
    <input
      id="terms"
      name="terms"
      type="checkbox"
      checked={agree}
      onChange={(e) => {
        setAgree((prev)=>!prev)
        clearError('terms')
      }}
      aria-invalid={!!errors.terms}
      className="peer sr-only"
    />

    {/* Dikhne wala box */}
    <span
      aria-hidden
      className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[6px] border bg-white/5 transition-colors
        peer-focus-visible:ring-2 peer-focus-visible:ring-[#55E489]/60
        peer-checked:border-[#55E489] peer-checked:bg-[#55E489]/15
        peer-checked:[&>svg]:opacity-100
        ${errors.terms ? 'border-red-500' : 'border-white/30'}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-3.5 opacity-0 transition-opacity"
        fill="none"
        stroke="#55E489"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </span>

    {/* Text: tumhari properties */}
    <span className="font-inter text-[14px] font-medium leading-[22px] tracking-normal text-white/80">
      I agree to the Terms of Service and Privacy Policy.
    </span>
  </label>

  {errors.terms && (
    <p className="text-xs font-medium text-red-400">{errors.terms}</p>
  )}
</div>

          {/* ---------- Submit ---------- */}
          <button
            type="submit"
            className="group relative isolate overflow-hidden flex w-full cursor-pointer items-center justify-center rounded-full whitespace-nowrap
              py-3 px-7.5 md:py-3.5 font-inter font-semibold text-base leading-5
              bg-buttons border backdrop-blur-md text-black
              transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
              hover:scale-95 hover:shadow-[0_0_28px_rgba(74,222,128,0.28)] active:scale-90 h-[40px] sm:h-[50px]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 origin-left scale-x-0 rounded-full bg-[#4ADE80]/25
                transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)]
                group-hover:scale-x-100 group-hover:delay-[650ms]"
            />
            <span
              className="font-inter text-base font-semibold text-black transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
                group-hover:-translate-x-2 group-hover:delay-[650ms] group-hover:animate-[cue-text_1.3s_forwards]"
            >
              Create Account
            </span>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 my-auto -left-10 h-[3px] w-8 rounded-full opacity-0
                bg-[linear-gradient(90deg,#5b3a1e_0%,#c89b5a_70%,#f1e4c8_92%,#6fb7ff_100%)]
                group-hover:animate-[cue-stick_1.3s_forwards]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 my-auto left-[calc(50%-0.5rem)] size-4 rounded-full opacity-0
                bg-[radial-gradient(circle_at_30%_30%,#ffffff,#d6d6d6)] shadow-[2px_2px_6px_rgba(0,0,0,0.45)]
                group-hover:animate-[cue-ball_1.3s_forwards]"
            >
              <span className="absolute left-0.75 top-0.75 size-1 rounded-full bg-[#E23258]" />
            </span>
          </button>
             <p className="mt-2 flex w-full flex-wrap items-center justify-center gap-x-3 border-t border-white/10 pt-6 text-center font-inter text-sm font-semibold text-white/80 sm:pt-8 sm:text-base">
                        <span>Already have an account?</span>
                        <Link
                            href="/login"
                            className="bg-gradient-to-r from-[#55E489] to-[#00A03B] bg-clip-text text-transparent hover:underline"
                        >
                            Login
                        </Link>
                    </p>
        </form>
     
      </div>
    </div>
  )
}

export default Signup