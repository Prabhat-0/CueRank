'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiEye, FiEyeOff, FiCheck } from 'react-icons/fi'
import secondBg from '../../../../public/secondBg.png'
import InputBox from '@/components/InputBox'
import Paragraph from '@/components/Paragraph'

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

const CARD =
  'flex w-full max-w-[520px] flex-col gap-5 bg-[#10171566] border border-[#1B2824B2] p-6 backdrop-blur-[14px] rounded-[40px] sm:p-10'

const TITLE =
  'font-barlow font-semibold text-3xl leading-[98%] tracking-tight text-active'

// ---------- Validation ----------
const validateEmail = (email) => {
  const errors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
  if (!email.trim()) errors.email = 'Email is required'
  else if (!emailRegex.test(email.trim())) errors.email = 'Enter a valid email address'
  return errors
}

const validateReset = (resetEmail, verifiedEmail, password, confirm) => {
  const errors = {}
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  if (!resetEmail.trim()) errors.email = 'Email is required'
  else if (!emailRegex.test(resetEmail.trim())) errors.email = 'Enter a valid email address'
  else if (resetEmail.trim().toLowerCase() !== verifiedEmail.trim().toLowerCase())
    errors.email = 'Email must match the one where the OTP was sent'

  if (!password) errors.newPassword = 'New password is required'
  else if (password.length < 8) errors.newPassword = 'Password must be at least 8 characters'
  else if (!/[A-Z]/.test(password)) errors.newPassword = 'Password needs at least one uppercase letter'
  else if (!/[a-z]/.test(password)) errors.newPassword = 'Password needs at least one lowercase letter'
  else if (!/\d/.test(password)) errors.newPassword = 'Password needs at least one number'

  if (!confirm) errors.confirmPassword = 'Please confirm your password'
  else if (password !== confirm) errors.confirmPassword = 'Passwords do not match'

  return errors
}

// ---------- Animated button ----------
const AnimatedButton = ({ text, type = 'submit', onClick, disabled = false }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="group relative isolate overflow-hidden flex w-full cursor-pointer items-center justify-center rounded-full whitespace-nowrap
      py-3 px-7.5 md:py-3.5 font-inter font-semibold text-base leading-5
      bg-buttons border backdrop-blur-md text-black
      transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]
      hover:scale-95 hover:shadow-[0_0_28px_rgba(74,222,128,0.28)] active:scale-90
      disabled:cursor-not-allowed disabled:opacity-60"
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
      {text}
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
)

// ---------- 6-digit OTP input ----------
const OtpInput = ({ value, onChange, error = '' }) => {
  const inputsRef = useRef([])
  const focusAt = (i) => inputsRef.current[i]?.focus()

  const handleChange = (e, i) => {
    const digit = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...value]
    next[i] = digit
    onChange(next)
    if (digit && i < OTP_LENGTH - 1) focusAt(i + 1)
  }

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace') {
      if (value[i]) {
        const next = [...value]
        next[i] = ''
        onChange(next)
      } else if (i > 0) focusAt(i - 1)
    } else if (e.key === 'ArrowLeft' && i > 0) focusAt(i - 1)
    else if (e.key === 'ArrowRight' && i < OTP_LENGTH - 1) focusAt(i + 1)
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = Array(OTP_LENGTH).fill('')
    pasted.split('').forEach((d, idx) => (next[idx] = d))
    onChange(next)
    focusAt(Math.min(pasted.length, OTP_LENGTH - 1))
  }

  return (
    <div className="flex w-full flex-col gap-3.5">
      <label className="text-sm font-medium font-inter text-white/80">
        Enter 6-digit OTP
        <span className="ml-1 text-red-500">*</span>
      </label>

      <div className="flex justify-between gap-2 sm:gap-3">
        {Array.from({ length: OTP_LENGTH }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={value[i]}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            aria-label={`OTP digit ${i + 1}`}
            aria-invalid={!!error}
            className={`h-[50px] w-full min-w-0 rounded-[10px] border bg-white/5 text-center text-lg font-semibold text-active outline-none ${
              error ? 'border-red-500' : 'border-transparent focus:border-green'
            }`}
          />
        ))}
      </div>

      {error && <p className="-mt-2 text-xs font-medium text-red-400">{error}</p>}
    </div>
  )
}

