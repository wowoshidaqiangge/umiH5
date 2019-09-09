import styles from './index.css';
// import 'react-flexible'
// import '../uni-webview/uni.webview.0.1.52'

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      { props.children }
    </div>
  );
}

export default BasicLayout;
