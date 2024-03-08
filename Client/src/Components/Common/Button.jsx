import React from "react";
import * as editIcon from "react-icons/lu";
import { Link } from "react-router-dom";

const Button = ({ children, active, linkto, textColor, icon, ariaLabel }) => {
    const Icons = editIcon[icon];

    return (
        <Link to={linkto} aria-label={ariaLabel}>
            <div className={`py-3 px-6 sm:text-[1rem] text-[0.813rem] font-bold text-center rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
             ${textColor ? `text-${textColor}` : "text-white"} max-w-Contentfit max-h-Contentfit flex flex-row gap-2 
            ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
            items-center justify-between
            hover:shadow-none hover:scale-95 transition-all duration-200`}>
                {children}
                {icon && <Icons />}
            </div>
        </Link>
    );
};

export default Button;
