import { constEditMode, constNumberingRule } from "@/test7Const";
import { ChildProps, Handles, Paginate } from '@/test7/type'


const handleResize = () => {

}

/**
 * isError
 * @param jRef 
 * @param props 
 * @returns 
 */
const isError = (jRef: any, props: ChildProps): boolean => {
    let isError = false;
    const sheet = jRef.current.jspreadsheet[0]
    // 入力エラーチェック
    const columns = sheet.getHeaders().split(",")

    // const rows = sheet.getColumnData(-1)
    const rows = sheet.getColumnData(1)

    // eslint-disable-next-line array-callback-return
    rows.map((row: Array<T>, rIndex: number) => {
        // eslint-disable-next-line array-callback-return
        // いづれかのカラムに入力があるかチェック
        const rowData = sheet.getRowData(rIndex);
        let isInput = false;
        for (let i = 0; i < rowData.length - 1; i++) {
            if (rowData[i]) {
                isInput = true;
            }
        }
        if (isInput) {
            columns.forEach((col: Array<T>, cIndex: number) => {
                const cell = sheet.getCellFromCoords(cIndex, rIndex)
                const value = sheet.getValueFromCoords(cIndex, rIndex)
                if (!inputCheck(sheet, cell, cIndex, rIndex, value, props.setMessage, 1, props)) {
                    isError = true;
                }
            })
        }
    })
    return isError;
}

/**
 * updatePatchVersion
 * 更新(作成中)の場合にパッチバージョンを返却
 * @param props 
 * @returns 
 */
const updatePatchVersion = (props: ChildProps): number => {
    //パッチバージョンを取得する
    if (props.editMode === constEditMode.update && props.metaVersion) {
        const versionArray = props.metaVersion.split(".")
        return parseInt(versionArray[2])
    } else {
        return 0
    }
}

/**
 * setRequireColumn
 * @param jRef 
 * @param options 
 */
const setRequireColumn = (jRef: any, options: any): void => {
    options.worksheets[0].columns.forEach((col: any, index: number) => {
        options.worksheets[0].columns.forEach((col: any, index: number) => {
            const header = jRef.current.jspreadsheet[0].headers[index]
            if (col.isRequire && header) {
                const pos = header.innerText.indexOf('*')
                if (pos === -1) {
                    header.innerText += " *";
                }
                header.style.backgroundColor = "#f2dede";
            } else if (header) {
                header.style.backgroundColor = "#cce3f6";
            }
        })
    })
}

/**
 * setColumnDetails
 * @param jRef 
 * @param options 
 * @param props 
 */
const setColumnDetails = (jRef: any, options: any, props: ChildProps): void => {
    // カラムから参照状態フラグ、表示順、追加対象外フラグのインデックスを取得
    let refIndex: number
    let seqIndex: number
    let notCoveredIndex: number
    let codeIndex: number
    const columns = options.worksheets[0].columns

    for (var i = 0; i < columns.length; i++) {
        //コード
        if (columns[i].metaKey === "code") {
            codeIndex = i;
            continue;
        }
        //参照状態フラグ
        if (columns[i].metaKey === "referenceMetaFlag") {
            refIndex = i;
            continue;
        }
        //並び順
        if (columns[i].metaKey === "seq") {
            seqIndex = i;
            continue;
        }
        //追加対象外フラグ
        if (columns[i].metaKey === "notCoveredFlag") {
            notCoveredIndex = i;
            continue;
        }
    }

    // 関連のあるメタの作成または新規バージョン登録
    if (
        // true
        props.editMode === constEditMode.copyRelationCreate || props.editMode === constEditMode.newVersionCreate
    ) {
        const rows = options.worksheets[0].data
        rows.forEach((row: Array<T>, i: number) => {
            row.forEach((value, j) => {
                // 参照フラグが2の場合は表示順と追加対象外フラグ以外は変更不可にする
                if (rows[i][refIndex] === "2" && j !== seqIndex + 1 && j !== notCoveredIndex + 1) {
                    // セルを取得
                    const cell = jRef.current.jspreadsheet[0].getCellFromCoords(j, i)
                    jRef.current.jspreadsheet[0].setReadOnly(cell, true)
                }
            })
        })
    }
    // 承認済みの更新またはパッチバージョンが1以上の更新(作成中)
    else if (
        // false
        props.editMode === constEditMode.approvedNewVersionCreate || updatePatchVersion(props) > 0
    ) {
        const rows = options.worksheets[0].data
        // 参照状態フラグからセルの変更可否を設定
        rows.forEach((row: Array<T>, i: number) => {
            row.forEach((value: any, k: number) => {
                // 追加対象外フラグについては参照フラグの値に関わらず変更不可
                // 参照フラグが1または2の場合は表示順以外も変更不可にする
                if (k === notCoveredIndex + 1 || k === codeIndex + 1 || ((value === "1" || rows[i][refIndex] === "2") && k !== seqIndex + 1)) {
                    // セルを取得
                    const cell = jRef.current.jspreadsheet[0].getCellFromCoords(k, i)
                    jRef.current.jspreadsheet[0].setReadOnly(cell, true)
                }
            })
        })
    }
    // 更新（作成中）
    else if (
        // true
        props.editMode === constEditMode.update
    ) {
        // 参照状態フラグからセルの変更可否を設定
        const rows = options.worksheets[0].data
        rows.forEach((row: Array<T>, i: number) => {
            row.forEach((value, l) => {
                //参照フラグが2の場合は表示順以外は変更不可にする
                if (rows[i][refIndex] === "2" && l !== seqIndex + 1 && l !== notCoveredIndex + 1) {
                    // セルを取得
                    const cell = jRef.current.jspreadsheet[0].getCellFromCoords(l, i)
                    jRef.current.jspreadsheet[0].setReadOnly(cell, true)
                }
            })
        })
    }
}

