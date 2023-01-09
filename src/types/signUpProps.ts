export interface signInProps {
	email: string;
	password: string;
}

export interface signUpProps extends signInProps {
	name: string;
}
