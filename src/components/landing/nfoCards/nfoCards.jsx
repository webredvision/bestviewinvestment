import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './NfoCards.module.css';

const NfoCards = ({ item, imageurl }) => {
    // console.log(item, imageurl)
    return (
        <Link href={`blogs/${item.slug}`} className={styles.card}>
            <Image
                src={`${imageurl}/${item.amcLogo}`}
                alt={item.title}
                width={300}
                height={200}
                className={styles.cardImage}
            />
            <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.scheme_name}</h3>
                <div className={styles.cardMeta}>
                    <div className={styles.metaItem}>
                        <Image
                            src="/images/icons/calendar.svg"
                            alt="Calendar"
                            width={16}
                            height={16}
                            className={styles.metaIcon}
                        />
                        <span>{item.date}</span>
                    </div>
                    <div className={styles.metaItem}>
                        <Image
                            src="/images/icons/user.svg"
                            alt="User"
                            width={16}
                            height={16}
                            className={styles.metaIcon}
                        />
                        <span>{item.author}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default NfoCards