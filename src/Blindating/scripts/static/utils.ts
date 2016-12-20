export class Utils {
    public static JoinToLowerCase(property: string): string {
        var p = property.replace(/\s+/g, '');
        return property.charAt(0).toLowerCase() + p.slice(1);
    }
    public static CheckTime(i) {
        if (i < 10) i = "0" + i;
        return i;
    }
}
export enum DataSignals {
    RequestingVideo,
    AcceptingVideo,
    DenyingVideo
}
export class SearchData {
    name: string;
    count: number;
    users: User[];
}