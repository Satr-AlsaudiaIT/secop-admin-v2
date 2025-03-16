import { FormattedMessage } from "react-intl";
import { Tooltip } from "antd";
const generateCols = (col) => {
  return col.map((e) => {
    const { title, key, content, ...rest } = e;

    const colTitle = e?.title ? (
      <FormattedMessage id={e.title} />
    ) : e?.key ? (
      <FormattedMessage id={e.key} />
    ) : (
      <FormattedMessage id={e} />
    );

    return {
      title: colTitle,
      dataIndex: e?.key ? e.key : e,
      key: e?.key ? e.key : e,
      // ellipsis: true,
      // responsive: ["md"],
      // width: col.length > 3 ? 120 : "",
      render: e?.content
        ? (text, record) => {
            const showedText = e.content(text, record);
            return (
              <div className="text-overflow min-w-[130px] max-w-sm text-start">
                <Tooltip  title={typeof showedText==="string" && showedText}>
                  {showedText}
                </Tooltip>
              </div>
            );
          }
        : (showedText) => (
            <div className="text-overflow min-w-[130px] max-w-sm text-start">
              <Tooltip  title={typeof showedText==="string" && showedText}>
                {showedText}
              </Tooltip>
            </div>
          ),
      ...rest,
    };
  });
};
export { generateCols };
