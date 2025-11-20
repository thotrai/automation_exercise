export function generateRandomEmail(): string {
    const randomString = Math.random().toString(36).substring(2, 12);
    return `${randomString}@gmail.com`;
}

export function generateStrongPassword(length: number=12): string {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}<>?';
    const allChars = upper + lower + numbers + symbols;

    let password = '';
    password += upper[Math.floor(Math.random() * upper.length)];
    password += lower[Math.floor(Math.random() * lower.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password
        .split('')
        .sort(() => Math.random() - 0.5)
        .join('');
}