import { User } from './../models/user';
export class Utils {
    public static JoinToLowerCase(property: string): string {
        var p = property.replace(/\s+/g, '');
        return property.charAt(0).toLowerCase() + p.slice(1);
    }
    public static CheckTime(i) {
        if (i < 10) i = "0" + i;
        return i;
    }
    public static IsJSON(string) {
        try       { JSON.parse(string); }
        catch (e) { return false; }
        return true;
    }
    public static moveArray(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
    }
}
export enum DataSignals {
    RequestingVideo,
    AcceptingVideo,
    DenyingVideo
}
export class SearchUserData {
    name: string;
    count: number;
    users: User[];
}