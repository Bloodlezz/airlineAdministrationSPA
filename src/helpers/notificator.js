module.exports = (() => {

    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        infoBox.find('span').html(message);
        infoBox.show();
        setTimeout(() => infoBox
            .fadeOut(
                () => {
                    infoBox.find('span').html('');
                }), 3000);
    }

    async function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.find('span').html(message);
        errorBox.show();
        setTimeout(() => errorBox
            .fadeOut(
                () => {
                    errorBox.find('span').html('');
                }), 3000);
    }

    function showLoading() {
        let loadingBox = $('#loadingBox');
        loadingBox.show();
    }

    function hideLoading() {
        let loadingBox = $('#loadingBox');
        setTimeout(() => loadingBox.fadeOut(), 500);
    }

    return{
        handleError,
        showInfo,
        showError,
        showLoading,
        hideLoading
    }
})();