import {

    modalContainerClass,

} from "./modalStyles";

export default function ModalContainer({

    children,

    size,

    className,

}) {

    return (

        <div

            className={modalContainerClass({

                size,

                className,

            })}

            onClick={(e) => e.stopPropagation()}

        >

            {children}

        </div>

    );

}