import { Form, Input, Select, Space } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { PhoneNumberFormat, PhoneNumberUtil } from "google-libphonenumber";
import { defaultCountries, parseCountry, FlagImage } from "react-international-phone";
interface PhoneState {
  country: {
    name: string;
    iso2: string;
    dialCode: string;
  };
  inputValue: string;
}
const countries = defaultCountries.filter((country) => {
  const { iso2 } = parseCountry(country);
  return ["sa"].includes(iso2);
});
const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};
export default function PhoneInputComponent() {
  const { locale } = useSelector(({ LanguageSwitcher }: { LanguageSwitcher: ILanguageSwitcher }) => LanguageSwitcher.language);
  return (
    <Form.Item
      required
      label={
        <span>
          <FormattedMessage id="mobileNumber" />
        </span>
      }
    >
      <Space.Compact className="w-full">
        <Form.Item initialValue={"966"} name={"country_code"} noStyle>
          <Select size="large" className="!w-[100px]">
            {countries.map((c) => {
              const country = parseCountry(c);
              return (
                <Select.Option key={country.dialCode} value={country.dialCode}>
                  <div className="flex gap-2 items-center">
                    <FlagImage width={25} iso2={country.iso2} />
                    <div>{country.dialCode}</div>
                  </div>
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          dependencies={["country_code"]}
          name={"phone"}
          noStyle
          rules={[
            {
              required: true,
              message: <FormattedMessage id="phoneNumber" />,
            },

            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !value ||
                  isPhoneValid("+" + getFieldValue("country_code") + value)
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(
                    locale === "en"
                      ? "Invalid phone number"
                      : "رقم هاتف غير صحيح"
                  )
                );
              },
            }),
          ]}
        >
          <Input
            type="number"
            size="large"
            className="w-[calc(100%_-_100px)]"
          />
        </Form.Item>
      </Space.Compact>
    </Form.Item>
  );
}
