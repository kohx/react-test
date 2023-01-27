import React from 'react'

import Basic from '@/components/typescript/Basic'
import TypeScript from '@/components/typescript/TypeScript'
import Interface from '@/components/typescript/Interface'
// import DefinitionFile from '@/components/typescript/DefinitionFile'
// import ForClass from '@/components/typescript/ForClass'
// import TypeAlias from '@/components/typescript/TypeAlias'
// import UnionIntersection from '@/components/typescript/UnionIntersection'
// import Generics from '@/components/typescript/Generics'
// import TypeInference from '@/components/typescript/TypeInference'
import ForReact from '@/components/typescript/ForReact'

export default () => {

    return (
        <div>
            {/* https://reffect.co.jp/html/hello-typescript-tutorial */}
            <h2>Basic</h2>
            <Basic />

            <h2>Interface</h2>
            <Interface />

            <h2>DefinitionFile</h2>
            {/* <DefinitionFile /> */}

            <h2>for Class</h2>
            {/* <ForClass /> */}

            <h2>Type Alias</h2>
            {/* <TypeAlias /> */}

            <h2>UnionIntersection</h2>
            {/* <UnionIntersection /> */}

            <h2>Generics</h2>
            {/* <Generics /> */}

            <h2>Type Inference</h2>
            {/* <TypeInference /> */}

            <h2>TypeScript</h2>
            <TypeScript />

            <h2>for React</h2>
            <ForReact />
        </div>
    )
}