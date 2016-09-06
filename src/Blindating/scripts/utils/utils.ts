export class Utils {
    public static CheckTime(i) {
        if (i < 10) i = "0" + i;
        return i;
    }
}