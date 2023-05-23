type UserErrorMessageType = {
    incorrectId: (id: number) => string;
    redundantId: (id: number) => string;
    notFound: (id: number) => string;
};
export type { UserErrorMessageType as UserErrMessType };
