import React, { Component } from 'react';
import config from './config.json';

import styles from '../styles/Greeter.scss';

class Greeter extends Component {
    render() {
        return (
            <div className={styles.box}> 
                {config.greetText}
            </div>
        );//使用cssModule添加类名的方法
    }
}

export default Greeter