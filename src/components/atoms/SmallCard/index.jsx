import styles from "./SmallCard.module.css"
import svgLogo from "../../../assets/icons/icon.svg"
import pngLogo from "../../../assets/icons/nexusblue.png"

export default function SmallCard(props) {
    // let theme = props.dark? "dark" : "light"
    return (
        <div>
            <div className={`${styles.smallcard}`}>
                <div className={styles.label}>{props.label}</div>
                <div className={styles.sublabel}>{props.sublabel}</div>
                <div className={styles.bodyText}>{props.text}</div>
                <div className={styles.tickerSymbol}>{props.ticker}</div>
                <img src={pngLogo} className={styles.icon}></img>
            </div>
        </div>
    )
}


