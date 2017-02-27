const validator = {
validate: (props, value) => {
        if (props.required && !value) {
            return "Required";
        }
        if (props.validator && typeof (props.validator) === "function") {
            return props.validator(value);
        }
        return undefined;
    }
};

export default validator;