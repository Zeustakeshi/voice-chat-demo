const getAccessToken = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
        return JSON.parse(access_token);
    } else return "";
};

export default getAccessToken;
