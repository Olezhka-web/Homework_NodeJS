const arrUsers = [];

module.exports = {
    arrUsers,
    getDataFromDb: (data) => {
        if (data.trim() !== '') {
            JSON.parse(data).map((value) => arrUsers.push(value));
        }
    }
};
