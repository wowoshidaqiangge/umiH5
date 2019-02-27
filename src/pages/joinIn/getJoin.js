// import {Flex,Button} from "antd-mobile";
import styles from './index.css'

const doimg = require('../../assets/img/join-do.png');
const merchantImg = require('../../assets/img/join-Merchant.jpg');
const doUrl = '/joinIn';
export default function() {
    return (
        <div className={styles.imgBanner}>
            <img className={styles.img} src={merchantImg} />
            <div className={styles.imgBackground}>
                <a href={doUrl}>
                    <img className={styles.img} src={doimg} />
                </a>
            </div>
        </div>
    );
}
