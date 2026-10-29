'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import RegisterBgIm from '../../../../public/registerBgImg.png'
import InputBox from '@/components/InputBox'
import Paragraph from '@/components/Paragraph'
import { Tick } from '@/svg'
import { FiEye, FiEyeOff, FiChevronDown } from 'react-icons/fi'
import Link from 'next/link'
import TableSelect from '@/components/Table'

const list = [
  "Your own club page at yourclub.cuerank.in",
  "Collect tournament entry fees online",
  "Fixtures and brackets generated for you",
  "Club rankings updated after every result",
]

// ---------- Validation ----------

const validate = (form, table, agree) => {
  const errors = {}
  const nameRegex = /^[A-Za-z][A-Za-z\s.'-]*$/
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  const mobileRegex = /^[6-9]\d{9}$/

  if (table <= 0) errors.tables = 'Minimum of 1 table is required'

  // First name
  if (!form.fullName.trim()) errors.fullName = 'full name is required'
  else if (form.fullName.trim().length < 2) errors.fullName = 'full name must be at least 2 characters'
  else if (!nameRegex.test(form.fullName.trim())) errors.fullName = 'full name can only contain letters'

  // club name
  if (!form.clubName.trim()) errors.clubName = 'Club Name is required'
  else if (!nameRegex.test(form.clubName.trim())) errors.clubName = 'Club Name can only contain letters'

  // Mobile
  if (!form.mobileNo.trim()) errors.mobileNo = 'Mobile number is required'
  else if (!mobileRegex.test(form.mobileNo.trim()))
    errors.mobileNo = 'Enter a valid 10-digit mobile number starting with 6-9'

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
  if (!agree) errors.terms = "Please agree Term and Conditions for Registration"

  return errors
}

const initialFields={
    clubName: '',
    tables: '',
    city: '',
    state: '',
    fullAddress: '',
    clubWebsite: '',
    fullName: '',
    mobileNo: '',
    email: '',
  };
// ---------- Page ----------
const Signup = () => {
  const [table, setTable] = useState('')
  const [agree, setAgree] = useState(false);
  const [registerMessage,setRegisterMessage]=useState();
  const [form, setForm] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const clearError = (key) => {
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  //handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate(form, table, agree);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    const updatedForm = {
      ...form,
      tables: table,
    };

    setForm(initialFields)
   setRegisterMessage("Registraion Successfull You will get an email when your account will be approved ");
   setTimeout(()=>{
    setRegisterMessage('')
   },3000)
    console.log("printing Form:- ", form);

  }
  //handling changes of input boxes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    clearError(name)

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
            <span className="block">Register</span>
            <span className="block text-gold">Your Club</span>
          </h1>

          <Paragraph
            text="Put your tournaments online. Players join and pay from their phones, and fixtures and rankings run themselves."
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
        <form noValidate
          onSubmit={handleSubmit}
          className="flex w-full min-w-0 flex-col gap-5 flex-1 bg-[#10171566] border border-[#1B2824B2] p-5 sm:p-8 lg:p-10 backdrop-blur-[14px] rounded-[24px] sm:rounded-[32px] lg:rounded-[40px]">
          <div className='flex gap-3.5 items-center'>
            <div className='size-7.5 bg-gold rounded-full font-inter font-semibold text-sm grid place-items-center'>
              1
            </div>
            <div className="font-barlow font-semibold text-2xl sm:text-3xl leading-[98%] tracking-tight text-active">
              Club details
            </div>

          </div>
          <div className='flex flex-col sm:flex-row gap-3.5 w-full items-center'>
            <InputBox label="Club Name" id='clubName' name="clubName" placeholder='Enter Club Name...' value={form.clubName} onChange={handleChange} required error={errors.clubName} />
            <TableSelect
              label="Table"
              name="table"
              value={table}
              onChange={(name, val) => setTable(val)}
              tableCount={12}
              required
              error={errors.tables}
            />
          </div>
          <div className='flex gap-3.5 flex-col sm:flex-row w-full items-center'>
            <InputBox label="City" id='city' name="city" placeholder='City' value={form.city} onChange={handleChange} required error={errors.city} />
            <InputBox label="State" id='state' name="state" placeholder='State' value={form.state} onChange={handleChange} required error={errors.state} />
          </div>
          <InputBox label="Full Address" id='fullAddress' name="fullAddress" placeholder='Street, Area, PIN' value={form.fullAddress} onChange={handleChange} required error={errors.fullAddress} />

          <InputBox label="Your Club Website" id='clubWebsite' name="clubWebsite" placeholder='Paste website link' value={form.clubWebsite} onChange={handleChange} />
          <div className='flex gap-3.5 items-center pt-5 border-t border-white/10'>
            <div className='size-7.5 bg-gold rounded-full font-inter font-semibold text-sm grid place-items-center'>
              2
            </div>
            <div className="font-barlow font-semibold text-2xl sm:text-3xl leading-[98%] tracking-tight text-active">
              Owner Contact
            </div>

          </div>
          <InputBox label="Your Full Name" id='fullName' name="fullName" placeholder='Enter your name...' value={form.fullName} onChange={handleChange} required error={errors.fullName} />
          <InputBox label="Mobile No" id='mobileNo' name="mobileNo" placeholder='Enter your moblieNo...' value={form.mobileNo} onChange={handleChange} required error={errors.mobileNo} type='tel' />
          <InputBox label="Email" id='email' name="email" placeholder='Enter your email...' value={form.email} onChange={handleChange} required error={errors.email} type='mail' />
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
                  setAgree((prev) => !prev)
                  clearError('terms')
                }}
                aria-invalid={!!errors.terms}
                className="peer sr-only"
              />

              {/* Dikhne wala box */}
              <span
                aria-hidden
                className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-[6px] border bg-white transition-colors
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
          {registerMessage && <p className='font-inter text-sm md:text-base text-gold '>{registerMessage}</p>}
          {/* ---------- Submit ---------- */}
          <button
            type="submit"
            className="group relative isolate overflow-hidden flex w-full cursor-pointer items-center justify-center rounded-full whitespace-nowrap
              py-2 px-7.5 md:py-3.5 font-inter font-semibold text-base leading-5
              bg-buttons border backdrop-blur-md text-black
              transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
              hover:scale-95 hover:shadow-[0_0_28px_rgba(74,222,128,0.28)] active:scale-90"
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
              Submit For Approval
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
          
          <div className='grid place-items-center'>
            <p className='text-center w-auto max-w-[468px] font-inter text-white/60 text-xs leading-[22px]'>The CueRank team reviews every club before it goes live. You can edit your club page after approval.</p>
          </div>

        </form>


      </div>
    </div>
  )
}

export default Signup