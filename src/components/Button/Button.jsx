import css from './Button.module.css';

export const Button = ({loadMore}) => {
    return (
        <button type="button" onClick={loadMore} className={css.Button}>Load more</button>
    )
}

