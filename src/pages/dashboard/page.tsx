import { Alert, Badge, Card, DatePicker, Select, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
// import DemoMix from 'components/charts/test'

import { useSelector } from "react-redux";
import axios from "utlis/library/helpers/axios";

import type { Dayjs } from "dayjs";
import { toast } from "react-hot-toast";
import { Button, Popconfirm } from "antd";
import type { CalendarProps } from "antd";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import Charts from "./_statistics/charts";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Cards from "./_statistics/Card";
import moment from "moment";
import { FormattedMessage } from "react-intl";

function Statistics() {
  const { locale } = useSelector(({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) => LanguageSwitcher.language);
  const { idToken } = useSelector((state: any) => state.Auth);
  const profile = useSelector(({ profile }) => profile.data);

  const [date, setDate] = useState(() => dayjs());
  const [time, setTime] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setInterval(() => {
      const date = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
      setTime(date);
    }, 1000);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs mb-2 mt-5 mx-6">{time}</div>
          <div className="text-xl">
            <span className="font-bold">
              👋 <FormattedMessage id="welcome"></FormattedMessage>{" "}
            </span>
            {profile.name}
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-2   rounded-lg  mx-auto ">
        <Cards data={data?.data.data} />
        <DemoMix />
        <DatePicker
          value={date}
          picker="year"
          onChange={(date) => {
            setDate(date);
          }}
        />
        <Charts data={data?.data.data} />
      </div> */}
    </>
  );
}

export default Statistics;
