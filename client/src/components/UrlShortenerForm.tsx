import type { Dispatch, SetStateAction, CSSProperties } from "react"
import type { ShortenedUrlData } from '../types'
import { useState } from 'react'
import { useForm, useController } from 'react-hook-form'
import { TextField } from "@mui/material"
import Button from './common/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface Props {
  setShortenedUrlData: Dispatch<SetStateAction<ShortenedUrlData | undefined>>
  setIsFormView: Dispatch<SetStateAction<boolean>>
}

const purple = '#7700e9'

const styles: { [key: string]: CSSProperties } = {
  header: {
    color: 'lightgrey'
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    backgroundColor: 'grey',
    color: purple,
    marginBottom: '8px',
    borderRadius: '4px',
    // @ts-expect-error unrecognized CSS selector
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: purple,
      },
    },
    '& label.Mui-focused': {
      color: purple,
      border: `2px solid ${purple} !important`,
      boxShadow: '-4px 4px 12px rgba(119, 0, 233, 0.3), -1px 1px 4px rgba(0, 0, 0, 0.1)',
      paddingX: '8px',
      backgroundColor: 'grey'
    },
    '& MuiInputBase-formControl': {
      borderRadius: '4px !important'
    },
    '& .MuiFormHelperText-root': {
      backgroundColor: '#242424',
      margin: 0
    }
  },
  error: {
    color: 'red'
  }
}

const UrlShortenerForm = ({ setShortenedUrlData, setIsFormView }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const hookFormProps = useForm({
    defaultValues: {
      longUrl: ''
    },
    resolver: yupResolver(
      yup.object().shape({
        longUrl: yup.string()
          .required('Please enter a URL')
          .url('Please enter a valid URL')
          .test(
            'is-https',
            'URL must start with https://',
            (value) => value?.startsWith('https://')
          )
      }).required()
    )
  })

  const controllerProps = useController({
    control: hookFormProps.control,
    name: 'longUrl'
  })

  const handleSubmit = async (formData: { longUrl: string }) => {
    setIsLoading(true)

    try {
      const shortUrlRes = await fetch('http://localhost:5001/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const shortUrlData = await shortUrlRes.json()

      if (!shortUrlRes.ok) {
        setError(`${shortUrlData.message}`)
      }

      if (shortUrlRes.status === 200) {
        setShortenedUrlData(shortUrlData)
        setIsFormView(false)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error has occurred')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {
        isLoading
          ? <h2> Loading...</h2 >
          : error
            ? <h2 style={styles.error}>{`${error} - Refresh and try again.`}</h2>
            : (
              <>
                <h2 style={styles.header}>Enter URL to shorten</h2>

                <form style={styles.formWrapper} onSubmit={hookFormProps.handleSubmit(handleSubmit)}>
                  <TextField
                    error={!!controllerProps.fieldState.error?.message}
                    helperText={controllerProps.fieldState.error?.message}
                    sx={styles.input}
                    label='Long URL'
                    {...hookFormProps.register('longUrl')}
                  />
                  <Button buttonType='submit' buttonText='Submit' />
                </form>
              </>

            )
      }
    </>

  )
}

export default UrlShortenerForm

