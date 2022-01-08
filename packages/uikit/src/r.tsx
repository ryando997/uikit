import styles from './def.atomic.css';
import styles2 from './abc.atomic.css'

export default function Container() {
  const [state, setState] = useState(false);
  return (
    <div className={styles.a}>
      <span className={styles.b}>CONTAINER_DEF</span>
      <span className={styles2.k}>CONTAINER_DEF</span>
    </div>
  )
}