import Link from 'next/link'

export default function Footer () {
  return (
    <>
      <footer className='footer'>
        <p className='footer-text text-center'>
          <Link href='/about'>
            <a>FunctionProject</a>
          </Link>
          &nbsp;- Version 2.3 <br />
          <a href='https://divlo.fr/' target='_blank' rel='noopener noreferrer'>
            Divlo
          </a>{' '}
          | Tous droits réservés
        </p>
      </footer>

      <style jsx>{`
        .footer {
          border-top: var(--border-header-footer);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .footer-text {
          line-height: 2.5;
        }
      `}
      </style>
    </>
  )
}
