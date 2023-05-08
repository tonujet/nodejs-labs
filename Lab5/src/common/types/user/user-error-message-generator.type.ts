type UserErrorMessageGeneratorType = {
    incorrectId: (id: number) => string,
    redundantId: (id: number) => string,
    notFound: (id: number) => string,
}
export type {UserErrorMessageGeneratorType};