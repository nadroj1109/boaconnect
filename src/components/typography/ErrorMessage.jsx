export default function ErrorMessage({

    error,

}) {

    if (!error) {

        return null;

    }

    return (

        <p
            className="
                mt-1
                text-xs
                font-medium
                text-red-600
            "
        >

            {

                Array.isArray(error)

                    ? error[0]

                    : error

            }

        </p>

    );

}