import { useRef } from "react";
import { useLockFn } from "ahooks";
import { useTranslation } from "react-i18next";
import { IconButton, MenuItem, Select, Typography } from "@mui/material";
import { openAppDir, openCoreDir, openLogsDir } from "@/services/cmds";
import { ArrowForward } from "@mui/icons-material";
import { checkUpdate } from "@tauri-apps/api/updater";
import { useVerge } from "@/hooks/use-verge";
import { version } from "@root/package.json";
import { DialogRef, Notice } from "@/components/base";
import { SettingList, SettingItem } from "./mods/setting-comp";
import { ThemeModeSwitch } from "./mods/theme-mode-switch";
import { ConfigViewer } from "./mods/config-viewer";
import { HotkeyViewer } from "./mods/hotkey-viewer";
import { MiscViewer } from "./mods/misc-viewer";
import { ThemeViewer } from "./mods/theme-viewer";
import { GuardState } from "./mods/guard-state";
import { LayoutViewer } from "./mods/layout-viewer";
import { UpdateViewer } from "./mods/update-viewer";

import { ErkaiViewer } from "./mods/erkai-author-viewer";

import getSystem from "@/utils/get-system";

interface Props {
  onError?: (err: Error) => void;
}

const OS = getSystem();

const SettingVersion = ({ onError }: Props) => {
  const { t } = useTranslation();

  const { verge, patchVerge, mutateVerge } = useVerge();
  const { theme_mode, language } = verge ?? {};

  const configRef = useRef<DialogRef>(null);
  const hotkeyRef = useRef<DialogRef>(null);
  const miscRef = useRef<DialogRef>(null);
  const themeRef = useRef<DialogRef>(null);
  const layoutRef = useRef<DialogRef>(null);
  const updateRef = useRef<DialogRef>(null);
  const erkaiRef = useRef<DialogRef>(null);

  const onChangeData = (patch: Partial<IVergeConfig>) => {
    mutateVerge({ ...verge, ...patch }, false);
  };

  const onCheckUpdate = useLockFn(async () => {
    try {
      const info = await checkUpdate();
      if (!info?.shouldUpdate) {
        Notice.success("No Updates Available");
      } else {
        updateRef.current?.open();
      }
    } catch (err: any) {
      Notice.error(err.message || err.toString());
    }
  });

  return (
    <SettingList title={t("Version Setting")}>
      <ThemeViewer ref={themeRef} />
      <ConfigViewer ref={configRef} />
      <HotkeyViewer ref={hotkeyRef} />
      <MiscViewer ref={miscRef} />
      <LayoutViewer ref={layoutRef} />
      <UpdateViewer ref={updateRef} />
      <ErkaiViewer ref={erkaiRef} />

      {!(OS === "windows" && WIN_PORTABLE) && (
        <SettingItem label={t("Check for Updates")}>
          <IconButton
            color="inherit"
            size="small"
            sx={{ my: "2px" }}
            onClick={onCheckUpdate}
          >
            <ArrowForward />
          </IconButton>
        </SettingItem>
      )}

      <SettingItem label={t("Erkai Author")}>
        <IconButton
          color="inherit"
          size="small"
          sx={{ my: "2px" }}
          onClick={() => erkaiRef.current?.open()}
        >
          <ArrowForward />
        </IconButton>
      </SettingItem>

      <SettingItem label={t("Verge Version")}>
        <Typography sx={{ py: "7px", pr: 1 }}>v{version}</Typography>
      </SettingItem>
    </SettingList>
  );
};

export default SettingVersion;
