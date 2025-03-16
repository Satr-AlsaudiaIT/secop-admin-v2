import PermissionGuard from "middlewares/Permissions";
import Edit from "../edit/[id]/page";
import middleware from "utlis/navigation/mw";
import { config } from "../page";
function Add() {
  return <Edit />;
}

// export default middleware(Add, [
//   PermissionGuard(config.add.url, config.add.type),
// ]);
export default Add