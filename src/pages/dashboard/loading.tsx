import RollerLoading from "components/loading/roller";
import { useEffect } from "react";
import "nprogress/nprogress.css";
const BREAD_CRUMBS_HEIGHT = "38px";
const TOPBAR_HEIGHT = "64px";
const FOOER_HEIGHT = "45px";
const WRAPER_MARGIN_TOP = "24px";
function LoadingDashboard() {
  return (
    <div
      style={{
        height: `calc(100vh - ${TOPBAR_HEIGHT} - ${FOOER_HEIGHT} - ${BREAD_CRUMBS_HEIGHT} - ${WRAPER_MARGIN_TOP} )`,
      }}
      className="flex items-center justify-center"
    >
      <RollerLoading />
    </div>
  );
}



export default LoadingDashboard;
