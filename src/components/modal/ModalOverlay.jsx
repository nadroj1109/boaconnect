export default function ModalOverlay({

    onClick,

}) {

    return (

        <div

            onClick={onClick}

            className="fixed inset-0 bg-black/50 backdrop-blur-sm"

        />

    );

}