export type bool = 0 | 1;

export interface IImageItem {
    farm: number;
    id: string;
    isfamily: bool;
    isfriend: bool;
    ispublic: bool;
    owner: string;
    secret: string;
    server: string;
    title: string;
}

export interface IResult {
    photos: {
        page: number;
        pages: number;
        total: number;
        perpage: number;
        photo: IImageItem[];
    }
}

export interface IParams {
    [key: string]: string;
}