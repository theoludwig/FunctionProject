import Link from 'next/link'
import './Footer.css'

export default function Footer () {
  return (
    <footer className='footer'>
      <p className='footer-text text-center'>
        <Link href='/about'>
          <a>FunctionProject</a>
        </Link>
                &nbsp;- Version 2.1 <br />
        <a href='https://divlo.fr/' target='_blank' rel='noopener noreferrer'>Divlo</a> | Tous droits réservés
      </p>
    </footer>
  )
}
