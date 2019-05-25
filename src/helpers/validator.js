const storage = require('../helpers/storage');

module.exports = (() => {

    storage.saveAsJson('validator', {});

    function validateFormData(dataObj, formName) {
        let formsValidation = {
            register: regLoginValidation,
            login: regLoginValidation,
            create: createEditValidation,
            edit: createEditValidation
        };

        function regLoginValidation(dataObj, key) {
            let currentInput = $(`[name=${key}]`);

            switch (key) {
                case 'username':
                    const usernameRegex = RegExp('^[A-Za-z]{5,}$');
                    usernameRegex.test(dataObj[key])
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Field must contains 5 or more latin letters!');
                    break;

                case 'password':
                case 'checkPass':
                    const passwordRegex = RegExp('^[^\\s]+$');
                    passwordRegex.test(dataObj[key])
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Field can\'t be empty or contains spaces!');
                    break;
            }
        }

        function createEditValidation(dataObj, key) {
            let currentInput = $(`[name=${key}]`);

            switch (key) {
                case 'destination':
                case 'origin':
                case 'departureDate':
                case 'departureTime':
                    const fieldRegex = RegExp('^.+$');
                    fieldRegex.test(dataObj[key])
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Field can\'t be empty!');
                    break;

                case 'seats':
                    const seatsRegex = RegExp('^[0-9]+$');
                    seatsRegex.test(dataObj[key])
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Field must be positive number!');
                    break;

                case 'cost':
                    const costRegex = RegExp('^[0-9]+\\.?[0-9]{0,2}$');
                    costRegex.test(dataObj[key])
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Field must be positive number with two digits after decimal point!');
                    break;

                case 'img':
                    const imageRegex = RegExp('^(http){1}.+$');
                    imageRegex.test(dataObj[key])
                        ? validInput(currentInput)
                        : invalidInput(currentInput, 'Invalid URL!');
                    break;
            }
        }

        for (let key in dataObj) {
            formsValidation[formName](dataObj, key);
        }
    }

    function isFormValid() {
        const formValidations = storage.getJson('validator');
        return !Object.values(formValidations).includes('invalid');
    }

    async function validInput(jqueryElement) {
        const inputName = jqueryElement.attr('name');
        storage.saveToValidator(inputName, 'valid');
        await $(`#${inputName}`)
            .hide('slow', () => {
                $(`#${inputName}`).remove();
            });
    }

    async function invalidInput(jqueryElement, message) {
        const inputName = jqueryElement.attr('name');
        storage.saveToValidator(inputName, 'invalid');

        await $(`#${inputName}`)
            .fadeOut('fast')
            .remove();
        const errorDiv = $(`<div id="${inputName}" class="feedback text-danger">${message}</div>`);

        await jqueryElement.after(errorDiv);
        await errorDiv.fadeIn('slow');
    }

    function escapeSpecialChars(dataObj, excludeArr) {
        let result = {};

        function escape(string) {
            let escape = $('<p></p>');
            escape.text(string);

            return escape.text();
        }

        for (let key in dataObj) {
            if (excludeArr.includes(key)) {
                result[key] = dataObj[key];
            } else {
                result[key] = escape(dataObj[key]);
            }
        }

        return result;
    }

    return {
        validateFormData,
        isFormValid,
        escapeSpecialChars
    }
})();