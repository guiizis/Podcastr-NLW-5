import styles from './style.module.scss'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

export function Header() {
  const formatedDate = format(new Date(), 'EEEEEE d MMMM', {
    locale: ptBR,
  })
  return (
    <header className={styles.headerContainer}>
      <img src="logo.svg" alt="logo" />
      <p>O Melhor para Voce Ouvir Sempre</p>
      <span>{formatedDate}</span>
    </header>
  )
}
