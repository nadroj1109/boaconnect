// components/common/button/LoadingSpinner.jsx

export default function LoadingSpinner({

    size = 18,

}) {

    return (

        <svg

            className="animate-spin"

            width={size}

            height={size}

            viewBox="0 0 24 24"

        >

            <circle

                cx="12"

                cy="12"

                r="10"

                stroke="currentColor"

                strokeWidth="3"

                fill="none"

                opacity=".2"

            />

            <path

                fill="currentColor"

                d="M22 12a10 10 0 0 1-10 10"

            />

        </svg>

    );

}