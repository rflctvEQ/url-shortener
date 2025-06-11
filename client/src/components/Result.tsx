import type { CSSProperties } from 'react'
import { useState } from 'react'
import type { ShortenedUrlData } from "../types"
import Button from './common/Button'

interface Props {
  shortenedUrlData: ShortenedUrlData | undefined
}

const styles: { [key: string]: CSSProperties } = {
  header: {
    color: 'green'
  },
  shortUrlWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  success: {
    color: 'green'
  },
  error: {
    color: 'red'
  },
  newButton: {
    marginTop: '12px'
  }
}

const Result = ({ shortenedUrlData }: Props) => {
  const [copiedText, setCopiedText] = useState('')

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText('Copied! :)')
    } catch {
      setCopiedText('Failed copy :/')
    }
  }

  return <>
    <h2 style={styles.header}>Shortened URL created successfully!</h2>

    <div style={styles.shortUrlWrapper}>
      <p><strong>Short URL:</strong> {shortenedUrlData?.shortUrl}</p>
      {
        copiedText
          ? <p style={copiedText.includes('Failed') ? styles.error : styles.success}>{copiedText}</p>
          : <Button buttonText='Copy' buttonType='button' onClick={() => copyToClipboard(shortenedUrlData?.shortUrl ?? '')} />
      }
    </div>
    <p><strong>Original long URL: </strong>{shortenedUrlData?.longUrl}</p>

    <Button style={styles.newButton} buttonText='New URL' buttonType='button' onClick={() => window.location.reload()} />
  </>
}

export default Result
