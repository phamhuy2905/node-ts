const genereateNumber = (): number => {
    const number = Math.random();
    if (number < 0.1) return genereateNumber();
    return number;
};

const generateOtp = (): number => {
    return Math.floor(genereateNumber() * 10000);
};

export default generateOtp;
