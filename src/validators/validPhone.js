
export const validPhone = async(phone) => {
    const regex = /^\+?(\d{1,3})?[-.\s]?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/
    return regex.test(phone)
}