'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import CustomInput from '@/components/CustomInput'
import { authFormSchema } from '@/lib/utils'

const AuthForm = ({ type }: AuthFormProps) => {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const formSchema = authFormSchema(type)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  const onSubmit = async (data: z.infer<typeof formSchema>) => {

    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true)

    try {
      // Sign up with Appwrite and create plain link token
      if (type === 'sign-up') {
        // const newUser = await signUp(data)
        // setUser(newUser)
      }

      if (type === 'sign-in') {
        // const response = await signIn({
        //   email: data.email,
        //   password: data.password,
        // })
        //
        // if (response) {
        //   router.push('/')
        // }
      }
    } catch (err) {
      console.log('error =>', err)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1 ">Horizon</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {
              user
                ? 'Link Account'
                : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
            }
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {
              user
                ? 'Link your account to get started'
                : 'Please enter your details'
            }
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          {{/*plaid link*/ }}
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="firstName"
                      placeholder="Enter your first name"
                      label="First Name"
                    />
                    <CustomInput
                      control={form.control}
                      name="lastName"
                      placeholder="Enter your last name"
                      label="Last Name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name="address"
                    placeholder="Enter your specific address"
                    label="Address"
                  />
                  <CustomInput
                    control={form.control}
                    name="city"
                    placeholder="Enter your city"
                    label="City"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="state"
                      placeholder="ex: NY"
                      label="State"
                    />
                    <CustomInput
                      control={form.control}
                      name="postalCode"
                      placeholder="ex: 01001"
                      label="Postal Code"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name="dateOfBirth"
                      placeholder="y-m-d"
                      label="Date of Birth"
                    />
                    <CustomInput
                      control={form.control}
                      name="ssn"
                      placeholder="ex: 1234 "
                      label="ssn"
                    />
                  </div>
                </>
              )}

              <CustomInput
                control={form.control}
                name="email"
                placeholder="Enter your email"
                label="Email"
              />
              <CustomInput
                control={form.control}
                name="password"
                placeholder="Enter your password"
                label="Password"
              />
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="form-btn"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        size={20}
                        className="animate-spin"
                      /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' ? 'Sign In' : 'Sign Up'
                  }
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-gray-600 text-14 font-normal">
              {type === 'sign-in' ? 'Don\'t have an account?' : 'Already have an account?'}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign Up' : 'Sign In'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm