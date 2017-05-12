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
    public static ObjectKeysToLowerCase(obj: any): any {
        var key, keys = Object.keys(obj);
        var n = keys.length;
        var newobj = {};
        while (n--) {
            key = keys[n];
            //newobj[key.toLowerCase()] = obj[key];
            if (key == 'ID')
                newobj[key.toLowerCase()] = obj[key];
            else
                newobj[key.charAt(0).toLowerCase() + key.slice(1)] = obj[key];

        }
        return newobj;
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
export class PreferenceData {
    public static genders: Array<string> = ['Man', 'Woman ', 'Anyway'];
    public static hcolors: Array<string> = ['Black', 'Brown', 'Red', 'Blond'];
    public static ecolors: Array<string> = ['Grey', 'Green', 'Blue'];
    public static hobbies: Array<string> = ['Football', 'Basketball', 'Golf', 'Other'];
}
export class ProgressPrice {
    public static basic: number = 10;
    public static details: number = 1;
    public static matchquestions: number = 10;
    public static feedbacks: number = 10;
}