'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import RegisterBgIm from '../../../../public/registerBgImg.png'
import InputBox from '@/components/InputBox'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import secondBg from "../../../../public/secondBg.png"
import Paragraph from '@/components/Paragraph'
import Link from 'next/link'

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

// ---------- Validation ----------
const validateLogin = (email, password) => {
    const errors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

    if (!email.trim()) errors.email = 'Email is required'
    else if (!emailRegex.test(email.trim())) errors.email = 'Enter a valid email address'

    if (!password) errors.password = 'Password is required'
    else if (password.length < 8) errors.password = 'Password must be at least 8 characters'

    return errors
}

// ---------- Reusable animated button (same style as signup) ----------
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
        const digit = e.target.value.replace(/\D/g, '').slice(-1) // keep only the last digit typed
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
            } else if (i > 0) {
                focusAt(i - 1)
            }
        } else if (e.key === 'ArrowLeft' && i > 0) {
            focusAt(i - 1)
        } else if (e.key === 'ArrowRight' && i < OTP_LENGTH - 1) {
            focusAt(i + 1)
        }
    }

    // paste "123456" into any box and it fills all of them
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
                        className={`h-[50px] w-full min-w-0 rounded-[10px] border bg-white/5 text-center text-lg font-semibold text-active outline-none ${error ? 'border-red-500' : 'border-transparent focus:border-green'
                            }`}
                    />
                ))}
            </div>

            {error && <p className="-mt-2 text-xs font-medium text-red-400">{error}</p>}
        </div>
    )
}

// ---------- Page ----------
const Login = () => {
    const [step, setStep] = useState(1) // 1 = email/password, 2 = OTP
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
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

    // ----- Step 1: check email + password, then send OTP -----
    const handleLogin = (e) => {
        e.preventDefault()
        const newErrors = validateLogin(email, password)
        setErrors(newErrors)

        if (newErrors.email) return document.getElementById('email')?.focus()
        if (newErrors.password) return document.getElementById('password')?.focus()

        // TODO: call your API here to verify credentials and send the OTP
        console.log('Send OTP to', email)
        setOtp(Array(OTP_LENGTH).fill(''))
        setSeconds(RESEND_SECONDS)
        setStep(2)
    }

    // ----- Step 2: verify OTP -----
    const handleVerify = (e) => {
        e.preventDefault()
        const code = otp.join('')

        if (code.length < OTP_LENGTH) {
            setErrors({ otp: 'Please enter all 6 digits of the OTP' })
            return
        }

        // TODO: call your API here to verify the OTP
        console.log('Verify OTP', { email, code })
    }

    const handleResend = () => {
        if (seconds > 0) return
        // TODO: call your API here to resend the OTP
        console.log('Resend OTP to', email)
        setOtp(Array(OTP_LENGTH).fill(''))
        setErrors({})
        setSeconds(RESEND_SECONDS)
    }

    const goBack = () => {
        setStep(1)
        setOtp(Array(OTP_LENGTH).fill(''))
        setErrors({})
    }

    return (
        <div className="relative isolate flex min-h-screen w-full items-center justify-center px-5 pb-16 pt-25 sm:py-16 sm:px-8">
            <Image
                src={secondBg}
                alt="Background Image"
                fill
                priority
                className="w-full h-auto md:object-cover -z-10"
            />

            {/* ---------- STEP 1: Email + Password ---------- */}
            {step === 1 && (
                <form
                    onSubmit={handleLogin}
                    noValidate
                    className="flex w-full max-w-[520px] flex-col gap-5 bg-[#10171566] border border-[#1B2824B2] p-6 backdrop-blur-[14px] rounded-[40px] sm:p-10"
                >
                    <div className="font-barlow font-semibold text-3xl leading-[98%] tracking-tight text-active w-full flex items-center justify-center">
                        Welcome to CueRank
                    </div>
                    <div className='w-full grid place-items-center'>
                        <Paragraph text="A code will be sent to your email to help reset password" textSize='text-md md:text-base tracking-[-0.03em]' />
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

                    <div className="flex w-full flex-col gap-3.5">
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
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    clearError('password')
                                }}
                                aria-invalid={!!errors.password}
                                className={`h-[50px] w-full rounded-[10px] border bg-white/5 px-3.5 pr-12 text-active outline-none placeholder:font-inter placeholder:text-sm placeholder:font-medium placeholder:text-inactive ${errors.password ? 'border-red-500' : 'border-transparent focus:border-green'
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="-mt-2 text-xs font-medium text-red-400">{errors.password}</p>
                        )}
                    </div>
                    <Link href="/forgot-password" className='w-full flex items-center justify-end font-inter font-semibold text-base bg-gradient-to-r from-[#55E489] to-[#00A03B] bg-clip-text text-transparent cursor-pointer hover:underline'>Forgot Password</Link>
                    <AnimatedButton text="Continue" />
                    <p className="mt-2 flex w-full flex-wrap items-center justify-center gap-x-3 border-t border-white/10 pt-6 text-center font-inter text-sm font-semibold text-white/80 sm:pt-8 sm:text-base">
                        <span>Do not have an account?</span>
                        <Link
                            href="/register"
                            className="bg-gradient-to-r from-[#55E489] to-[#00A03B] bg-clip-text text-transparent hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </form>
            )}

            {/* ---------- STEP 2: OTP ---------- */}
            {step === 2 && (
                <form
                    onSubmit={handleVerify}
                    noValidate
                    className="flex w-full max-w-[520px] flex-col gap-5 bg-[#10171566] border border-[#1B2824B2] p-6 backdrop-blur-[14px] rounded-[40px] sm:p-10"
                >
                    <div className="flex flex-col gap-2">
                        <div className="font-barlow font-semibold text-3xl leading-[98%] tracking-tight text-active">
                            Verify OTP
                        </div>
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
                        <button
                            type="button"
                            onClick={goBack}
                            className="text-white/60 hover:text-white"
                        >
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
                    <p className="mt-2 flex w-full flex-wrap items-center justify-center gap-x-3 border-t border-white/10 pt-6 text-center font-inter text-sm font-semibold text-white/80 sm:pt-8 sm:text-base">
                        <span>Do not have an account?</span>
                        <Link
                            href="/register"
                            className="bg-gradient-to-r from-[#55E489] to-[#00A03B] bg-clip-text text-transparent hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                    <AnimatedButton text="Verify & Login" />
                </form>
            )}
        </div>
    )
}

export default Login