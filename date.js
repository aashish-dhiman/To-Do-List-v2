const { get } = require("express/lib/request");

const getDate = function () {  
    const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    return new Date().toLocaleDateString("en-US", options);
};
module.exports = getDate;
