export interface Question {
    id: number;
    value: string;
    paragraph: string;
    possibleAnswer: PossibleAnswer[];
    goodAnswer: string;
}

export interface PossibleAnswer {
    id: string;
    value: string;
}