/**
 * createPaginate
 * @param total 
 * @param current 
 * @returns 
 */
const per = 1
const frow = 2
const divide = frow * 2 + 1
const createPaginate = (total: number, current: number): Paginate => {
    let last = (Math.ceil(total / per))
    const forward = frow
    const backward = last - frow + 1
    let start = null
    let end = null

    if (last < divide) {
        start = 1
        end = last
    } else {
        if (forward >= current) {
            start = 1
            end = divide;
        } else if (backward <= current) {
            start = last - divide + 1
            end = last
        } else {
            start = current - frow;
            end = current + frow;
        }
    }

    let pages = []
    for (let i = start; i <= end; i++) {
        pages.push({
            num: i,
            className: current === i ? 'pagination__item pagination__item--selected' : 'pagination__item'
        })
    }

    return { total, current, last, start, end, pages }
}

/**
 * changeReadOnlyCell
 * @param props 
 * @param options 
 */
const changeReadOnlyCell = (props: ChildProps, options: any): void => {
    // モード１
    if (props.mode === 1) {
        // セルの編集不可
        options.worksheets[0].columns.map((column: any) => column.readOnly = true)
    }
    // モード２
    else if (props.mode === 2) {
        options.worksheets[0].columns.map((column: any) => {
            // 関連のあるメタの作成
            if (props.editMode === constEditMode.copyRelationCreate) {
                if (column.title === "コード" && props.numberingRule === constNumberingRule.auto) {
                    return (column.readOnly = true);
                } else {
                    return (column.readOnly = false);
                }
            } else {
                if (column.title === "ID") {
                    return (column.readOnly = true);
                } else if (column.title === "コード" && props.numberingRule === constNumberingRule.auto) {
                    return (column.readOnly = true);
                } else {
                    return (column.readOnly = false);
                }
            }
        });
    }
}

/**
 * contextMenu
 * コンテキストメニュー
 * @param obj  - Instance of the active worksheet
 * @param x  - column number
 * @param y  - row number
 * @param e  - mouse event handler
 * @param items  - default contextmenu items
 * @param section  - section clicked. Sections: nested | header | row | cell | selectall | tabs | cloning | toolbar | footer
 * @param props 
 * @returns 
 */
const contextMenu = (obj: any, x: any, y: any, e: any, items: any[], section: any, props: ChildProps) => {
    var items = [];
    var isUpdatePatchVersionUp = false;

    //パッチバージョンアップまたは更新(作成中)のパッチバージョンが1以上
    if (props.editMode === constEditMode.approvedNewVersionCreate || updatePatchVersion(props) > 0) {
        isUpdatePatchVersionUp = true;
    }

    if (y == null) {
        // 並び替え
        if (obj.options.columnSorting === true) {
            items.push({
                title: "並び替え（昇順）",
                onclick: function () {
                    obj.orderBy(x, 0);
                },
            });
            items.push({
                title: "並び替え（降順）",
                onclick: function () {
                    obj.orderBy(x, 1);
                },
            });
        }
    } else {
        // 行追加(パッチバージョンアップのパターン以外)
        if (obj.options.allowInsertRow === true && !isUpdatePatchVersionUp) {
            items.push({
                title: "行追加（前に追加）",
                onclick: function () {
                    obj.insertRow(1, parseInt(y), 1);
                    for (
                        var i = 0;
                        i < obj.rows[parseInt(y) + 1].childNodes.length;
                        i++
                    ) {
                        obj.rows[parseInt(y)].childNodes[i].style.display = obj.rows[parseInt(y) + 1].childNodes[i].style.display;
                    }
                },
            });

            items.push({
                title: "行追加（後に追加）",
                onclick: function () {
                    obj.insertRow(1, parseInt(y));
                    for (var i = 0; i < obj.rows[parseInt(y)].childNodes.length; i++) {
                        obj.rows[parseInt(y) + 1].childNodes[i].style.display =
                            obj.rows[parseInt(y)].childNodes[i].style.display;
                    }
                },
            });
        }

        //行削除(パッチバージョンアップのパターン以外)
        if (obj.options.allowDeleteRow === true && !isUpdatePatchVersionUp) {
            items.push({
                title: "行削除",
                onclick: function () {
                    obj.deleteRow(
                        obj.getSelectedRows().length ? undefined : parseInt(y)
                    );
                },
            });
        }

        //切り取り
        items.push({
            title: "切り取り",
            shortcut: "Ctrl + X",
            onclick: function () {
                obj.copy(true);
                obj.setValue(obj.highlighted, "");
            },
        });

        //コピー
        items.push({
            title: "コピー",
            shortcut: "Ctrl + C",
            onclick: function () {
                obj.copy(true);
            },
        });

        //ペースト
        if (navigator && navigator.clipboard && navigator.clipboard.readText) {
            items.push({
                title: "ペースト",
                shortcut: "Ctrl + V",
                onclick: function () {
                    if (obj.selectedCell) {
                        navigator.clipboard.readText().then(function (text) {
                            if (text) {
                                obj.paste(obj.selectedCell[0], obj.selectedCell[1], text);
                            }
                        });
                    }
                },
            });
        }
    }

    return items;
};

