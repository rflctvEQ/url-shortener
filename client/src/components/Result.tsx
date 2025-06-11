import type { CSSProperties } from 'react'
import { useState } from 'react'
import type { ShortenedUrlData } from "../types"
import Button from './common/Button'

interface Props {
  shortenedUrlData: ShortenedUrlData | undefined
}

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    maxWidth: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'left'
  },
  header: {
    color: 'green'
  },
  shortUrlWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  shortUrl: {
    marginRight: '16px'
  },
  longUrl: {
    textAlign: 'left',
    wordBreak: 'break-all'
  },
  success: {
    color: 'green'
  },
  error: {
    color: 'red'
  },
  newButton: {
    margin: '50px auto',
    maxWidth: '125px'
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

  return <div style={styles.wrapper}>
    <h2 style={styles.header}>Shortened URL created successfully!</h2>

    <div style={styles.shortUrlWrapper}>
      <p style={styles.shortUrl}><strong>Short URL:</strong> {shortenedUrlData?.shortUrl}</p>
      {
        copiedText
          ? <p style={copiedText.includes('Failed') ? styles.error : styles.success}>{copiedText}</p>
          : <Button buttonText='Copy' buttonType='button' onClick={() => copyToClipboard(shortenedUrlData?.shortUrl ?? '')} />
      }
    </div>
    <p style={styles.longUrl}><strong>Original long URL: </strong>{shortenedUrlData?.longUrl}</p>

    <Button style={styles.newButton} buttonText='New URL' buttonType='button' onClick={() => window.location.reload()} />
  </div>
}

export default Result
