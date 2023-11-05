import { forwardRef, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { List, Switch, Typography } from "@mui/material";
import { useVerge } from "@/hooks/use-verge";
import { BaseDialog, DialogRef, Notice } from "@/components/base";
import { SettingItem } from "./setting-comp";
import { GuardState } from "./guard-state";

export const ErkaiViewer = forwardRef<DialogRef>((props, ref) => {
  const { t } = useTranslation();
  const { verge, patchVerge, mutateVerge } = useVerge();

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
    close: () => setOpen(false),
  }));

  const onSwitchFormat = (_e: any, value: boolean) => value;
  const onError = (err: any) => {
    Notice.error(err.message || err.toString());
  };
  const onChangeData = (patch: Partial<IVergeConfig>) => {
    mutateVerge({ ...verge, ...patch }, false);
  };

  return (
    <BaseDialog
      open={open}
      title="开发说明"
      contentSx={{ width: 450 }}
      okBtn={t("Back")}
      cancelBtn={"前往仓库"}
      onCancel={() =>
        window.open("https://git.lanbin.top/lanbinshijie/clash-verge-diy.git")
      }
      onClose={() => setOpen(false)}
      //   onClose={() => {Notice.success("感谢")}}
      onOk={() => setOpen(false)}
    >
      <Typography variant="body1" gutterBottom>
        这是一个由Lanbin开发的Clash
        Verge发行版，官方版本的样式有些不是很喜欢，所以就自己开发了一个版本，如果你喜欢的话可以使用这个版本。
        总体上功能是不变的，可能修改了一些地方的提示和使用感受。 希望你能喜欢！
      </Typography>
      <Typography variant="body1" gutterBottom>
        本程序没有后门，如果你不放心的话可以自行编译，源码在仓库里面。您也可以检查源代码，如果有问题可以提交issue。
      </Typography>
    </BaseDialog>
  );
});
