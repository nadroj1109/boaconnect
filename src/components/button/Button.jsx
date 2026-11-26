// components/common/button/Button.jsx

import { forwardRef } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

import LoadingSpinner from "./LoadingSpinner";

import {

    baseButton,

    variants,

    sizes,

    radius,

} from "./buttonStyles";

const Button = forwardRef(({

    children,

    variant = "primary",

    size = "md",

    rounded = "lg",

    type = "button",

    loading = false,

    disabled = false,

    fullWidth = false,

    icon: Icon,

    iconRight: RightIcon,

    className,

    to,

    href,

    target,

    rel,

    onClick,

    title,

    ...props

}, ref) => {

    const classes = clsx(

        baseButton,

        variants[variant],

        sizes[size],

        radius[rounded],

        fullWidth && "w-full",

        className

    );

    const content = (

        <>

            {

                loading && (

                    <LoadingSpinner

                        size={18}

                    />

                )

            }

            {

                !loading && Icon && (

                    <Icon

                        className="h-5 w-5"

                    />

                )

            }

            {

                children && (

                    <span>

                        {children}

                    </span>

                )

            }

            {

                RightIcon && !loading && (

                    <RightIcon

                        className="h-5 w-5"

                    />

                )

            }

        </>

    );

    // React Router Link

    if (to) {

        return (

            <Link

                ref={ref}

                to={to}

                title={title}

                className={classes}

                {...props}

            >

                {content}

            </Link>

        );

    }

    // External Link

    if (href) {

        return (

            <a

                ref={ref}

                href={href}

                target={target}

                rel={

                    rel ??

                    (

                        target === "_blank"

                            ? "noopener noreferrer"

                            : undefined

                    )

                }

                title={title}

                className={classes}

                {...props}

            >

                {content}

            </a>

        );

    }

    // Normal Button

    return (

        <button

            ref={ref}

            type={type}

            title={title}

            disabled={

                disabled ||

                loading

            }

            onClick={onClick}

            className={classes}

            {...props}

        >

            {content}

        </button>

    );

});

Button.displayName = "Button";

export default Button;