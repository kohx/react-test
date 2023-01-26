import React from 'react'
import ContentC1 from '@/components/content/contentA/contentB/contentC/ContentC1'
import ContentC2 from '@/components/content/contentA/contentB/contentC/ContentC2'
import ContentC3 from '@/components/content/contentA/contentB/contentC/ContentC3'

export default () => {
    return (
        <div style={{border: '1px solid gray', padding: '10px'}}>
            <p>ContentB</p>
            <ContentC1 />
            <br />
            <ContentC2 />
            <br />
            <ContentC3 />
        </div>
    )
}