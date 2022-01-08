declare class ClassnameBuilder {
    private classnameCache;
    private hashes;
    constructor();
    getMinifiedClassname(classname: any): any;
    static minify(classname: any, incrementor: any): string;
    static hashStrToInt(s: any): number;
    static encodeInt(int: any, minLength: any, maxLength: any): string;
}
declare const instance: ClassnameBuilder;
export default instance;
