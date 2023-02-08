import { constEditMode, constNumberingRule } from "@/test7Const";

/**
 * 
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

const changeReadOnlyCell = (fetchMode, options) => {
    if (fetchMode === 1) {
        // セルの編集不可
        options.worksheets[0].columns.map(column => column.readOnly = true)
    }
    // ?????
    else if (fetchMode === 2) {
        options.worksheets[0].columns.map(column => {
            // 関連のあるメタの作成
            if (fetch.editMode === constEditMode.copyRelationCreate) {
                if (
                    column.title === "コード" &&
                    fetch.numberingRule === constNumberingRule.auto
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
                    fetch.numberingRule === constNumberingRule.auto
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
 * 更新(作成中)の場合にパッチバージョンを返却
 * @param {Object} props 
 * @returns 
 */
const updatePatchVersion = (props) => {
    //パッチバージョンを取得する
    if (fetch.editMode === constEditMode.update && props.metaVersion) {
        const versionArray = metaVersion.split(".")
        return parseInt(versionArray[2])
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
    if (fetch.editMode === constEditMode.approvedNewVersionCreate || (updatePatchVersion() && updatePatchVersion() > 0)) {
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
 * onChange
 * @param {Object} obj - worksheetInstance
 * @param {DOMElement} cell - borderLeft
 * @param {Number} x
 * @param {Number} y
 * @param {Any} newValue
 * @param {Number} mode
 * @returns {void}
 */
const onChange = (obj, cell, x, y, newValue, setMessage, mode) => {
    const column = obj.getColumn(x)
    const maxLength = column.maxLength
    const format = column.cFormat
    const value = newValue.trim()
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
    if (x === 0 && numberingRule === constNumberingRule.auto) {
        cell.style.backgroundColor = "#f3f3f3";
    } else {
        cell.style.backgroundColor = "#fff";
    }
    return true
}

export default { setRequireColumn, changeReadOnlyCell, contextMenu, onSelection, onChange }