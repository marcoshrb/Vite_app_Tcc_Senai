import Spinner from 'react-bootstrap/Spinner';

import style from './loading.module.css';

export default function Loading() {
    return (
        <div className={style.loadingContainer}>
            <Spinner animation="grow" />
        </div>
    )
}