// ---------- Password field with eye toggle ----------
const PasswordField = ({ id, label, value, onChange, error, show, onToggle }) => (
  <div className="flex w-full flex-col gap-3.5">
    <label htmlFor={id} className="text-sm font-medium font-inter text-white/80">
      {label}
      <span className="ml-1 text-red-500">*</span>
    </label>

    <div className="relative w-full">
      <input
        id={id}
        name={id}
        type={show ? 'text' : 'password'}
        placeholder="********"
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        className={`h-[50px] w-full rounded-[10px] border bg-white/5 px-3.5 pr-12 text-active outline-none placeholder:font-inter placeholder:text-sm placeholder:font-medium placeholder:text-inactive ${
          error ? 'border-red-500' : 'border-transparent focus:border-green'
        }`}
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label={show ? 'Hide password' : 'Show password'}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
      >
        {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>
    </div>

    {error && <p className="-mt-2 text-xs font-medium text-red-400">{error}</p>}
  </div>
)

// ---------- Page ----------
const ForgotPassword = () => {
  const router = useRouter()

  const [step, setStep] = useState(1) // 1 = email, 2 = OTP, 3 = email + new password, 4 = success
  const [email, setEmail] = useState('')
  const [resetEmail, setResetEmail] = useState('')
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState({})
  const [seconds, setSeconds] = useState(0)

  // resend countdown
  useEffect(() => {
    if (seconds <= 0) return
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const clearError = (key) =>
    setErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })

  // ----- Step 1: email -> send OTP -----
  const handleSendOtp = (e) => {
    e.preventDefault()
    const newErrors = validateEmail(email)
    setErrors(newErrors)
    if (newErrors.email) return document.getElementById('email')?.focus()

    // TODO: API call, send OTP to this email
    console.log('Send OTP to', email)
    setOtp(Array(OTP_LENGTH).fill(''))
    setSeconds(RESEND_SECONDS)
    setStep(2)
  }

  // ----- Step 2: verify OTP -----
  const handleVerifyOtp = (e) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < OTP_LENGTH) {
      setErrors({ otp: 'Please enter all 6 digits of the OTP' })
      return
    }

    // TODO: API call, verify OTP. If wrong: setErrors({ otp: 'Invalid OTP' }) and return
    console.log('Verify OTP', { email, code })
    setErrors({})
    setResetEmail(email) // step 3 mein email pehle se bhara aayega
    setStep(3)
  }

  const handleResend = () => {
    if (seconds > 0) return
    // TODO: API call, resend OTP
    console.log('Resend OTP to', email)
    setOtp(Array(OTP_LENGTH).fill(''))
    setErrors({})
    setSeconds(RESEND_SECONDS)
  }

  // ----- Step 3: email + new password -----
  const handleReset = (e) => {
    e.preventDefault()
    const newErrors = validateReset(resetEmail, email, newPassword, confirmPassword)
    setErrors(newErrors)

    if (newErrors.email) return document.getElementById('resetEmail')?.focus()
    if (newErrors.newPassword) return document.getElementById('newPassword')?.focus()
    if (newErrors.confirmPassword) return document.getElementById('confirmPassword')?.focus()

    // TODO: API call, reset password using resetEmail + OTP + newPassword
    console.log('Reset password for', resetEmail)
    setStep(4)
  }

  const goBackToEmail = () => {
    setStep(1)
    setOtp(Array(OTP_LENGTH).fill(''))
    setErrors({})
  }

  const backToLogin = (
    <p className="mt-2 flex w-full flex-wrap items-center justify-center gap-x-3 border-t border-white/10 pt-6 text-center font-inter text-sm font-semibold text-white/80 sm:pt-8 sm:text-base">
      <span>Remember your password?</span>
      <Link
        href="/login"
        className="bg-gradient-to-r from-[#55E489] to-[#00A03B] bg-clip-text text-transparent hover:underline"
      >
        Login
      </Link>
    </p>
  )

  return (
    <div className="relative isolate flex min-h-screen w-full items-center justify-center px-5 pb-16 pt-25 sm:px-8 sm:py-16">
      <Image
        src={secondBg}
        alt="Background Image"
        fill
        priority
        className="w-full h-auto -z-10"
      />

      {/* ---------- STEP 1: Email ---------- */}
      {step === 1 && (
        <form onSubmit={handleSendOtp} noValidate className={CARD}>
          <div className={`${TITLE} flex w-full items-center justify-center`}>Forgot your password?</div>
          <div className="grid w-full place-items-center">
            <Paragraph
              text="A code will be sent to your email to help reset password"
              textSize="text-md md:text-base tracking-[-0.03em]"
            />
          </div>

          <InputBox
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              clearError('email')
            }}
            error={errors.email}
            required
          />

          <AnimatedButton text="Send OTP" />
          {backToLogin}
        </form>
      )}

      {/* ---------- STEP 2: OTP ---------- */}
      {step === 2 && (
        <form onSubmit={handleVerifyOtp} noValidate className={CARD}>
          <div className="flex flex-col gap-2">
            <div className={TITLE}>Verify OTP</div>
            <p className="font-inter text-sm text-white/70">
              We sent a 6-digit code to <span className="font-semibold text-active">{email}</span>
            </p>
          </div>

          <OtpInput
            value={otp}
            onChange={(next) => {
              setOtp(next)
              clearError('otp')
            }}
            error={errors.otp}
          />

          <div className="flex items-center justify-between font-inter text-sm">
            <button type="button" onClick={goBackToEmail} className="text-white/60 hover:text-white">
              Change email
            </button>

            {seconds > 0 ? (
              <span className="text-white/60">Resend in {seconds}s</span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="font-semibold text-[#DBC28B] hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <AnimatedButton text="Verify OTP" />
          {backToLogin}
        </form>
      )}

      {/* ---------- STEP 3: Email + New password ---------- */}
      {step === 3 && (
        <form onSubmit={handleReset} noValidate className={CARD}>
          <div className="flex flex-col gap-2">
            <div className={TITLE}>Reset Password</div>
            <p className="font-inter text-sm text-white/70">
              OTP verified. Confirm your email and choose a new password.
            </p>
          </div>

          <InputBox
            id="resetEmail"
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => {
              setResetEmail(e.target.value)
              clearError('email')
            }}
            error={errors.email}
            required
          />

          <PasswordField
            id="newPassword"
            label="Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
              clearError('newPassword')
              clearError('confirmPassword')
            }}
            error={errors.newPassword}
            show={showNew}
            onToggle={() => setShowNew((p) => !p)}
          />

          <PasswordField
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value)
              clearError('confirmPassword')
            }}
            error={errors.confirmPassword}
            show={showConfirm}
            onToggle={() => setShowConfirm((p) => !p)}
          />

          <AnimatedButton text="Reset Password" />
        </form>
      )}

      {/* ---------- STEP 4: Success ---------- */}
      {step === 4 && (
        <div className={`${CARD} items-center text-center`}>
          <div className="flex size-16 items-center justify-center rounded-full border border-[#55E489]/40 bg-[#55E489]/15">
            <FiCheck size={32} className="text-[#55E489]" />
          </div>

          <div className="flex flex-col gap-2">
            <div className={TITLE}>Password Updated</div>
            <p className="font-inter text-sm text-white/70">
              Your password has been reset successfully. You can now login with your new password.
            </p>
          </div>

          <AnimatedButton text="Back to Login" type="button" onClick={() => router.push('/login')} />
        </div>
      )}
    </div>
  )
}

export default ForgotPassword