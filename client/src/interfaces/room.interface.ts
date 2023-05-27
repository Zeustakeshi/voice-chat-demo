export interface IRoom {
    name: string;
    id: string;
}

export interface IMeeting {
    roomid: string;
    id: string;
    createdat: string;
    endedat?: string;
}
