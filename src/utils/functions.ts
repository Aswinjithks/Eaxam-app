export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatAnswer = (answer: string | string[] | { [key: string]: string }) => {
    if (typeof answer === 'object' && !Array.isArray(answer)) {
        return Object.entries(answer).map(([key, value]) => `${key}: ${value}`).join(', ');
    }
    if (Array.isArray(answer)) {
        return answer.join(', ');
    }
    return answer;
};