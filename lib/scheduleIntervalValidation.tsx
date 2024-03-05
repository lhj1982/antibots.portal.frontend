const rateRegex = /^rate\((\d+)\s+(minute|minutes|hour|hours|day|days)\)$/i;
const oneTimeCronRegex = /^cron\((\d{1,2}) (\d{1,2}) (\d{1,2}) (\d{1,2}) \? (\d{4})\)$/;
const recurringCronRegex = /^cron\((\d{1,2}) (\d{1,2}) \* \* \? (\*|\d{4})\)$/;
  

export const oneTimeTimeValidation = async (_: any, value: string) => {
    if(!value){
        return Promise.reject(new Error('Please enter a value'));
    }
    if(oneTimeCronRegex.test(value)){
        return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid Cron Expression! Minutes, Hours, Day-of-month, Month & Year are required'));
}

export const recurringAbsoluteValidation = async (_: any, value: string) => {
    if(!value){
        return Promise.reject(new Error('Please enter a value'));
    }
    if(recurringCronRegex.test(value)){
        return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid Cron Expression! Only Minutes & Hours are required'));
}

export const recurringRelativeValidation =  async (_: any, value: string) => {
    if(!value){
        return Promise.reject(new Error('Please enter a value'));
    }
    if(rateRegex.test(value)){
        return Promise.resolve();
    }
    return Promise.reject(new Error('Please enter a valid Rate Expression! Allowed Units: minute(s), hour(s), day(s)'));
}