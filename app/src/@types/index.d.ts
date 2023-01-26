// 1. @typesディレクトリ配下にindex.d.tsを作成
// 2. tsconfig.jsonのincludeに@types/index.d.tsを追記

type Test = {
    name: string;
    age: number;
}

type T = number;