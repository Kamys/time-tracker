export interface IModalAction {
    title: string;
    onClick: (entity) => void;
}

export interface IFormProps {
    entity: object;
    actions: IModalAction[];
    header: string;
}
