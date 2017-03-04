const validator = {
    validate: (props, value) => {
        if (props.required && !value) {
            return "Required";
        }
        if (props.type === 'email') {
            if (!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(value))
                return "Email is not valid";
        }
        if (props.pattern) {
            if (!props.pattern.test(value))
                return "Value is not valid";
        }
        if (props.validator && typeof (props.validator) === "function") {
            return props.validator(value);
        }
        if (props.customValidator && typeof (props.customValidator) === "function") {
            return props.customValidator(value);
        }
        return undefined;
    }
};

export default validator;