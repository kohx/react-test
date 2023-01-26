import React from 'react'

import State from '@/components/hooks/State'
import Effect from '@/components/hooks/Effect'
import EffectDependentArray from '@/components/hooks/EffectDependentArray'
import EffectCreanup from '@/components/hooks/EffectCreanup'
import EffectEventListener from '@/components/hooks/EffectEventListener'
import Ref from '@/components/hooks/Ref'
import Memo from '@/components/hooks/memo/Memo'
import Callback from '@/components/hooks/callback/Callback'
import Custom from '@/components/hooks/custom/Custom'

export default () => {

    return (
        <div>
            <h1>Test3</h1>

            <h2>useState</h2>
            <State />

            <h2>useEffect</h2>
            <Effect />

            <h2>useEffect 依存配列</h2>
            <EffectDependentArray />

            <h2>useEffect クリーンアップ</h2>
            {/* <EffectCreanup /> */}

            <h2>useEffect イベントリスナー</h2>
            <EffectEventListener />

            <h2>useRef</h2>
            <Ref />

            <h2>useMemo</h2>
            <Memo />

            <h2>useCallback</h2>
            <Callback />

            <h2>useCustom</h2>
            <Custom />
        </div>
    )
}