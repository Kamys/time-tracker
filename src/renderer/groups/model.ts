export interface IGroup {
    id: string;
    name: string;
    description: string;
    image: string;
    /**
     * Regular expressions used for match group with activities
     */
    regExp: string;
}
