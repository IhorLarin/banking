import React from 'react'

import { z } from 'zod'
import { Control, FieldPath } from 'react-hook-form'

import { FormControl, FormField, FormLabel, FormMessage, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { authFormSchema } from '@/lib/utils'

const formSchema = authFormSchema('sign-up')

interface CustomInput {
  control: Control<z.infer<typeof formSchema>>,
  name: FieldPath<z.infer<typeof formSchema>>,
  placeholder: string
  label: string
}

const CustomInput = ({ control, name, label, placeholder }: CustomInput) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='form-item space-y-0'>
          <FormLabel className='form-label'>
            {label}
          </FormLabel>
          <div className='flex flex-col w-full'>
            <FormControl>
              <Input
                placeholder={placeholder}
                className='input-class'
                type={name === 'password' ? 'password' : 'text'}
                {...field}
              />
            </FormControl>
            <FormMessage className='form-message mt-2'/>
          </div>
        </FormItem>
      )}
    />
  )
}

export default CustomInput