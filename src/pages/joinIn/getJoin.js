import {Flex,Button} from "antd-mobile";
import styles from './index.css'
export default function() {
    return (
        <div className={styles.imgBanner}>
            <img className={styles.img} src={require('../../assets/img/join-banner.png')} />
        </div>
    );
}
