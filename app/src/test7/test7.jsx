import { constEditMode, constNumberingRule } from "@/test7Const";

/**
 * isError
 * @param {Element} jRef
 * @returns {Boolean}
 */
const isError = (jRef) => {
    let isError = false;
    const sheet = jRef.current.jspreadsheet[0]
    // 入力エラーチェック
    const columns = sheet.getHeaders().split(",")

    // const rows = sheet.getColumnData(-1)
    const rows = sheet.getColumnData(1)

    // eslint-disable-next-line array-callback-return
    rows.map((row, rIndex) => {
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
            columns.forEach((col, cIndex) => {
                const cell = sheet.getCellFromCoords(cIndex, rIndex)
                const value = sheet.getValueFromCoords(cIndex, rIndex)
                if (!func.inputCheck(sheet, cell, cIndex, rIndex, value, props.setMessage, 1)) {
                    isError = true;
                }
            })
        }
    })
    return isError;
}

/**
 * 更新(作成中)の場合にパッチバージョンを返却
 * @param {Object} props 
 * @returns 
 */
const updatePatchVersion = (props) => {

    //パッチバージョンを取得する
    if (props.editMode === constEditMode.update && props.metaVersion) {
        const versionArray = metaVersion.split(".")
        return parseInt(versionArray[2])
    }
}

/**
 * setRequireColumn
 * @param {Element} jRef 
 * @param {Object} options 
 */
const setRequireColumn = (jRef, options) => {
    options.worksheets[0].columns.forEach((col, index) => {
        if (col.isRequire) {
            jRef.current.jspreadsheet[0].headers[index].innerText += " *";
            jRef.current.jspreadsheet[0].headers[index].style.backgroundColor = "#f2dede";
        } else {
            jRef.current.jspreadsheet[0].headers[index].style.backgroundColor = "#cce3f6";
        }
    })
}

const setColumnDetails = (jRef, options, props) => {

    // カラムから参照状態フラグ、表示順、追加対象外フラグのインデックスを取得
    let refIndex
    let seqIndex
    let notCoveredIndex
    let codeIndex
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
        rows.forEach((row, i) => {
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
        props.editMode === constEditMode.approvedNewVersionCreate || (updatePatchVersion(props) && updatePatchVersion(props) > 0)
    ) {
        const rows = options.worksheets[0].data
        // 参照状態フラグからセルの変更可否を設定
        rows.forEach((row, i) => {
            row.forEach((value, k) => {
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
        rows.forEach((row, i) => {
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
 * @param {Number} total 
 * @param {Number} current 
 * @returns 
 */
const per = 1
const frow = 2
const divide = frow * 2 + 1
const createPaginate = (total, current) => {
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

    return { last, start, end, pages }
}

/**
 * changeReadOnlyCell
 * @param {Number} fetchMode 
 * @param {Object} options 
 */
const changeReadOnlyCell = (options, props) => {
    // モード１
    if (props.mode === 1) {
        // セルの編集不可
        options.worksheets[0].columns.map(column => column.readOnly = true)
    }
    // モード２
    else if (props.mode === 2) {
        options.worksheets[0].columns.map(column => {
            // 関連のあるメタの作成
            if (props.editMode === constEditMode.copyRelationCreate) {
                if (
                    column.title === "コード" &&
                    props.numberingRule === constNumberingRule.auto
                ) {
                    return (column.readOnly = true);
                } else {
                    return (column.readOnly = false);
                }
            } else {
                if (column.title === "ID") {
                    return (column.readOnly = true);
                } else if (
                    column.title === "コード" &&
                    props.numberingRule === constNumberingRule.auto
                ) {
                    return (column.readOnly = true);
                } else {
                    return (column.readOnly = false);
                }
            }
        });
    }
}

/**
 * コンテキストメニュー
 * @param {Object} obj - Instance of the active worksheet
 * @param {Number} x - column number
 * @param {Number} y - row number
 * @param {Object} e - mouse event handler
 * @param {Array} items - default contextmenu items
 * @param {String} section - section clicked. Sections: nested | header | row | cell | selectall | tabs | cloning | toolbar | footer
 * @returns {Array}
 */
const contextMenu = (obj, x, y, e, items, section) => {
    var items = [];
    var isUpdatePatchVersionUp = false;

    //パッチバージョンアップまたは更新(作成中)のパッチバージョンが1以上
    if (props.editMode === constEditMode.approvedNewVersionCreate || (updatePatchVersion(props) && updatePatchVersion(props) > 0)) {
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
                        obj.rows[parseInt(y)].childNodes[i].style.display =
                            obj.rows[parseInt(y) + 1].childNodes[i].style.display;
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
 * @param {Number} x 
 * @param {Number} y 
 * @returns {String}
 */
const getRowName = (x, y) => {
    const col = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(Number(x), Number(x) + 1)
    return col + (Number(y) + 1)
};

/**
 * onSelection
 * @param {Object} obj - worksheetInstance
 * @param {Number} px - borderLeft
 * @param {Number} py - borderTop
 * @param {Number} ux - borderRight
 * @param {Number} uy - borderBottom
 * @param {Object} origin
 * @returns {void}
 */
const onSelection = (obj, px, py, ux, uy, setMessage) => {

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
 * @param {Object} obj - worksheetInstance
 * @param {DOMElement} cell - borderLeft
 * @param {Number} x
 * @param {Number} y
 * @param {Any} newValue
 * @param {Number} mode
 * @returns {void}
 */
const inputCheck = (obj, cell, x, y, newValue, setMessage, mode) => {
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

    setMessage();
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
 * @param {Object} obj - worksheetInstance
 * @param {DOMElement} cell - borderLeft
 * @param {Number} x
 * @param {Number} y
 * @param {Any} newValue
 * @param {Number} mode
 * @returns {void}
 */
const onChange = (obj, cell, x, y, newValue, setMessage, mode) => {
    return inputCheck(obj, cell, x, y, newValue, setMessage, mode)
}

export default { isError, setRequireColumn, setColumnDetails, createPaginate, changeReadOnlyCell, contextMenu, onSelection, inputCheck, onChange }