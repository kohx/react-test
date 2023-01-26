import React, { useEffect, useRef } from 'react'

// 配列
const ArrayList = ({ items = [] }) => {
    return (
        <>
            {items.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </>
    );
}

// 配列とインデクス
const ArrayIndexList = ({ items = [] }) => {
    return (
        <>
            {items.map((item, index) => (
                <li key={index}>{index}: {item}</li>
            ))}
        </>
    );
}

// オブジェクトの配列
// アイテムコンポネント
const ObjectItem = ({ index, name, age }) => {
    return (
        <>
            <li>index: {index} name: {name} age: {age}</li>
        </>
    )
}

// リストコンポネント
const ObjectList = ({ items = [] }) => {
    return (
        <>
            {items.map((item, index) => (                
                <ObjectItem key={index} index={index} name={item.name} age={item.age} />
            ))}
        </>
    );
}

// フィルタ
const FilterList = ({ items = [] }) => {

    const filterdItems = items.filter((item) => item.age >= 20);

    return (
        <>
            {filterdItems.map((item, index) => (                
                <ObjectItem key={index} index={index} name={item.name} age={item.age} />
            ))}
        </>
    );
}

export default () => {

    const arraayItems = ['John', 'Joe', 'Kevin'];
    const objectItems = [
        { name: 'John', age: 19 },
        { name: 'Joe', age: 24 },
        { name: 'Kevin', age: 22 },
    ];;

    return (
        <>
            <div>array</div>
            <ul><ArrayList items={arraayItems} /></ul>
            <div>array index</div>
            <ul><ArrayIndexList items={arraayItems} /></ul>
            <div>object</div>
            <ul><ObjectList items={objectItems} /></ul>
            <div>filter</div>
            <ul><FilterList items={objectItems} /></ul>
        </>
    )
}
