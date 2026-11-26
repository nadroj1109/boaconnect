export default function ModalBody({

    children,

}) {

    return (

        <div className="max-h-[70vh] overflow-y-auto p-6">

            {children}

        </div>

    );

}