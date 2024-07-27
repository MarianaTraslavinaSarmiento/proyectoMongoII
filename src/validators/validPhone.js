
export const validPhone = (phone) => {
    const regex = /^(\+57|57)?[ -]?3(\d{2})[ -]?(\d{3})[ -]?(\d{4})$/;
    return regex.test(phone)
}