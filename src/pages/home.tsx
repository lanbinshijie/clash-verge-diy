import { IconButton, List, Paper } from "@mui/material";
import { useLockFn } from "ahooks";
import { useTranslation } from "react-i18next";
import { BasePage, Notice } from "@/components/base";
import { GitHub } from "@mui/icons-material";
import { openWebUrl } from "@/services/cmds";
import { ReactComponent as LogoSvg } from "@/assets/image/logo.svg";
import Homepage from "@/components/home/home-page";
import SettingClash from "@/components/setting/setting-clash";
import SettingSystem from "@/components/setting/setting-system";
import SettingVersion from "@/components/setting/setting-version";

const HomePage = () => {
  const { t } = useTranslation();

  const onError = (err: any) => {
    Notice.error(err?.message || err.toString());
  };

  const toGithubRepo = useLockFn(() => {
    return openWebUrl("https://github.com/zzzgydi/clash-verge");
  });

  return (
    <BasePage title="Clash Verge">
      <Paper sx={{ borderRadius: 1, boxShadow: 2 }}>
        <Homepage onError={onError} />
      </Paper>
    </BasePage>
  );
};

export default HomePage;
