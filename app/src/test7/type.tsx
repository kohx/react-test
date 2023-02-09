export interface Handles {
    commonRef: {
        spread: any;
        isError: Function;
    };
}

export interface ChildProps {
    options: any;
    lang: any;
    hideColumns: any;
    mode: any;
    widthType: any;
    metaDivision?: any;
    editMode?: any;
    setMessage?: Function;
    numberingRule?: any;
    category?: string;
    metaVersion?: string;
}

type Page = {
    num: number
    className: string
}

export type Paginate = {
    total: number
    current: number
    last: number
    start: number
    end: number
    pages: Page[]
}

