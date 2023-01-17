import React from 'react'
import ContentC1 from '@/components/contentA/contentB/contentC/ContentC1'
import ContentC2 from '@/components/contentA/contentB/contentC/ContentC2'
import ContentC3 from '@/components/contentA/contentB/contentC/ContentC3'

export default () => {
    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            <p>ContentB</p>
            <ContentC1 />
            <ContentC2 />
            <ContentC3 />
        </div>
    )
}