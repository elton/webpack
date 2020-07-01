import React from 'react';
import ReactDOM from 'react-dom'
import Greeter from './components/Greeter';

import './styles/main.scss'; //使用require导入css文件

const render = Component => {
    ReactDOM.render(
        <Component />,
        document.getElementById('root')
    )
}

render(Greeter);

if (module.hot) {
    module.hot.accept('./components/Greeter', () => { render(require('./components/Greeter').default)})
}