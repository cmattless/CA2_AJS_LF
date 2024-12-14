
interface IGenericModel {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface IWorldType  extends IGenericModel {
	name: string;
	description: string;
	owner: string;
	events: string[];
	year: number;
	collaborators?: string[];
	magicSystem: string;
}

export interface IUserType extends IGenericModel {
	username: string;
	email: string;
}

export interface ICharacterType extends IGenericModel {
    name: string;
    profession: string;
    description: string;
    factions: string[];
    stats?: {strength: number, agility: number, intelligence: number};
    abilities?: string[];
    owner: string;
}

export interface IFactionType extends IGenericModel {
    name: string;
    type: string;
    description: string;
    characters: string[];
    allies?: string[];
    enemies?: string[];
    owner: string;
}