/**
 * getRowName
 * @param x 
 * @param y 
 * @returns 
 */
const getRowName = (x: number, y: number): string => {
    const col = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(Number(x), Number(x) + 1)
    return col + (Number(y) + 1)
};

/**
 * onSelection
 * @param obj 
 * @param px 
 * @param py 
 * @param ux 
 * @param uy 
 * @param setMessage 
 */
const onSelection = (obj: any, px: number, py: number, ux: number, uy: number, setMessage: Function | undefined): void => {

    //クリックしたセルがコンボボックスの場合はリストを展開する
    if (obj.getColumn(px).type === "dropdown") {
        const cell = obj.getCellFromCoords(px, py)
        cell.onclick = () => {
            obj.openEditor(cell, true);
        }

        if (setMessage) {
            const cellName = getRowName(px, py)
            const message = obj.getComments(cellName)
            setMessage(message);
        }
    }
};

/**
 * inputCheck 
 * @param obj - worksheetInstance
 * @param cell - borderLeft
 * @param x 
 * @param y 
 * @param newValue 
 * @param setMessage 
 * @param mode 
 * @param props 
 * @returns
 */
const inputCheck = (obj: any, cell: any, x: number, y: number, newValue: any, setMessage: Function | undefined, mode: any, props: ChildProps): boolean => {
    const column = obj.getColumn(x)
    const maxLength = column.maxLength
    const format = column.cFormat
    const value = typeof newValue === 'string' ? newValue.trim() : newValue
    const itemName = column.title
    const type = column.type
    const require = column.isRequire
    const cellName = getRowName(x, y)

    // 必須チェック
    if (mode === 1 && type !== "hidden") {
        if (require && (!value || value.length < 1)) {
            cell.style.backgroundColor = "#f2dede"
            cell.errorMessage = `${itemName}：必須入力です。`
            obj.setComments(cellName, cell.errorMessage);
            return false
        }
    }

    // 入力チェック
    if (value && maxLength && value.length > maxLength) {
        cell.style.backgroundColor = "#f2dede"
        cell.errorMessage = `${itemName}：最大${maxLength}：文字です。`
        obj.setComments(cellName, cell.errorMessage)
        return false
    }

    // フォーマットチェック
    if (format && value) {
        const formatParam = new RegExp(format);
        if (!formatParam.test(value)) {
            cell.style.backgroundColor = "#f2dede";
            cell.errorMessage = `${itemName}：入力型式が不正です。`;
            obj.setComments(cellName, cell.errorMessage)
            return false;
        }
    }

    //
    if (props.setMessage) props.setMessage();

    obj.setComments(cellName, ``)
    //自動採番の場合はコードの背景色はグレー
    if (x === 0 && props.numberingRule === constNumberingRule.auto) {
        cell.style.backgroundColor = "#f3f3f3";
    } else {
        cell.style.backgroundColor = "#fff";
    }
    return true
}

/**
 * onChange is alias of inputCheck
 * @param obj 
 * @param cell 
 * @param x 
 * @param y 
 * @param newValue 
 * @param setMessage 
 * @param mode 
 * @param props 
 * @returns 
 */
const onChange = (obj: any, cell: any, x: number, y: number, newValue: any, setMessage: Function | undefined, mode: any, props: ChildProps): boolean => {
    return inputCheck(obj, cell, x, y, newValue, setMessage, mode, props)
}

export default { handleResize, isError, setRequireColumn, setColumnDetails, createPaginate, changeReadOnlyCell, contextMenu, onSelection, inputCheck, onChange }