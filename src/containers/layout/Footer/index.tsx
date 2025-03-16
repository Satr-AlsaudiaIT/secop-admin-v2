import { Footer as AntdFooter } from "antd/es/layout/layout";

function Footer() {
  return (
    <AntdFooter className=" p-0 bg-transparent h-[45px] flex items-center justify-center whitespace-nowrap overflow-hidden text-ellipsis">
       Secop ©{new Date().getFullYear()}<span className="inline-flex gap-1 ms-1"> By <a rel="noopener noreferrer" target="_blank" href="https://www.appssquare.sa"> {" "}Appssquare</a></span> 
    </AntdFooter>
  );
}

export default Footer;
