export interface IUserContext {
    user?: {
        name: string;
        email: string;
    } | null;
    isLoading: boolean;
}

export interface IUserType {
    _id: string,
	username: string,
	email: string,
	createdAt: string,
	updatedAt: string,
	__v: number
}