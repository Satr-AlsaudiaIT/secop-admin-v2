import { Popover, Steps } from "antd";
import React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  record: {
    client_id: number;
    client_name: string;
    id: number;
    status: number;
  };
};

const TrackingSalesStatus: React.FC<Props> = ({ record }) => {
  const STEPS_STATUS_INDEX_MAP = {
    1: { index: 0 },
    2: { index: 1 },
    3: { index: 1 },
    4: { index: 2 },
  };

  return (
    <Steps
      current={STEPS_STATUS_INDEX_MAP[record.status].index}
      labelPlacement="vertical"
      items={[
        {
          title: <FormattedMessage id="pending" />,
          status: "finish" as any,
        },

        ...(() => {
          const title =
            record.status === 3 ? (
              <FormattedMessage id="rejected" />
            ) : (
              <FormattedMessage id="accepted" />
            );
          const status =
            record.status === 3
              ? "error"
              : record.status === 2
              ? "finish"
              : undefined;

          return [
            {
              title,
              status,
            },
          ];
        })(),

        ...(() => {
          return [
            {
              title: <FormattedMessage id="complete" />,
              status: record.status === 4 ? "finish" : undefined,
            },
          ];
        })(),
      ]}
    />
  );
};

export default TrackingSalesStatus;
