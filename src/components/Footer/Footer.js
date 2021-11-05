import React from 'react'
import styles from './Footer.module.css'
import Image from 'next/image'
import nexusLogo from '../../assets/branding/NexusLogoWhite1250x225.png'
import walletLogo from '../../assets/icons/wallet.png'
import appleLogo from '../../assets/icons/apple.png'
import playstoreLogo from '../../assets/icons/playstore.png'

function Footer() {
    return (
        <div className={styles.footer}>
            <Image width={220} height={40} src={nexusLogo}></Image>
            <div className={styles.walletLinks}>
            <Image  src={walletLogo}></Image>
                <Image  src={appleLogo}></Image>

            <Image src={playstoreLogo}></Image>
            </div>
        </div>
    )
}

export default Footer
