// a component that dicates the loading behavior
import './loading.css';

const Loading = () => {
    return (
        <div class="lds-ellipsis">
            <div></div><div></div><div></div><div></div>
        </div>
    )
}

export default Loading;