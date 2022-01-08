export declare const stylesheet: (prelude: any, statements: any) => string;
export declare const ruleset: (selector: any, declarations: any) => {
    kind: string;
    selector: any;
    declarations: any;
};
export declare const atrule: (query: any, rulesets: any) => {
    kind: string;
    query: any;
    rulesets: any;
};
