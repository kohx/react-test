import React from 'react'

import FormUseState from '@/components/form/FormUseState'
import FormUseRef from '@/components/form/FormUseRef'
import Select from '@/components/form/Select'

export default () => {

    return (
        <div>
            <h2>form useState</h2>
            <FormUseState />

            <h2>form useRef</h2>
            <FormUseRef />

            <h2>form select</h2>
            <Select />
        </div>
    )
}