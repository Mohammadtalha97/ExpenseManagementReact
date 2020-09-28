import React, { Component } from 'react';

const PasswordStrengthValidator = ({ validity : { minChar, number, specialChar,capital}}) => {
    return(
        <div className="password-meter text-left mb-4">
            <p className="text-dark">Password must contain:</p>
            <ul className="text-muted text-lowercase ">
                <PasswordStrengthIndicatorItem
                    isValid = {minChar}
                    text = "Have at least 8 character"
                />
                <PasswordStrengthIndicatorItem
                    isValid = {number}
                    text = "Have at least 1 number"
                />

                <PasswordStrengthIndicatorItem
                    isValid = {specialChar}
                    text = "Have at least 1 special character"
                />

                <PasswordStrengthIndicatorItem
                    isValid = {capital}
                    text = "Have at least 1 capital character"
                />
            </ul>
        </div>
    )
}



const  PasswordStrengthIndicatorItem = ({ isValid, text}) => {
    const highlightClass = isValid 
    
        ? "green" 
        : isValid !== null 
            ? "red" 
            : ""
    
    return <li  style={{ color : highlightClass, fontSize : '13px'}}>{text}</li>
    // return <li className="text-success">{text}</li>
}
export default PasswordStrengthValidator;