/**
 * コード内で使用する定数を定義
 */

//編集モード
export const constEditMode = {
  newCreate: 1,
  newVersionCreate: 2,
  copyRelationCreate: 3,
  copyAnotherCreate: 4,
  update: 5,
  approvedNewVersionCreate: 6,
};
//言語
export const constLang = {
  ja: "1",
  en: "2",
};
//メタ区分(一覧コンボボックス)
export const constMetaDivision = {
  all: "-1",
  common: "crossDomain",
  survey: "other",
  another: "another",
};
//状態(コンボボックス)
export const constStatus = {
  all: "-1",
  create: "0",
  approvalPending: "1",
  approved: "2",
};
//種類(コンボボックス)
export const constType = {
  all: "-1",
  area: "area",
  time: "time",
  dimension: "dimension",
  unit: "unit",
  unitMulti: "unitMulti",
  obsStatus: "obsStatus",
  measure: "measure",
  statisticalMeasure: "statisticalMeasure",
};
//バージョン
export const constVersion = {
  all: 0, //全てのバージョン
  latest: 1, //最新バージョンのみ
  latest2: 2, //最新のパッチバージョン
};
//apiエラーコード
export const constApiErr = {
  failed: -2,
};
//apiアップデート
export const constOperation = {
  update: 1,
  approval: 2,
};
//メタキー
export const constMetaKey = {
  code: "code",
  version: "version",
  type: "type",
  metaDivision: "metaDivision",
  lang: "lang",
  relations: "relations",
  status: "status",
  statCode: "statCode",
  names: "names",
  namesJa: "names.ja",
  updateTime: "updateDateTime",
  approvalFlag: "approvalFlag",
  supportCode: "supportCode",
  annotationJa: "annotations.ja",
};
//モーダル画面ボタンスタイル
export const constBtnStyle = {
  button: 0,
  div: 1,
};
//概要画面URL
export const constEditUrl = {
  addMode: "Add",
  editMode: "Edit",
};
//inputタイプ
export const constInputType = {
  text: "text",
  combo: "combo",
  textArea: "textarea",
  radio: "radio",
};
//言語(メタデータキー)
export const constLangKey = {
  ja: "ja",
  en: "en",
};
//テーブルヘッダ
export const constTableHead = {
  metaDivision: "1",
  type: "2",
  code: "3",
  names: "4",
  version: "5",
  status: "6",
  updateTime: "7",
};
//概要画面プログレスバー
export const constEditProgress = {
  overview: 1,
  code: 2,
  confirm: 3,
};
//新規登録設定画面プログレスバー(モーダル)
export const constCreateProgress = {
  selectCreate: 1,
  selectMeta: 2,
  selectType: 3,
  searchMeta: 4,
  selectRef: 5,
  confirm: 6,
};
//位置調整用の余白
export const constSpace = "　　　";
//登録時のコード採番ルール
export const constNumberingRule = {
  auto: "1",
  arbitraryInput: "2",
};
//ユーザー権限
export const constUserRole = {
  general: 1,
  ministry: 2,
  management: 3,
};
//関連コード
export const constRelationCode = {
  related: "1",
  match: "2",
};
//検索画面の選択モード
export const constSelectMode = {
  singleSelect: 1,
  multiSelect: 2,
};
//relationメタキー
export const constRelationKey = {
  relationCode: "relations.relationCode",
  code: "relations.code",
  version: "relations.version",
  namesJa: "relations.names.ja",
  namesEn: "relations.names.en",
};
//テンプレートのダウンロード画面プログレスバー
export const constDownloadTemplateProgress = {
  selectCategory: 1,
  selectUse: 2,
  selectMeta: 3,
  selectType: 4,
  searchMeta: 5,
  confirmDownload: 6,
  confirmNewDownload: 7,
  selectRef: 8,
};
//テンプレート生成ルール
export const constTemplateRule = {
  reference: "0",
  newCreate: "1",
  update: "2",
  newVersionCreate: "3",
  relationCreate: "4",
  anotherCreate: "5",
  copyRelationCreate: "6",
  copyAnotherCreate: "7",
};
//データカテゴリ
export const constDataCategory = {
  dimension: "dimension",
  measure: "measureDimension",
  attribute: "attribute",
  approval: "approval",
  measuremaster: "measureMaster",
  measureclass: "measure",
  statisticalMeasure: "statisticalMeasure",
  bulkRegistration: "bulkRegistration",
  top: "top",
};
//アップロードするファイルのサイズ
export const constUpdateFileSize = {
  singleSize: 1024 * 1024 * 100,
  totalSize: 1024 * 1024 * 300,
};
//アップロード用モーダルのスタイル
export const constUploadModalStyle = {
  defaultHeight: 290,
  paddingHeight: 50,
};
//承認フラグ
export const constApprovalFlag = {
  approved: 1,
  unapproved: 0,
};
//現在の画面モード
export const constDisplayMode = {
  browsing: "browsing",
  edit: "edit",
};
//apiからのデータ取得結果(成功、失敗)
export const constFetchResult = {
  success: "success",
  failed: "failed",
  empty: "empty",
};
//事項の名称(日本語)
export const constDataCategoryJa = {
  dimension: "分類事項",
  measure: "集計事項",
  attribute: "補足事項",
  measuremaster: "集計事項マスタ",
};
//一括登録処理状況
export const constBatchStatus = {
  wait: 0,
  exit: 2,
  failed: 9,
};
//スプレッドシートに空行を追加
export const constAddLine = {
  add: true,
  noAdd: false,
};
//承認、差し戻しパラメータ
export const constApprovalStatus = {
  approval: 2,
  back: 3,
};
//モーダルのheight(%)
export const constHeightPercentageModal = {
  searchModal: 78,
};
//モーダルのmin-height
export const constMinHeightModal = {
  searchModal: 500,
};
//li要素のmin-height
export const constMinHeightLi = {
  searchModal: 47,
};
//項目のタイプ
export const constTypeOfCodelist = {
  master: "MASTER",
  subset: "SUBSET",
};
//分類事項の新規バージョン登録で地域事項選択時に表示する選択肢(ラジオボタン)のid
export const constIsGetAreaId = {
  get: "getAreaCode",
  succeed: "succeedOriginalVersion",
};
//プログレスバーのスタイル設定に用いるパラメータ
export const constProgressBarParameter = {
  firstLeftPosition: 53,
  overallLength: 520,
};

export const constFormat = {
  hyphenDateTimeFormat: "YYYY-MM-DD HH:mm:ss",
};
